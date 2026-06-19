"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireCafeUser } from "@/lib/auth/guards";
import { assertCanManageCafe } from "@/lib/cafes/permissions";
import { database } from "@/lib/database/client";

const toText = (formData: FormData, key: string) => formData.get(key)?.toString().trim() || "";
const toNull = (value: string) => (value.length > 0 ? value : null);
const toInt = (value: string, fallback = 0) => Number.parseInt(value || `${fallback}`, 10) || fallback;
const toBool = (formData: FormData, key: string) => formData.get(key) === "on";

function normalizeSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function back(cafeId: string, status: string) {
  redirect(`/dashboard/menu/products?cafeId=${cafeId}&saved=${status}`);
}

async function assertCategory(cafeId: string, categoryId: string | null) {
  if (!categoryId) return;
  const exists = await database.category.findFirst({ where: { id: categoryId, cafeId }, select: { id: true } });
  if (!exists) throw new Error("Invalid category for cafe");
}

export async function createCategoryAction(formData: FormData) {
  const user = await requireCafeUser();
  const cafeId = toText(formData, "cafeId");
  await assertCanManageCafe(user, cafeId);

  await database.category.create({
    data: {
      cafeId,
      name: toText(formData, "name"),
      slug: normalizeSlug(toText(formData, "slug")),
      description: toNull(toText(formData, "description")),
      sortOrder: toInt(toText(formData, "sortOrder")),
      isActive: toBool(formData, "isActive")
    }
  });

  revalidatePath("/dashboard/menu/products");
  back(cafeId, "category_created");
}

export async function updateCategoryAction(formData: FormData) {
  const user = await requireCafeUser();
  const cafeId = toText(formData, "cafeId");
  const categoryId = toText(formData, "categoryId");
  await assertCanManageCafe(user, cafeId);

  await database.category.update({
    where: { id: categoryId },
    data: {
      name: toText(formData, "name"),
      slug: normalizeSlug(toText(formData, "slug")),
      description: toNull(toText(formData, "description")),
      sortOrder: toInt(toText(formData, "sortOrder")),
      isActive: toBool(formData, "isActive")
    }
  });

  revalidatePath("/dashboard/menu/products");
  back(cafeId, "category_updated");
}

export async function archiveCategoryAction(formData: FormData) {
  const user = await requireCafeUser();
  const cafeId = toText(formData, "cafeId");
  const categoryId = toText(formData, "categoryId");
  await assertCanManageCafe(user, cafeId);
  await database.category.update({ where: { id: categoryId }, data: { isActive: false } });
  revalidatePath("/dashboard/menu/products");
  back(cafeId, "category_archived");
}

async function writeProductRelations(productId: string, cafeId: string, formData: FormData) {
  const moodIds = formData.getAll("moodIds").map(String).filter(Boolean);
  const recommendedIds = formData.getAll("recommendedProductIds").map(String).filter((id) => id && id !== productId);

  await database.productMood.deleteMany({ where: { productId } });
  for (const moodId of moodIds) {
    await database.productMood.create({ data: { productId, moodId, weight: 1 } });
  }

  await database.productRecommendation.deleteMany({ where: { cafeId, productId } });
  for (const [index, recommendedProductId] of recommendedIds.entries()) {
    await database.productRecommendation.create({ data: { cafeId, productId, recommendedProductId, reason: "پیشنهاد مکمل", sortOrder: index + 1, isActive: true } });
  }
}

function productData(formData: FormData) {
  return {
    name: toText(formData, "name"),
    slug: normalizeSlug(toText(formData, "slug")),
    description: toNull(toText(formData, "description")),
    price: toInt(toText(formData, "price")),
    discountPrice: toNull(toText(formData, "discountPrice")) ? toInt(toText(formData, "discountPrice")) : null,
    imageUrl: toNull(toText(formData, "imageUrl")),
    videoUrl: toNull(toText(formData, "videoUrl")),
    categoryId: toNull(toText(formData, "categoryId")),
    isActive: toBool(formData, "isActive"),
    isAvailable: toBool(formData, "isAvailable"),
    isFeatured: toBool(formData, "isFeatured"),
    isNew: toBool(formData, "isNew"),
    isPopularManual: toBool(formData, "isPopularManual"),
    sortOrder: toInt(toText(formData, "sortOrder"))
  };
}

function profileData(formData: FormData) {
  return {
    sweetnessLevel: toInt(toText(formData, "sweetnessLevel")),
    bitternessLevel: toInt(toText(formData, "bitternessLevel")),
    caffeineLevel: toInt(toText(formData, "caffeineLevel")),
    temperatureType: toText(formData, "temperatureType") || "hot",
    servingTemperature: toNull(toText(formData, "servingTemperature")),
    calories: toNull(toText(formData, "calories")) ? toInt(toText(formData, "calories")) : null
  };
}

function storyData(formData: FormData) {
  return {
    originCountry: toNull(toText(formData, "originCountry")),
    ingredients: toNull(toText(formData, "ingredients")),
    preparationMethod: toNull(toText(formData, "preparationMethod")),
    shortStory: toNull(toText(formData, "shortStory")),
    history: toNull(toText(formData, "history"))
  };
}

export async function createProductAction(formData: FormData) {
  const user = await requireCafeUser();
  const cafeId = toText(formData, "cafeId");
  const baseData = productData(formData);
  await assertCanManageCafe(user, cafeId);
  await assertCategory(cafeId, baseData.categoryId);

  const product = await database.product.create({ data: { cafeId, ...baseData, profile: { create: profileData(formData) }, story: { create: storyData(formData) } } });
  await writeProductRelations(product.id, cafeId, formData);
  revalidatePath("/dashboard/menu/products");
  back(cafeId, "product_created");
}

export async function updateProductAction(formData: FormData) {
  const user = await requireCafeUser();
  const cafeId = toText(formData, "cafeId");
  const productId = toText(formData, "productId");
  const baseData = productData(formData);
  await assertCanManageCafe(user, cafeId);
  await assertCategory(cafeId, baseData.categoryId);

  await database.product.update({ where: { id: productId }, data: { ...baseData, profile: { upsert: { create: profileData(formData), update: profileData(formData) } }, story: { upsert: { create: storyData(formData), update: storyData(formData) } } } });
  await writeProductRelations(productId, cafeId, formData);
  revalidatePath("/dashboard/menu/products");
  back(cafeId, "product_updated");
}

export async function archiveProductAction(formData: FormData) {
  const user = await requireCafeUser();
  const cafeId = toText(formData, "cafeId");
  const productId = toText(formData, "productId");
  await assertCanManageCafe(user, cafeId);
  await database.product.update({ where: { id: productId }, data: { isActive: false, isAvailable: false } });
  revalidatePath("/dashboard/menu/products");
  back(cafeId, "product_archived");
}
