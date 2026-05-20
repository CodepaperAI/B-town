import { Metadata } from "next";
import { QuoteForm } from "@/components/quote-form";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { images, packages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book Now",
  description:
    "Request an instant quote from B-Town Entertainment for wedding DJ, décor, dhol, photo, video, cold sparklers, dry ice, lighting, and GTA event production."
};

export default function BookNowPage() {
  return (
    <>
      <PageHero
        eyebrow="Book Now"
        title="Request your event quote."
        text="Share your event type, date, venue or city, guest count, services, and package interest so B-Town can confirm availability and recommend the right setup."
        image={images.hero}
        cta="Start Form"
      />
      <section className="section-pad">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.75fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Quote form"
              title="Built for real booking conversations."
              text="This v1 booking flow captures the key details without adding payments, contracts, portals, or automation before the business is ready."
            />
            <div className="mt-8 grid gap-3">
              {packages.map((item) => (
                <div key={item.name} className="rounded-[6px] border border-ivory/10 bg-ivory/[0.035] p-4">
                  <p className="font-bold text-ivory">{item.name}</p>
                  <p className="mt-1 text-sm text-ivory/56">{item.ideal}</p>
                </div>
              ))}
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
