import { axiosInstance } from '@/lib/axios-instance'
import {
  Coupon,
  CouponListResponse,
  CouponResponse,
  CouponDeleteResponse,
  CreateCouponDto,
  UpdateCouponDto,
} from '@/lib/types/coupon'

class CouponService {
  private baseUrl = '/coupons'

  /**
   * Get all active coupons (public)
   */
  async getActiveCoupons(signal?: AbortSignal): Promise<Coupon[]> {
    const response = await axiosInstance.get<CouponListResponse>(
      `${this.baseUrl}`,
      { signal }
    )
    return response.data.data || []
  }

  /**
   * Get all coupons (admin)
   */
  async getAllCouponsAdmin(signal?: AbortSignal): Promise<Coupon[]> {
    const response = await axiosInstance.get<CouponListResponse>(
      `${this.baseUrl}/all-coupons`,
      { signal }
    )
    return response.data.data || []
  }

  /**
   * Get single coupon by ID
   */
  async getCouponById(id: string, signal?: AbortSignal): Promise<Coupon> {
    const response = await axiosInstance.get<CouponResponse>(
      `${this.baseUrl}/${id}`,
      { signal }
    )
    return response.data.data
  }

  /**
   * Create new coupon
   */
  async createCoupon(payload: CreateCouponDto): Promise<Coupon> {
    const response = await axiosInstance.post<CouponResponse>(
      `${this.baseUrl}/new-coupon`,
      payload
    )
    return response.data.data
  }

  /**
   * Update existing coupon
   */
  async updateCoupon(id: string, payload: UpdateCouponDto): Promise<Coupon> {
    const response = await axiosInstance.put<CouponResponse>(
      `${this.baseUrl}/update-coupon/${id}`,
      payload
    )
    return response.data.data
  }

  /**
   * Delete coupon
   */
  async deleteCoupon(id: string): Promise<CouponDeleteResponse> {
    const response = await axiosInstance.delete<CouponDeleteResponse>(
      `${this.baseUrl}/delete-coupon/${id}`
    )
    return response.data
  }

  /**
   * Toggle coupon active status
   */
  async toggleCouponStatus(id: string): Promise<Coupon> {
    const response = await axiosInstance.put<CouponResponse>(
      `${this.baseUrl}/toggle-status/${id}`
    )
    return response.data.data
  }
}

export const couponService = new CouponService()
