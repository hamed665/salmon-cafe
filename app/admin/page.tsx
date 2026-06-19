import { CafeStatus, SubscriptionStatus } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/guards";
import { assignPlanAction, createPlanAction, recordPaymentAction, updateCafeAdminAction, updatePlanAction } from "@/lib/admin/actions";
import { getAdminDashboardData } from "@/lib/admin/queries";
import { formatToman } from "@/lib/format";

const inputClass = "w-full rounded-2xl border-coffee-100/10 bg-coffee-900/50 text-coffee-50 placeholder:text-coffee-100/35";
const chipClass = "rounded-full bg-coffee-900/60 px-3 py-1 text-xs text-coffee-100/75";

const savedMessages: Record<string, string> = {
  cafe_updated: "وضعیت کافه ذخیره شد.",
  plan_created: "پلن ساخته شد.",
  plan_updated: "پلن ذخیره شد.",
  subscription_assigned: "پلن برای کافه ثبت شد.",
  payment_recorded: "پرداخت دستی ثبت شد."
};

function fa(value: number) {
  return value.toLocaleString("fa-IR");
}

function Check({ name, label, defaultChecked = false }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-2xl border border-coffee-100/10 bg-coffee-900/35 px-3 py-2 text-xs text-coffee-100/80">
      <span>{label}</span>
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="rounded border-coffee-100/20 bg-coffee-900 text-gold-400" />
    </label>
  );
}

