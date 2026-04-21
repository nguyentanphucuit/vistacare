"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArmsleeveForm } from "./ArmsleeveForm";
import { FileText, ArrowRight } from "lucide-react";

type FormDef = {
  id: string;
  title: string;
  pdf: string;
  intro: string;
};

const FORMS: FormDef[] = [
  {
    id: "armsleeve",
    title: "Armsleeve Measurement Form",
    pdf: "/pdf/Armsleeve Measurement Form.pdf",
    intro:
      "Upper-limb measurement order — circumferences from wrist to axilla plus length points.",
  },
  {
    id: "stockings",
    title: "Stockings Measurement Form",
    pdf: "/pdf/Stockings Measurement Form.pdf",
    intro:
      "For below-knee, knee-high, and thigh-high stockings — ankle, calf, and leg length.",
  },
  {
    id: "bottom-girdle",
    title: "Bottom Girdle Measurement Form",
    pdf: "/pdf/Bottom Girdle Measurement Form.pdf",
    intro:
      "Full-leg / pantyhose order with waist, hip, thigh, knee, and ankle measurements.",
  },
  {
    id: "male-vest",
    title: "Male Vest Measurement Form",
    pdf: "/pdf/Male Vest Measurement Form.pdf",
    intro: "Male upper-body vest — chest, shoulder, waist, and torso length.",
  },
  {
    id: "female-vest",
    title: "Female Vest Measurement Form",
    pdf: "/pdf/Female Vest Measurement Form.pdf",
    intro:
      "Female upper-body vest — bust, waist, under-bust, and torso length.",
  },
  {
    id: "body-suit",
    title: "Body Suit Measurement Form",
    pdf: "/pdf/Body Suit Measurement Form.pdf",
    intro: "Full body suit — combined upper- and lower-body measurement set.",
  },
];

export function OrderFormsGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {FORMS.map((f) => (
        <FormCard key={f.id} form={f} />
      ))}
    </div>
  );
}

function FormCard({ form }: { form: FormDef }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="group flex h-full flex-col gap-3 rounded-2xl border border-neutral-200/70 bg-white p-6 text-left shadow-none transition duration-300 hover:-translate-y-1 hover:border-brand-navy hover:shadow-xl"
        type="button"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy-light text-brand-navy">
          <FileText className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="text-lg font-semibold text-brand-navy">{form.title}</h3>
        <p className="flex-1 text-base text-neutral-600 leading-relaxed">
          {form.intro}
        </p>
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">
          Open form
          <ArrowRight
            className="h-4 w-4 transition group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </DialogTrigger>
      <DialogContent className="flex max-h-[92vh] w-[95vw] max-w-6xl flex-col overflow-hidden p-0 sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle className="sr-only">{form.title}</DialogTitle>
        </DialogHeader>
        {form.id === "armsleeve" ? (
          <ArmsleeveForm />
        ) : (
          <PlaceholderForm form={form} />
        )}
      </DialogContent>
    </Dialog>
  );
}

function PlaceholderForm({ form }: { form: FormDef }) {
  return (
    <div className="space-y-5 overflow-y-auto p-6 sm:p-8">
      <div className="rounded-lg border border-neutral-300 bg-white p-5 text-sm">
        <p className="text-base font-bold uppercase tracking-wide text-brand-navy">
          Vistaar International CG Company Ltd
        </p>
        <h3 className="mt-4 text-center text-2xl font-bold uppercase tracking-[0.2em] text-brand-navy">
          {form.title.replace(" Measurement Form", "")}
        </h3>
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-neutral-600">
          Measurement Form
        </p>
      </div>
      <div className="rounded-md bg-brand-mint/40 p-4 text-sm text-neutral-700">
        Interactive form for this category is coming soon. In the meantime you
        can preview the official PDF below or download it to fill by hand.
      </div>
      <iframe
        title={form.title}
        src={form.pdf}
        className="h-[60vh] w-full rounded-lg border border-neutral-200"
      />
    </div>
  );
}
