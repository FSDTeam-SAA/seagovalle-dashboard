import { axiosInstance } from '@/lib/axios-instance'
import { UserProfile, UserProfileResponse } from '@/lib/types/user'

class UserService {
  private baseUrl = '/user'

  /**
   * Fetch current user's profile
   */
  async getMyProfile(signal?: AbortSignal): Promise<UserProfile> {
    const response = await axiosInstance.get<UserProfileResponse>(
      `${this.baseUrl}/my-profile`,
      { signal }
    )
    return response.data.data
  }
}

export const userService = new UserService()
