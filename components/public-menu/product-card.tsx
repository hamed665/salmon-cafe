import Link from "next/link";
import { BadgeCheck, ChevronLeft } from "lucide-react";
import type { Product } from "@/types/app";
import { formatToman } from "@/lib/format";
import { TasteProfile } from "@/components/public-menu/taste-profile";

type ProductCardProps = {
  product: Product;
  cafeSlug: string;
};

export function ProductCard({ product, cafeSlug }: ProductCardProps) {
  return (
    <Link
      href={`/m/${cafeSlug}/product/${product.slug}`}
      className="group overflow-hidden rounded-[1.75rem] border border-coffee-100/10 bg-coffee-800/60 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-gold-400/45 hover:bg-coffee-800"
    >
      <div className="relative aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/70 via-transparent to-transparent" />
        {!product.isAvailable ? <div className="absolute right-3 top-3 rounded-full bg-red-500/85 px-3 py-1 text-xs font-bold text-white">ناموجود</div> : null}
      </div>
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-black text-coffee-50">{product.name}</h3>
              {product.isPopular ? <BadgeCheck className="h-4 w-4 shrink-0 text-gold-400" /> : null}
            </div>
            <p className="mt-2 line-clamp-2 text-xs leading-6 text-coffee-100/70">{product.description}</p>
          </div>
          <div className="shrink-0 rounded-2xl bg-gold-400/12 px-3 py-2 text-xs font-black text-gold-400">
            {formatToman(product.price)}
          </div>
        </div>
        <TasteProfile {...product.profile} />
        <div className="flex items-center justify-between text-xs font-bold text-gold-400">
          <span>جزئیات و پیشنهاد مکمل</span>
          <ChevronLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
