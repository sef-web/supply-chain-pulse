import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // Ensure this path matches your tsconfig
import type { Product, Order, OrderStatus } from "@/types";

// Helper to generate random integers
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomChoice = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export async function POST(req: Request) {
  try {
    const headerKey = req.headers.get("x-seed-key");
    if (headerKey !== process.env.SEED_SECRET_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Wipe DB
    await supabase.from("orders").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("products").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    // Mock Data Arrays
    const categories = ["Electronics", "Furniture", "Office", "Logistics", "Wearables"];
    const statuses: OrderStatus[] = ["Pending", "Shipped", "Delivered", "Cancelled"];

    // Generate Products
    const products = Array.from({ length: 20 }).map((_, i) => ({
      name: `Product ${i + 1}`,
      sku: `SKU-${1000 + i}`,
      category: randomChoice(categories),
      stock_level: randomInt(0, 100),
      reorder_point: 20,
      price: randomInt(50, 2000),
    }));

    const { error: prodError } = await supabase.from("products").insert(products);
    if (prodError) throw prodError;

    // Generate Orders
    const orders = Array.from({ length: 15 }).map(() => ({
      customer_name: `Customer ${randomInt(1, 100)}`,
      total_amount: randomInt(100, 5000),
      status: randomChoice(statuses),
    }));

    const { error: orderError } = await supabase.from("orders").insert(orders);
    if (orderError) throw orderError;

    return NextResponse.json({ success: true, message: "Database populated!" });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Helpful for quick verification and proper method handling
export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed. Use POST." }, { status: 405 });
}

// Allow preflight if a client adds custom headers
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-seed-key",
    },
  });
}