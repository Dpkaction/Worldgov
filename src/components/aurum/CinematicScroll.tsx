import { useEffect, useRef, useState } from "react";
import GoldButton from "./GoldButton";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/aurum-hero.jpg";
import goldBars from "@/assets/gold-bars.jpg";
import worldNet from "@/assets/world-network.jpg";
import liquidGold from "@/assets/liquid-gold.jpg";

interface Scene {
  id: number;
  lines: string[];
  variant: "dark" | "tension" | "shift" | "gold" | "reveal" | "cta";
  shake?: boolean;
  hero?: boolean;
  backgroundImage?: string;
  backgroundEffect?: "vignette" | "blur" | "parallax" | "glitch";
}

const SCENES: Scene[] = [
  { id: 1, variant: "dark", lines: ["The world appears stable.", "But stability is not the same as security."], backgroundImage: heroImg, backgroundEffect: "vignette" },
  { id: 2, variant: "dark", lines: ["Currencies are printed.", "Value is diluted.", "Control is centralized."], backgroundImage: worldNet, backgroundEffect: "blur" },
  { id: 3, variant: "tension", lines: ["Nations compete.", "Power accumulates.", "Weapons expand."], backgroundImage: worldNet, backgroundEffect: "glitch" },
  { id: 4, variant: "tension", shake: true, lines: ["Over 20,000 nuclear weapons exist.", "Enough to end everything."], backgroundImage: worldNet, backgroundEffect: "glitch" },
  { id: 5, variant: "dark", lines: ["This is not protection.", "This is fragility."], backgroundImage: heroImg, backgroundEffect: "blur" },
  { id: 6, variant: "shift", lines: ["The problem is not humanity.", "The problem is the system."], backgroundImage: worldNet, backgroundEffect: "parallax" },
  { id: 7, variant: "shift", lines: ["When value is artificial…", "Conflict becomes inevitable."], backgroundImage: worldNet, backgroundEffect: "parallax" },
  { id: 8, variant: "gold", lines: ["When value is real…", "Stability becomes natural."], backgroundImage: liquidGold, backgroundEffect: "vignette" },
  { id: 9, variant: "reveal", hero: true, lines: ["Introducing", "Brasetz", "Bank of Reserve Asset Time Zone"], backgroundImage: liquidGold, backgroundEffect: "vignette" },
  { id: 10, variant: "gold", lines: ["A monetary system backed by physical gold.", "Measured in grams.", "Independent of control."], backgroundImage: goldBars, backgroundEffect: "vignette" },
  { id: 11, variant: "gold", lines: ["Not controlled by governments.", "Not dependent on currency.", "Not built for everyone."], backgroundImage: goldBars, backgroundEffect: "parallax" },
  { id: 12, variant: "gold", lines: ["Built for those who understand value.", "Designed for those who build legacy."], backgroundImage: goldBars, backgroundEffect: "vignette" },
  { id: 13, variant: "cta", lines: ["The future will not be controlled.", "It will be backed."], backgroundImage: heroImg, backgroundEffect: "vignette" },
];

interface CinematicScrollProps {
  onAccessClick?: () => void;
  onFoundingClick?: () => void;
}

