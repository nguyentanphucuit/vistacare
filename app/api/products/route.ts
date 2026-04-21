import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";

const productSchema = z.object({
  slug: z.string().min(1).max(120),
  name: z.string().min(1).max(200),
  category: z.string().min(1).max(80),
  compressionClass: z.enum(["I", "II", "I & II"]),
  description: z.string().max(2000).optional(),
  image: z.string().max(400).optional(),
  sortOrder: z.coerce.number().int().optional(),
});

export async function GET() {
  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch {
    return NextResponse.json({ items: [] });
  }
  const { data, error } = await supabase
    .from("vistacare_products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) {
    return NextResponse.json(
      { error: "Failed to load products", detail: error.message },
      { status: 500 },
    );
  }
  return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: Request) {
  let body;
  try {
    body = productSchema.parse(await req.json());
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid payload", detail: String(err) },
      { status: 400 },
    );
  }

  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (err) {
    return NextResponse.json(
      { error: "Storage not configured", detail: String(err) },
      { status: 503 },
    );
  }

  const { data, error } = await supabase
    .from("vistacare_products")
    .insert({
      slug: body.slug,
      name: body.name,
      category: body.category,
      compression_class: body.compressionClass,
      description: body.description ?? "",
      image: body.image ?? "",
      sort_order: body.sortOrder ?? 0,
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to create", detail: error.message },
      { status: 500 },
    );
  }
  return NextResponse.json({ item: data });
}
