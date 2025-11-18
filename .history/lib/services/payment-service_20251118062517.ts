import { axiosInstance } from '@/lib/axios-instance'
import { PaymentsResponse, PaymentStatsResponse, Payment, PaymentStats } from '@/lib/types/payment'

class PaymentService {
  private baseUrl = '/payment'
  private analysisUrl = '/analysis'

  /**
   * Fetch payment statistics
   */
  async getPaymentStats(signal?: AbortSignal): Promise<PaymentStats> {
    const response = await axiosInstance.get<PaymentStatsResponse>(
      `${this.analysisUrl}/payments`,
      { signal }
    )
    return response.data.data
  }

  /**
   * Fetch all payments with pagination
   */
  async getPayments(page: number = 1, limit: number = 10, signal?: AbortSignal): Promise<PaymentsResponse> {
    const response = await axiosInstance.get<PaymentsResponse>(
      `${this.baseUrl}/all-payments`,
      {
        params: { page, limit },
        signal,
      }
    )
    return response.data
  }
}

export const paymentService = new PaymentService()
