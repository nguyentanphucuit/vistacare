"use client";

import Image from "next/image";
import { FileDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { OrderRow } from "@/lib/supabase";

const HISTORY_OPTIONS = [
  "Varicose Veins",
  "Ulcers",
  "DVT",
  "Adema",
  "Open Wound",
  "Skin Graft",
] as const;

const CIRCUMFERENCE = [
  { code: "cH1", label: "From Top of shoulder across chest to the opposite Axilla" },
  { code: "cH", label: "Vertical Axila - Shoulder" },
  { code: "cG", label: "Upper arm at Axilla" },
  { code: "cF", label: "Mid of Upper Arm" },
  { code: "cE", label: "At Elbow" },
  { code: "cD", label: "Middle of wrist & Elbow" },
  { code: "cC1", label: "Mid of C & D" },
  { code: "cC", label: "Minimum Wrist" },
] as const;

const LENGTH = [
  { code: "lC-G", label: "Min wrist to Axilla" },
  { code: "lC-F", label: "Min wrist to Mid of upper arm" },
  { code: "lC-E", label: "Min wrist to Elbow" },
  { code: "lC-D", label: "Min wrist to D" },
  { code: "lC-C1", label: "Min wrist to C1" },
] as const;

export function ArmsleeveOrderView({ order }: { order: OrderRow }) {
  const measurements = order.measurements ?? {};
  const history = order.history ?? [];
  const gender = (order.gender ?? "").toUpperCase();
  const raw = (order.raw ?? {}) as Record<string, string | undefined>;
  const refNo = raw.refNo || order.id.slice(0, 8).toUpperCase();
  const dated = raw.date
    ? new Date(raw.date).toLocaleDateString()
    : new Date(order.created_at).toLocaleString();

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white text-[15px] text-neutral-900">
      {/* Sticky header */}
      <div className="shrink-0 border-b border-neutral-200 bg-white px-4 pb-3 pt-4 sm:px-8 sm:pt-5">
        <div className="flex flex-col items-start gap-3 border-b-2 border-neutral-900 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <h2 className="text-sm font-bold uppercase leading-tight tracking-tight sm:text-lg md:text-xl">
            VISTAAR INTERNATIONAL CG COMPANY LTD
          </h2>
          <Image
            src="/logo.png"
            alt="Vista Care"
            width={110}
            height={52}
            className="h-9 w-auto self-end sm:h-12 sm:self-auto"
          />
        </div>
        <div className="pt-3 text-center">
          <h3 className="inline-block border-b-2 border-neutral-900 pb-0.5 text-base font-bold tracking-wide sm:text-lg">
            {order.form_type.toUpperCase()} MEASUREMENT FORM
          </h3>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-8">
        {/* REF NO + Dated */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6">
          <ReadField label="REF NO.:" value={refNo} />
          <ReadField label="Dated:" labelUnderline value={dated} />
        </div>

        {/* NAME / AGE / GENDER */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <ReadField label="PATIENT NAME:" value={order.patient_name} />
          <div className="grid grid-cols-2 gap-3 md:contents">
            <ReadField label="AGE:" value={order.age} />
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="shrink-0 font-bold">GENDER:</span>
              <div className="flex border border-neutral-900">
                {(["MALE", "FEMALE"] as const).map((g) => (
                  <span
                    key={g}
                    className={cn(
                      "border-l border-neutral-900 px-3 py-1 text-xs font-semibold first:border-l-0",
                      gender === g
                        ? "bg-brand-navy text-white"
                        : "bg-white text-neutral-500",
                    )}
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact / Address */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <ReadField label="Contact no.:" value={order.contact} />
          <ReadField label="Address:" value={order.address} />
        </div>

        {/* Recommended by */}
        <ReadField
          label="RECOMMENDED BY: Dr."
          value={order.recommended_by}
        />

        {/* History */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold">HISTORY:</span>
          <div className="-m-0.5 flex flex-wrap">
            {HISTORY_OPTIONS.map((opt) => {
              const checked = history.includes(opt);
              return (
                <span
                  key={opt}
                  className={cn(
                    "m-0.5 rounded border border-neutral-900 px-3 py-1 text-xs font-medium",
                    checked
                      ? "bg-brand-navy text-white"
                      : "bg-white text-neutral-400",
                  )}
                >
                  {opt}
                </span>
              );
            })}
          </div>
        </div>

        {/* Body — tables left, reference right */}
        <div className="grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            <ReadTable
              title="CIRCUMFERENCE"
              rows={CIRCUMFERENCE}
              data={measurements}
            />
            <ReadTable title="LENGTH" rows={LENGTH} data={measurements} />
          </div>

          <div className="flex flex-col gap-3">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-neutral-200 bg-brand-mint/30">
              <Image
                src="/images/products/arm-sleeve.png"
                alt="Armsleeve product reference"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain p-3"
              />
            </div>
            <div className="rounded-md border border-neutral-200 bg-neutral-50 p-3 text-center text-xs text-neutral-600">
              <p className="mb-2 font-semibold text-brand-navy">
                Measurement reference
              </p>
              <p>
                CIRCUMFERENCES (cH–cC) and LENGTHS (lC-G to lC-C1) follow the
                arm anatomy from axilla down to wrist.
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="pt-3 text-sm">
          <p className="font-semibold">
            Instructions for taking correct measurements:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-neutral-700">
            <li>
              Measurement to be taken on bare skin with flexible measurement
              tape
            </li>
            <li>Measurement to be noted in cms.</li>
            <li>Limb should be straight while taking measurement</li>
          </ul>
        </div>

        {/* Taker info + notes */}
        <div className="space-y-3 border-t border-neutral-200 pt-4">
          <ReadField
            label="Name / Signature / Contact (of the person taking measurement):"
            value={order.taker_name}
          />
          {order.notes && (
            <div>
              <p className="font-bold">Additional notes</p>
              <p className="mt-1 whitespace-pre-wrap rounded-md border border-neutral-300 bg-neutral-50 p-3 text-sm text-neutral-700">
                {order.notes}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sticky footer */}
      <div className="flex shrink-0 justify-end border-t border-neutral-200 bg-white px-4 py-4 sm:px-8">
        <a
          href={`/admin/orders/${order.id}/print`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: "lg" }))}
        >
          <FileDown className="h-4 w-4" aria-hidden="true" />
          Export PDF
        </a>
      </div>
    </div>
  );
}

function ReadField({
  label,
  value,
  labelUnderline,
}: {
  label: string;
  value?: string | null;
  labelUnderline?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "shrink-0 font-bold",
          labelUnderline && "underline underline-offset-2",
        )}
      >
        {label}
      </span>
      <span className="h-7 w-full flex-1 border-b border-neutral-400 px-1 py-0.5 text-sm">
        {value || "—"}
      </span>
    </div>
  );
}

function ReadTable({
  title,
  rows,
  data,
}: {
  title: string;
  rows: ReadonlyArray<{ code: string; label: string }>;
  data: Record<string, string>;
}) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[420px] border border-neutral-900 px-2 py-1 text-center text-sm font-bold">
        {title}
      </div>
      <table className="w-full min-w-[420px] border-collapse border border-t-0 border-neutral-900 text-sm">
        <tbody>
          {rows.map((r) => (
            <tr key={r.code} className="border-b border-neutral-900 last:border-b-0">
              <td className="w-12 border-r border-neutral-900 px-2 py-1 text-center font-mono font-semibold">
                {r.code}
              </td>
              <td className="border-r border-neutral-900 px-2 py-1 leading-snug">
                {r.label}
              </td>
              <td className="w-24 border-r border-neutral-900 px-2 py-1 text-center text-sm">
                {data[r.code] || ""}
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
