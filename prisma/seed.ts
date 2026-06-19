import { PrismaClient, CafeStatus, SubscriptionStatus, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@salmon-cafe.local" },
    update: {},
    create: {
      fullName: "ادمین Salmon Cafe",
      email: "admin@salmon-cafe.local",
      role: UserRole.PLATFORM_ADMIN
    }
  });

  const owner = await prisma.user.upsert({
    where: { email: "owner@salmon-cafe.local" },
    update: {},
    create: {
      fullName: "مالک کافه دمو",
      email: "owner@salmon-cafe.local",
      role: UserRole.CAFE_OWNER
    }
  });

  const starter = await prisma.plan.upsert({
    where: { key: "starter" },
    update: {},
    create: {
      name: "Starter",
      key: "starter",
      monthlyPrice: 590000,
      yearlyPrice: 5900000,
      maxProducts: 50,
      enableMoodMenu: false,
      enableRecommendations: false,
      enableAnalytics: true
    }
  });

  const pro = await prisma.plan.upsert({
    where: { key: "pro" },
    update: {},
    create: {
      name: "Pro",
      key: "pro",
      monthlyPrice: 990000,
      yearlyPrice: 9900000,
      maxProducts: 150,
      enableMoodMenu: true,
      enableRecommendations: true,
      enableAnalytics: true
    }
  });

  await prisma.plan.upsert({
    where: { key: "premium" },
    update: {},
    create: {
      name: "Premium",
      key: "premium",
      monthlyPrice: 2500000,
      yearlyPrice: 25000000,
      maxProducts: 500,
      enableMoodMenu: true,
      enableRecommendations: true,
      enableAnalytics: true,
      enableCustomTheme: true
    }
  });

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
    update: {},
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
    update: {},
    create: {
      cafeId: cafe.id,
      currency: "IRT",
      textDirection: "rtl",
      showPrices: true,
      enableMoodMenu: true,
      enableCoffeeStory: true,
      enableRecommendations: true,
      enableAnalytics: true
    }
  });

  await prisma.cafeMember.upsert({
    where: { cafeId_userId: { cafeId: cafe.id, userId: owner.id } },
    update: {},
    create: {
      cafeId: cafe.id,
      userId: owner.id,
      role: UserRole.CAFE_OWNER
    }
  });

  const coffee = await upsertCategory(cafe.id, "coffee", "قهوه", 1);
  const cold = await upsertCategory(cafe.id, "cold", "نوشیدنی سرد", 2);
  const dessert = await upsertCategory(cafe.id, "dessert", "دسر", 3);
  await upsertCategory(cafe.id, "breakfast", "صبحانه", 4);

  const iceLatte = await upsertProduct({
    cafeId: cafe.id,
    categoryId: cold.id,
    slug: "ice-latte",
    name: "آیس لاته",
    description: "اسپرسو، شیر سرد و یخ؛ انتخابی نرم و محبوب برای روزهای شلوغ.",
    price: 180000,
    imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=900&auto=format&fit=crop",
    sweetnessLevel: 2,
    bitternessLevel: 2,
    caffeineLevel: 3,
    temperatureType: "cold",
    originCountry: "ایتالیا",
    ingredients: "اسپرسو، شیر سرد، یخ",
    preparationMethod: "اسپرسو تازه روی شیر سرد و یخ ریخته می‌شود.",
    shortStory: "لاته سرد انتخابی ملایم و متعادل برای کسانی است که طعم قهوه را با بافت نرم شیر ترجیح می‌دهند.",
    moodKeys: ["work", "date", "calm"],
    moodByKey
  });

  const espresso = await upsertProduct({
    cafeId: cafe.id,
    categoryId: coffee.id,
    slug: "espresso",
    name: "اسپرسو سینگل",
    description: "قهوه غلیظ، کوتاه و مستقیم با تلخی بالا و رایحه واضح.",
    price: 95000,
    imageUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=900&auto=format&fit=crop",
    sweetnessLevel: 1,
    bitternessLevel: 5,
    caffeineLevel: 4,
    temperatureType: "hot",
    originCountry: "ایتالیا",
    ingredients: "قهوه عربیکا و روبوستا",
    preparationMethod: "عصاره‌گیری کوتاه با فشار بالا.",
    shortStory: "اسپرسو پایه بسیاری از نوشیدنی‌های قهوه است و برای تجربه طعم غلیظ و متمرکز قهوه سرو می‌شود.",
    moodKeys: ["energetic", "work", "study"],
    moodByKey
  });

  const cheesecake = await upsertProduct({
    cafeId: cafe.id,
    categoryId: dessert.id,
    slug: "blueberry-cheesecake",
    name: "چیزکیک بلوبری",
    description: "چیزکیک نرم با سس بلوبری، مناسب کنار نوشیدنی‌های سرد.",
    price: 210000,
    imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=900&auto=format&fit=crop",
    sweetnessLevel: 4,
    bitternessLevel: 1,
    caffeineLevel: 0,
    temperatureType: "cold",
    originCountry: "آمریکا",
    ingredients: "پنیر خامه‌ای، بیسکوییت، بلوبری",
    preparationMethod: "لایه بیسکوییت، کرم پنیر و سس بلوبری سرد سرو می‌شود.",
    shortStory: "چیزکیک بلوبری یک دسر خامه‌ای و میوه‌ای است که با نوشیدنی‌های سرد و قهوه‌های شیری هماهنگی خوبی دارد.",
    moodKeys: ["date", "calm"],
    moodByKey
  });

  const cookie = await upsertProduct({
    cafeId: cafe.id,
    categoryId: dessert.id,
    slug: "chocolate-cookie",
    name: "کوکی شکلاتی",
    description: "کوکی گرم با تکه‌های شکلات، مناسب کنار اسپرسو و آمریکانو.",
    price: 85000,
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=900&auto=format&fit=crop",
    sweetnessLevel: 4,
    bitternessLevel: 1,
    caffeineLevel: 0,
    temperatureType: "hot",
    originCountry: "آمریکا",
    ingredients: "آرد، کره، شکلات، شکر قهوه‌ای",
    preparationMethod: "روزانه پخته و گرم سرو می‌شود.",
    shortStory: "کوکی شکلاتی با بافت نرم و طعم شیرین، مکمل خوبی برای نوشیدنی‌های تلخ‌تر مانند اسپرسو است.",
    moodKeys: ["study", "work", "calm"],
    moodByKey
  });

  await upsertRecommendation(cafe.id, iceLatte.id, cheesecake.id, "پیشنهاد مکمل کنار آیس لاته", 1);
  await upsertRecommendation(cafe.id, iceLatte.id, cookie.id, "پیشنهاد سبک و شیرین", 2);
  await upsertRecommendation(cafe.id, espresso.id, cookie.id, "تعادل شیرینی و تلخی", 1);
  await upsertRecommendation(cafe.id, cheesecake.id, iceLatte.id, "نوشیدنی مناسب کنار چیزکیک", 1);

  await prisma.qrCode.upsert({
    where: { code: "demo-cafe-noir" },
    update: { cafeId: cafe.id, targetUrl: "/m/cafe-noir", isActive: true },
    create: {
      cafeId: cafe.id,
      code: "demo-cafe-noir",
      type: "cafe",
      targetUrl: "/m/cafe-noir",
      isActive: true
    }
  });

  await prisma.subscription.upsert({
    where: { id: "demo-subscription-cafe-noir" },
    update: {},
    create: {
      id: "demo-subscription-cafe-noir",
      cafeId: cafe.id,
      planId: pro.id,
      status: SubscriptionStatus.ACTIVE,
      paymentStatus: "paid",
      renewalType: "manual"
    }
  });

  await prisma.payment.upsert({
    where: { id: "demo-payment-cafe-noir" },
    update: {},
    create: {
      id: "demo-payment-cafe-noir",
      cafeId: cafe.id,
      amount: pro.monthlyPrice,
      currency: "IRT",
      method: "manual",
      status: "paid",
      actorId: admin.id
    }
  });

  const session = await prisma.visitorSession.create({
    data: {
      anonymousId: "demo-session-001",
      cafeId: cafe.id,
      deviceType: "mobile",
      referrer: "qr"
    }
  });

  await prisma.analyticsEvent.createMany({
    data: [
      { cafeId: cafe.id, qrCodeId: undefined, sessionId: session.id, eventType: "qr_scan", metadata: { code: "demo-cafe-noir" } },
      { cafeId: cafe.id, sessionId: session.id, eventType: "menu_view", metadata: { source: "seed" } },
      { cafeId: cafe.id, productId: iceLatte.id, sessionId: session.id, eventType: "product_view", metadata: { source: "seed" } },
      { cafeId: cafe.id, productId: cheesecake.id, sessionId: session.id, eventType: "product_view", metadata: { source: "seed" } }
    ]
  });

  console.log("Seed completed", { cafe: cafe.slug, owner: owner.email, plan: starter.key });
}

