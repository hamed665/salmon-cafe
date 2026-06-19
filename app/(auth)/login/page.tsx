import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginAction } from "@/lib/auth/actions";

const errorMessages: Record<string, string> = {
  missing_fields: "ایمیل و رمز عبور را وارد کنید.",
  invalid_credentials: "ایمیل یا رمز عبور اشتباه است.",
  unauthorized: "برای دیدن این بخش باید وارد شوید."
};

export default async function LoginPage({
  searchParams
}: {
  searchParams?: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const error = params?.error ? errorMessages[params.error] : null;
  const next = params?.next ?? "/dashboard";

  return (
    <main className="flex min-h-screen items-center justify-center bg-coffee-900 px-5 text-coffee-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>ورود به پنل کافه</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="space-y-4">
            <input type="hidden" name="next" value={next} />
            {error ? <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</div> : null}
            <label className="block space-y-2">
              <span className="text-sm text-coffee-100/70">ایمیل</span>
              <input name="email" type="email" required className="w-full rounded-2xl border-coffee-100/10 bg-coffee-900/50 text-coffee-50" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-coffee-100/70">رمز عبور</span>
              <input name="password" type="password" required minLength={8} className="w-full rounded-2xl border-coffee-100/10 bg-coffee-900/50 text-coffee-50" />
            </label>
            <button className="w-full rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950">ورود</button>
            <p className="text-center text-sm text-coffee-100/60">
              حساب نداری؟ <Link href="/register" className="text-gold-400">ثبت‌نام</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
