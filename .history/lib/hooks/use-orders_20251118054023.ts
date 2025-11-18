"use client";

import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/lib/services/order-service";
import { Order } from "@/lib/types/order";

const orderQueryKeys = {
  all: ["orders"] as const,
  lists: () => [...orderQueryKeys.all, "list"] as const,
  list: (filters?: string) => [...orderQueryKeys.lists(), { filters }] as const,
  details: () => [...orderQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...orderQueryKeys.details(), id] as const,
};

export function useGetOrders() {
  return useQuery<Order[], Error>({
    queryKey: orderQueryKeys.list(),
    queryFn: ({ signal }) => orderService.getOrders(signal),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}

export const ordersQueryKeys = orderQueryKeys;
