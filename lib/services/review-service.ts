import { axiosInstance } from '@/lib/axios-instance'
import {
  Review,
  ReviewListResponse,
  ReviewResponse,
  ReviewAnalyticsResponse,
  ReviewFilterParams,
  ReviewAnalytics,
} from '@/lib/types/review'

class ReviewService {
  private baseUrl = '/reviews'

  /**
   * Get all reviews (admin) with filters
   */
  async getAllReviewsAdmin(params?: ReviewFilterParams, signal?: AbortSignal): Promise<{
    reviews: Review[]
    meta?: ReviewListResponse['meta']
  }> {
    const response = await axiosInstance.get<ReviewListResponse>(
      `${this.baseUrl}/all-reviews`,
      { params, signal }
    )
    return {
      reviews: response.data.data || [],
      meta: response.data.meta,
    }
  }

  /**
   * Get reviews for a specific product
   */
  async getReviewsByProduct(
    productId: string,
    params?: Omit<ReviewFilterParams, 'productId'>,
    signal?: AbortSignal
  ): Promise<Review[]> {
    const response = await axiosInstance.get<ReviewListResponse>(
      `${this.baseUrl}`,
      { params: { ...params, productId }, signal }
    )
    return response.data.data || []
  }

  /**
   * Get single review by ID
   */
  async getReviewById(id: string, signal?: AbortSignal): Promise<Review> {
    const response = await axiosInstance.get<ReviewResponse>(
      `${this.baseUrl}/${id}`,
      { signal }
    )
    return response.data.data
  }

  /**
   * Get reviews analytics
   */
  async getReviewsAnalytics(signal?: AbortSignal): Promise<ReviewAnalytics> {
    const response = await axiosInstance.get<ReviewAnalyticsResponse>(
      '/analysis/reviews',
      { signal }
    )
    return response.data.data
  }

  /**
   * Approve a review (admin action)
   */
  async approveReview(id: string, signal?: AbortSignal): Promise<Review> {
    const response = await axiosInstance.put<ReviewResponse>(
      `${this.baseUrl}/${id}/approve`,
      {},
      { signal }
    )
    return response.data.data
  }

  /**
   * Reject a review (admin action)
   */
  async rejectReview(id: string, signal?: AbortSignal): Promise<Review> {
    const response = await axiosInstance.put<ReviewResponse>(
      `${this.baseUrl}/${id}/reject`,
      {},
      { signal }
    )
    return response.data.data
  }
}

export const reviewService = new ReviewService()
