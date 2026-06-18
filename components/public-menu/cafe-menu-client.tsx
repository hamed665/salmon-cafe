"use client";

import { useMemo, useState } from "react";
import type { Category, MoodKey, Product } from "@/types/app";
import { MoodSelector } from "@/components/public-menu/mood-selector";
import { ProductCard } from "@/components/public-menu/product-card";
import { cn } from "@/lib/utils";

type CafeMenuClientProps = {
  cafeSlug: string;
  categories: Category[];
  products: Product[];
};

export function CafeMenuClient({ cafeSlug, categories, products }: CafeMenuClientProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id ?? "all");
  const [selectedMood, setSelectedMood] = useState<MoodKey | undefined>();
  const [search, setSearch] = useState("");

  const visibleProducts = useMemo(() => {
    return products
      .filter((product) => selectedCategory === "all" || product.categoryId === selectedCategory)
      .filter((product) => product.name.includes(search) || product.description.includes(search))
      .sort((a, b) => {
        if (!selectedMood) return Number(b.isPopular) - Number(a.isPopular);
        return Number(b.moodKeys.includes(selectedMood)) - Number(a.moodKeys.includes(selectedMood));
      });
  }, [products, search, selectedCategory, selectedMood]);

  return (
    <>
      <MoodSelector selectedMood={selectedMood} onMoodChange={setSelectedMood} />

      <section className="sticky top-0 z-20 border-y border-coffee-100/10 bg-coffee-900/88 px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-3xl gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-bold transition",
              selectedCategory === "all" ? "bg-gold-400 text-coffee-950" : "bg-coffee-800/70 text-coffee-100"
            )}
          >
            همه
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-bold transition",
                selectedCategory === category.id ? "bg-gold-400 text-coffee-950" : "bg-coffee-800/70 text-coffee-100"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-5 py-5">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="جستجوی محصول..."
          className="w-full rounded-3xl border border-coffee-100/10 bg-coffee-800/70 px-5 py-4 text-sm text-coffee-50 placeholder:text-coffee-100/40 focus:border-gold-400/50 focus:ring-gold-400/30"
        />
      </section>

      <section className="mx-auto grid w-full max-w-3xl gap-4 px-5 pb-12 sm:grid-cols-2">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} cafeSlug={cafeSlug} />
        ))}
      </section>
    </>
  );
}
