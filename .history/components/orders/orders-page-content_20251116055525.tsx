'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const orders = [
  {
    id: '#12345',
    status: 'Pending',
    estimatedTime: '30-40 mins',
    itemName: 'Margherita Classic',
    specs: 'Size: Large | Toppings: Chudlingpong | Extra Cheese, No Onions',
    name: 'Nam shune kaj nai',
    phone: '+1234567890',
    email: 'hello@example.com',
    address: 'Lorem Ipsum, Lorem Ipsum, 12345',
    amount: '$123.00',
    paymentStatus: 'Paid',
    instructions: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum.',
  },
  {
    id: '#12344',
    status: 'Delivered',
    estimatedTime: '30-40 mins',
    itemName: 'Pepperoni Classic',
    specs: 'Size: Large | Toppings: Extra Cheese',
    name: 'John Doe',
    phone: '+1234567891',
    email: 'john@example.com',
    address: '123 Main St, Dallas, TX',
    amount: '$98.50',
    paymentStatus: 'Paid',
    instructions: 'Ring doorbell twice',
  },
  {
    id: '#12343',
    status: 'In Progress',
    estimatedTime: '15-20 mins',
    itemName: 'Veggie Supreme',
    specs: 'Size: Medium | Toppings: Mushroom, Bell Pepper',
    name: 'Jane Smith',
    phone: '+1234567892',
    email: 'jane@example.com',
    address: '456 Oak Ave, Austin, TX',
    amount: '$75.25',
    paymentStatus: 'Paid',
    instructions: '',
  },
]

export function OrdersPageContent() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<string | null>('#12345')
  const itemsPerPage = 10

  const selectedOrderData = orders.find(o => o.id === selectedOrder) || orders[0]

  return (
    <div className="p-6 space-y-6">
      <p className="text-muted-foreground">Welcome back! Here's what's happening with your app today.</p>

      {/* Status Tabs */}
      <div className="flex gap-4">
        {['All Reviews', 'Pending (2)', 'Completed (123)', 'Cancelled (12)'].map((tab) => (
          <Button
            key={tab}
            variant={tab === 'All Reviews' ? 'default' : 'outline'}
            className="rounded-full"
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {orders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedOrder === order.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  <div className="font-semibold text-sm">{order.id}</div>
                  <div className="text-xs opacity-75">{order.status}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{selectedOrderData.id}</CardTitle>
            <CardDescription className={`inline-flex items-center gap-2 mt-2 px-2 py-1 rounded text-xs font-semibold ${
              selectedOrderData.status === 'Delivered'
                ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                : selectedOrderData.status === 'Pending'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
            }`}>
              {selectedOrderData.status}
              <span>Estimated delivery: {selectedOrderData.estimatedTime}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Item */}
            <div>
              <h4 className="font-semibold text-sm mb-2">Item Name</h4>
              <p className="text-sm">{selectedOrderData.itemName}</p>
              <p className="text-xs text-muted-foreground mt-1">{selectedOrderData.specs}</p>
            </div>

            {/* Contact Details */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Contact Details</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Full Name</p>
                  <p className="font-medium">{selectedOrderData.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Phone Number</p>
                  <p className="font-medium">{selectedOrderData.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Email Address</p>
                  <p className="font-medium">{selectedOrderData.email}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <p className="text-muted-foreground text-xs">Delivery Address</p>
              <p className="font-medium">{selectedOrderData.address}</p>
            </div>

            {/* Order Details */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Order Details</h4>
              <div className="space-y-2 text-sm border-t border-b border-border py-3">
                <div className="flex justify-between">
                  <span>1x Large Pepperoni</span>
                  <span>$18</span>
                </div>
                <div className="flex justify-between">
                  <span>1x Medium Veggie</span>
                  <span>$14.00</span>
                </div>
              </div>
              <div className="flex justify-between font-semibold mt-3">
                <span>Total</span>
                <span>{selectedOrderData.amount}</span>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <p className="text-muted-foreground text-xs">Special Instructions</p>
              <p className="font-medium text-sm">{selectedOrderData.instructions || 'None'}</p>
            </div>

            {/* Payment Status */}
            <div>
              <p className="text-muted-foreground text-xs">Payment Status</p>
              <p className="font-semibold text-green-600">{selectedOrderData.paymentStatus}</p>
            </div>

            {/* Order Timeline */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Order Timeline</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Order Placed</p>
                    <p className="text-muted-foreground text-xs">2 Hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Payment Confirmed</p>
                    <p className="text-muted-foreground text-xs">2 Hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-muted mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">In Progress</p>
                    <p className="text-muted-foreground text-xs">Current</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Update Status */}
            <div className="border-t border-border pt-4 flex gap-3">
              <Input placeholder="Update status..." className="flex-1" />
              <Button className="bg-primary hover:bg-primary/90">Update</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
