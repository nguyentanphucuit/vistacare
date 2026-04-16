import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { InfoCard } from "@/components/sections/InfoCard";
import { ContactCTABlock } from "@/components/sections/ContactCTABlock";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomePageContent />;
}

function HomePageContent() {
  const t = useTranslations("home");
  const tCta = useTranslations("cta");

  const whoShouldUse = [
    {
      title: "Elderly Individuals",
      body: "Prevent venous disorders, manage pain & swelling.",
    },
    {
      title: "Pregnant Women",
      body: "Relieve leg fatigue, swelling, and varicose veins.",
    },
    {
      title: "Working Professionals",
      body: "Long sitting hours. Prevent DVT, soreness of muscles.",
    },
    {
      title: "Athletes & Travelers",
      body: "Reduce muscle strain. Enhance performance.",
    },
  ];

  const whyChoose = [
    {
      number: "01",
      title: "Graduated Compression Support",
      body: "Delivers graduated compression to improve blood flow, reduce swelling, and lower the risk of clot formation.",
    },
    {
      number: "02",
      title: "All-Season Adaptive Medical Fabric",
      body: "Made with soft, breathable, antimicrobial fabric that is cotton-rich, water-repellent, and safe for all skin types.",
    },
    {
      number: "03",
      title: "Custom-Fit Design (Class I & II)",
      body: "Each garment is measured and custom sized to match your body's shape for optimal medical effectiveness.",
    },
    {
      number: "04",
      title: "Clinically Backed",
      body: "Trusted for treatment and prevention of DVT, varicose veins, ulcers, swelling, and post-surgical conditions.",
    },
  ];

  const productRanges = [
    "Below Knee Stockings",
    "Thigh High Stockings",
    "Full Leg Stockings",
    "Arm Sleeves & Body Garments",
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-white via-brand-mint/40 to-brand-mint">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-brand-leaf">
              {t("heroEyebrow")}
            </p>
            <h1 className="font-serif mt-4 text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-brand-black leading-[1.05]">
              {t("heroTitle")}
            </h1>
            <p className="mt-4 text-lg md:text-xl font-medium text-neutral-800">
              {t("heroSubtitle")}
            </p>
            <p className="mt-6 text-base text-neutral-600 leading-relaxed max-w-xl">
              {t("heroBody")}
            </p>
            <div className="mt-8">
              <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
                {tCta("contactNow")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-mint-dark">
            <Image
              src="/placeholder.svg"
              alt="Medical professional fitting a Vista Care compression garment"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-mint">
            <Image
              src="/placeholder.svg"
              alt="Vistaar International CG manufacturing facility"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-brand-leaf">
              About Vista Care
            </p>
            <p className="mt-4 text-lg text-neutral-700 leading-relaxed">
              {t("aboutSnippet")}
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-brand-black hover:text-brand-leaf"
            >
              {tCta("knowMoreAboutUs")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Who Should Use */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title={t("whoShouldUseTitle")} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whoShouldUse.map((c) => (
              <InfoCard
                key={c.title}
                variant="image"
                image="/placeholder.svg"
                imageAlt={c.title}
                title={c.title}
                body={c.body}
                href="/products"
                ctaLabel={tCta("learnMore")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-brand-mint py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title={t("whyChooseTitle")}
            subtitle={t("whyChooseIntro")}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((c) => (
              <InfoCard
                key={c.number}
                variant="number"
                number={c.number}
                title={c.title}
                body={c.body}
              />
            ))}
          </div>
          <ContactCTABlock />
        </div>
      </section>

      {/* Product Range */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-brand-mint">
            <Image
              src="/placeholder.svg"
              alt="Mannequin wearing Vista Care compression stockings"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              title="Product Range"
              subtitle={t("productRangeIntro")}
              align="left"
            />
            <ul className="mt-6 space-y-3">
              {productRanges.map((p) => (
                <li key={p} className="flex items-center gap-3 text-base">
                  <CheckCircle2 className="h-5 w-5 text-brand-leaf" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/products" className={cn(buttonVariants({ size: "lg" }))}>
                {tCta("knowMore")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="bg-brand-mint/40 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading title={t("videoTitle")} />
          <div className="mt-12 flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-brand-mint-dark bg-white">
            <PlayCircle className="h-20 w-20 text-brand-leaf" aria-hidden="true" />
          </div>
        </div>
      </section>
    </>
  );
}
