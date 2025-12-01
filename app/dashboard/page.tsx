import { supabase } from "@/lib/supabase";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentSales } from "@/components/dashboard/RecentSales";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowUpRight, AlertTriangle } from "lucide-react";
import type { Order, Product } from "@/types";

// Helper to fetch data
async function getDashboardData() {
  const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: true });
  const { data: products } = await supabase.from('products').select('*');
  return { orders: orders as Order[] || [], products: products as Product[] || [] };
}

export default async function DashboardPage() {
  const { orders, products } = await getDashboardData();

  // Metrics Logic
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const activeOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Shipped').length;
  const lowStockCount = products.filter(p => p.stock_level < p.reorder_point).length;

  // Chart Logic
  const chartMap = new Map<string, number>();
  orders.forEach(order => {
    const dateKey = new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    chartMap.set(dateKey, (chartMap.get(dateKey) || 0) + order.total_amount);
  });
  const chartData = Array.from(chartMap.entries()).map(([date, total]) => ({ date, total }));

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Overview</h2>
        <div className="flex items-center gap-2">
           <span className="text-xs text-slate-500">Last updated: Just now</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Metric 1: Revenue */}
        <Card className="rounded-sm shadow-sm border border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center">
              <ArrowUpRight className="h-3 w-3 text-emerald-600 mr-1" />
              <span className="text-emerald-600 font-medium">20.1%</span>
              <span className="ml-1">vs last month</span>
            </p>
          </CardContent>
        </Card>

        {/* Metric 2: Pending Orders */}
        <Card className="rounded-sm shadow-sm border border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{activeOrders}</div>
            <p className="text-xs text-slate-500 mt-1">Requiring fulfillment</p>
          </CardContent>
        </Card>

        {/* Metric 3: Low Stock Alerts */}
        <Link href="/inventory?filter=low">
          <Card className={`rounded-sm shadow-sm border cursor-pointer hover:bg-slate-50 transition-colors ${lowStockCount > 0 ? "border-amber-200 bg-amber-50/30" : "border-slate-200"}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">Inventory Alerts</CardTitle>
              {lowStockCount > 0 && <AlertTriangle className="h-4 w-4 text-amber-600" />}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${lowStockCount > 0 ? "text-amber-700" : "text-slate-900"}`}>
                {lowStockCount}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {lowStockCount > 0 ? "Items below reorder point" : "All systems normal"}
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Metric 4: Active SKUs */}
        <Card className="rounded-sm shadow-sm border border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active SKUs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{products.length}</div>
            <p className="text-xs text-slate-500 mt-1">Global catalog</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Revenue Chart */}
        <Card className="col-span-4 rounded-sm shadow-sm border border-slate-200">
          <CardHeader>
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Revenue Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-0">
             <RevenueChart data={chartData} />
          </CardContent>
        </Card>
        
        {/* Recent Transactions List */}
        <Card className="col-span-3 rounded-sm shadow-sm border border-slate-200">
          <CardHeader>
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales orders={orders} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}