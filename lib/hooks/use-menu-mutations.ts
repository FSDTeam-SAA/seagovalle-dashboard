'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/lib/axios-instance'
import { MenuItem } from '@/lib/services/menu-service'
import { AxiosError } from 'axios'
import { menuQueryKeys } from './use-menu-queries'

// Hook for batch operations
export function useBulkDeleteMenus(): any {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (ids: string[]) => {
      await Promise.all(
        ids.map((id) =>
          axiosInstance.delete(`/menu/delete-menu/${id}`)
        )
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: menuQueryKeys.lists() })
    },
  })
}

// Hook for category-based operations
export function useGetMenusByCategory(category: string): any {
  return {
    queryFn: async () => {
      const response = await axiosInstance.get<MenuItem[]>(
        `/menu/all?category=${category}`
      )
      return response.data
    },
  }
}

// Hook for search functionality
export function useSearchMenus(query: string): any {
  return {
    queryFn: async () => {
      const response = await axiosInstance.get<MenuItem[]>(
        `/menu/search?q=${encodeURIComponent(query)}`
      )
      return response.data
    },
    enabled: query.length > 0,
  }
}
