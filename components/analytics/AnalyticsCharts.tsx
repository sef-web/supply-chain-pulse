'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Colors for the charts (Console Aesthetic)
const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe']; // Shades of Blue
const STATUS_COLORS = {
  'Pending': '#f59e0b',   // Amber
  'Shipped': '#3b82f6',   // Blue
  'Delivered': '#10b981', // Emerald
  'Cancelled': '#ef4444'  // Red
};

interface AnalyticsProps {
  categoryData: { name: string; value: number }[];
  statusData: { name: string; value: number }[];
}

export function AnalyticsCharts({ categoryData, statusData }: AnalyticsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      
      {/* Chart 1: Inventory Value by Category */}
      <Card className="rounded-sm border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Inventory Value by Category
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-0">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fontSize: 11, fill: '#64748b' }} 
                  width={80}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Total Value']}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Chart 2: Order Status Distribution */}
      <Card className="rounded-sm border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Order Fulfillment Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] || '#94a3b8'} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  formatter={(value) => <span className="text-xs text-slate-600 ml-1">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}