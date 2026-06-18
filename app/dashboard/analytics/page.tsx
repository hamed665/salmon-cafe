import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const rows = [
  { label: "آیس لاته", value: "۴۳۲ بازدید" },
  { label: "چیزکیک بلوبری", value: "۲۹۱ بازدید" },
  { label: "اسپرسو سینگل", value: "۲۱۶ بازدید" }
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-coffee-100/60">رفتار مشتری</p>
        <h1 className="mt-2 text-3xl font-black">آمار و تحلیل</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent><p className="text-sm text-coffee-100/60">بازدید هفته</p><p className="mt-2 text-3xl font-black">۸,۴۲۰</p></CardContent></Card>
        <Card><CardContent><p className="text-sm text-coffee-100/60">اسکن QR</p><p className="mt-2 text-3xl font-black">۲,۱۸۰</p></CardContent></Card>
        <Card><CardContent><p className="text-sm text-coffee-100/60">انتخاب مود</p><p className="mt-2 text-3xl font-black">۱,۳۲۴</p></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle>محصولات پربازدید</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {rows.map((row, index) => (
            <div key={row.label} className="flex items-center justify-between rounded-2xl bg-coffee-900/45 p-4">
              <span>{index + 1}. {row.label}</span>
              <span className="text-gold-400">{row.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
