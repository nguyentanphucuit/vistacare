import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/lib/site";
import { Phone, Mail, Globe, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations("contact");
  const tInfo = useTranslations("contact.info");

  return (
    <>
      <section className="bg-gradient-to-br from-white via-brand-mint/40 to-brand-mint py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <SectionHeading
            title={t("heroTitle")}
            subtitle={t("heroSubtitle")}
          />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-5">
          <div className="lg:col-span-3 rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm">
            <ContactForm />
          </div>
          <aside className="lg:col-span-2 flex flex-col gap-4">
            <div className="rounded-2xl bg-brand-mint p-6">
              <h3 className="text-lg font-semibold text-brand-black">
                {tInfo("title")}
              </h3>
              <p className="mt-2 text-sm font-medium text-neutral-700">
                {tInfo("company")}
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-brand-leaf" aria-hidden="true" />
                  <span>
                    <span className="block text-xs text-neutral-500">{tInfo("zalo")}</span>
                    <a href={`tel:${site.phones.zalo}`} className="font-medium">
                      {site.phones.zalo}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-brand-leaf" aria-hidden="true" />
                  <span>
                    <span className="block text-xs text-neutral-500">{tInfo("whatsapp")}</span>
                    <a href={`tel:${site.phones.whatsapp}`} className="font-medium">
                      {site.phones.whatsapp}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-brand-leaf" aria-hidden="true" />
                  <span>
                    <span className="block text-xs text-neutral-500">{tInfo("email")}</span>
                    <a href={`mailto:${site.email}`} className="font-medium">
                      {site.email}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="mt-0.5 h-4 w-4 text-brand-leaf" aria-hidden="true" />
                  <span>
                    <span className="block text-xs text-neutral-500">{tInfo("website")}</span>
                    <a href={site.websiteUrl} className="font-medium">
                      {site.website}
                    </a>
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-brand-black flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-leaf" aria-hidden="true" />
                {tInfo("addresses")}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                {site.offices.map((o) => (
                  <li key={o.city}>
                    <span className="font-medium">{o.city}</span>, {o.country}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex gap-4 pt-4 border-t border-neutral-200">
                <a href={site.socials.facebook} aria-label="Facebook" className="text-neutral-600 hover:text-brand-leaf">
                  <Facebook className="h-5 w-5" aria-hidden="true" />
                </a>
                <a href={site.socials.instagram} aria-label="Instagram" className="text-neutral-600 hover:text-brand-leaf">
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                </a>
                <a href={site.socials.x} aria-label="X / Twitter" className="text-neutral-600 hover:text-brand-leaf">
                  <Twitter className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
