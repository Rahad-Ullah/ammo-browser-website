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
