import Link from "next/link";
import { Coffee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputField } from "@/components/ui/form-field";
import { loginAction } from "@/lib/auth/actions";

const errorMessages: Record<string, string> = {
  missing_fields: "ایمیل و رمز عبور را وارد کنید.",
  invalid_credentials: "ایمیل یا رمز عبور اشتباه است.",
  unauthorized: "برای دیدن این بخش باید وارد شوید."
};

export default async function LoginPage({ searchParams }: { searchParams?: Promise<{ error?: string; next?: string }> }) {
  const params = await searchParams;
  const error = params?.error ? errorMessages[params.error] : null;
  const next = params?.next ?? "/dashboard";

  return (
    <main className="flex min-h-screen items-center justify-center bg-coffee-900 px-5 py-10 text-coffee-50">
      <Card className="w-full max-w-md overflow-hidden">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400 text-coffee-950"><Coffee className="h-7 w-7" /></div>
          <CardTitle className="mt-4">ورود به پنل کافه</CardTitle>
          <p className="text-sm leading-7 text-coffee-100/58">برای مدیریت منو، QR و آمار وارد حساب شوید.</p>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="space-y-4">
            <input type="hidden" name="next" value={next} />
            {error ? <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</div> : null}
            <InputField label="ایمیل" name="email" type="email" required dir="ltr" />
            <InputField label="رمز عبور" name="password" type="password" required minLength={8} />
            <button className="w-full rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950 shadow-soft transition hover:-translate-y-0.5">ورود به پنل</button>
            <p className="text-center text-sm text-coffee-100/60">حساب نداری؟ <Link href="/register" className="font-bold text-gold-400">ثبت‌نام</Link></p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
