"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, DollarSign, Clock } from "lucide-react";
import { useDashboardAnalytics } from "@/lib/hooks/use-dashboard-analytics";
import { Skeleton } from "@/components/ui/skeleton";

export function MetricsGrid() {
  const { data: analytics, isLoading } = useDashboardAnalytics();

  const formatPercentage = (value: number) => {
    if (value === 0) return "0%";
    return `${value > 0 ? "+" : ""}${value}%`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const metrics = [
    {
      title: "Total Orders",
      value: analytics?.totalOrders || 0,
      change: formatPercentage(analytics?.totalOrdersPercentChange || 0),
      icon: ShoppingCart,
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "Today Sales",
      value: formatCurrency(analytics?.todaySales || 0),
      change: formatPercentage(analytics?.salesPercent || 0),
      icon: DollarSign,
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Pending Orders",
      value: analytics?.pendingOrders || 0,
      change: formatPercentage(analytics?.pendingOrdersPercent || 0),
      icon: Clock,
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title} className="border border-border">
            <CardContent className="pt-6">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold mt-2">
                      {typeof metric.value === "string"
                        ? metric.value
                        : metric.value.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-600 mt-2">
                      {metric.change}
                    </p>
                  </div>
                  <div className={`${metric.bgColor} p-3 rounded-lg`}>
                    <Icon size={24} className="text-primary" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
