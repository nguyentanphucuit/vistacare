import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  showWordmark?: boolean;
};

export function VistaCareLogo({ className, showWordmark = true }: Props) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M24 6C14 10 9 18 9 26c0 7 4 13 10 15 0-8 2-15 6-21 3 7 5 14 5 22 6-2 10-8 10-16 0-9-6-17-16-20Z"
          fill="#2e7d32"
        />
        <circle cx="33" cy="15" r="5" fill="#f57c00" />
      </svg>
      {showWordmark && (
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-lg tracking-tight">Vista Care</span>
          <span className="text-[10px] text-neutral-500 uppercase tracking-wide">
            Comfort That Heals
          </span>
        </div>
      )}
    </div>
  );
}
