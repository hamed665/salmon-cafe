import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const baseInputClass = "w-full rounded-2xl border border-coffee-100/10 bg-coffee-900/55 px-4 py-3 text-sm text-coffee-50 outline-none transition placeholder:text-coffee-100/35 focus:border-gold-400/45 focus:ring-4 focus:ring-gold-400/10";

type FieldShellProps = {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
};

function FieldShell({ label, hint, required, children, className }: FieldShellProps) {
  return (
    <label className={cn("block space-y-2", className)}>
      <span className="flex items-center gap-2 text-sm font-bold text-coffee-100/72">
        {label}
        {required ? <span className="text-gold-400">*</span> : null}
      </span>
      {children}
      {hint ? <span className="block text-xs leading-5 text-coffee-100/45">{hint}</span> : null}
    </label>
  );
}

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  wrapperClassName?: string;
};

export function InputField({ label, hint, required, wrapperClassName, className, ...props }: InputFieldProps) {
  return (
    <FieldShell label={label} hint={hint} required={required} className={wrapperClassName}>
      <input required={required} className={cn(baseInputClass, props.dir === "ltr" ? "text-left" : "", className)} {...props} />
    </FieldShell>
  );
}

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
  wrapperClassName?: string;
};

export function TextareaField({ label, hint, required, wrapperClassName, className, ...props }: TextareaFieldProps) {
  return (
    <FieldShell label={label} hint={hint} required={required} className={wrapperClassName}>
      <textarea required={required} className={cn(baseInputClass, "min-h-[112px] resize-y leading-7", className)} {...props} />
    </FieldShell>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  hint?: string;
  wrapperClassName?: string;
};

export function SelectField({ label, hint, required, wrapperClassName, className, children, ...props }: SelectFieldProps) {
  return (
    <FieldShell label={label} hint={hint} required={required} className={wrapperClassName}>
      <select required={required} className={cn(baseInputClass, className)} {...props}>{children}</select>
    </FieldShell>
  );
}
