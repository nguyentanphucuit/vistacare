# Vista Care Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 5-page marketing website for Vista Care (medical compression garments) in Next.js 16.1 with i18n (EN/VI), Tailwind v4, and shadcn/ui.

**Architecture:** Next.js App Router with `[locale]` segment (`next-intl`), shared layout (Navbar + Footer), page-specific sections inlined, small set of reusable sections (`InfoCard`, `PresenceSection`, `SectionHeading`, `ContactCTABlock`). Static content for EN; VI covers nav/CTA/headings only.

**Tech Stack:** Next.js 16.1, TypeScript, Tailwind CSS v4, shadcn/ui, next-intl v3, react-hook-form + zod, lucide-react, Geist font.

**Verification strategy:** No automated test suite (per spec). Each major task ends with `tsc --noEmit` + a commit. Final task runs full `next build` + manual browser check.

**Working dir:** `c:/Users/Peter/Desktop/vista`

---

## Phase 1 — Project scaffolding

### Task 1: Initialize Next.js 16.1 project

**Files:**
- Create: entire project scaffold via `create-next-app`

- [ ] **Step 1: Verify directory**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && ls -la
```
Expected: `docs/` present (from brainstorming), otherwise empty. If any stray files remain from previous attempts, ask the user before deleting.

- [ ] **Step 2: Scaffold the Next.js project into current directory**

Because `create-next-app` refuses non-empty directories, scaffold into a sibling temp directory first, then move files in while preserving `docs/`.

Run:
```bash
cd "c:/Users/Peter/Desktop" && npx --yes create-next-app@latest vista-init \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --use-npm \
  --yes

