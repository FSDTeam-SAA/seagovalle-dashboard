'use client'

import { Review } from '@/lib/types/review'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RatingStars } from './rating-stars'
import { Check, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ReviewCardProps {
  review: Review
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
  isLoading?: boolean
  showActions?: boolean
}

export function ReviewCard({
  review,
  onApprove,
  onReject,
  isLoading = false,
  showActions = false,
}: ReviewCardProps) {
  const statusColor = {
    approved: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Header with User Info */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
                <AvatarFallback>{getInitials(review.user.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm">{review.user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{review.user.email}</p>
              </div>
            </div>

            {/* Status Badge */}
            <Badge className={`shrink-0 ${statusColor[review.status]}`}>
              {review.status === 'approved' && '✓ '}
              {review.status === 'pending' && '◐ '}
              {review.status === 'rejected' && '✕ '}
              {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
            </Badge>
          </div>

          {/* Product and Rating */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Product: {review.product.name}</p>
            <RatingStars rating={review.rating} size={16} />
          </div>

          {/* Review Comment */}
          <div className="space-y-2">
            <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mt-3">
                {review.images.slice(0, 3).map((img, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 bg-muted rounded overflow-hidden"
                  >
                    <img
                      src={img.url || '/placeholder.svg'}
                      alt={`Review image ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {review.images.length > 3 && (
                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-xs font-semibold">
                    +{review.images.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Date */}
          <p className="text-xs text-muted-foreground">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>

          {/* Action Buttons */}
          {showActions && review.status === 'pending' && (
            <div className="flex gap-2 pt-2 border-t">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 gap-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950/20"
                onClick={() => onApprove?.(review._id)}
                disabled={isLoading}
              >
                <Check size={16} />
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 gap-2 text-destructive hover:text-destructive hover:bg-red-50 dark:hover:bg-red-950/20"
                onClick={() => onReject?.(review._id)}
                disabled={isLoading}
              >
                <X size={16} />
                Reject
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
