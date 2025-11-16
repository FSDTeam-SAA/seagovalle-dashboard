import { Header } from '@/components/header'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { CreateToppingContent } from '@/components/toppings/create-topping-content'

export default function CreateToppingPage() {
  return (
    <LayoutWrapper>
      <div className="bg-background min-h-screen">
        <Header title="Add New Topping" searchPlaceholder="Search toppings..." />
        <CreateToppingContent />
      </div>
    </LayoutWrapper>
  )
}
