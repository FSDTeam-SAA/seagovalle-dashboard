'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { reviewService } from '@/lib/services/review-service'
import { Review, ReviewFilterParams, ReviewAnalytics } from '@/lib/types/review'

/**
 * Query key factory for reviews
 */
export const reviewQueryKeys = {
  all: () => ['reviews'],
  admin: () => [...reviewQueryKeys.all(), 'admin'],
  adminList: (params?: ReviewFilterParams) => [
    ...reviewQueryKeys.admin(),
    'list',
    params,
  ],
  product: () => [...reviewQueryKeys.all(), 'product'],
  productList: (productId: string, params?: Omit<ReviewFilterParams, 'productId'>) => [
    ...reviewQueryKeys.product(),
    productId,
    params,
  ],
  detail: (id: string) => [...reviewQueryKeys.all(), 'detail', id],
  analytics: () => [...reviewQueryKeys.all(), 'analytics'],
}

/**
 * Get all reviews (admin) with filters, pagination, and search
 */
export function useGetAllReviewsAdmin(params?: ReviewFilterParams) {
  return useQuery({
    queryKey: reviewQueryKeys.adminList(params),
    queryFn: ({ signal }) => reviewService.getAllReviewsAdmin(params, signal),
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    select: (data) => ({
      reviews: data.reviews,
      meta: data.meta,
    }),
  })
}

/**
 * Get reviews for a specific product
 */
export function useGetReviewsByProduct(
  productId: string | null,
  params?: Omit<ReviewFilterParams, 'productId'>
) {
  return useQuery({
    queryKey: reviewQueryKeys.productList(productId || '', params),
    queryFn: ({ signal }) =>
      reviewService.getReviewsByProduct(productId!, params, signal),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Get single review by ID
 */
export function useGetReview(id: string | null) {
  return useQuery({
    queryKey: reviewQueryKeys.detail(id || ''),
    queryFn: ({ signal }) => reviewService.getReviewById(id!, signal),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

/**
 * Get reviews analytics (total, pending, approved, average rating, etc.)
 */
export function useGetReviewsAnalytics() {
  return useQuery({
    queryKey: reviewQueryKeys.analytics(),
    queryFn: ({ signal }) => reviewService.getReviewsAnalytics(signal),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    select: (data: ReviewAnalytics) => data,
  })
}

/**
 * Prefetch review detail when hovering on a review row
 */
export function usePrefetchReview(id: string) {
  const queryClient = useQueryClient()

  return () => {
    queryClient.prefetchQuery({
      queryKey: reviewQueryKeys.detail(id),
      queryFn: ({ signal }) => reviewService.getReviewById(id, signal),
      staleTime: 5 * 60 * 1000,
    })
  }
}
