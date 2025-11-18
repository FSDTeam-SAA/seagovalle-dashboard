"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/lib/services/dashboard-service";
import { DashboardAnalytics } from "@/lib/types/dashboard";

export function useDashboardAnalytics() {
  return useQuery<DashboardAnalytics>({
    queryKey: ["dashboard-analytics"],
    queryFn: async ({ signal }) => {
      return await dashboardService.getDashboardAnalytics(signal);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}
