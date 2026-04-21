"use client";

import { useEffect, useMemo, useState } from "react";
import { Pagination } from "@/components/admin/Pagination";
import Image from "next/image";
import { toast } from "sonner";
import { Database, Pencil, Plus, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/products";
import { cn } from "@/lib/utils";

type DBProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  compression_class: "I" | "II" | "I & II";
  description: string | null;
  image: string | null;
  sort_order: number | null;
};

type FormState = {
  slug: string;
  name: string;
  category: string;
  compressionClass: "I" | "II" | "I & II";
  description: string;
  image: string;
  sortOrder: string;
};

const EMPTY: FormState = {
  slug: "",
  name: "",
  category: categories[0]?.id ?? "",
  compressionClass: "I",
  description: "",
  image: "",
  sortOrder: "0",
};

export function ProductsAdmin() {
  const [items, setItems] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<DBProduct | null>(null);
  const [creating, setCreating] = useState(false);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const slice = useMemo(
    () => items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [items, page],
  );
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const j = await res.json();
      setItems(j.items ?? []);
    } catch (err) {
      toast.error("Failed to load products", {
        description: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const seed = async () => {
    if (
      !confirm(
        "Sync the default product list from the codebase to the database? Existing rows with matching slugs will be updated.",
      )
    )
      return;
    const res = await fetch("/api/admin/seed-products", { method: "POST" });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast.error("Seed failed", { description: j.detail ?? j.error });
      return;
    }
    toast.success(`Synced ${j.count} products`);
    void load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      toast.error("Delete failed", { description: j.detail ?? j.error });
      return;
    }
    toast.success("Deleted");
    void load();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-neutral-500">
          {loading ? "Loading…" : `${items.length} products`}
        </p>
        <div className="flex items-center gap-2">
        <Dialog open={creating} onOpenChange={setCreating}>
          <DialogTrigger
            className={cn(buttonVariants({ size: "sm" }))}
            type="button"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            New product
          </DialogTrigger>
          <DialogContent className="max-h-[92vh] w-[95vw] max-w-2xl overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>New product</DialogTitle>
            </DialogHeader>
            <ProductForm
              initial={EMPTY}
              submitLabel="Create"
              onSubmit={async (values) => {
                const res = await fetch("/api/products", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(values),
                });
                if (!res.ok) {
                  const j = await res.json().catch(() => ({}));
                  throw new Error(j.detail ?? j.error ?? "Create failed");
                }
                toast.success("Product created");
                setCreating(false);
                void load();
              }}
            />
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {items.length === 0 && !loading && (
        <p className="rounded-lg border border-dashed border-neutral-300 p-12 text-center text-neutral-500">
          No products yet. Click <strong>Sync defaults</strong> to seed the
          built-in catalog or <strong>New product</strong> to add manually.
        </p>
      )}

      {items.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Slug</th>
                <th className="p-3">Category</th>
                <th className="p-3">Class</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((p) => (
                <tr key={p.id} className="border-t border-neutral-200">
                  <td className="p-3">
                    {p.image ? (
                      <div className="relative h-12 w-12 overflow-hidden rounded bg-brand-mint">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="48px"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <span className="text-neutral-400">—</span>
                    )}
                  </td>
                  <td className="p-3 font-medium text-brand-navy">{p.name}</td>
                  <td className="p-3 font-mono text-xs text-neutral-500">
                    {p.slug}
                  </td>
                  <td className="p-3">
                    {categories.find((c) => c.id === p.category)?.label ??
                      p.category}
                  </td>
                  <td className="p-3">{p.compression_class}</td>
                  <td className="p-3 text-right">
                    <div className="inline-flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setEditing(p)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => remove(p.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {items.length > 0 && (
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      )}

      <Dialog
        open={!!editing}
        onOpenChange={(v) => {
          if (!v) setEditing(null);
        }}
      >
        <DialogContent className="max-h-[92vh] w-[95vw] max-w-2xl overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit product</DialogTitle>
          </DialogHeader>
          {editing && (
            <ProductForm
              initial={{
                slug: editing.slug,
                name: editing.name,
                category: editing.category,
                compressionClass: editing.compression_class,
                description: editing.description ?? "",
                image: editing.image ?? "",
                sortOrder: String(editing.sort_order ?? 0),
              }}
              submitLabel="Save"
              slugLocked
              onSubmit={async (values) => {
                const res = await fetch(`/api/products/${editing.id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(values),
                });
                if (!res.ok) {
                  const j = await res.json().catch(() => ({}));
                  throw new Error(j.detail ?? j.error ?? "Update failed");
                }
                toast.success("Product updated");
                setEditing(null);
                void load();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProductForm({
  initial,
  submitLabel,
  slugLocked = false,
  onSubmit,
}: {
  initial: FormState;
  submitLabel: string;
  slugLocked?: boolean;
  onSubmit: (values: {
    slug: string;
    name: string;
    category: string;
    compressionClass: "I" | "II" | "I & II";
    description: string;
    image: string;
    sortOrder: number;
  }) => Promise<void>;
}) {
  const [v, setV] = useState<FormState>(initial);
  const [busy, setBusy] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!v.slug || !v.name || !v.category) {
          toast.error("Slug, name, category required");
          return;
        }
        setBusy(true);
        try {
          await onSubmit({
            slug: v.slug.trim(),
            name: v.name.trim(),
            category: v.category,
            compressionClass: v.compressionClass,
            description: v.description.trim(),
            image: v.image.trim(),
            sortOrder: parseInt(v.sortOrder || "0", 10),
          });
        } catch (err) {
          toast.error("Failed", {
            description: err instanceof Error ? err.message : String(err),
          });
        } finally {
          setBusy(false);
        }
      }}
      className="space-y-4 pt-2"
    >
      <Field label={slugLocked ? "Slug (read-only)" : "Slug"}>
        <Input
          value={v.slug}
          onChange={(e) => setV({ ...v, slug: e.target.value })}
          placeholder="below-knee"
          readOnly={slugLocked}
          disabled={slugLocked}
          className={slugLocked ? "cursor-not-allowed bg-neutral-50" : ""}
        />
      </Field>
      <Field label="Name">
        <Input
          value={v.name}
          onChange={(e) => setV({ ...v, name: e.target.value })}
          placeholder="Below Knee"
        />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Category">
          <Select
            value={v.category}
            onValueChange={(val) => setV({ ...v, category: val ?? "" })}
          >
            <SelectTrigger className="h-10 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Class">
          <Select
            value={v.compressionClass}
            onValueChange={(val) =>
              setV({
                ...v,
                compressionClass: (val ?? "I") as "I" | "II" | "I & II",
              })
            }
          >
            <SelectTrigger className="h-10 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="I">Class I</SelectItem>
              <SelectItem value="II">Class II</SelectItem>
              <SelectItem value="I & II">Class I & II</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field label="Image path">
        <Input
          value={v.image}
          onChange={(e) => setV({ ...v, image: e.target.value })}
          placeholder="/images/products/below-knee.png"
        />
      </Field>
      <Field label="Description">
        <Textarea
          rows={3}
          value={v.description}
          onChange={(e) => setV({ ...v, description: e.target.value })}
        />
      </Field>
      <div className="flex justify-end gap-3 border-t border-neutral-200 pt-4">
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-neutral-700">{label}</span>
      {children}
    </label>
  );
}
