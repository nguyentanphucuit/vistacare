"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Package,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/contacts", label: "Contacts", icon: Mail },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Login page renders without the shell.
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-neutral-50">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-4 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Vista Care" width={32} height={32} className="h-8 w-auto" />
          <span className="text-sm font-semibold text-brand-navy">Admin</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl">
            <Sidebar onNavigate={() => setOpen(false)} pathname={pathname} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-3 rounded-md p-2 text-neutral-500 hover:bg-neutral-100"
            >
              <X className="h-5 w-5" />
            </button>
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-neutral-200 bg-white lg:block">
        <Sidebar pathname={pathname} />
      </aside>

      {/* Main content */}
      <main className="flex-1 pt-14 lg:pt-0">{children}</main>
    </div>
  );
}

function Sidebar({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  const logout = async () => {
    setBusy(true);
    await fetch("/api/admin/logout", { method: "POST" });
    onNavigate?.();
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-neutral-200 px-5 py-4">
        <Image
          src="/logo.png"
          alt="Vista Care"
          width={40}
          height={40}
          className="h-9 w-auto"
        />
        <div>
          <p className="text-sm font-semibold text-brand-navy">Vista Care</p>
          <p className="text-xs text-neutral-500">Admin</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {NAV.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-brand-orange-light text-brand-orange"
                  : "text-neutral-700 hover:bg-brand-navy-light hover:text-brand-navy",
              )}
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-neutral-200 p-3">
        <button
          type="button"
          onClick={logout}
          disabled={busy}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-red-50 hover:text-red-700 disabled:opacity-60"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          {busy ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </div>
  );
}
