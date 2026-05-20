"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { brand, navItems } from "@/lib/content";
import { cn } from "@/lib/utils";
import { CtaButton } from "./cta-button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ivory/10 bg-ink/82 backdrop-blur-xl">
      <div className="container-shell flex min-h-[76px] items-center justify-between gap-4">
        <Link href="/" className="focus-ring group flex items-center gap-3 rounded-[6px]">
          <span className="grid size-11 place-items-center rounded-[6px] border border-champagne/45 bg-champagne/10 font-display text-2xl font-bold text-champagne transition group-hover:bg-champagne group-hover:text-[#17130d]">
            B
          </span>
          <span className="leading-none">
            <span className="block font-display text-2xl font-bold text-ivory">
              B-Town
            </span>
            <span className="block text-[11px] font-bold uppercase text-champagne">
              Entertainment
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-ring rounded-[4px] px-3 py-2 text-sm font-semibold text-ivory/72 transition hover:bg-ivory/8 hover:text-ivory",
                pathname === item.href && "bg-ivory/10 text-champagne"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={`tel:${brand.phoneHref}`}
            className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-[6px] border border-ivory/14 px-4 text-sm font-bold text-ivory/82 transition hover:bg-ivory/8 hover:text-ivory"
          >
            <Phone aria-hidden="true" size={16} />
            Call
          </a>
          <CtaButton href="/book-now">Book Now</CtaButton>
        </div>

        <button
          type="button"
          className="focus-ring grid size-11 place-items-center rounded-[6px] border border-ivory/14 text-ivory lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
        >
          {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "border-t border-ivory/10 bg-ink lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="container-shell grid gap-2 py-4" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "focus-ring rounded-[6px] px-3 py-3 text-base font-bold text-ivory/78",
                pathname === item.href && "bg-champagne text-[#17130d]"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href={`tel:${brand.phoneHref}`}
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] border border-ivory/16 font-bold text-ivory"
            >
              <Phone aria-hidden="true" size={17} />
              Call
            </a>
            <Link
              href="/book-now"
              onClick={() => setOpen(false)}
              className="focus-ring inline-flex min-h-12 items-center justify-center rounded-[6px] bg-champagne font-extrabold text-[#17130d]"
            >
              Book Now
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
