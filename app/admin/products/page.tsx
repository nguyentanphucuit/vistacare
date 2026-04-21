import { ProductsAdmin } from "./products-admin";

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  return (
    <div className="mx-auto max-w-7xl p-6 md:p-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-brand-navy">Products</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Manage the public catalog. Changes appear immediately on the site.
        </p>
      </header>
      <ProductsAdmin />
    </div>
  );
}
