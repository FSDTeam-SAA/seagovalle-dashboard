'use client'

import { Star } from 'lucide-react'

interface RatingStarsProps {
  rating: number
  size?: number
  showLabel?: boolean
  className?: string
}

export function RatingStars({
  rating,
  size = 16,
  showLabel = true,
  className = '',
}: RatingStarsProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={
              i < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-muted-foreground'
            }
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-sm text-muted-foreground">
          {rating} / 5
        </span>
      )}
    </div>
  )
}
