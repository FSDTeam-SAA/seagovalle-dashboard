'use client'

import { useQuery } from '@tanstack/react-query'
import { customerService } from '@/lib/services/customer-service'
import { Customer } from '@/lib/types/customer'

const customerQueryKeys = {
  all: ['customers'] as const,
  lists: () => [...customerQueryKeys.all, 'list'] as const,
  list: (filters?: string) => [...customerQueryKeys.lists(), { filters }] as const,
}

export function useGetCustomers() {
  return useQuery<Customer[], Error>({
    queryKey: customerQueryKeys.list(),
    queryFn: ({ signal }) => customerService.getCustomers(signal),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  })
}

export const customersQueryKeys = customerQueryKeys
