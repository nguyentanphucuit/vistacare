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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { cn } from "@/lib/utils";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProductsContent />;
}

function ProductsContent() {
  const t = useTranslations("products");
  const tCta = useTranslations("cta");

  const sizes: Array<{
    size: string;
    ankle: string;
    calf: string;
    thigh: string;
  }> = [
    { size: "S", ankle: "18-21 cm", calf: "28-33 cm", thigh: "45-53 cm" },
    { size: "M", ankle: "21-24 cm", calf: "33-38 cm", thigh: "53-61 cm" },
    { size: "L", ankle: "24-27 cm", calf: "38-43 cm", thigh: "61-69 cm" },
    { size: "XL", ankle: "27-30 cm", calf: "43-48 cm", thigh: "69-77 cm" },
    { size: "XXL", ankle: "30-33 cm", calf: "48-53 cm", thigh: "77-85 cm" },
  ];

  const faqs = [
    {
      q: "What are compression garments?",
      a: "Compression garments are medically engineered stockings, sleeves, or body garments that apply graduated pressure to the limbs. They improve venous return, reduce swelling, and support healing in a range of circulatory conditions.",
    },
    {
      q: "Who should wear compression garments?",
      a: "People managing varicose veins, lymphoedema, post-surgical recovery, DVT risk, pregnancy-related swelling, or prolonged sitting/standing (professionals, travelers). Athletes also use them for recovery.",
    },
    {
      q: "Can I wear compression stockings every day?",
      a: "Yes. Most medical-grade garments are designed for daily wear. Put them on in the morning and remove them before bed, unless a doctor has prescribed overnight use.",
    },
    {
      q: "How long should I wear them to help?",
      a: "Typical therapeutic wear is 8–12 hours per day. Your physician will adjust based on your condition and recovery stage.",
    },
    {
      q: "What is the right size of Vista Care products?",
      a: "Use our measurement chart (see above) and compare ankle, calf, and thigh circumferences to find the best fit. For custom-fit garments, contact our team for guided measurement.",
    },
    {
      q: "How do I choose the right product?",
      a: "Class I (15–20 mmHg) suits mild symptoms, travel, and prevention. Class II (20–30 mmHg) is prescribed for more advanced venous conditions. When in doubt, consult a clinician.",
    },
    {
      q: "Can I wash and reuse compression garments?",
      a: "Yes. Hand-wash in cool water with mild detergent and air-dry. Avoid bleach, tumble drying, or ironing, which degrade the elastic fibers.",
    },
    {
      q: "Is it safe to use during pregnancy?",
      a: "Generally yes — compression stockings help prevent pregnancy-related swelling and varicose veins. Always confirm the appropriate class with your obstetrician.",
    },
    {
      q: "How Post-Surgical Knees benefit from garments?",
      a: "After knee surgery, graduated compression reduces post-operative swelling, lowers DVT risk, and supports the soft tissue during mobilization and rehabilitation.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-white via-brand-mint/40 to-brand-mint">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-brand-black leading-[1.1]">
              {t("heroTitle")}
            </h1>
            <div className="mt-8">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                {tCta("contactNow")}
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-mint-dark">
            <Image
              src="/placeholder.svg"
              alt="Medical professional fitting a patient"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Measurement chart */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading title={t("chartTitle")} />
          <div className="mt-12 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-brand-mint">
                  <TableHead className="text-brand-black">Size</TableHead>
                  <TableHead className="text-brand-black">
                    Ankle (cB)
                  </TableHead>
                  <TableHead className="text-brand-black">Calf (cC)</TableHead>
                  <TableHead className="text-brand-black">
                    Thigh (cG)
                  </TableHead>
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
            Chart is indicative. For custom-fit garments please contact our
            team.
          </p>
        </div>
      </section>

      {/* FAQ */}
      {/* @base-ui/react Accordion.Root uses `multiple` (default false = single open) */}
      {/* No `type` or `collapsible` props — single-open is the default behaviour */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading title={t("faqTitle")} />
          <Accordion className="mt-12">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-700">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
