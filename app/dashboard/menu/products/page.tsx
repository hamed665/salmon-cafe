import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatToman } from "@/lib/format";
import { demoProducts, getCategoryById } from "@/lib/demo-data";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-coffee-100/60">منو و محصولات</p>
        <h1 className="mt-2 text-3xl font-black">مدیریت محصولات</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>محصولات فعلی</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {demoProducts.map((product) => (
            <div key={product.id} className="flex flex-col gap-3 rounded-3xl border border-coffee-100/10 bg-coffee-900/40 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-black">{product.name}</h2>
                <p className="mt-1 text-sm text-coffee-100/60">{getCategoryById(product.categoryId)?.name}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-full bg-gold-400/12 px-3 py-1 font-black text-gold-400">{formatToman(product.price)}</span>
                <span className="rounded-full bg-emerald-400/12 px-3 py-1 text-emerald-200">{product.isAvailable ? "موجود" : "ناموجود"}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
