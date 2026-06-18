import { BarChart3, Coffee, Eye, QrCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatToman } from "@/lib/format";

const stats = [
  { title: "بازدید امروز", value: "۱,۲۴۸", icon: Eye },
  { title: "اسکن QR", value: "۸۵۶", icon: QrCode },
  { title: "محصول فعال", value: "۳۲", icon: Coffee },
  { title: "درآمد قابل انتساب", value: formatToman(12400000), icon: BarChart3 }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-coffee-100/60">خلاصه وضعیت</p>
        <h1 className="mt-2 text-3xl font-black">داشبورد کافه</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-coffee-100/60">{stat.title}</p>
                <p className="mt-2 text-2xl font-black">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-gold-400" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>اقدام‌های سریع</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-coffee-900/45 p-4">افزودن محصول جدید</div>
          <div className="rounded-2xl bg-coffee-900/45 p-4">دریافت QR کافه</div>
          <div className="rounded-2xl bg-coffee-900/45 p-4">دیدن آمار محصولات</div>
        </CardContent>
      </Card>
    </div>
  );
}
