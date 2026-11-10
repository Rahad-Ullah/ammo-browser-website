/**
 * Helper utilities for formatting and parsing retailer URLs and slugs.
 */

/**
 * Creates a clean, SEO-optimized slug for a retailer with its ID appended.
 * Format: {retailer-name}-{id}
 * Example: "Palmetto State Armory", 12 -> "palmetto-state-armory-12"
 */
export const createRetailerSlug = (
  name?: string,
  id?: string | number
): string => {
  const cleanName = (name || "retailer")
    .toLowerCase()
    .trim()
    .replace(/^(\.)+/, "")
    .replace(/[\s/_]+/g, "-")
    .replace(/[^a-z0-9.-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const safeId = id !== undefined && id !== null ? String(id).trim() : "";
  if (!safeId) return cleanName || "retailer";

  return cleanName ? `${cleanName}-${safeId}` : `retailer-${safeId}`;
};

/**
 * Extracts the retailer ID from a retailer slug or raw ID string.
 * Examples:
 *   "palmetto-state-armory-12" -> "12"
 *   "12" -> "12"
 *   "midway-usa-64fe1234567890abcdef1234" -> "64fe1234567890abcdef1234"
 *   "brownells-123e4567-e89b-12d3-a456-426614174000" -> "123e4567-e89b-12d3-a456-426614174000"
 */
export const extractRetailerIdFromSlug = (slugOrId?: string): string => {
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

  // 3. Trailing numeric ID (e.g. -12)
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
 * Constructs the canonical SEO retailer detail URL:
 * /retailers/:retailer-slug
 */
/** Google review count beside a rating, e.g. " (248)". Empty when the count is missing. */
export const formatReviewCount = (count?: number | string | null): string => {
  const value = Number(count);
  if (!Number.isFinite(value) || value <= 0) return "";
  return ` (${Math.round(value)})`;
};

export const getRetailerUrl = (retailer: {
  id?: string | number;
  name?: string;
  title?: string;
  slug?: string;
}): string => {
  const retailerName = retailer.name || retailer.title || "retailer";
  const slug = createRetailerSlug(retailerName, retailer.id);
  return `/retailers/${slug}`;
};
