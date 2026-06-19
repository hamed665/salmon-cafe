import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireAnyRole(allowedRoles: UserRole[]) {
  const user = await requireUser();

  if (!allowedRoles.includes(user.role)) {
    redirect("/dashboard");
  }

  return user;
}

export async function requireAdmin() {
  return requireAnyRole([UserRole.PLATFORM_ADMIN, UserRole.SUPPORT_ADMIN]);
}

export async function requireCafeUser() {
  return requireAnyRole([UserRole.PLATFORM_ADMIN, UserRole.SUPPORT_ADMIN, UserRole.CAFE_OWNER, UserRole.CAFE_MANAGER]);
}
