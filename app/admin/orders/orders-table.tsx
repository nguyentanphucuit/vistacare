"use client";

import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ArmsleeveOrderView } from "@/components/order/ArmsleeveOrderView";
import { Pagination } from "@/components/admin/Pagination";
import type { OrderRow } from "@/lib/supabase";

const PAGE_SIZE = 10;

export function OrdersTable({ orders }: { orders: OrderRow[] }) {
  const [active, setActive] = useState<OrderRow | null>(null);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const slice = useMemo(
    () => orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [orders, page],
  );

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Form</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Gender</th>
              <th className="p-3">History</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((o) => (
              <tr key={o.id} className="border-t border-neutral-200">
                <td className="p-3 text-xs text-neutral-500">
                  {new Date(o.created_at).toLocaleString()}
                </td>
                <td className="p-3">
                  <span className="rounded bg-brand-orange-light px-2 py-0.5 text-xs font-semibold uppercase text-brand-orange">
                    {o.form_type}
                  </span>
                </td>
                <td className="p-3 font-medium text-brand-navy">
                  {o.patient_name || "Anonymous"}
                </td>
                <td className="p-3 text-neutral-700">{o.contact || "—"}</td>
                <td className="p-3 text-neutral-700">{o.gender || "—"}</td>
                <td className="p-3 text-neutral-600">
                  {(o.history ?? []).join(", ") || "—"}
                </td>
                <td className="p-3 text-right">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setActive(o)}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <Dialog
        open={!!active}
        onOpenChange={(v) => {
          if (!v) setActive(null);
        }}
      >
        <DialogContent className="flex max-h-[92vh] w-[95vw] max-w-6xl flex-col overflow-hidden p-0 sm:max-w-6xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Order details</DialogTitle>
          </DialogHeader>
          {active && <ArmsleeveOrderView order={active} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
