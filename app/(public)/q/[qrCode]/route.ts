import { NextRequest, NextResponse } from "next/server";
import { CafeStatus } from "@prisma/client";
import { database } from "@/lib/database/client";
import { trackPublicEvent } from "@/lib/public-menu/analytics";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: Promise<{ qrCode: string }> }) {
  const { qrCode } = await params;

  const qr = await database.qrCode.findFirst({
    where: { code: qrCode, isActive: true, cafe: { status: CafeStatus.ACTIVE, isPublished: true } },
    include: { cafe: { include: { settings: true } } }
  });

  if (!qr) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  await database.qrCode.update({ where: { id: qr.id }, data: { scanCount: { increment: 1 } } });

  if (qr.cafe.settings?.enableAnalytics ?? true) {
    await trackPublicEvent({ cafeId: qr.cafeId, qrCodeId: qr.id, eventType: "qr_scan", metadata: { code: qr.code } });
  }

  const targetPath = qr.targetUrl || `/m/${qr.cafe.slug}`;
  const url = new URL(targetPath, request.url);
  url.searchParams.set("source", "qr");
  url.searchParams.set("code", qr.code);

  return NextResponse.redirect(url);
}
