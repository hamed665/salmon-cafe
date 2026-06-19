import { cn } from "@/lib/utils";

type StatusTone = "success" | "warning" | "danger" | "gold" | "neutral";

type StatusBadgeProps = {
  children: React.ReactNode;
  tone?: StatusTone;
  className?: string;
};

const toneClasses: Record<StatusTone, string> = {
  success: "border-emerald-300/20 bg-emerald-400/10 text-emerald-100",
  warning: "border-amber-300/20 bg-amber-400/10 text-amber-100",
  danger: "border-red-400/20 bg-red-500/10 text-red-100",
  gold: "border-gold-400/20 bg-gold-400/12 text-gold-400",
  neutral: "border-coffee-100/10 bg-coffee-900/55 text-coffee-100/70"
};

export function StatusBadge({ children, tone = "neutral", className }: StatusBadgeProps) {
  return <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold", toneClasses[tone], className)}>{children}</span>;
}
