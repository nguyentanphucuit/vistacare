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
