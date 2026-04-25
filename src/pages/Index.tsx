import { ArrowRight, Crown, Diamond, Gem, Globe, Infinity as InfinityIcon, Lock, Shield, Sparkles } from "lucide-react";
import PriceTicker from "@/components/aurum/PriceTicker";
import Navbar from "@/components/aurum/Navbar";
import Reveal from "@/components/aurum/Reveal";
import GoldButton from "@/components/aurum/GoldButton";
import CinematicScroll from "@/components/aurum/CinematicScroll";
import AccessFormModal from "@/components/aurum/AccessFormModal";
import { useState } from "react";
import heroImg from "@/assets/aurum-hero.jpg";
import goldBars from "@/assets/gold-bars.jpg";
import worldNet from "@/assets/world-network.jpg";
import liquidGold from "@/assets/liquid-gold.jpg";

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
    <span className="h-px w-10 bg-gold" />
    {children}
  </div>
);

const Index = () => {
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [foundingModalOpen, setFoundingModalOpen] = useState(false);

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <PriceTicker />
      <Navbar />
      
      {/* Access Form Modals */}
      <AccessFormModal 
        isOpen={accessModalOpen} 
        onClose={() => setAccessModalOpen(false)} 
        formType="access" 
      />
      <AccessFormModal 
        isOpen={foundingModalOpen} 
        onClose={() => setFoundingModalOpen(false)} 
        formType="founding" 
      />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-32">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="Liquid gold forming a bar" width={1920} height={1080} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(var(--background))_85%)]" />
        </div>

        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[40vh] w-[60vw] max-w-3xl rounded-full bg-[hsl(43_70%_55%/0.18)] blur-[120px] animate-gold-pulse pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 w-full">
          <Reveal>
            <SectionLabel>A independent traditional gold bank for royal people</SectionLabel>
          </Reveal>

          <Reveal delay={150}>
            <h1 className="font-serif mt-8 text-5xl sm:text-7xl md:text-8xl leading-[0.95] text-balance max-w-5xl">
              Royalty, Connections, Independent system.
              <br />
              <span className="gradient-gold-text">Powered by Gold.</span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              A traditional gold bank where you hold your gold and let users can use for transaction worldwide and you get lifetimetime transaction fees and royalty.
            </p>
          </Reveal>

          <Reveal delay={450}>
            <p className="mt-6 max-w-2xl text-lg text-gold/80 leading-relaxed font-light">
              Convert your physical gold into digital gold. Whoever uses your digital gold gives you royalty and transaction fees. Your physical gold is safe in locker and let your digital gold circulate worldwide — earn generational passive income wealth.
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <GoldButton variant="solid" onClick={() => setAccessModalOpen(true)}>
                Request Private Access <ArrowRight size={14} />
              </GoldButton>
              <GoldButton variant="outline" onClick={() => setFoundingModalOpen(true)}>
                Become a Founding Member
              </GoldButton>
            </div>
          </Reveal>

          <Reveal delay={750}>
            <p className="mt-8 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              Invite-only · Limited Access · Long-term Vision Required
            </p>
          </Reveal>

          <Reveal delay={900}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://worldgovt.org/wp/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center px-6 py-3 text-xs font-medium uppercase tracking-[0.3em] text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-lg transition-all duration-300 hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 transform hover:scale-105 shadow-lg hover:shadow-xl"
                style={{
                  boxShadow: '0 0 8px rgba(59, 130, 246, 0.3), 0 0 16px rgba(147, 51, 234, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.05)',
                  animation: 'neon-pulse 2s ease-in-out infinite'
                }}
              >
                <span className="relative z-10">Visit World Government Organization</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-lg opacity-50 blur-sm animate-pulse"></div>
                <ArrowRight size={14} className="ml-2" />
              </a>
            </div>
          </Reveal>

          {/* Full Width Royal Stats */}
          <Reveal delay={750}>
            <div className="mt-20 w-screen -mx-6 md:-mx-8 lg:-mx-12">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gradient-to-r from-gold/30 via-gold/20 to-gold/30 border-y border-gold">
                {[
                  { k: "Standard", v: "Gold / Gram" },
                  { k: "1 Brasetz", v: "12.00 g" },
                  { k: "Custody", v: "Physical" },
                  { k: "Royalty", v: "Lifetime" },
                ].map((s, i) => (
                  <div key={s.k} className="relative bg-gradient-to-b from-background/95 via-background to-background/95 backdrop-blur-sm p-8 group hover:bg-gradient-to-b hover:from-gold/5 hover:via-gold/10 hover:to-gold/5 transition-all duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative z-10">
                      <div className="text-[11px] uppercase tracking-[0.4em] text-gold/80 font-light">{s.k}</div>
                      <div className="mt-3 font-serif text-2xl md:text-3xl gradient-gold-text font-bold tracking-wide">{s.v}</div>
                    </div>
                    <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold/50 to-gold group-hover:w-full transition-all duration-1000 delay-100" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CINEMATIC SCROLL STORY */}
      <CinematicScroll 
        onAccessClick={() => setAccessModalOpen(true)}
        onFoundingClick={() => setFoundingModalOpen(true)}
      />

      {/* CORE PHILOSOPHY */}
      <section id="philosophy" className="relative py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel>Core Philosophy</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif mt-6 text-4xl sm:text-6xl max-w-3xl text-balance">
              Built on What <span className="gradient-gold-text">Truly Matters</span>
            </h2>
          </Reveal>

          <div className="mt-20 grid md:grid-cols-3 gap-px bg-gold/20 border border-gold">
            {[
              { icon: Crown, t: "Generational Royalty Fame", d: "A name that endures — influence inherited through a closed network of legacy builders and decision-makers." },
              { icon: Shield, t: "Connection Power", d: "Access to a verified circle of holders — relationships that compound into real, lasting power." },
              { icon: Gem, t: "Real Asset Money", d: "Wealth backed by physical gold, measured in grams — never printed, never diluted." },
            ].map((p, i) => (
              <Reveal key={p.t} delay={i * 120} className="bg-background">
                <div className="group relative p-10 h-full transition-colors duration-500 hover:bg-secondary">
                  <p.icon className="text-gold" size={28} strokeWidth={1.2} />
                  <h3 className="mt-8 font-serif text-3xl text-foreground">{p.t}</h3>
                  <div className="mt-4 h-px w-12 bg-gold" />
                  <p className="mt-6 text-muted-foreground leading-relaxed">{p.d}</p>
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="relative py-32 px-6 gradient-vault">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <SectionLabel>The Problem</SectionLabel>
              <h2 className="font-serif mt-6 text-4xl sm:text-6xl text-balance">
                The Illusion of <span className="gradient-gold-text">Modern Money</span>
              </h2>
              <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
                Modern financial systems are built on trust — not value.
              </p>
              <ul className="mt-10 space-y-5">
                {[
                  "Currencies are printed without limits.",
                  "Inflation silently erodes wealth.",
                  "Ownership is often an illusion, controlled by centralized institutions.",
                  "Digital assets remain volatile, speculative, and detached from intrinsic value.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-4 text-foreground/85">
                    <span className="mt-3 h-px w-6 bg-gold shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-10 font-serif text-2xl text-foreground/90">
                The result: wealth that looks strong, but isn't stable.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="relative aspect-square">
              <div className="absolute inset-0 border border-gold" />
              <div className="absolute inset-4 border border-gold/30" />
              <img src={worldNet} alt="Global network nodes" loading="lazy" width={1920} height={1080} className="absolute inset-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)] object-cover" />
              <div className="absolute inset-8 bg-gradient-to-tr from-background/60 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" className="relative py-32 px-6">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="relative aspect-[4/5]">
              <img src={liquidGold} alt="Liquid gold" loading="lazy" width={1600} height={1000} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 ring-1 ring-gold" />
              <div className="absolute -bottom-6 -right-6 border border-gold bg-background p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Standard</p>
                <p className="font-serif text-3xl gradient-gold-text mt-1">1g · 24K</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} className="order-1 lg:order-2">
            <div>
              <SectionLabel>The Solution</SectionLabel>
              <h2 className="font-serif mt-6 text-4xl sm:text-6xl text-balance">
                Return to <span className="gradient-gold-text">Real Asset Money</span>
              </h2>
              <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
                We are building a financial ecosystem where money is not created — it is backed.
              </p>
              <ul className="mt-10 space-y-5">
                {[
                  "Every unit is tied to physical gold.",
                  "Measured in grams.",
                  "Independent of any government or fiat system.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-4 text-foreground/85">
                    <Sparkles className="mt-1 text-gold shrink-0" size={16} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-10 font-serif text-2xl">
                This is not a currency. <span className="gradient-gold-text">This is asset money.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative py-32 px-6 gradient-vault">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center">
            <Reveal><SectionLabel>How It Works</SectionLabel></Reveal>
            <Reveal delay={100}>
              <h2 className="font-serif mt-6 text-4xl sm:text-6xl text-balance max-w-3xl">
                A Simple, <span className="gradient-gold-text">Powerful System</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-20 relative">
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { n: "01", t: "Acquire", d: "Secure gold-based asset units backed by real, physical reserves." },
                { n: "02", t: "Digitize", d: "Convert your gold into a secure, transferable digital form." },
                { n: "03", t: "Transact", d: "Use your assets seamlessly within a private, trusted ecosystem." },
                { n: "04", t: "Earn", d: "Generate lifetime royalties as your asset circulates within the network." },
              ].map((s, i) => (
                <Reveal key={s.n} delay={i * 120}>
                  <div className="relative text-center">
                    <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-gold bg-background">
                      <span className="font-serif text-2xl gradient-gold-text">{s.n}</span>
                      <span className="absolute inset-0 rounded-full glow-gold opacity-50" />
                    </div>
                    <h3 className="mt-8 font-serif text-2xl">{s.t}</h3>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* UNIQUE VALUE */}
      <section className="relative py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionLabel>Unique Value</SectionLabel></Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif mt-6 text-4xl sm:text-6xl max-w-3xl text-balance">
              Designed for Those Who <span className="gradient-gold-text">Build Legacy</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/20 border border-gold">
            {[
              { icon: Diamond, t: "Physical Gold Ownership", d: "Each unit anchored to verified, vaulted gold reserves." },
              { icon: Shield, t: "Freedom from Inflation", d: "Insulated from monetary expansion and policy shifts." },
              { icon: Globe, t: "Digital Transferability", d: "Move value globally, instantly, without friction." },
              { icon: InfinityIcon, t: "Lifetime Royalty", d: "Earn perpetual returns from network circulation." },
              { icon: Crown, t: "Generational Wealth", d: "A structure designed to outlast a single lifetime." },
              { icon: Lock, t: "Closed Elite Network", d: "Verified, invite-only access to a high-value community." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={(i % 3) * 100}>
                <div className="group bg-background p-10 h-full transition-all duration-500 hover:bg-secondary">
                  <c.icon className="text-gold" size={26} strokeWidth={1.2} />
                  <h3 className="mt-6 font-serif text-2xl">{c.t}</h3>
                  <div className="mt-3 h-px w-8 bg-gold transition-all duration-500 group-hover:w-16" />
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={worldNet} alt="" aria-hidden="true" loading="lazy" width={1920} height={1080} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal><SectionLabel><span className="mx-auto">Community</span></SectionLabel></Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif mt-6 text-4xl sm:text-6xl text-balance">
              An Economy Built on <span className="gradient-gold-text">Value, Not Trust</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-10 text-lg text-muted-foreground leading-relaxed">
              A closed, invite-only ecosystem. A network where participants operate on a shared standard —
              gold measured in weight, not promises. No dependency on unstable currencies. No exposure to
              uncontrolled monetary expansion. Only real value, exchanged between verified participants.
            </p>
          </Reveal>
        </div>
      </section>

      {/* LEGACY */}
      <section id="legacy" className="relative py-32 px-6 gradient-vault">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative aspect-square">
              <img src={goldBars} alt="Gold bars" loading="lazy" width={1600} height={1000} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 border border-gold" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div>
              <SectionLabel>Legacy</SectionLabel>
              <h2 className="font-serif mt-6 text-4xl sm:text-6xl text-balance">
                Wealth That <span className="gradient-gold-text">Outlives You</span>
              </h2>
              <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
                This is not designed for short-term gains. This is a system where your assets continue
                to generate value — beyond your lifetime.
              </p>
              <div className="mt-10 grid sm:grid-cols-3 gap-6">
                {[
                  { t: "Generational Transfer", d: "Built for inheritance." },
                  { t: "Long-term Preservation", d: "Anchored in physical reserves." },
                  { t: "Continuous Royalty", d: "Perpetual income stream." },
                ].map((p) => (
                  <div key={p.t} className="border-l border-gold pl-4">
                    <p className="font-serif text-foreground">{p.t}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{p.d}</p>
                  </div>
                ))}
              </div>
              <p className="mt-10 font-serif text-2xl">
                True wealth is not what you spend. <br />
                <span className="gradient-gold-text">It is what continues without you.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="relative py-32 px-6 text-center">
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-6xl max-w-4xl mx-auto text-balance">
            Not for Everyone. <span className="gradient-gold-text">Never Meant to Be.</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            This ecosystem is built for individuals who understand value, control, and time. If you are
            looking for quick gains, this is not for you. If you are building legacy, you are in the right place.
          </p>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section id="access" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[60vh] rounded-full bg-[hsl(43_70%_55%/0.18)] blur-[140px] animate-gold-pulse" />
        <div className="relative mx-auto max-w-4xl text-center border border-gold p-12 md:p-20 bg-background/60 backdrop-blur-xl">
          <Reveal>
            <SectionLabel><span className="mx-auto">Final Invitation</span></SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-serif mt-8 text-4xl sm:text-6xl text-balance">
              Access is Not Open. <br />
              <span className="gradient-gold-text">It is Earned.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 text-muted-foreground leading-relaxed">
              Join a private network redefining money through real assets.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <GoldButton variant="solid" onClick={() => setAccessModalOpen(true)}>
                Apply for Access <ArrowRight size={14} />
              </GoldButton>
              <GoldButton variant="outline" onClick={() => setFoundingModalOpen(true)}>
                Request Private Briefing
              </GoldButton>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <p className="mt-8 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              Applications are reviewed · Entry is selective
            </p>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gold px-6 py-16">
        <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-gold">
                <span className="font-serif text-gold text-lg leading-none">B</span>
              </span>
              <span className="font-serif text-xl tracking-[0.2em]">BRASETZ</span>
            </div>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-sm">
              An independent monetary ecosystem where wealth is measured in gold, controlled by its
              holders, and sustained across generations.
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Navigate</p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li><a className="hover:text-gold" href="#philosophy">Philosophy</a></li>
              <li><a className="hover:text-gold" href="#solution">Solution</a></li>
              <li><a className="hover:text-gold" href="#legacy">Legacy</a></li>
              <li><a className="hover:text-gold" href="#access">Access</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Tenets</p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground italic">
              <li>"Gold is not an investment. It is the standard."</li>
              <li>"From currency to certainty."</li>
              <li>"Wealth, without dilution."</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-7xl mt-16 pt-8 border-t border-gold flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Brasetz. All rights reserved.</p>
          <p className="tracking-[0.3em] uppercase">Measured in Weight · Built for Generations</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
