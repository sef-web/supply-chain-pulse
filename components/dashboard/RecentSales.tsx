import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Order } from "@/types";

interface RecentSalesProps {
  orders: Order[];
}

export function RecentSales({ orders }: RecentSalesProps) {
  // Sort by date (newest first) and take top 5
  // Note: structuredClone is a safe way to copy the array before sorting
  // to avoid mutating the original prop (Strict Mode best practice)
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8 pr-6">
      {recentOrders.map((order) => (
        <div key={order.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            {/* Fallback to initials (e.g., "Customer 5" -> "CU") */}
            <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
              {order.customer_name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none text-slate-900">
              {order.customer_name}
            </p>
            <p className="text-sm text-muted-foreground">
              {order.status}
            </p>
          </div>
          <div className="ml-auto font-medium text-slate-900">
            +${order.total_amount.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}