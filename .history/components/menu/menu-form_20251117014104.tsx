'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { X, Upload } from 'lucide-react'
import { toast } from 'sonner'
import { MenuFormData, MenuItem, MenuImage } from '@/lib/services/menu-service'

interface MenuFormProps {
  initialData?: MenuItem
  onSubmit: (data: MenuFormData) => Promise<void>
  isLoading?: boolean
}

export function MenuForm({
  initialData,
  onSubmit,
  isLoading = false,
}: MenuFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    description: initialData?.description || '',
    priceSmall: initialData?.price.small.toString() || '',
    priceMedium: initialData?.price.medium.toString() || '',
    priceLarge: initialData?.price.large.toString() || '',
  })

  console.log(initialData);

  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<MenuImage[]>(
    initialData?.images || []
  )
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const categories = ['Vegetarian', 'Meat', 'Seafood', 'Premium', 'Special']

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Pizza name is required'
    }
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.priceSmall || isNaN(parseFloat(formData.priceSmall))) {
      newErrors.priceSmall = 'Valid small price is required'
    }
    if (!formData.priceMedium || isNaN(parseFloat(formData.priceMedium))) {
      newErrors.priceMedium = 'Valid medium price is required'
    }
    if (!formData.priceLarge || isNaN(parseFloat(formData.priceLarge))) {
      newErrors.priceLarge = 'Valid large price is required'
    }

    if (!initialData && images.length === 0) {
      newErrors.images = 'At least one image is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setImages((prev) => [...prev, file])
        setImagePreviews((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setSubmitting(true)
    try {
      const menuFormData: MenuFormData = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: {
          small: formData.priceSmall,
          medium: formData.priceMedium,
          large: formData.priceLarge,
        },
        images,
        existingImages: initialData?.images,
      }

      await onSubmit(menuFormData)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'An error occurred'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <Label htmlFor="name">Pizza Name</Label>
        <Input
          id="name"
          placeholder="e.g., Classic Pepperoni"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={errors.name ? 'border-destructive' : ''}
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-xs text-destructive mt-1">{errors.name}</p>
        )}
      </div>

      {/* Category Field */}
      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData({ ...formData, category: value })
          }
          disabled={isLoading}
        >
          <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-xs text-destructive mt-1">{errors.category}</p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your pizza..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className={`min-h-24 ${errors.description ? 'border-destructive' : ''}`}
          disabled={isLoading}
        />
        {errors.description && (
          <p className="text-xs text-destructive mt-1">{errors.description}</p>
        )}
      </div>

      {/* Price Fields */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="priceSmall">Small Price</Label>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">$</span>
            <Input
              id="priceSmall"
              type="number"
              placeholder="0.00"
              step="0.01"
              min="0"
              value={formData.priceSmall}
              onChange={(e) =>
                setFormData({ ...formData, priceSmall: e.target.value })
              }
              className={errors.priceSmall ? 'border-destructive' : ''}
              disabled={isLoading}
            />
          </div>
          {errors.priceSmall && (
            <p className="text-xs text-destructive mt-1">{errors.priceSmall}</p>
          )}
        </div>

        <div>
          <Label htmlFor="priceMedium">Medium Price</Label>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">$</span>
            <Input
              id="priceMedium"
              type="number"
              placeholder="0.00"
              step="0.01"
              min="0"
              value={formData.priceMedium}
              onChange={(e) =>
                setFormData({ ...formData, priceMedium: e.target.value })
              }
              className={errors.priceMedium ? 'border-destructive' : ''}
              disabled={isLoading}
            />
          </div>
          {errors.priceMedium && (
            <p className="text-xs text-destructive mt-1">{errors.priceMedium}</p>
          )}
        </div>

        <div>
          <Label htmlFor="priceLarge">Large Price</Label>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">$</span>
            <Input
              id="priceLarge"
              type="number"
              placeholder="0.00"
              step="0.01"
              min="0"
              value={formData.priceLarge}
              onChange={(e) =>
                setFormData({ ...formData, priceLarge: e.target.value })
              }
              className={errors.priceLarge ? 'border-destructive' : ''}
              disabled={isLoading}
            />
          </div>
          {errors.priceLarge && (
            <p className="text-xs text-destructive mt-1">{errors.priceLarge}</p>
          )}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <Label>Pizza Images</Label>
        <label className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:bg-muted transition-colors block disabled:opacity-50 disabled:cursor-not-allowed">
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Click to upload or drag and drop</p>
              <p className="text-xs">PNG, JPG, GIF up to 5MB</p>
            </div>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={isLoading}
          />
        </label>
        {errors.images && (
          <p className="text-xs text-destructive mt-1">{errors.images}</p>
        )}

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview || '/placeholder.svg'}
                  alt={`Preview ${index}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  disabled={isLoading}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-3 pt-4 border-t border-border">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Pizza' : 'Add Pizza'}
        </Button>
      </div>
    </form>
  )
}
