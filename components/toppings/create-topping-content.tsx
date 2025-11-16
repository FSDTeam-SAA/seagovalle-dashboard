'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ToppingForm } from '@/components/toppings/topping-form'
import { useCreateTopping } from '@/lib/hooks/use-topping-mutations'
import { useGetToppingsAdmin } from '@/lib/hooks/use-topping-queries'
import { CreateToppingSchema } from '@/lib/schemas/topping-schema'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CreateToppingContent() {
  const router = useRouter()
  const createTopping = useCreateTopping()
  const { data: adminData } = useGetToppingsAdmin()
  const allCategories = adminData?.allCategories || []

  const handleCreateTopping = async (data: CreateToppingSchema & { image?: File | null }) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('price', data.price.toString())
    formData.append('category', data.category)
    if (data.description) {
      formData.append('description', data.description)
    }
    if (data.image) {
      formData.append('image', data.image)
    }

    try {
      await createTopping.mutateAsync(formData)
      router.push('/toppings')
    } catch (error) {
      console.error('Error creating topping:', error)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="gap-2 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Toppings
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Create New Topping</CardTitle>
          <CardDescription>
            Add a new topping to your pizza menu with pricing and image.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ToppingForm
            onSubmit={handleCreateTopping}
            isLoading={createTopping.isPending}
            categories={allCategories}
            onCancel={() => router.back()}
          />
        </CardContent>
      </Card>
    </div>
  )
}
