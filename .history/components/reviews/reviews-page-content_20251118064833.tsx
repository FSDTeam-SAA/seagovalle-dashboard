'use client'

import { ReviewAnalytics } from '@/lib/types/review'
import { Card, CardContent } from '@/components/ui/card'
import { RatingStars } from './rating-stars'

interface ReviewAnalyticsProps {
  analytics: ReviewAnalytics
}

export function ReviewAnalyticsWidget({ analytics }: ReviewAnalyticsProps) {
  const stats = [
    {
      label: 'Average Rating',
      value: analytics.averageRatingAnalysis.toFixed(2),
      highlight: true,
    },
    {
      label: 'Total Reviews',
      value: analytics.totalReviewsAnalysis.toString(),
    },
    {
      label: 'Pending Approval',
      value: analytics.pendingReviewsAnalysis.toString(),
    },
    {
      label: 'Approved',
      value: analytics.approvedReviewAnalysis.toString(),
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className={stat.highlight ? 'border-2 border-primary' : ''}
        >
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p
              className={`text-3xl font-bold mt-2 ${
                stat.highlight ? 'text-primary' : ''
              }`}
            >
              {stat.value}
            </p>
            {stat.highlight && (
              <div className="mt-2">
                <RatingStars rating={Math.round(analytics.averageRatingAnalysis)} size={16} showLabel={false} />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function RatingBreakdown({ analytics }: ReviewAnalyticsProps) {
  const ratingBreakdown = analytics.ratingBreakdown || {}
  const maxCount = Math.max(...Object.values(ratingBreakdown), 1)
  const totalReviews = analytics.totalReviewsAnalysis

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-4">Rating Distribution</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingBreakdown[rating] || 0
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0

            return (
              <div key={rating} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium min-w-12">{rating} Stars</span>
                    <RatingStars rating={rating} size={14} showLabel={false} />
                  </div>
                  <span className="text-sm text-muted-foreground">{count}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
