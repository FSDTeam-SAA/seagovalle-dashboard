'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ShoppingCart, DollarSign, Users, Clock } from 'lucide-react'

const metrics = [
  {
    title: 'Total Orders',
    value: '1,247',
    change: '+12%',
    icon: ShoppingCart,
    bgColor: 'bg-blue-50 dark:bg-blue-950'
  },
  {
    title: 'Total Earning',
    value: '$3,348',
    change: '+12%',
    icon: DollarSign,
    bgColor: 'bg-green-50 dark:bg-green-950'
  },
  {
    title: 'New Customers',
    value: '56',
    change: '+12%',
    icon: Users,
    bgColor: 'bg-purple-50 dark:bg-purple-950'
  },
  {
    title: 'Pending Orders',
    value: '12',
    change: '+12%',
    icon: Clock,
    bgColor: 'bg-orange-50 dark:bg-orange-950'
  },
]

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.title} className="border border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold mt-2">{metric.value}</p>
                  <p className="text-xs text-green-600 mt-2">{metric.change}</p>
                </div>
                <div className={`${metric.bgColor} p-3 rounded-lg`}>
                  <Icon size={24} className="text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
