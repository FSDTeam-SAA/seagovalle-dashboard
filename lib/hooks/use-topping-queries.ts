'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toppingService } from '@/lib/services/topping-service'
import { Topping } from '@/lib/types/topping'

/**
 * Query key factory for toppings
 */
export const toppingQueryKeys = {
  all: () => ['toppings'],
  public: () => [...toppingQueryKeys.all(), 'public'],
  publicList: (params?: { category?: string; page?: number }) => [
    ...toppingQueryKeys.public(),
    'list',
    params,
  ],
  admin: () => [...toppingQueryKeys.all(), 'admin'],
  adminList: (params?: { category?: string; page?: number }) => [
    ...toppingQueryKeys.admin(),
    'list',
    params,
  ],
  detail: (id: string) => [...toppingQueryKeys.all(), 'detail', id],
  analytics: () => [...toppingQueryKeys.all(), 'analytics'],
}

/**
 * Get all available toppings (public)
 */
export function useGetToppings(params?: { category?: string; page?: number }) {
  return useQuery({
    queryKey: toppingQueryKeys.publicList(params),
    queryFn: ({ signal }) => toppingService.getToppings(params, signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    select: (data) => data, // Use as-is for components
  })
}

/**
 * Get all toppings (admin) with categories metadata
 */
export function useGetToppingsAdmin(params?: { category?: string; page?: number }) {
  return useQuery({
    queryKey: toppingQueryKeys.adminList(params),
    queryFn: ({ signal }) =>
      toppingService.getToppingsAdmin(params, signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Get single topping by ID
 */
export function useGetTopping(id: string | null) {
  return useQuery({
    queryKey: toppingQueryKeys.detail(id || ''),
    queryFn: ({ signal }) => toppingService.getToppingById(id!, signal),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

/**
 * Get toppings analytics
 */
export function useGetToppingsAnalysis() {
  return useQuery({
    queryKey: toppingQueryKeys.analytics(),
    queryFn: ({ signal }) => toppingService.getToppingsAnalysis(signal),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  })
}

/**
 * Prefetch topping detail
 */
export function usePrefetchTopping(id: string) {
  const queryClient = useQueryClient()
  
  return () => {
    queryClient.prefetchQuery({
      queryKey: toppingQueryKeys.detail(id),
      queryFn: ({ signal }) => toppingService.getToppingById(id, signal),
      staleTime: 5 * 60 * 1000,
    })
  }
}
