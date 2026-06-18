import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-coffee-900 px-5 text-coffee-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>ثبت‌نام صاحب کافه</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input placeholder="نام و نام خانوادگی" className="w-full rounded-2xl border-coffee-100/10 bg-coffee-900/50 text-coffee-50" />
          <input placeholder="ایمیل" className="w-full rounded-2xl border-coffee-100/10 bg-coffee-900/50 text-coffee-50" />
          <input placeholder="رمز عبور" type="password" className="w-full rounded-2xl border-coffee-100/10 bg-coffee-900/50 text-coffee-50" />
          <button className="w-full rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950">ساخت حساب</button>
          <p className="text-center text-sm text-coffee-100/60">
            حساب داری؟ <Link href="/login" className="text-gold-400">ورود</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
