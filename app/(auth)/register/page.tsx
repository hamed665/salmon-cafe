import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputField } from "@/components/ui/form-field";
import { registerAction } from "@/lib/auth/actions";

const errorMessages: Record<string, string> = {
  invalid_fields: "اطلاعات وارد شده معتبر نیست. رمز عبور باید حداقل ۸ کاراکتر باشد.",
  email_exists: "این ایمیل قبلاً ثبت شده است."
};

export default async function RegisterPage({ searchParams }: { searchParams?: Promise<{ error?: string }> }) {
  const params = await searchParams;
  const error = params?.error ? errorMessages[params.error] : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-coffee-900 px-5 py-10 text-coffee-50">
      <Card className="w-full max-w-md overflow-hidden">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400 text-coffee-950"><Sparkles className="h-7 w-7" /></div>
          <CardTitle className="mt-4">ثبت‌نام صاحب کافه</CardTitle>
          <p className="text-sm leading-7 text-coffee-100/58">حساب بساز و منوی هوشمند کافه را آماده کن.</p>
        </CardHeader>
        <CardContent>
          <form action={registerAction} className="space-y-4">
            {error ? <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</div> : null}
            <InputField label="نام و نام خانوادگی" name="fullName" />
            <InputField label="موبایل" name="mobile" dir="ltr" />
            <InputField label="ایمیل" name="email" type="email" required dir="ltr" />
            <InputField label="رمز عبور" name="password" type="password" required minLength={8} />
            <button className="w-full rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950 shadow-soft transition hover:-translate-y-0.5">ساخت حساب</button>
            <p className="text-center text-sm text-coffee-100/60">حساب داری؟ <Link href="/login" className="font-bold text-gold-400">ورود</Link></p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
