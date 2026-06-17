import { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { QuoteForm } from "@/components/quote-form";
import { SectionHeading } from "@/components/section-heading";
import { brand, images, venues } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact B-Town Entertainment for Brampton and GTA wedding DJ, décor, dhol, media, cold sparklers, dry ice, corporate events, and private celebrations."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start with the date. We'll shape the experience."
        text="Reach B-Town by quote form, call, WhatsApp, or email for weddings, receptions, birthdays, private parties, corporate events, and cultural celebrations."
        image={images.corporate}
      />
      <section className="section-pad">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Contact details"
              title="Fast paths for serious inquiries."
              text="The contact area is designed around mobile-first lead capture with direct call and WhatsApp options."
            />
            <div className="mt-8 grid gap-3">
              <a href={`tel:${brand.phoneHref}`} className="focus-ring flex min-h-14 items-center gap-4 rounded-[6px] border border-champagne/18 bg-white/82 px-4 text-ivory/76 shadow-[0_12px_34px_rgba(92,68,25,0.06)] transition hover:border-champagne/40 hover:bg-white hover:text-ivory">
                <Phone aria-hidden="true" className="text-champagne" size={20} />
                {brand.phoneLabel}
              </a>
              <a href={brand.whatsappHref} className="focus-ring flex min-h-14 items-center gap-4 rounded-[6px] border border-champagne/18 bg-white/82 px-4 text-ivory/76 shadow-[0_12px_34px_rgba(92,68,25,0.06)] transition hover:border-peacock hover:bg-white hover:text-ivory">
                <MessageCircle aria-hidden="true" className="text-peacock" size={20} />
                WhatsApp direct inquiry
              </a>
              <a href={`mailto:${brand.email}`} className="focus-ring flex min-h-14 items-center gap-4 rounded-[6px] border border-champagne/18 bg-white/82 px-4 text-ivory/76 shadow-[0_12px_34px_rgba(92,68,25,0.06)] transition hover:border-champagne/40 hover:bg-white hover:text-ivory">
                <Mail aria-hidden="true" className="text-champagne" size={20} />
                {brand.email}
              </a>
              <div className="flex min-h-14 items-start gap-4 rounded-[6px] border border-champagne/18 bg-white/82 px-4 py-4 text-ivory/76 shadow-[0_12px_34px_rgba(92,68,25,0.06)]">
                <MapPin aria-hidden="true" className="mt-0.5 text-champagne" size={20} />
                <span>Brampton-based service across {venues.join(", ")} and the GTA.</span>
              </div>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
