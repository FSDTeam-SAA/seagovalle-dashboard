'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', earnings: 2000 },
  { month: 'Feb', earnings: 2400 },
  { month: 'Mar', earnings: 3200 },
  { month: 'Apr', earnings: 2800 },
  { month: 'May', earnings: 3500 },
  { month: 'Jun', earnings: 4000 },
  { month: 'Jul', earnings: 3800 },
  { month: 'Aug', earnings: 4200 },
  { month: 'Sep', earnings: 3900 },
  { month: 'Oct', earnings: 4400 },
  { month: 'Nov', earnings: 4600 },
  { month: 'Dec', earnings: 5000 },
]

export function EarningsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Earnings</CardTitle>
        <CardDescription>March, 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--color-card)', border: `1px solid var(--color-border)` }}
            />
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
  )
}
