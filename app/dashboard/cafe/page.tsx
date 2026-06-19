import Link from "next/link";
import { CafeStatus } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireCafeUser } from "@/lib/auth/guards";
import { createCafeAction, updateCafeAction, updateCafeSettingsAction } from "@/lib/cafes/actions";
import { getManageableCafes } from "@/lib/cafes/queries";

type PageSearchParams = {
  cafeId?: string;
  saved?: string;
  error?: string;
};

const inputClass = "w-full rounded-2xl border-coffee-100/10 bg-coffee-900/50 text-coffee-50 placeholder:text-coffee-100/35";
const labelClass = "space-y-2";

const savedMessages: Record<string, string> = {
  created: "کافه با موفقیت ساخته شد.",
  profile: "اطلاعات کافه ذخیره شد.",
  settings: "تنظیمات کافه ذخیره شد."
};

const errorMessages: Record<string, string> = {
  slug_taken: "این اسلاگ قبلاً استفاده شده است. یک اسلاگ انگلیسی دیگر انتخاب کنید.",
  missing_cafe: "کافه پیدا نشد."
};

export default async function CafeSettingsPage({ searchParams }: { searchParams?: Promise<PageSearchParams> }) {
  const user = await requireCafeUser();
  const params = await searchParams;
  const cafes = await getManageableCafes(user);
  const selectedCafe = cafes.find((cafe) => cafe.id === params?.cafeId) ?? cafes[0] ?? null;
  const savedMessage = params?.saved ? savedMessages[params.saved] : null;
  const errorMessage = params?.error ? errorMessages[params.error] : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-coffee-100/60">پروفایل برند</p>
          <h1 className="mt-2 text-3xl font-black">اطلاعات کافه</h1>
          <p className="mt-2 text-sm text-coffee-100/60">ساخت، ویرایش، انتشار و تنظیمات تجربه عمومی کافه.</p>
        </div>
        {selectedCafe ? (
          <Link href={`/m/${selectedCafe.slug}`} className="rounded-2xl border border-gold-400/25 px-4 py-3 text-sm font-bold text-gold-400">
            دیدن صفحه عمومی
          </Link>
        ) : null}
      </div>

      {savedMessage ? <Notice type="success" message={savedMessage} /> : null}
      {errorMessage ? <Notice type="error" message={errorMessage} /> : null}

      {cafes.length > 1 ? (
        <Card>
          <CardHeader>
            <CardTitle>انتخاب کافه</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {cafes.map((cafe) => (
              <Link key={cafe.id} href={`/dashboard/cafe?cafeId=${cafe.id}`} className={`rounded-2xl px-4 py-2 text-sm font-bold ${selectedCafe?.id === cafe.id ? "bg-gold-400 text-coffee-950" : "bg-coffee-900/50 text-coffee-100/75"}`}>
                {cafe.name}
              </Link>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <CafeForm cafe={selectedCafe} />
      {selectedCafe ? <CafeSettingsForm cafe={selectedCafe} /> : null}
    </div>
  );
}

function Notice({ type, message }: { type: "success" | "error"; message: string }) {
  const className = type === "success"
    ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
    : "border-red-400/20 bg-red-500/10 text-red-100";

  return <div className={`rounded-2xl border px-4 py-3 text-sm ${className}`}>{message}</div>;
}

function Field({ label, name, defaultValue, dir, type = "text", required = false }: { label: string; name: string; defaultValue?: string | null; dir?: "ltr" | "rtl"; type?: string; required?: boolean }) {
  return (
    <label className={labelClass}>
      <span className="text-sm text-coffee-100/70">{label}</span>
      <input name={name} type={type} required={required} defaultValue={defaultValue ?? ""} dir={dir} className={`${inputClass} ${dir === "ltr" ? "text-left" : ""}`} />
    </label>
  );
}

function CheckboxField({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl border border-coffee-100/10 bg-coffee-900/35 px-4 py-3 text-sm text-coffee-100/80">
      <span>{label}</span>
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="rounded border-coffee-100/20 bg-coffee-900 text-gold-400 focus:ring-gold-400" />
    </label>
  );
}

function CafeForm({ cafe }: { cafe: Awaited<ReturnType<typeof getManageableCafes>>[number] | null }) {
  const action = cafe ? updateCafeAction : createCafeAction;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{cafe ? "ویرایش اطلاعات اصلی" : "ساخت اولین کافه"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="grid gap-4 md:grid-cols-2">
          {cafe ? <input type="hidden" name="cafeId" value={cafe.id} /> : null}
          <Field label="نام کافه" name="name" defaultValue={cafe?.name} required />
          <Field label="اسلاگ لینک" name="slug" defaultValue={cafe?.slug} dir="ltr" required />
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm text-coffee-100/70">توضیحات</span>
            <textarea name="description" defaultValue={cafe?.description ?? ""} rows={4} className={inputClass} />
          </label>
          <Field label="شماره تماس" name="phone" defaultValue={cafe?.phone} dir="ltr" />
          <Field label="اینستاگرام" name="instagramUrl" defaultValue={cafe?.instagramUrl} dir="ltr" />
          <Field label="وب‌سایت" name="websiteUrl" defaultValue={cafe?.websiteUrl} dir="ltr" />
          <Field label="شهر" name="city" defaultValue={cafe?.city} />
          <Field label="منطقه" name="area" defaultValue={cafe?.area} />
          <Field label="لوگو URL" name="logoUrl" defaultValue={cafe?.logoUrl} dir="ltr" />
          <Field label="کاور URL" name="coverUrl" defaultValue={cafe?.coverUrl} dir="ltr" />
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm text-coffee-100/70">آدرس</span>
            <input name="address" defaultValue={cafe?.address ?? ""} className={inputClass} />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-coffee-100/70">وضعیت داخلی</span>
            <select name="status" defaultValue={cafe?.status ?? CafeStatus.DRAFT} className={inputClass}>
              <option value={CafeStatus.DRAFT}>پیش‌نویس</option>
              <option value={CafeStatus.ACTIVE}>فعال</option>
              <option value={CafeStatus.DISABLED}>غیرفعال</option>
            </select>
          </label>
          <div className="flex items-end">
            <CheckboxField name="isPublished" label="انتشار صفحه عمومی" defaultChecked={cafe?.isPublished ?? false} />
          </div>
          <div className="md:col-span-2">
            <button className="rounded-2xl bg-gold-400 px-6 py-3 font-black text-coffee-950">{cafe ? "ذخیره اطلاعات" : "ساخت کافه"}</button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function CafeSettingsForm({ cafe }: { cafe: Awaited<ReturnType<typeof getManageableCafes>>[number] }) {
  const settings = cafe.settings;

  return (
    <Card>
      <CardHeader>
        <CardTitle>تنظیمات تجربه کافه</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={updateCafeSettingsAction} className="space-y-4">
          <input type="hidden" name="cafeId" value={cafe.id} />
          <div className="grid gap-4 md:grid-cols-2">
            <label className={labelClass}>
              <span className="text-sm text-coffee-100/70">واحد پول</span>
              <select name="currency" defaultValue={settings?.currency ?? "IRT"} className={inputClass}>
                <option value="IRT">تومان</option>
                <option value="IRR">ریال</option>
              </select>
            </label>
            <CheckboxField name="showPrices" label="نمایش قیمت‌ها" defaultChecked={settings?.showPrices ?? true} />
            <CheckboxField name="showUnavailableProducts" label="نمایش محصولات ناموجود" defaultChecked={settings?.showUnavailableProducts ?? true} />
            <CheckboxField name="enableMoodMenu" label="فعال بودن Mood Menu" defaultChecked={settings?.enableMoodMenu ?? true} />
            <CheckboxField name="enableCoffeeStory" label="نمایش داستان محصول" defaultChecked={settings?.enableCoffeeStory ?? true} />
            <CheckboxField name="enableRecommendations" label="نمایش پیشنهاد مکمل" defaultChecked={settings?.enableRecommendations ?? true} />
            <CheckboxField name="enableAnalytics" label="ثبت آمار بازدید" defaultChecked={settings?.enableAnalytics ?? true} />
          </div>
          <button className="rounded-2xl bg-gold-400 px-6 py-3 font-black text-coffee-950">ذخیره تنظیمات</button>
        </form>
      </CardContent>
    </Card>
  );
}
