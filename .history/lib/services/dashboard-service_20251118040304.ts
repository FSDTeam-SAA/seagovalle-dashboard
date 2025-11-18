import { axiosInstance } from "@/lib/axios-instance";
import {
  DashboardAnalytics,
  DashboardAnalyticsResponse,
} from "@/lib/types/dashboard";

class DashboardService {
  private baseUrl = "/analysis";

  /**
   * Fetch dashboard analytics data
   */
  async getDashboardAnalytics(
    signal?: AbortSignal
  ): Promise<DashboardAnalytics> {
    const response = await axiosInstance.get<DashboardAnalyticsResponse>(
      `${this.baseUrl}/dashboard`,
      { signal }
    );
    return response.data.data;
  }
}

export const dashboardService = new DashboardService();
