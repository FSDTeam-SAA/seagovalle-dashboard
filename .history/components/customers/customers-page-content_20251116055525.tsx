'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const customers = [
  { name: 'Olivia Rhye', email: 'olivia@untitledui.com', phone: '+1234567890', location: '2715 Ash Dr. San Jose, South Dakota', orders: 123, spent: '$234.54', status: 'Active' },
  { name: 'Ronald Richards', email: 'example@example.com', phone: '+1234567890', location: '3517 W. Gray St. Utica, Pennsylvania', orders: 123, spent: '$234.54', status: 'Active' },
  { name: 'Jane Cooper', email: 'example@example.com', phone: '+1234567890', location: '2118 Thornridge Cir. Syracuse, Connecticut', orders: 123, spent: '$234.54', status: 'Active' },
  { name: 'Floyd Miles', email: 'example@example.com', phone: '+1234567890', location: '4517 Washington Ave. Manchester, Kentucky', orders: 123, spent: '$234.54', status: 'Active' },
  { name: 'Darlene Robertson', email: 'example@example.com', phone: '+1234567890', location: '1901 Thornridge Cir. Shiloh, Hawaii', orders: 123, spent: '$234.54', status: 'Active' },
  { name: 'Robert Fox', email: 'example@example.com', phone: '+1234567890', location: '8502 Preston Rd. Inglewood, Maine', orders: 123, spent: '$234.54', status: 'Active' },
  { name: 'Marvin McKinney', email: 'example@example.com', phone: '+1234567890', location: '6391 Elgin St. Celina, Delaware', orders: 123, spent: '$234.54', status: 'Inactive' },
  { name: 'Ralph Edwards', email: 'example@example.com', phone: '+1234567890', location: '3891 Ranchview Dr. Richardson, California', orders: 123, spent: '$234.54', status: 'Active' },
  { name: 'Jerome Bell', email: 'example@example.com', phone: '+1234567890', location: '4140 Parker Rd. Allentown, New Mexico', orders: 123, spent: '$234.54', status: 'Active' },
  { name: 'Cody Fisher', email: 'example@example.com', phone: '+1234567890', location: '2972 Westheimer Rd. Santa Ana, Illinois', orders: 123, spent: '$234.54', status: 'Active' },
]

export function CustomersPageContent() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(customers.length / itemsPerPage)

  return (
    <div className="p-6 space-y-6">
      <p className="text-muted-foreground">Welcome back! Here's what's happening with your app today.</p>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Customer Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Phone</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Location</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Total Orders</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Total Spent</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4 text-sm font-medium">{customer.name}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{customer.email}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{customer.phone}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground truncate max-w-xs">{customer.location}</td>
                    <td className="py-4 px-4 text-sm font-semibold">{customer.orders}</td>
                    <td className="py-4 px-4 text-sm font-semibold">{customer.spent}</td>
                    <td className="py-4 px-4 text-sm">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
                        customer.status === 'Active'
                          ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
                      }`}>
                        {customer.status === 'Active' ? '✓' : '✕'} {customer.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <Button variant="outline" size="sm" disabled>
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
    </div>
  )
}
