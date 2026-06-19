import { database } from "@/lib/database/client";

type PublicEvent = {
  cafeId: string;
  eventType: "qr_scan" | "menu_view" | "product_view" | "mood_selected" | "recommendation_click" | "search" | "call_click" | "instagram_click" | "direction_click";
  productId?: string | null;
  categoryId?: string | null;
  qrCodeId?: string | null;
  metadata?: Record<string, unknown>;
};

export async function trackPublicEvent(event: PublicEvent) {
  try {
    await database.analyticsEvent.create({
      data: {
        cafeId: event.cafeId,
        eventType: event.eventType,
        productId: event.productId || null,
        categoryId: event.categoryId || null,
        qrCodeId: event.qrCodeId || null,
        metadata: event.metadata || {}
      }
    });
  } catch (error) {
    console.error("Public analytics event failed", error);
  }
}
