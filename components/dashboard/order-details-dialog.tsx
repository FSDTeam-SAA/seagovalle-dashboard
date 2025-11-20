"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/lib/types/order";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Phone, Mail, User, Package, Calendar, CreditCard } from "lucide-react";

interface OrderDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
}

export function OrderDetailsDialog({
  open,
  onOpenChange,
  order,
}: OrderDetailsDialogProps) {
  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "delivered":
        return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-950";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-950";
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-950";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-950";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between mr-8">
            <div className="space-y-1">
              <DialogTitle className="text-xl">Order Details</DialogTitle>
              <DialogDescription>
                Order #{order._id.slice(-6).toUpperCase()}
              </DialogDescription>
            </div>
            <Badge className={getStatusColor(order.status) + " capitalize px-3 py-1 text-sm"}>
              {order.status}
            </Badge>
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8">
            {/* Customer Details */}
            <section className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4" /> Customer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  <p className="font-medium">{order.deliveryDetails.fullName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email
                  </p>
                  <p className="font-medium">{order.deliveryDetails.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Phone
                  </p>
                  <p className="font-medium">{order.deliveryDetails.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Address
                  </p>
                  <p className="font-medium">{order.deliveryDetails.address}</p>
                </div>
                {order.deliveryDetails.note && (
                  <div className="col-span-full space-y-1 pt-2 border-t border-dashed">
                    <p className="text-xs text-muted-foreground">Note</p>
                    <p className="text-sm italic text-muted-foreground">"{order.deliveryDetails.note}"</p>
                  </div>
                )}
              </div>
            </section>

            <Separator />

            {/* Order Items */}
            <section className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4" /> Order Items
              </h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Item</th>
                      <th className="text-center py-3 px-4 font-medium">Size</th>
                      <th className="text-center py-3 px-4 font-medium">Qty</th>
                      <th className="text-right py-3 px-4 font-medium">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {order.cart.map((item) => (
                      <tr key={item._id} className="hover:bg-muted/20">
                        <td className="py-3 px-4">
                          <div className="font-medium">Product ID: {item.cartId.slice(-6)}</div>
                        </td>
                        <td className="py-3 px-4 text-center text-muted-foreground">
                          {item.size || "-"}
                        </td>
                        <td className="py-3 px-4 text-center font-medium">
                          {item.quantity}
                        </td>
                        <td className="py-3 px-4 text-right font-medium">
                          ${item.totalPrice.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <Separator />

            {/* Summary */}
            <section className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Payment Summary
              </h3>
              <div className="bg-muted/30 p-4 rounded-lg border space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.finalPrice.toFixed(2)}</span>
                </div>
                {order.couponCode && (
                  <div className="flex justify-between items-center text-sm text-green-600">
                    <span className="flex items-center gap-1">Coupon ({order.couponCode})</span>
                    <span>Applied</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span>${order.finalPrice.toFixed(2)}</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground text-right flex items-center justify-end gap-1">
                <Calendar className="w-3 h-3" />
                Placed {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
