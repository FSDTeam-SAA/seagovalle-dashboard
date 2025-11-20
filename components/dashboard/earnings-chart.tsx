"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDashboardChart } from "@/lib/hooks/use-dashboard-chart";
import { Skeleton } from "@/components/ui/skeleton";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function EarningsChart() {
  const { data, isLoading } = useDashboardChart();

  const chartData = useMemo(() => {
    if (!data) return [];
    return data.map((point) => ({
      month: monthNames[point.month - 1] || `M${point.month}`,
      earnings: point.totalSales,
      orders: point.totalOrders,
      monthNumber: point.month,
    }));
  }, [data]);

  interface TooltipProps {
    active?: boolean
    payload?: Array<{
      payload: {
        month: string
        earnings: number
        orders: number
      }
    }>
  }

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (!active || !payload?.length) return null;
    const { month, earnings, orders } = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{month}</p>
        <p className="text-sm text-muted-foreground">
          ${earnings.toLocaleString()} sales
        </p>
        <p className="text-sm text-muted-foreground">
          {orders} order{orders !== 1 ? "s" : ""}
        </p>
      </div>
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[300px]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Earnings</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
