'use client'

import { useQuery } from '@tanstack/react-query'
import { paymentService } from '@/lib/services/payment-service'
import { Payment, PaymentStats, PaymentsResponse } from '@/lib/types/payment'

const paymentQueryKeys = {
  all: ['payments'] as const,
  stats: () => [...paymentQueryKeys.all, 'stats'] as const,
  lists: () => [...paymentQueryKeys.all, 'list'] as const,
  list: (page?: number, limit?: number) => [...paymentQueryKeys.lists(), { page, limit }] as const,
}

export function useGetPaymentStats() {
  return useQuery<PaymentStats, Error>({
    queryKey: paymentQueryKeys.stats(),
    queryFn: ({ signal }) => paymentService.getPaymentStats(signal),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  })
}

export function useGetPayments(page: number = 1, limit: number = 10) {
  return useQuery<PaymentsResponse, Error>({
    queryKey: paymentQueryKeys.list(page, limit),
    queryFn: ({ signal }) => paymentService.getPayments(page, limit, signal),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  })
}

export const paymentsQueryKeys = paymentQueryKeys
