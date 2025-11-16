'use client'

import { Header } from '@/components/header'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { DealsPageContent } from '@/components/deals/deals-page-content'

export default function DealsPage() {
  return (
    <LayoutWrapper>
      <div className="bg-background min-h-screen">
        <Header title="Deals & Coupons" searchPlaceholder="Search Coupons" />
        <DealsPageContent />
      </div>
    </LayoutWrapper>
  )
}
