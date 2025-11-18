import { axiosInstance } from "@/lib/axios-instance";
import { Order, OrdersResponse } from "@/lib/types/order";

class OrderService {
  private baseUrl = "/order";

  /**
   * Fetch all orders
   */
  async getOrders(signal?: AbortSignal): Promise<Order[]> {
    const response = await axiosInstance.get<OrdersResponse>(
      `${this.baseUrl}/all-orders`,
      { signal }
    );
    return response.data.data;
  }
}

export const orderService = new OrderService();
