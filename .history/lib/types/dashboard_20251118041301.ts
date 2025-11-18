export interface DashboardAnalytics {
  totalOrders: number;
  totalOrdersPercentChange: number;
  todaySales: number;
  salesPercent: number;
  pendingOrders: number;
  pendingOrdersPercent: number;
}

export interface DashboardAnalyticsResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: DashboardAnalytics;
}

export interface DashboardChartDataPoint {
  month: number;
  totalSales: number;
  totalOrders: number;
}

export interface DashboardChartResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: DashboardChartDataPoint[];
}
