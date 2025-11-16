'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const pizzas = [
  { name: 'Pepperoni Classic', sold: 342 },
  { name: 'Supreme Deluxe', sold: 342 },
  { name: 'Meat Lovers', sold: 342 },
  { name: 'Veggie Garden', sold: 342 },
  { name: 'Pepperoni Classic', sold: 342 },
]

export function PopularPizzasChart() {
  const maxSold = Math.max(...pizzas.map(p => p.sold))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Pizzas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pizzas.map((pizza, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm font-medium">{pizza.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(pizza.sold / maxSold) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold">{pizza.sold}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
