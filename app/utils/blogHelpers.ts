import blogHero from "~/assets/blog-hero.png";

/**
 * Normalizes blog image URLs.
 * The backend API (test.ammobrowser.com) returns image URLs pointing to
 * `test.ammobrowser.com/uploads/blogs/...`, but the media files are actually
 * hosted on `admin.ammobrowser.com/uploads/blogs/...`.
 */
export function formatBlogImageUrl(url?: string | null): string {
  if (!url || typeof url !== "string") {
    return blogHero;
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return blogHero;
  }

  // Rewrite test.ammobrowser.com/uploads/blogs/ to admin.ammobrowser.com/uploads/blogs/
  if (trimmed.includes("test.ammobrowser.com/uploads/blogs/")) {
    return trimmed.replace(
      "test.ammobrowser.com/uploads/blogs/",
      "admin.ammobrowser.com/uploads/blogs/"
    );
  }

  // Rewrite relative paths
  if (trimmed.startsWith("/uploads/blogs/")) {
    return `https://admin.ammobrowser.com${trimmed}`;
  }
  if (trimmed.startsWith("uploads/blogs/")) {
    return `https://admin.ammobrowser.com/${trimmed}`;
  }

  return trimmed;
}

export { blogHero };
