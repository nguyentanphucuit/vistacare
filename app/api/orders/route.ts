import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";

const orderPayload = z.object({
  formType: z.string().min(1),
  patientName: z.string().optional(),
  age: z.string().optional(),
  gender: z.string().optional(),
  contact: z.string().optional(),
  address: z.string().optional(),
  recommendedBy: z.string().optional(),
  history: z.array(z.string()).optional(),
  measurements: z.record(z.string(), z.string()).optional(),
  takerName: z.string().optional(),
  notes: z.string().optional(),
  raw: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(req: Request) {
  let body;
  try {
    body = orderPayload.parse(await req.json());
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
    console.error("[api/orders] supabase init failed", err);
    return NextResponse.json(
      {
        error: "Storage not configured",
        detail: err instanceof Error ? err.message : String(err),
        env: {
          NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
            !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
          SUPABASE_SECRET_KEY: !!process.env.SUPABASE_SECRET_KEY,
        },
      },
      { status: 503 },
    );
  }

  const { data, error } = await supabase
    .from("vistacare_orders")
    .insert({
      form_type: body.formType,
      patient_name: body.patientName,
      age: body.age,
      gender: body.gender,
      contact: body.contact,
      address: body.address,
      recommended_by: body.recommendedBy,
      history: body.history ?? [],
      measurements: body.measurements ?? {},
      taker_name: body.takerName,
      notes: body.notes,
      raw: body.raw ?? body,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to save order", detail: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id: data.id });
}
