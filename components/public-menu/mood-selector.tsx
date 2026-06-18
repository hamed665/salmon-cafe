"use client";

import type { MoodKey } from "@/types/app";
import { cn } from "@/lib/utils";

const moods: Array<{ key: MoodKey; label: string; icon: string }> = [
  { key: "energetic", label: "پرانرژی", icon: "⚡" },
  { key: "calm", label: "آرام", icon: "🌿" },
  { key: "sleepy", label: "خواب‌آلود", icon: "🌙" },
  { key: "study", label: "مطالعه", icon: "📚" },
  { key: "work", label: "کار", icon: "💻" },
  { key: "date", label: "قرار", icon: "❤️" }
];

type MoodSelectorProps = {
  selectedMood?: MoodKey;
  onMoodChange?: (mood: MoodKey) => void;
};

export function MoodSelector({ selectedMood, onMoodChange }: MoodSelectorProps) {
  return (
    <section className="mx-auto w-full max-w-3xl px-5 py-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-black text-coffee-50">امروز چه حسی داری؟</h2>
        <span className="text-xs text-coffee-100/55">پیشنهادها بر اساس مود مرتب می‌شوند</span>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {moods.map((mood) => (
          <button
            key={mood.key}
            type="button"
            onClick={() => onMoodChange?.(mood.key)}
            className={cn(
              "rounded-3xl border border-coffee-100/10 bg-coffee-800/65 p-3 text-center transition hover:border-gold-400/40 hover:bg-coffee-700/80",
              selectedMood === mood.key && "border-gold-400/60 bg-gold-400/15"
            )}
          >
            <span className="block text-2xl">{mood.icon}</span>
            <span className="mt-2 block text-xs font-bold text-coffee-50">{mood.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
