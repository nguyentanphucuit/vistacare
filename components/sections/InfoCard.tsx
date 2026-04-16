import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type Common = {
  title: string;
  body: string;
  href?: string;
  ctaLabel?: string;
  className?: string;
};

type NumberProps = Common & { variant: "number"; number: string };
type IconProps = Common & { variant: "icon"; icon: LucideIcon };
type ImageProps = Common & { variant: "image"; image?: string; imageAlt?: string };

type Props = NumberProps | IconProps | ImageProps;

export function InfoCard(props: Props) {
  const { title, body, href, ctaLabel, className } = props;

  return (
    <Card
      className={cn(
        "h-full rounded-2xl border-neutral-200/70 bg-white shadow-none transition duration-300 hover:-translate-y-1 hover:border-brand-mint-dark hover:shadow-xl",
        className,
      )}
    >
      <CardContent className="flex h-full flex-col gap-4 p-7">
        {props.variant === "image" && (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-brand-mint">
            <Image
              src={props.image ?? "/placeholder.svg"}
              alt={props.imageAlt ?? title}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover"
            />
          </div>
        )}
        {props.variant === "number" && (
          <span className="font-serif text-5xl font-medium text-brand-mint-deep/80">
            {props.number}
          </span>
        )}
        {props.variant === "icon" && (
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-mint text-brand-leaf">
            <props.icon className="h-6 w-6" aria-hidden="true" />
          </span>
        )}
        <h3 className="text-xl font-semibold text-brand-black">{title}</h3>
        <p className="text-sm text-neutral-600 leading-relaxed flex-1">{body}</p>
        {href && (
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-black hover:text-brand-leaf"
          >
            {ctaLabel ?? "Learn More"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
