"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useGetPaymentStats, useGetPayments } from "@/lib/hooks/use-payments";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

export function PaymentsPageContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: stats, isLoading: statsLoading } = useGetPaymentStats();
  const {
    data: paymentsData,
    isLoading: paymentsLoading,
    isError,
  } = useGetPayments(currentPage, 10);

  const payments = paymentsData?.data || [];
  const meta = paymentsData?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  const statsCards = [
    {
      label: "Total Revenue",
      value: statsLoading ? (
        <Skeleton className="h-8 w-24" />
      ) : (
        `$${(stats?.totalRevenue || 0).toFixed(2)}`
      ),
    },
    {
      label: "Total Transactions",
      value: statsLoading ? (
        <Skeleton className="h-8 w-24" />
      ) : (
        stats?.totalTransactions || 0
      ),
    },
    // {
    //   label: "Pending Payments",
    //   value: paymentsLoading ? (
    //     <Skeleton className="h-8 w-24" />
    //   ) : (
    //     payments.filter((p) => p.status === "pending").length
    //   ),
    // },
    // {
    //   label: "Failed Payments",
    //   value: paymentsLoading ? (
    //     <Skeleton className="h-8 w-24" />
    //   ) : (
    //     payments.filter((p) => p.status === "failed").length
    //   ),
    // },
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300";
      case "failed":
        return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return "✓";
      case "pending":
        return "◐";
      case "failed":
        return "✕";
      default:
        return "•";
    }
  };

  if (isError) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600 dark:text-red-400 py-12">
          Failed to load payments. Please check your API configuration.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <p className="text-muted-foreground">
        Welcome back! Here's what's happening with your app today.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
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
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Transaction ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentsLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-border">
                      <td colSpan={7} className="py-4 px-4">
                        <Skeleton className="h-8 w-full" />
                      </td>
                    </tr>
                  ))
                ) : payments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No payments found
                    </td>
                  </tr>
                ) : (
                  payments.map((payment) => (
                    <tr
                      key={payment._id}
                      className="border-b border-border hover:bg-muted/50"
                    >
                      <td className="py-4 px-4 text-sm font-medium">
                        {payment.transactionId}
                      </td>
                      <td className="py-4 px-4 text-sm">
                        {payment.orderId.deliveryDetails.fullName}
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold">
                        ${payment.amount.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        #{payment.orderId._id.slice(-5)}
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(payment.createdAt), {
                          addSuffix: true,
                        })}
                      </td>
                      <td className="py-4 px-4 text-sm">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${getStatusBadgeClass(
                            payment.status
                          )}`}
                        >
                          {getStatusIcon(payment.status)}{" "}
                          {payment.status.charAt(0).toUpperCase() +
                            payment.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1 || paymentsLoading}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft size={16} className="mr-1" /> Previous
            </Button>
            <div className="flex gap-2">
              {Array.from({ length: meta.totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  disabled={paymentsLoading}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === meta.totalPages || paymentsLoading}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
