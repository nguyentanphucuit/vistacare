import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans-family",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-serif-family",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  display: "swap",
});

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
      <body
        className={`${jakarta.variable} ${fraunces.variable} ${mono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
