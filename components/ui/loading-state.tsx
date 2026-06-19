export function LoadingState({ title = "در حال آماده‌سازی", rows = 3 }: { title?: string; rows?: number }) {
  return (
    <div className="space-y-4">
      <div className="rounded-[2rem] border border-coffee-100/10 bg-coffee-800/55 p-6 shadow-soft">
        <div className="h-4 w-32 rounded-full bg-coffee-100/10" />
        <div className="mt-4 h-8 w-64 max-w-full rounded-full bg-coffee-100/12" />
        <p className="mt-4 text-sm text-coffee-100/55">{title}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="h-32 rounded-[1.75rem] border border-coffee-100/10 bg-coffee-800/45" />
        ))}
      </div>
    </div>
  );
}
