import { axiosInstance } from "@/lib/axios-instance";
import {
  DashboardAnalytics,
  DashboardAnalyticsResponse,
  DashboardChartDataPoint,
  DashboardChartResponse,
  PopularPizza,
  PopularPizzasResponse,
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

  /**
   * Fetch dashboard chart data
   */
  async getDashboardChart(
    signal?: AbortSignal
  ): Promise<DashboardChartDataPoint[]> {
    const response = await axiosInstance.get<DashboardChartResponse>(
      `${this.baseUrl}/dashboard-chart`,
      { signal }
    );
    return response.data.data;
  }

  /**
   * Fetch popular pizzas data
   */
  async getPopularPizzas(signal?: AbortSignal): Promise<PopularPizza[]> {
    const response = await axiosInstance.get<PopularPizzasResponse>(
      `${this.baseUrl}/popular-pizzas`,
      { signal }
    );
    return response.data.data;
  }
}

export const dashboardService = new DashboardService();
