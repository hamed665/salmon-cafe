import { CafeStatus, SubscriptionStatus } from "@prisma/client";
import { database } from "@/lib/database/client";

export async function getAdminDashboardData() {
  const [
    totalUsers,
    totalCafes,
    activeCafes,
    publishedCafes,
    totalProducts,
    totalEvents,
    qrScans,
    menuViews,
    productViews,
    activeSubscriptions,
    paidPayments,
    cafes,
    plans,
    subscriptions,
    payments
  ] = await Promise.all([
    database.user.count(),
    database.cafe.count(),
    database.cafe.count({ where: { status: CafeStatus.ACTIVE } }),
    database.cafe.count({ where: { isPublished: true } }),
    database.product.count(),
    database.analyticsEvent.count(),
    database.analyticsEvent.count({ where: { eventType: "qr_scan" } }),
    database.analyticsEvent.count({ where: { eventType: "menu_view" } }),
    database.analyticsEvent.count({ where: { eventType: "product_view" } }),
    database.subscription.count({ where: { status: SubscriptionStatus.ACTIVE } }),
    database.payment.aggregate({ where: { status: "paid" }, _sum: { amount: true }, _count: true }),
    database.cafe.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
      include: {
        owner: { select: { email: true, fullName: true } },
        subscriptions: { include: { plan: true }, orderBy: { createdAt: "desc" }, take: 1 },
        _count: { select: { products: true, qrCodes: true, events: true } }
      }
    }),
    database.plan.findMany({ orderBy: { monthlyPrice: "asc" } }),
    database.subscription.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: { cafe: true, plan: true }
    }),
    database.payment.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: { cafe: true, subscription: { include: { plan: true } }, actor: true }
    })
  ]);

  return {
    totals: {
      totalUsers,
      totalCafes,
      activeCafes,
      publishedCafes,
      totalProducts,
      totalEvents,
      qrScans,
      menuViews,
      productViews,
      activeSubscriptions,
      paidPaymentCount: paidPayments._count,
      paidPaymentAmount: paidPayments._sum.amount || 0
    },
    cafes,
    plans,
    subscriptions,
    payments
  };
}
