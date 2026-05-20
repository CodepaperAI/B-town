import type { MetadataRoute } from "next";

const routes = [
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

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://btownentertainment.ca${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
