import blogHero from "~/assets/blog-hero.png";

/**
 * Normalizes blog image URLs.
 * The backend API (test.ammobrowser.com) returns image URLs pointing to
 * `test.ammobrowser.com/uploads/blogs/...`, but the media files are actually
 * hosted on `admin.ammobrowser.com/uploads/blogs/...`.
 */
const BLOG_MEDIA_ORIGIN = "https://admin.ammobrowser.com";

export function formatBlogImageUrl(url?: string | null): string {
  if (!url || typeof url !== "string") {
    return blogHero;
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return blogHero;
  }

  // Blog files are stored on the admin host. API responses often point at
  // the app host or a local server, where the same path returns 404.
  const marker = "/uploads/blogs/";
  const markerIndex = trimmed.indexOf(marker);
  if (markerIndex !== -1) {
    if (trimmed.startsWith(BLOG_MEDIA_ORIGIN)) return trimmed;
    return `${BLOG_MEDIA_ORIGIN}${trimmed.slice(markerIndex)}`;
  }

  return trimmed;
}

/** CMS posts separate paragraphs with empty <p>&nbsp;</p> tags. */
export function cleanBlogHtml(html: string): string {
  return html.replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "");
}

export { blogHero };
