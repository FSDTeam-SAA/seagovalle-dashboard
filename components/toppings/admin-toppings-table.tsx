'use client'

import { Topping } from '@/lib/types/topping'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Edit, Trash2, Power } from 'lucide-react'
import Image from 'next/image'

interface AdminToppingsTableProps {
  toppings: Topping[]
  onEdit?: (topping: Topping) => void
  onDelete?: (id: string) => void
  onToggleStatus?: (id: string) => void
  isLoading?: boolean
}

export function AdminToppingsTable({
  toppings,
  onEdit,
  onDelete,
  onToggleStatus,
  isLoading = false,
}: AdminToppingsTableProps) {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {toppings.map((topping) => {
            const imageUrl = typeof topping.image === 'string' ? topping.image : topping.image?.url

            return (
              <TableRow key={topping._id} className="hover:bg-muted/50">
                <TableCell>
                  {imageUrl && (
                    <div className="relative w-10 h-10 rounded-md overflow-hidden bg-muted">
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={topping.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{topping.name}</TableCell>
                <TableCell>{topping.category}</TableCell>
                <TableCell className="font-semibold">${topping.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={topping.isAvailable ? 'default' : 'secondary'}
                  >
                    {topping.isAvailable ? 'Available' : 'Out of Stock'}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(topping.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={isLoading}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {onToggleStatus && (
                        <DropdownMenuItem
                          onClick={() => onToggleStatus(topping._id)}
                          className="gap-2"
                        >
                          <Power className="w-4 h-4" />
                          {topping.isAvailable ? 'Deactivate' : 'Activate'}
                        </DropdownMenuItem>
                      )}
                      {onEdit && (
                        <DropdownMenuItem
                          onClick={() => onEdit(topping)}
                          className="gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </DropdownMenuItem>
                      )}
                      {onDelete && (
                        <DropdownMenuItem
                          onClick={() => onDelete(topping._id)}
                          className="gap-2 text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
