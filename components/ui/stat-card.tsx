import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  hint?: string;
  icon?: LucideIcon;
  tone?: "gold" | "green" | "red" | "neutral";
  className?: string;
};

const toneClasses = {
  gold: "text-gold-400 bg-gold-400/12 border-gold-400/18",
  green: "text-emerald-200 bg-emerald-400/10 border-emerald-300/16",
  red: "text-red-100 bg-red-500/10 border-red-400/16",
  neutral: "text-coffee-100 bg-coffee-900/55 border-coffee-100/10"
};

export function StatCard({ title, value, hint, icon: Icon, tone = "gold", className }: StatCardProps) {
  return (
    <div className={cn("rounded-[1.75rem] border border-coffee-100/10 bg-coffee-800/62 p-5 shadow-soft", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-coffee-100/58">{title}</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-coffee-50">{value}</p>
          {hint ? <p className="mt-1 text-xs leading-5 text-coffee-100/45">{hint}</p> : null}
        </div>
        {Icon ? <div className={cn("rounded-2xl border p-3", toneClasses[tone])}><Icon className="h-6 w-6" /></div> : null}
      </div>
    </div>
  );
}
