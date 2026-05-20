import { Metadata } from "next";
import { CtaButton } from "@/components/cta-button";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { images, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "B-Town Entertainment services: wedding DJ, décor, photography, videography, dhol, cold sparklers, dry ice, sound, lighting, and corporate event production."
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Entertainment, décor, media, and effects under one roof."
        text="Premium service pages for DJ, décor, photo and video, dhol, wedding packages, special effects, corporate events, backyard celebrations, and private parties."
        image={images.dj}
      />
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="What B-Town offers"
            title="Choose one service or build the full experience."
            text="Every section includes a clear inquiry path, package context, and the kind of details clients need before they reach out."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-ivory/10 bg-ivory/[0.025] py-16">
        <div className="container-shell flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase text-champagne">Custom package builder</p>
            <h2 className="mt-2 font-display text-4xl font-bold text-ivory">
              Need DJ, dhol, décor, photo, video, and effects together?
            </h2>
          </div>
          <CtaButton href="/book-now">Request Quote</CtaButton>
        </div>
      </section>
    </>
  );
}
