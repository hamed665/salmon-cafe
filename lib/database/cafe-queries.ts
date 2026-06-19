import { CafeStatus } from "@prisma/client";
import { database } from "@/lib/database/client";

export async function getPublishedCafeBySlug(slug: string) {
  return database.cafe.findFirst({
    where: {
      slug,
      status: CafeStatus.ACTIVE,
      isPublished: true
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
    }
  });
}
