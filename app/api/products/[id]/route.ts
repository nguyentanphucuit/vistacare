import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";

const productUpdate = z.object({
  slug: z.string().min(1).max(120).optional(),
  name: z.string().min(1).max(200).optional(),
  category: z.string().min(1).max(80).optional(),
  compressionClass: z.enum(["I", "II", "I & II"]).optional(),
  description: z.string().max(2000).optional(),
  image: z.string().max(400).optional(),
  sortOrder: z.coerce.number().int().optional(),
});

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let body;
  try {
    body = productUpdate.parse(await req.json());
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

  const update: Record<string, unknown> = {};
  if (body.slug !== undefined) update.slug = body.slug;
  if (body.name !== undefined) update.name = body.name;
  if (body.category !== undefined) update.category = body.category;
  if (body.compressionClass !== undefined)
    update.compression_class = body.compressionClass;
  if (body.description !== undefined) update.description = body.description;
  if (body.image !== undefined) update.image = body.image;
  if (body.sortOrder !== undefined) update.sort_order = body.sortOrder;

  const { data, error } = await supabase
    .from("vistacare_products")
    .update(update)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to update", detail: error.message },
      { status: 500 },
    );
  }
  return NextResponse.json({ item: data });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (err) {
    return NextResponse.json(
      { error: "Storage not configured", detail: String(err) },
      { status: 503 },
    );
  }
  const { error } = await supabase
    .from("vistacare_products")
    .delete()
    .eq("id", id);
  if (error) {
    return NextResponse.json(
      { error: "Failed to delete", detail: error.message },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
