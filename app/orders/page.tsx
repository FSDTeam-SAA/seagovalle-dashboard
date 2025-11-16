'use client'

import { Header } from '@/components/header'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { OrdersPageContent } from '@/components/orders/orders-page-content'

export default function OrdersPage() {
  return (
    <LayoutWrapper>
      <div className="bg-background min-h-screen">
        <Header title="Order Management" searchPlaceholder="Search orders..." />
        <OrdersPageContent />
      </div>
    </LayoutWrapper>
  )
}
