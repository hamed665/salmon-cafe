import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell admin>{children}</DashboardShell>;
}
