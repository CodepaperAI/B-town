import { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { blogPosts, images } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "B-Town Entertainment blog for wedding planning, DJ timelines, Punjabi and Bollywood music, special effects, décor, and GTA event ideas."
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Wedding and event ideas that bring in search traffic."
        text="Educational content for couples and planners searching for GTA wedding DJ, reception planning, special effects, décor, dhol, and entertainment guidance."
        image={images.media}
      />
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="SEO content hub"
            title="Helpful posts for clients who are still planning."
            text="These starter articles create the blog structure. Each can become a full SEO page with local terms, internal links, and booking CTAs."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.title} className="group rounded-[8px] border border-champagne/18 bg-white/88 p-6 shadow-[0_18px_50px_rgba(92,68,25,0.08)] transition hover:border-champagne/40 hover:bg-white">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-extrabold uppercase text-champagne">{post.tag}</p>
                  <ArrowUpRight aria-hidden="true" size={18} className="text-ivory/40 transition group-hover:text-champagne" />
                </div>
                <h2 className="mt-5 font-display text-4xl font-bold leading-none text-ivory">
                  {post.title}
                </h2>
                <p className="mt-5 text-sm leading-7 text-ivory/64">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
