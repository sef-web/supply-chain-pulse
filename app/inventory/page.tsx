import { supabase } from "@/lib/supabase";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import type { Product } from "@/types";

export const dynamic = "force-dynamic"; // Ensure we always get fresh data

export default async function InventoryPage() {
  // Fetch products
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Inventory Load Error:", error);
    return <div>Failed to load inventory.</div>;
  }

  const products = data as Product[];

return (
    // CHANGED: p-8 -> p-6
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {/* CHANGED: text-3xl -> text-xl */}
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">Inventory Management</h1>
      </div>

      <InventoryTable initialProducts={products} />
    </div>
  );
}