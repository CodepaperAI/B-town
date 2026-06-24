import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaButton } from "@/components/cta-button";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/content";
import { btownLocations, btownLocalBusinessSchema, btownServiceSchema, btownBreadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | B-Town Entertainment GTA`,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(btownLocalBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(btownServiceSchema(service)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(btownBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: service.title },
      ])) }} />

      <PageHero
        eyebrow={service.title}
        title={service.title}
        text={service.summary}
        image={service.image}
      />

      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="What's included"
            title={`How ${service.title.toLowerCase()} work with B-Town.`}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
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
            eyebrow="Service areas"
            title={`${service.title} across the Greater Toronto Area.`}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {btownLocations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/services/${service.slug}/${loc.slug}`}
                className="block rounded-2xl border border-ivory/10 bg-ivory/[0.025] px-6 py-5 transition hover:border-champagne/60"
              >
                <p className="text-xs font-extrabold uppercase text-champagne">{loc.regionShort}</p>
                <h3 className="mt-2 font-display text-2xl text-ivory">{service.title} in {loc.name}</h3>
                <p className="mt-2 text-sm text-ivory/70">{loc.headline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ivory/10 bg-ivory/[0.025] py-16">
        <div className="container-shell flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display text-3xl font-bold text-ivory">Ready to book {service.title.toLowerCase()}?</h2>
          <CtaButton href="/book-now">Request Quote</CtaButton>
        </div>
      </section>
    </>
  );
}
