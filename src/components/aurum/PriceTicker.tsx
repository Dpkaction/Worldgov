import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { label: "1 BRASETZ", value: "2.05 g" },
  { label: "BRASETZ TOTAL COLLECTION", value: "201 g" },
  { label: "RESERVE STATUS", value: "FULLY BACKED" },
  { label: "ECOSYSTEM", value: "INVITE-ONLY" },
  { label: "STANDARD", value: "GOLD / GRAM" },
  { label: "ROYALTY", value: "LIFETIME" },
  { label: "CUSTODY", value: "PHYSICAL VAULT" },
];

export const PriceTicker = () => {
  const [tick, setTick] = useState(2.05);
  const dirRef = useRef(1);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((v) => {
        const delta = (Math.random() * 0.02) * dirRef.current;
        const next = +(v + delta).toFixed(3);
        if (next > 2.10) dirRef.current = -1;
        if (next < 2.00) dirRef.current = 1;
        return next;
      });
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const loop = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-gold bg-background/85 backdrop-blur-xl">
      <div className="relative overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-2 sm:py-2.5">
          <span className="hidden sm:inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-gold uppercase shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            Live
          </span>

          <div className="flex items-center gap-2 shrink-0 pr-4 sm:border-r sm:border-gold">
            <span className="font-serif text-sm sm:text-base text-foreground">1 Brasetz</span>
            <span className="text-muted-foreground text-xs">=</span>
            <span className="font-serif gradient-gold-text text-sm sm:text-base font-semibold tabular-nums">
              {tick.toFixed(2)} g
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Gold</span>
          </div>

          <div className="flex-1 overflow-hidden mask-fade">
            <div className="flex gap-10 animate-marquee whitespace-nowrap will-change-transform">
              {loop.map((it, i) => (
                <span key={i} className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase">
                  <span className="text-muted-foreground">{it.label}</span>
                  <span className="text-gold">·</span>
                  <span className="text-foreground/90">{it.value}</span>
                  <span className="text-gold/40 ml-6">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="hairline animate-shimmer" />
      </div>
    </div>
  );
};

export default PriceTicker;