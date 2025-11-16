'use client'

import { Button } from '@/components/ui/button'
import { ReviewFilterParams } from '@/lib/types/review'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface ReviewFiltersProps {
  onFiltersChange: (filters: ReviewFilterParams) => void
  onSearch: (query: string) => void
}

export function ReviewFilters({
  onFiltersChange,
  onSearch,
}: ReviewFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRating, setSelectedRating] = useState<number | undefined>()
  const [selectedStatus, setSelectedStatus] = useState<'pending' | 'approved' | 'rejected' | undefined>()

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  const handleRatingChange = (rating: number | undefined) => {
    setSelectedRating(rating)
    onFiltersChange({
      rating,
      status: selectedStatus,
      search: searchQuery,
    })
  }

  const handleStatusChange = (status: 'pending' | 'approved' | 'rejected' | undefined) => {
    setSelectedStatus(status)
    onFiltersChange({
      rating: selectedRating,
      status,
      search: searchQuery,
    })
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <Input
        placeholder="Search reviews by user name or comment..."
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="w-full"
      />

      {/* Rating Filter */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Rating</p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={selectedRating === undefined ? 'default' : 'outline'}
            onClick={() => handleRatingChange(undefined)}
          >
            All Ratings
          </Button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <Button
              key={rating}
              size="sm"
              variant={selectedRating === rating ? 'default' : 'outline'}
              onClick={() => handleRatingChange(rating)}
            >
              {rating} Stars
            </Button>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Status</p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={selectedStatus === undefined ? 'default' : 'outline'}
            onClick={() => handleStatusChange(undefined)}
          >
            All
          </Button>
          <Button
            size="sm"
            variant={selectedStatus === 'pending' ? 'default' : 'outline'}
            onClick={() => handleStatusChange('pending')}
          >
            Pending
          </Button>
          <Button
            size="sm"
            variant={selectedStatus === 'approved' ? 'default' : 'outline'}
            onClick={() => handleStatusChange('approved')}
          >
            Approved
          </Button>
          <Button
            size="sm"
            variant={selectedStatus === 'rejected' ? 'default' : 'outline'}
            onClick={() => handleStatusChange('rejected')}
          >
            Rejected
          </Button>
        </div>
      </div>
    </div>
  )
}
