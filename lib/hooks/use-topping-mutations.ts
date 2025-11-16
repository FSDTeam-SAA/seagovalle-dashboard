'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toppingService } from '@/lib/services/topping-service'
import { Topping } from '@/lib/types/topping'
import { toppingQueryKeys } from '@/lib/hooks/use-topping-queries'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

/**
 * Mutation hook to create new topping
 */
export function useCreateTopping() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (formData: FormData): Promise<Topping> => {
      return toppingService.createTopping(formData)
    },
    onSuccess: (newTopping) => {
      // Invalidate admin list
      queryClient.invalidateQueries({
        queryKey: toppingQueryKeys.admin(),
      })

      // Cache the new topping
      queryClient.setQueryData(
        toppingQueryKeys.detail(newTopping._id),
        newTopping
      )

      toast.success('Topping created successfully')
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as any)?.message || 'Failed to create topping'
      toast.error(message)
    },
  })
}

/**
 * Mutation hook to update topping
 */
export function useUpdateTopping(toppingId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (formData: FormData): Promise<Topping> => {
      return toppingService.updateTopping(toppingId, formData)
    },
    onSuccess: (updatedTopping) => {
      // Update cache
      queryClient.setQueryData(
        toppingQueryKeys.detail(toppingId),
        updatedTopping
      )

      // Invalidate lists
      queryClient.invalidateQueries({
        queryKey: toppingQueryKeys.admin(),
      })
      queryClient.invalidateQueries({
        queryKey: toppingQueryKeys.public(),
      })

      toast.success('Topping updated successfully')
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as any)?.message || 'Failed to update topping'
      toast.error(message)
    },
  })
}

/**
 * Mutation hook to delete topping
 */
export function useDeleteTopping() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (toppingId: string) => {
      return toppingService.deleteTopping(toppingId)
    },
    onMutate: async (toppingId) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({
        queryKey: toppingQueryKeys.admin(),
      })

      // Snapshot previous data
      const previousData = queryClient.getQueryData(
        toppingQueryKeys.adminList()
      )

      // Optimistic update
      queryClient.setQueryData(
        toppingQueryKeys.adminList(),
        (old: any) => old?.filter((t: Topping) => t._id !== toppingId)
      )

      return { previousData }
    },
    onSuccess: (_, toppingId) => {
      // Remove from cache
      queryClient.removeQueries({
        queryKey: toppingQueryKeys.detail(toppingId),
      })

      toast.success('Topping deleted successfully')
    },
    onError: (error: AxiosError, _, context: any) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(
          toppingQueryKeys.adminList(),
          context.previousData
        )
      }

      const message =
        (error.response?.data as any)?.message || 'Failed to delete topping'
      toast.error(message)
    },
  })
}

/**
 * Mutation hook to toggle topping status
 */
export function useToggleToppingStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (toppingId: string): Promise<Topping> => {
      return toppingService.toggleToppingStatus(toppingId)
    },
    onMutate: async (toppingId) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({
        queryKey: toppingQueryKeys.detail(toppingId),
      })

      // Snapshot previous data
      const previousTopping = queryClient.getQueryData(
        toppingQueryKeys.detail(toppingId)
      )

      // Optimistic update
      if (previousTopping) {
        queryClient.setQueryData(
          toppingQueryKeys.detail(toppingId),
          (old: Topping) => ({
            ...old,
            isAvailable: !old.isAvailable,
          })
        )
      }

      return { previousTopping }
    },
    onSuccess: (updatedTopping) => {
      // Update cache
      queryClient.setQueryData(
        toppingQueryKeys.detail(updatedTopping._id),
        updatedTopping
      )

      // Invalidate admin lists
      queryClient.invalidateQueries({
        queryKey: toppingQueryKeys.admin(),
      })

      toast.success(
        `Topping ${updatedTopping.isAvailable ? 'activated' : 'deactivated'}`
      )
    },
    onError: (error: AxiosError, _, context: any) => {
      // Rollback optimistic update
      if (context?.previousTopping) {
        queryClient.setQueryData(
          toppingQueryKeys.detail(context.previousTopping._id),
          context.previousTopping
        )
      }

      const message =
        (error.response?.data as any)?.message || 'Failed to update status'
      toast.error(message)
    },
  })
}

/**
 * Mutation hook for bulk delete
 */
export function useBulkDeleteToppings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (toppingIds: string[]) => {
      return Promise.all(
        toppingIds.map((id) => toppingService.deleteTopping(id))
      )
    },
    onSuccess: (_, toppingIds) => {
      // Remove from cache
      toppingIds.forEach((id) => {
        queryClient.removeQueries({
          queryKey: toppingQueryKeys.detail(id),
        })
      })

      // Invalidate lists
      queryClient.invalidateQueries({
        queryKey: toppingQueryKeys.admin(),
      })

      toast.success(`${toppingIds.length} topping(s) deleted`)
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as any)?.message || 'Failed to delete toppings'
      toast.error(message)
    },
  })
}
