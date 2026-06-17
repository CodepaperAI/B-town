import { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { images, serviceHighlights, venues } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About B-Town Entertainment, a Brampton-based full-service event entertainment and production company for weddings, receptions, cultural celebrations, and GTA events."
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About B-Town"
        title="Luxury, energy, and unforgettable vibes."
        text="B-Town Entertainment is a full-service event entertainment and production company based in Brampton, specializing in weddings, receptions, engagements, birthdays, corporate events, and cultural celebrations across the GTA."
        image={images.reception}
      />
      <section className="section-pad">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <div className="relative aspect-[0.9] overflow-hidden rounded-[8px] border border-champagne/20 shadow-[0_18px_50px_rgba(92,68,25,0.1)]">
            <Image src={images.djAlt} alt="B-Town Entertainment production setup" fill sizes="50vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading
              eyebrow="Brand promise"
              title="Smooth planning, professional setup, real celebration energy."
              text="The website positions B-Town as the one-stop solution for entertainment, décor, and media coverage without making the experience feel generic or overbuilt."
            />
            <div className="mt-8 grid gap-3">
              {serviceHighlights.map((highlight) => (
                <div key={highlight} className="flex gap-3 rounded-[6px] border border-champagne/18 bg-white/82 p-4 text-sm leading-7 text-ivory/70 shadow-[0_12px_34px_rgba(92,68,25,0.06)]">
                  <BadgeCheck aria-hidden="true" className="mt-1 shrink-0 text-champagne" size={18} />
                  {highlight}
                </div>
              ))}
            </div>
            <CtaButton href="/book-now" className="mt-8">Plan Your Event</CtaButton>
          </div>
        </div>
      </section>
      <section className="border-t border-ivory/10 bg-ivory/[0.025] py-16">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Service area"
            title="Brampton roots. GTA reach."
            text="The content is SEO-ready for Brampton and nearby cities without stuffing the page with low-quality location text."
            align="center"
          />
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {venues.map((venue) => (
              <span key={venue} className="rounded-[4px] border border-champagne/28 bg-champagne/8 px-4 py-2 text-sm font-bold text-champagne">
                {venue}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
