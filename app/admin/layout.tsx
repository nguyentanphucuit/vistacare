import type { Metadata } from "next";
import "../globals.css";
import { AdminShell } from "./admin-shell";

export const metadata: Metadata = {
  title: "Vista Care · Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
