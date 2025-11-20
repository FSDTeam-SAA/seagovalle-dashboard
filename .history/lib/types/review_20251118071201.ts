export interface Review {
  _id: string
  rating: number // 1-5
  name: string
  comment: string
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
    totalPages?: number
  }
  reviewCount?: {
    [key: number]: number // rating: count
  }
}

export interface ReviewResponse {
  success: boolean
  message: string
  statusCode: number
  data: Review
}

export interface ReviewAnalytics {
  totalReviewsAnalysis: number
  pendingReviewsAnalysis: number
  approvedReviewAnalysis: number
  averageRatingAnalysis: number
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
  page?: number
  limit?: number
  search?: string
}
