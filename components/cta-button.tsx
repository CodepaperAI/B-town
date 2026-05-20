import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function CtaButton({
  href,
  children,
  variant = "primary",
  className
}: CtaButtonProps) {
  const styles = {
    primary:
      "bg-champagne text-[#17130d] hover:bg-champagne-deep hover:text-white border-champagne shadow-[0_14px_40px_rgba(185,138,45,0.18)]",
    secondary:
      "bg-white/70 text-ivory hover:bg-champagne hover:text-[#17130d] border-champagne/28",
    ghost: "bg-transparent text-ivory hover:bg-champagne/12 border-champagne/24"
  };

  return (
    <Link
      href={href}
      className={cn(
        "cta-button focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] border px-5 py-3 text-sm font-extrabold uppercase tracking-0 transition duration-200",
        styles[variant],
        className
      )}
    >
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={16} strokeWidth={2.4} />
    </Link>
  );
}
