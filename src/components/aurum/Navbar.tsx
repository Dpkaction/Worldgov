import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "How It Works", href: "#how" },
  { label: "Legacy", href: "#legacy" },
  { label: "Access", href: "#access" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "top-9 sm:top-10 bg-background/70 backdrop-blur-2xl border-b border-gold" : "top-9 sm:top-10 bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3 group">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-sm border border-gold bg-background">
            <span className="font-serif text-gold text-lg leading-none">B</span>
            <span className="absolute inset-0 rounded-sm glow-gold opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
          <span className="font-serif text-xl tracking-[0.2em] text-foreground">BRASETZ</span>
        </a>

        <ul className="hidden lg:flex items-center gap-9">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-[11px] uppercase tracking-[0.28em] text-muted-foreground hover:text-gold transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#access"
            className="group relative inline-flex items-center justify-center overflow-hidden border border-gold px-5 py-2.5 text-[11px] uppercase tracking-[0.28em] text-gold transition-all hover:text-primary-foreground"
          >
            <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative">Request Access</span>
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-gold border border-gold p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-gold bg-background/95 backdrop-blur-2xl">
          <ul className="flex flex-col px-6 py-6 gap-5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  onClick={() => setOpen(false)}
                  href={l.href}
                  className="block text-sm uppercase tracking-[0.28em] text-muted-foreground hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                onClick={() => setOpen(false)}
                href="#access"
                className="inline-block border border-gold px-5 py-2.5 text-[11px] uppercase tracking-[0.28em] text-gold"
              >
                Request Access
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;