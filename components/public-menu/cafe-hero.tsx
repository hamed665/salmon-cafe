import { Instagram, MapPin, Phone } from "lucide-react";
import type { Cafe } from "@/types/app";

export function CafeHero({ cafe }: { cafe: Cafe }) {
  return (
    <section className="relative overflow-hidden rounded-b-[2rem] border-b border-coffee-100/10 bg-coffee-900">
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${cafe.coverImage})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-coffee-900 via-coffee-900/80 to-coffee-900/20" />
      <div className="relative mx-auto flex min-h-[420px] w-full max-w-3xl flex-col justify-end px-5 pb-8 pt-24">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-gold-400/30 bg-coffee-900/80 text-2xl font-black text-gold-400 shadow-premium">
          {cafe.logoText}
        </div>
        <div className="space-y-4">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">
              باز است
            </div>
            <h1 className="text-4xl font-black text-coffee-50">{cafe.name}</h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-coffee-100/80">{cafe.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-coffee-100/80">
            <span className="inline-flex items-center gap-2 rounded-full bg-coffee-800/75 px-3 py-2"><Phone className="h-4 w-4 text-gold-400" /> تماس</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-coffee-800/75 px-3 py-2"><Instagram className="h-4 w-4 text-gold-400" /> اینستاگرام</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-coffee-800/75 px-3 py-2"><MapPin className="h-4 w-4 text-gold-400" /> {cafe.address}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