# Move everything (incl. dotfiles) from vista-init into vista, then delete temp
shopt -s dotglob
mv vista-init/* vista/
rmdir vista-init
shopt -u dotglob
```
Expected: `c:/Users/Peter/Desktop/vista/` now contains `package.json`, `app/`, `public/`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, and existing `docs/` preserved.

Verify the scaffolded Next version is ≥16.1 (the `@latest` tag as of this plan's date resolves to 16.1.x):
```bash
cd "c:/Users/Peter/Desktop/vista" && node -p "require('./package.json').dependencies.next"
```
Expected output starts with `16.` (e.g. `^16.1.0`). If it resolved to a different major, stop and pin explicitly: `npm install next@16.1.0 --save-exact`.

- [ ] **Step 3: Init git (project dir is not a repo yet)**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && git init && git add -A && git commit -m "chore: scaffold Next.js 16.1 project

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```
Expected: initial commit created.

- [ ] **Step 4: Verify Next version & build works**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npx next --version && npm run build
```
Expected: `16.1.x`, build completes successfully.

- [ ] **Step 5: Commit lockfile if modified**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && git status
```
If anything uncommitted: `git add -A && git commit -m "chore: post-scaffold build verification"`.

---

### Task 2: Install runtime dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install deps**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npm install \
  next-intl@^3.26.0 \
  react-hook-form@^7.54.0 \
  zod@^3.24.1 \
  @hookform/resolvers@^3.10.0 \
  lucide-react@^0.469.0 \
  class-variance-authority@^0.7.1 \
  clsx@^2.1.1 \
  tailwind-merge@^2.6.0 \
  tw-animate-css@^1.2.0
```
Expected: all install without peer conflicts.

- [ ] **Step 2: Verify install & commit**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npm run build && git add package.json package-lock.json && git commit -m "chore: add runtime dependencies (next-intl, rhf, zod, lucide, tailwind utils)

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Configure Tailwind v4 tokens + base styles

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `app/globals.css` with brand tokens**

Write `app/globals.css`:
```css
@import "tailwindcss";
@import "tw-animate-css";

@theme {
  --color-brand-mint: #e0f4f4;
  --color-brand-mint-dark: #b8e0e0;
  --color-brand-mint-deep: #0fa9a9;
  --color-brand-black: #000000;
  --color-brand-leaf: #2e7d32;
  --color-brand-seed: #f57c00;

  --color-background: #ffffff;
  --color-foreground: #0a0a0a;
  --color-muted: #f5f5f5;
  --color-muted-foreground: #525252;
  --color-border: #e5e5e5;
  --color-input: #e5e5e5;
  --color-ring: #a3a3a3;

  --color-primary: #000000;
  --color-primary-foreground: #ffffff;
  --color-secondary: #e0f4f4;
  --color-secondary-foreground: #0a0a0a;
  --color-accent: #f5f5f5;
  --color-accent-foreground: #0a0a0a;
  --color-destructive: #ef4444;
  --color-destructive-foreground: #ffffff;
  --color-card: #ffffff;
  --color-card-foreground: #0a0a0a;
  --color-popover: #ffffff;
  --color-popover-foreground: #0a0a0a;

  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;

  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
}

@layer base {
  * { border-color: var(--color-border); }
  html { scroll-behavior: smooth; }
  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4 { letter-spacing: -0.01em; }
}
```

- [ ] **Step 2: Verify build + commit**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npm run build && git add app/globals.css && git commit -m "style: add brand tokens and base styles

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Install shadcn/ui and required components

**Files:**
- Create: `components.json`, `lib/utils.ts`, `components/ui/*`

- [ ] **Step 1: Init shadcn (choose defaults suitable for Tailwind v4)**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npx --yes shadcn@latest init -y -d
```
Expected: `components.json` created, `lib/utils.ts` created with `cn()` helper. If it prompts interactively despite `-y -d`, answer: style=new-york, base color=neutral, CSS variables=yes.

- [ ] **Step 2: Add components**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npx --yes shadcn@latest add \
  button card accordion table sheet \
  form input textarea label sonner dropdown-menu navigation-menu
```
Expected: files created under `components/ui/`.

- [ ] **Step 3: Verify build + commit**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npm run build && git add -A && git commit -m "chore: add shadcn/ui (button, card, accordion, table, sheet, form, sonner, dropdown, nav)

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Create placeholder SVG

**Files:**
- Create: `public/placeholder.svg`

- [ ] **Step 1: Write `public/placeholder.svg`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#e0f4f4"/>
  <rect x="1" y="1" width="798" height="598" fill="none" stroke="#b8e0e0" stroke-width="2"/>
  <g fill="#2e7d32" opacity="0.5">
    <circle cx="400" cy="280" r="36"/>
    <path d="M 400 240 Q 430 270 400 320 Q 370 270 400 240 Z"/>
  </g>
  <text x="400" y="360" font-family="sans-serif" font-size="20" fill="#2e7d32" text-anchor="middle" opacity="0.7">Vista Care Image Placeholder</text>
</svg>
```

- [ ] **Step 2: Commit**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && git add public/placeholder.svg && git commit -m "chore: add shared placeholder SVG

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Phase 2 — i18n setup

### Task 6: Configure next-intl routing & middleware

**Files:**
- Create: `i18n/routing.ts`, `i18n/request.ts`, `middleware.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Write `i18n/routing.ts`**

```ts
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

- [ ] **Step 2: Write `i18n/request.ts`**

```ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 3: Write `middleware.ts`**

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(en|vi)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
```

- [ ] **Step 4: Update `next.config.ts` to enable the next-intl plugin**

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

- [ ] **Step 5: Commit (build will still fail — messages missing; that's fine, covered next)**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && git add i18n middleware.ts next.config.ts && git commit -m "feat(i18n): add next-intl routing, request config, middleware

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Add message catalogs

**Files:**
- Create: `messages/en.json`, `messages/vi.json`

- [ ] **Step 1: Write `messages/en.json`**

```json
{
  "nav": {
    "home": "Home",
    "about": "About Us",
    "whyVistaCare": "Why Vista Care",
    "products": "Products",
    "contactUs": "Contact Us",
    "openMenu": "Open menu",
    "closeMenu": "Close menu"
  },
  "cta": {
    "contactNow": "Contact Now",
    "knowMore": "Know More",
    "knowMoreAboutUs": "Know more about us",
    "learnMore": "Learn More",
    "callNow": "Call Now",
    "emailUs": "Email Us"
  },
  "home": {
    "heroEyebrow": "Medical Compression Garments",
    "heroTitle": "COMFORT THAT HEALS",
    "heroSubtitle": "Engineered for Graduated Compression. Enhanced Recovery. Everyday Comfort.",
    "heroBody": "Trusted by medical professionals and individuals across India and Vietnam. Vista Care Compression Garments are designed to promote better circulation, reduce swelling, and accelerate healing.",
    "aboutSnippet": "We at Vistaar International CG Co. Ltd are manufactures of Vista Care Brand of Compression Garments. We have more than Two decades of experience in manufacture medical-grade (Class I & II) stockings and sleeves designed to support blood circulation, reduce swelling, and accelerate recovery from a wide range of venous disorders and lymphatic conditions.",
    "whoShouldUseTitle": "Who Should Use Compression Garments?",
    "whyChooseTitle": "Why Choose Vista Care?",
    "whyChooseIntro": "At Vista Care, we go beyond generic solutions. Our compression garments are optimal sized for all age groups to match your specific medical preventive needs.",
    "productRangeIntro": "We manufacture Class I & Class II compression garments in multiple ranges:",
    "videoTitle": "Experience the Power of Medical Compression"
  },
  "about": {
    "heroTitle": "More than Two decades of Experience in Healing Through Compression Garments",
    "heroBody": "At Vista Care, we don't just manufacture compression garments — we deliver therapeutic solutions backed by two decades of clinical insight and compassionate care, to enhance recovery, prevent complications, and improve quality of life through precise, medical-grade compression garments designed for real comfort and quick healing.",
    "whatWeDoTitle": "What We Do",
    "whatWeDoIntro": "We design and manufacture:",
    "whatWeDoOutro": "Each garment is developed using specially engineered cotton-rich, breathable, and skin-safe fabric optimized to match individual medical needs with comfort, mobility, and climate in mind.",
    "approachTitle": "Our Approach",
    "approachSubtitle": "Our process is rooted in clinical precision and personal care",
    "promiseTitle": "Our Promise",
    "promiseIntro": "Whether it's managing chronic conditions or aiding post-surgical recovery, we are committed to:",
    "presenceTitle": "Our Presence",
    "presenceBody": "Headquartered in Mumbai, with operations in New Delhi and now in Ho Chi Minh City, Vietnam, Vista Care is evolving into a global compression care provider, serving patients, medical professionals, and wellness centers."
  },
  "why": {
    "heroTitle": "FEATURES OF VISTA CARE STOCKINGS",
    "heroBody": "VISTA CARE medical compression stockings are engineered to provide graduated compression to the affected limb so as to enable effective blood flow.",
    "comfortTitle": "COMFORT THAT HEALS",
    "comfortBody": "VISTA CARE medical compression stockings are designed with specially developed cotton fabric.",
    "comparisonTitle": "WHY VISTA CARE MEDICAL COMPRESSION STOCKINGS?"
  },
  "products": {
    "heroTitle": "Medical Compression Garments That Fits You, Heals You with Comfort.",
    "chartTitle": "Compression Garment Measurement Chart",
    "faqTitle": "Frequently Asked Questions"
  },
  "contact": {
    "heroTitle": "Contact Us",
    "heroSubtitle": "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    "form": {
      "name": "Name",
      "email": "Email",
      "phone": "Phone",
      "subject": "Subject",
      "message": "Message",
      "submit": "Send Message",
      "successTitle": "Message sent",
      "successBody": "Thanks! We'll be in touch soon."
    },
    "info": {
      "title": "Get in touch",
      "company": "Vistaar International CG Co. Ltd",
      "zalo": "Zalo",
      "whatsapp": "WhatsApp",
      "email": "Email",
      "website": "Website",
      "addresses": "Our Offices"
    }
  },
  "footer": {
    "tagline": "Comfort That Heals",
    "rights": "All rights reserved."
  },
  "language": {
    "label": "Language",
    "en": "English",
    "vi": "Tiếng Việt"
  }
}
```

- [ ] **Step 2: Write `messages/vi.json` (UI labels + headings only; long body retains EN fallback via next-intl)**

```json
{
  "nav": {
    "home": "Trang chủ",
    "about": "Về chúng tôi",
    "whyVistaCare": "Vì sao Vista Care",
    "products": "Sản phẩm",
    "contactUs": "Liên hệ",
    "openMenu": "Mở menu",
    "closeMenu": "Đóng menu"
  },
  "cta": {
    "contactNow": "Liên hệ ngay",
    "knowMore": "Tìm hiểu thêm",
    "knowMoreAboutUs": "Tìm hiểu thêm về chúng tôi",
    "learnMore": "Xem thêm",
    "callNow": "Gọi ngay",
    "emailUs": "Gửi email"
  },
  "home": {
    "heroEyebrow": "Vớ y khoa áp lực",
    "heroTitle": "SỰ THOẢI MÁI CHỮA LÀNH",
    "heroSubtitle": "Thiết kế để tạo áp lực có cấp độ. Hồi phục tốt hơn. Thoải mái mỗi ngày.",
    "heroBody": "Trusted by medical professionals and individuals across India and Vietnam. Vista Care Compression Garments are designed to promote better circulation, reduce swelling, and accelerate healing.",
    "aboutSnippet": "We at Vistaar International CG Co. Ltd are manufactures of Vista Care Brand of Compression Garments. We have more than Two decades of experience in manufacture medical-grade (Class I & II) stockings and sleeves designed to support blood circulation, reduce swelling, and accelerate recovery from a wide range of venous disorders and lymphatic conditions.",
    "whoShouldUseTitle": "Ai nên dùng vớ áp lực?",
    "whyChooseTitle": "Vì sao chọn Vista Care?",
    "whyChooseIntro": "At Vista Care, we go beyond generic solutions. Our compression garments are optimal sized for all age groups to match your specific medical preventive needs.",
    "productRangeIntro": "Chúng tôi sản xuất vớ áp lực Class I và Class II với nhiều dòng sản phẩm:",
    "videoTitle": "Trải nghiệm sức mạnh của liệu pháp áp lực y khoa"
  },
  "about": {
    "heroTitle": "Hơn hai thập kỷ kinh nghiệm chữa lành bằng vớ áp lực",
    "heroBody": "At Vista Care, we don't just manufacture compression garments — we deliver therapeutic solutions backed by two decades of clinical insight and compassionate care, to enhance recovery, prevent complications, and improve quality of life through precise, medical-grade compression garments designed for real comfort and quick healing.",
    "whatWeDoTitle": "Những gì chúng tôi làm",
    "whatWeDoIntro": "Chúng tôi thiết kế và sản xuất:",
    "whatWeDoOutro": "Each garment is developed using specially engineered cotton-rich, breathable, and skin-safe fabric optimized to match individual medical needs with comfort, mobility, and climate in mind.",
    "approachTitle": "Cách tiếp cận",
    "approachSubtitle": "Quy trình của chúng tôi dựa trên sự chính xác y khoa và chăm sóc cá nhân hóa",
    "promiseTitle": "Cam kết của chúng tôi",
    "promiseIntro": "Dù là quản lý bệnh mạn tính hay hỗ trợ hồi phục sau phẫu thuật, chúng tôi cam kết:",
    "presenceTitle": "Sự hiện diện",
    "presenceBody": "Headquartered in Mumbai, with operations in New Delhi and now in Ho Chi Minh City, Vietnam, Vista Care is evolving into a global compression care provider, serving patients, medical professionals, and wellness centers."
  },
  "why": {
    "heroTitle": "ĐẶC ĐIỂM CỦA VỚ VISTA CARE",
    "heroBody": "VISTA CARE medical compression stockings are engineered to provide graduated compression to the affected limb so as to enable effective blood flow.",
    "comfortTitle": "SỰ THOẢI MÁI CHỮA LÀNH",
    "comfortBody": "VISTA CARE medical compression stockings are designed with specially developed cotton fabric.",
    "comparisonTitle": "VÌ SAO CHỌN VỚ Y KHOA VISTA CARE?"
  },
  "products": {
    "heroTitle": "Vớ áp lực y khoa — Vừa vặn, chữa lành, thoải mái.",
    "chartTitle": "Bảng đo kích thước vớ áp lực",
    "faqTitle": "Câu hỏi thường gặp"
  },
  "contact": {
    "heroTitle": "Liên hệ",
    "heroSubtitle": "Chúng tôi rất mong nhận được tin của bạn. Gửi tin nhắn và chúng tôi sẽ phản hồi sớm nhất.",
    "form": {
      "name": "Họ tên",
      "email": "Email",
      "phone": "Số điện thoại",
      "subject": "Tiêu đề",
      "message": "Nội dung",
      "submit": "Gửi tin nhắn",
      "successTitle": "Đã gửi",
      "successBody": "Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất."
    },
    "info": {
      "title": "Liên hệ với chúng tôi",
      "company": "Vistaar International CG Co. Ltd",
      "zalo": "Zalo",
      "whatsapp": "WhatsApp",
      "email": "Email",
      "website": "Website",
      "addresses": "Văn phòng"
    }
  },
  "footer": {
    "tagline": "Sự thoải mái chữa lành",
    "rights": "Đã đăng ký bản quyền."
  },
  "language": {
    "label": "Ngôn ngữ",
    "en": "English",
    "vi": "Tiếng Việt"
  }
}
```

- [ ] **Step 3: Verify build & commit**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npm run build
```
Expected: build succeeds (no pages yet using messages, but config compiles).

```bash
git add messages && git commit -m "feat(i18n): add EN and VI message catalogs

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Phase 3 — Shared UI & layout

### Task 8: Brand metadata + Logo

**Files:**
- Create: `lib/site.ts`, `components/logo/VistaCareLogo.tsx`

- [ ] **Step 1: Write `lib/site.ts`**

```ts
export const site = {
  name: "Vista Care",
  tagline: "Comfort That Heals",
  company: "Vistaar International CG Co. Ltd",
  email: "support@vistacareindia.com",
  website: "www.vistacareindia.com",
  websiteUrl: "https://www.vistacareindia.com",
  phones: {
    zalo: "+919702604473",
    whatsapp: "+919702274689",
  },
  offices: [
    { city: "Mumbai", country: "India" },
    { city: "New Delhi", country: "India" },
    { city: "Ho Chi Minh City", country: "Vietnam" },
  ],
  socials: {
    facebook: "#",
    instagram: "#",
    x: "#",
  },
} as const;

export const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "whyVistaCare", href: "/why-vista-care" },
  { key: "products", href: "/products" },
] as const;
```

- [ ] **Step 2: Write `components/logo/VistaCareLogo.tsx`**

```tsx
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  showWordmark?: boolean;
};

export function VistaCareLogo({ className, showWordmark = true }: Props) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M24 6C14 10 9 18 9 26c0 7 4 13 10 15 0-8 2-15 6-21 3 7 5 14 5 22 6-2 10-8 10-16 0-9-6-17-16-20Z"
          fill="#2e7d32"
        />
        <circle cx="33" cy="15" r="5" fill="#f57c00" />
      </svg>
      {showWordmark && (
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-lg tracking-tight">Vista Care</span>
          <span className="text-[10px] text-neutral-500 uppercase tracking-wide">
            Comfort That Heals
          </span>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && git add lib/site.ts components/logo && git commit -m "feat: add site metadata and brand logo component

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 9: Shared section primitives

**Files:**
- Create: `components/sections/SectionHeading.tsx`, `components/sections/InfoCard.tsx`, `components/sections/ContactCTABlock.tsx`, `components/sections/PresenceSection.tsx`

- [ ] **Step 1: Write `components/sections/SectionHeading.tsx`**

```tsx
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-sm font-medium uppercase tracking-wider text-brand-leaf mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-black">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-neutral-600">{subtitle}</p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Write `components/sections/InfoCard.tsx`**

```tsx
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type Common = {
  title: string;
  body: string;
  href?: string;
  ctaLabel?: string;
  className?: string;
};

type NumberProps = Common & { variant: "number"; number: string };
type IconProps = Common & { variant: "icon"; icon: LucideIcon };
type ImageProps = Common & { variant: "image"; image?: string; imageAlt?: string };

type Props = NumberProps | IconProps | ImageProps;

export function InfoCard(props: Props) {
  const { title, body, href, ctaLabel, className } = props;

  return (
    <Card
      className={cn(
        "h-full border-neutral-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <CardContent className="flex h-full flex-col gap-4 p-6">
        {props.variant === "image" && (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-brand-mint">
            <Image
              src={props.image ?? "/placeholder.svg"}
              alt={props.imageAlt ?? title}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover"
            />
          </div>
        )}
        {props.variant === "number" && (
          <span className="text-5xl font-bold text-brand-mint-deep/70">
            {props.number}
          </span>
        )}
        {props.variant === "icon" && (
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-mint text-brand-leaf">
            <props.icon className="h-6 w-6" aria-hidden="true" />
          </span>
        )}
        <h3 className="text-xl font-semibold text-brand-black">{title}</h3>
        <p className="text-sm text-neutral-600 leading-relaxed flex-1">{body}</p>
        {href && (
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-black hover:text-brand-leaf"
          >
            {ctaLabel ?? "Learn More"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 3: Write `components/sections/ContactCTABlock.tsx`**

```tsx
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Phone, Mail } from "lucide-react";
import { site } from "@/lib/site";

export function ContactCTABlock() {
  const t = useTranslations("cta");
  return (
    <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <Button asChild size="lg">
        <Link href="/contact">{t("contactNow")}</Link>
      </Button>
      <Button asChild size="lg" variant="outline">
        <a href={`tel:${site.phones.zalo}`}>
          <Phone className="h-4 w-4" aria-hidden="true" />
          {t("callNow")}
        </a>
      </Button>
      <Button asChild size="lg" variant="outline">
        <a href={`mailto:${site.email}`}>
          <Mail className="h-4 w-4" aria-hidden="true" />
          {t("emailUs")}
        </a>
      </Button>
    </div>
  );
}
```

- [ ] **Step 4: Write `components/sections/PresenceSection.tsx`**

```tsx
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
```

- [ ] **Step 5: Verify type-check + commit**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npx tsc --noEmit
```
Expected: no errors (note: type-check only — these components aren't rendered yet).

```bash
git add components/sections && git commit -m "feat: add shared section primitives (SectionHeading, InfoCard, ContactCTABlock, PresenceSection)

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 10: Language switcher

**Files:**
- Create: `components/layout/LanguageSwitcher.tsx`

- [ ] **Step 1: Write `components/layout/LanguageSwitcher.tsx`**

```tsx
"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe, Check } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("language");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const switchTo = (next: (typeof routing.locales)[number]) => {
    router.replace(
      // next-intl typed router preserves params automatically
      { pathname, params: params as Record<string, string> },
      { locale: next },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" aria-label={t("label")}>
          <Globe className="h-4 w-4" aria-hidden="true" />
          <span className="uppercase text-xs font-medium">{locale}</span>
        </Button>
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
```

- [ ] **Step 2: Commit**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npx tsc --noEmit && git add components/layout/LanguageSwitcher.tsx && git commit -m "feat(i18n): add language switcher

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 11: Navbar

**Files:**
- Create: `components/layout/Navbar.tsx`

- [ ] **Step 1: Write `components/layout/Navbar.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VistaCareLogo } from "@/components/logo/VistaCareLogo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const tCta = useTranslations("cta");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/" aria-label={t("home")}>
          <VistaCareLogo />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-brand-mint hover:text-brand-black transition",
                isActive(item.href) && "text-brand-black bg-brand-mint",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/contact">{t("contactUs")}</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label={t("openMenu")}
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <VistaCareLogo />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1 px-4">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-3 text-base font-medium text-neutral-800 hover:bg-brand-mint transition",
                      isActive(item.href) && "bg-brand-mint text-brand-black",
                    )}
                  >
                    {t(item.key)}
                  </Link>
                ))}
                <Button
                  asChild
                  className="mt-4"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/contact">{tCta("contactNow")}</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npx tsc --noEmit && git add components/layout/Navbar.tsx && git commit -m "feat: add Navbar with mobile sheet

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 12: Footer

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Write `components/layout/Footer.tsx`**

```tsx
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
          © {year} {site.company}. {tFoot("rights")}
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npx tsc --noEmit && git add components/layout/Footer.tsx && git commit -m "feat: add Footer

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 13: Root + locale layouts

**Files:**
- Modify: `app/layout.tsx`
- Delete: `app/page.tsx` (was default scaffolded page; we'll use `[locale]/page.tsx`)
- Create: `app/[locale]/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vista Care — Comfort That Heals",
  description:
    "Medical-grade compression garments (Class I & II) engineered for graduated compression, enhanced recovery, and everyday comfort.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Delete the default scaffold page**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && rm app/page.tsx
```

- [ ] **Step 3: Create `app/[locale]/layout.tsx`**

```tsx
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </NextIntlClientProvider>
  );
}
```

- [ ] **Step 4: Build check + commit**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npm run build
```
Expected: warning about empty `[locale]` page segment is OK at this stage; no type errors. If build fails only due to missing pages, proceed (next task creates Home).

```bash
git add app && git commit -m "feat: set up root + [locale] layouts with Navbar/Footer

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Phase 4 — Pages

### Task 14: Homepage

**Files:**
- Create: `app/[locale]/page.tsx`

- [ ] **Step 1: Write `app/[locale]/page.tsx`**

```tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { InfoCard } from "@/components/sections/InfoCard";
import { ContactCTABlock } from "@/components/sections/ContactCTABlock";
import {
  Users,
  Baby,
  Briefcase,
  Plane,
  Activity,
  Shield,
  Ruler,
  Stethoscope,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
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
      icon: Users,
      title: "Elderly Individuals",
      body: "Prevent venous disorders, manage pain & swelling.",
    },
    {
      icon: Baby,
      title: "Pregnant Women",
      body: "Relieve leg fatigue, swelling, and varicose veins.",
    },
    {
      icon: Briefcase,
      title: "Working Professionals",
      body: "Long sitting hours. Prevent DVT, soreness of muscles.",
    },
    {
      icon: Plane,
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
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-black">
              {t("heroTitle")}
            </h1>
            <p className="mt-4 text-lg md:text-xl font-medium text-neutral-800">
              {t("heroSubtitle")}
            </p>
            <p className="mt-6 text-base text-neutral-600 leading-relaxed max-w-xl">
              {t("heroBody")}
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">
                  {tCta("contactNow")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
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
              <Button asChild size="lg">
                <Link href="/products">
                  {tCta("knowMore")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
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
```

- [ ] **Step 2: Build + commit**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npm run build
```
Expected: build succeeds; `/en` and `/vi` generated.

```bash
git add app/\[locale\]/page.tsx && git commit -m "feat: add Homepage with hero, about snippet, who-should-use, why-choose, product range, video

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 15: About page

**Files:**
- Create: `app/[locale]/about/page.tsx`

- [ ] **Step 1: Write `app/[locale]/about/page.tsx`**

```tsx
import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { InfoCard } from "@/components/sections/InfoCard";
import { PresenceSection } from "@/components/sections/PresenceSection";
import { site } from "@/lib/site";
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
              <Button asChild size="lg">
                <Link href="/contact">{tCta("contactNow")}</Link>
              </Button>
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
```

- [ ] **Step 2: Build + commit**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npm run build && git add app/\[locale\]/about && git commit -m "feat(about): add About Us page

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 16: Why Vista Care page

**Files:**
- Create: `app/[locale]/why-vista-care/page.tsx`

- [ ] **Step 1: Write `app/[locale]/why-vista-care/page.tsx`**

```tsx
import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { PresenceSection } from "@/components/sections/PresenceSection";
import { VistaCareLogo } from "@/components/logo/VistaCareLogo";
import { Shield, Activity, HeartPulse } from "lucide-react";

export default async function WhyVistaCarePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WhyVistaCareContent />;
}

function WhyVistaCareContent() {
  const t = useTranslations("why");
  const tCta = useTranslations("cta");

  const badges = [
    { icon: Shield, label: "Anti-Embolism Therapy" },
    { icon: Activity, label: "Circulation Support" },
    { icon: HeartPulse, label: "Post-Surgical Healing" },
  ];

  const rows: Array<{ feature: string; medical: string; otc: string }> = [
    {
      feature: "Pressure Accuracy",
      medical: "±5% tolerance per RAL-GZ 387",
      otc: "No standard testing",
    },
    {
      feature: "Pressure Profile",
      medical: "Graduated compression (precise mmHg values)",
      otc: "Variable, inconsistent",
    },
    {
      feature: "Clinical Testing",
      medical: "Tested with pressure sensors (HOSYcan)",
      otc: "No formal testing",
    },
    {
      feature: "Standards Compliance",
      medical: "EN 13770, DIN 58133, RAL-GZ 387",
      otc: "None",
    },
    {
      feature: "Clinical Efficacy",
      medical: "Proven in clinical trials",
      otc: "Not validated",
    },
    {
      feature: "Durability",
      medical: "6+ months of therapeutic use",
      otc: "3-4 months typical",
    },
    {
      feature: "Customisation",
      medical: "Individual fit and pressure profiles",
      otc: "Limited options",
    },
    {
      feature: "Medical Device Status",
      medical: "Regulated medical device",
      otc: "Consumer textile",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-white via-brand-mint/40 to-brand-mint">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div className="flex items-center justify-center md:justify-start">
            <VistaCareLogo className="scale-[2.2] origin-left md:origin-center" showWordmark />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-black">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 text-base md:text-lg text-neutral-700 leading-relaxed">
              {t("heroBody")}
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">{tCta("contactNow")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comfort section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title={t("comfortTitle")} subtitle={t("comfortBody")} />
          <div className="mt-12 grid gap-8 md:grid-cols-5 md:items-center">
            <div className="relative md:col-span-2 aspect-[4/5] overflow-hidden rounded-2xl bg-brand-mint">
              <Image
                src="/placeholder.svg"
                alt="Patient wearing Vista Care compression stocking"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="md:col-span-3 grid gap-4 sm:grid-cols-3">
              {badges.map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-brand-mint-dark bg-brand-mint/40 p-6 text-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-leaf">
                    <b.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title={t("comparisonTitle")} />
          <div className="mt-12 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-brand-mint">
                  <TableHead className="text-brand-black">Feature</TableHead>
                  <TableHead className="text-brand-black">Medical-Grade</TableHead>
                  <TableHead className="text-brand-black">OTC Products</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.feature}>
                    <TableCell className="font-medium">{r.feature}</TableCell>
                    <TableCell>{r.medical}</TableCell>
                    <TableCell className="text-neutral-500">{r.otc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <PresenceSection />
    </>
  );
}
```

- [ ] **Step 2: Build + commit**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npm run build && git add "app/[locale]/why-vista-care" && git commit -m "feat(why): add Why Vista Care page with comparison table

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 17: Products page

**Files:**
- Create: `app/[locale]/products/page.tsx`

- [ ] **Step 1: Write `app/[locale]/products/page.tsx`**

```tsx
import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/sections/SectionHeading";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProductsContent />;
}

function ProductsContent() {
  const t = useTranslations("products");
  const tCta = useTranslations("cta");

  const sizes: Array<{ size: string; ankle: string; calf: string; thigh: string }> = [
    { size: "S", ankle: "18-21 cm", calf: "28-33 cm", thigh: "45-53 cm" },
    { size: "M", ankle: "21-24 cm", calf: "33-38 cm", thigh: "53-61 cm" },
    { size: "L", ankle: "24-27 cm", calf: "38-43 cm", thigh: "61-69 cm" },
    { size: "XL", ankle: "27-30 cm", calf: "43-48 cm", thigh: "69-77 cm" },
    { size: "XXL", ankle: "30-33 cm", calf: "48-53 cm", thigh: "77-85 cm" },
  ];

  const faqs = [
    {
      q: "What are compression garments?",
      a: "Compression garments are medically engineered stockings, sleeves, or body garments that apply graduated pressure to the limbs. They improve venous return, reduce swelling, and support healing in a range of circulatory conditions.",
    },
    {
      q: "Who should wear compression garments?",
      a: "People managing varicose veins, lymphoedema, post-surgical recovery, DVT risk, pregnancy-related swelling, or prolonged sitting/standing (professionals, travelers). Athletes also use them for recovery.",
    },
    {
      q: "Can I wear compression stockings every day?",
      a: "Yes. Most medical-grade garments are designed for daily wear. Put them on in the morning and remove them before bed, unless a doctor has prescribed overnight use.",
    },
    {
      q: "How long should I wear them to help?",
      a: "Typical therapeutic wear is 8–12 hours per day. Your physician will adjust based on your condition and recovery stage.",
    },
    {
      q: "What is the right size of Vista Care products?",
      a: "Use our measurement chart (see above) and compare ankle, calf, and thigh circumferences to find the best fit. For custom-fit garments, contact our team for guided measurement.",
    },
    {
      q: "How do I choose the right product?",
      a: "Class I (15–20 mmHg) suits mild symptoms, travel, and prevention. Class II (20–30 mmHg) is prescribed for more advanced venous conditions. When in doubt, consult a clinician.",
    },
    {
      q: "Can I wash and reuse compression garments?",
      a: "Yes. Hand-wash in cool water with mild detergent and air-dry. Avoid bleach, tumble drying, or ironing, which degrade the elastic fibers.",
    },
    {
      q: "Is it safe to use during pregnancy?",
      a: "Generally yes — compression stockings help prevent pregnancy-related swelling and varicose veins. Always confirm the appropriate class with your obstetrician.",
    },
    {
      q: "How Post-Surgical Knees benefit from garments?",
      a: "After knee surgery, graduated compression reduces post-operative swelling, lowers DVT risk, and supports the soft tissue during mobilization and rehabilitation.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-white via-brand-mint/40 to-brand-mint">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-black">
              {t("heroTitle")}
            </h1>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">{tCta("contactNow")}</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-mint-dark">
            <Image
              src="/placeholder.svg"
              alt="Medical professional fitting a patient"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Measurement chart */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading title={t("chartTitle")} />
          <div className="mt-12 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-brand-mint">
                  <TableHead className="text-brand-black">Size</TableHead>
                  <TableHead className="text-brand-black">Ankle (cB)</TableHead>
                  <TableHead className="text-brand-black">Calf (cC)</TableHead>
                  <TableHead className="text-brand-black">Thigh (cG)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sizes.map((s) => (
                  <TableRow key={s.size}>
                    <TableCell className="font-semibold">{s.size}</TableCell>
                    <TableCell>{s.ankle}</TableCell>
                    <TableCell>{s.calf}</TableCell>
                    <TableCell>{s.thigh}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-4 text-sm text-neutral-500 text-center">
            Chart is indicative. For custom-fit garments please contact our team.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading title={t("faqTitle")} />
          <Accordion type="single" collapsible className="mt-12">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-700">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Build + commit**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npm run build && git add "app/[locale]/products" && git commit -m "feat(products): add Products page with measurement chart and FAQ

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 18: Contact page

**Files:**
- Create: `app/[locale]/contact/page.tsx`, `components/contact/ContactForm.tsx`

- [ ] **Step 1: Write `components/contact/ContactForm.tsx`**

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(1, "Required").max(80),
  email: z.string().email("Invalid email"),
  phone: z.string().min(6, "Required").max(20),
  subject: z.string().min(1, "Required").max(120),
  message: z.string().min(10, "Please write at least 10 characters").max(2000),
});

