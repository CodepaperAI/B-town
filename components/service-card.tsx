import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content";

type Service = (typeof services)[number];

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article
      id={service.slug}
      className="service-card group overflow-hidden rounded-[8px] border border-ivory/10 bg-ivory/[0.035] transition duration-300 hover:border-champagne/50 hover:bg-ivory/[0.06]"
    >
      <div className="service-card-media relative aspect-[1.25] overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.title} by B-Town Entertainment`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="service-card-image object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0),rgba(5,5,5,0.76))]" />
        <div className="service-card-icon absolute bottom-4 left-4 grid size-11 place-items-center rounded-[6px] bg-champagne text-[#17130d]">
          <Icon aria-hidden="true" size={22} />
        </div>
      </div>
      <div className="service-card-copy p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-3xl font-bold leading-none text-ivory">
            {service.title}
          </h3>
          <Link
            href={`/services#${service.slug}`}
            className="service-card-link focus-ring grid size-10 shrink-0 place-items-center rounded-[6px] border border-ivory/14 text-ivory/72 transition group-hover:border-champagne group-hover:text-champagne"
            aria-label={`View ${service.title}`}
          >
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <p className="mt-4 text-sm leading-7 text-ivory/64">{service.summary}</p>
        <ul className="mt-5 grid gap-2 text-sm text-ivory/72">
          {service.points.slice(0, 3).map((point) => (
            <li key={point} className="service-card-point flex gap-2">
              <span aria-hidden="true" className="mt-2 size-1.5 rounded-[2px] bg-champagne" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
