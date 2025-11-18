import { axiosInstance } from "@/lib/axios-instance";
import {
  Review,
  ReviewListResponse,
  ReviewResponse,
  ReviewAnalyticsResponse,
  ReviewFilterParams,
  ReviewAnalytics,
} from "@/lib/types/review";

class ReviewService {
  private baseUrl = "/review";
  private analysisUrl = "/analysis/reviews";

  /**
   * Get all reviews (admin) with filters
   */
  async getAllReviewsAdmin(
    params?: ReviewFilterParams,
    signal?: AbortSignal
  ): Promise<{
    reviews: Review[];
    meta?: ReviewListResponse["meta"];
    reviewCount?: { [key: number]: number };
  }> {
    const response = await axiosInstance.get<any>(this.baseUrl, {
      params,
      signal,
    });

    const reviews = response.data.data || [];
    const mappedReviews = reviews.map((review: any) => ({
      _id: review._id,
      user: {
        _id: review._id,
        name: review.name,
        email: review.email || "",
        avatar: undefined,
      },
      product: {
        _id: "",
        name: "Product",
      },
      rating: review.rating,
      comment: review.comment,
      images: [],
      status: review.status,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    }));

    return {
      reviews: mappedReviews,
      meta: response.data.meta,
      reviewCount: response.data.reviewCount,
    };
  }

  /**
   * Get reviews for a specific product
   */
  async getReviewsByProduct(
    productId: string,
    params?: Omit<ReviewFilterParams, "productId">,
    signal?: AbortSignal
  ): Promise<Review[]> {
    const response = await axiosInstance.get<ReviewListResponse>(
      `${this.baseUrl}`,
      { params: { ...params, productId }, signal }
    );
    return response.data.data || [];
  }

  /**
   * Get single review by ID
   */
  async getReviewById(id: string, signal?: AbortSignal): Promise<Review> {
    const response = await axiosInstance.get<ReviewResponse>(
      `${this.baseUrl}/${id}`,
      { signal }
    );
    return response.data.data;
  }

  /**
   * Get reviews analytics
   */
  async getReviewsAnalytics(signal?: AbortSignal): Promise<ReviewAnalytics> {
    const response = await axiosInstance.get<any>(this.analysisUrl, { signal });

    const analyticsData = response.data.data;

    // Calculate rating breakdown from reviewCount
    const ratingBreakdown: { [key: number]: number } = {};
    if (response.data.data.reviewCount) {
      Object.entries(response.data.data.reviewCount).forEach(
        ([rating, count]: [string, any]) => {
          ratingBreakdown[parseInt(rating)] = count;
        }
      );
    }

    return {
      totalReviewsAnalysis: analyticsData.totalReviewsAnalysis || 0,
      pendingReviewsAnalysis: analyticsData.pendingReviewsAnalysis || 0,
      approvedReviewAnalysis: analyticsData.approvedReviewAnalysis || 0,
      averageRatingAnalysis: analyticsData.averageRatingAnalysis || 0,
      ratingBreakdown,
    };
  }

  /**
   * Approve a review (admin action)
   */
  async approveReview(id: string, signal?: AbortSignal): Promise<Review> {
    const response = await axiosInstance.put<ReviewResponse>(
      `${this.baseUrl}/${id}/approve`,
      {},
      { signal }
    );
    return response.data.data;
  }

  /**
   * Reject a review (admin action)
   */
  async rejectReview(id: string, signal?: AbortSignal): Promise<Review> {
    const response = await axiosInstance.put<ReviewResponse>(
      `${this.baseUrl}/${id}/reject`,
      {},
      { signal }
    );
    return response.data.data;
  }
}

export const reviewService = new ReviewService();
