import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { products as defaults } from "@/lib/products";

export async function POST() {
  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (err) {
    return NextResponse.json(
      { error: "Storage not configured", detail: String(err) },
      { status: 503 },
    );
  }

  const rows = defaults.map((p, i) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    compression_class: p.compressionClass,
    description: p.description,
    image: p.image,
    sort_order: i,
  }));

  const { data, error } = await supabase
    .from("vistacare_products")
    .upsert(rows, { onConflict: "slug" })
    .select("id");

  if (error) {
    return NextResponse.json(
      { error: "Seed failed", detail: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, count: data?.length ?? 0 });
}