type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const t = useTranslations("contact.form");

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactValues) => {
    // Placeholder — no backend configured per spec.
    console.log("contact submission", values);
    toast.success(t("successTitle"), {
      description: t("successBody"),
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("name")}</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input {...field} type="email" autoComplete="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("phone")}</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" autoComplete="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("subject")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("message")}</FormLabel>
              <FormControl>
                <Textarea {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
}
```

- [ ] **Step 2: Write `app/[locale]/contact/page.tsx`**

```tsx
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
```

- [ ] **Step 3: Build + commit**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npm run build && git add "app/[locale]/contact" components/contact && git commit -m "feat(contact): add Contact page with validated form and info block

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Phase 5 — Verification

### Task 19: Full verification

**Files:** no changes — only verification steps.

- [ ] **Step 1: Full type-check**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 2: Lint**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npm run lint
```
Expected: no errors. Fix any flagged issues before proceeding.

- [ ] **Step 3: Full production build**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && npm run build
```
Expected: Build succeeds, both `/en` and `/vi` prerender for all pages: `/`, `/about`, `/why-vista-care`, `/products`, `/contact`.

- [ ] **Step 4: Start dev server and manually verify pages**

Run (background):
```bash
cd "c:/Users/Peter/Desktop/vista" && npm run dev
```

Manually check in browser:
- http://localhost:3000 → redirects to `/en`
- `/en` → Home renders with all 6 sections (hero, about snippet, who-should-use, why-choose, product range, video placeholder)
- `/en/about`, `/en/why-vista-care`, `/en/products`, `/en/contact` all render with Navbar + Footer
- Language switcher: `/en/about` → click EN → choose Tiếng Việt → URL becomes `/vi/about`, nav labels change to Vietnamese, body EN text remains (expected)
- Mobile (DevTools narrow viewport): hamburger opens Sheet drawer, nav links work
- Contact form: submit invalid → inline errors; submit valid → toast appears, form resets
- FAQ accordion opens/closes single item at a time
- Comparison + measurement tables render with mint header row

Stop dev server when done (Ctrl+C the background process).

- [ ] **Step 5: Final commit if any fixes made, otherwise confirm clean tree**

Run:
```bash
cd "c:/Users/Peter/Desktop/vista" && git status
```
Expected: clean working tree. If anything uncommitted: add + commit with an appropriate message.

---

## Success criteria

- [ ] All 5 pages (`/`, `/about`, `/why-vista-care`, `/products`, `/contact`) render in both `/en` and `/vi`.
- [ ] Navbar sticky with logo, 4 nav links, Language dropdown (EN/VI), Contact Us button; mobile Sheet drawer works.
- [ ] Footer shows logo, 3 links, 3 social icons, copyright.
- [ ] Homepage has 6 distinct sections matching spec.
- [ ] About has hero, 3 info cards, What We Do, Our Approach, Our Promise, Presence, contact detail block.
- [ ] Why Vista Care has hero, Comfort section (3 badges), comparison table (8 rows), Presence section.
- [ ] Products has hero, measurement chart (5 sizes), FAQ accordion (9 items).
- [ ] Contact has form (5 fields, zod validation, toast on submit) + info sidebar.
- [ ] `npm run build` succeeds with no errors.
- [ ] `npx tsc --noEmit` passes.
