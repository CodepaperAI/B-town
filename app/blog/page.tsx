import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { images } from "@/lib/content";
import { formatPublishDate, listBlogs, type BlogSummary } from "@/lib/upliftai";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "B-Town Entertainment blog for wedding planning, DJ timelines, Punjabi and Bollywood music, special effects, décor, and GTA event ideas."
};

export default async function BlogPage() {
  const blogs = await listBlogs({ limit: 60 });

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Wedding and event ideas, fresh every week."
        text="Practical guides for couples and planners — DJ timelines, special effects, décor inspiration, dhol moments, and the local GTA know-how that makes events unforgettable."
        image={images.media}
      />
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Latest posts"
            title="Real-world advice from the dance floor."
            text="New posts go up regularly. Every article comes from a real B-Town event — what worked, what didn't, and what to plan for."
          />
          {blogs.length === 0 ? <EmptyState /> : <BlogGrid blogs={blogs} />}
        </div>
      </section>
    </>
  );
}

function BlogGrid({ blogs }: { blogs: BlogSummary[] }) {
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function BlogCard({ post }: { post: BlogSummary }) {
  const dateLabel = formatPublishDate(post);
  const categoryLabel = post.categories?.[0] || "Blog";
  const excerpt = post.excerpt || stripHtml(post.content || "").slice(0, 180);

  return (
    <article className="group flex flex-col overflow-hidden rounded-[10px] border border-champagne/22 bg-white/92 shadow-[0_18px_50px_rgba(92,68,25,0.08)] transition hover:border-champagne/45 hover:bg-white">
      <Link href={`/blog/${post.slug}`} className="focus-ring block">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f3ead5]">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#1f1a12,#3a2f1d)]" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(31,26,18,0.25))]" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-champagne">
              {categoryLabel}
            </p>
            <ArrowUpRight
              aria-hidden="true"
              size={18}
              className="text-[#1f1a12]/40 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-champagne"
            />
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-[#1f1a12] md:text-3xl">
            {post.title}
          </h2>
          {excerpt ? (
            <p className="mt-3 text-sm leading-7 text-[#1f1a12]/68 line-clamp-3">{excerpt}</p>
          ) : null}
          <div className="mt-auto flex items-center gap-2 pt-5 text-xs font-semibold uppercase tracking-wide text-[#1f1a12]/55">
            <Calendar aria-hidden="true" size={13} />
            {dateLabel || "Coming soon"}
            {post.authorName ? (
              <>
                <span aria-hidden="true">·</span>
                <span className="normal-case tracking-normal">{post.authorName}</span>
              </>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 rounded-[10px] border border-champagne/25 bg-white/85 p-10 text-center">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-champagne">
        Coming soon
      </p>
      <h3 className="mt-3 font-display text-3xl font-bold text-[#1f1a12] md:text-4xl">
        First posts arrive shortly.
      </h3>
      <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#1f1a12]/65">
        Our team is putting together wedding planning guides, DJ timelines, and special effects
        breakdowns. Check back soon — or reach out and we&apos;ll share ideas tailored to your event.
      </p>
    </div>
  );
}

function stripHtml(input: string): string {
  return input
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
