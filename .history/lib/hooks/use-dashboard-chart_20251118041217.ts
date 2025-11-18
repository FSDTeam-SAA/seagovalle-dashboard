"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/lib/services/dashboard-service";
import { DashboardChartDataPoint } from "@/lib/types/dashboard";

export function useDashboardChart() {
  return useQuery<DashboardChartDataPoint[]>({
    queryKey: ["dashboard-chart"],
    queryFn: async ({ signal }) => {
      return await dashboardService.getDashboardChart(signal);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}
