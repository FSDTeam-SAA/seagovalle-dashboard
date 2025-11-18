"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreVertical, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetCustomers } from "@/lib/hooks/use-customers";
import { format } from "date-fns";

export function CustomersPageContent() {
  const { data: customers = [], isLoading, error } = useGetCustomers();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = customers.slice(startIdx, startIdx + itemsPerPage);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
      approved: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
      delivered:
        "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
      cancelled: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    };
    return (
      statusMap[status] ||
      "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    );
  };

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400">
              Error loading customers: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <p className="text-muted-foreground">
        Welcome back! Here's what's happening with your app today.
      </p>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2
                size={24}
                className="animate-spin text-muted-foreground"
              />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-sm">
                        Customer Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">
                        Phone
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">
                        Address
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">
                        Total Spent
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">
                        Order Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">
                        Last Order
                      </th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCustomers.map((customer, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-border hover:bg-muted/50"
                      >
                        <td className="py-4 px-4 text-sm font-medium">
                          {customer.fullName}
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {customer.email}
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {customer.phone}
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground truncate max-w-xs">
                          {customer.address}
                        </td>
                        <td className="py-4 px-4 text-sm font-semibold">
                          {formatCurrency(customer.totalSpent)}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold capitalize ${getStatusColor(
                              customer.orderStatus
                            )}`}
                          >
                            {customer.orderStatus}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {format(
                            new Date(customer.orderCreatedAt),
                            "MMM dd, yyyy"
                          )}
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
                <span className="text-xs text-muted-foreground">
                  Showing {startIdx + 1}-
                  {Math.min(startIdx + itemsPerPage, customers.length)} of{" "}
                  {customers.length} customers
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
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
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
