import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { CtaButton } from "@/components/cta-button";
import { brand } from "@/lib/content";
import { formatPublishDate, getBlog, listBlogs } from "@/lib/upliftai";

export const revalidate = 600;
export const dynamicParams = true;

const SITE_URL = "https://btownent.ca";

type Params = { slug: string };

type PageProps = { params: Promise<Params> };

export async function generateStaticParams(): Promise<Params[]> {
  const blogs = await listBlogs({ limit: 100 });
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Post not found",
      description: "The blog post you’re looking for has moved or doesn’t exist."
    };
  }

  const title = blog.meta?.seoTitle || blog.title;
  const description =
    blog.meta?.seoDescription ||
    blog.excerpt ||
    "An article from B-Town Entertainment, GTA's premier event production team.";
  const canonical = `${SITE_URL}/blog/${blog.slug}`;
  const image = blog.featuredImage || `${SITE_URL}/images/hero-reception.webp`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: blog.meta?.ogTitle || title,
      description: blog.meta?.ogDescription || description,
      url: canonical,
      type: "article",
      siteName: blog.meta?.ogSiteName || brand.name,
      locale: blog.meta?.ogLocale || "en_CA",
      publishedTime: blog.publishDate,
      modifiedTime: blog.updatedAt,
      authors: blog.authorName ? [blog.authorName] : undefined,
      section: blog.meta?.articleSection,
      tags: blog.meta?.articleTags || blog.tags,
      images: image ? [{ url: image, alt: blog.title }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined
    },
    keywords: blog.meta?.keywords?.length ? blog.meta.keywords : blog.tags
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) notFound();

  const dateLabel = formatPublishDate(blog);
  const tags = blog.tags || [];
  const categoryLabel = blog.categories?.[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.meta?.seoDescription || blog.excerpt,
    image: blog.featuredImage ? [blog.featuredImage] : undefined,
    datePublished: blog.publishDate,
    dateModified: blog.updatedAt || blog.publishDate,
    author: blog.authorName
      ? {
          "@type": "Person",
          name: blog.authorName,
          url: blog.authorUrl
        }
      : { "@type": "Organization", name: brand.name },
    publisher: {
      "@type": "Organization",
      name: brand.name,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.ico` }
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${blog.slug}` },
    articleSection: blog.meta?.articleSection || categoryLabel,
    keywords: (blog.meta?.keywords || tags).join(", ") || undefined
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="bg-[linear-gradient(180deg,#fffdf8,#fbf5e6_55%,#fffaf0)]">
        <header className="relative isolate overflow-hidden">
          {blog.featuredImage ? (
            <>
              <Image
                src={blog.featuredImage}
                alt={blog.title}
                fill
                priority
                sizes="100vw"
                className="absolute inset-0 -z-20 object-cover"
                unoptimized
              />
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(31,26,18,0.55),rgba(31,26,18,0.78))]" />
            </>
          ) : (
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#1f1a12,#3a2f1d)]" />
          )}
          <div className="container-shell pt-28 pb-16 md:pt-32 md:pb-20">
            <Link
              href="/blog"
              className="focus-ring inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-champagne hover:text-white"
            >
              <ArrowLeft aria-hidden="true" size={14} />
              All posts
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-champagne">
              {categoryLabel ? (
                <span className="rounded-full border border-champagne/45 bg-champagne/10 px-3 py-1">
                  {categoryLabel}
                </span>
              ) : null}
              {dateLabel ? (
                <span className="inline-flex items-center gap-2 text-ivory/72">
                  <Calendar aria-hidden="true" size={12} />
                  {dateLabel}
                </span>
              ) : null}
              {blog.authorName ? (
                <span className="inline-flex items-center gap-2 text-ivory/72">
                  <User aria-hidden="true" size={12} />
                  {blog.authorName}
                </span>
              ) : null}
            </div>
            <h1 className="balanced-text mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.02] text-ivory md:text-6xl">
              {blog.title}
            </h1>
            {blog.excerpt ? (
              <p className="mt-5 max-w-3xl text-lg leading-8 text-ivory/82">{blog.excerpt}</p>
            ) : null}
          </div>
        </header>

        <div className="container-shell pb-24 pt-12 md:grid md:grid-cols-[minmax(0,1fr)_280px] md:gap-12 md:pt-16">
          <div className="prose-blog">
            {blog.content ? (
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            ) : (
              <p>{blog.excerpt || "Content coming soon."}</p>
            )}

            {tags.length > 0 ? (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-champagne/22 pt-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full border border-champagne/30 bg-white/80 px-3 py-1 text-xs font-semibold text-[#1f1a12]/75"
                  >
                    <Tag aria-hidden="true" size={11} />
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <aside className="mt-12 space-y-6 md:mt-0">
            <div className="rounded-[10px] border border-champagne/28 bg-[#17130d] p-6 text-ivory shadow-[0_22px_50px_rgba(31,26,18,0.18)]">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-champagne">
                Plan your event
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight">
                Talk to B-Town Entertainment.
              </h3>
              <p className="mt-3 text-sm leading-6 text-ivory/72">
                Get a custom DJ + dhol + effects package built around your venue, guest count, and
                vibe. Most clients hear back the same day.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <CtaButton href="/book-now">Get Instant Quote</CtaButton>
                <a
                  href={`tel:${brand.phoneHref}`}
                  className="focus-ring inline-flex min-h-12 items-center justify-center rounded-[6px] border border-champagne/30 px-4 text-sm font-extrabold uppercase tracking-wide text-champagne hover:bg-champagne/10"
                >
                  Call {brand.phoneLabel}
                </a>
              </div>
            </div>

            <div className="rounded-[10px] border border-champagne/22 bg-white/88 p-6 text-[#1f1a12]/82">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-champagne">
                Article info
              </p>
              <dl className="mt-3 space-y-2 text-sm">
                {dateLabel ? (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[#1f1a12]/55">Published</dt>
                    <dd className="font-semibold">{dateLabel}</dd>
                  </div>
                ) : null}
                {blog.authorName ? (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[#1f1a12]/55">Author</dt>
                    <dd className="font-semibold">{blog.authorName}</dd>
                  </div>
                ) : null}
                {categoryLabel ? (
                  <div className="flex justify-between gap-3">
                    <dt className="text-[#1f1a12]/55">Category</dt>
                    <dd className="font-semibold">{categoryLabel}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
