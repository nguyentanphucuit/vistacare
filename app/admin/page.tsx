import Link from "next/link";
import { ClipboardList, Mail, Package } from "lucide-react";

const TILES = [
  {
    href: "/admin/products",
    title: "Products",
    body: "Create, edit, and remove products in the public catalog.",
    icon: Package,
  },
  {
    href: "/admin/orders",
    title: "Measurement orders",
    body: "Submissions from the measurement order forms.",
    icon: ClipboardList,
  },
  {
    href: "/admin/contacts",
    title: "Contact messages",
    body: "Messages submitted via the public Contact form.",
    icon: Mail,
  },
];

export default function AdminIndex() {
  return (
    <div className="mx-auto max-w-5xl p-6 md:p-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-brand-navy">Dashboard</h1>
        <p className="mt-2 text-neutral-600">
          Manage the catalog and review form submissions.
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-3">
        {TILES.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-navy hover:shadow-lg"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy-light text-brand-navy">
              <t.icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="text-lg font-semibold text-brand-navy">{t.title}</h2>
            <p className="text-sm text-neutral-600">{t.body}</p>
            <span className="mt-2 text-sm font-semibold text-brand-orange transition group-hover:translate-x-0.5">
              Open →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
