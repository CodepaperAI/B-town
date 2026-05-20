"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { galleryItems } from "@/lib/content";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Wedding",
  "Reception",
  "Roka",
  "Maiyan",
  "Birthday",
  "Corporate",
  "Backyard",
  "Décor",
  "Dhol",
  "Special Effects",
  "Media"
];

export function GalleryFilter({ limit }: { limit?: number }) {
  const [active, setActive] = useState("All");
  const items = useMemo(() => {
    const filtered =
      active === "All" ? galleryItems : galleryItems.filter((item) => item.category === active);
    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
  }, [active, limit]);

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-3" aria-label="Gallery filters">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              "focus-ring min-h-11 shrink-0 rounded-[6px] border px-4 text-sm font-bold transition",
              active === category
                ? "border-champagne bg-champagne text-[#17130d]"
                : "border-ivory/12 bg-ivory/[0.035] text-ivory/72 hover:border-champagne/40 hover:text-ivory"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={`${item.title}-${item.category}`}
            className={cn(
              "group relative overflow-hidden rounded-[8px] border border-ivory/10 bg-ivory/[0.035]",
              index === 0 && !limit ? "lg:col-span-2" : ""
            )}
          >
            <div className={cn("relative aspect-[1.1]", index === 0 && !limit ? "lg:aspect-[2.24]" : "")}>
              <Image
                src={item.image}
                alt={`${item.title} event showcase`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,26,18,0.04),rgba(31,26,18,0.62))]" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs font-extrabold uppercase text-champagne">{item.category}</p>
                <h3 className="mt-1 font-display text-3xl font-bold leading-none text-ivory">
                  {item.title}
                </h3>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
