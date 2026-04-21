import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  height?: number;
  showTagline?: boolean;
};

const ASPECT = 1280 / 600;

export function VistaCareLogo({
  className,
  height = 40,
  showTagline = false,
}: Props) {
  const width = Math.round(height * ASPECT);
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src="/logo.png"
        alt="Vista Care"
        width={width * 2}
        height={height * 2}
        quality={95}
        unoptimized
        priority
        style={{ height, width: "auto" }}
      />
      {showTagline && (
        <span className="hidden text-[10px] text-neutral-500 uppercase tracking-wide sm:inline">
          Comfort That Heals
        </span>
      )}
    </div>
  );
}
