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
import { cn } from "@/lib/utils";
import { ArrowRight, Ruler, HandMetal, Timer } from "lucide-react";

export default async function MeasurementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MeasurementContent />;
}

function MeasurementContent() {
  const t = useTranslations("measurementPage");
  const tCta = useTranslations("cta");

  const sizes = [
    { size: "S", ankle: "18-21 cm", calf: "28-33 cm", thigh: "45-53 cm" },
    { size: "M", ankle: "21-24 cm", calf: "33-38 cm", thigh: "53-61 cm" },
    { size: "L", ankle: "24-27 cm", calf: "38-43 cm", thigh: "61-69 cm" },
    { size: "XL", ankle: "27-30 cm", calf: "43-48 cm", thigh: "69-77 cm" },
    { size: "XXL", ankle: "30-33 cm", calf: "48-53 cm", thigh: "77-85 cm" },
  ];

  const howTo = [
    {
      icon: Ruler,
      title: "Use a soft measuring tape",
      body: "Hold it snug against the skin — not tight, not loose. Measure on bare skin, not over trousers.",
    },
    {
      icon: Timer,
      title: "Measure in the morning",
      body: "Swelling is minimal right after waking up. Avoid measuring at the end of a long day.",
    },
    {
      icon: HandMetal,
      title: "Take three key readings",
      body: "Ankle at narrowest point (cB), calf at widest point (cC), thigh just below the buttock crease (cG).",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-navy-light via-white to-brand-green-light">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-brand-navy leading-[1.1]">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-neutral-700 leading-relaxed">
              {t("heroBody")}
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                {tCta("contactNow")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-mint">
            <Image
              src="/placeholder.svg"
              alt="Measuring compression garment size"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* How to measure */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title={t("howToTitle")}
            subtitle={t("howToSubtitle")}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {howTo.map((h) => (
              <article
                key={h.title}
                className="flex h-full flex-col gap-4 rounded-2xl border border-neutral-200/70 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-mint-dark hover:shadow-xl"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy-light text-brand-navy">
                  <h.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-semibold text-brand-navy">
                  {h.title}
                </h3>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {h.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Chart */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading title={t("chartTitle")} />
          <div className="mt-12 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-brand-mint">
                  <TableHead className="text-brand-navy">Size</TableHead>
                  <TableHead className="text-brand-navy">Ankle (cB)</TableHead>
                  <TableHead className="text-brand-navy">Calf (cC)</TableHead>
                  <TableHead className="text-brand-navy">Thigh (cG)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sizes.map((s) => (
                  <TableRow key={s.size}>
                    <TableCell className="font-semibold">{s.size}</TableCell>
                    <TableCell>{s.ankle}</TableCell>
                    <TableCell>{s.calf}</TableCell>
                    <TableCell>{s.thigh}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-4 text-sm text-neutral-500 text-center">
            {t("chartNote")}
          </p>
        </div>
      </section>
    </>
  );
}
