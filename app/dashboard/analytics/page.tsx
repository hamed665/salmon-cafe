import Link from "next/link";
import { BarChart3, Eye, QrCode, Search, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireCafeUser } from "@/lib/auth/guards";
import { getCafeAnalytics } from "@/lib/analytics/dashboard";

function fa(value: number) {
  return value.toLocaleString("fa-IR");
}

function label(type: string) {
  const labels: Record<string, string> = {
    qr_scan: "اسکن QR",
    menu_view: "بازدید منو",
    product_view: "بازدید محصول",
    mood_selected: "انتخاب مود",
    recommendation_click: "کلیک پیشنهاد",
    search: "جستجو"
  };
  return labels[type] || type;
}

export default async function AnalyticsPage({ searchParams }: { searchParams?: Promise<{ cafeId?: string }> }) {
  const user = await requireCafeUser();
  const params = await searchParams;
  const data = await getCafeAnalytics(user, params?.cafeId);
  const { cafes, selectedCafe, totals, topProducts, qrCodes, recentEvents } = data;

  const stats = [
    { title: "بازدید منو", value: totals.menuViews, icon: Eye },
    { title: "اسکن QR", value: totals.qrScans, icon: QrCode },
    { title: "بازدید محصول", value: totals.productViews, icon: BarChart3 },
    { title: "انتخاب مود", value: totals.moodSelections, icon: Sparkles },
    { title: "جستجو", value: totals.searches, icon: Search },
    { title: "کلیک پیشنهاد", value: totals.recommendationClicks, icon: BarChart3 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-coffee-100/60">رفتار مشتری</p>
          <h1 className="mt-2 text-3xl font-black">آمار و تحلیل</h1>
          <p className="mt-2 text-sm text-coffee-100/60">{selectedCafe ? `کافه: ${selectedCafe.name}` : "اول یک کافه بساز تا آمارش اینجا نمایش داده شود."}</p>
        </div>
        {selectedCafe ? <Link href={`/m/${selectedCafe.slug}`} className="rounded-2xl border border-gold-400/25 px-4 py-3 text-sm font-bold text-gold-400">دیدن منوی عمومی</Link> : null}
      </div>

      {cafes.length > 1 ? (
        <Card><CardHeader><CardTitle>انتخاب کافه</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{cafes.map((cafe: any) => <Link key={cafe.id} href={`/dashboard/analytics?cafeId=${cafe.id}`} className={`rounded-2xl px-4 py-2 text-sm font-bold ${selectedCafe?.id === cafe.id ? "bg-gold-400 text-coffee-950" : "bg-coffee-900/50 text-coffee-100/75"}`}>{cafe.name}</Link>)}</CardContent></Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => <Card key={stat.title}><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-coffee-100/60">{stat.title}</p><p className="mt-2 text-3xl font-black">{fa(stat.value)}</p></div><stat.icon className="h-8 w-8 text-gold-400" /></CardContent></Card>)}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>محصولات پربازدید</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {topProducts.length === 0 ? <p className="text-sm text-coffee-100/60">هنوز بازدید محصول ثبت نشده است.</p> : null}
            {topProducts.map((row: any, index: number) => <div key={`${row.product?.id || index}`} className="flex items-center justify-between rounded-2xl bg-coffee-900/45 p-4"><span>{fa(index + 1)}. {row.product?.name || "محصول حذف‌شده"}</span><span className="text-gold-400">{fa(row.views)} بازدید</span></div>)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>عملکرد QR</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {qrCodes.length === 0 ? <p className="text-sm text-coffee-100/60">هنوز QR ساخته نشده است.</p> : null}
            {qrCodes.map((qr: any) => <div key={qr.id} className="grid gap-2 rounded-2xl bg-coffee-900/45 p-4 md:grid-cols-3"><span className="font-bold">{qr.code}</span><span className="text-coffee-100/65">{qr.type}</span><span className="text-gold-400">{fa(qr.scanCount)} اسکن</span></div>)}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>رویدادهای اخیر</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {recentEvents.length === 0 ? <p className="text-sm text-coffee-100/60">هنوز رویدادی ثبت نشده است.</p> : null}
          {recentEvents.map((item: any) => <div key={item.id} className="grid gap-2 rounded-2xl bg-coffee-900/45 p-4 md:grid-cols-4"><span className="font-bold">{label(item.eventType)}</span><span className="text-coffee-100/65">{item.product?.name || item.qrCode?.code || "-"}</span><span className="text-coffee-100/65">{item.createdAt.toLocaleDateString("fa-IR")}</span><span className="text-gold-400">{item.createdAt.toLocaleTimeString("fa-IR")}</span></div>)}
        </CardContent>
      </Card>
    </div>
  );
}
