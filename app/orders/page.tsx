import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import type { Order } from "@/types";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return <div className="p-6 text-red-500">Error loading orders</div>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
      case 'Shipped': return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100";
      case 'Pending': return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100";
      case 'Cancelled': return "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Order Management</h2>
        <div className="text-sm text-slate-500">
          Total Orders: <span className="font-medium text-slate-900">{orders?.length || 0}</span>
        </div>
      </div>

      {/* Simplified Card - No inner header, just the table */}
      <Card className="rounded-sm border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[120px] text-xs font-semibold uppercase tracking-wider text-slate-500">Order ID</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">Customer</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">Date</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">Status</TableHead>
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order: Order) => (
                <TableRow key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-mono text-xs text-slate-500">
                    #{order.id.slice(0, 8)}
                  </TableCell>
                  <TableCell className="font-medium text-slate-700 text-sm">
                    {order.customer_name}
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`rounded-sm px-2 py-0.5 text-[11px] font-medium border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium text-slate-900 text-sm">
                    ${order.total_amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}