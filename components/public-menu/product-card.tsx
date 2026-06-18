import Link from "next/link";
import { BadgeCheck } from "lucide-react";
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
      className="group overflow-hidden rounded-3xl border border-coffee-100/10 bg-coffee-800/60 transition hover:-translate-y-1 hover:border-gold-400/40 hover:bg-coffee-800"
    >
      <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-coffee-50">{product.name}</h3>
              {product.isPopular ? <BadgeCheck className="h-4 w-4 text-gold-400" /> : null}
            </div>
            <p className="mt-2 line-clamp-2 text-xs leading-6 text-coffee-100/70">{product.description}</p>
          </div>
          <div className="shrink-0 rounded-2xl bg-gold-400/12 px-3 py-2 text-xs font-black text-gold-400">
            {formatToman(product.price)}
          </div>
        </div>
        <TasteProfile {...product.profile} />
      </div>
    </Link>
  );
}
