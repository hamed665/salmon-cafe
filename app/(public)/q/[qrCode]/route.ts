import { NextRequest, NextResponse } from "next/server";

const demoQrCodes: Record<string, string> = {
  "demo-cafe-noir": "cafe-noir",
  "CN-DEMO-001": "cafe-noir"
};

export async function GET(request: NextRequest, { params }: { params: Promise<{ qrCode: string }> }) {
  const { qrCode } = await params;
  const cafeSlug = demoQrCodes[qrCode] ?? "cafe-noir";
  const url = new URL(`/m/${cafeSlug}`, request.url);
  url.searchParams.set("source", "qr");
  url.searchParams.set("code", qrCode);

  return NextResponse.redirect(url);
}
