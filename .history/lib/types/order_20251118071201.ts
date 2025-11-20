export interface OrderCartItem {
  cartId: string
  quantity: number
  totalPrice: number
  size?: string
  _id: string
}

export interface OrderDeliveryDetails {
  fullName: string
  email: string
  address: string
  phone: string
  note?: string
}

export interface Order {
  _id: string
  deviceIp: string
  cart: OrderCartItem[]
  couponCode?: string
  finalPrice: number
  deliveryDetails: OrderDeliveryDetails
  createdAt: string
  updatedAt: string
  status: 'pending' | 'approved' | 'cancelled' | 'delivered'
}

export interface OrdersResponse {
  success: boolean
  message: string
  statusCode: number
  data: Order[]
}
