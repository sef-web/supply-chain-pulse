'use client';

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, AlertCircle, Search } from "lucide-react";
import type { Product } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface InventoryTableProps {
  initialProducts: Product[];
}

export function InventoryTable({ initialProducts }: InventoryTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams(); // Read URL params
  const filterParam = searchParams.get('filter'); // Check for "low"

  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Auto-fill search if coming from dashboard
  useEffect(() => {
    if (filterParam === 'low') {
      // We don't have a specific "Low Stock" toggle UI, 
      // so for now we can just alert or handle it via a custom filter logic below.
      // Or simpler: we can just filter the list directly.
    }
  }, [filterParam]);

  // Updated Filtering Logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());

    // If URL has ?filter=low, ONLY show low stock items
    if (filterParam === 'low') {
      return matchesSearch && (p.stock_level < p.reorder_point);
    }

    return matchesSearch;
  });

  const handleRestock = async (productId: string) => {
    setLoadingId(productId);
    try {
      const res = await fetch("/api/products/restock", {
        method: "POST",
        body: JSON.stringify({ productId, amount: 10 }), // Standard restock: +10 units
      });

      if (!res.ok) throw new Error("Restock failed");

      const { newStock } = await res.json();

      // Optimistic Update (Update UI immediately)
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, stock_level: newStock } : p
        )
      );
      
      router.refresh(); // Syncs server data in background
    } catch (error) {
      alert("Failed to restock. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  const getStockStatus = (stock: number, threshold: number) => {
    if (stock === 0) return <Badge variant="destructive">Out of Stock</Badge>;
    if (stock < threshold) return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Low Stock</Badge>;
    return <Badge variant="outline" className="text-green-600 border-green-200">In Stock</Badge>;
  };

  return (
    <div className="space-y-4">

    {/* Inside the return statement, near the Search input */}
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-sm">
            <Search className="h-4 w-4 text-slate-500" />
            <Input
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-[300px]"
            />
        </div>

        {/* Show this button only if filter is active */}
        {filterParam === 'low' && (
            <Button 
            variant="ghost" 
            onClick={() => router.push('/inventory')} // Clears the URL
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
            Viewing Low Stock Only (Clear)
            </Button>
        )}
    </div>

      {/* Data Table */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{product.stock_level}</span>
                      {product.stock_level < product.reorder_point && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStockStatus(product.stock_level, product.reorder_point)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRestock(product.id)}
                      disabled={loadingId === product.id}
                    >
                      {loadingId === product.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Plus className="mr-1 h-3 w-3" /> Restock
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-xs text-muted-foreground">
        Showing {filteredProducts.length} products
      </div>
    </div>
  );
}