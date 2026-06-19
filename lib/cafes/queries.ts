import { UserRole } from "@prisma/client";
import { database } from "@/lib/database/client";
import { isPlatformStaff } from "@/lib/cafes/permissions";

type Actor = {
  id: string;
  role: UserRole;
};

export async function getManageableCafes(actor: Actor) {
  if (isPlatformStaff(actor.role)) {
    return database.cafe.findMany({
      orderBy: { createdAt: "desc" },
      include: { settings: true, owner: true }
    });
  }

  return database.cafe.findMany({
    where: {
      OR: [
        { ownerId: actor.id },
        {
          members: {
            some: {
              userId: actor.id,
              status: "active",
              role: { in: [UserRole.CAFE_OWNER, UserRole.CAFE_MANAGER] }
            }
          }
        }
      ]
    },
    orderBy: { createdAt: "desc" },
    include: { settings: true, owner: true }
  });
}

export async function getPrimaryManageableCafe(actor: Actor) {
  const cafes = await getManageableCafes(actor);
  return cafes[0] ?? null;
}

export async function getCafeWithSettings(cafeId: string) {
  return database.cafe.findUnique({
    where: { id: cafeId },
    include: {
      settings: true,
      owner: {
        select: {
          id: true,
          email: true,
          fullName: true
        }
      }
    }
  });
}
