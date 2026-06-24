import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaButton } from "@/components/cta-button";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/content";
import {
  btownLocations,
  getBtownLocation,
  getAdjacentBtownLocations,
  btownLocalBusinessSchema,
  btownServiceSchema,
  btownBreadcrumbSchema,
} from "@/lib/seo";

export function generateStaticParams() {
  return services.flatMap((s) =>
    btownLocations.map((l) => ({ slug: s.slug, city: l.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const service = services.find((s) => s.slug === slug);
  const city = getBtownLocation(citySlug);
  if (!service || !city) return {};
  const title = `${service.title} in ${city.name}, ${city.regionShort}`;
  return {
    title: `${title} | B-Town Entertainment`,
    description: `${service.summary} Available in ${city.name} and the surrounding ${city.region} area.`,
    alternates: { canonical: `/services/${service.slug}/${city.slug}` },
  };
}

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}) {
  const { slug, city: citySlug } = await params;
  const service = services.find((s) => s.slug === slug);
  const city = getBtownLocation(citySlug);
  if (!service || !city) notFound();

  const adjacent = getAdjacentBtownLocations(citySlug, 3);
  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 4);
  const title = `${service.title} in ${city.name}, ${city.regionShort}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(btownLocalBusinessSchema(city)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(btownServiceSchema(service, city)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(btownBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: service.title, url: `/services/${service.slug}` },
        { name: city.name },
      ])) }} />

      <PageHero
        eyebrow={`${city.name}, ${city.regionShort}`}
        title={title}
        text={`${service.summary} Available in ${city.name} and the surrounding ${city.region} area, including ${city.neighborhoods.slice(0, 3).join(", ")}.`}
        image={service.image}
      />

      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow={`About ${city.name}`}
            title={`${service.title} for ${city.name} weddings, receptions and private events.`}
            text={`B-Town Entertainment regularly works ${city.name} venues and homes for South Asian weddings, receptions, engagements, corporate parties and milestone events.`}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {service.points.map((pt) => (
              <div key={pt} className="rounded-2xl border border-ivory/10 bg-ivory/[0.025] px-6 py-5">
                {pt}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ivory/10 section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow={`Working with a trusted ${service.title.toLowerCase()} provider in ${city.name}`}
            title={`Hire a ${service.title.toLowerCase()} company in ${city.name}.`}
            text={`Request a quote to confirm date, package and venue availability for your ${city.name} event.`}
          />
        </div>
      </section>

      {otherServices.length ? (
        <section className="border-t border-ivory/10 section-pad bg-ivory/[0.025]">
          <div className="container-shell">
            <SectionHeading
              eyebrow={`Other services in ${city.name}`}
              title={`Often booked alongside ${service.title.toLowerCase()}.`}
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}/${city.slug}`}
                  className="block rounded-2xl border border-ivory/10 bg-coal/40 px-6 py-5 transition hover:border-champagne/60"
                >
                  <p className="text-xs font-extrabold uppercase text-champagne">Service</p>
                  <h3 className="mt-2 font-display text-xl text-ivory">{s.title} in {city.name}</h3>
                  <p className="mt-2 text-sm text-ivory/70">{s.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {adjacent.length ? (
        <section className="border-t border-ivory/10 section-pad">
          <div className="container-shell">
            <SectionHeading
              eyebrow="Nearby cities"
              title={`${service.title} in cities near ${city.name}.`}
            />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {adjacent.map((adj) => (
                <Link
                  key={adj.slug}
                  href={`/services/${service.slug}/${adj.slug}`}
                  className="block rounded-2xl border border-ivory/10 bg-ivory/[0.025] px-6 py-5 transition hover:border-champagne/60"
                >
                  <p className="text-xs font-extrabold uppercase text-champagne">Service area</p>
                  <h3 className="mt-2 font-display text-xl text-ivory">{service.title} in {adj.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-ivory/10 bg-ivory/[0.025] py-16">
        <div className="container-shell flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display text-3xl font-bold text-ivory">Book {service.title.toLowerCase()} in {city.name}.</h2>
          <CtaButton href="/book-now">Request Quote</CtaButton>
        </div>
      </section>
    </>
  );
}
