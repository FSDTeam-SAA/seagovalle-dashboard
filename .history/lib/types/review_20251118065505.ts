// Review API Response Types
export interface Review {
  _id: string
  user: {
    _id: string
    name: string
    email: string
    avatar?: string
  }
  product: {
    _id: string
    name: string
  }
  rating: number // 1-5
  comment: string
  images?: Array<{
    public_id: string
    url: string
  }>
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  updatedAt: string
}

export interface ReviewListResponse {
  success: boolean
  message: string
  statusCode: number
  data: Review[]
  meta?: {
    page?: number
    limit?: number
    total?: number
    pages?: number
  }
}

export interface ReviewResponse {
  success: boolean
  message: string
  statusCode: number
  data: Review
}

export interface ReviewAnalytics {
  totalReviews: number
  pendingReviews: number
  approvedReviews: number
  rejectedReviews: number
  averageRating: number
  ratingBreakdown?: {
    [key: number]: number // 1-5 stars count
  }
}

export interface ReviewAnalyticsResponse {
  success: boolean
  message: string
  statusCode: number
  data: ReviewAnalytics
}

// Form Types
export interface ReviewFilterParams {
  rating?: number
  status?: 'pending' | 'approved' | 'rejected'
  productId?: string
  page?: number
  limit?: number
  search?: string
}
