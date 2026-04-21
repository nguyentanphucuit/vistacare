import { notFound } from "next/navigation";
import Image from "next/image";
import { getSupabaseAdmin, type OrderRow } from "@/lib/supabase";
import { AutoExport } from "./auto-print";

export const dynamic = "force-dynamic";

export default async function OrderPrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let order: OrderRow | null = null;
  try {
    const supabase = getSupabaseAdmin();
    const res = await supabase
      .from("vistacare_orders")
      .select("*")
      .eq("id", id)
      .single();
    if (!res.error) order = res.data as OrderRow;
  } catch {
    /* ignore */
  }

  if (!order) notFound();

  const measurements = order.measurements ?? {};
  const history = order.history ?? [];

  const filename = `vistacare-${order.form_type}-${order.id.slice(0, 8)}.pdf`;

  return (
    <div className="bg-white p-8 text-[13px] text-neutral-900 print:p-4">
      <div id="pdf-target">
      {/* Letterhead */}
      <header className="flex items-start justify-between gap-4 border-b-2 border-neutral-900 pb-3">
        <div>
          <h1 className="text-lg font-bold uppercase">
            Vistaar International CG Company Ltd
          </h1>
          <p className="text-xs text-neutral-600">
            43, Duong Van An, Binh Trung Ward, Ho Chi Minh City, Vietnam — 71100
          </p>
          <p className="text-xs text-neutral-600">
            Ph: +84 938 981 039 · vistaarinternationalcgcoltd@gmail.com
          </p>
        </div>
        <Image
          src="/logo.png"
          alt="Vista Care"
          width={110}
          height={52}
          className="h-12 w-auto"
        />
      </header>

      {/* Title */}
      <div className="pt-3 text-center">
        <h2 className="inline-block border-b-2 border-neutral-900 pb-0.5 text-lg font-bold uppercase tracking-wide">
          {order.form_type} Measurement Form
        </h2>
      </div>

      {/* Meta */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Row label="REF NO.:" value={order.id.slice(0, 8).toUpperCase()} />
        <Row
          label="Dated:"
          value={new Date(order.created_at).toLocaleString()}
        />
        <Row label="PATIENT NAME:" value={order.patient_name} />
        <Row label="AGE:" value={order.age} />
        <Row label="GENDER:" value={order.gender} />
        <Row label="Contact no.:" value={order.contact} />
        <Row label="Address:" value={order.address} className="col-span-2" />
        <Row
          label="RECOMMENDED BY: Dr."
          value={order.recommended_by}
          className="col-span-2"
        />
      </div>

      {/* History */}
      <div className="mt-4">
        <p className="mb-1 font-bold">HISTORY:</p>
        <div className="flex flex-wrap gap-2 border border-neutral-900 p-2">
          {[
            "Varicose Veins",
            "Ulcers",
            "DVT",
            "Adema",
            "Open Wound",
            "Skin Graft",
          ].map((opt) => (
            <span
              key={opt}
              className={`rounded border border-neutral-400 px-2 py-0.5 text-xs ${
                history.includes(opt) ? "bg-neutral-900 text-white" : ""
              }`}
            >
              {opt}
            </span>
          ))}
        </div>
      </div>

      {/* Measurements */}
      {Object.keys(measurements).length > 0 && (
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <MeasurementBlock
            title="CIRCUMFERENCE"
            data={measurements}
            keys={["cH1", "cH", "cG", "cF", "cE", "cD", "cC1", "cC"]}
          />
          <MeasurementBlock
            title="LENGTH"
            data={measurements}
            keys={["lC-G", "lC-F", "lC-E", "lC-D", "lC-C1"]}
          />
        </div>
      )}

      {/* Notes */}
      {order.notes && (
        <div className="mt-5">
          <p className="font-bold">Additional notes:</p>
          <p className="mt-1 whitespace-pre-wrap rounded border border-neutral-400 p-2 text-sm">
            {order.notes}
          </p>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 text-xs">
        <p className="font-semibold">
          Instructions for taking correct measurements:
        </p>
        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-neutral-700">
          <li>
            Measurement to be taken on bare skin with flexible measurement tape
          </li>
          <li>Measurement to be noted in cms.</li>
          <li>Limb should be straight while taking measurement</li>
        </ul>
      </div>

      {/* Taker */}
      <div className="mt-6 border-t border-neutral-300 pt-3 text-sm">
        <p>
          <span className="font-semibold">
            Name / Signature / Contact (of the person taking measurement):
          </span>{" "}
          {order.taker_name || "—"}
        </p>
      </div>

      </div>
      <AutoExport filename={filename} />
    </div>
  );
}

function Row({
  label,
  value,
  className,
}: {
  label: string;
  value?: string | null;
  className?: string;
}) {
  return (
    <div className={`flex gap-2 border-b border-neutral-400 py-1 ${className ?? ""}`}>
      <span className="font-bold whitespace-nowrap">{label}</span>
      <span>{value || "—"}</span>
    </div>
  );
}

function MeasurementBlock({
  title,
  data,
  keys,
}: {
  title: string;
  data: Record<string, string>;
  keys: string[];
}) {
  return (
    <div>
      <div className="border border-neutral-900 px-2 py-1 text-center text-sm font-bold">
        {title}
      </div>
      <table className="w-full border-collapse border border-t-0 border-neutral-900">
        <tbody>
          {keys.map((k) => (
            <tr key={k} className="border-b border-neutral-900 last:border-b-0">
              <td className="w-14 border-r border-neutral-900 px-2 py-1 text-center font-mono text-xs font-semibold">
                {k}
              </td>
              <td className="w-24 border-r border-neutral-900 px-2 py-1 text-center text-sm">
                {data[k] || ""}
              </td>
              <td className="w-12 px-2 py-1 text-center text-xs text-neutral-600">
                cms
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
