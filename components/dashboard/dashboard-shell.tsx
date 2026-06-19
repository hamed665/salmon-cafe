import Link from "next/link";
import { BarChart3, Coffee, LayoutDashboard, LogOut, QrCode, Settings, Shield, Sparkles } from "lucide-react";
import { logoutAction } from "@/lib/auth/actions";

const dashboardItems = [
  { href: "/dashboard", label: "داشبورد", icon: LayoutDashboard },
  { href: "/dashboard/cafe", label: "اطلاعات کافه", icon: Coffee },
  { href: "/dashboard/menu/products", label: "مدیریت منو", icon: Settings },
  { href: "/dashboard/qr", label: "QR", icon: QrCode },
  { href: "/dashboard/analytics", label: "آمار", icon: BarChart3 }
];

const adminItems = [
  { href: "/admin", label: "ادمین", icon: Shield },
  { href: "/dashboard", label: "پنل کافه", icon: LayoutDashboard }
];

type DashboardShellProps = {
  children: React.ReactNode;
  admin?: boolean;
  user?: {
    email: string;
    fullName: string | null;
  };
};

export function DashboardShell({ children, admin = false, user }: DashboardShellProps) {
  const items = admin ? adminItems : dashboardItems;

  return (
    <main className="min-h-screen bg-coffee-900 text-coffee-50">
      <div className="container-shell grid gap-6 py-5 lg:grid-cols-[280px_1fr] lg:py-7">
        <aside className="rounded-[2rem] border border-coffee-100/10 bg-coffee-800/66 p-4 shadow-premium backdrop-blur-xl lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <div className="mb-6 overflow-hidden rounded-[1.75rem] border border-gold-400/18 bg-coffee-900/55 p-4">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400 text-coffee-950 shadow-soft">
              <Sparkles className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Salmon Cafe</p>
            <h1 className="mt-2 text-2xl font-black">{admin ? "پنل ادمین" : "پنل کافه"}</h1>
            {user ? <p className="mt-2 truncate text-xs text-coffee-100/58">{user.fullName || user.email}</p> : null}
          </div>
          <nav className="space-y-2">
            {items.map((item) => (
              <Link key={item.href} href={item.href} className="group flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm font-bold text-coffee-100/78 transition hover:border-gold-400/20 hover:bg-coffee-900/55 hover:text-coffee-50">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-400/10 text-gold-400 transition group-hover:bg-gold-400 group-hover:text-coffee-950">
                  <item.icon className="h-5 w-5" />
                </span>
                {item.label}
              </Link>
            ))}
          </nav>
          <form action={logoutAction} className="mt-6 border-t border-coffee-100/10 pt-4">
            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-coffee-100/64 transition hover:bg-red-500/10 hover:text-red-100">
              <LogOut className="h-5 w-5" /> خروج
            </button>
          </form>
        </aside>
        <section className="min-w-0 space-y-6">{children}</section>
      </div>
    </main>
  );
}
