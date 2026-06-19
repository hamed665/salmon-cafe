import { notFound } from "next/navigation";
import { CafeHero } from "@/components/public-menu/cafe-hero";
import { CafeMenuClient } from "@/components/public-menu/cafe-menu-client";
import { trackPublicEvent } from "@/lib/public-menu/analytics";
import { getPublicCafeMenu } from "@/lib/public-menu/queries";

export const dynamic = "force-dynamic";

export default async function PublicCafePage({ params }: { params: Promise<{ cafeSlug: string }> }) {
  const { cafeSlug } = await params;
  const menu = await getPublicCafeMenu(cafeSlug);

  if (!menu) {
    notFound();
  }

  if (menu.settings?.enableAnalytics ?? true) {
    await trackPublicEvent({ cafeId: menu.rawCafeId, eventType: "menu_view", metadata: { source: "public_menu" } });
  }

  return (
    <main className="min-h-screen bg-coffee-900 text-coffee-50">
      <CafeHero cafe={menu.cafe} />
      <CafeMenuClient cafeSlug={menu.cafe.slug} categories={menu.categories} products={menu.products} />
    </main>
  );
}
