'use client'

import { Header } from '@/components/header'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { CustomersPageContent } from '@/components/customers/customers-page-content'

export default function CustomersPage() {
  return (
    <LayoutWrapper>
      <div className="bg-background min-h-screen">
        <Header title="Customers" searchPlaceholder="Search customers..." />
        <CustomersPageContent />
      </div>
    </LayoutWrapper>
  )
}
