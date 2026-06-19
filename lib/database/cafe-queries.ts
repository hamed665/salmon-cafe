import { CafeStatus } from "@prisma/client";
import { database } from "@/lib/database/client";

export async function getPublishedCafeBySlug(slug: string) {
  return database.cafe.findFirst({
    where: {
      slug,
      status: CafeStatus.ACTIVE,
      isPublished: true
    },
    include: {
      settings: true,
      categories: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" }
      },
      products: {
        where: { isActive: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        include: {
          profile: true,
          story: true,
          moods: { include: { mood: true } },
          recommendations: {
            where: { isActive: true },
            include: { recommendedProduct: { include: { profile: true, story: true } } },
            orderBy: { sortOrder: "asc" }
          }
        }
      },
      qrCodes: {
        where: { isActive: true }
      }
    }
  });
}

export async function getPublishedProductBySlug(cafeSlug: string, productSlug: string) {
  return database.product.findFirst({
    where: {
      slug: productSlug,
      isActive: true,
      cafe: {
        slug: cafeSlug,
        status: CafeStatus.ACTIVE,
        isPublished: true
      }
    },
    include: {
      cafe: true,
      category: true,
      profile: true,
      story: true,
      moods: { include: { mood: true } },
      recommendations: {
        where: { isActive: true },
        include: { recommendedProduct: { include: { profile: true, story: true } } },
        orderBy: { sortOrder: "asc" }
      }
    }
  });
}
