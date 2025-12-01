'use client';

import { Bell, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-6 shadow-sm sticky top-0 z-10">
      
      {/* Left: Breadcrumb / Page Context (Optional placeholder) */}
      <div className="flex items-center text-sm font-medium text-slate-500">
        <span className="hidden sm:inline-block">Organization</span>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-900">SupplyChain Pulse</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900">
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900">
          <Bell className="h-4 w-4" />
        </Button>
        
        <div className="h-6 w-px bg-slate-200" /> {/* Separator */}

        <Avatar className="h-8 w-8 border border-slate-200 cursor-pointer hover:ring-2 hover:ring-slate-100 transition-all">
          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-xs font-bold">
            AD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}