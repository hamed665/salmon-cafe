export default function HomePage() {
  return (
    <main className="min-h-screen bg-coffee-900 px-6 py-16 text-coffee-50">
      <section className="container-shell space-y-8">
        <p className="text-sm text-gold-400">Persian-first premium QR menu platform</p>
        <h1 className="max-w-3xl text-5xl font-black leading-tight">Salmon Cafe</h1>
        <p className="max-w-2xl text-lg leading-8 text-coffee-100/75">
          A mobile-first cafe experience platform for premium smart QR menus, product stories, taste profiles, recommendations, and analytics.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="/m/cafe-noir" className="rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950">View demo cafe</a>
          <a href="/dashboard" className="rounded-2xl border border-coffee-100/15 bg-coffee-800 px-5 py-3 font-black text-coffee-50">Open dashboard</a>
        </div>
      </section>
    </main>
  );
}
