import Link from "next/link";
import { QrCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function QrPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-coffee-100/60">دسترسی سریع مشتری</p>
        <h1 className="mt-2 text-3xl font-black">QR کافه</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>QR اصلی کافه</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
          <div className="flex aspect-square items-center justify-center rounded-3xl bg-coffee-50 text-coffee-950">
            <QrCode className="h-32 w-32" />
          </div>
          <div className="space-y-4">
            <p className="text-sm leading-7 text-coffee-100/70">
              در نسخه واقعی، QR به مسیر اختصاصی کافه وصل می‌شود و هر اسکن در جدول analytics_events ثبت خواهد شد.
            </p>
            <Link href="/q/demo-cafe-noir" className="inline-flex rounded-2xl bg-gold-400 px-5 py-3 text-sm font-black text-coffee-950">
              تست QR دمو
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
