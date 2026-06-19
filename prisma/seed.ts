import { CafeStatus, PrismaClient, SubscriptionStatus, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@salmon-cafe.local" },
    update: { role: UserRole.PLATFORM_ADMIN },
    create: { email: "admin@salmon-cafe.local", fullName: "ادمین Salmon Cafe", role: UserRole.PLATFORM_ADMIN }
  });

  const owner = await prisma.user.upsert({
    where: { email: "owner@salmon-cafe.local" },
    update: { role: UserRole.CAFE_OWNER },
    create: { email: "owner@salmon-cafe.local", fullName: "مالک کافه دمو", role: UserRole.CAFE_OWNER }
  });

  const starter = await upsertPlan("starter", "Starter", 590000, 5900000, 50, false, false, true, false);
  const pro = await upsertPlan("pro", "Pro", 990000, 9900000, 150, true, true, true, false);
  await upsertPlan("premium", "Premium", 2500000, 25000000, 500, true, true, true, true);

  const moods = await Promise.all([
    upsertMood("energetic", "پرانرژی", "⚡", 1),
    upsertMood("calm", "آرام", "🌿", 2),
    upsertMood("sleepy", "خواب‌آلود", "🌙", 3),
    upsertMood("study", "مطالعه", "📚", 4),
    upsertMood("work", "کار", "💻", 5),
    upsertMood("date", "قرار", "❤️", 6)
  ]);
  const moodByKey = Object.fromEntries(moods.map((mood) => [mood.key, mood]));

  const cafe = await prisma.cafe.upsert({
    where: { slug: "cafe-noir" },
    update: { ownerId: owner.id, status: CafeStatus.ACTIVE, isPublished: true },
    create: {
      ownerId: owner.id,
      name: "کافه نوار",
      slug: "cafe-noir",
      description: "منوی هوشمند دمو برای نمایش تجربه پریمیوم Salmon Cafe.",
      phone: "02100000000",
      instagramUrl: "https://instagram.com",
      address: "تهران، خیابان ولیعصر، حوالی پارک ساعی",
      city: "تهران",
      area: "ولیعصر",
      status: CafeStatus.ACTIVE,
      isPublished: true
    }
  });

  await prisma.cafeSettings.upsert({
    where: { cafeId: cafe.id },
    update: { enableMoodMenu: true, enableCoffeeStory: true, enableRecommendations: true, enableAnalytics: true },
    create: { cafeId: cafe.id, currency: "IRT", textDirection: "rtl", enableMoodMenu: true, enableCoffeeStory: true, enableRecommendations: true, enableAnalytics: true }
  });

  await prisma.cafeMember.upsert({
    where: { cafeId_userId: { cafeId: cafe.id, userId: owner.id } },
    update: { role: UserRole.CAFE_OWNER, status: "active" },
    create: { cafeId: cafe.id, userId: owner.id, role: UserRole.CAFE_OWNER, status: "active" }
  });

  const coffee = await upsertCategory(cafe.id, "coffee", "قهوه", 1);
  const cold = await upsertCategory(cafe.id, "cold", "نوشیدنی سرد", 2);
  const dessert = await upsertCategory(cafe.id, "dessert", "دسر", 3);
  await upsertCategory(cafe.id, "breakfast", "صبحانه", 4);

  const iceLatte = await upsertProduct(cafe.id, cold.id, "ice-latte", "آیس لاته", "اسپرسو، شیر سرد و یخ؛ انتخابی نرم و محبوب برای روزهای شلوغ.", 180000, "cold", 2, 2, 3, ["work", "date", "calm"], moodByKey);
  const espresso = await upsertProduct(cafe.id, coffee.id, "espresso", "اسپرسو سینگل", "قهوه غلیظ، کوتاه و مستقیم با تلخی بالا و رایحه واضح.", 95000, "hot", 1, 5, 4, ["energetic", "work", "study"], moodByKey);
  const cheesecake = await upsertProduct(cafe.id, dessert.id, "blueberry-cheesecake", "چیزکیک بلوبری", "چیزکیک نرم با سس بلوبری، مناسب کنار نوشیدنی‌های سرد.", 210000, "cold", 4, 1, 0, ["date", "calm"], moodByKey);
  const cookie = await upsertProduct(cafe.id, dessert.id, "chocolate-cookie", "کوکی شکلاتی", "کوکی گرم با تکه‌های شکلات، مناسب کنار اسپرسو و آمریکانو.", 85000, "hot", 4, 1, 0, ["study", "work", "calm"], moodByKey);

  await upsertRecommendation(cafe.id, iceLatte.id, cheesecake.id, "پیشنهاد مکمل کنار آیس لاته", 1);
  await upsertRecommendation(cafe.id, iceLatte.id, cookie.id, "پیشنهاد سبک و شیرین", 2);
  await upsertRecommendation(cafe.id, espresso.id, cookie.id, "تعادل شیرینی و تلخی", 1);
  await upsertRecommendation(cafe.id, cheesecake.id, iceLatte.id, "نوشیدنی مناسب کنار چیزکیک", 1);

  const qr = await prisma.qrCode.upsert({
    where: { code: "demo-cafe-noir" },
    update: { cafeId: cafe.id, targetUrl: "/m/cafe-noir", isActive: true },
    create: { cafeId: cafe.id, code: "demo-cafe-noir", type: "cafe", targetUrl: "/m/cafe-noir", isActive: true }
  });

  await prisma.subscription.upsert({
    where: { id: "demo-subscription-cafe-noir" },
    update: { cafeId: cafe.id, planId: pro.id, status: SubscriptionStatus.ACTIVE, paymentStatus: "paid" },
    create: { id: "demo-subscription-cafe-noir", cafeId: cafe.id, planId: pro.id, status: SubscriptionStatus.ACTIVE, paymentStatus: "paid", renewalType: "manual" }
  });

  await prisma.payment.upsert({
    where: { id: "demo-payment-cafe-noir" },
    update: { cafeId: cafe.id, amount: pro.monthlyPrice, status: "paid", actorId: admin.id },
    create: { id: "demo-payment-cafe-noir", cafeId: cafe.id, amount: pro.monthlyPrice, currency: "IRT", method: "manual", status: "paid", actorId: admin.id }
  });

  const session = await prisma.visitorSession.create({ data: { anonymousId: "demo-session-001", cafeId: cafe.id, deviceType: "mobile", referrer: "qr" } });
  await prisma.analyticsEvent.createMany({
    data: [
      { cafeId: cafe.id, qrCodeId: qr.id, sessionId: session.id, eventType: "qr_scan", metadata: { code: "demo-cafe-noir" } },
      { cafeId: cafe.id, sessionId: session.id, eventType: "menu_view", metadata: { source: "seed" } },
      { cafeId: cafe.id, productId: iceLatte.id, sessionId: session.id, eventType: "product_view", metadata: { source: "seed" } },
      { cafeId: cafe.id, productId: cheesecake.id, sessionId: session.id, eventType: "product_view", metadata: { source: "seed" } }
    ]
  });

  console.log("Seed completed", { cafe: cafe.slug, owner: owner.email, firstPlan: starter.key });
}

