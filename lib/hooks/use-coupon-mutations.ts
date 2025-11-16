'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { couponService } from '@/lib/services/coupon-service'
import { Coupon, CreateCouponDto, UpdateCouponDto } from '@/lib/types/coupon'
import { couponQueryKeys } from '@/lib/hooks/use-coupon-queries'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

/**
 * Mutation hook to create new coupon
 */
export function useCreateCoupon() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateCouponDto): Promise<Coupon> => {
      return couponService.createCoupon(payload)
    },
    onSuccess: (newCoupon) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: couponQueryKeys.listAdmin(),
      })
      queryClient.invalidateQueries({
        queryKey: couponQueryKeys.listActive(),
      })

      // Add to cache
      queryClient.setQueryData(
        couponQueryKeys.detail(newCoupon._id),
        newCoupon
      )

      toast.success('Coupon created successfully')
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as any)?.message || 'Failed to create coupon'
      toast.error(message)
    },
  })
}

/**
 * Mutation hook to update coupon
 */
export function useUpdateCoupon(couponId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: UpdateCouponDto): Promise<Coupon> => {
      return couponService.updateCoupon(couponId, payload)
    },
    onSuccess: (updatedCoupon) => {
      // Update cache
      queryClient.setQueryData(
        couponQueryKeys.detail(couponId),
        updatedCoupon
      )

      // Invalidate lists
      queryClient.invalidateQueries({
        queryKey: couponQueryKeys.listAdmin(),
      })
      queryClient.invalidateQueries({
        queryKey: couponQueryKeys.listActive(),
      })

      toast.success('Coupon updated successfully')
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as any)?.message || 'Failed to update coupon'
      toast.error(message)
    },
  })
}

/**
 * Mutation hook to delete coupon
 */
export function useDeleteCoupon() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (couponId: string) => {
      return couponService.deleteCoupon(couponId)
    },
    onSuccess: (_, couponId) => {
      // Remove from cache
      queryClient.removeQueries({
        queryKey: couponQueryKeys.detail(couponId),
      })

      // Invalidate lists
      queryClient.invalidateQueries({
        queryKey: couponQueryKeys.listAdmin(),
      })
      queryClient.invalidateQueries({
        queryKey: couponQueryKeys.listActive(),
      })

      toast.success('Coupon deleted successfully')
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as any)?.message || 'Failed to delete coupon'
      toast.error(message)
    },
  })
}

/**
 * Mutation hook to toggle coupon status
 */
export function useToggleCouponStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (couponId: string): Promise<Coupon> => {
      return couponService.toggleCouponStatus(couponId)
    },
    onSuccess: (updatedCoupon) => {
      // Update cache
      queryClient.setQueryData(
        couponQueryKeys.detail(updatedCoupon._id),
        updatedCoupon
      )

      // Invalidate lists
      queryClient.invalidateQueries({
        queryKey: couponQueryKeys.listAdmin(),
      })
      queryClient.invalidateQueries({
        queryKey: couponQueryKeys.listActive(),
      })

      toast.success(`Coupon ${updatedCoupon.isActive ? 'activated' : 'deactivated'}`)
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as any)?.message || 'Failed to update status'
      toast.error(message)
    },
  })
}

/**
 * Mutation hook for bulk delete
 */
export function useBulkDeleteCoupons() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (couponIds: string[]) => {
      return Promise.all(
        couponIds.map((id) => couponService.deleteCoupon(id))
      )
    },
    onSuccess: (_, couponIds) => {
      // Remove from cache
      couponIds.forEach((id) => {
        queryClient.removeQueries({
          queryKey: couponQueryKeys.detail(id),
        })
      })

      // Invalidate lists
      queryClient.invalidateQueries({
        queryKey: couponQueryKeys.listAdmin(),
      })
      queryClient.invalidateQueries({
        queryKey: couponQueryKeys.listActive(),
      })

      toast.success(`${couponIds.length} coupon(s) deleted`)
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as any)?.message || 'Failed to delete coupons'
      toast.error(message)
    },
  })
}
