'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trash2, Edit, Star, Power } from 'lucide-react'

interface MenuImage {
  url: string
}
interface PriceObject {
  small?: number
  medium?: number
  large?: number
}

interface MenuCardProps {
  _id: string
  name: string
  description: string
  category: string
  // accept either new array shape or legacy object shape
  price?: number[] | PriceObject
  // sizes might be numbers or strings depending on source
  sizes?: (number | string)[]
  pieces?: number[]
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
  sizes,
  pieces,
  images,
  isAvailable = true,
  onEdit,
  onDelete,
  onToggleStatus,
  isToggling = false,
}: MenuCardProps) {
  const thumbnailImage = images?.[0]?.url || '/noimage.jpg'

  // normalize price to an array for rendering
  const priceArray: number[] = Array.isArray(price)
    ? (price as number[])
    : price
    ? [
        Number((price as PriceObject).small ?? NaN),
        Number((price as PriceObject).medium ?? NaN),
        Number((price as PriceObject).large ?? NaN),
      ].filter((n) => !Number.isNaN(n))
    : []

  const sizesArray = Array.isArray(sizes) ? sizes : sizes ? [sizes] : []
  const piecesArray = Array.isArray(pieces) ? pieces : pieces ? [pieces] : []

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow pt-0">
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
        <img
          src={thumbnailImage || '/noimage.jpg'}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/noimage.jpg'
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
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Prices / Sizes / Pieces */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <p className="text-muted-foreground">Prices</p>
            {priceArray.length ? (
              priceArray.map((p, index) => (
                <p key={index} className="font-bold text-primary text-2xl">${p}</p>
              ))
            ) : (
              <p className="text-muted-foreground">—</p>
            )}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">Sizes</p>
            {sizesArray.length ? (
              sizesArray.map((s, index) => (
                <p key={index} className="font-bold text-primary text-2xl">{s}</p>
              ))
            ) : (
              <p className="text-muted-foreground">—</p>
            )}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">Pieces</p>
            {piecesArray.length ? (
              piecesArray.map((p, index) => (
                <p key={index} className="font-bold text-primary text-2xl">{p}</p>
              ))
            ) : (
              <p className="text-muted-foreground">—</p>
            )}
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
              <Power size={16} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
