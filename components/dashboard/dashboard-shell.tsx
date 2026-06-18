import Link from "next/link";
import { BarChart3, Coffee, LayoutDashboard, QrCode, Settings, Shield } from "lucide-react";

const dashboardItems = [
  { href: "/dashboard", label: "داشبورد", icon: LayoutDashboard },
  { href: "/dashboard/cafe", label: "اطلاعات کافه", icon: Coffee },
  { href: "/dashboard/menu/products", label: "مدیریت منو", icon: Settings },
  { href: "/dashboard/qr", label: "QR", icon: QrCode },
  { href: "/dashboard/analytics", label: "آمار", icon: BarChart3 }
];

const adminItems = [{ href: "/admin", label: "ادمین", icon: Shield }];

export function DashboardShell({ children, admin = false }: { children: React.ReactNode; admin?: boolean }) {
  const items = admin ? adminItems : dashboardItems;

  return (
    <main className="min-h-screen bg-coffee-900 text-coffee-50">
      <div className="container-shell grid gap-6 py-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl border border-coffee-100/10 bg-coffee-800/60 p-4 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <div className="mb-6 rounded-2xl bg-gold-400/12 p-4">
            <p className="text-sm text-coffee-100/70">Salmon Cafe</p>
            <h1 className="mt-1 text-xl font-black">{admin ? "پنل ادمین" : "پنل کافه"}</h1>
          </div>
          <nav className="space-y-2">
            {items.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-coffee-100/80 transition hover:bg-coffee-700/80 hover:text-coffee-50">
                <item.icon className="h-5 w-5 text-gold-400" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <section>{children}</section>
      </div>
    </main>
  );
}
