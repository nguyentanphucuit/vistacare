import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { VistaCareLogo } from "@/components/logo/VistaCareLogo";
import { site } from "@/lib/site";
import { Facebook, Instagram, Twitter } from "lucide-react";

const footerLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "contactUs", href: "/contact" },
] as const;

export function Footer() {
  const t = useTranslations("nav");
  const tFoot = useTranslations("footer");
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <VistaCareLogo />
          <p className="mt-4 text-sm text-neutral-600 max-w-xs">
            {tFoot("tagline")}
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          {footerLinks.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-neutral-700 hover:text-brand-leaf w-fit"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className="flex gap-4 md:justify-end">
          <a
            href={site.socials.facebook}
            aria-label="Facebook"
            className="text-neutral-600 hover:text-brand-leaf"
          >
            <Facebook className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={site.socials.instagram}
            aria-label="Instagram"
            className="text-neutral-600 hover:text-brand-leaf"
          >
            <Instagram className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={site.socials.x}
            aria-label="X / Twitter"
            className="text-neutral-600 hover:text-brand-leaf"
          >
            <Twitter className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-neutral-500">
          &copy; {year} {site.company}. {tFoot("rights")}
        </div>
      </div>
    </footer>
  );
}
