import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Auth protection will be connected after Supabase Auth is wired to real users.
  // Keep public menu routes open and prepare dashboard/admin guards for the next PR.
  return NextResponse.next({ request });
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"]
};
