'use client'

import { Header } from '@/components/header'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { EditCouponContent } from '@/components/deals/edit-coupon-content'

export default function EditCouponPage() {
  return (
    <LayoutWrapper>
      <div className="bg-background min-h-screen">
        <Header title="Edit Coupon" />
        <EditCouponContent />
      </div>
    </LayoutWrapper>
  )
}
