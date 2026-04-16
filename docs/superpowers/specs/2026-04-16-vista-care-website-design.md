# Vista Care Website — Design Spec

**Date:** 2026-04-16
**Project dir:** `c:/Users/Peter/Desktop/vista`

## Brand

- **Name:** Vista Care — *"Comfort That Heals"*
- **Company:** Vistaar International CG Co. Ltd
- **Product:** Medical Compression Garments (Class I & II)
- **Markets:** India (Mumbai, New Delhi), Vietnam (HCMC)
- **Colors:** mint `#e0f4f4`, white `#ffffff`, black `#000000`, leaf green `#2e7d32`, seed orange `#f57c00`

## Stack

- Next.js **16.1** — App Router, TypeScript, Turbopack
- Tailwind CSS **v4** — CSS-first `@theme` config in `globals.css`
- shadcn/ui — Button, Card, Accordion, NavigationMenu, Sheet (mobile nav), Table, Form, Input, Textarea, Toast
- **next-intl v3** — `/[locale]/...` routing, EN + VI, middleware locale detection
- Font — Geist Sans (Next.js default) + Geist Mono
- Icons — `lucide-react`
- Form — `react-hook-form` + `zod`

## Scope

### Pages (5 total)
1. Home `/`
2. About Us `/about`
3. Why Vista Care `/why-vista-care`
4. Products `/products`
5. Contact Us `/contact` — with real form (client-side validation; submit = toast + `console.log` placeholder, no backend)

Nav excludes Applications / FAQs / Catalogue (per user decision).

### i18n
- Locales: `en` (default) + `vi`
- URL prefix: `/en/...`, `/vi/...`
- Middleware: next-intl, cookie-persisted
- **Translation depth:** UI labels + section headings translated to VI. Body paragraphs stay EN with `TODO: translate` notes — user to send to translator later.

### Images
- All placeholders use `/placeholder.svg` in `public/`.
- One simple inline SVG for the logo (leaf + seed glyph + wordmark).

## Directory structure

```
vista/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              # Navbar + Footer + NextIntlClientProvider
│   │   ├── page.tsx                # Home
│   │   ├── about/page.tsx
│   │   ├── why-vista-care/page.tsx
│   │   ├── products/page.tsx
│   │   └── contact/page.tsx
│   ├── layout.tsx                  # root <html><body>
│   └── globals.css                 # Tailwind v4 @theme tokens
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── sections/
│   │   ├── PresenceSection.tsx     # reused About + Why
│   │   ├── InfoCard.tsx            # numbered OR icon card
│   │   ├── SectionHeading.tsx
│   │   └── ContactCTABlock.tsx     # "Call Now + Email Us"
│   ├── logo/
│   │   └── VistaCareLogo.tsx       # inline SVG
│   └── ui/                         # shadcn generated
├── lib/
│   ├── utils.ts                    # cn() from shadcn
│   └── site.ts                     # brand metadata (phones, emails, address, nav items)
├── i18n/
│   ├── routing.ts
│   └── request.ts
├── messages/
│   ├── en.json
│   └── vi.json
├── public/
│   └── placeholder.svg             # single gray SVG used everywhere
├── middleware.ts
├── next.config.ts
├── tailwind.config (none — Tailwind v4 uses CSS)
├── tsconfig.json
├── components.json                 # shadcn config
├── package.json
└── docs/superpowers/specs/2026-04-16-vista-care-website-design.md
```

## Design tokens (`app/globals.css`)

```css
@import "tailwindcss";
@plugin "tailwindcss-animate";

@theme {
  --color-brand-mint: #e0f4f4;
  --color-brand-mint-dark: #b8e0e0;
  --color-brand-black: #000000;
  --color-brand-leaf: #2e7d32;
  --color-brand-seed: #f57c00;
  --color-background: #ffffff;
  --color-foreground: #000000;

  --font-sans: var(--font-geist-sans), system-ui, sans-serif;
  --radius-card: 1rem;
}
```

Also include shadcn's required CSS variable layer (`:root` / `.dark`) for its components.

## Shared components

### `Navbar.tsx`
- Sticky top, white bg with subtle border.
- Left: `VistaCareLogo` + wordmark.
- Middle (desktop): nav links (Home, About Us, Why Vista Care, Products).
- Right: `LanguageSwitcher` + "Contact Us" shadcn Button (`variant="default"` → black bg).
- Mobile: `Sheet` hamburger drawer with same links stacked.

### `Footer.tsx`
- White background, mint top border.
- Left: logo + wordmark + tagline.
- Middle: links (Home / About Us / Contact Us).
- Right: social icons (Facebook / Instagram / X) as lucide icons.
- Bottom strip: `© {year} Vistaar International CG Co. Ltd`.

### `LanguageSwitcher.tsx`
- Button showing current locale ("EN ▾") → dropdown with EN / VI.
- Uses `next-intl`'s `useRouter`/`usePathname` to preserve current path when switching.

### `SectionHeading.tsx`
- Props: `eyebrow?`, `title`, `subtitle?`, `align = 'center' | 'left'`.

### `InfoCard.tsx`
- Variants:
  - `number` (01–04 large mint numeral above title) — used in "Why Choose".
  - `icon` (lucide icon in mint circle) — used in About 3-card section.
  - `image` (image on top with title + body + optional "Learn More >") — used in "Who Should Use" and similar grids.
