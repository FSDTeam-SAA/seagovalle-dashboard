export interface PaymentCart {
  cartId: string
  quantity: number
  totalPrice: number
  size?: string
  _id: string
}

export interface PaymentDeliveryDetails {
  fullName: string
  email: string
  address: string
  phone: string
  note?: string
}

export interface PaymentOrder {
  _id: string
  deviceIp: string
  type?: string
  productId?: string
  cart: PaymentCart[]
  couponCode?: string
  finalPrice: number
  deliveryDetails: PaymentDeliveryDetails
  createdAt: string
  updatedAt: string
  status: 'pending' | 'approved' | 'delivered' | 'cancelled'
}

export interface Payment {
  _id: string
  deviceIp: string
  orderId: PaymentOrder
  amount: number
  status: 'pending' | 'success' | 'failed'
  transactionId: string
  createdAt: string
  updatedAt: string
}

export interface PaymentStats {
  totalRevenue: number
  totalTransactions: number
}

export interface PaymentsPaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaymentsResponse {
  success: boolean
  message: string
  statusCode: number
  data: Payment[]
  meta: PaymentsPaginationMeta
}

export interface PaymentStatsResponse {
  success: boolean
  message: string
  statusCode: number
  data: PaymentStats
}
