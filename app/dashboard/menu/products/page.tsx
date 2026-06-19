import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireCafeUser } from "@/lib/auth/guards";
import { getMenuBuilderData } from "@/lib/menu/queries";
import { archiveCategoryAction, archiveProductAction, createCategoryAction, createProductAction, updateCategoryAction, updateProductAction } from "@/lib/menu/actions";
import { formatToman } from "@/lib/format";

type SearchParams = {
  cafeId?: string;
  saved?: string;
  error?: string;
};

const inputClass = "w-full rounded-2xl border-coffee-100/10 bg-coffee-900/50 text-coffee-50 placeholder:text-coffee-100/35";
const muted = "text-sm text-coffee-100/60";

const savedMessages: Record<string, string> = {
  category_created: "دسته‌بندی ساخته شد.",
  category_updated: "دسته‌بندی ذخیره شد.",
  category_archived: "دسته‌بندی غیرفعال شد.",
  product_created: "محصول ساخته شد.",
  product_updated: "محصول ذخیره شد.",
  product_archived: "محصول غیرفعال شد."
};

export default async function ProductsPage({ searchParams }: { searchParams?: Promise<SearchParams> }) {
  const user = await requireCafeUser();
  const params = await searchParams;
  const data = await getMenuBuilderData(user, params?.cafeId);
  const { cafes, selectedCafe, categories, products, moods } = data;
  const savedMessage = params?.saved ? savedMessages[params.saved] : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-coffee-100/60">منو و محصولات</p>
          <h1 className="mt-2 text-3xl font-black">منوساز کافه</h1>
          <p className="mt-2 text-sm text-coffee-100/60">دسته‌بندی، محصول، قیمت، موجودی، شاخص طعمی، داستان محصول و پیشنهاد مکمل.</p>
        </div>
        {selectedCafe ? <Link href={`/m/${selectedCafe.slug}`} className="rounded-2xl border border-gold-400/25 px-4 py-3 text-sm font-bold text-gold-400">دیدن منوی عمومی</Link> : null}
      </div>

      {savedMessage ? <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">{savedMessage}</div> : null}

      {cafes.length === 0 ? (
        <Card>
          <CardHeader><CardTitle>اول کافه بساز</CardTitle></CardHeader>
          <CardContent>
            <p className={muted}>برای ساخت محصول، اول باید از بخش اطلاعات کافه یک کافه بسازی.</p>
            <Link href="/dashboard/cafe" className="mt-4 inline-flex rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950">ساخت کافه</Link>
          </CardContent>
        </Card>
      ) : null}

      {cafes.length > 1 ? (
        <Card>
          <CardHeader><CardTitle>انتخاب کافه</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {cafes.map((cafe) => (
              <Link key={cafe.id} href={`/dashboard/menu/products?cafeId=${cafe.id}`} className={`rounded-2xl px-4 py-2 text-sm font-bold ${selectedCafe?.id === cafe.id ? "bg-gold-400 text-coffee-950" : "bg-coffee-900/50 text-coffee-100/75"}`}>
                {cafe.name}
              </Link>
            ))}
          </CardContent>
        </Card>
      ) : null}

      {selectedCafe ? (
        <>
          <CategoryManager cafeId={selectedCafe.id} categories={categories} />
          <ProductCreateForm cafeId={selectedCafe.id} categories={categories} products={products} moods={moods} />
          <ProductList cafeId={selectedCafe.id} categories={categories} products={products} moods={moods} />
        </>
      ) : null}
    </div>
  );
}

function Field({ label, name, defaultValue, type = "text", dir }: { label: string; name: string; defaultValue?: string | number | null; type?: string; dir?: "ltr" | "rtl" }) {
  return (
    <label className="space-y-2">
      <span className="text-sm text-coffee-100/70">{label}</span>
      <input name={name} type={type} defaultValue={defaultValue ?? ""} dir={dir} className={`${inputClass} ${dir === "ltr" ? "text-left" : ""}`} />
    </label>
  );
}

function Checkbox({ name, label, defaultChecked = true }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl border border-coffee-100/10 bg-coffee-900/35 px-4 py-3 text-sm text-coffee-100/80">
      <span>{label}</span>
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="rounded border-coffee-100/20 bg-coffee-900 text-gold-400 focus:ring-gold-400" />
    </label>
  );
}

