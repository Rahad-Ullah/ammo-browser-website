export interface CaliberItem {
  id: string;
  caliber: string;
}

/**
 * Converts a caliber name into a clean, URL-safe slug.
 * Examples:
 *   "9mm" -> "9mm"
 *   "9mm Luger" -> "9mm-luger"
 *   "5.56x45mm NATO" -> "5.56x45mm-nato"
 *   ".223 Remington" -> "223-remington"
 */
export const caliberToSlug = (name: string): string => {
  if (!name) return "";
  return name
    .toLowerCase()
    .trim()
    .replace(/^(\.)+/, "")
    .replace(/[\s/]+/g, "-")
    .replace(/[^a-z0-9.-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

/**
 * Converts a slug into a formatted display name as a fallback.
 * Examples:
 *   "9mm-luger" -> "9mm Luger"
 *   "5.56x45mm-nato" -> "5.56x45mm NATO"
 *   "223-remington" -> "223 Remington"
 */
export const slugToDisplayCaliber = (slug: string): string => {
  if (!slug) return "Ammunition";
  const decoded = decodeURIComponent(slug).trim();

  const acronyms = new Set(["nato", "acp", "bmg", "lr", "win", "rem", "wsm", "prc"]);

  return decoded
    .split(/[-_]+/)
    .map((word) => {
      const lower = word.toLowerCase();
      if (acronyms.has(lower)) return lower.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

/**
 * Robustly matches a caliber slug (or ID, or decoded name) against the calibers list.
 */
export const findCaliberBySlug = (
  calibers: CaliberItem[],
  slug?: string
): CaliberItem | undefined => {
  if (!slug || !calibers || calibers.length === 0) return undefined;

  const rawSlug = decodeURIComponent(slug).trim().toLowerCase();
  const slugNormalized = rawSlug.replace(/[^a-z0-9]/g, "");

  // 1. Direct ID match
  const byId = calibers.find((c) => String(c.id) === rawSlug);
  if (byId) return byId;

  // 2. Exact slug match
  const bySlug = calibers.find(
    (c) => caliberToSlug(c.caliber) === rawSlug || c.caliber.toLowerCase() === rawSlug
  );
  if (bySlug) return bySlug;

  // 3. Normalized alphanumeric exact match
  const byNormalized = calibers.find(
    (c) => c.caliber.toLowerCase().replace(/[^a-z0-9]/g, "") === slugNormalized
  );
  if (byNormalized) return byNormalized;

  // 4. Prefix / Substring match (e.g. "9mm" matches "9mm Luger", "556" matches "5.56x45mm NATO")
  const byAlias = calibers.find((c) => {
    const cNorm = c.caliber.toLowerCase().replace(/[^a-z0-9]/g, "");
    return cNorm.startsWith(slugNormalized) || slugNormalized.startsWith(cNorm);
  });
  if (byAlias) return byAlias;

  return undefined;
};

/**
 * Creates a clean, SEO-optimized slug for a product with its ID appended.
 * Format: {product-name}-{id}
 * Example: "Federal Champion 115gr FMJ", "7868559" -> "federal-champion-115gr-fmj-7868559"
 */
export const createProductSlug = (
  name?: string,
  id?: string | number
): string => {
  const cleanName = (name || "product")
    .toLowerCase()
    .trim()
    .replace(/^(\.)+/, "")
    .replace(/[\s/_]+/g, "-")
    .replace(/[^a-z0-9.-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const safeId = id !== undefined && id !== null ? String(id).trim() : "";
  if (!safeId) return cleanName || "product";

  return cleanName ? `${cleanName}-${safeId}` : `product-${safeId}`;
};

/**
 * Extracts the product ID from a product slug or raw ID string.
 * Examples:
 *   "federal-champion-115gr-7868559" -> "7868559"
 *   "7868559" -> "7868559"
 *   "product-title-64fe1234567890abcdef1234" -> "64fe1234567890abcdef1234"
 *   "product-title-123e4567-e89b-12d3-a456-426614174000" -> "123e4567-e89b-12d3-a456-426614174000"
 */
export const extractProductIdFromSlug = (slugOrId?: string): string => {
  if (!slugOrId) return "";
  const trimmed = decodeURIComponent(slugOrId).trim();

  // 1. Direct integer ID
  if (/^\d+$/.test(trimmed)) {
    return trimmed;
  }

  // 2. Trailing UUID (8-4-4-4-12 hex)
  const uuidMatch = trimmed.match(
    /([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/
  );
  if (uuidMatch) {
    return uuidMatch[1];
  }

  // 3. Trailing numeric ID (e.g. -7868559)
  const numericMatch = trimmed.match(/-(\d+)$/);
  if (numericMatch) {
    return numericMatch[1];
  }

  // 4. Trailing alphanumeric ID (e.g. MongoDB ObjectId 24-char hex)
  const alphaNumMatch = trimmed.match(/-([a-zA-Z0-9]+)$/);
  if (alphaNumMatch) {
    return alphaNumMatch[1];
  }

  return trimmed;
};

/**
 * Constructs the canonical SEO product detail URL:
 * /ammo/:caliber/:product-slug
 */
export const getProductUrl = (
  item: {
    id: string | number;
    name?: string;
    title?: string;
    caliber?: string;
    brand?: string;
  },
  searchQuery?: string
): string => {
  const caliberSlug = caliberToSlug(item.caliber || "") || "ammo";
  const productName =
    item.name ||
    item.title ||
    `${item.brand || ""} ${item.caliber || ""} ammo`.trim() ||
    "product";
  const productSlug = createProductSlug(productName, item.id);
  const query = searchQuery
    ? searchQuery.startsWith("?")
      ? searchQuery
      : `?${searchQuery}`
    : "";
  return `/ammo/${caliberSlug}/${productSlug}${query}`;
};
