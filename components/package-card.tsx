import { Check } from "lucide-react";
import { packages } from "@/lib/content";
import { CtaButton } from "./cta-button";

type Package = (typeof packages)[number];

export function PackageCard({ item, featured = false }: { item: Package; featured?: boolean }) {
  return (
    <article className="rounded-[8px] border border-ivory/10 bg-ivory/[0.035] p-5 transition duration-300 hover:border-champagne/50 hover:bg-ivory/[0.06]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-extrabold uppercase text-champagne">{item.eyebrow}</p>
        {featured ? (
          <span className="rounded-[4px] bg-ruby px-2.5 py-1 text-[11px] font-extrabold uppercase text-white">
            Popular
          </span>
        ) : null}
      </div>
      <h3 className="mt-4 font-display text-4xl font-bold leading-none text-ivory">
        {item.name}
      </h3>
      <p className="mt-3 text-sm font-bold uppercase text-ivory/52">
        Starting point: <span className="text-ivory">{item.starting}</span>
      </p>
      <p className="mt-4 text-sm leading-7 text-ivory/64">{item.description}</p>
      <ul className="mt-5 grid gap-3 text-sm text-ivory/76">
        {item.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <Check aria-hidden="true" className="mt-0.5 shrink-0 text-champagne" size={17} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 border-t border-ivory/10 pt-4 text-xs font-bold uppercase text-ivory/48">
        Best for {item.ideal}
      </p>
      <CtaButton href="/book-now" className="mt-5 w-full" variant={featured ? "primary" : "secondary"}>
        Request Package
      </CtaButton>
    </article>
  );
}
