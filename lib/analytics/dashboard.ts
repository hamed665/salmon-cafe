import type { UserRole } from "@prisma/client";
import { database } from "@/lib/database/client";
import { getManageableCafes } from "@/lib/cafes/queries";

type Actor = {
  id: string;
  role: UserRole;
};

export async function getCafeAnalytics(actor: Actor, requestedCafeId?: string) {
  const cafes = await getManageableCafes(actor);
  const selectedCafe = cafes.find((cafe) => cafe.id === requestedCafeId) ?? cafes[0] ?? null;

  if (!selectedCafe) {
    return {
      cafes,
      selectedCafe: null,
      totals: { qrScans: 0, menuViews: 0, productViews: 0, searches: 0, moodSelections: 0, recommendationClicks: 0 },
      topProducts: [],
      qrCodes: [],
      recentEvents: []
    };
  }

  const [qrScans, menuViews, productViews, searches, moodSelections, recommendationClicks, groupedProducts, qrCodes, recentEvents] = await Promise.all([
    database.analyticsEvent.count({ where: { cafeId: selectedCafe.id, eventType: "qr_scan" } }),
    database.analyticsEvent.count({ where: { cafeId: selectedCafe.id, eventType: "menu_view" } }),
    database.analyticsEvent.count({ where: { cafeId: selectedCafe.id, eventType: "product_view" } }),
    database.analyticsEvent.count({ where: { cafeId: selectedCafe.id, eventType: "search" } }),
    database.analyticsEvent.count({ where: { cafeId: selectedCafe.id, eventType: "mood_selected" } }),
    database.analyticsEvent.count({ where: { cafeId: selectedCafe.id, eventType: "recommendation_click" } }),
    database.analyticsEvent.groupBy({
      by: ["productId"],
      where: { cafeId: selectedCafe.id, eventType: "product_view", productId: { not: null } },
      _count: { productId: true },
      orderBy: { _count: { productId: "desc" } },
      take: 8
    }),
    database.qrCode.findMany({ where: { cafeId: selectedCafe.id }, orderBy: { scanCount: "desc" } }),
    database.analyticsEvent.findMany({
      where: { cafeId: selectedCafe.id },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: { product: true, qrCode: true }
    })
  ]);

  const productIds = groupedProducts.map((item) => item.productId).filter(Boolean) as string[];
  const products = productIds.length
    ? await database.product.findMany({ where: { id: { in: productIds } }, select: { id: true, name: true, slug: true } })
    : [];
  const productById = new Map(products.map((product) => [product.id, product]));

  const topProducts = groupedProducts.map((item) => ({
    product: item.productId ? productById.get(item.productId) : null,
    views: item._count.productId
  }));

  return {
    cafes,
    selectedCafe,
    totals: { qrScans, menuViews, productViews, searches, moodSelections, recommendationClicks },
    topProducts,
    qrCodes,
    recentEvents
  };
}
