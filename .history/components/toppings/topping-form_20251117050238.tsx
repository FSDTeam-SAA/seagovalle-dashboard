'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createToppingSchema, CreateToppingSchema } from '@/lib/schemas/topping-schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ImageUploader } from './image-uploader'
import { useState } from 'react'

interface ToppingFormProps {
  onSubmit: (data: CreateToppingSchema & { image?: File | null }) => Promise<void>
  isLoading?: boolean
  initialData?: Partial<CreateToppingSchema>
  categories?: string[]
  onCancel?: () => void
}

export function ToppingForm({
  onSubmit,
  isLoading = false,
  initialData,
  categories = ['Meat', 'Cheese', 'Vegetables', 'Sauce'],
  onCancel,
}: ToppingFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const form = useForm<CreateToppingSchema>({
    resolver: zodResolver(createToppingSchema),
    defaultValues: {
      name: initialData?.name || '',
      price: initialData?.price || 0,
      category: initialData?.category || '',
      description: initialData?.description || '',
    },
  })

  const handleFormSubmit = async (data: CreateToppingSchema) => {
    await onSubmit({
      ...data,
      image: selectedImage ?? undefined,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Pepperoni"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Field */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price Field */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    {...field}
                    className="pl-8"
                    disabled={isLoading}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe this topping..."
                  {...field}
                  disabled={isLoading}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Uploader */}
        <div>
          <Label>Image (Optional)</Label>
          <ImageUploader
            onImageSelect={setSelectedImage}
            currentImage={initialData?.image ? String(initialData.image) : undefined}
            isLoading={isLoading}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {isLoading ? 'Saving...' : 'Save Topping'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
