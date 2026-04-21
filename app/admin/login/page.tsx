import { Suspense } from "react";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-navy-light via-white to-brand-green-light p-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-brand-navy">Admin sign in</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Enter your credentials to access the Vista Care admin.
        </p>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
