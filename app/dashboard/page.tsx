import Link from "next/link";
import { BarChart3, Coffee, Eye, QrCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireCafeUser } from "@/lib/auth/guards";
import { database } from "@/lib/database/client";
import { getManageableCafes } from "@/lib/cafes/queries";

export default async function DashboardPage() {
  const user = await requireCafeUser();
  const cafes = await getManageableCafes(user);
  const primaryCafe = cafes[0] ?? null;

  const productCount = primaryCafe
    ? await database.product.count({ where: { cafeId: primaryCafe.id, isActive: true } })
    : 0;

  const qrCount = primaryCafe
    ? await database.qrCode.count({ where: { cafeId: primaryCafe.id, isActive: true } })
    : 0;

  const eventCount = primaryCafe
    ? await database.analyticsEvent.count({ where: { cafeId: primaryCafe.id } })
    : 0;

  const stats = [
    { title: "کافه‌های قابل مدیریت", value: cafes.length.toLocaleString("fa-IR"), icon: Coffee },
    { title: "محصول فعال", value: productCount.toLocaleString("fa-IR"), icon: Eye },
    { title: "QR فعال", value: qrCount.toLocaleString("fa-IR"), icon: QrCode },
    { title: "رویداد ثبت‌شده", value: eventCount.toLocaleString("fa-IR"), icon: BarChart3 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-coffee-100/60">خلاصه وضعیت</p>
        <h1 className="mt-2 text-3xl font-black">داشبورد کافه</h1>
        <p className="mt-2 text-sm text-coffee-100/60">
          {primaryCafe ? `در حال مدیریت: ${primaryCafe.name}` : "هنوز کافه‌ای ساخته نشده است."}
        </p>
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
          <Link href="/dashboard/cafe" className="rounded-2xl bg-coffee-900/45 p-4 transition hover:bg-coffee-800">ساخت یا ویرایش کافه</Link>
          <Link href="/dashboard/menu/products" className="rounded-2xl bg-coffee-900/45 p-4 transition hover:bg-coffee-800">مدیریت محصولات</Link>
          <Link href="/dashboard/qr" className="rounded-2xl bg-coffee-900/45 p-4 transition hover:bg-coffee-800">دریافت QR کافه</Link>
        </CardContent>
      </Card>
    </div>
  );
}
