"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";

const HISTORY_OPTIONS = [
  "Varicose Veins",
  "Ulcers",
  "DVT",
  "Adema",
  "Open Wound",
  "Skin Graft",
] as const;

const CIRCUMFERENCE = [
  { key: "cH1", code: "cH1", label: "From Top of shoulder across chest to the opposite Axilla" },
  { key: "cH", code: "cH", label: "Vertical Axila - Shoulder" },
  { key: "cG", code: "cG", label: "Upper arm at Axilla" },
  { key: "cF", code: "cF", label: "Mid of Upper Arm" },
  { key: "cE", code: "cE", label: "At Elbow" },
  { key: "cD", code: "cD", label: "Middle of wrist & Elbow" },
  { key: "cC1", code: "cC1", label: "Mid of C & D" },
  { key: "cC", code: "cC", label: "Minimum Wrist" },
] as const;

const LENGTH = [
  { key: "lCG", code: "lC-G", label: "Min wrist to Axilla" },
  { key: "lCF", code: "lC-F", label: "Min wrist to Mid of upper arm" },
  { key: "lCE", code: "lC-E", label: "Min wrist to Elbow" },
  { key: "lCD", code: "lC-D", label: "Min wrist to D" },
  { key: "lCC1", code: "lC-C1", label: "Min wrist to C1" },
] as const;

const measurementShape = Object.fromEntries(
  [...CIRCUMFERENCE, ...LENGTH].map((f) => [
    f.key,
    z.string().trim().max(40).optional(),
  ]),
) as Record<string, z.ZodOptional<z.ZodString>>;

const armsleeveSchema = z.object({
  refNo: z.string().max(120).optional(),
  date: z.string().optional(),
  patientName: z.string().min(1, "Required").max(200),
  age: z.string().max(10).optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  contact: z
    .string()
    .min(6, "At least 6 digits")
    .max(40, "Max 40 characters"),
  address: z.string().max(500).optional(),
  recommendedBy: z.string().max(200).optional(),
  history: z.array(z.string()).default([]),
  ...measurementShape,
  takerName: z.string().max(200).optional(),
  notes: z.string().max(2000).optional(),
});

type Values = z.infer<typeof armsleeveSchema>;

