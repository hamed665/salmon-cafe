import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireCafeUser } from "@/lib/auth/guards";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireCafeUser();
  return <DashboardShell user={user}>{children}</DashboardShell>;
}
