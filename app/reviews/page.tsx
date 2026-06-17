import { Metadata } from "next";
import { Star } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { images, testimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Client reviews for B-Town Entertainment wedding DJ, décor, dhol, special effects, and GTA event production."
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="Trust built on packed dance floors and smooth timelines."
        text="Testimonials emphasize music expertise, cultural fit, professional setup, event-day reliability, and premium production moments."
        image={images.hero}
      />
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Client testimonials"
            title="What clients should feel before they inquire."
            text="This page is ready for live Google Reviews integration later; v1 uses curated review cards and clear proof points."
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[...testimonials, ...testimonials].map((item, index) => (
              <article key={`${item.name}-${index}`} className="rounded-[8px] border border-champagne/18 bg-white/88 p-6 shadow-[0_18px_50px_rgba(92,68,25,0.08)]">
                <div className="flex gap-1 text-champagne" aria-label="Five star review">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star key={star} aria-hidden="true" size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-5 text-base leading-8 text-ivory/74">“{item.quote}”</p>
                <p className="mt-5 font-bold text-ivory">{item.name}</p>
                <p className="text-sm text-champagne">{item.event}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
