import { NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

// Validation Schema
const BodySchema = z.object({
  productId: z.string().uuid(),
  amount: z.number().int().positive(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { productId, amount } = BodySchema.parse(json);

    // 1. Get current stock first (to ensure atomic accuracy)
    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("stock_level")
      .eq("id", productId)
      .single();

    if (fetchError || !product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // 2. Perform the update
    const newStock = product.stock_level + amount;
    
    const { error: updateError } = await supabase
      .from("products")
      .update({ 
        stock_level: newStock,
        last_restocked: new Date().toISOString() 
      })
      .eq("id", productId);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true, newStock });

  } catch (error: any) {
    return NextResponse.json(
      { error: error instanceof z.ZodError ? "Invalid input" : error.message },
      { status: 400 }
    );
  }
}