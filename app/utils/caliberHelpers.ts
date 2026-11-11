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
  if (!slugNormalized) return undefined;
  const byNormalized = calibers.find(
    (c) => c.caliber.toLowerCase().replace(/[^a-z0-9]/g, "") === slugNormalized
  );
  if (byNormalized) return byNormalized;

  // 4. Prefix / substring match (e.g. "9mm" matches "9mm Luger").
  // Skip names that normalize to nothing, such as ".", or they match every slug.
  const byAlias = calibers.find((c) => {
    const cNorm = c.caliber.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!cNorm) return false;
    return cNorm.startsWith(slugNormalized) || slugNormalized.startsWith(cNorm);
  });
  if (byAlias) return byAlias;

  return undefined;
};

const normalizeCaliberSearch = (value: string): string =>
  value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");

/**
 * Typed phrases that do not appear inside the stored caliber name.
 * "45 colt" is handled by word matching; these cover abbreviations.
 */
const CALIBER_QUERY_ALIASES: Record<string, string[]> = {
  "45 lc": ["45 long colt"],
  "45lc": ["45 long colt"],
  "38 spl": ["38 special"],
  "38spl": ["38 special"],
  "9mm para": ["9mm luger"],
  "9mm parabellum": ["9mm luger"],
  "9x19": ["9mm luger"],
  "9x19mm": ["9mm luger"],
};

const caliberTokensMatch = (name: string, query: string): boolean => {
  if (!query) return true;
  if (name.includes(query)) return true;

  const tokens = query.split(" ").filter(Boolean);
  if (tokens.length < 2) return false;

  let from = 0;
  for (const token of tokens) {
    const at = name.indexOf(token, from);
    if (at === -1) return false;
    from = at + token.length;
  }
  return true;
};

/**
 * Search match for the caliber dropdown. "45 colt" matches ".45 Long Colt"
 * because both words appear, in order, inside the stored name.
 */
export const caliberMatchesSearch = (
  caliber?: string | null,
  query?: string | null
): boolean => {
  const rawQuery = (query || "").trim();
  if (!rawQuery) return true;

  const name = normalizeCaliberSearch(caliber || "");
  const normalizedQuery = normalizeCaliberSearch(rawQuery);
  if (caliberTokensMatch(name, normalizedQuery)) return true;

  const compactQuery = normalizedQuery.replace(/ /g, "");
  const aliases = CALIBER_QUERY_ALIASES[normalizedQuery] || CALIBER_QUERY_ALIASES[compactQuery] || [];
  return aliases.some((alias) => caliberTokensMatch(name, normalizeCaliberSearch(alias)));
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

/**
 * Determines whether a caliber/product belongs to handgun/pistol ammunition.
 * Used to select the appropriate default bullet artwork (e.g. handgun round vs rifle cartridge).
 */
export const isHandgunCaliber = (
  caliber?: string,
  categoryName?: string
): boolean => {
  if (categoryName) {
    const cat = categoryName.toLowerCase();
    if (cat.includes("handgun") || cat.includes("pistol")) return true;
    if (cat.includes("rifle") || cat.includes("shotgun")) return false;
  }
  if (!caliber) return false;
  const cal = caliber.toLowerCase().trim();

  // Explicit rifle / shotgun calibers that might have numbers matching pistol calibers
  if (
    cal.includes("5.7x28") ||
    cal.includes("45-70") ||
    cal.includes("45/70") ||
    cal.includes("450 bush") ||
    cal.includes("458 socom") ||
    cal.includes("30-30") ||
    cal.includes("win mag") ||
    cal.includes("rem mag") ||
    cal.includes("lapua") ||
    cal.includes("prc") ||
    cal.includes("creedmoor") ||
    cal.includes("nato") ||
    cal.includes("gauge") ||
    /\b\d+\s*ga\b/.test(cal)
  ) {
    return false;
  }

  // Handgun caliber terms / abbreviations
  if (
    cal.includes("auto") ||
    cal.includes("acp") ||
    cal.includes("luger") ||
    cal.includes("parabellum") ||
    cal.includes("makarov") ||
    cal.includes("tokarev") ||
    cal.includes("s&w") ||
    cal.includes("smith") ||
    cal.includes("sig") ||
    cal.includes("casull") ||
    cal.includes("action express") ||
    cal.includes("special")
  ) {
    return true;
  }

  // Standard handgun caliber prefixes / numbers (9mm, 10mm, .45, .40, .380, .38, .357, .44, .32, .25, .50 ae)
  if (
    /^(\.?10\s*mm|\.?9\s*mm|\.?45\b|\.?40\b|\.?380\b|\.?38\b|\.?357\b|\.?44\b|\.?32\b|\.?25\b|\.?50\s*ae)/i.test(
      cal
    )
  ) {
    return true;
  }

  return false;
};
