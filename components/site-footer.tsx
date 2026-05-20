import Link from "next/link";
import { Camera, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { brand, navItems, services, venues } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-champagne/20 bg-ink-soft">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr]">
        <div>
          <Link href="/" className="focus-ring inline-flex items-center gap-3 rounded-[6px]">
            <span className="grid size-12 place-items-center rounded-[6px] border border-champagne/50 bg-champagne text-2xl font-black text-[#17130d]">
              B
            </span>
            <span>
              <span className="block font-display text-3xl font-bold">B-Town</span>
              <span className="block text-xs font-bold uppercase text-champagne">
                Entertainment
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-ivory/64">
            Full-service event entertainment, décor, media, dhol, and production for
            Brampton, the GTA, and unforgettable cultural celebrations.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={brand.instagram}
              className="focus-ring grid size-11 place-items-center rounded-[6px] border border-ivory/14 text-ivory/80 transition hover:bg-champagne hover:text-[#17130d]"
              aria-label="B-Town Entertainment Instagram"
            >
              <Camera aria-hidden="true" size={18} />
            </a>
            <a
              href={brand.whatsappHref}
              className="focus-ring grid size-11 place-items-center rounded-[6px] border border-ivory/14 text-ivory/80 transition hover:bg-peacock hover:text-white"
              aria-label="B-Town Entertainment WhatsApp"
            >
              <MessageCircle aria-hidden="true" size={18} />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase text-champagne">Pages</h2>
          <ul className="mt-4 grid gap-3 text-sm text-ivory/68">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="focus-ring rounded-[4px] transition hover:text-ivory" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="focus-ring rounded-[4px] transition hover:text-ivory" href="/blog">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase text-champagne">Services</h2>
          <ul className="mt-4 grid gap-3 text-sm text-ivory/68">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link
                  className="focus-ring rounded-[4px] transition hover:text-ivory"
                  href={`/services#${service.slug}`}
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase text-champagne">Contact</h2>
          <ul className="mt-4 grid gap-4 text-sm text-ivory/68">
            <li className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 text-champagne" size={17} />
              <a className="focus-ring rounded-[4px] hover:text-ivory" href={`tel:${brand.phoneHref}`}>
                {brand.phoneLabel}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 text-champagne" size={17} />
              <a className="focus-ring rounded-[4px] hover:text-ivory" href={`mailto:${brand.email}`}>
                {brand.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 text-champagne" size={17} />
              <span>{venues.slice(0, 5).join(" / ")} / GTA</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-5">
        <div className="container-shell flex flex-col gap-2 text-xs text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 B-Town Entertainment. All rights reserved.</p>
          <p>Premium DJ, décor, dhol, media, and event production in Brampton.</p>
        </div>
      </div>
    </footer>
  );
}
