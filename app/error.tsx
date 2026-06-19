"use client";

import { AlertTriangle } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-coffee-900 px-5 text-coffee-50">
      <section className="w-full max-w-xl rounded-[2rem] border border-red-400/20 bg-red-500/10 p-8 text-center shadow-premium">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 text-red-100">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-2xl font-black">خطا در بارگذاری</h1>
        <p className="mt-2 text-sm leading-7 text-coffee-100/70">لطفاً دوباره تلاش کنید.</p>
        <button onClick={reset} className="mt-6 rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950">تلاش دوباره</button>
      </section>
    </main>
  );
}
