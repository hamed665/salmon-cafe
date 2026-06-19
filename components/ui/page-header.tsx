import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  meta?: ReactNode;
  className?: string;
};

export function PageHeader({ eyebrow, title, description, actions, meta, className }: PageHeaderProps) {
  return (
    <header className={cn("relative overflow-hidden rounded-[2rem] border border-coffee-100/10 bg-coffee-800/55 p-5 shadow-soft md:p-6", className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(216,166,87,0.20),transparent_28rem)]" />
      <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? <p className="text-sm font-bold text-gold-400">{eyebrow}</p> : null}
          <h1 className="mt-2 text-3xl font-black leading-tight text-coffee-50 md:text-4xl">{title}</h1>
          {description ? <p className="mt-3 text-sm leading-7 text-coffee-100/68 md:text-base md:leading-8">{description}</p> : null}
          {meta ? <div className="mt-4 flex flex-wrap gap-2">{meta}</div> : null}
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
      </div>
    </header>
  );
}
