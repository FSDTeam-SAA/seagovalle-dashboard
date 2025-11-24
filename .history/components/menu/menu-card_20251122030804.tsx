'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trash2, Edit, Star, Power } from 'lucide-react'
interface MenuImage{
  url: string
}
interface MenuCardProps {
  _id: string
  name: string
  description: string
  category: string
  price: { small: number; medium: number; large: number }
  images: MenuImage[]
  rating?: number
  isAvailable?: boolean
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onToggleStatus?: (id: string) => void
  isToggling?: boolean
}

export function MenuCard({
  _id,
  name,
  description,
  category,
  price,
  images,
  isAvailable = true,
  onEdit,
  onDelete,
  onToggleStatus,
  isToggling = false,
}: MenuCardProps) {
  const thumbnailImage = images?.[0].url || '/placeholder.svg'

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow pt-0">
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
        <img
          src={thumbnailImage || '/placeholder.svg'}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg'
          }}
        />
        <Badge
          variant={isAvailable ? 'default' : 'secondary'}
          className="absolute top-3 right-3"
        >
          {isAvailable ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <CardTitle className="text-lg">{name}</CardTitle>
            <p className="text-xs text-muted-foreground font-medium mt-1">{category}</p>
          </div>
          {/* {rating && (
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
          )} */}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Prices */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <p className="text-muted-foreground">Small</p>
            <p className="font-bold text-primary text-2xl">${price.small.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Medium</p>
            <p className="font-bold text-primary text-2xl">${price.medium.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Large</p>
            <p className="font-bold text-primary text-2xl">${price.large.toFixed(2)}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={() => onEdit(_id)}
          >
            <Edit size={16} /> Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2 text-destructive hover:bg"
            onClick={() => onDelete(_id)}
          >
            <Trash2 size={16} /> Delete
          </Button>
          {onToggleStatus && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => onToggleStatus(_id)}
              disabled={isToggling}
              title={isAvailable ? 'Deactivate' : 'Activate'}
            >
              < size={16} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
