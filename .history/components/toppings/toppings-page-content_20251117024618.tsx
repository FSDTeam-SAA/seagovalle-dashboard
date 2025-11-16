'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToppingForm } from '@/components/toppings/topping-form'
import { Skeleton } from '@/components/ui/skeleton'
import {
  useGetToppingsAdmin,
  useGetToppingsAnalysis,
} from '@/lib/hooks/use-topping-queries'
import {
  useCreateTopping,
  useUpdateTopping,
  useDeleteTopping,
  useToggleToppingStatus,
} from '@/lib/hooks/use-topping-mutations'
import { CreateToppingSchema } from '@/lib/schemas/topping-schema'
import { Topping } from '@/lib/types/topping'
import { Plus } from 'lucide-react'
import { ToppingsGroupedTable } from './toppings-grouped-table'

export function ToppingsPageContent() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTopping, setEditingTopping] = useState<Topping | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const { data: adminData, isLoading } = useGetToppingsAdmin()
  const createTopping = useCreateTopping()
  const updateTopping = useUpdateTopping(editingTopping?.id || '')
  const deleteTopping = useDeleteTopping()
  const toggleStatus = useToggleToppingStatus()

  const toppings = adminData?.toppings || []
  const allCategories = adminData?.allCategories || []
  const stats = adminData?.stats

  const filteredToppings = useMemo(() => {
    if (selectedCategory === 'all') return toppings
    return toppings.filter((t) => t.category === selectedCategory)
  }, [toppings, selectedCategory])

  const toppingsByCategory = useMemo(() => {
    return filteredToppings.reduce(
      (acc, topping) => {
        if (!acc[topping.category]) {
          acc[topping.category] = []
        }
        acc[topping.category].push(topping)
        return acc
      },
      {} as Record<string, Topping[]>
    )
  }, [filteredToppings])

  const handleAddTopping = async (data: CreateToppingSchema & { image?: File | null }) => {
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
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error('Error adding topping:', error)
    }
  }

  const handleUpdateTopping = async (data: CreateToppingSchema & { image?: File | null }) => {
    if (!editingTopping) return

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
      setEditingTopping(null)
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error('Error updating topping:', error)
    }
  }

  const handleDeleteTopping = async () => {
    if (!deleteConfirmId) return

    try {
      await deleteTopping.mutateAsync(deleteConfirmId)
      setDeleteConfirmId(null)
    } catch (error) {
      console.error('Error deleting topping:', error)
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-slate-900 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Toppings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalToppings}</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-slate-900 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.available}</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-slate-900 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Out of Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.outOfStock}</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-slate-900 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{allCategories.length}</div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {allCategories.length > 0 && (
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {allCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90 whitespace-nowrap">
              <Plus className="w-4 h-4" />
              Add New Toppings
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTopping ? 'Edit Topping' : 'Add New Toppings & Ingredients'}
              </DialogTitle>
              <DialogDescription>
                {editingTopping
                  ? 'Update topping details'
                  : 'Add a new topping or ingredient to your menu'}
              </DialogDescription>
            </DialogHeader>
            <ToppingForm
              onSubmit={editingTopping ? handleUpdateTopping : handleAddTopping}
              isLoading={createTopping.isPending || updateTopping.isPending}
              initialData={
                editingTopping
                  ? {
                      name: editingTopping.name,
                      price: editingTopping.price,
                      category: editingTopping.category,
                      description: editingTopping.description,
                      image:
                        typeof editingTopping.image === 'string'
                          ? editingTopping.image
                          : editingTopping.image?.url,
                    }
                  : undefined
              }
              categories={allCategories}
              onCancel={() => {
                setIsAddDialogOpen(false)
                setEditingTopping(null)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-12 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : Object.keys(toppingsByCategory).length > 0 ? (
        <ToppingsGroupedTable
          toppingsByCategory={toppingsByCategory}
          onEdit={(topping) => {
            setEditingTopping(topping)
            setIsAddDialogOpen(true)
          }}
          onDelete={(id) => setDeleteConfirmId(id)}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No toppings found</p>
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Topping</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this topping? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTopping}
              className="bg-destructive hover:bg-destructive/90"
              disabled={deleteTopping.isPending}
            >
              {deleteTopping.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
