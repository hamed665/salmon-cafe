import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { registerAction } from "@/lib/auth/actions";

const errorMessages: Record<string, string> = {
  invalid_fields: "اطلاعات وارد شده معتبر نیست. رمز عبور باید حداقل ۸ کاراکتر باشد.",
  email_exists: "این ایمیل قبلاً ثبت شده است."
};

export default async function RegisterPage({
  searchParams
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params?.error ? errorMessages[params.error] : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-coffee-900 px-5 text-coffee-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>ثبت‌نام صاحب کافه</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={registerAction} className="space-y-4">
            {error ? <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</div> : null}
            <label className="block space-y-2">
              <span className="text-sm text-coffee-100/70">نام و نام خانوادگی</span>
              <input name="fullName" className="w-full rounded-2xl border-coffee-100/10 bg-coffee-900/50 text-coffee-50" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-coffee-100/70">موبایل</span>
              <input name="mobile" className="w-full rounded-2xl border-coffee-100/10 bg-coffee-900/50 text-coffee-50" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-coffee-100/70">ایمیل</span>
              <input name="email" type="email" required className="w-full rounded-2xl border-coffee-100/10 bg-coffee-900/50 text-coffee-50" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-coffee-100/70">رمز عبور</span>
              <input name="password" type="password" required minLength={8} className="w-full rounded-2xl border-coffee-100/10 bg-coffee-900/50 text-coffee-50" />
            </label>
            <button className="w-full rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950">ساخت حساب</button>
            <p className="text-center text-sm text-coffee-100/60">
              حساب داری؟ <Link href="/login" className="text-gold-400">ورود</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
