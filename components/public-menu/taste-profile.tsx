import { cn } from "@/lib/utils";

const labels = {
  sweetness: "شیرینی",
  bitterness: "تلخی",
  caffeine: "کافئین"
};

type TasteProfileProps = {
  sweetness: number;
  bitterness: number;
  caffeine: number;
  className?: string;
};

export function TasteProfile({ sweetness, bitterness, caffeine, className }: TasteProfileProps) {
  const items = [
    { key: "sweetness", value: sweetness },
    { key: "bitterness", value: bitterness },
    { key: "caffeine", value: caffeine }
  ] as const;

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const value = Math.max(0, Math.min(item.value, 5));
        return (
          <div key={item.key} className="space-y-2">
            <div className="flex items-center justify-between text-xs text-coffee-100/72">
              <span>{labels[item.key]}</span>
              <span className="font-bold text-gold-400">{value}/5</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full border border-coffee-100/10 bg-coffee-900/70">
              <div className="h-full rounded-full bg-gradient-to-l from-gold-400 to-gold-600 shadow-[0_0_18px_rgba(216,166,87,0.35)]" style={{ width: `${value * 20}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
