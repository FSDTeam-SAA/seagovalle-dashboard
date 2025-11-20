export interface Coupon {
  _id: string
  title: string
  description: string
  discountType: 'Percentage' | 'Flat' | 'BuyXGetY' | 'FixedPrice'
  code: string
  discountValue?: number
  discountAmount?: number
  startDate: string
  endDate: string
  isActive: boolean
  timesUsed: number
  createdAt: string
  updatedAt: string
}

export interface CouponListResponse {
  data: Coupon[]
  meta?: {
    page?: number
    limit?: number
    total?: number
    pages?: number
  }
}

export interface CouponResponse {
  data: Coupon
  message?: string
}

export interface CouponDeleteResponse {
  message: string
  success: boolean
}

// DTO Types
export interface CreateCouponDto {
  title: string
  description: string
  discountType: 'Percentage' | 'Flat' | 'BuyXGetY' | 'FixedPrice'
  code: string
  discountValue?: number
  startDate: string
  endDate: string
  isActive?: boolean
}

export interface UpdateCouponDto extends Partial<CreateCouponDto> {}

// Form Types
export interface CouponFormData extends CreateCouponDto {}
