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
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit2, Trash2 } from 'lucide-react'

interface ToppingsGroupedTableProps {
  toppingsByCategory: Record<string, Topping[]>
  onEdit?: (topping: Topping) => void
  onDelete?: (id: string) => void
}

export function ToppingsGroupedTable({
  toppingsByCategory,
  onEdit,
  onDelete,
}: ToppingsGroupedTableProps) {
  return (
    <div className="space-y-8">
      {Object.entries(toppingsByCategory).map(([category, toppings]) => (
        <div key={category} className="space-y-3">
          <h3 className="text-lg font-semibold">{category}</h3>
          <div className="overflow-x-auto border rounded-lg border-border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="font-semibold">Topping Name</TableHead>
                  <TableHead className="font-semibold">Price</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Availability</TableHead>
                  <TableHead className="text-right font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {toppings.map((topping) => (
                  <TableRow key={topping._id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{topping.name}</TableCell>
                    <TableCell className="font-semibold">
                      ${topping.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={topping.isAvailable ? 'default' : 'secondary'}
                        className={topping.isAvailable ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : ''}
                      >
                        {topping.isAvailable ? '✓ Available' : 'Out of Stock'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(topping)}
                            className="h-8 w-8 p-0 hover:bg-muted"
                          >
                            <Edit2 className="w-4 h-4 text-primary" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(topping._id)}
                            className="h-8 w-8 p-0 hover:bg-muted"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </div>
  )
}
