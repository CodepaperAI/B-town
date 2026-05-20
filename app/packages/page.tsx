import { Metadata } from "next";
import { PackageCard } from "@/components/package-card";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { QuoteForm } from "@/components/quote-form";
import { images, packages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Custom B-Town Entertainment packages for DJ, weddings, receptions, luxury production, corporate events, décor, dhol, photo, video, sparklers, and dry ice."
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Packages"
        title="Start with the event, then shape the package."
        text="Packages are designed around venue size, guest count, timeline, cultural moments, production level, and whether you need one service or the full team."
        image={images.reception}
      />
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Package comparison"
            title="Clear options without forcing a one-size-fits-all event."
            text="Pricing starts as custom quotes until B-Town confirms real service rates, venue needs, date availability, and travel details."
            align="center"
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {packages.map((item, index) => (
              <PackageCard key={item.name} item={item} featured={index === 1} />
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-ivory/10 bg-ivory/[0.025] section-pad">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-start">
          <SectionHeading
            eyebrow="Instant quote"
            title="Tell us the room, crowd, and services."
            text="The form captures the details needed to recommend Essential DJ, Wedding Experience, Luxury Production, Full-Service Wedding, or a custom corporate/private package."
          />
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
