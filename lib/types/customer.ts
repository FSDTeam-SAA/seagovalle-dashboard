export interface Customer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  totalSpent: number;
  orderStatus: "pending" | "approved" | "delivered" | "cancelled";
  orderCreatedAt: string;
}

export interface CustomersResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Customer[];
}
