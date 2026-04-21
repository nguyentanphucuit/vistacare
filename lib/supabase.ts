import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cachedAdmin: SupabaseClient | null = null;
let cachedPublic: SupabaseClient | null = null;

function url() {
  const u = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!u) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  return u;
}

/**
 * Server-side client with elevated privileges (bypasses RLS).
 * Falls back to publishable key if secret key isn't set — in that
 * case the client respects RLS so policies must allow the access.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (cachedAdmin) return cachedAdmin;
  const key =
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error(
      "Missing Supabase key — set SUPABASE_SECRET_KEY (preferred) or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    );
  }
  cachedAdmin = createClient(url(), key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cachedAdmin;
}

/** Client-safe Supabase client using the publishable key. */
export function getSupabasePublic(): SupabaseClient {
  if (cachedPublic) return cachedPublic;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is not set");
  }
  cachedPublic = createClient(url(), key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cachedPublic;
}

export type OrderRow = {
  id: string;
  created_at: string;
  form_type: string;
  patient_name: string | null;
  age: string | null;
  gender: string | null;
  contact: string | null;
  address: string | null;
  recommended_by: string | null;
  history: string[] | null;
  measurements: Record<string, string> | null;
  taker_name: string | null;
  notes: string | null;
  raw: Record<string, unknown> | null;
};
