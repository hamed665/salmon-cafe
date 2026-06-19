import { BarChart3, Coffee, QrCode, Sparkles } from "lucide-react";

const features = [
  { title: "منوی QR پریمیوم", description: "صفحه عمومی سریع، موبایل‌فرست و مناسب کافه.", icon: QrCode },
  { title: "منوساز واقعی", description: "دسته‌بندی، محصول، قیمت، داستان و پیشنهاد مکمل.", icon: Coffee },
  { title: "تحلیل رفتار مشتری", description: "بازدید منو، اسکن QR، محصولات پربازدید و eventها.", icon: BarChart3 }
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-coffee-900 px-6 py-10 text-coffee-50">
      <section className="container-shell relative grid min-h-[calc(100vh-5rem)] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(216,166,87,0.20),transparent_28rem)]" />
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-gold-400/10 px-4 py-2 text-sm font-bold text-gold-400">
            <Sparkles className="h-4 w-4" /> پلتفرم پریمیوم منوی QR برای کافه‌ها
          </div>
          <div>
            <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">Salmon Cafe</h1>
            <p className="mt-5 max-w-2xl text-lg leading-9 text-coffee-100/75">
              تجربه موبایل‌فرست برای منوی هوشمند کافه، داستان محصول، شاخص طعمی، پیشنهاد مکمل و تحلیل رفتار مشتری.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/m/cafe-noir" className="rounded-2xl bg-gold-400 px-6 py-4 font-black text-coffee-950 shadow-soft">دیدن دموی کافه</a>
            <a href="/dashboard" className="rounded-2xl border border-coffee-100/15 bg-coffee-800/75 px-6 py-4 font-black text-coffee-50">ورود به پنل</a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-coffee-100/10 bg-coffee-800/55 p-4 shadow-premium backdrop-blur-xl">
          <div className="rounded-[1.5rem] bg-coffee-900/45 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-coffee-100/55">Live demo</p>
                <h2 className="mt-1 text-2xl font-black">کافه نوار</h2>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-100">فعال</span>
            </div>
            <div className="grid gap-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4 rounded-2xl border border-coffee-100/10 bg-coffee-800/55 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-400/10 text-gold-400"><feature.icon className="h-5 w-5" /></div>
                  <div>
                    <h3 className="font-black">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-coffee-100/60">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
