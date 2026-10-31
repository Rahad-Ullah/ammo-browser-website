// Dynamic sitemap resource route -> served at GET /sitemap.xml
//
// Registered as a TOP-LEVEL route in app/routes.ts (outside the public layout)
// so it is not wrapped by any layout component. It exports only a `loader`
// (no default component), which makes it a resource route: the Response is
// returned as-is.
//
// It combines the fixed marketing/legal pages with the blog listing page and
// every blog post pulled from the blog API, so newly published posts show up
// automatically without editing a static file.
//
// NOTE: public/sitemap.xml has been removed. A static file of the same name
// would be served first and shadow this route.

import { blogService } from "~/services/httpServices/blogService";
import type { ApiBlogListItem } from "~/types";

const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://www.ammobrowser.com"
).replace(/\/+$/, "");

type StaticRoute = { path: string; changefreq: string; priority: string };

// Mirrors the previous static sitemap, plus the /blog listing page.
const STATIC_ROUTES: StaticRoute[] = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/home", changefreq: "daily", priority: "1.0" },
  { path: "/ammo", changefreq: "daily", priority: "0.9" },
  { path: "/blog", changefreq: "daily", priority: "0.9" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/wishlist", changefreq: "weekly", priority: "0.5" },
  { path: "/privacy", changefreq: "yearly", priority: "0.4" },
  { path: "/cookies", changefreq: "yearly", priority: "0.4" },
  { path: "/terms-and-condition", changefreq: "yearly", priority: "0.4" },
];

// Blog posts change slowly and crawlers hit the sitemap often, so cache the
// generated XML in memory for an hour to avoid re-fetching the whole blog list
// on every request.
const CACHE_TTL_MS = 60 * 60 * 1000;
let cache: { xml: string; expires: number } | null = null;

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Walk every page of the blog list so no post is missed.
async function fetchAllBlogPosts(): Promise<ApiBlogListItem[]> {
  const posts: ApiBlogListItem[] = [];
  let page = 1;
  let lastPage = 1;

  do {
    const res = await blogService.getBlogList({ page });
    if (Array.isArray(res?.data)) posts.push(...res.data);
    lastPage = res?.last_page || 1;
    page += 1;
  } while (page <= lastPage);

  return posts;
}

function urlEntry(
  loc: string,
  lastmod: string,
  changefreq: string,
  priority: string
): string {
  return (
    `  <url>\n` +
    `    <loc>${loc}</loc>\n` +
    `    <lastmod>${lastmod}</lastmod>\n` +
    `    <changefreq>${changefreq}</changefreq>\n` +
    `    <priority>${priority}</priority>\n` +
    `  </url>`
  );
}

function buildSitemap(posts: ApiBlogListItem[], today: string): string {
  const entries: string[] = [];

  for (const r of STATIC_ROUTES) {
    entries.push(urlEntry(`${SITE_URL}${r.path}`, today, r.changefreq, r.priority));
  }

  for (const post of posts) {
    if (!post?.slug) continue;
    const lastmod = (post.created_at || today).slice(0, 10);
    entries.push(
      urlEntry(
        `${SITE_URL}/blog/${xmlEscape(post.slug)}`,
        lastmod,
        "weekly",
        "0.7"
      )
    );
  }

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries.join("\n") +
    `\n</urlset>\n`
  );
}

function sitemapResponse(xml: string): Response {
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

export async function loader() {
  const now = Date.now();
  if (cache && cache.expires > now) {
    return sitemapResponse(cache.xml);
  }

  const today = new Date().toISOString().slice(0, 10);

  let posts: ApiBlogListItem[] = [];
  try {
    posts = await fetchAllBlogPosts();
  } catch (err) {
    // If the blog API is unreachable, still return a valid sitemap with the
    // static routes instead of failing the whole request.
    console.error("[sitemap] failed to load blog posts:", err);
  }

  const xml = buildSitemap(posts, today);
  cache = { xml, expires: now + CACHE_TTL_MS };
  return sitemapResponse(xml);
}
