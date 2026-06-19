export function CheckboxCard({ name, label, defaultChecked = false, hint }: { name: string; label: string; defaultChecked?: boolean; hint?: string }) {
  return (
    <label className="flex min-h-[54px] items-center justify-between gap-4 rounded-2xl border border-coffee-100/10 bg-coffee-900/35 px-4 py-3 text-sm text-coffee-100/80 transition hover:border-gold-400/22 hover:bg-coffee-900/55">
      <span>
        <span className="block font-bold">{label}</span>
        {hint ? <span className="mt-1 block text-xs text-coffee-100/45">{hint}</span> : null}
      </span>
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="rounded border-coffee-100/20 bg-coffee-900 text-gold-400 focus:ring-gold-400" />
    </label>
  );
}
