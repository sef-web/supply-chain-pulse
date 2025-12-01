'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartData {
  date: string;
  total: number;
}

interface RevenueChartProps {
  data: ChartData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  // We removed the <Card> wrapper. Now it just returns the responsive div.
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="date" 
            stroke="#94a3b8" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
          />
          <YAxis
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
            width={60}
          />
          <Tooltip 
            formatter={(value: number) => [`$${value}`, "Revenue"]}
            contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#2563eb" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}