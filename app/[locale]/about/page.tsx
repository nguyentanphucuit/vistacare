import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { InfoCard } from "@/components/sections/InfoCard";
import { PresenceSection } from "@/components/sections/PresenceSection";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Building2, Heart, Users, CheckCircle2, Phone, Mail, Globe } from "lucide-react";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPageContent />;
}

function AboutPageContent() {
  const t = useTranslations("about");
  const tCta = useTranslations("cta");
  const tContact = useTranslations("contact.info");

  const threeCards = [
    {
      icon: Building2,
      title: "A healthcare company in Vietnam",
      body: "Vistaar International CG Co. Ltd is a healthcare company in Vietnam focused on the manufacturing and distribution of high-quality medical compression stockings under the brand VISTA CARE – 'Comfort that Heals.'",
    },
    {
      icon: Heart,
      title: "Two decades of expertise",
      body: "Having background of more than Two decades of experience in Compression Garments, we combine manufacturing expertise with local insight to provide clinically effective, affordable, and comfortable compression therapy solutions with technology from India and made for Vietnamese market.",
    },
    {
      icon: Users,
      title: "Trusted by medical professionals",
      body: "We serve hospitals, clinics, pharmacies, and healthcare professionals with CE-compliant compression garments optimized to match individual medical needs for conditions like varicose veins, diabetes, and post-surgical recovery.",
    },
  ];

  const whatWeDo = [
    "Medical compression stockings (Class I & II)",
    "Regular/Standard ones optimized to fit all anatomies",
    "Custom-fitted compression garments for post-operative recovery",
    "Body sleeves and limb garments for DVT, varicose veins, lymphoedema, and post-burn keloids",
  ];

  const promise = [
    "Precision-made garments",
    "Reliable delivery",
    "Dedicated after-sales support",
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-mint/60 via-white to-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-mint">
            <Image
              src="/placeholder.svg"
              alt="Doctor consulting with a patient"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-black">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 text-base md:text-lg text-neutral-700 leading-relaxed">
              {t("heroBody")}
            </p>
          </div>
        </div>
      </section>

      {/* 3 info cards */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3">
          {threeCards.map((c) => (
            <InfoCard
              key={c.title}
              variant="icon"
              icon={c.icon}
              title={c.title}
              body={c.body}
            />
          ))}
        </div>
      </section>

      {/* What we do */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-mint">
            <Image
              src="/placeholder.svg"
              alt="Patient wearing compression garment"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading title={t("whatWeDoTitle")} align="left" />
            <p className="mt-4 text-neutral-700">{t("whatWeDoIntro")}</p>
            <ul className="mt-6 space-y-3">
              {whatWeDo.map((w) => (
                <li key={w} className="flex items-start gap-3 text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-leaf" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-neutral-700">{t("whatWeDoOutro")}</p>
          </div>
        </div>
      </section>

      {/* Our approach */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading
              title={t("approachTitle")}
              subtitle={t("approachSubtitle")}
              align="left"
            />
            <div className="mt-8">
              <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
                {tCta("contactNow")}
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-mint">
            <Image
              src="/placeholder.svg"
              alt="Medical team portrait"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our promise */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-mint order-2 md:order-1">
            <Image
              src="/placeholder.svg"
              alt="Compression garment quality inspection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <SectionHeading title={t("promiseTitle")} align="left" />
            <p className="mt-4 text-neutral-700">{t("promiseIntro")}</p>
            <ul className="mt-6 space-y-3">
              {promise.map((p) => (
                <li key={p} className="flex items-start gap-3 text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-leaf" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PresenceSection />

      {/* Contact details */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 md:p-12 shadow-sm">
            <h3 className="text-2xl font-semibold text-brand-black">
              {tContact("company")}
            </h3>
            <dl className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-brand-leaf" aria-hidden="true" />
                <div>
                  <dt className="text-sm text-neutral-500">{tContact("zalo")}</dt>
                  <dd className="font-medium">
                    <a href={`tel:${site.phones.zalo}`}>{site.phones.zalo}</a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-brand-leaf" aria-hidden="true" />
                <div>
                  <dt className="text-sm text-neutral-500">{tContact("whatsapp")}</dt>
                  <dd className="font-medium">
                    <a href={`tel:${site.phones.whatsapp}`}>{site.phones.whatsapp}</a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-brand-leaf" aria-hidden="true" />
                <div>
                  <dt className="text-sm text-neutral-500">{tContact("email")}</dt>
                  <dd className="font-medium">
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="mt-1 h-5 w-5 text-brand-leaf" aria-hidden="true" />
                <div>
                  <dt className="text-sm text-neutral-500">{tContact("website")}</dt>
                  <dd className="font-medium">
                    <a href={site.websiteUrl}>{site.website}</a>
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
