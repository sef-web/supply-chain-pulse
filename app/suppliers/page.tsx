import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Truck } from "lucide-react";
import type { Supplier } from "@/types";

export const dynamic = "force-dynamic";

export default async function SuppliersPage() {
  const { data: suppliers, error } = await supabase
    .from('suppliers')
    .select('*')
    .order('name', { ascending: true });

  if (error) return <div>Error loading suppliers</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Supplier Network</h2>
      </div>

      {suppliers && suppliers.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {suppliers.map((supplier: Supplier) => (
            <Card key={supplier.id} className="rounded-sm border-slate-200 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-base font-semibold text-slate-900">
                    {supplier.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-2 text-sm text-slate-600">
                {supplier.contact_email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>{supplier.contact_email}</span>
                  </div>
                )}
                {supplier.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span>{supplier.phone}</span>
                  </div>
                )}
                {supplier.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>{supplier.address}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed border-slate-300 bg-slate-50">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Truck className="h-10 w-10 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No Suppliers Found</h3>
            <p className="text-sm text-slate-500 max-w-sm mt-1">
              Your supplier directory is empty. You can add suppliers directly in your database to see them appear here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}