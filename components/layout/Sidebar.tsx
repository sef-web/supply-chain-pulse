'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  BarChart3, 
  Users, 
  Truck,
  ChevronLeft,
  ChevronRight,
  Box 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    category: "Overview",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "Analytics", href: "/analytics", icon: BarChart3 }, 
    ]
  },
  {
    category: "Management",
    items: [
      { title: "Inventory", href: "/inventory", icon: Package },
      { title: "Orders", href: "/orders", icon: Truck },
      { title: "Suppliers", href: "/suppliers", icon: Users }, 
    ]
  },
  {
    category: "System",
    items: [
      { title: "Settings", href: "/settings", icon: Settings },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div 
      className={cn(
        "relative flex flex-col border-r bg-white text-slate-900 transition-all duration-300 ease-in-out h-screen",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Collapse Toggle Button (Floating on the border) */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 z-20 h-6 w-6 rounded-full border bg-white shadow-md hover:bg-slate-100"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      {/* Logo Area */}
      <div className={cn("flex h-14 items-center border-b px-4", isCollapsed ? "justify-center" : "")}>
        <div className="flex items-center gap-2 font-bold text-slate-700">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white">
            <Box className="h-5 w-5" />
          </div>
          {!isCollapsed && <span className="text-lg tracking-tight">SupplyPulse</span>}
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex-1 overflow-y-auto py-4">
        {navItems.map((group, i) => (
          <div key={i} className={cn("mb-6 px-3", isCollapsed ? "text-center" : "")}>
            
            {/* Category Label (Hidden when collapsed) */}
            {!isCollapsed && (
              <h3 className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {group.category}
              </h3>
            )}

            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={isCollapsed ? item.title : ""} // Tooltip when collapsed
                    className={cn(
                      "flex items-center gap-3 rounded-md py-2 text-[13px] font-medium transition-colors",
                      // Layout adjustments based on collapse state
                      isCollapsed ? "justify-center px-0" : "px-3",
                      isActive 
                        ? "bg-blue-50 text-blue-700" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", isActive ? "text-blue-700" : "text-slate-500")} />
                    {!isCollapsed && <span>{item.title}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}