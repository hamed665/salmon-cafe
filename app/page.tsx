export default function HomePage() {
  return (
    <main className="min-h-screen bg-coffee-900 px-6 py-16 text-coffee-50">
      <section className="container-shell space-y-8">
        <p className="text-sm text-gold-400">پلتفرم پریمیوم منوی QR برای کافه‌ها</p>
        <h1 className="max-w-3xl text-5xl font-black leading-tight">Salmon Cafe</h1>
        <p className="max-w-2xl text-lg leading-8 text-coffee-100/75">
          تجربه موبایل‌فرست برای منوی هوشمند کافه، داستان محصول، شاخص طعمی، پیشنهاد مکمل و تحلیل رفتار مشتری.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="/m/cafe-noir" className="rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950">دیدن دموی کافه</a>
          <a href="/dashboard" className="rounded-2xl border border-coffee-100/15 bg-coffee-800 px-5 py-3 font-black text-coffee-50">ورود به پنل</a>
        </div>
      </section>
    </main>
  );
}
