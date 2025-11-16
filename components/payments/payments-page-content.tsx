'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const transactions = [
  { id: '#TX001', customer: 'Olivia Rhye', amount: '$234.54', method: 'Credit Card', date: '2025-11-15', status: 'Completed' },
  { id: '#TX002', customer: 'Ronald Richards', amount: '$490.51', method: 'Debit Card', date: '2025-11-14', status: 'Completed' },
  { id: '#TX003', customer: 'Jane Cooper', amount: '$150.00', method: 'PayPal', date: '2025-11-14', status: 'Completed' },
  { id: '#TX004', customer: 'Floyd Miles', amount: '$320.75', method: 'Credit Card', date: '2025-11-13', status: 'Pending' },
  { id: '#TX005', customer: 'Darlene Robertson', amount: '$275.25', method: 'Debit Card', date: '2025-11-13', status: 'Completed' },
  { id: '#TX006', customer: 'Robert Fox', amount: '$425.00', method: 'Credit Card', date: '2025-11-12', status: 'Failed' },
  { id: '#TX007', customer: 'Marvin McKinney', amount: '$189.99', method: 'Apple Pay', date: '2025-11-12', status: 'Completed' },
  { id: '#TX008', customer: 'Ralph Edwards', amount: '$550.00', method: 'Credit Card', date: '2025-11-11', status: 'Completed' },
]

const stats = [
  { label: 'Total Revenue', value: '$12,450.50' },
  { label: 'Today\'s Revenue', value: '$2,340.25' },
  { label: 'Pending', value: '$320.75' },
  { label: 'Failed', value: '$425.00' },
]

export function PaymentsPageContent() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(transactions.length / itemsPerPage)

  return (
    <div className="p-6 space-y-6">
      <p className="text-muted-foreground">Welcome back! Here's what's happening with your app today.</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Payment Method</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4 text-sm font-medium">{transaction.id}</td>
                    <td className="py-4 px-4 text-sm">{transaction.customer}</td>
                    <td className="py-4 px-4 text-sm font-semibold">{transaction.amount}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{transaction.method}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{transaction.date}</td>
                    <td className="py-4 px-4 text-sm">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
                        transaction.status === 'Completed'
                          ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                          : transaction.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300'
                          : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                      }`}>
                        {transaction.status === 'Completed' ? '✓' : transaction.status === 'Pending' ? '◐' : '✕'} {transaction.status}
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
