// Truthful service area for B-Town Entertainment GTA DJ services.
// Source: business is GTA-based, regularly works across Greater Toronto Area
// weddings and events. Verified at conservative GTA radius.

export type BtownLocation = {
  slug: string;
  name: string;
  region: string;
  regionShort: string;
  country: string;
  neighborhoods: string[];
  adjacentCities: string[];
  isHQ?: boolean;
  headline: string;
};

export const btownLocations: BtownLocation[] = [
  {
    slug: "brampton",
    name: "Brampton",
    region: "Ontario",
    regionShort: "ON",
    country: "Canada",
    neighborhoods: ["Bramalea", "Mount Pleasant", "Springdale", "Castlemore", "Heart Lake"],
    adjacentCities: ["mississauga", "caledon", "vaughan"],
    isHQ: true,
    headline: "DJ and entertainment services in Brampton, ON",
  },
  {
    slug: "mississauga",
    name: "Mississauga",
    region: "Ontario",
    regionShort: "ON",
    country: "Canada",
    neighborhoods: ["Port Credit", "Streetsville", "Erin Mills", "Square One"],
    adjacentCities: ["brampton", "toronto", "etobicoke", "oakville"],
    headline: "DJ and entertainment services in Mississauga, ON",
  },
  {
    slug: "toronto",
    name: "Toronto",
    region: "Ontario",
    regionShort: "ON",
    country: "Canada",
    neighborhoods: ["Downtown Toronto", "Scarborough", "North York", "Etobicoke"],
    adjacentCities: ["mississauga", "vaughan", "markham"],
    headline: "DJ and entertainment services in Toronto, ON",
  },
  {
    slug: "vaughan",
    name: "Vaughan",
    region: "Ontario",
    regionShort: "ON",
    country: "Canada",
    neighborhoods: ["Woodbridge", "Maple", "Thornhill", "Concord"],
    adjacentCities: ["brampton", "toronto", "markham"],
    headline: "DJ and entertainment services in Vaughan, ON",
  },
  {
    slug: "markham",
    name: "Markham",
    region: "Ontario",
    regionShort: "ON",
    country: "Canada",
    neighborhoods: ["Unionville", "Cornell", "Cathedraltown"],
    adjacentCities: ["vaughan", "toronto"],
    headline: "DJ and entertainment services in Markham, ON",
  },
  {
    slug: "caledon",
    name: "Caledon",
    region: "Ontario",
    regionShort: "ON",
    country: "Canada",
    neighborhoods: ["Bolton", "Caledon East", "Inglewood"],
    adjacentCities: ["brampton"],
    headline: "DJ and entertainment services in Caledon, ON",
  },
  {
    slug: "oakville",
    name: "Oakville",
    region: "Ontario",
    regionShort: "ON",
    country: "Canada",
    neighborhoods: ["Bronte", "Glen Abbey", "Old Oakville"],
    adjacentCities: ["mississauga"],
    headline: "DJ and entertainment services in Oakville, ON",
  },
  {
    slug: "milton",
    name: "Milton",
    region: "Ontario",
    regionShort: "ON",
    country: "Canada",
    neighborhoods: ["Beaty", "Bronte Meadows", "Willmott"],
    adjacentCities: ["mississauga", "brampton"],
    headline: "DJ and entertainment services in Milton, ON",
  },
];

export const locationsBySlug = Object.fromEntries(
  btownLocations.map((l) => [l.slug, l]),
);

export function getBtownLocation(slug: string): BtownLocation | null {
  return locationsBySlug[slug] ?? null;
}

export function getAdjacentBtownLocations(slug: string, limit = 3): BtownLocation[] {
  const loc = getBtownLocation(slug);
  if (!loc) return [];
  return loc.adjacentCities
    .map((s) => getBtownLocation(s))
    .filter((l): l is BtownLocation => l !== null)
    .slice(0, limit);
}

const SITE_URL = "https://btownent.ca";

export function btownLocalBusinessSchema(city?: BtownLocation) {
  return {
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    "@id": `${SITE_URL}#business`,
    name: "B-Town Entertainment",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brampton",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    areaServed: city
      ? {
          "@type": "City",
          name: city.name,
          containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" },
        }
      : { "@type": "AdministrativeArea", name: "Greater Toronto Area" },
  };
}

export function btownServiceSchema(
  service: { title: string; slug: string; summary: string },
  city?: BtownLocation,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: city ? `${service.title} in ${city.name}, ${city.regionShort}` : service.title,
    description: service.summary,
    provider: { "@id": `${SITE_URL}#business`, "@type": "EntertainmentBusiness", name: "B-Town Entertainment" },
    areaServed: city
      ? { "@type": "City", name: city.name }
      : { "@type": "AdministrativeArea", name: "Greater Toronto Area" },
    url: city
      ? `${SITE_URL}/services/${service.slug}/${city.slug}`
      : `${SITE_URL}/services/${service.slug}`,
  };
}

export function btownBreadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      ...(item.url ? { item: `${SITE_URL}${item.url}` } : {}),
    })),
  };
}
