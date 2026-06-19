"use server";

import { CafeStatus, Prisma, UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireCafeUser } from "@/lib/auth/guards";
import { database } from "@/lib/database/client";
import { assertCanManageCafe } from "@/lib/cafes/permissions";

const optionalText = z
  .string()
  .trim()
  .transform((value) => (value.length > 0 ? value : null));

const cafeSchema = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(80)
    .regex(/^[a-z0-9-]+$/),
  description: optionalText,
  logoUrl: optionalText,
  coverUrl: optionalText,
  phone: optionalText,
  instagramUrl: optionalText,
  websiteUrl: optionalText,
  address: optionalText,
  city: optionalText,
  area: optionalText,
  status: z.nativeEnum(CafeStatus),
  isPublished: z.boolean()
});

function readCafeInput(formData: FormData) {
  return cafeSchema.parse({
    name: formData.get("name")?.toString() ?? "",
    slug: formData.get("slug")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    logoUrl: formData.get("logoUrl")?.toString() ?? "",
    coverUrl: formData.get("coverUrl")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    instagramUrl: formData.get("instagramUrl")?.toString() ?? "",
    websiteUrl: formData.get("websiteUrl")?.toString() ?? "",
    address: formData.get("address")?.toString() ?? "",
    city: formData.get("city")?.toString() ?? "",
    area: formData.get("area")?.toString() ?? "",
    status: formData.get("status")?.toString() ?? CafeStatus.DRAFT,
    isPublished: formData.get("isPublished") === "on"
  });
}

function readBool(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function isUniqueSlugError(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

export async function createCafeAction(formData: FormData) {
  const user = await requireCafeUser();
  const input = readCafeInput(formData);

  try {
    const cafe = await database.cafe.create({
      data: {
        ownerId: user.id,
        ...input,
        members: {
          create: {
            userId: user.id,
            role: UserRole.CAFE_OWNER,
            status: "active"
          }
        },
        settings: {
          create: {
            currency: "IRT",
            textDirection: "rtl",
            showPrices: true,
            showUnavailableProducts: true,
            enableMoodMenu: true,
            enableCoffeeStory: true,
            enableRecommendations: true,
            enableAnalytics: true
          }
        }
      }
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/cafe");
    redirect(`/dashboard/cafe?cafeId=${cafe.id}&saved=created`);
  } catch (error) {
    if (isUniqueSlugError(error)) {
      redirect("/dashboard/cafe?error=slug_taken");
    }
    throw error;
  }
}

export async function updateCafeAction(formData: FormData) {
  const user = await requireCafeUser();
  const cafeId = formData.get("cafeId")?.toString();

  if (!cafeId) {
    redirect("/dashboard/cafe?error=missing_cafe");
  }

  await assertCanManageCafe(user, cafeId);
  const input = readCafeInput(formData);

  try {
    await database.cafe.update({
      where: { id: cafeId },
      data: input
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/cafe");
    revalidatePath(`/m/${input.slug}`);
    redirect(`/dashboard/cafe?cafeId=${cafeId}&saved=profile`);
  } catch (error) {
    if (isUniqueSlugError(error)) {
      redirect(`/dashboard/cafe?cafeId=${cafeId}&error=slug_taken`);
    }
    throw error;
  }
}

export async function updateCafeSettingsAction(formData: FormData) {
  const user = await requireCafeUser();
  const cafeId = formData.get("cafeId")?.toString();

  if (!cafeId) {
    redirect("/dashboard/cafe?error=missing_cafe");
  }

  await assertCanManageCafe(user, cafeId);

  await database.cafeSettings.upsert({
    where: { cafeId },
    update: {
      currency: formData.get("currency")?.toString() || "IRT",
      textDirection: "rtl",
      showPrices: readBool(formData, "showPrices"),
      showUnavailableProducts: readBool(formData, "showUnavailableProducts"),
      enableMoodMenu: readBool(formData, "enableMoodMenu"),
      enableCoffeeStory: readBool(formData, "enableCoffeeStory"),
      enableRecommendations: readBool(formData, "enableRecommendations"),
      enableAnalytics: readBool(formData, "enableAnalytics")
    },
    create: {
      cafeId,
      currency: formData.get("currency")?.toString() || "IRT",
      textDirection: "rtl",
      showPrices: readBool(formData, "showPrices"),
      showUnavailableProducts: readBool(formData, "showUnavailableProducts"),
      enableMoodMenu: readBool(formData, "enableMoodMenu"),
      enableCoffeeStory: readBool(formData, "enableCoffeeStory"),
      enableRecommendations: readBool(formData, "enableRecommendations"),
      enableAnalytics: readBool(formData, "enableAnalytics")
    }
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/cafe");
  redirect(`/dashboard/cafe?cafeId=${cafeId}&saved=settings`);
}
