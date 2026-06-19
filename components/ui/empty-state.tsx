import type { LucideIcon } from "lucide-react";
import { Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ title, description, icon: Icon = Coffee, action, className }: EmptyStateProps) {
  return (
    <div className={cn("rounded-[1.75rem] border border-coffee-100/10 bg-coffee-900/35 p-8 text-center", className)}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-400/18 bg-gold-400/10 text-gold-400">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mt-5 text-xl font-black text-coffee-50">{title}</h3>
      {description ? <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-coffee-100/62">{description}</p> : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
