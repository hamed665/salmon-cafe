import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-coffee-900 px-5 text-coffee-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>ورود به پنل کافه</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input placeholder="ایمیل" className="w-full rounded-2xl border-coffee-100/10 bg-coffee-900/50 text-coffee-50" />
          <input placeholder="رمز عبور" type="password" className="w-full rounded-2xl border-coffee-100/10 bg-coffee-900/50 text-coffee-50" />
          <button className="w-full rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950">ورود</button>
          <p className="text-center text-sm text-coffee-100/60">
            حساب نداری؟ <Link href="/register" className="text-gold-400">ثبت‌نام</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
