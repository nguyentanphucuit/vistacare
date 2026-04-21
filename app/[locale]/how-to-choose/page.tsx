import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProductsCatalog } from "@/components/products/ProductsCatalog";
import { fetchProducts } from "@/lib/products-server";
import type { Product } from "@/lib/products";
import { OrderFormsGrid } from "@/components/order/OrderFormsGrid";
import { cn } from "@/lib/utils";
import {
  Stethoscope,
  Ruler,
  ShieldCheck,
  PlayCircle,
  ArrowRight,
} from "lucide-react";

export default async function HowToOrderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const products = await fetchProducts();
  return <HowToOrderContent products={products} />;
}

function HowToOrderContent({ products }: { products: Product[] }) {
  const t = useTranslations("howToOrder");
  const tCta = useTranslations("cta");

  const chooseSteps = [
    {
      icon: Stethoscope,
      title: "Identify your condition",
      body: "Varicose veins, DVT prevention, post-surgical recovery, lymphoedema, or pregnancy support each point to a different garment type.",
    },
    {
      icon: Ruler,
      title: "Take your measurements",
      body: "Use our measurement chart at ankle, calf, thigh, or arm — morning readings are most accurate.",
    },
    {
      icon: ShieldCheck,
      title: "Match the compression class",
      body: "Class I (15–20 mmHg) for prevention and light symptoms, Class II (20–30 mmHg) for medical-grade therapy.",
    },
  ];

  const tutorialSteps = [
    {
      title: "Browse & shortlist",
      body: "Review the product catalog and note the slug of the item(s) you want.",
    },
    {
      title: "Measure yourself",
      body: "Take the required measurements using our chart. Accuracy is crucial for therapeutic fit.",
    },
    {
      title: "Fill the form",
      body: "Pick the matching order form, complete it with your measurements and preferences.",
    },
    {
      title: "Submit & receive",
      body: "Send us the form via email or WhatsApp. We confirm, produce, and dispatch to your address.",
    },
  ];

  const useSteps = [
    {
      title: "Prepare your skin",
      body: "Wear on clean, dry skin in the morning when swelling is minimal. Avoid creams or lotions.",
    },
    {
      title: "Turn inside out & slip in",
      body: "Invert the stocking up to the heel, slide your foot in, and align the heel pocket.",
    },
    {
      title: "Roll up gradually",
      body: "Unroll the fabric up the leg in small sections — never pull or stretch vertically.",
    },
    {
      title: "Smooth & wear all day",
      body: "Remove wrinkles with flat palms. Remove before bed and hand-wash in cool water.",
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
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                {tCta("contactNow")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-mint-dark">
            <Image
              src="/placeholder.svg"
              alt="How to order Vista Care compression garments"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 1. Catalog */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title={t("catalogTitle")}
            subtitle={t("catalogSubtitle")}
          />
          <div className="mt-12">
            <ProductsCatalog products={products} />
          </div>
        </div>
      </section>

      {/* 2. How to choose */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title={t("howToChooseTitle")}
            subtitle={t("howToChooseSubtitle")}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {chooseSteps.map((s, i) => (
              <article
                key={s.title}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-none transition duration-300 hover:-translate-y-1 hover:border-brand-mint-dark hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-mint">
                  <Image
                    src="/placeholder.svg"
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-white">
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-lg font-semibold text-brand-navy">
                    {s.title}
                  </h3>
                  <p className="text-xl text-neutral-600 leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Order forms — click each card to open the form modal */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title={t("formsTitle")}
            subtitle={t("formsSubtitle")}
          />
          <div className="mt-12">
            <OrderFormsGrid />
          </div>
        </div>
      </section>

      {/* 4. Tutorial */}
      <section className="bg-brand-mint/40 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            title={t("tutorialTitle")}
            subtitle={t("tutorialSubtitle")}
          />
          <div className="mt-12 grid gap-8 md:grid-cols-5 md:items-center">
            <div className="md:col-span-3">
              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-brand-mint-dark bg-white">
                <PlayCircle
                  className="h-20 w-20 text-brand-leaf"
                  aria-hidden="true"
                />
              </div>
            </div>
            <ol className="md:col-span-2 flex flex-col gap-4">
              {tutorialSteps.map((s, i) => (
                <li
                  key={s.title}
                  className="flex gap-4 rounded-2xl bg-white p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-brand-navy">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-600">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 5. How to use it */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title={t("howToUseTitle")}
            subtitle={t("howToUseSubtitle")}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {useSteps.map((s, i) => (
              <article
                key={s.title}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-none transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-brand-green-light">
                  <Image
                    src="/placeholder.svg"
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <span className="text-5xl font-medium text-brand-green/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-semibold text-brand-navy">
                    {s.title}
                  </h3>
                  <p className="text-xl text-neutral-600 leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
