import { Metadata } from "next";
import Image from "next/image";
import { GalleryFilter } from "@/components/gallery-filter";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { images } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "B-Town Entertainment event gallery for weddings, receptions, Roka, Maiyan, décor, dhol, birthday, corporate, backyard, and special effects inspiration."
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Wedding, décor, dhol, DJ, and production highlights."
        text="A premium visual gallery built around the moments clients actually want to inspect: room setup, dance floor energy, cultural entries, effects, and media coverage."
        image={images.decor}
      />
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Filtered showcases"
            title="Browse by event type and service."
            text="The gallery is designed for fast scanning on mobile while still feeling cinematic on desktop."
          />
          <div className="mt-10">
            <GalleryFilter />
          </div>
        </div>
      </section>
      <section className="border-t border-ivory/10 bg-ivory/[0.025] py-16">
        <div className="container-shell grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Before and after"
              title="From empty room to reception reveal."
              text="A before/after décor showcase gives visitors confidence that B-Town can transform a space, not just play music in it."
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[0.92] overflow-hidden rounded-[8px] border border-ivory/10">
              <Image src={images.corporate} alt="Venue before event styling" fill sizes="50vw" className="object-cover grayscale" />
              <span className="absolute left-3 top-3 rounded-[4px] bg-ink/80 px-2 py-1 text-xs font-extrabold uppercase text-ivory">
                Before
              </span>
            </div>
            <div className="relative aspect-[0.92] overflow-hidden rounded-[8px] border border-champagne/35">
              <Image src={images.decor} alt="Venue after luxury wedding styling" fill sizes="50vw" className="object-cover" />
              <span className="absolute left-3 top-3 rounded-[4px] bg-champagne px-2 py-1 text-xs font-extrabold uppercase text-[#17130d]">
                After
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
