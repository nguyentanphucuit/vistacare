"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { categories, products } from "@/lib/products";
import { cn } from "@/lib/utils";

const ALL = "all";
const PAGE_SIZE = 6;

export function ProductsCatalog() {
  const t = useTranslations("products.catalog");
  const [selected, setSelected] = useState<string>(ALL);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (selected !== ALL && p.category !== selected) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });
  }, [selected, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [selected, query]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const countsByCategory = useMemo(() => {
    const map: Record<string, number> = { [ALL]: products.length };
    for (const p of products) {
      map[p.category] = (map[p.category] ?? 0) + 1;
    }
    return map;
  }, []);

  const sidebar = (
    <nav aria-label={t("filterByCategory")} className="flex flex-col gap-1">
      <CategoryButton
        active={selected === ALL}
        onClick={() => setSelected(ALL)}
        label={t("allProducts")}
        count={countsByCategory[ALL] ?? 0}
      />
      {categories.map((c) => (
        <CategoryButton
          key={c.id}
          active={selected === c.id}
          onClick={() => setSelected(c.id)}
          label={c.label}
          count={countsByCategory[c.id] ?? 0}
        />
      ))}
    </nav>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          {t("filterByCategory")}
        </p>
        {sidebar}
      </aside>

      <div className="flex flex-col gap-6">
        {/* Search + mobile filter */}
        <div className="flex items-center gap-3">
          <label className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
              className="h-11 pl-10"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </label>
          <Sheet>
            <SheetTrigger
              aria-label={t("filterByCategory")}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-11 lg:hidden",
              )}
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm">{t("filter")}</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle>{t("filterByCategory")}</SheetTitle>
              </SheetHeader>
              <div className="mt-4 px-4">{sidebar}</div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Result count */}
        <p className="text-sm text-neutral-500">
          {t("showingResults", { count: filtered.length })}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 p-12 text-center text-neutral-500">
            {t("noResults")}
          </div>
        ) : (
          <>
            <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {pageItems.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  const pages = getPageNumbers(page, totalPages);
  return (
    <nav
      aria-label="Pagination"
      className="mt-4 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition hover:border-brand-navy hover:text-brand-navy disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-200 disabled:hover:text-neutral-600",
        )}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="px-2 text-neutral-400">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              "flex h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition",
              p === page
                ? "border-brand-navy bg-brand-navy text-white"
                : "border-neutral-200 text-neutral-700 hover:border-brand-navy hover:text-brand-navy",
            )}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition hover:border-brand-navy hover:text-brand-navy disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-200 disabled:hover:text-neutral-600",
        )}
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}

function getPageNumbers(page: number, total: number): Array<number | "…"> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: Array<number | "…"> = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);
  if (start > 2) pages.push("…");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("…");
  pages.push(total);
  return pages;
}

function CategoryButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition",
        active
          ? "bg-brand-orange-light text-brand-orange"
          : "text-neutral-700 hover:bg-brand-navy-light hover:text-brand-navy",
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "rounded-full px-2 py-0.5 text-xs",
          active
            ? "bg-white/70 text-brand-orange"
            : "bg-neutral-100 text-neutral-500",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function ProductCard({
  product,
}: {
  product: (typeof products)[number];
}) {
  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-neutral-200/70 bg-white transition duration-300 hover:-translate-y-1 hover:border-brand-mint-dark hover:shadow-xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-mint">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-brand-navy px-2.5 py-1 text-xs font-semibold text-white">
          Class {product.compressionClass}
        </span>
      </div>
      <div className="flex h-[calc(100%-theme(spacing.32))] flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-brand-navy leading-snug">
          {product.name}
        </h3>
        <p className="flex-1 text-xl text-neutral-600 leading-relaxed">
          {product.description}
        </p>
      </div>
    </article>
  );
}
