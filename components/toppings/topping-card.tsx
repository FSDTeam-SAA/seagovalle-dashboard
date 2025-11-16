'use client'

import { Topping } from '@/lib/types/topping'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Power } from 'lucide-react'
import Image from 'next/image'

interface ToppingCardProps {
  topping: Topping
  onEdit?: (topping: Topping) => void
  onDelete?: (id: string) => void
  onToggleStatus?: (id: string) => void
  isLoading?: boolean
}

export function ToppingCard({
  topping,
  onEdit,
  onDelete,
  onToggleStatus,
  isLoading = false,
}: ToppingCardProps) {
  const imageUrl = typeof topping.image === 'string' ? topping.image : topping.image?.url

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full h-40 bg-muted">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={topping.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{topping.name}</h3>
            <p className="text-xs text-muted-foreground">{topping.category}</p>
          </div>
          <Badge
            variant={topping.isAvailable ? 'default' : 'secondary'}
            className="ml-2 shrink-0"
          >
            {topping.isAvailable ? 'Available' : 'Out of Stock'}
          </Badge>
        </div>

        {/* Description */}
        {topping.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {topping.description}
          </p>
        )}

        {/* Price */}
        <p className="text-lg font-bold text-primary">${topping.price.toFixed(2)}</p>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {onToggleStatus && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onToggleStatus(topping._id)}
              disabled={isLoading}
              className="flex-1 gap-2"
              title={topping.isAvailable ? 'Deactivate' : 'Activate'}
            >
              <Power className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">
                {topping.isAvailable ? 'Active' : 'Inactive'}
              </span>
            </Button>
          )}

          {onEdit && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(topping)}
              disabled={isLoading}
              className="gap-2"
            >
              <Edit className="w-4 h-4" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
          )}

          {onDelete && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(topping._id)}
              disabled={isLoading}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Delete</span>
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