async function upsertPlan(key: string, name: string, monthlyPrice: number, yearlyPrice: number, maxProducts: number, enableMoodMenu: boolean, enableRecommendations: boolean, enableAnalytics: boolean, enableCustomTheme: boolean) {
  return prisma.plan.upsert({
    where: { key },
    update: { name, monthlyPrice, yearlyPrice, maxProducts, enableMoodMenu, enableRecommendations, enableAnalytics, enableCustomTheme, isActive: true },
    create: { key, name, monthlyPrice, yearlyPrice, maxProducts, enableMoodMenu, enableRecommendations, enableAnalytics, enableCustomTheme, isActive: true }
  });
}

async function upsertMood(key: string, title: string, icon: string, sortOrder: number) {
  return prisma.mood.upsert({ where: { key }, update: { title, icon, sortOrder, isActive: true }, create: { key, title, icon, sortOrder, isActive: true } });
}

async function upsertCategory(cafeId: string, slug: string, name: string, sortOrder: number) {
  return prisma.category.upsert({ where: { cafeId_slug: { cafeId, slug } }, update: { name, sortOrder, isActive: true }, create: { cafeId, slug, name, sortOrder, isActive: true } });
}

async function upsertProduct(cafeId: string, categoryId: string, slug: string, name: string, description: string, price: number, temperatureType: string, sweetnessLevel: number, bitternessLevel: number, caffeineLevel: number, moodKeys: string[], moodByKey: Record<string, { id: string }>) {
  const product = await prisma.product.upsert({
    where: { cafeId_slug: { cafeId, slug } },
    update: { categoryId, name, description, price, isActive: true, isAvailable: true },
    create: { cafeId, categoryId, slug, name, description, price, isActive: true, isAvailable: true }
  });

  await prisma.productProfile.upsert({
    where: { productId: product.id },
    update: { sweetnessLevel, bitternessLevel, caffeineLevel, temperatureType },
    create: { productId: product.id, sweetnessLevel, bitternessLevel, caffeineLevel, temperatureType }
  });

  await prisma.productStory.upsert({
    where: { productId: product.id },
    update: { shortStory: description },
    create: { productId: product.id, shortStory: description }
  });

  for (const key of moodKeys) {
    const mood = moodByKey[key];
    if (!mood) continue;
    await prisma.productMood.upsert({ where: { productId_moodId: { productId: product.id, moodId: mood.id } }, update: { weight: 1 }, create: { productId: product.id, moodId: mood.id, weight: 1 } });
  }

  return product;
}

async function upsertRecommendation(cafeId: string, productId: string, recommendedProductId: string, reason: string, sortOrder: number) {
  const existing = await prisma.productRecommendation.findFirst({ where: { cafeId, productId, recommendedProductId } });
  if (existing) {
    return prisma.productRecommendation.update({ where: { id: existing.id }, data: { reason, sortOrder, isActive: true } });
  }
  return prisma.productRecommendation.create({ data: { cafeId, productId, recommendedProductId, reason, sortOrder, isActive: true } });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
