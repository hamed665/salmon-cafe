export type MoodKey = "energetic" | "calm" | "sleepy" | "study" | "work" | "date";

export type Cafe = {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  phone: string;
  instagramUrl: string;
  coverImage: string;
  logoText: string;
  status: "active" | "draft" | "disabled";
};

export type Product = {
  id: string;
  cafeId: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  isPopular: boolean;
  moodKeys: MoodKey[];
  profile: {
    sweetness: number;
    bitterness: number;
    caffeine: number;
    temperature: "hot" | "cold";
  };
  story: {
    origin: string;
    ingredients: string;
    preparation: string;
    shortStory: string;
  };
  recommendations: string[];
};

export type Category = {
  id: string;
  cafeId: string;
  name: string;
  slug: string;
};
