import { UserRole } from "@prisma/client";
import { database } from "@/lib/database/client";

type Actor = {
  id: string;
  role: UserRole;
};

export function isPlatformStaff(role: UserRole) {
  return role === UserRole.PLATFORM_ADMIN || role === UserRole.SUPPORT_ADMIN;
}

export async function canManageCafe(actor: Actor, cafeId: string) {
  if (isPlatformStaff(actor.role)) return true;

  const ownedCafe = await database.cafe.findFirst({
    where: {
      id: cafeId,
      ownerId: actor.id
    },
    select: { id: true }
  });

  if (ownedCafe) return true;

  const member = await database.cafeMember.findFirst({
    where: {
      cafeId,
      userId: actor.id,
      status: "active",
      role: { in: [UserRole.CAFE_OWNER, UserRole.CAFE_MANAGER] }
    },
    select: { id: true }
  });

  return Boolean(member);
}

export async function assertCanManageCafe(actor: Actor, cafeId: string) {
  const allowed = await canManageCafe(actor, cafeId);
  if (!allowed) {
    throw new Error("You do not have permission to manage this cafe.");
  }
}
