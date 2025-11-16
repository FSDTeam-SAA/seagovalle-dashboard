'use client'

import { Header } from '@/components/header'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { PaymentsPageContent } from '@/components/payments/payments-page-content'

export default function PaymentsPage() {
  return (
    <LayoutWrapper>
      <div className="bg-background min-h-screen">
        <Header title="Payments & Transactions" searchPlaceholder="Search transactions..." />
        <PaymentsPageContent />
      </div>
    </LayoutWrapper>
  )
}
