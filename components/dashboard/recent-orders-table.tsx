"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useGetOrders } from "@/lib/hooks/use-orders";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { OrderDetailsDialog } from "./order-details-dialog";
import { Order } from "@/lib/types/order";

export function RecentOrdersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: orders = [], isLoading, isError } = useGetOrders();

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "delivered":
        return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "✓ Approved";
      case "delivered":
        return "✓ Delivered";
      case "pending":
        return "⏳ Pending";
      case "cancelled":
        return "✕ Cancelled";
      default:
        return status;
    }
  };

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest customer orders</CardDescription>
        </div>
        <Button variant="link" className="text-primary">
          See all
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-8 w-40" />
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center text-red-600 dark:text-red-400 py-8">
              Failed to load orders
            </div>
          ) : (
            <>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-sm">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">
                      Address
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">
                      Total
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-border hover:bg-muted/50"
                    >
                      <td className="py-4 px-4 text-sm font-medium">
                        #{order._id.slice(-4)}
                      </td>
                      <td className="py-4 px-4 text-sm">
                        {order.deliveryDetails.fullName}
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground truncate max-w-xs">
                        {order.deliveryDetails.address}
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold">
                        ${order.finalPrice.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(order.createdAt), {
                          addSuffix: true,
                        })}
                      </td>
                      <td className="py-4 px-4 text-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewOrder(order)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                >
                  <ChevronLeft size={16} className="mr-1" /> Previous
                </Button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                >
                  Next <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <OrderDetailsDialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        order={selectedOrder}
      />
    </Card>
  );
}
