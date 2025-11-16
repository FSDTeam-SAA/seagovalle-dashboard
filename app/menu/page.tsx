'use client'

import { Header } from '@/components/header'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { MenuPageContent } from '@/components/menu/menu-page-content'

export default function MenuPage() {
  return (
    <LayoutWrapper>
      <div className="bg-background min-h-screen">
        <Header title="Menu Management" searchPlaceholder="Search pizzas..." />
        <MenuPageContent />
      </div>
    </LayoutWrapper>
  )
}
