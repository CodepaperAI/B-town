import type { MetadataRoute } from "next";
import { listBlogs } from "@/lib/upliftai";

const SITE_URL = "https://btownent.ca";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/gallery",
  "/packages",
  "/reviews",
  "/faq",
  "/contact",
  "/book-now",
  "/blog"
];

export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await listBlogs({ limit: 100 });
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));

  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => {
    const updated = blog.updatedAt || blog.publishDate;
    return {
      url: `${SITE_URL}/blog/${blog.slug}`,
      lastModified: updated ? new Date(updated) : now,
      changeFrequency: "weekly",
      priority: 0.7
    };
  });

  return [...staticEntries, ...blogEntries];
}
