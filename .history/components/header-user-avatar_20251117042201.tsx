'use client'

import { useUserProfile } from '@/lib/hooks/use-user-profile'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function HeaderUserAvatar() {
  const { data: profile, isLoading } = useUserProfile()

  if (isLoading || !profile) {
    return (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground animate-pulse">
            --
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
          <div className="h-3 w-24 bg-muted rounded animate-pulse mt-2" />
        </div>
      </div>
    )
  }

  // Create initials from first and last name
  const initials = `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase()

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback className="bg-primary text-primary-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold text-sm">{`${profile.firstName} ${profile.lastName}`}</p>
        <p className="text-xs text-muted-foreground">{profile.email}</p>
      </div>
    </div>
  )
}
