"use server";

import { CafeStatus, SubscriptionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/guards";
import { database } from "@/lib/database/client";

const text = (formData: FormData, key: string) => formData.get(key)?.toString().trim() || "";
const bool = (formData: FormData, key: string) => formData.get(key) === "on";
const int = (value: string, fallback = 0) => Number.parseInt(value || `${fallback}`, 10) || fallback;
const nullableDate = (value: string) => (value ? new Date(value) : null);

function back(status: string) {
  redirect(`/admin?saved=${status}`);
}

export async function updateCafeAdminAction(formData: FormData) {
  await requireAdmin();
  const cafeId = text(formData, "cafeId");

  await database.cafe.update({
    where: { id: cafeId },
    data: {
      status: text(formData, "status") as CafeStatus,
      isPublished: bool(formData, "isPublished")
    }
  });

  revalidatePath("/admin");
  back("cafe_updated");
}

export async function createPlanAction(formData: FormData) {
  await requireAdmin();

  await database.plan.create({
    data: {
      name: text(formData, "name"),
      key: text(formData, "key").toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      monthlyPrice: int(text(formData, "monthlyPrice")),
      yearlyPrice: int(text(formData, "yearlyPrice")),
      maxProducts: int(text(formData, "maxProducts"), 50),
      maxCafes: int(text(formData, "maxCafes"), 1),
      maxTables: int(text(formData, "maxTables"), 0),
      enableMoodMenu: bool(formData, "enableMoodMenu"),
      enableRecommendations: bool(formData, "enableRecommendations"),
      enableAnalytics: bool(formData, "enableAnalytics"),
      enableCustomTheme: bool(formData, "enableCustomTheme"),
      isActive: bool(formData, "isActive")
    }
  });

  revalidatePath("/admin");
  back("plan_created");
}

export async function updatePlanAction(formData: FormData) {
  await requireAdmin();
  const planId = text(formData, "planId");

  await database.plan.update({
    where: { id: planId },
    data: {
      name: text(formData, "name"),
      monthlyPrice: int(text(formData, "monthlyPrice")),
      yearlyPrice: int(text(formData, "yearlyPrice")),
      maxProducts: int(text(formData, "maxProducts"), 50),
      maxCafes: int(text(formData, "maxCafes"), 1),
      maxTables: int(text(formData, "maxTables"), 0),
      enableMoodMenu: bool(formData, "enableMoodMenu"),
      enableRecommendations: bool(formData, "enableRecommendations"),
      enableAnalytics: bool(formData, "enableAnalytics"),
      enableCustomTheme: bool(formData, "enableCustomTheme"),
      isActive: bool(formData, "isActive")
    }
  });

  revalidatePath("/admin");
  back("plan_updated");
}

export async function assignPlanAction(formData: FormData) {
  await requireAdmin();
  const cafeId = text(formData, "cafeId");
  const planId = text(formData, "planId");

  await database.subscription.updateMany({
    where: { cafeId, status: { in: [SubscriptionStatus.TRIAL, SubscriptionStatus.ACTIVE, SubscriptionStatus.PAST_DUE] } },
    data: { status: SubscriptionStatus.CANCELLED }
  });

  await database.subscription.create({
    data: {
      cafeId,
      planId,
      status: text(formData, "status") as SubscriptionStatus,
      paymentStatus: text(formData, "paymentStatus") || "unpaid",
      renewalType: text(formData, "renewalType") || "manual",
      startsAt: nullableDate(text(formData, "startsAt")) || new Date(),
      endsAt: nullableDate(text(formData, "endsAt"))
    }
  });

  revalidatePath("/admin");
  back("subscription_assigned");
}

export async function recordPaymentAction(formData: FormData) {
  const admin = await requireAdmin();
  const cafeId = text(formData, "cafeId");
  const subscriptionId = text(formData, "subscriptionId") || null;
  const status = text(formData, "status") || "paid";

  await database.payment.create({
    data: {
      cafeId,
      subscriptionId,
      actorId: admin.id,
      amount: int(text(formData, "amount")),
      currency: text(formData, "currency") || "IRT",
      method: text(formData, "method") || "manual",
      status,
      trackingCode: text(formData, "trackingCode") || null,
      paidAt: status === "paid" ? new Date() : null
    }
  });

  if (subscriptionId) {
    await database.subscription.update({
      where: { id: subscriptionId },
      data: { paymentStatus: status === "paid" ? "paid" : status }
    });
  }

  revalidatePath("/admin");
  back("payment_recorded");
}
