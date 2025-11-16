import { axiosInstance } from '@/lib/axios-instance'
import {
  Topping,
  ToppingListResponse,
  ToppingResponse,
  ToppingAnalyticsResponse,
  CreateToppingDto,
  UpdateToppingDto,
} from '@/lib/types/topping'

class ToppingService {
  private baseUrl = '/toppings'

  /**
   * Create new topping (multipart/form-data)
   */
  async createTopping(formData: FormData, signal?: AbortSignal): Promise<Topping> {
    const response = await axiosInstance.post<ToppingResponse>(
      `${this.baseUrl}/new-topping`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        signal,
      }
    )
    return response.data.data
  }

  /**
   * Get all available toppings (public)
   */
  async getToppings(params?: { category?: string; page?: number }, signal?: AbortSignal): Promise<Topping[]> {
    const response = await axiosInstance.get<ToppingListResponse>(
      `${this.baseUrl}`,
      { params, signal }
    )
    return response.data.data || []
  }

  /**
   * Get all toppings (admin) with categories metadata
   */
  async getToppingsAdmin(params?: { category?: string; page?: number }, signal?: AbortSignal): Promise<{
    toppings: Topping[]
    allCategories: string[]
  }> {
    const response = await axiosInstance.get<ToppingListResponse>(
      `${this.baseUrl}/all-toppings`,
      { params, signal }
    )
    return {
      toppings: response.data.data || [],
      allCategories: response.data.allCategories || [],
    }
  }

  /**
   * Get single topping by ID
   */
  async getToppingById(id: string, signal?: AbortSignal): Promise<Topping> {
    const response = await axiosInstance.get<ToppingResponse>(
      `${this.baseUrl}/${id}`,
      { signal }
    )
    return response.data.data
  }

  /**
   * Update existing topping (multipart/form-data)
   */
  async updateTopping(id: string, formData: FormData, signal?: AbortSignal): Promise<Topping> {
    const response = await axiosInstance.put<ToppingResponse>(
      `${this.baseUrl}/update-topping/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        signal,
      }
    )
    return response.data.data
  }

  /**
   * Delete topping
   */
  async deleteTopping(id: string, signal?: AbortSignal): Promise<void> {
    await axiosInstance.delete(
      `${this.baseUrl}/delete/${id}`,
      { signal }
    )
  }

  /**
   * Toggle topping availability status
   */
  async toggleToppingStatus(id: string, signal?: AbortSignal): Promise<Topping> {
    const response = await axiosInstance.put<ToppingResponse>(
      `${this.baseUrl}/toggle-status/${id}`,
      {},
      { signal }
    )
    return response.data.data
  }

  /**
   * Get toppings analytics
   */
  async getToppingsAnalysis(signal?: AbortSignal): Promise<ToppingAnalyticsResponse['data']> {
    const response = await axiosInstance.get<ToppingAnalyticsResponse>(
      '/analysis/toppings',
      { signal }
    )
    return response.data.data
  }
}

export const toppingService = new ToppingService()
