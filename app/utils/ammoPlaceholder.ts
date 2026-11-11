import rifle from "~/assets/bullet-rifle.png";
import handgun from "~/assets/bullet-handgun.png";
import shotgun from "~/assets/bullet-shotgun.png";
import { isHandgunCaliber } from "./caliberHelpers";

export const isShotgunCaliber = (
  caliber?: string,
  categoryName?: string
): boolean => {
  if (categoryName) {
    const category = categoryName.toLowerCase();
    if (category.includes("shotgun") || category.includes("shotshell")) {
      return true;
    }
  }
  if (!caliber) return false;
  const value = caliber.toLowerCase();
  return (
    value.includes("gauge") ||
    value.includes("shotshell") ||
    value.includes(".410") ||
    value.includes("410 bore") ||
    /\b\d+\s*ga\b/.test(value)
  );
};

/** Local art used when a listing has no product photo and no caliber image. */
export const getPlaceholderImage = (
  caliber?: string,
  categoryName?: string
): string => {
  if (isShotgunCaliber(caliber, categoryName)) return shotgun;
  if (isHandgunCaliber(caliber, categoryName)) return handgun;
  return rifle;
};
