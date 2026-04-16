import { useTranslations } from "next-intl";
import { SectionHeading } from "./SectionHeading";
import { ContactCTABlock } from "./ContactCTABlock";

export function PresenceSection() {
  const t = useTranslations("about");
  return (
    <section className="bg-brand-mint py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading
          title={t("presenceTitle")}
          subtitle={t("presenceBody")}
        />
        <ContactCTABlock />
      </div>
    </section>
  );
}
