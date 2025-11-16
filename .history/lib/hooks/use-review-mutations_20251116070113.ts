'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { reviewService } from '@/lib/services/review-service'
import { reviewQueryKeys } from './use-review-queries'
import { toast } from 'sonner'
import { useApiError } from './use-api-error'
import { Review } from '@/lib/types/review'

/**
 * Approve a review (admin action)
 */
export function useApproveReview() {
  const queryClient = useQueryClient()
  const { getErrorMessage } = useApiError()

  return useMutation({
    mutationFn: (id: string) => reviewService.approveReview(id),
    onSuccess: (data) => {
      // Update admin list cache
      queryClient.setQueryData(
        reviewQueryKeys.adminList(),
        (oldData: any) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            reviews: oldData.reviews.map((review: Review) =>
              review._id === data._id ? { ...review, status: 'approved' as const } : review
            ),
          }
        }
      )

      // Update detail cache
      queryClient.setQueryData(reviewQueryKeys.detail(data._id), data)

      // Invalidate analytics to refresh counts
      queryClient.invalidateQueries({ queryKey: reviewQueryKeys.analytics() })

      toast.success('Review approved successfully')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

/**
 * Reject a review (admin action)
 */
export function useRejectReview() {
  const queryClient = useQueryClient()
  const { getErrorMessage } = useApiError()

  return useMutation({
    mutationFn: (id: string) => reviewService.rejectReview(id),
    onSuccess: (data) => {
      // Update admin list cache
      queryClient.setQueryData(
        reviewQueryKeys.adminList(),
        (oldData: any) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            reviews: oldData.reviews.map((review: Review) =>
              review._id === data._id ? { ...review, status: 'rejected' as const } : review
            ),
          }
        }
      )

      // Update detail cache
      queryClient.setQueryData(reviewQueryKeys.detail(data._id), data)

      // Invalidate analytics to refresh counts
      queryClient.invalidateQueries({ queryKey: reviewQueryKeys.analytics() })

      toast.success('Review rejected successfully')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}
