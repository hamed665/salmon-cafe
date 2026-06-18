import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { demoCafe } from "@/lib/demo-data";

export default function CafeSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-coffee-100/60">پروفایل برند</p>
        <h1 className="mt-2 text-3xl font-black">اطلاعات کافه</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>فرم اطلاعات اصلی</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm text-coffee-100/70">نام کافه</span>
            <input defaultValue={demoCafe.name} className="w-full rounded-2xl border-coffee-100/10 bg-coffee-900/50 text-coffee-50" />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-coffee-100/70">اسلاگ لینک</span>
            <input defaultValue={demoCafe.slug} dir="ltr" className="w-full rounded-2xl border-coffee-100/10 bg-coffee-900/50 text-left text-coffee-50" />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm text-coffee-100/70">توضیحات</span>
            <textarea defaultValue={demoCafe.description} rows={4} className="w-full rounded-2xl border-coffee-100/10 bg-coffee-900/50 text-coffee-50" />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm text-coffee-100/70">آدرس</span>
            <input defaultValue={demoCafe.address} className="w-full rounded-2xl border-coffee-100/10 bg-coffee-900/50 text-coffee-50" />
          </label>
        </CardContent>
      </Card>
    </div>
  );
}
