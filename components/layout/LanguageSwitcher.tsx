"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("language");
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (next: (typeof routing.locales)[number]) => {
    router.replace(pathname, { locale: next });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("label")}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "gap-1.5",
        )}
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="uppercase text-xs font-medium">{locale}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => switchTo(l)}
            className="flex items-center justify-between gap-4"
          >
            <span>{t(l)}</span>
            {l === locale && <Check className="h-4 w-4" aria-hidden="true" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
