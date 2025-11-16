import { Header } from '@/components/header'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { EditToppingContent } from '@/components/toppings/edit-topping-content'

export default function EditToppingPage() {
  return (
    <LayoutWrapper>
      <div className="bg-background min-h-screen">
        <Header title="Edit Topping" searchPlaceholder="Search toppings..." />
        <EditToppingContent />
      </div>
    </LayoutWrapper>
  )
}
