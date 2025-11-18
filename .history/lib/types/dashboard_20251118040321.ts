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
