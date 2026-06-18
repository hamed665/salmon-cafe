import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cafes = [
  { name: "کافه نوار", plan: "Pro", status: "فعال", renewal: "۱۴۰۵/۰۴/۲۸" },
  { name: "کافه نمونه شمال", plan: "Starter", status: "آزمایشی", renewal: "۱۴۰۵/۰۴/۱۲" }
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-coffee-100/60">کنترل پلتفرم</p>
        <h1 className="mt-2 text-3xl font-black">پنل ادمین Salmon Cafe</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent><p className="text-sm text-coffee-100/60">کافه‌ها</p><p className="mt-2 text-3xl font-black">۲</p></CardContent></Card>
        <Card><CardContent><p className="text-sm text-coffee-100/60">اشتراک فعال</p><p className="mt-2 text-3xl font-black">۱</p></CardContent></Card>
        <Card><CardContent><p className="text-sm text-coffee-100/60">پرداخت دستی</p><p className="mt-2 text-3xl font-black">۳</p></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle>کافه‌ها</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {cafes.map((cafe) => (
            <div key={cafe.name} className="grid gap-3 rounded-2xl bg-coffee-900/45 p-4 md:grid-cols-4">
              <span>{cafe.name}</span>
              <span className="text-gold-400">{cafe.plan}</span>
              <span>{cafe.status}</span>
              <span>{cafe.renewal}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