function CategoryManager({ cafeId, categories }: { cafeId: string; categories: any[] }) {
  return (
    <Card>
      <CardHeader><CardTitle>دسته‌بندی‌ها</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <form action={createCategoryAction} className="grid gap-3 rounded-3xl border border-coffee-100/10 bg-coffee-900/30 p-4 md:grid-cols-5">
          <input type="hidden" name="cafeId" value={cafeId} />
          <Field label="نام" name="name" />
          <Field label="اسلاگ" name="slug" dir="ltr" />
          <Field label="ترتیب" name="sortOrder" type="number" defaultValue={categories.length + 1} />
          <div className="flex items-end"><Checkbox name="isActive" label="فعال" /></div>
          <div className="flex items-end"><button className="rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950">افزودن</button></div>
          <label className="space-y-2 md:col-span-5"><span className="text-sm text-coffee-100/70">توضیح</span><input name="description" className={inputClass} /></label>
        </form>

        <div className="space-y-3">
          {categories.map((category) => (
            <form key={category.id} action={updateCategoryAction} className="grid gap-3 rounded-3xl border border-coffee-100/10 bg-coffee-900/35 p-4 md:grid-cols-6">
              <input type="hidden" name="cafeId" value={cafeId} />
              <input type="hidden" name="categoryId" value={category.id} />
              <Field label="نام" name="name" defaultValue={category.name} />
              <Field label="اسلاگ" name="slug" defaultValue={category.slug} dir="ltr" />
              <Field label="ترتیب" name="sortOrder" type="number" defaultValue={category.sortOrder} />
              <div className="flex items-end"><Checkbox name="isActive" label="فعال" defaultChecked={category.isActive} /></div>
              <div className="flex items-end"><button className="rounded-2xl bg-gold-400 px-5 py-3 font-black text-coffee-950">ذخیره</button></div>
              <div className="flex items-end"><button formAction={archiveCategoryAction} className="rounded-2xl bg-red-500/15 px-5 py-3 font-black text-red-100">غیرفعال</button></div>
              <label className="space-y-2 md:col-span-6"><span className="text-sm text-coffee-100/70">توضیح</span><input name="description" defaultValue={category.description ?? ""} className={inputClass} /></label>
            </form>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ProductCreateForm({ cafeId, categories, products, moods }: { cafeId: string; categories: any[]; products: any[]; moods: any[] }) {
  return (
    <Card>
      <CardHeader><CardTitle>محصول جدید</CardTitle></CardHeader>
      <CardContent>
        <ProductForm mode="create" cafeId={cafeId} categories={categories} products={products} moods={moods} action={createProductAction} />
      </CardContent>
    </Card>
  );
}

function ProductList({ cafeId, categories, products, moods }: { cafeId: string; categories: any[]; products: any[]; moods: any[] }) {
  return (
    <Card>
      <CardHeader><CardTitle>محصولات فعلی</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {products.length === 0 ? <p className={muted}>هنوز محصولی ساخته نشده است.</p> : null}
        {products.map((product) => (
          <details key={product.id} className="rounded-3xl border border-coffee-100/10 bg-coffee-900/35 p-4" open={false}>
            <summary className="flex cursor-pointer flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-black">{product.name}</h2>
                <p className="mt-1 text-sm text-coffee-100/60">{product.category?.name ?? "بدون دسته‌بندی"}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-gold-400/12 px-3 py-1 font-black text-gold-400">{formatToman(product.price)}</span>
                <span className={`rounded-full px-3 py-1 ${product.isAvailable ? "bg-emerald-400/12 text-emerald-200" : "bg-red-400/12 text-red-200"}`}>{product.isAvailable ? "موجود" : "ناموجود"}</span>
                <span className="rounded-full bg-coffee-700 px-3 py-1">{product.isActive ? "فعال" : "غیرفعال"}</span>
              </div>
            </summary>
            <div className="mt-5 border-t border-coffee-100/10 pt-5">
              <ProductForm mode="edit" product={product} cafeId={cafeId} categories={categories} products={products} moods={moods} action={updateProductAction} />
            </div>
          </details>
        ))}
      </CardContent>
    </Card>
  );
}

function ProductForm({ mode, product, cafeId, categories, products, moods, action }: { mode: "create" | "edit"; product?: any; cafeId: string; categories: any[]; products: any[]; moods: any[]; action: (formData: FormData) => Promise<void> }) {
  const selectedMoodIds = new Set((product?.moods ?? []).map((item: any) => item.moodId));
  const selectedRecommendationIds = new Set((product?.recommendations ?? []).map((item: any) => item.recommendedProductId));
  const profile = product?.profile;
  const story = product?.story;

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="cafeId" value={cafeId} />
      {product ? <input type="hidden" name="productId" value={product.id} /> : null}

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="نام محصول" name="name" defaultValue={product?.name} />
        <Field label="اسلاگ" name="slug" defaultValue={product?.slug} dir="ltr" />
        <label className="space-y-2"><span className="text-sm text-coffee-100/70">دسته‌بندی</span><select name="categoryId" defaultValue={product?.categoryId ?? ""} className={inputClass}><option value="">بدون دسته‌بندی</option>{categories.filter((category) => category.isActive).map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
        <Field label="قیمت" name="price" type="number" defaultValue={product?.price ?? 0} />
        <Field label="قیمت تخفیف" name="discountPrice" type="number" defaultValue={product?.discountPrice} />
        <Field label="ترتیب" name="sortOrder" type="number" defaultValue={product?.sortOrder ?? 0} />
        <Field label="عکس URL" name="imageUrl" defaultValue={product?.imageUrl} dir="ltr" />
        <Field label="ویدیو URL" name="videoUrl" defaultValue={product?.videoUrl} dir="ltr" />
        <label className="space-y-2"><span className="text-sm text-coffee-100/70">دما</span><select name="temperatureType" defaultValue={profile?.temperatureType ?? "hot"} className={inputClass}><option value="hot">گرم</option><option value="cold">سرد</option><option value="both">هر دو</option></select></label>
      </div>

      <label className="space-y-2 block"><span className="text-sm text-coffee-100/70">توضیحات کوتاه</span><textarea name="description" defaultValue={product?.description ?? ""} rows={3} className={inputClass} /></label>

      <div className="grid gap-3 md:grid-cols-5">
        <Checkbox name="isActive" label="فعال" defaultChecked={product?.isActive ?? true} />
        <Checkbox name="isAvailable" label="موجود" defaultChecked={product?.isAvailable ?? true} />
        <Checkbox name="isFeatured" label="ویژه" defaultChecked={product?.isFeatured ?? false} />
        <Checkbox name="isNew" label="جدید" defaultChecked={product?.isNew ?? false} />
        <Checkbox name="isPopularManual" label="محبوب" defaultChecked={product?.isPopularManual ?? false} />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Field label="شیرینی ۰ تا ۵" name="sweetnessLevel" type="number" defaultValue={profile?.sweetnessLevel ?? 0} />
        <Field label="تلخی ۰ تا ۵" name="bitternessLevel" type="number" defaultValue={profile?.bitternessLevel ?? 0} />
        <Field label="کافئین ۰ تا ۵" name="caffeineLevel" type="number" defaultValue={profile?.caffeineLevel ?? 0} />
        <Field label="کالری" name="calories" type="number" defaultValue={profile?.calories} />
        <Field label="دمای سرو" name="servingTemperature" defaultValue={profile?.servingTemperature} />
        <Field label="خاستگاه" name="originCountry" defaultValue={story?.originCountry} />
        <Field label="مواد تشکیل‌دهنده" name="ingredients" defaultValue={story?.ingredients} />
        <Field label="روش تهیه" name="preparationMethod" defaultValue={story?.preparationMethod} />
      </div>

      <label className="space-y-2 block"><span className="text-sm text-coffee-100/70">داستان کوتاه محصول</span><textarea name="shortStory" defaultValue={story?.shortStory ?? ""} rows={3} className={inputClass} /></label>
      <label className="space-y-2 block"><span className="text-sm text-coffee-100/70">تاریخچه / توضیح کامل</span><textarea name="history" defaultValue={story?.history ?? ""} rows={3} className={inputClass} /></label>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-coffee-100/10 bg-coffee-900/30 p-4">
          <h3 className="mb-3 font-black">مودهای مرتبط</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {moods.map((mood) => <Checkbox key={mood.id} name="moodIds" label={`${mood.icon ?? ""} ${mood.title}`} defaultChecked={selectedMoodIds.has(mood.id)} />)}
          </div>
        </div>
        <div className="rounded-3xl border border-coffee-100/10 bg-coffee-900/30 p-4">
          <h3 className="mb-3 font-black">پیشنهاد مکمل</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {products.filter((item) => item.id !== product?.id).map((item) => <Checkbox key={item.id} name="recommendedProductIds" label={item.name} defaultChecked={selectedRecommendationIds.has(item.id)} />)}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="rounded-2xl bg-gold-400 px-6 py-3 font-black text-coffee-950">{mode === "create" ? "ساخت محصول" : "ذخیره محصول"}</button>
        {product ? <button formAction={archiveProductAction} className="rounded-2xl bg-red-500/15 px-6 py-3 font-black text-red-100">غیرفعال کردن</button> : null}
      </div>
    </form>
  );
}
