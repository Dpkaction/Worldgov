import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost";
  children: ReactNode;
}

export const GoldButton = ({ variant = "solid", children, className = "", ...rest }: Props) => {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden px-7 py-3.5 text-[11px] uppercase tracking-[0.3em] transition-all duration-500";

  const variants = {
    solid:
      "border border-gold text-primary-foreground gradient-gold shadow-gold hover:scale-[1.02]",
    outline:
      "border border-gold text-gold hover:text-primary-foreground",
    ghost: "text-gold border border-transparent hover:border-gold",
  } as const;

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {variant === "outline" && (
        <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 group-hover:translate-x-0" />
      )}
      <span className="relative flex items-center gap-3">{children}</span>
    </button>
  );
};

export default GoldButton;