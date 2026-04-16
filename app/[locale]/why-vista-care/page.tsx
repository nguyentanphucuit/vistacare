import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { PresenceSection } from "@/components/sections/PresenceSection";
import { VistaCareLogo } from "@/components/logo/VistaCareLogo";
import { cn } from "@/lib/utils";
import { Shield, Activity, HeartPulse } from "lucide-react";

export default async function WhyVistaCarePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WhyVistaCareContent />;
}

function WhyVistaCareContent() {
  const t = useTranslations("why");
  const tCta = useTranslations("cta");

  const badges = [
    { icon: Shield, label: "Anti-Embolism Therapy" },
    { icon: Activity, label: "Circulation Support" },
    { icon: HeartPulse, label: "Post-Surgical Healing" },
  ];

  const rows: Array<{ feature: string; medical: string; otc: string }> = [
    {
      feature: "Pressure Accuracy",
      medical: "±5% tolerance per RAL-GZ 387",
      otc: "No standard testing",
    },
    {
      feature: "Pressure Profile",
      medical: "Graduated compression (precise mmHg values)",
      otc: "Variable, inconsistent",
    },
    {
      feature: "Clinical Testing",
      medical: "Tested with pressure sensors (HOSYcan)",
      otc: "No formal testing",
    },
    {
      feature: "Standards Compliance",
      medical: "EN 13770, DIN 58133, RAL-GZ 387",
      otc: "None",
    },
    {
      feature: "Clinical Efficacy",
      medical: "Proven in clinical trials",
      otc: "Not validated",
    },
    {
      feature: "Durability",
      medical: "6+ months of therapeutic use",
      otc: "3-4 months typical",
    },
    {
      feature: "Customisation",
      medical: "Individual fit and pressure profiles",
      otc: "Limited options",
    },
    {
      feature: "Medical Device Status",
      medical: "Regulated medical device",
      otc: "Consumer textile",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-white via-brand-mint/40 to-brand-mint">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div className="flex items-center justify-center md:justify-start">
            <VistaCareLogo height={120} />
          </div>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-brand-black leading-[1.1]">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 text-base md:text-lg text-neutral-700 leading-relaxed">
              {t("heroBody")}
            </p>
            <div className="mt-8">
              <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
                {tCta("contactNow")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comfort section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title={t("comfortTitle")} subtitle={t("comfortBody")} />
          <div className="mt-12 grid gap-8 md:grid-cols-5 md:items-center">
            <div className="relative md:col-span-2 aspect-[4/5] overflow-hidden rounded-2xl bg-brand-mint">
              <Image
                src="/placeholder.svg"
                alt="Patient wearing Vista Care compression stocking"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="md:col-span-3 grid gap-4 sm:grid-cols-3">
              {badges.map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-brand-mint-dark bg-brand-mint/40 p-6 text-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-leaf">
                    <b.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title={t("comparisonTitle")} />
          <div className="mt-12 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-brand-mint">
                  <TableHead className="text-brand-black">Feature</TableHead>
                  <TableHead className="text-brand-black">Medical-Grade</TableHead>
                  <TableHead className="text-brand-black">OTC Products</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.feature}>
                    <TableCell className="font-medium">{r.feature}</TableCell>
                    <TableCell>{r.medical}</TableCell>
                    <TableCell className="text-neutral-500">{r.otc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <PresenceSection />
    </>
  );
}
