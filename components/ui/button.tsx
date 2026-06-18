import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  asChild?: boolean;
  children: ReactNode;
};

const variants = {
  primary: "bg-gold-400 text-coffee-950 hover:bg-gold-500",
  secondary: "border border-coffee-100/15 bg-coffee-800/70 text-coffee-50 hover:bg-coffee-700/80",
  ghost: "text-coffee-100 hover:bg-coffee-800/60"
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base"
};

export function Button({ className, variant = "primary", size = "md", href, asChild: _asChild, children, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-2xl font-bold transition focus:outline-none focus:ring-2 focus:ring-gold-400/50 disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
