'use client'

import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ToppingForm } from '@/components/toppings/topping-form'
import { useGetTopping, useGetToppingsAdmin } from '@/lib/hooks/use-topping-queries'
import { useUpdateTopping } from '@/lib/hooks/use-topping-mutations'
import { CreateToppingSchema } from '@/lib/schemas/topping-schema'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function EditToppingContent() {
  const router = useRouter()
  const params = useParams()
  const toppingId = params.id as string

  const { data: topping, isLoading: isLoadingTopping } = useGetTopping(toppingId)
  const updateTopping = useUpdateTopping(toppingId)
  const { data: adminData } = useGetToppingsAdmin()
  const allCategories = adminData?.allCategories || []

  const handleUpdateTopping = async (data: CreateToppingSchema & { image?: File | null }) => {
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
      await updateTopping.mutateAsync(formData)
      router.push('/toppings')
    } catch (error) {
      console.error('Error updating topping:', error)
    }
  }

  if (isLoadingTopping) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!topping) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            Topping not found
          </CardContent>
        </Card>
      </div>
    )
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
          <CardTitle>Edit Topping</CardTitle>
          <CardDescription>
            Update topping details, pricing, and image.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ToppingForm
            onSubmit={handleUpdateTopping}
            isLoading={updateTopping.isPending}
            initialData={{
              name: topping.name,
              price: topping.price,
              category: topping.category,
              description: topping.description,
              image: typeof topping.image === 'string' ? topping.image : topping.image?.url,
            }}
            categories={allCategories}
            onCancel={() => router.back()}
          />
        </CardContent>
      </Card>
    </div>
  )
}
