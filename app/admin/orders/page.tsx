import { getSupabaseAdmin, type OrderRow } from "@/lib/supabase";
import { OrdersTable } from "./orders-table";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  let data: OrderRow[] | null = null;
  let error: { message: string } | null = null;
  try {
    const supabase = getSupabaseAdmin();
    const res = await supabase
      .from("vistacare_orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (res.error) error = { message: res.error.message };
    else data = res.data as OrderRow[];
  } catch (err) {
    error = { message: err instanceof Error ? err.message : String(err) };
  }

  return (
    <div className="mx-auto max-w-7xl p-6 md:p-10">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">
            Measurement orders
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Latest 200 submissions.
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
          No orders yet.
        </p>
      )}

      {data && data.length > 0 && <OrdersTable orders={data} />}
    </div>
  );
}
