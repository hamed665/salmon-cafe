import type { UserRole } from "@prisma/client";
import { database } from "@/lib/database/client";
import { getManageableCafes } from "@/lib/cafes/queries";

type Actor = {
  id: string;
  role: UserRole;
};

export async function getMenuBuilderData(actor: Actor, requestedCafeId?: string) {
  const cafes = await getManageableCafes(actor);
  const selectedCafe = cafes.find((cafe) => cafe.id === requestedCafeId) ?? cafes[0] ?? null;

  if (!selectedCafe) {
    return {
      cafes,
      selectedCafe: null,
      categories: [],
      products: [],
      moods: []
    };
  }

  const [categories, products, moods] = await Promise.all([
    database.category.findMany({
      where: { cafeId: selectedCafe.id },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      include: { _count: { select: { products: true } } }
    }),
    database.product.findMany({
      where: { cafeId: selectedCafe.id },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      include: {
        category: true,
        profile: true,
        story: true,
        moods: { include: { mood: true } },
        recommendations: {
          where: { isActive: true },
          include: { recommendedProduct: true },
          orderBy: { sortOrder: "asc" }
        }
      }
    }),
    database.mood.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" }
    })
  ]);

  return { cafes, selectedCafe, categories, products, moods };
}
