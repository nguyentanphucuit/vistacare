import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";

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

  return (
    <>
      <section className="bg-gradient-to-br from-brand-navy-light via-white to-brand-green-light py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <SectionHeading
            title={t("heroTitle")}
            subtitle={t("heroSubtitle")}
          />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-10 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