export default async function AdminPage({ searchParams }: { searchParams?: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const params = await searchParams;
  const data = await getAdminDashboardData();
  const savedMessage = params?.saved ? savedMessages[params.saved] : null;

  const stats = [
    { label: "کافه‌ها", value: fa(data.totals.totalCafes), hint: `${fa(data.totals.activeCafes)} فعال` },
    { label: "منتشرشده", value: fa(data.totals.publishedCafes), hint: "صفحه عمومی فعال" },
    { label: "محصولات", value: fa(data.totals.totalProducts), hint: "کل محصولات" },
    { label: "اشتراک فعال", value: fa(data.totals.activeSubscriptions), hint: "پرداخت/پلن فعال" },
    { label: "QR Scan", value: fa(data.totals.qrScans), hint: "همه کافه‌ها" },
    { label: "درآمد ثبت‌شده", value: formatToman(data.totals.paidPaymentAmount), hint: `${fa(data.totals.paidPaymentCount)} پرداخت` }
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-coffee-100/60">کنترل پلتفرم</p>
        <h1 className="mt-2 text-3xl font-black">پنل ادمین Salmon Cafe</h1>
        <p className="mt-2 text-sm text-coffee-100/60">مدیریت کافه‌ها، پلن‌ها، اشتراک‌های دستی، پرداخت‌ها و شاخص‌های کلیدی.</p>
      </div>

      {savedMessage ? <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">{savedMessage}</div> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent>
              <p className="text-sm text-coffee-100/60">{stat.label}</p>
              <p className="mt-2 text-3xl font-black">{stat.value}</p>
              <p className="mt-1 text-xs text-coffee-100/45">{stat.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>کافه‌ها</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {data.cafes.map((cafe: any) => {
            const lastSubscription = cafe.subscriptions[0];
            return (
              <form key={cafe.id} action={updateCafeAdminAction} className="rounded-3xl border border-coffee-100/10 bg-coffee-900/35 p-4">
                <input type="hidden" name="cafeId" value={cafe.id} />
                <div className="grid gap-4 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_auto] lg:items-end">
                  <div>
                    <h2 className="text-lg font-black">{cafe.name}</h2>
                    <p className="mt-1 text-xs text-coffee-100/55">/{cafe.slug} · مالک: {cafe.owner?.fullName || cafe.owner?.email || "-"}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className={chipClass}>{fa(cafe._count.products)} محصول</span>
                      <span className={chipClass}>{fa(cafe._count.qrCodes)} QR</span>
                      <span className={chipClass}>{fa(cafe._count.events)} event</span>
                      <span className={chipClass}>{lastSubscription?.plan?.name || "بدون پلن"}</span>
                    </div>
                  </div>
                  <label className="space-y-2"><span className="text-xs text-coffee-100/65">وضعیت</span><select name="status" defaultValue={cafe.status} className={inputClass}><option value={CafeStatus.DRAFT}>Draft</option><option value={CafeStatus.ACTIVE}>Active</option><option value={CafeStatus.DISABLED}>Disabled</option></select></label>
                  <Check name="isPublished" label="منتشر شود" defaultChecked={cafe.isPublished} />
                  <a href={`/m/${cafe.slug}`} className="rounded-2xl border border-gold-400/25 px-4 py-3 text-center text-sm font-bold text-gold-400">صفحه عمومی</a>
                  <button className="rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950">ذخیره</button>
                </div>
              </form>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>ثبت پلن جدید</CardTitle></CardHeader>
          <CardContent>
            <form action={createPlanAction} className="grid gap-3 md:grid-cols-2">
              <input name="name" placeholder="نام پلن" className={inputClass} />
              <input name="key" placeholder="plan-key" className={inputClass} dir="ltr" />
              <input name="monthlyPrice" placeholder="قیمت ماهانه" type="number" className={inputClass} />
              <input name="yearlyPrice" placeholder="قیمت سالانه" type="number" className={inputClass} />
              <input name="maxProducts" placeholder="حداکثر محصول" type="number" className={inputClass} />
              <input name="maxCafes" placeholder="حداکثر کافه" type="number" className={inputClass} />
              <Check name="enableMoodMenu" label="Mood Menu" />
              <Check name="enableRecommendations" label="Recommendations" />
              <Check name="enableAnalytics" label="Analytics" defaultChecked />
              <Check name="enableCustomTheme" label="Custom Theme" />
              <Check name="isActive" label="فعال" defaultChecked />
              <button className="rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950">ساخت پلن</button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>اختصاص پلن به کافه</CardTitle></CardHeader>
          <CardContent>
            <form action={assignPlanAction} className="grid gap-3 md:grid-cols-2">
              <select name="cafeId" className={inputClass}>{data.cafes.map((cafe: any) => <option key={cafe.id} value={cafe.id}>{cafe.name}</option>)}</select>
              <select name="planId" className={inputClass}>{data.plans.map((plan: any) => <option key={plan.id} value={plan.id}>{plan.name}</option>)}</select>
              <select name="status" defaultValue={SubscriptionStatus.ACTIVE} className={inputClass}><option value={SubscriptionStatus.TRIAL}>Trial</option><option value={SubscriptionStatus.ACTIVE}>Active</option><option value={SubscriptionStatus.PAST_DUE}>Past Due</option><option value={SubscriptionStatus.EXPIRED}>Expired</option></select>
              <select name="paymentStatus" defaultValue="paid" className={inputClass}><option value="paid">Paid</option><option value="unpaid">Unpaid</option><option value="pending">Pending</option></select>
              <input name="startsAt" type="date" className={inputClass} />
              <input name="endsAt" type="date" className={inputClass} />
              <input name="renewalType" defaultValue="manual" className={inputClass} />
              <button className="rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950">ثبت اشتراک</button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>پلن‌ها</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {data.plans.map((plan: any) => (
            <form key={plan.id} action={updatePlanAction} className="grid gap-3 rounded-3xl border border-coffee-100/10 bg-coffee-900/35 p-4 lg:grid-cols-6">
              <input type="hidden" name="planId" value={plan.id} />
              <input name="name" defaultValue={plan.name} className={inputClass} />
              <input name="monthlyPrice" type="number" defaultValue={plan.monthlyPrice} className={inputClass} />
              <input name="yearlyPrice" type="number" defaultValue={plan.yearlyPrice} className={inputClass} />
              <input name="maxProducts" type="number" defaultValue={plan.maxProducts} className={inputClass} />
              <Check name="enableMoodMenu" label="Mood" defaultChecked={plan.enableMoodMenu} />
              <Check name="enableAnalytics" label="Analytics" defaultChecked={plan.enableAnalytics} />
              <input name="maxCafes" type="hidden" defaultValue={plan.maxCafes} />
              <input name="maxTables" type="hidden" defaultValue={plan.maxTables} />
              <input name="enableRecommendations" type="checkbox" defaultChecked={plan.enableRecommendations} className="hidden" />
              <input name="enableCustomTheme" type="checkbox" defaultChecked={plan.enableCustomTheme} className="hidden" />
              <Check name="isActive" label="فعال" defaultChecked={plan.isActive} />
              <button className="rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950">ذخیره</button>
            </form>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>ثبت پرداخت دستی</CardTitle></CardHeader>
        <CardContent>
          <form action={recordPaymentAction} className="grid gap-3 md:grid-cols-3">
            <select name="cafeId" className={inputClass}>{data.cafes.map((cafe: any) => <option key={cafe.id} value={cafe.id}>{cafe.name}</option>)}</select>
            <select name="subscriptionId" className={inputClass}><option value="">بدون اشتراک</option>{data.subscriptions.map((subscription: any) => <option key={subscription.id} value={subscription.id}>{subscription.cafe.name} · {subscription.plan.name}</option>)}</select>
            <input name="amount" type="number" placeholder="مبلغ" className={inputClass} />
            <input name="currency" defaultValue="IRT" className={inputClass} />
            <input name="method" defaultValue="manual" className={inputClass} />
            <input name="trackingCode" placeholder="کد پیگیری" className={inputClass} />
            <select name="status" defaultValue="paid" className={inputClass}><option value="paid">Paid</option><option value="pending">Pending</option><option value="failed">Failed</option></select>
            <button className="rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950">ثبت پرداخت</button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>پرداخت‌های اخیر</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {data.payments.map((payment: any) => (
            <div key={payment.id} className="grid gap-2 rounded-2xl bg-coffee-900/45 p-4 md:grid-cols-5">
              <span>{payment.cafe?.name}</span>
              <span className="text-gold-400">{formatToman(payment.amount)}</span>
              <span>{payment.status}</span>
              <span>{payment.method}</span>
              <span>{payment.createdAt.toLocaleDateString("fa-IR")}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
