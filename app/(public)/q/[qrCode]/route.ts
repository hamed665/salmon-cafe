import { NextRequest, NextResponse } from "next/server";
import { CafeStatus } from "@prisma/client";
import { database } from "@/lib/database/client";
import { trackPublicEvent } from "@/lib/public-menu/analytics";

export const dynamic = "force-dynamic";

function getPublicBaseUrl(request: NextRequest) {
  return process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin || "http://localhost:3000";
}

function getSafeTargetPath(targetUrl: string | null | undefined, fallbackSlug: string) {
  if (!targetUrl) return `/m/${fallbackSlug}`;

  try {
    const parsed = new URL(targetUrl);
    return `${parsed.pathname}${parsed.search}`;
  } catch {
    return targetUrl.startsWith("/") ? targetUrl : `/m/${fallbackSlug}`;
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ qrCode: string }> }) {
  const { qrCode } = await params;

  const qr = await database.qrCode.findFirst({
    where: { code: qrCode, isActive: true, cafe: { status: CafeStatus.ACTIVE, isPublished: true } },
    include: { cafe: { include: { settings: true } } }
  });

  if (!qr) {
    return NextResponse.redirect(new URL("/", getPublicBaseUrl(request)));
  }

  await database.qrCode.update({ where: { id: qr.id }, data: { scanCount: { increment: 1 } } });

  if (qr.cafe.settings?.enableAnalytics ?? true) {
    await trackPublicEvent({ cafeId: qr.cafeId, qrCodeId: qr.id, eventType: "qr_scan", metadata: { code: qr.code } });
  }

  const targetPath = getSafeTargetPath(qr.targetUrl, qr.cafe.slug);
  const url = new URL(targetPath, getPublicBaseUrl(request));
  url.searchParams.set("source", "qr");
  url.searchParams.set("code", qr.code);

  return NextResponse.redirect(url);
}