export function ArmsleeveForm() {
  const form = useForm<Values>({
    resolver: zodResolver(armsleeveSchema),
    defaultValues: {
      refNo: "VC / 26 /",
      date: new Date().toISOString().slice(0, 10),
      patientName: "",
      age: "",
      gender: undefined,
      contact: "",
      address: "",
      recommendedBy: "",
      history: [],
      takerName: "",
      notes: "",
      ...Object.fromEntries(
        [...CIRCUMFERENCE, ...LENGTH].map((f) => [f.key, ""]),
      ),
    } as Values,
  });

  const onSubmit = async (values: Values) => {
    const measurements: Record<string, string> = {};
    for (const f of [...CIRCUMFERENCE, ...LENGTH]) {
      const v = values[f.key as keyof Values];
      if (typeof v === "string" && v.trim()) measurements[f.code] = v;
    }
    const payload = {
      formType: "armsleeve",
      patientName: values.patientName,
      age: values.age,
      gender: values.gender,
      contact: values.contact,
      address: values.address,
      recommendedBy: values.recommendedBy,
      history: values.history,
      measurements,
      takerName: values.takerName,
      notes: values.notes,
      raw: values as Record<string, unknown>,
    };
    let res: Response;
    try {
      res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("[armsleeve] network error", err);
      toast.error("Network error", {
        description: err instanceof Error ? err.message : String(err),
      });
      return;
    }

    let body: { ok?: boolean; id?: string; error?: string; detail?: string };
    const text = await res.text();
    try {
      body = text ? JSON.parse(text) : {};
    } catch {
      body = { detail: text };
    }

    if (!res.ok) {
      console.error("[armsleeve] api error", res.status, body);
      const detail =
        body.detail ?? body.error ?? `HTTP ${res.status} ${res.statusText}`;
      toast.error(`Submission failed (${res.status})`, {
        description: String(detail),
        duration: 8000,
      });
      return;
    }

    toast.success("Order received", {
      description: "Thanks! Our team will confirm via email/WhatsApp shortly.",
    });
    form.reset();
  };

  const errorCount = Object.keys(form.formState.errors).length;
  const onInvalid = (errors: Record<string, unknown>) => {
    console.warn("[armsleeve] validation errors", errors);
    const fieldList = Object.keys(errors).join(", ");
    toast.error(`Please fix ${errorCount} field(s)`, {
      description: fieldList || "Check the highlighted fields above.",
      duration: 6000,
    });
  };

  const history = form.watch("history") ?? [];
  const gender = form.watch("gender");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="flex min-h-0 flex-1 flex-col bg-white text-[15px] text-neutral-900"
      >
        {/* Sticky header — company name + logo + title */}
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
              ARMSLEEVE MEASUREMENT FORM
            </h3>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-8">

        {/* REF NO + Dated */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6">
          <InlineField label="REF NO.:" name="refNo" form={form} />
          <InlineField label="Dated:" name="date" form={form} type="date" labelUnderline />
        </div>

        {/* NAME / AGE / GENDER */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <InlineField label="PATIENT NAME:" name="patientName" form={form} />
          <div className="grid grid-cols-2 gap-3 md:contents">
            <InlineField label="AGE:" name="age" form={form} />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex flex-wrap items-center gap-2 space-y-0 sm:gap-3">
                  <FormLabel className="shrink-0 font-bold">GENDER:</FormLabel>
                  <div className="flex border border-neutral-900">
                    {(["MALE", "FEMALE"] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => field.onChange(g)}
                        className={cn(
                          "border-l border-neutral-900 px-3 py-1 text-xs font-semibold first:border-l-0",
                          gender === g
                            ? "bg-brand-navy text-white"
                            : "bg-white text-neutral-900 hover:bg-neutral-100",
                        )}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Contact / Address */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <InlineField label="Contact no.:" name="contact" form={form} />
          <InlineField label="Address:" name="address" form={form} />
        </div>

        {/* Recommended by */}
        <InlineField
          label="RECOMMENDED BY: Dr."
          name="recommendedBy"
          form={form}
        />

        {/* History */}
        <FormField
          control={form.control}
          name="history"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-wrap items-center gap-2">
                <FormLabel className="font-bold">HISTORY:</FormLabel>
                <div className="-m-0.5 flex flex-wrap">
                  {HISTORY_OPTIONS.map((opt) => {
                    const checked = history.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          const v = new Set(history);
                          if (checked) v.delete(opt);
                          else v.add(opt);
                          field.onChange(Array.from(v));
                        }}
                        className={cn(
                          "m-0.5 rounded border border-neutral-900 px-3 py-1 text-xs font-medium",
                          checked
                            ? "bg-brand-navy text-white"
                            : "bg-white text-neutral-900 hover:bg-neutral-100",
                        )}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Body — tables left, reference right */}
        <div className="grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            {/* Circumference table */}
            <MeasurementTable
              title="CIRCUMFERENCE"
              rows={CIRCUMFERENCE}
              form={form}
            />
            {/* Length table */}
            <MeasurementTable title="LENGTH" rows={LENGTH} form={form} />
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
          <InlineField
            label="Name / Signature / Contact (of the person taking measurement):"
            name="takerName"
            form={form}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={3}
                    placeholder="Any special requests, delivery preferences, or medical info…"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        </div>

        {/* Sticky footer */}
        <div className="shrink-0 border-t border-neutral-200 bg-white px-6 py-4 sm:px-8">
          {errorCount > 0 && (
            <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              <p className="font-semibold">
                Please fix {errorCount} field{errorCount > 1 ? "s" : ""}:
              </p>
              <ul className="mt-1 list-disc pl-5 text-xs">
                {Object.entries(form.formState.errors).map(([k, v]) => (
                  <li key={k}>
                    <span className="font-mono">{k}</span>:{" "}
                    {(v as { message?: string })?.message ?? "invalid"}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
              disabled={form.formState.isSubmitting}
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              {form.formState.isSubmitting ? "Submitting…" : "Submit order"}
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}

function InlineField({
  label,
  name,
  form,
  type = "text",
  labelUnderline,
}: {
  label: string;
  name: keyof Values;
  form: ReturnType<typeof useForm<Values>>;
  type?: string;
  labelUnderline?: boolean;
}) {
  return (
    <FormField
      control={form.control}
      name={name as Parameters<typeof form.register>[0]}
      render={({ field }) => (
        <FormItem className="flex items-center gap-2 space-y-0">
          <FormLabel
            className={cn(
              "shrink-0 font-bold",
              labelUnderline && "underline underline-offset-2",
            )}
          >
            {label}
          </FormLabel>
          <FormControl>
            <input
              {...field}
              type={type}
              value={String(field.value ?? "")}
              className="h-7 w-full flex-1 border-0 border-b border-neutral-400 bg-transparent px-1 text-sm focus:border-brand-navy focus:outline-none"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function MeasurementTable({
  title,
  rows,
  form,
}: {
  title: string;
  rows: ReadonlyArray<{ key: string; code: string; label: string }>;
  form: ReturnType<typeof useForm<Values>>;
}) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[420px] border border-neutral-900 px-2 py-1 text-center text-sm font-bold">
        {title}
      </div>
      <table className="w-full min-w-[420px] border-collapse border border-t-0 border-neutral-900 text-sm">
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-b border-neutral-900 last:border-b-0">
              <td className="w-12 border-r border-neutral-900 px-2 py-1 text-center font-mono font-semibold">
                {r.code}
              </td>
              <td className="border-r border-neutral-900 px-2 py-1 leading-snug">
                {r.label}
              </td>
              <td className="w-24 border-r border-neutral-900 p-0">
                <FormField
                  control={form.control}
                  name={r.key as Parameters<typeof form.register>[0]}
                  render={({ field }) => (
                    <input
                      {...field}
                      value={String(field.value ?? "")}
                      className="h-full w-full border-0 bg-transparent px-2 py-1 text-center text-sm focus:bg-brand-mint/40 focus:outline-none"
                    />
                  )}
                />
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
