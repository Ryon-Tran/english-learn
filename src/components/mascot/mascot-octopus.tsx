import { cn } from "@/lib/utils";
import { mascot } from "@/lib/mascot";

type Props = {
  className?: string;
  /** Cạnh hộp (tỉ lệ 1:1) */
  size?: number;
  variant?: "decorative" | "standalone";
};

/**
 * Mark bạch tuộc tối giản — màu theo `text-*` / `currentColor` của phần tử cha.
 */
export function MascotOctopusMark({ className, size = 24, variant = "decorative" }: Props) {
  const label = `Linh vật ${mascot.name}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={cn("shrink-0 text-current", className)}
      role={variant === "standalone" ? "img" : undefined}
      aria-label={variant === "standalone" ? label : undefined}
      aria-hidden={variant === "decorative" ? true : undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === "standalone" ? <title>{label}</title> : null}
      <ellipse cx="20" cy="14" rx="11" ry="9.5" fill="currentColor" />
      <circle cx="15" cy="13" r="2.2" className="fill-background" />
      <circle cx="25" cy="13" r="2.2" className="fill-background" />
      <circle cx="15" cy="13" r="1" fill="currentColor" opacity={0.85} />
      <circle cx="25" cy="13" r="1" fill="currentColor" opacity={0.85} />
      <g fill="currentColor">
        <ellipse cx="7" cy="28" rx="2.2" ry="7" transform="rotate(-28 7 28)" />
        <ellipse cx="12" cy="30" rx="2.2" ry="6.5" transform="rotate(-12 12 30)" />
        <ellipse cx="17" cy="31" rx="2.2" ry="6" />
        <ellipse cx="23" cy="31" rx="2.2" ry="6" />
        <ellipse cx="28" cy="30" rx="2.2" ry="6.5" transform="rotate(12 28 30)" />
        <ellipse cx="33" cy="28" rx="2.2" ry="7" transform="rotate(28 33 28)" />
      </g>
    </svg>
  );
}