export const CinematicScroll = ({ onAccessClick, onFoundingClick }: CinematicScrollProps = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        setProgress(p);
        const idx = Math.min(SCENES.length - 1, Math.floor(p * SCENES.length));
        setActive(idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scene = SCENES[active];

  // Continuous background interpolation — no jumps, no blank moments
  const phase = scene.variant;
  // 0 = dark, 0.33 = tension, 0.66 = shift, 1 = gold
  const tone = Math.min(1, progress * 1.05);
  const hue = 0 + tone * 43; // 0 -> 43 (gold)
  const sat = 0 + tone * 70;
  const light = 2 + tone * 8;
  const alpha = 0.25 + tone * 0.4;
  const bgStyle: React.CSSProperties = {
    background: `radial-gradient(ellipse at center, hsl(${hue} ${sat}% ${light + 6}% / ${alpha}) 0%, hsl(0 0% ${2 + tone * 1}%) 70%)`,
  };

  return (
    <section
      ref={containerRef}
      id="story"
      className="relative"
      style={{ height: `${SCENES.length * 100}vh` }}
    >
      <div
        style={bgStyle}
        className={`sticky top-0 h-screen w-full overflow-hidden transition-[background] duration-700 ease-out ${scene.shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
      >
        {/* Background Image with Effects */}
        {scene.backgroundImage && (
          <div className="absolute inset-0 -z-10">
            <img
              src={scene.backgroundImage}
              alt={`Scene ${scene.id} background`}
              className={`w-full h-full object-cover ${scene.backgroundEffect === "glitch" ? "animate-glitch" : ""}`}
              style={{
                filter: scene.backgroundEffect === "blur" 
                  ? "blur(8px)" 
                  : scene.backgroundEffect === "glitch"
                  ? "contrast(1.2) saturate(1.5) hue-rotate(90deg)"
                  : "none",
                transform: scene.backgroundEffect === "parallax" 
                  ? `scale(1.2) translateY(${progress * -20}px)` 
                  : scene.backgroundEffect === "glitch"
                  ? `translateX(${Math.sin(Date.now() / 100) * 2}px)`
                  : "scale(1.1)",
                transition: scene.backgroundEffect === "parallax" ? "transform 0.3s ease-out" : "none",
              }}
            />
            
            {/* Vignette Effect */}
            {scene.backgroundEffect === "vignette" && (
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/60 animate-vignette" />
            )}
            
            {/* Enhanced Dark Overlay for Text Readability */}
            <div 
              className="absolute inset-0"
              style={{
                background: phase === "gold" || phase === "reveal"
                  ? "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)"
                  : phase === "tension"
                  ? "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.8) 100%)"
                  : "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
              }}
            />
            
            {/* Additional Text Backdrop for Maximum Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          </div>
        )}
        {/* Enhanced Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 23) % 100}%`,
                width: `${1 + (i % 2)}px`,
                height: `${1 + (i % 2)}px`,
                background: 
                  phase === "gold" || phase === "reveal" 
                    ? `hsl(43 70% ${60 + (i % 20)}% / ${0.3 + (i % 5) * 0.1})`
                    : phase === "tension"
                    ? `hsl(0 70% ${50 + (i % 20)}% / ${0.1 + (i % 3) * 0.05})`
                    : `hsl(40 30% ${70 + (i % 15)}% / ${0.15 + (i % 3) * 0.05})`,
                boxShadow: 
                  phase === "gold" || phase === "reveal"
                    ? `0 0 ${4 + (i % 6)}px hsl(43 70% 60% / ${0.4 + (i % 3) * 0.2})`
                    : phase === "tension"
                    ? `0 0 ${2 + (i % 3)}px hsl(0 70% 50% / 0.3)`
                    : "none",
                animation: `float ${8 + (i % 7)}s ease-in-out ${i * 0.1}s infinite`,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>

        {/* World Map Overlay for Tension Scenes */}
        {(phase === "tension") && (
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI1MDAiIHZpZXdCb3g9IjAgMCAxMDAwIDUwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUwIDEwMEMxMDAgMTUwIDIwMCAxMDAgMzAwIDE1MEM0MDAgMjAwIDUwMCAxMDAgNjAwIDE1MEM3MDAgMjAwIDgwMCAxMDAgOTAwIDE1MEw5MDAgNDAwQzgwMCAzNTAgNzAwIDQwMCA2MDAgMzUwQzUwMCA0MDAgNDAwIDM1MCAzMDAgNDAwQzIwMCAzNTAgMTAwIDQwMCA1MCA0MDBaIiBzdHJva2U9ImhzbCgwIDcwJSA1MCUvMC4zKSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+Cjwvc3ZnPgo=')] bg-cover bg-center opacity-30" />
          </div>
        )}

        {/* System Lines for Shift Scenes */}
        {(phase === "shift") && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"
                style={{
                  left: "0",
                  right: "0",
                  top: `${15 + i * 10}%`,
                  transform: `translateY(${Math.sin(Date.now() / 1000 + i) * 10}px)`,
                  animation: `pulse ${3 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Gold glow center for later scenes */}
        {(phase === "shift" || phase === "gold" || phase === "reveal") && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[60vh] rounded-full bg-[hsl(43_70%_55%/0.25)] blur-[120px] animate-gold-pulse" />
        )}

        {/* Scene counter */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          <span className="text-gold">{String(active + 1).padStart(2, "0")}</span>
          <span className="h-px w-10 bg-gold/40" />
          <span>{String(SCENES.length).padStart(2, "0")}</span>
        </div>

        {/* Text */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          {scene.hero ? (
            <div key={scene.id} className="animate-fade-up">
              <p className="text-[11px] uppercase tracking-[0.5em] text-gold mb-6 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-pulse">{scene.lines[0]}</p>
              <h2 className="font-serif text-7xl sm:text-8xl md:text-9xl leading-none text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] relative">
                <span className="absolute inset-0 blur-xl bg-gradient-to-r from-gold via-white to-gold opacity-60 animate-pulse"></span>
                <span className="relative bg-gradient-to-r from-gold via-white to-gold bg-clip-text text-transparent">
                  {scene.lines[1]}
                </span>
              </h2>
              <div className="mt-8 mx-auto h-px w-40 shimmer-divider animate-shimmer bg-gradient-to-r from-transparent via-gold to-transparent drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
              {scene.lines[2] && (
                <p className="mt-6 text-xs sm:text-sm uppercase tracking-[0.45em] text-gold/80 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">
                  {scene.lines[2]}
                </p>
              )}
            </div>
          ) : scene.variant === "cta" ? (
            <div key={scene.id} className="space-y-8 max-w-4xl animate-fade-up">
              <div className="space-y-6">
                {scene.lines.map((line, i) => (
                  <p
                    key={i}
                    className="font-serif text-balance text-3xl sm:text-5xl md:text-6xl leading-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] relative"
                    style={{ animationDelay: `${i * 300}ms` }}
                  >
                    <span className="absolute inset-0 blur-xl bg-gradient-to-r from-gold via-white to-gold opacity-50 animate-pulse"></span>
                    <span className="relative bg-gradient-to-r from-gold via-white to-gold bg-clip-text text-transparent">
                      {line}
                    </span>
                  </p>
                ))}
              </div>
              <div className="mt-12 space-y-6 animate-fade-up" style={{ animationDelay: "800ms" }}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <GoldButton 
                    variant="solid" 
                    className="px-8 py-4 text-lg drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                    onClick={onAccessClick}
                  >
                    Request Private membership access <ArrowRight size={16} />
                  </GoldButton>
                  <GoldButton 
                    variant="outline" 
                    className="px-8 py-4 text-lg drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]"
                    onClick={onFoundingClick}
                  >
                    Enter the Brasetz Network
                  </GoldButton>
                </div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold/60 drop-shadow-[0_0_5px_rgba(251,191,36,0.4)]">
                  Invite Only • Limited Entry • Long-Term Vision
                </p>
              </div>
            </div>
          ) : (
            <div key={scene.id} className="space-y-5 max-w-3xl animate-fade-up">
              {scene.lines.map((line, i) => (
                <p
                  key={i}
                  className={`font-serif text-balance text-3xl sm:text-4xl md:text-5xl leading-tight drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] relative ${
                    phase === "gold" || phase === "reveal"
                      ? ""
                      : phase === "tension"
                      ? "text-red-400"
                      : "text-blue-300"
                  }`}
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  <span className="absolute inset-0 blur-lg opacity-50 animate-pulse" style={{
                    background: phase === "gold" || phase === "reveal"
                      ? "linear-gradient(45deg, #fbbf24, #ffffff, #fbbf24)"
                      : phase === "tension"
                      ? "linear-gradient(45deg, #ef4444, #ffffff, #ef4444)"
                      : "linear-gradient(45deg, #60a5fa, #ffffff, #60a5fa)"
                  }}></span>
                  <span className="relative" style={{
                    background: phase === "gold" || phase === "reveal"
                      ? "linear-gradient(45deg, #fbbf24, #ffffff, #fbbf24)"
                      : phase === "tension"
                      ? "linear-gradient(45deg, #ef4444, #ffffff, #ef4444)"
                      : "linear-gradient(45deg, #60a5fa, #ffffff, #60a5fa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}>
                    {line}
                  </span>
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-px bg-foreground/10 overflow-hidden">
          <div className="h-full bg-gold transition-all duration-300" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translate(0,0); }
          25% { transform: translate(-4px, 2px); }
          50% { transform: translate(3px, -3px); }
          75% { transform: translate(-2px, 3px); }
        }
        
        @keyframes glitch {
          0%, 100% { 
            transform: translate(0, 0);
            filter: hue-rotate(0deg);
          }
          20% { 
            transform: translate(-2px, 2px);
            filter: hue-rotate(90deg);
          }
          40% { 
            transform: translate(-2px, -2px);
            filter: hue-rotate(180deg);
          }
          60% { 
            transform: translate(2px, 2px);
            filter: hue-rotate(270deg);
          }
          80% { 
            transform: translate(2px, -2px);
            filter: hue-rotate(360deg);
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-10px) translateX(5px);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(5px) translateX(-3px);
            opacity: 0.8;
          }
          75% { 
            transform: translateY(-5px) translateX(2px);
            opacity: 0.5;
          }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.1;
            transform: scaleX(0.95);
          }
          50% { 
            opacity: 0.3;
            transform: scaleX(1);
          }
        }
        
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes vignette-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }
        
        @keyframes neon-glow {
          0%, 100% { 
            filter: drop-shadow(0 0 10px currentColor) drop-shadow(0 0 20px currentColor) drop-shadow(0 0 30px currentColor);
          }
          50% { 
            filter: drop-shadow(0 0 15px currentColor) drop-shadow(0 0 30px currentColor) drop-shadow(0 0 45px currentColor);
          }
        }
        
        @keyframes text-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
        }
        
        @keyframes gold-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes neon-pulse {
          0%, 100% { 
            filter: brightness(1) drop-shadow(0 0 6px rgba(59, 130, 246, 0.4)) drop-shadow(0 0 12px rgba(147, 51, 234, 0.3));
            transform: scale(1);
          }
          50% { 
            filter: brightness(1.1) drop-shadow(0 0 8px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 16px rgba(147, 51, 234, 0.4));
            transform: scale(1.01);
          }
        }
        
        .animate-fade-up {
          animation: fade-up 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-glitch {
          animation: glitch 0.3s ease-in-out infinite;
        }
        
        .animate-vignette {
          animation: vignette-pulse 4s ease-in-out infinite;
        }
        
        .animate-neon {
          animation: neon-glow 2s ease-in-out infinite alternate;
        }
        
        .animate-flicker {
          animation: text-flicker 3s ease-in-out infinite;
        }
        
        .animate-shimmer {
          background-size: 200% 100%;
          animation: gold-shimmer 3s linear infinite;
        }
        
        /* Performance optimizations */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .will-change-transform {
          will-change: transform;
        }
        
        .gpu-accelerated {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        /* Image overlay effects */
        .image-overlay-dark {
          mix-blend-mode: multiply;
        }
        
        .image-overlay-light {
          mix-blend-mode: screen;
        }
      `}</style>
    </section>
  );
};

export default CinematicScroll;