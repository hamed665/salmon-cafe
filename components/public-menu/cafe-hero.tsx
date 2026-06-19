import { Instagram, MapPin, Phone, Sparkles } from "lucide-react";
import type { Cafe } from "@/types/app";

export function CafeHero({ cafe }: { cafe: Cafe }) {
  return (
    <section className="relative overflow-hidden rounded-b-[2.5rem] border-b border-coffee-100/10 bg-coffee-900">
      <div className="absolute inset-0 scale-105 bg-cover bg-center opacity-35 blur-[1px]" style={{ backgroundImage: `url(${cafe.coverImage})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-coffee-900 via-coffee-900/86 to-coffee-900/30" />
      <div className="relative mx-auto flex min-h-[460px] w-full max-w-4xl flex-col justify-end px-5 pb-8 pt-20">
        <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-gold-400/25 bg-coffee-900/70 px-4 py-2 text-xs font-bold text-gold-400 backdrop-blur-xl">
          <Sparkles className="h-4 w-4" /> منوی هوشمند کافه
        </div>
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-gold-400/35 bg-coffee-900/80 text-2xl font-black text-gold-400 shadow-premium backdrop-blur-xl">
          {cafe.logoText}
        </div>
        <div className="space-y-4">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">منوی فعال</div>
            <h1 className="max-w-2xl text-5xl font-black leading-tight text-coffee-50 md:text-6xl">{cafe.name}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-coffee-100/82">{cafe.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-coffee-100/85">
            {cafe.phone ? <a className="inline-flex items-center gap-2 rounded-full bg-coffee-800/75 px-3 py-2" href={`tel:${cafe.phone}`}><Phone className="h-4 w-4 text-gold-400" /> تماس</a> : null}
            {cafe.instagramUrl ? <a className="inline-flex items-center gap-2 rounded-full bg-coffee-800/75 px-3 py-2" href={cafe.instagramUrl} target="_blank" rel="noreferrer"><Instagram className="h-4 w-4 text-gold-400" /> اینستاگرام</a> : null}
            {cafe.address ? <span className="inline-flex items-center gap-2 rounded-full bg-coffee-800/75 px-3 py-2"><MapPin className="h-4 w-4 text-gold-400" /> {cafe.address}</span> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
