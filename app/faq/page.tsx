import { Metadata } from "next";
import { FaqList } from "@/components/faq-list";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { images } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "B-Town Entertainment FAQ for bookings, GTA service area, DJ-only options, dhol, dry ice, cold sparklers, custom packages, and wedding entertainment."
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Answers before you book."
        text="Common questions for weddings, receptions, Rokas, Maiyans, corporate events, DJ packages, special effects, and custom service builds."
        image={images.sparklers}
      />
      <section className="section-pad">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.75fr_1fr]">
          <SectionHeading
            eyebrow="Booking clarity"
            title="Make the next step obvious."
            text="Every answer reduces hesitation and routes clients back to quote, WhatsApp, or call."
          />
          <FaqList />
        </div>
      </section>
    </>
  );
}
