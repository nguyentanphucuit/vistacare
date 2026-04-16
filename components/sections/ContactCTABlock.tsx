import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Phone, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ContactCTABlock() {
  const t = useTranslations("cta");
  return (
    <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <Link
        href="/contact"
        className={cn(buttonVariants({ size: "lg" }))}
      >
        {t("contactNow")}
      </Link>
      <a
        href={`tel:${site.phones.zalo}`}
        className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        {t("callNow")}
      </a>
      <a
        href={`mailto:${site.email}`}
        className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        {t("emailUs")}
      </a>
    </div>
  );
}
