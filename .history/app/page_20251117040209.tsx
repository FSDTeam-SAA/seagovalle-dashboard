import { Header } from '@/components/header'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { MetricsGrid } from '@/components/dashboard/metrics-grid'
import { EarningsChart } from '@/components/dashboard/earnings-chart'
import { PopularPizzasChart } from '@/components/dashboard/popular-pizzas-chart'
import { RecentOrdersTable } from '@/components/dashboard/recent-orders-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Dashboard() {
  const {sess}
  return (
    <LayoutWrapper>
      <div className="bg-white min-h-screen">
        <Header title="Dashboard" searchPlaceholder="Search orders..." />
        
        <div className="p-6 space-y-6">
          {/* Welcome Message */}
          <div>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your app today.</p>
          </div>

          {/* Metrics Grid */}
          <MetricsGrid />

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EarningsChart />
            <PopularPizzasChart />
          </div>

          {/* Recent Orders */}
          <RecentOrdersTable />
        </div>
      </div>
    </LayoutWrapper>
  )
}
