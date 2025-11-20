"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";
import { useGetOrders } from "@/lib/hooks/use-orders";
import { Skeleton } from "@/components/ui/skeleton";
// import { Order } from "@/lib/types/order";
import { formatDistanceToNow, format } from "date-fns";
import { orderService } from "@/lib/services/order-service";
import { toast } from "sonner";

export function OrdersPageContent() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { data: orders = [], isLoading, isError } = useGetOrders();

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") {
      return orders;
    }
    return orders.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  const statusCounts = useMemo(() => {
    const counts = {
      all: orders.length,
      pending: 0,
      approved: 0,
      cancelled: 0,
      delivered: 0,
    };
    orders.forEach((order) => {
      counts[order.status as keyof typeof counts]++;
    });
    return counts;
  }, [orders]);

  const selectedOrder = useMemo(() => {
    if (selectedOrderId === null && orders.length > 0) {
      setSelectedOrderId(orders[0]._id);
      return orders[0];
    }
    return orders.find((o) => o._id === selectedOrderId) || orders[0] || null;
  }, [orders, selectedOrderId]);

  useMemo(() => {
    if (selectedOrder && selectedStatus === "") {
      setSelectedStatus(selectedOrder.status);
    }
  }, [selectedOrder, selectedStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
      case "approved":
        return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder || !selectedStatus) return;

    try {
      setIsUpdating(true);
      await orderService.updateOrderStatus(selectedOrder._id, selectedStatus);
      // await mutate();
      setSelectedStatus(selectedStatus);
      toast.success("Order status updated successfully");
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update order status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isError) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600 dark:text-red-400 py-12">
          Failed to load orders. Please check your API configuration.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <p className="text-muted-foreground">
        Welcome back! Here's what's happening with your app today.
      </p>

      <div className="flex flex-wrap gap-2">
        {["all", "pending", "approved", "cancelled", "delivered"].map(
          (status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              className="rounded-full capitalize"
              onClick={() => setStatusFilter(status)}
            >
              {status === "all"
                ? `All (${statusCounts.all})`
                : `${getStatusLabel(status)} (${
                    statusCounts[status as keyof typeof statusCounts]
                  })`}
            </Button>
          )
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <Skeleton className="h-6 w-20" />
            </CardHeader>
            <CardContent className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader>
              <Skeleton className="h-8 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>
      ) : filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No orders found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredOrders.map((order) => (
                  <button
                    key={order._id}
                    onClick={() => setSelectedOrderId(order._id)}
                    className={`w-full cursor-pointer text-left p-3 rounded-lg border transition-colors ${
                      selectedOrder?._id === order._id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <div className="font-semibold text-sm">
                      #{order._id.slice(-5)}
                    </div>
                    <div className="text-xs opacity-75">
                      {getStatusLabel(order.status)}
                    </div>
                    <div className="text-xs opacity-75 mt-1">
                      ${order.finalPrice.toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedOrder && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>#{selectedOrder._id.slice(-5)}</CardTitle>
                <CardDescription
                  className={`inline-flex items-center gap-2 mt-2 px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                    selectedOrder.status
                  )}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      selectedOrder.status === "delivered" ||
                      selectedOrder.status === "approved"
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    }`}
                  />
                  {getStatusLabel(selectedOrder.status)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-sm mb-3">Order Items</h4>
                  <div className="space-y-2 border-t border-b border-border py-3">
                    {selectedOrder.cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>
                          {item.quantity}x
                          {item.size
                            ? ` ${
                                item.size.charAt(0).toUpperCase() +
                                item.size.slice(1)
                              }`
                            : ""}{" "}
                          Pizza
                        </span>
                        <span className="font-medium">
                          ${item.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  {selectedOrder.couponCode && (
                    <div className="mt-2 text-sm">
                      <p className="text-muted-foreground">
                        Coupon Applied:{" "}
                        <span className="font-medium">
                          {selectedOrder.couponCode}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3">
                    Contact Details
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Full Name</p>
                      <p className="font-medium">
                        {selectedOrder.deliveryDetails.fullName}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Phone</p>
                      <p className="font-medium">
                        {selectedOrder.deliveryDetails.phone}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground text-xs">Email</p>
                      <p className="font-medium">
                        {selectedOrder.deliveryDetails.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground text-xs">
                    Delivery Address
                  </p>
                  <p className="font-medium">
                    {selectedOrder.deliveryDetails.address}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3">Order Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>
                        $
                        {selectedOrder.cart
                          .reduce((sum, item) => sum + item.totalPrice, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                    {selectedOrder.couponCode && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({selectedOrder.couponCode})</span>
                        <span>
                          -$
                          {(
                            selectedOrder.cart.reduce(
                              (sum, item) => sum + item.totalPrice,
                              0
                            ) - selectedOrder.finalPrice
                          ).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-border mt-3 pt-3 flex justify-between font-bold text-lg text-primary">
                    <span>Total</span>
                    <span>${selectedOrder.finalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {selectedOrder.deliveryDetails.note && (
                  <div>
                    <p className="text-muted-foreground text-xs">
                      Special Instructions
                    </p>
                    <p className="font-medium text-sm">
                      {selectedOrder.deliveryDetails.note}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-muted-foreground text-xs">
                    Payment Status
                  </p>
                  <p className="font-semibold text-green-600">Paid</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3">Order Timeline</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Order Placed</p>
                        <p className="text-muted-foreground text-xs">
                          {formatDistanceToNow(
                            new Date(selectedOrder.createdAt),
                            { addSuffix: true }
                          )}
                        </p>
                      </div>
                    </div>
                    {selectedOrder.status !== "pending" && (
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">
                            Order {getStatusLabel(selectedOrder.status)}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {formatDistanceToNow(
                              new Date(selectedOrder.updatedAt),
                              { addSuffix: true }
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-border pt-4 flex gap-3">
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleUpdateStatus}
                    disabled={
                      isUpdating || selectedStatus === selectedOrder.status
                    }
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isUpdating ? "Updating..." : "Update Status"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
