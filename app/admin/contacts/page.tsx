import { getSupabaseAdmin } from "@/lib/supabase";
import { ContactsList, type ContactRow } from "./contacts-list";

export const dynamic = "force-dynamic";

export default async function AdminContactsPage() {
  let data: ContactRow[] | null = null;
  let error: { message: string } | null = null;
  try {
    const supabase = getSupabaseAdmin();
    const res = await supabase
      .from("vistacare_contacts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (res.error) error = { message: res.error.message };
    else data = res.data as ContactRow[];
  } catch (err) {
    error = { message: err instanceof Error ? err.message : String(err) };
  }

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-10">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">
            Contact messages
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Latest 500 messages from the public contact form.
          </p>
        </div>
        {data && (
          <span className="rounded-full bg-brand-navy-light px-3 py-1 text-sm font-semibold text-brand-navy">
            {data.length}
          </span>
        )}
      </header>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">Could not load.</p>
          <p className="mt-1">{error.message}</p>
        </div>
      )}

      {data && data.length === 0 && (
        <p className="rounded-lg border border-dashed border-neutral-300 p-12 text-center text-neutral-500">
          No messages yet.
        </p>
      )}

      {data && data.length > 0 && <ContactsList contacts={data} />}
    </div>
  );
}
