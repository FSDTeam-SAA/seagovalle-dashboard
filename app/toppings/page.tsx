import { Header } from '@/components/header'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { ToppingsPageContent } from '@/components/toppings/toppings-page-content'

export default function ToppingsPage() {
  return (
    <LayoutWrapper>
      <div className="bg-background min-h-screen">
        <Header
          title="Toppings & Ingredients"
          searchPlaceholder="Search toppings..."
        />
        <ToppingsPageContent />
      </div>
    </LayoutWrapper>
  )
}
