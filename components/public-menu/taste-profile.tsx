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
      {items.map((item) => (
        <div key={item.key} className="space-y-2">
          <div className="flex items-center justify-between text-xs text-coffee-100/70">
            <span>{labels[item.key]}</span>
            <span>{item.value}/5</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-coffee-700/80">
            <div className="h-full rounded-full bg-gold-400" style={{ width: `${Math.min(item.value, 5) * 20}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
