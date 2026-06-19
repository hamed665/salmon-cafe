import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/public-menu/product-card";
import { TasteProfile } from "@/components/public-menu/taste-profile";
import { formatToman } from "@/lib/format";
import { trackPublicEvent } from "@/lib/public-menu/analytics";
import { getPublicProduct } from "@/lib/public-menu/queries";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: { params: Promise<{ cafeSlug: string; productSlug: string }> }) {
  const { cafeSlug, productSlug } = await params;
  const data = await getPublicProduct(cafeSlug, productSlug);

  if (!data) {
    notFound();
  }

  await trackPublicEvent({ cafeId: data.rawCafeId, productId: data.rawProductId, eventType: "product_view", metadata: { source: "product_detail" } });

  const { cafe, product, recommendations } = data;

  return (
    <main className="min-h-screen bg-coffee-900 text-coffee-50">
      <section className="mx-auto w-full max-w-4xl px-5 py-6">
        <Link href={`/m/${cafe.slug}`} className="mb-5 inline-flex items-center gap-2 rounded-full bg-coffee-800/70 px-4 py-2 text-sm text-coffee-100">
          <ArrowRight className="h-4 w-4" /> بازگشت به منو
        </Link>

        <div className="overflow-hidden rounded-[2rem] border border-coffee-100/10 bg-coffee-800/60 shadow-premium">
          <div className="relative aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/70 via-transparent to-transparent" />
          </div>
          <div className="space-y-6 p-5 md:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs text-gold-400">
                  {product.isPopular ? <><Flame className="h-4 w-4" /> محبوب کافه</> : null}
                </div>
                <h1 className="text-4xl font-black">{product.name}</h1>
                <p className="mt-3 text-sm leading-8 text-coffee-100/75">{product.description}</p>
              </div>
              <div className="w-fit shrink-0 rounded-2xl bg-gold-400/15 px-4 py-3 text-sm font-black text-gold-400">
                {formatToman(product.price)}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-coffee-100/10 bg-coffee-900/40 p-4">
                <h2 className="mb-4 text-lg font-black">شاخص طعمی</h2>
                <TasteProfile {...product.profile} />
              </div>
              <div className="rounded-3xl border border-coffee-100/10 bg-coffee-900/40 p-4">
                <h2 className="mb-3 text-lg font-black">داستان محصول</h2>
                <p className="text-sm leading-8 text-coffee-100/75">{product.story.shortStory}</p>
              </div>
            </div>

            <dl className="grid gap-3 rounded-3xl border border-coffee-100/10 bg-coffee-900/40 p-4 text-sm text-coffee-100/70 md:grid-cols-3">
              {product.story.ingredients ? <div><dt className="font-bold text-coffee-50">مواد</dt><dd>{product.story.ingredients}</dd></div> : null}
              {product.story.preparation ? <div><dt className="font-bold text-coffee-50">روش تهیه</dt><dd>{product.story.preparation}</dd></div> : null}
              {product.story.origin ? <div><dt className="font-bold text-coffee-50">خاستگاه</dt><dd>{product.story.origin}</dd></div> : null}
            </dl>
          </div>
        </div>
      </section>

      {recommendations.length > 0 ? (
        <section className="mx-auto grid w-full max-w-5xl gap-4 px-5 pb-12 sm:grid-cols-2 lg:grid-cols-3">
          <h2 className="col-span-full text-xl font-black">پیشنهاد مکمل</h2>
          {recommendations.map((recommendedProduct) => <ProductCard key={recommendedProduct.id} product={recommendedProduct} cafeSlug={cafe.slug} />)}
        </section>
      ) : null}
    </main>
  );
}
