import "server-only";

const BASE = "https://api.upliftai.co/api/public/v1";
const REVALIDATE_SECONDS = 600;

export type BlogFreshness = {
  lastUpdatedAt?: string;
  ageDays?: number;
  needsRefresh?: boolean;
  freshnessThresholdDays?: number;
};

export type BlogMeta = {
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogLocale?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
};

export type BlogSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  status: "PUBLISH" | "DRAFT";
  publishDate?: string;
  publishTime?: string;
  featuredImage?: string;
  categories?: string[];
  tags?: string[];
  seoScore?: number;
  createdAt?: string;
  updatedAt?: string;
  authorName?: string;
  authorUrl?: string;
  freshness?: BlogFreshness;
  meta?: BlogMeta;
  customFields?: Record<string, unknown>;
};

export type BlogDetail = BlogSummary & {
  analytics?: {
    contentQualityScore?: number;
    rankingPotential?: string;
    conversionPotential?: string;
    externalLinksCount?: number;
  };
};

type ListResponse = {
  success: boolean;
  data?: {
    blogs: BlogSummary[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  };
  error?: string;
};

type DetailResponse = {
  success: boolean;
  data?: { blog: BlogDetail };
  error?: string;
};

function getToken(): string | null {
  const token = process.env.UPLIFTAI_TOKEN;
  return token && token.trim() ? token.trim() : null;
}

export async function listBlogs(options: { limit?: number; page?: number } = {}): Promise<BlogSummary[]> {
  const token = getToken();
  if (!token) return [];

  const params = new URLSearchParams();
  params.set("limit", String(options.limit ?? 50));
  params.set("page", String(options.page ?? 1));
  params.set("status", "PUBLISH");

  const url = `${BASE}/blogs?${params.toString()}`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: REVALIDATE_SECONDS, tags: ["upliftai-blogs"] }
    });
    if (!response.ok) return [];
    const json = (await response.json()) as ListResponse;
    if (!json.success || !json.data) return [];
    return json.data.blogs.filter((blog) => blog.status === "PUBLISH");
  } catch {
    return [];
  }
}

export async function getBlog(slug: string): Promise<BlogDetail | null> {
  const token = getToken();
  if (!token || !slug) return null;

  const url = `${BASE}/blog/${encodeURIComponent(slug)}`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: REVALIDATE_SECONDS, tags: ["upliftai-blogs", `upliftai-blog-${slug}`] }
    });
    if (!response.ok) return null;
    const json = (await response.json()) as DetailResponse;
    if (!json.success || !json.data?.blog) return null;
    return json.data.blog;
  } catch {
    return null;
  }
}

export function formatPublishDate(blog: Pick<BlogSummary, "publishDate" | "createdAt">): string {
  const raw = blog.publishDate || blog.createdAt;
  if (!raw) return "";
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
