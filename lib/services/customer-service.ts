import { axiosInstance } from "@/lib/axios-instance";
import { CustomersResponse, Customer } from "@/lib/types/customer";

class CustomerService {
  private baseUrl = "/order";

  /**
   * Fetch all customers
   */
  async getCustomers(signal?: AbortSignal): Promise<Customer[]> {
    const response = await axiosInstance.get<CustomersResponse>(
      `${this.baseUrl}/customers`,
      { signal }
    );
    return response.data.data;
  }
}

export const customerService = new CustomerService();
