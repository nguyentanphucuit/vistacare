"use client";

import { useMemo, useState } from "react";
import { Mail } from "lucide-react";
import { Pagination } from "@/components/admin/Pagination";

export type ContactRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
};

const PAGE_SIZE = 10;

export function ContactsList({ contacts }: { contacts: ContactRow[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(contacts.length / PAGE_SIZE));
  const slice = useMemo(
    () => contacts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [contacts, page],
  );

  return (
    <>
      <div className="space-y-4">
        {slice.map((c) => (
          <article
            key={c.id}
            className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-neutral-200 pb-3">
              <div>
                <h3 className="text-lg font-semibold text-brand-navy">
                  {c.name}
                </h3>
                <a
                  href={`mailto:${c.email}`}
                  className="inline-flex items-center gap-1 text-sm text-brand-navy hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  {c.email}
                </a>
                {c.phone && (
                  <span className="ml-3 text-sm text-neutral-600">
                    · {c.phone}
                  </span>
                )}
              </div>
              <span className="text-xs text-neutral-500">
                {new Date(c.created_at).toLocaleString()}
              </span>
            </header>
            {c.subject && (
              <p className="mt-3 text-sm font-semibold text-brand-navy">
                {c.subject}
              </p>
            )}
            <p className="mt-2 whitespace-pre-wrap text-sm text-neutral-700">
              {c.message}
            </p>
          </article>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </>
  );
}
