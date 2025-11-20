'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter, useParams } from 'next/navigation'
import { CouponForm } from '@/components/coupon/coupon-form'
import { useGetCoupon } from '@/lib/hooks/use-coupon-queries'
import { useUpdateCoupon } from '@/lib/hooks/use-coupon-mutations'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft } from 'lucide-react'

import { CreateCouponSchema } from '@/lib/schemas/coupon-schema'

export function EditCouponContent() {
  const router = useRouter()
  const params = useParams()
  const couponId = params.id as string

  const { data: coupon, isLoading: isLoadingCoupon } = useGetCoupon(couponId)
  const updateMutation = useUpdateCoupon(couponId)

  const handleUpdateCoupon = async (data: CreateCouponSchema) => {
    await updateMutation.mutateAsync(data)
    router.push('/deals')
  }

  if (isLoadingCoupon) {
    return (
      <div className="p-6">
        <Skeleton className="h-screen w-full" />
      </div>
    )
  }

  if (!coupon) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <p className="text-destructive">Coupon not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-4 gap-2"
      >
        <ArrowLeft size={18} />
        Back
      </Button>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Edit Coupon</CardTitle>
        </CardHeader>
        <CardContent>
          <CouponForm
            onSubmit={handleUpdateCoupon}
            isLoading={updateMutation.isPending}
            initialData={coupon}
          />
        </CardContent>
      </Card>
    </div>
  )
}
