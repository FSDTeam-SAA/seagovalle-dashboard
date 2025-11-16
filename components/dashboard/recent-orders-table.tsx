'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const orders = [
  { id: '#3066', customer: 'Ronald Richards', item: 'Pizza Name Here', location: '2715 Ash Dr. San Jose, South Dakota 83475', price: '$490.51', status: 'Paid' },
  { id: '#3065', customer: 'Jane Cooper', item: 'Pizza Name Here', location: '3517 W. Gray St. Utica, Pennsylvania 57867', price: '$450.54', status: 'Paid' },
  { id: '#3064', customer: 'Floyd Miles', item: 'Pizza Name Here', location: '2118 Thornridge Cir. Syracuse, Connecticut 35624', price: '$475.22', status: 'Paid' },
  { id: '#3063', customer: 'Darlene Robertson', item: 'Pizza Name Here', location: '4517 Washington Ave. Manchester, Kentucky 39495', price: '$473.85', status: 'Paid' },
  { id: '#3062', customer: 'Robert Fox', item: 'Pizza Name Here', location: '1901 Thornridge Cir. Shiloh, Hawaii 81063', price: '$202.87', status: 'Paid' },
  { id: '#3061', customer: 'Marvin McKinney', item: 'Pizza Name Here', location: '8502 Preston Rd. Inglewood, Maine 98380', price: '$293.01', status: 'Paid' },
  { id: '#3060', customer: 'Ralph Edwards', item: 'Pizza Name Here', location: '6391 Elgin St. Celina, Delaware 10299', price: '$739.65', status: 'Cancelled' },
  { id: '#3059', customer: 'Jerome Bell', item: 'Pizza Name Here', location: '3891 Ranchview Dr. Richardson, California 62639', price: '$778.35', status: 'Paid' },
  { id: '#3058', customer: 'Cody Fisher', item: 'Pizza Name Here', location: '4140 Parker Rd. Allentown, New Mexico 31134', price: '$710.68', status: 'Paid' },
  { id: '#3057', customer: 'Cameron Williamson', item: 'Pizza Name Here', location: '2972 Westheimer Rd. Santa Ana, Illinois 85486', price: '$406.27', status: 'Paid' },
]

export function RecentOrdersTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(orders.length / itemsPerPage)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest customer orders</CardDescription>
        </div>
        <Button variant="link" className="text-primary">See all</Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-sm">Invoice</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Item</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Price</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-4 px-4 text-sm font-medium">{order.id}</td>
                  <td className="py-4 px-4 text-sm">{order.customer}</td>
                  <td className="py-4 px-4 text-sm">{order.item}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground truncate max-w-xs">{order.location}</td>
                  <td className="py-4 px-4 text-sm font-semibold">{order.price}</td>
                  <td className="py-4 px-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      order.status === 'Paid' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' 
                        : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                    }`}>
                      {order.status === 'Paid' ? '✓ ' : '✕ '}{order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <Button variant="outline" size="sm">
            <ChevronLeft size={16} className="mr-1" /> Previous
          </Button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm">
            Next <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
