import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { InfoCard } from "@/components/sections/InfoCard";
import { cn } from "@/lib/utils";
import { ArrowRight, PlayCircle, Quote } from "lucide-react";

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

  const products = [
    {
      title: "Below Knee Stockings",
      body: "Graduated compression below the knee for daily wear, long flights, and mild venous insufficiency.",
    },
    {
      title: "Thigh High Stockings",
      body: "Extended coverage for advanced venous conditions, varicose veins, and post-surgical recovery.",
    },
    {
      title: "Arm Sleeves & Body Garments",
      body: "Custom compression for upper-limb recovery, lymphoedema, and post-burn keloid management.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Vista Care's graduated compression has become my go-to recommendation for post-surgical DVT prevention. The fit and durability are clinically superior.",
      name: "Dr. Priya Sharma",
      role: "Vascular Surgeon, Mumbai",
    },
    {
      quote:
        "I've worn Vista Care stockings throughout my pregnancy. My leg fatigue and swelling are gone, and the fabric stays comfortable all day.",
      name: "Linh Nguyen",
      role: "Patient, Ho Chi Minh City",
    },
    {
      quote:
        "The quality and consistency of Vistaar's garments have made them our preferred supplier for over three years. Our patients notice the difference.",
      name: "Rohit Kumar",
      role: "Clinical Director, New Delhi",
    },
  ];

  return (
    <>
      {/* 1. Hero — full screen */}
      <section className="bg-gradient-to-br from-brand-navy-light via-white to-brand-green-light">
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-12 px-4 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-brand-leaf">
              {t("heroEyebrow")}
            </p>
            <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-brand-navy leading-[1.05]">
              {t("heroTitle")}
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-medium text-neutral-800">
              {t("heroSubtitle")}
            </p>
            <p className="mt-6 max-w-xl text-xl text-neutral-600 leading-relaxed">
              {t("heroBody")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
                {tCta("contactNow")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/products"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                {tCta("knowMore")}
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

      {/* 2. About Us */}
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
            <p className="mt-4 text-xl text-neutral-700 leading-relaxed">
              {t("aboutSnippet")}
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-brand-navy hover:text-brand-leaf"
            >
              {tCta("knowMoreAboutUs")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. 3 Products showcase */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title={t("productsShowcaseTitle")}
            subtitle={t("productsShowcaseIntro")}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {products.map((p) => (
              <InfoCard
                key={p.title}
                variant="image"
                image="/placeholder.svg"
                imageAlt={p.title}
                title={p.title}
                body={p.body}
                href="/products"
                ctaLabel={tCta("learnMore")}
              />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/products"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              {tCta("knowMore")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Testimonials */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title={t("testimonialsTitle")}
            subtitle={t("testimonialsIntro")}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((tm) => (
              <figure
                key={tm.name}
                className="flex h-full flex-col gap-5 rounded-2xl border border-neutral-200/70 bg-white p-7 shadow-none transition duration-300 hover:-translate-y-1 hover:border-brand-mint-dark hover:shadow-xl"
              >
                <Quote
                  className="h-6 w-6 text-brand-leaf"
                  aria-hidden="true"
                />
                <blockquote className="flex-1 text-xl text-neutral-700 leading-relaxed">
                  "{tm.quote}"
                </blockquote>
                <figcaption className="border-t border-neutral-200 pt-4">
                  <p className="font-semibold text-brand-navy">{tm.name}</p>
                  <p className="text-sm text-neutral-500">{tm.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Video */}
      <section className="bg-brand-mint/40 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading title={t("videoTitle")} />
          <div className="mt-12 flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-brand-mint-dark bg-white">
            <PlayCircle
              className="h-20 w-20 text-brand-leaf"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>
    </>
  );
}
