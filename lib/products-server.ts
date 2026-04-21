import { getSupabaseAdmin } from "./supabase";
import type { Product } from "./products";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("vistacare_products")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error || !data) return [];
    return data.map(
      (p): Product => ({
        slug: p.slug,
        name: p.name,
        category: p.category,
        compressionClass: p.compression_class,
        description: p.description ?? "",
        image: p.image ?? "/placeholder.svg",
      }),
    );
  } catch (err) {
    console.error("[fetchProducts] failed", err);
    return [];
  }
}