async function upsertMood(key: string, title: string, icon: string, sortOrder: number) {
  return prisma.mood.upsert({
    where: { key },
    update: { title, icon, sortOrder, isActive: true },
    create: { key, title, icon, sortOrder, isActive: true }
  });
}

async function upsertCategory(cafeId: string, slug: string, name: string, sortOrder: number) {
  return prisma.category.upsert({
    where: { cafeId_slug: { cafeId, slug } },
    update: { name, sortOrder, isActive: true },
    create: { cafeId, slug, name, sortOrder, isActive: true }
  });
}

type UpsertProductInput = {
  cafeId: string;
  categoryId: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  sweetnessLevel: number;
  bitternessLevel: number;
  caffeineLevel: number;
  temperatureType: string;
  originCountry: string;
  ingredients: string;
  preparationMethod: string;
  shortStory: string;
  moodKeys: string[];
  moodByKey: Record<string, { id: string }>;
};

async function upsertProduct(input: UpsertProductInput) {
  const product = await prisma.product.upsert({
    where: { cafeId_slug: { cafeId: input.cafeId, slug: input.slug } },
    update: {
      categoryId: input.categoryId,
      name: input.name,
      description: input.description,
      price: input.price,
      imageUrl: input.imageUrl,
      isActive: true,
      isAvailable: true
    },
    create: {
      cafeId: input.cafeId,
      categoryId: input.categoryId,
      slug: input.slug,
      name: input.name,
      description: input.description,
      price: input.price,
      imageUrl: input.imageUrl,
      isActive: true,
      isAvailable: true
    }
  });

  await prisma.productProfile.upsert({
    where: { productId: product.id },
    update: {
      sweetnessLevel: input.sweetnessLevel,
      bitternessLevel: input.bitternessLevel,
      caffeineLevel: input.caffeineLevel,
      temperatureType: input.temperatureType
    },
    create: {
      productId: product.id,
      sweetnessLevel: input.sweetnessLevel,
      bitternessLevel: input.bitternessLevel,
      caffeineLevel: input.caffeineLevel,
      temperatureType: input.temperatureType
    }
  });

  await prisma.productStory.upsert({
    where: { productId: product.id },
    update: {
      originCountry: input.originCountry,
      ingredients: input.ingredients,
      preparationMethod: input.preparationMethod,
      shortStory: input.shortStory
    },
    create: {
      productId: product.id,
      originCountry: input.originCountry,
      ingredients: input.ingredients,
      preparationMethod: input.preparationMethod,
      shortStory: input.shortStory
    }
  });

  for (const key of input.moodKeys) {
    const mood = input.moodByKey[key];
    if (!mood) continue;
    await prisma.productMood.upsert({
      where: { productId_moodId: { productId: product.id, moodId: mood.id } },
      update: { weight: 1 },
      create: { productId: product.id, moodId: mood.id, weight: 1 }
    });
  }

  return product;
}

async function upsertRecommendation(cafeId: string, productId: string, recommendedProductId: string, reason: string, sortOrder: number) {
  const existing = await prisma.productRecommendation.findFirst({
    where: { cafeId, productId, recommendedProductId }
  });

  if (existing) {
    return prisma.productRecommendation.update({
      where: { id: existing.id },
      data: { reason, sortOrder, isActive: true }
    });
  }

  return prisma.productRecommendation.create({
    data: { cafeId, productId, recommendedProductId, reason, sortOrder, isActive: true }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
