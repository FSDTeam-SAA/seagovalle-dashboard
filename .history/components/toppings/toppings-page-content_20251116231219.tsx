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
import { ToppingForm } from '@/components/toppings/topping-form'
import { ToppingCard } from '@/components/toppings/topping-card'
import { AdminToppingsTable } from '@/components/toppings/admin-toppings-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { Plus, Grid3x3, TableIcon } from 'lucide-react'

export function ToppingsPageContent() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTopping, setEditingTopping] = useState<Topping | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

}
