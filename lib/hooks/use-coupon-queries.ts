'use client'

import {
  useQuery,
  useQueryClient,
  UseQueryResult,
  QueryKey,
} from '@tanstack/react-query'
import { couponService } from '@/lib/services/coupon-service'
import { Coupon } from '@/lib/types/coupon'
import { AxiosError } from 'axios'

// Query keys for coupon operations
export const couponQueryKeys = {
  all: ['coupons'] as const,
  lists: () => [...couponQueryKeys.all, 'list'] as const,
  listActive: () => [...couponQueryKeys.lists(), 'active'] as const,
  listAdmin: () => [...couponQueryKeys.lists(), 'admin'] as const,
  details: () => [...couponQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...couponQueryKeys.details(), id] as const,
}

/**
 * Fetch all active coupons (public)
 */
export function useGetActiveCoupons(): UseQueryResult<Coupon[], AxiosError> {
  return useQuery({
    queryKey: couponQueryKeys.listActive(),
    queryFn: async ({ signal }) => {
      return couponService.getActiveCoupons(signal)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: (attemptIndex) =>
      Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

/**
 * Fetch all coupons (admin view)
 */
export function useGetAllCouponsAdmin(): UseQueryResult<Coupon[], AxiosError> {
  return useQuery({
    queryKey: couponQueryKeys.listAdmin(),
    queryFn: async ({ signal }) => {
      return couponService.getAllCouponsAdmin(signal)
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 10 * 60 * 1000,
    retry: 2,
  })
}

/**
 * Fetch single coupon by ID
 */
export function useGetCoupon(id?: string): UseQueryResult<Coupon, AxiosError> {
  return useQuery({
    queryKey: couponQueryKeys.detail(id || ''),
    queryFn: async ({ signal }) => {
      if (!id) throw new Error('Coupon ID is required')
      return couponService.getCouponById(id, signal)
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

/**
 * Utility hook to prefetch coupon
 */
export function usePrefetchCoupon() {
  const queryClient = useQueryClient()

  return {
    prefetch: (id: string) => {
      queryClient.prefetchQuery({
        queryKey: couponQueryKeys.detail(id),
        queryFn: async () => {
          return couponService.getCouponById(id)
        },
      })
    },
  }
}

/**
 * Utility hook to invalidate coupon queries
 */
export function useInvalidateCoupons() {
  const queryClient = useQueryClient()

  return {
    invalidateAll: () => {
      queryClient.invalidateQueries({
        queryKey: couponQueryKeys.all,
      })
    },
    invalidateLists: () => {
      queryClient.invalidateQueries({
        queryKey: couponQueryKeys.lists(),
      })
    },
    invalidateActive: () => {
      queryClient.invalidateQueries({
        queryKey: couponQueryKeys.listActive(),
      })
    },
    invalidateAdmin: () => {
      queryClient.invalidateQueries({
        queryKey: couponQueryKeys.listAdmin(),
      })
    },
    invalidateDetail: (id: string) => {
      queryClient.invalidateQueries({
        queryKey: couponQueryKeys.detail(id),
      })
    },
  }
}
