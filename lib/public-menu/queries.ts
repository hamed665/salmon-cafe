import { CafeStatus } from "@prisma/client";
import { database } from "@/lib/database/client";
import type { Cafe, Category, MoodKey, Product } from "@/types/app";

const fallbackCover = "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1400&auto=format&fit=crop";
const fallbackProductImage = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=900&auto=format&fit=crop";

function logoText(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "SC";
}

function mapCafe(cafe: any): Cafe {
  return {
    id: cafe.id,
    name: cafe.name,
    slug: cafe.slug,
    description: cafe.description || "منوی هوشمند و تجربه دیجیتال کافه",
    address: cafe.address || "",
    phone: cafe.phone || "",
    instagramUrl: cafe.instagramUrl || "",
    coverImage: cafe.coverUrl || fallbackCover,
    logoText: logoText(cafe.name),
    status: cafe.status === CafeStatus.ACTIVE ? "active" : cafe.status === CafeStatus.DISABLED ? "disabled" : "draft"
  };
}

function mapCategory(category: any): Category {
  return {
    id: category.id,
    cafeId: category.cafeId,
    name: category.name,
    slug: category.slug
  };
}

export function mapProduct(product: any): Product {
  const profile = product.profile;
  const story = product.story;

  return {
    id: product.id,
    cafeId: product.cafeId,
    categoryId: product.categoryId || "",
    name: product.name,
    slug: product.slug,
    description: product.description || "",
    price: product.discountPrice || product.price || 0,
    image: product.imageUrl || fallbackProductImage,
    isAvailable: product.isAvailable,
    isPopular: Boolean(product.isPopularManual || product.isFeatured),
    moodKeys: (product.moods || []).map((item: any) => item.mood?.key).filter(Boolean) as MoodKey[],
    profile: {
      sweetness: profile?.sweetnessLevel ?? 0,
      bitterness: profile?.bitternessLevel ?? 0,
      caffeine: profile?.caffeineLevel ?? 0,
      temperature: profile?.temperatureType === "cold" ? "cold" : "hot"
    },
    story: {
      origin: story?.originCountry || "",
      ingredients: story?.ingredients || "",
      preparation: story?.preparationMethod || "",
      shortStory: story?.shortStory || product.description || ""
    },
    recommendations: (product.recommendations || []).map((item: any) => item.recommendedProductId).filter(Boolean)
  };
}

export async function getPublicCafeMenu(cafeSlug: string) {
  const cafe = await database.cafe.findFirst({
    where: { slug: cafeSlug, status: CafeStatus.ACTIVE, isPublished: true },
    include: {
      settings: true,
      categories: { where: { isActive: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] },
      products: {
        where: { isActive: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        include: {
          profile: true,
          story: true,
          moods: { include: { mood: true } },
          recommendations: { where: { isActive: true }, orderBy: { sortOrder: "asc" } }
        }
      }
    }
  });

  if (!cafe) return null;

  const products = cafe.products.filter((product) => cafe.settings?.showUnavailableProducts || product.isAvailable);

  return {
    cafe: mapCafe(cafe),
    settings: cafe.settings,
    categories: cafe.categories.map(mapCategory),
    products: products.map(mapProduct),
    rawCafeId: cafe.id
  };
}

export async function getPublicProduct(cafeSlug: string, productSlug: string) {
  const product = await database.product.findFirst({
    where: {
      slug: productSlug,
      isActive: true,
      cafe: { slug: cafeSlug, status: CafeStatus.ACTIVE, isPublished: true }
    },
    include: {
      cafe: true,
      category: true,
      profile: true,
      story: true,
      moods: { include: { mood: true } },
      recommendations: {
        where: { isActive: true },
        include: { recommendedProduct: { include: { profile: true, story: true, moods: { include: { mood: true } }, recommendations: true } } },
        orderBy: { sortOrder: "asc" }
      }
    }
  });

  if (!product) return null;

  return {
    cafe: mapCafe(product.cafe),
    product: mapProduct(product),
    recommendations: product.recommendations.map((item) => mapProduct(item.recommendedProduct)),
    rawCafeId: product.cafeId,
    rawProductId: product.id
  };
}