- Props: `variant`, `number?`, `icon?`, `image?`, `title`, `body`, `href?`.

### `PresenceSection.tsx`
- Headline + body from spec ("Headquartered in Mumbai...").
- Two CTAs: Call Now (`tel:+919702604473`) + Email Us (`mailto:support@vistacareindia.com`).
- Used on About + Why Vista Care.

### `ContactCTABlock.tsx`
- Dark card, centered CTAs — used under Why Choose and at end of About.

### `VistaCareLogo.tsx`
- Inline SVG: a simple leaf (`fill=#2e7d32`) with a drop/seed (`fill=#f57c00`) + "Vista Care" wordmark.

### `lib/site.ts`
```ts
export const site = {
  name: "Vista Care",
  tagline: "Comfort That Heals",
  company: "Vistaar International CG Co. Ltd",
  email: "support@vistacareindia.com",
  website: "www.vistacareindia.com",
  phones: { zalo: "+919702604473", whatsapp: "+919702274689" },
  offices: ["Mumbai", "New Delhi", "Ho Chi Minh City"],
  socials: { facebook: "#", instagram: "#", x: "#" },
};
```

## Page-level section inventory

### Home (`/[locale]/page.tsx`)
1. `Hero` — 2-col: headline ("COMFORT THAT HEALS") + subtitle + body + "Contact Now" Button (links `/contact`) | doctor placeholder image right.
2. `AboutSnippet` — 2-col: placeholder image left | 2-decade blurb + "Know more about us →" link.
3. `WhoShouldUse` — SectionHeading + grid 4× `InfoCard` variant="image" (Elderly / Pregnant / Working Professionals / Athletes & Travelers).
4. `WhyChoose` — mint bg section, SectionHeading + grid 4× `InfoCard` variant="number" (01–04), ContactCTABlock at bottom.
5. `ProductRange` — 2-col: mannequin placeholder left | list + "Know More" CTA.
6. `VideoSection` — SectionHeading + `<div>` placeholder (16:9 mint box with play icon).

### About (`/[locale]/about/page.tsx`)
1. `AboutHero` — 2-col, doctor placeholder left, text right.
2. `ThreeInfoCards` — grid 3× `InfoCard` variant="icon" (building icon, heart icon, users icon).
3. `WhatWeDo` — 2-col: placeholder image + list + paragraph.
4. `OurApproach` — SectionHeading + subtitle + Contact Now button + team placeholder image.
5. `OurPromise` — 2-col: image + list.
6. `PresenceSection` (shared).
7. Contact detail block — company name, Zalo, WhatsApp, email, website.

### Why Vista Care (`/[locale]/why-vista-care/page.tsx`)
1. `WhyHero` — 2-col: logo large left | heading + blurb + Contact Now.
2. `ComfortSection` — heading + patient image + 3 badges.
3. `ComparisonTable` — shadcn `Table` with the 8 comparison rows from spec.
4. `PresenceSection` (shared).

### Products (`/[locale]/products/page.tsx`)
1. `ProductsHero` — heading + doctor image + Contact Now.
2. `MeasurementChart` — shadcn `Table` placeholder (with generic size columns).
3. `FAQ` — shadcn `Accordion` type="single", 9 items from spec.

### Contact (`/[locale]/contact/page.tsx`)
1. `ContactHero` — centered heading + subheading.
2. `ContactBody` — 2-col:
   - **Left**: shadcn Form (Name, Email, Phone, Subject, Message) with zod validation; submit → toast "Thanks! We'll be in touch" + `console.log(values)`.
   - **Right**: contact info block (address, phones, email, web, social icons).

## i18n content plan

`messages/en.json` — full translations for:
- `nav.*` (home, about, whyVistaCare, products, contactUs)
- `cta.*` (contactNow, knowMore, learnMore, callNow, emailUs)
- Section headings & card titles across all pages
- Key short strings

Long body paragraphs (hero body, about company paragraphs) live in component JSX as constants in English, with comment `// TODO: translate to VI when content is finalized`.

`messages/vi.json` — Vietnamese translation of nav, CTA, section headings, card titles. Missing keys fall back to EN automatically via next-intl.

## Routing & middleware

```ts
// i18n/routing.ts
export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "en",
});

// middleware.ts
export default createMiddleware(routing);
export const config = { matcher: ["/", "/(en|vi)/:path*"] };
```

All internal `Link` components use `next-intl`'s locale-aware `Link`.

## Responsive strategy

- Mobile-first. Breakpoints default Tailwind (`sm 640`, `md 768`, `lg 1024`, `xl 1280`).
- Hero 2-col → stacks on mobile.
- Card grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` (adjust 2/3 cards accordingly).
- Tables: horizontal scroll wrapper on mobile.
- Navbar: desktop row → mobile `Sheet` drawer (shadcn).

## Out of scope / decisions locked

- No backend for contact form (toast + `console.log` only).
- No CMS — content lives in components.
- No blog, no Applications / FAQs / Catalogue pages.
- No SEO beyond `metadata` in layouts.
- No dark mode.
- No analytics.
- VI translation only covers UI labels + headings.

## Testing

- Type-check via `tsc --noEmit` (run at end).
- Manual verification: both locales render on each page, nav/footer consistent, forms validate, mobile drawer opens.
- No automated test suite (scope locked).
