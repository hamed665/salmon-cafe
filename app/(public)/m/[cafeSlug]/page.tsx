import { notFound } from "next/navigation";
import { CafeHero } from "@/components/public-menu/cafe-hero";
import { CafeMenuClient } from "@/components/public-menu/cafe-menu-client";
import { demoCategories, getCafeBySlug, getProductsByCafe } from "@/lib/demo-data";

export default async function PublicCafePage({ params }: { params: Promise<{ cafeSlug: string }> }) {
  const { cafeSlug } = await params;
  const cafe = getCafeBySlug(cafeSlug);

  if (!cafe) {
    notFound();
  }

  const products = getProductsByCafe();

  return (
    <main className="min-h-screen bg-coffee-900 text-coffee-50">
      <CafeHero cafe={cafe} />
      <CafeMenuClient cafeSlug={cafe.slug} categories={demoCategories} products={products} />
    </main>
  );
}
