'use client'

import { Coupon } from '@/lib/types/coupon'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Power } from 'lucide-react'
import { format } from 'date-fns'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface CouponCardProps {
  coupon: Coupon
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onToggleStatus?: (id: string) => void
  isDeleting?: boolean
  isTogglingStatus?: boolean
}

export function CouponCard({
  coupon,
  onEdit,
  onDelete,
  onToggleStatus,
  isDeleting = false,
  isTogglingStatus = false,
}: CouponCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDelete = () => {
    onDelete?.(coupon._id)
    setIsDeleteDialogOpen(false)
  }

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Title and Description */}
            <div className="md:col-span-3">
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{coupon.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {coupon.description}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                    coupon.isActive
                      ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
                  }`}
                >
                  {coupon.isActive ? '●' : '○'} {coupon.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {/* Discount Type and Value */}
            <div className="md:col-span-2">
              <p className="text-xs text-muted-foreground">Discount</p>
              <p className="font-semibold text-sm">
                {coupon.discountType === 'Percentage' && `${coupon.discountValue}%`}
                {coupon.discountType === 'Flat' && `$${coupon.discountValue}`}
                {coupon.discountType === 'BuyXGetY' && 'Buy X Get Y'}
                {coupon.discountType === 'FixedPrice' && 'Fixed Price'}
              </p>
            </div>

            {/* Code */}
            <div className="md:col-span-2">
              <p className="text-xs text-muted-foreground">Code</p>
              <p className="font-semibold text-sm font-mono">{coupon.code}</p>
            </div>

            {/* Times Used */}
            <div className="md:col-span-2">
              <p className="text-xs text-muted-foreground">Times Used</p>
              <p className="font-semibold text-sm">{coupon.timesUsed}</p>
            </div>

            {/* Valid Period */}
            <div className="md:col-span-2">
              <p className="text-xs text-muted-foreground">Valid Period</p>
              <p className="font-semibold text-xs">
                {format(new Date(coupon.startDate), 'MMM dd')} - {format(new Date(coupon.endDate), 'MMM dd, yyyy')}
              </p>
            </div>

            {/* Actions */}
            <div className="md:col-span-1 flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleStatus?.(coupon._id)}
                disabled={isTogglingStatus}
                title={coupon.isActive ? 'Deactivate' : 'Activate'}
              >
                <Power size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit?.(coupon._id)}
              >
                <Edit size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
                disabled={isDeleting}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Coupon</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{coupon.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel className="flex-1">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
