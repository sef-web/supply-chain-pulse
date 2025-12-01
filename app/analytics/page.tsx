import { supabase } from "@/lib/supabase";
import { AnalyticsCharts } from "@/components/analytics/AnalyticsCharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, AlertCircle } from "lucide-react";
import type { Product, Order } from "@/types";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  // 1. Fetch Raw Data
  const { data: products } = await supabase.from('products').select('*');
  const { data: orders } = await supabase.from('orders').select('*');

  const allProducts = (products as Product[]) || [];
  const allOrders = (orders as Order[]) || [];

  // 2. Metric: Total Inventory Valuation (Stock * Price)
  const totalInventoryValue = allProducts.reduce((sum, p) => sum + (p.price * p.stock_level), 0);
  
  // 3. Metric: Average Order Value
  const averageOrderValue = allOrders.length > 0 
    ? allOrders.reduce((sum, o) => sum + o.total_amount, 0) / allOrders.length 
    : 0;

  // 4. Prepare Data for Chart 1: Inventory Value by Category
  const categoryMap = new Map<string, number>();
  allProducts.forEach(p => {
    const current = categoryMap.get(p.category) || 0;
    categoryMap.set(p.category, current + (p.price * p.stock_level));
  });
  
  const categoryData = Array.from(categoryMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value); // Sort highest value first

  // 5. Prepare Data for Chart 2: Order Status
  const statusMap = new Map<string, number>();
  allOrders.forEach(o => {
    const current = statusMap.get(o.status) || 0;
    statusMap.set(o.status, current + 1);
  });

  const statusData = Array.from(statusMap.entries())
    .map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Performance Analytics</h2>
      </div>

      {/* KPI Highlights */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">Inventory Valuation</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">${totalInventoryValue.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">Total asset value in warehouse</p>
          </CardContent>
        </Card>

        <Card className="rounded-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">Avg. Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">${Math.round(averageOrderValue).toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">Per transaction average</p>
          </CardContent>
        </Card>

        <Card className="rounded-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">Conversion Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">--%</div>
            <p className="text-xs text-slate-500 mt-1">Metric requires external integration</p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Charts */}
      <AnalyticsCharts categoryData={categoryData} statusData={statusData} />
    </div>
  );
}