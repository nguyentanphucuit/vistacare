import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProductsCatalog } from "@/components/products/ProductsCatalog";
import { fetchProducts } from "@/lib/products-server";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const products = await fetchProducts();
  return <ProductsContent products={products} />;
}

function ProductsContent({ products }: { products: Product[] }) {
  const t = useTranslations("products");
  const tCta = useTranslations("cta");

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
      <section className="bg-gradient-to-br from-brand-navy-light via-white to-brand-green-light">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-brand-navy leading-[1.1]">
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

      {/* Product Catalog */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title={t("catalog.title")}
            subtitle={t("catalog.subtitle")}
          />
          <div className="mt-12">
            <ProductsCatalog products={products} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      {/* @base-ui/react Accordion.Root uses `multiple` (default false = single open) */}
      {/* No `type` or `collapsible` props — single-open is the default behaviour */}
      <section className="py-16 md:py-24">
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
