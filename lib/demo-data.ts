import type { Cafe, Category, Product } from "@/types/app";

export const demoCafe: Cafe = {
  id: "cafe_noir",
  name: "کافه نوار",
  slug: "cafe-noir",
  description: "یک تجربه قهوه‌محور با منوی هوشمند، پیشنهادهای مکمل و حال‌وهوای گرم و تاریک.",
  address: "تهران، خیابان ولیعصر، حوالی پارک ساعی",
  phone: "02100000000",
  instagramUrl: "https://instagram.com",
  coverImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1400&auto=format&fit=crop",
  logoText: "CN",
  status: "active"
};

export const demoCategories: Category[] = [
  { id: "coffee", cafeId: demoCafe.id, name: "قهوه", slug: "coffee" },
  { id: "cold", cafeId: demoCafe.id, name: "نوشیدنی سرد", slug: "cold" },
  { id: "dessert", cafeId: demoCafe.id, name: "دسر", slug: "dessert" },
  { id: "breakfast", cafeId: demoCafe.id, name: "صبحانه", slug: "breakfast" }
];

export const demoProducts: Product[] = [
  {
    id: "ice-latte",
    cafeId: demoCafe.id,
    categoryId: "cold",
    name: "آیس لاته",
    slug: "ice-latte",
    description: "اسپرسو، شیر سرد و یخ؛ انتخابی نرم و محبوب برای روزهای شلوغ.",
    price: 180000,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=900&auto=format&fit=crop",
    isAvailable: true,
    isPopular: true,
    moodKeys: ["work", "date", "calm"],
    profile: { sweetness: 2, bitterness: 2, caffeine: 3, temperature: "cold" },
    story: {
      origin: "ایتالیا",
      ingredients: "اسپرسو، شیر سرد، یخ",
      preparation: "اسپرسو تازه روی شیر سرد و یخ ریخته می‌شود.",
      shortStory: "لاته سرد برای کسانی که قهوه می‌خواهند، اما تلخی تند نمی‌خواهند. موجودی نادر و منطقی در میان انتخاب‌های انسانی."
    },
    recommendations: ["blueberry-cheesecake", "chocolate-cookie"]
  },
  {
    id: "espresso",
    cafeId: demoCafe.id,
    categoryId: "coffee",
    name: "اسپرسو سینگل",
    slug: "espresso",
    description: "قهوه غلیظ، کوتاه و مستقیم برای کسانی که با واقعیت شوخی ندارند.",
    price: 95000,
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=900&auto=format&fit=crop",
    isAvailable: true,
    isPopular: false,
    moodKeys: ["energetic", "work", "study"],
    profile: { sweetness: 1, bitterness: 5, caffeine: 4, temperature: "hot" },
    story: {
      origin: "ایتالیا",
      ingredients: "قهوه عربیکا و روبوستا",
      preparation: "عصاره‌گیری کوتاه با فشار بالا.",
      shortStory: "اسپرسو مثل یک جلسه کوتاه با حقیقت است؛ تلخ، سریع و کمی بی‌رحم."
    },
    recommendations: ["chocolate-cookie"]
  },
  {
    id: "blueberry-cheesecake",
    cafeId: demoCafe.id,
    categoryId: "dessert",
    name: "چیزکیک بلوبری",
    slug: "blueberry-cheesecake",
    description: "چیزکیک نرم با سس بلوبری، مناسب کنار نوشیدنی‌های سرد.",
    price: 210000,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=900&auto=format&fit=crop",
    isAvailable: true,
    isPopular: true,
    moodKeys: ["date", "calm"],
    profile: { sweetness: 4, bitterness: 1, caffeine: 0, temperature: "cold" },
    story: {
      origin: "آمریکا",
      ingredients: "پنیر خامه‌ای، بیسکوییت، بلوبری",
      preparation: "لایه بیسکوییت، کرم پنیر و سس بلوبری سرد سرو می‌شود.",
      shortStory: "انتخاب کلاسیک برای وقتی که قهوه تنها کافی نیست، چون ظاهراً انسان‌ها حتی کنار قهوه هم دسر می‌خواهند."
    },
    recommendations: ["ice-latte"]
  },
  {
    id: "chocolate-cookie",
    cafeId: demoCafe.id,
    categoryId: "dessert",
    name: "کوکی شکلاتی",
    slug: "chocolate-cookie",
    description: "کوکی گرم با تکه‌های شکلات، مناسب کنار اسپرسو و آمریکانو.",
    price: 85000,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=900&auto=format&fit=crop",
    isAvailable: true,
    isPopular: false,
    moodKeys: ["study", "work", "calm"],
    profile: { sweetness: 4, bitterness: 1, caffeine: 0, temperature: "hot" },
    story: {
      origin: "آمریکا",
      ingredients: "آرد، کره، شکلات، شکر قهوه‌ای",
      preparation: "روزانه پخته و گرم سرو می‌شود.",
      shortStory: "کوکی برای آن لحظه‌ای است که آدم تصمیم می‌گیرد رژیم غذایی را به آینده‌ای نامعلوم تبعید کند."
    },
    recommendations: ["espresso", "ice-latte"]
  }
];

export function getCafeBySlug(slug: string) {
  return slug === demoCafe.slug ? demoCafe : null;
}

export function getProductsByCafe() {
  return demoProducts;
}

export function getProductBySlug(slug: string) {
  return demoProducts.find((product) => product.slug === slug) ?? null;
}

export function getCategoryById(categoryId: string) {
  return demoCategories.find((category) => category.id === categoryId) ?? null;
}

export function getRecommendedProducts(product: Product) {
  return demoProducts.filter((candidate) => product.recommendations.includes(candidate.id));
}
