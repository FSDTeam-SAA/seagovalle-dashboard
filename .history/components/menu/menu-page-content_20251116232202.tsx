'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { MenuCard } from '@/components/menu/menu-card'
import { MenuForm } from '@/components/menu/menu-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
import {
  useAdminGetMenus,
  useCreateMenu,
  useUpdateMenu,
  useDeleteMenu,
  useToggleMenuStatus,
} from '@/lib/hooks/use-menu-queries'
import { MenuItem, MenuFormData } from '@/lib/services/menu-service'

export function MenuPageContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  const {
    data: menuItems = [],
    isLoading,
    isError,
    error: queryError,
  } = useAdminGetMenus()

  console.log(menuItems);
  const menuItemsData = menuItems.data as MenuItem

  const createMenuMutation = useCreateMenu()
  const updateMenuMutation = useUpdateMenu(editingId || '')
  const deleteMenuMutation = useDeleteMenu()
  const toggleStatusMutation = useToggleMenuStatus()

  const categories = ['All', 'Vegetarian', 'Meat', 'Seafood', 'Premium', 'Special']

  const filteredItems = useMemo(() => {
    return menuItems?.data?.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [menuItems, searchQuery, selectedCategory])

  const handleSubmitForm = async (formData: MenuFormData) => {
    try {
      if (editingId) {
        await updateMenuMutation.mutateAsync(formData)
        toast.success('Pizza updated successfully')
      } else {
        await createMenuMutation.mutateAsync(formData)
        toast.success('Pizza created successfully')
      }
      setIsAddDialogOpen(false)
      setEditingId(null)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'An error occurred'
      )
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteMenuMutation.mutateAsync(id)
      setDeleteConfirmId(null)
      toast.success('Pizza deleted successfully')
    } catch (error) {
      toast.error('Failed to delete pizza')
    }
  }

  const handleEdit = (id: string) => {
    setEditingId(id)
    setIsAddDialogOpen(true)
  }

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleStatusMutation.mutateAsync(id)
      toast.success('Status updated successfully')
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your app today.
        </p>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              + Add New Pizza
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Pizza' : 'Add New Pizza'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update pizza details' : 'Add a new pizza to your menu'}
              </DialogDescription>
            </DialogHeader>
            <MenuForm
              initialData={
                editingId
                  ? (menuItems.find((item) => item.id === editingId) as any)
                  : undefined
              }
              onSubmit={handleSubmitForm}
              isLoading={
                createMenuMutation.isPending || updateMenuMutation.isPending
              }
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Error State */}
      {isError && (
        <Card className="border-destructive bg-destructive/10">
          <CardContent className="pt-6">
            <p className="text-destructive">
              {queryError?.message || 'Failed to load menu items'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="space-y-4">
        <Input
          placeholder="Search by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full max-w-2xl grid-cols-6">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          onClick={() => setViewMode('grid')}
          size="sm"
        >
          Grid View
        </Button>
        <Button
          variant={viewMode === 'table' ? 'default' : 'outline'}
          onClick={() => setViewMode('table')}
          size="sm"
        >
          Table View
        </Button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div
          className={`grid ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          } gap-6`}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <Skeleton className="h-48 w-full rounded-none" />
              <CardContent className="space-y-3 p-4">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                {...item}
                onEdit={handleEdit}
                onDelete={(id) => setDeleteConfirmId(id)}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <p className="text-muted-foreground p-6">Table view coming soon</p>
            </CardContent>
          </Card>
        )
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No pizzas found. Try adjusting your filters.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Pizza</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this pizza? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              className="bg-destructive hover:bg-destructive/90"
              disabled={deleteMenuMutation.isPending}
            >
              {deleteMenuMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
