import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";

const payload = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  subject: z.string().max(160).optional(),
  message: z.string().min(1).max(4000),
});

export async function POST(req: Request) {
  let body;
  try {
    body = payload.parse(await req.json());
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
    console.error("[api/contact] supabase init failed", err);
    return NextResponse.json(
      {
        error: "Storage not configured",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 503 },
    );
  }

  const { data, error } = await supabase
    .from("vistacare_contacts")
    .insert({
      name: body.name,
      email: body.email,
      phone: body.phone,
      subject: body.subject,
      message: body.message,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to save contact", detail: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id: data.id });
}
