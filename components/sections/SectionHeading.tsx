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
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-brand-navy leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg md:text-xl text-neutral-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
