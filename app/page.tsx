import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarCheck,
  ChevronRight,
  MapPin,
  MessageCircle,
  Music2,
  Star
} from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { FaqList } from "@/components/faq-list";
import { GalleryFilter } from "@/components/gallery-filter";
import { PackageCard } from "@/components/package-card";
import { QuoteForm } from "@/components/quote-form";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import {
  brand,
  eventTypes,
  images,
  packages,
  serviceHighlights,
  services,
  stats,
  testimonials,
  trustBadges,
  venues
} from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Image
          src={images.hero}
          alt="Luxury South Asian wedding reception with dancing and entertainment"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,250,240,0.95),rgba(255,250,240,0.78),rgba(255,250,240,0.44))]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,rgba(255,250,240,0),rgba(255,250,240,1))]" />

        <div className="container-shell grid min-h-[86dvh] items-center gap-10 pb-12 pt-24 xl:grid-cols-[minmax(0,1fr)_440px]">
          <div className="animate-rise">
            <div className="inline-flex min-h-10 items-center gap-2 rounded-[6px] border border-champagne/35 bg-ink/58 px-3 text-xs font-extrabold uppercase text-champagne backdrop-blur">
              <Music2 aria-hidden="true" size={15} />
              Brampton-based GTA event entertainment
            </div>
            <h1 className="hero-title balanced-text mt-6 max-w-5xl font-display font-bold text-ivory">
              <span className="block">B-Town</span>
              <span className="block">Entertainment</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/76 md:text-xl">
              Premium DJ, décor, dhol, photography, cinematic video, sound,
              lighting, cold sparklers, and dancing-on-clouds effects for GTA
              weddings and celebrations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaButton href="/book-now">Get Instant Quote</CtaButton>
              <CtaButton href="/gallery" variant="secondary">
                View Event Highlights
              </CtaButton>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {trustBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.label}
                    className="flex min-h-12 items-center gap-3 rounded-[6px] border border-ivory/10 bg-ink/52 px-3 text-sm font-bold text-ivory/78 backdrop-blur"
                  >
                    <Icon aria-hidden="true" size={17} className="text-champagne" />
                    {badge.label}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full max-w-xl animate-slow-fade xl:max-w-[440px] xl:justify-self-end">
            <QuoteForm compact />
          </div>
        </div>
      </section>

      <section className="border-y border-ivory/10 bg-ivory/[0.025]">
        <div className="container-shell grid gap-3 py-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[6px] border border-ivory/8 bg-ink/40 p-4">
              <p className="font-display text-4xl font-bold text-champagne">{stat.value}</p>
              <p className="mt-1 text-xs font-bold uppercase text-ivory/52">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Full-service production"
              title="One brand for the whole celebration."
              text="From the first song to the final sparkler shot, B-Town brings entertainment, visual production, décor, and media into one coordinated experience."
            />
            <CtaButton href="/services" variant="secondary" className="md:mb-2">
              Explore Services
            </CtaButton>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ivory/10 bg-ivory/[0.025]">
        <div className="container-shell grid gap-10 py-16 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[0.78] overflow-hidden rounded-[8px] border border-ivory/10">
              <Image src={images.dhol} alt="Live dhol wedding entrance" fill sizes="50vw" className="object-cover" />
            </div>
            <div className="relative mt-10 aspect-[0.78] overflow-hidden rounded-[8px] border border-ivory/10">
              <Image src={images.weddingStage} alt="Luxury wedding stage setup" fill sizes="50vw" className="object-cover" />
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Why couples book B-Town"
              title="Luxury visuals with real dance-floor energy."
              text="The experience is designed for South Asian and multicultural celebrations where family moments, entrances, music transitions, and room reveals all matter."
            />
            <div className="mt-8 grid gap-3">
              {serviceHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex gap-3 rounded-[6px] border border-ivory/10 bg-ink/45 p-4 text-sm leading-7 text-ivory/72"
                >
                  <BadgeCheck aria-hidden="true" className="mt-1 shrink-0 text-champagne" size={18} />
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-b border-ivory/10 bg-champagne py-4 text-[#17130d]">
        <div className="flex w-max animate-marquee gap-4 whitespace-nowrap">
          {[...eventTypes, ...eventTypes].map((eventType, index) => (
            <span key={`${eventType}-${index}`} className="px-4 text-sm font-black uppercase">
              {eventType}
            </span>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Packages"
            title="Build the event around your room, crowd, and timeline."
            text="Every package starts with the real details: date, venue, guest count, event type, family moments, and the level of production you want."
            align="center"
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {packages.map((item, index) => (
              <PackageCard key={item.name} item={item} featured={index === 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ivory/10 bg-ivory/[0.025] section-pad">
        <div className="container-shell">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Gallery"
              title="Showcase moments built for photos, reels, and memories."
              text="Filter by event type and service category, then route every visual back to an inquiry."
            />
            <CtaButton href="/gallery" variant="secondary" className="md:mb-2">
              Open Gallery
            </CtaButton>
          </div>
          <div className="mt-10">
            <GalleryFilter limit={6} />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-center">
          <SectionHeading
            eyebrow="Reels and social proof"
            title="Designed for the way people discover vendors now."
            text="Vertical highlights, client reactions, room reveals, and effect moments give visitors the proof they expect before they inquire."
          />
          <div className="grid grid-cols-3 gap-3">
            {[images.dj, images.sparklers, images.reception].map((image, index) => (
              <div key={image} className="relative aspect-[9/16] overflow-hidden rounded-[8px] border border-ivory/10">
                <Image src={image} alt="Vertical event reel preview" fill sizes="30vw" className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,240,0.02),rgba(31,26,18,0.52))]" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-[11px] font-extrabold uppercase text-champagne">Reel 0{index + 1}</p>
                  <p className="mt-1 text-sm font-bold leading-tight text-ivory">Event highlight</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ivory/10 bg-ivory/[0.025] section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Client love"
            title="The best nights feel organized and alive."
            text="Testimonials are written to mirror the real trust drivers: music taste, timeline control, cultural understanding, effects, and reliability."
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded-[8px] border border-ivory/10 bg-ink/48 p-6">
                <div className="flex gap-1 text-champagne" aria-label="Five star review">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} aria-hidden="true" size={16} fill="currentColor" />
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

      <section className="section-pad">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.82fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Quick answers before the quote."
              text="Give clients confidence about service area, customization, effects, music style, and booking flow."
            />
            <CtaButton href="/faq" variant="secondary" className="mt-8">
              View All FAQs
            </CtaButton>
          </div>
          <FaqList limit={4} />
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-t border-ivory/10 py-20">
        <Image src={images.decor} alt="" fill sizes="100vw" className="absolute inset-0 -z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,250,240,0.95),rgba(255,250,240,0.78))]" />
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase text-champagne">Ready when the date is real</p>
            <h2 className="mt-4 font-display text-5xl font-bold leading-[0.9] text-ivory md:text-7xl">
              Check your event date.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ivory/74">
              Share the date, venue, guest count, and services. B-Town will shape the right package around your celebration.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <Link href="/book-now" className="focus-ring flex min-h-16 items-center justify-between rounded-[6px] bg-champagne px-5 font-extrabold uppercase text-[#17130d]">
              Book Now <ChevronRight aria-hidden="true" size={18} />
            </Link>
            <a href={brand.whatsappHref} className="focus-ring flex min-h-16 items-center justify-between rounded-[6px] bg-peacock px-5 font-extrabold uppercase text-white">
              WhatsApp <MessageCircle aria-hidden="true" size={18} />
            </a>
            <a href={`tel:${brand.phoneHref}`} className="focus-ring flex min-h-16 items-center justify-between rounded-[6px] border border-ivory/18 bg-ink/62 px-5 font-extrabold uppercase text-ivory">
              Call Now <CalendarCheck aria-hidden="true" size={18} />
            </a>
          </div>
        </div>
        <div className="container-shell mt-10 flex flex-wrap gap-2 text-xs font-bold uppercase text-ivory/54">
          <MapPin aria-hidden="true" size={16} className="text-champagne" />
          {venues.map((venue) => (
            <span key={venue}>{venue}</span>
          ))}
        </div>
      </section>
    </>
  );
}
