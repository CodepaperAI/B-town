import Image from "next/image";
import { CtaButton } from "./cta-button";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  cta?: string;
};

export function PageHero({ eyebrow, title, text, image, cta = "Get Instant Quote" }: PageHeroProps) {
  return (
    <section className="relative isolate min-h-[52dvh] overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,250,240,0.95),rgba(255,250,240,0.78),rgba(255,250,240,0.42))]" />
      <div className="container-shell flex min-h-[52dvh] items-end pb-12 pt-24">
        <div className="max-w-3xl animate-rise">
          <p className="text-xs font-extrabold uppercase text-champagne">{eyebrow}</p>
          <h1 className="balanced-text mt-4 font-display text-5xl font-bold leading-[0.9] text-ivory md:text-7xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ivory/76">{text}</p>
          <div className="mt-7">
            <CtaButton href="/book-now">{cta}</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
