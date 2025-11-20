'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CouponForm } from '@/components/coupon/coupon-form'
import { CouponCard } from '@/components/coupon/coupon-card'
import { useGetAllCouponsAdmin } from '@/lib/hooks/use-coupon-queries'
import { useCreateCoupon, useDeleteCoupon, useToggleCouponStatus } from '@/lib/hooks/use-coupon-mutations'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'

import { CreateCouponSchema } from '@/lib/schemas/coupon-schema'

export function DealsPageContent() {
  const router = useRouter()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Queries
  const { data: coupons = [], isLoading, error } = useGetAllCouponsAdmin()

  // Mutations
  const createMutation = useCreateCoupon()
  const deleteMutation = useDeleteCoupon()
  const toggleStatusMutation = useToggleCouponStatus()

  const stats = [
    {
      label: 'Total Deals',
      value: coupons.length.toString(),
    },
    {
      label: 'Active Deals',
      value: coupons.filter((c) => c.isActive).length.toString(),
    },
    {
      label: 'Total Uses',
      value: coupons.reduce((sum, c) => sum + c.timesUsed, 0).toString(),
    },
  ]

  const handleCreateCoupon = async (data: CreateCouponSchema) => {
    await createMutation.mutateAsync(data)
    setIsAddDialogOpen(false)
  }

  const handleDeleteCoupon = (id: string) => {
    deleteMutation.mutate(id)
  }

  const handleToggleStatus = (id: string) => {
    toggleStatusMutation.mutate(id)
  }

  const handleEditCoupon = (id: string) => {
    router.push(`/deals/${id}/edit`)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header and Add Button */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your app today.
        </p>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Plus size={18} />
              Add New Coupons
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Coupon</DialogTitle>
              <DialogDescription>
                Create a new deal or coupon code for your customers
              </DialogDescription>
            </DialogHeader>
            <CouponForm
              onSubmit={handleCreateCoupon}
              isLoading={createMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Coupons List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">All Deals</h3>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : error ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-destructive">Failed to load coupons</p>
            </CardContent>
          </Card>
        ) : coupons.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-muted-foreground">No coupons found</p>
            </CardContent>
          </Card>
        ) : (
          coupons.map((coupon) => (
            <CouponCard
              key={coupon._id}
              coupon={coupon}
              onEdit={handleEditCoupon}
              onDelete={handleDeleteCoupon}
              onToggleStatus={handleToggleStatus}
              isDeleting={deleteMutation.isPending}
              isTogglingStatus={toggleStatusMutation.isPending}
            />
          ))
        )}
      </div>
    </div>
  )
}
