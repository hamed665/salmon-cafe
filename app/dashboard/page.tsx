import Link from "next/link";
import { BarChart3, Coffee, Eye, QrCode, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { requireCafeUser } from "@/lib/auth/guards";
import { database } from "@/lib/database/client";
import { getManageableCafes } from "@/lib/cafes/queries";

export default async function DashboardPage() {
  const user = await requireCafeUser();
  const cafes = await getManageableCafes(user);
  const primaryCafe = cafes[0] ?? null;

  const productCount = primaryCafe ? await database.product.count({ where: { cafeId: primaryCafe.id, isActive: true } }) : 0;
  const qrCount = primaryCafe ? await database.qrCode.count({ where: { cafeId: primaryCafe.id, isActive: true } }) : 0;
  const eventCount = primaryCafe ? await database.analyticsEvent.count({ where: { cafeId: primaryCafe.id } }) : 0;

  const stats = [
    { title: "کافه‌های قابل مدیریت", value: cafes.length.toLocaleString("fa-IR"), icon: Coffee, hint: primaryCafe ? primaryCafe.name : "شروع از ساخت اولین کافه" },
    { title: "محصول فعال", value: productCount.toLocaleString("fa-IR"), icon: Eye, hint: "محصولات قابل نمایش" },
    { title: "QR فعال", value: qrCount.toLocaleString("fa-IR"), icon: QrCode, hint: "کدهای آماده چاپ" },
    { title: "رویداد ثبت‌شده", value: eventCount.toLocaleString("fa-IR"), icon: BarChart3, hint: "رفتار مشتریان" }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="خلاصه وضعیت"
        title="داشبورد کافه"
        description={primaryCafe ? `کافه فعال در داشبورد: ${primaryCafe.name}` : "اولین کافه را بساز تا داشبورد واقعی فعال شود."}
        actions={primaryCafe ? <Link href={`/m/${primaryCafe.slug}`} className="rounded-2xl border border-gold-400/25 px-4 py-3 text-sm font-bold text-gold-400">منوی عمومی</Link> : <Link href="/dashboard/cafe" className="rounded-2xl bg-gold-400 px-4 py-3 text-sm font-black text-coffee-950">ساخت کافه</Link>}
        meta={primaryCafe ? <StatusBadge tone={primaryCafe.isPublished ? "success" : "warning"}>{primaryCafe.isPublished ? "منتشر شده" : "پیش‌نویس"}</StatusBadge> : null}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => <StatCard key={stat.title} {...stat} />)}
      </div>

      {primaryCafe ? (
        <Card>
          <CardHeader><CardTitle>اقدام‌های سریع</CardTitle></CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            <QuickAction href="/dashboard/cafe" icon={Settings} title="ویرایش کافه" description="پروفایل و تنظیمات" />
            <QuickAction href="/dashboard/menu/products" icon={Coffee} title="مدیریت منو" description="دسته‌بندی و محصولات" />
            <QuickAction href="/dashboard/qr" icon={QrCode} title="QR کافه" description="کدهای قابل چاپ" />
          </CardContent>
        </Card>
      ) : (
        <EmptyState title="هنوز کافه‌ای ساخته نشده" description="برای فعال شدن منو، محصولات، QR و آمار، اولین کافه را بساز." action={<Link href="/dashboard/cafe" className="rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950">ساخت اولین کافه</Link>} />
      )}
    </div>
  );
}

function QuickAction({ href, icon: Icon, title, description }: { href: string; icon: typeof Coffee; title: string; description: string }) {
  return (
    <Link href={href} className="group rounded-[1.5rem] border border-coffee-100/10 bg-coffee-900/38 p-4 transition hover:-translate-y-0.5 hover:border-gold-400/25 hover:bg-coffee-900/65">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-400/10 text-gold-400 transition group-hover:bg-gold-400 group-hover:text-coffee-950"><Icon className="h-5 w-5" /></div>
      <h3 className="font-black text-coffee-50">{title}</h3>
      <p className="mt-1 text-xs leading-6 text-coffee-100/55">{description}</p>
    </Link>
  );
}
