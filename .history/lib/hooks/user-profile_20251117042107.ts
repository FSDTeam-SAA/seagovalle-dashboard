import { useQuery } from '@tanstack/react-query'
import { userService } from '@/lib/services/user-service'
import { UserProfile } from '@/lib/types/user'

export function useUserProfile() {
  return useQuery<UserProfile>({
    queryKey: ['user-profile'],
    queryFn: async ({ signal }) => {
      return userService.getMyProfile(signal)
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  })
}
