"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/lib/services/dashboard-service";
import { PopularPizza } from "@/lib/types/dashboard";

export function usePopularPizzas() {
  return useQuery<PopularPizza[]>({
    queryKey: ["popular-pizzas"],
    queryFn: async ({ signal }) => {
      return await dashboardService.getPopularPizzas(signal);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}
