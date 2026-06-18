import Link from "next/link";
import { ArrowLeft, BarChart3, Coffee, QrCode, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "منوی QR پریمیوم",
    description: "صفحه موبایل‌فرست، سریع و مناسب برند کافه، نه یک لیست خشک محصول.",
    icon: QrCode
  },
  {
    title: "تجربه هوشمند مشتری",
    description: "مود، داستان محصول، شاخص طعمی و پیشنهاد مکمل برای فروش بهتر.",
    icon: Sparkles
  },
  {
    title: "تحلیل رفتار مشتری",
    description: "اسکن QR، بازدید منو، محصول پربازدید و مسیرهای تعامل مشتری.",
    icon: BarChart3
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="container-shell flex min-h-screen flex-col justify-center py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-coffee-800/70 px-4 py-2 text-sm text-coffee-100">
              <Coffee className="h-4 w-4 text-gold-400" />
              فقط فارسی، RTL، مناسب بازار ایران
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-black leading-tight text-coffee-50 md:text-6xl">
                Salmon Cafe، منوی هوشمند پریمیوم برای کافه‌ها
              </h1>
              <p className="max-w-2xl text-lg leading-9 text-coffee-100/82">
                یک تجربه QR شیک برای مشتری، یک پنل ساده برای کافه‌دار، و یک دیتابیس اصولی برای رشد آینده. بالاخره یک QR که شبیه رسید دستگاه کارت‌خوان نیست.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/m/cafe-noir">
                  دیدن دموی کافه
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/dashboard">ورود به پنل کافه</Link>
              </Button>
            </div>
          </div>

          <div className="premium-card rounded-3xl p-5">
            <div className="rounded-[1.35rem] border border-coffee-100/10 bg-coffee-900/80 p-4">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-coffee-200">دموی موبایل</p>
                  <h2 className="text-2xl font-black">Cafe Noir</h2>
                </div>
                <div className="rounded-2xl bg-gold-400/15 p-3 text-gold-400">
                  <QrCode className="h-7 w-7" />
                </div>
              </div>
              <div className="space-y-3">
                {features.map((feature) => (
                  <Card key={feature.title} className="border-coffee-100/10 bg-coffee-800/60">
                    <CardContent className="flex gap-4 p-4">
                      <feature.icon className="mt-1 h-6 w-6 shrink-0 text-gold-400" />
                      <div>
                        <h3 className="font-bold text-coffee-50">{feature.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-coffee-100/70">{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
