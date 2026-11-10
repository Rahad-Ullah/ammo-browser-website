import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { FaStar } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import Button from "~/components/atoms/Button";
import mask from "~/assets/Ellipse 11.png";
import bullet from "~/assets/Bullet.png";
import bulletHandgun from "~/assets/bullet2.png";
import BadgeImage from "~/assets/badge-image.svg";

import { formatReviewCount, getProductUrl, getRetailerUrl, isHandgunCaliber } from "~/utils";

interface KeyFeatures {
  image_url?: string;
  system_image_url?: string;
  category?: {
    name?: string;
  };
}

interface Retailer {
  id?: string | number;
  title?: string;
  google_reviews_count?: number | string | null;
}

interface ProductItem {
  id: string;
  name?: string;
  title?: string;
  brand?: string;
  caliber?: string;
  cost_per_round?: number;
  num_of_rounds?: string;
  condition?: string;
  retailer_avg_rating?: number;
  total_ratings_count?: number | string | null;
  key_features?: KeyFeatures;
  retailer?: Retailer;
  sponsored?: number;
  url?: string;
  quantity?: number | null;
  image?: string;
}

interface ProductCard2Props {
  item: ProductItem;
  onToggleModal?: (id: string) => Promise<void> | void;
  isInWishlist?: boolean;
}

const ProductCard2 = ({ item, onToggleModal, isInWishlist }: ProductCard2Props) => {
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const {
    num_of_rounds,
    condition,
    caliber,
    cost_per_round,
    retailer_avg_rating,
    key_features,
    sponsored,
  } = item;

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  // Select the appropriate bullet silhouette based on caliber / category
  const defaultBullet = isHandgunCaliber(caliber, key_features?.category?.name)
    ? bulletHandgun
    : bullet;

  const initialImage =
    key_features?.image_url ||
    key_features?.system_image_url ||
    item.image ||
    defaultBullet;

  const handleWishlistClick = async () => {
    setWishlistLoading(true);
    try {
      await onToggleModal?.(item.id);
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-3.5 sm:p-4 xl:p-5 font-Poppins bg-mainBG relative z-10 overflow-hidden flex flex-col justify-between border border-transparent hover:border-orange/30 transition-colors">
      <img
        src={mask}
        alt="mask"
        className="absolute bottom-0 right-0 -z-10 pointer-events-none select-none"
      />

      {/* Top Header: Caliber & Rating */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <h5
            className="text-primaryWhite text-sm sm:text-base xl:text-lg font-normal truncate min-w-0 flex-1"
            title={caliber || "N/A"}
          >
            {caliber || "N/A"}
          </h5>
          <span className="font-normal text-sm sm:text-base xl:text-lg text-primaryWhite flex items-center gap-[4px] shrink-0">
            <FaStar className="text-starColor text-sm sm:text-base xl:text-xl" />
            <span className="mt-[2px]">
              {retailer_avg_rating !== undefined && retailer_avg_rating !== null
                ? Number(retailer_avg_rating).toFixed(1)
                : "0.0"}
              {formatReviewCount(
                item.total_ratings_count ?? item.retailer?.google_reviews_count
              )}
            </span>
          </span>
        </div>

        {/* Retailer Section */}
        <div className="flex items-center justify-between gap-2 pt-3 xl:pt-5 pb-1.5">
          <h5 className="text-[10px] xl:text-xs font-normal font-Inter text-secondaryColor">
            Retailer
          </h5>
          {sponsored === 1 && (
            <div className="sponsore-tag font-Inter text-[10px] xl:text-xs px-2 py-0.5 shrink-0">
              <span className="spark__container">
                <span className="spark" />
              </span>
              <span className="backdrop" />
              <span className="text-primaryWhite z-40 flex items-center gap-1">
                <MdStars className="text-yellow-600" />
                Sponsored
              </span>
            </div>
          )}
        </div>

        <h2
          className="font-semibold text-base xl:text-xl block heading-gradient-mini truncate"
          title={item?.retailer?.title || "N/A"}
        >
          {item?.retailer?.title ? (
            <Link
              to={getRetailerUrl({
                name: item.retailer.title,
                id: item.retailer.id,
              })}
              className="hover:underline hover:text-orange transition-colors"
            >
              {item.retailer.title}
            </Link>
          ) : (
            "N/A"
          )}
        </h2>
      </div>

      {/* Middle Content: Stats (Left) + Bullet Artwork (Right) */}
      <div className="pt-2 sm:pt-3 flex items-center justify-between gap-2 my-auto">
        {/* Left Stats */}
        <div className="min-w-0 flex-1 space-y-1.5 xl:space-y-2">
          <div>
            <h5 className="text-[10px] xl:text-xs font-Inter font-normal text-secondaryColor leading-tight">
              Cost per round
            </h5>
            <p className="text-sm sm:text-base xl:text-xl font-semibold text-primaryWhite leading-tight">
              ${cost_per_round !== undefined && cost_per_round !== null ? cost_per_round.toFixed(2) : "N/A"}
            </p>
          </div>
          <div>
            <h5 className="text-[10px] xl:text-xs font-normal text-secondaryColor leading-tight whitespace-nowrap">
              Number of Rounds
            </h5>
            <p className="text-sm sm:text-base xl:text-xl font-semibold text-primaryWhite leading-tight">
              {num_of_rounds || "N/A"}
            </p>
          </div>
          <div>
            <h5 className="text-[10px] xl:text-xs font-Inter font-normal text-secondaryColor leading-tight">
              Condition
            </h5>
            <p className="text-xs sm:text-sm xl:text-base font-semibold capitalize text-primaryWhite truncate leading-tight">
              {condition
                ? condition.length > 14
                  ? condition.slice(0, 14) + ".."
                  : condition
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Right Bullet Image Container */}
        <div className="w-[100px] sm:w-[115px] xl:w-[135px] h-[95px] sm:h-[105px] xl:h-[115px] shrink-0 flex items-center justify-center p-1">
          <img
            src={initialImage}
            alt={caliber || "bullet"}
            onError={(e) => {
              // Fallback chain: image_url -> system_image_url -> default caliber bullet
              const img = e.currentTarget;
              const system = key_features?.system_image_url;
              if (
                key_features?.image_url &&
                system &&
                img.dataset.fallback !== "system"
              ) {
                img.dataset.fallback = "system";
                img.src = system;
                return;
              }
              img.onerror = null;
              img.src = defaultBullet;
            }}
            className="max-h-full max-w-full w-auto h-auto object-contain block drop-shadow-md select-none"
          />
        </div>
      </div>

      {/* Bottom Action Buttons (in document flow to prevent bottom cut-off) */}
      <div className="pt-3 xl:pt-4 mt-auto w-full grid grid-cols-2 gap-2 sm:gap-2.5 xl:gap-3.5">
        <Link
          to={getProductUrl(item, `page=${currentPage}`)}
          className="block w-full"
        >
          <Button
            className="w-full h-[32px] sm:h-[34px] xl:h-[38px] !py-0 !px-1.5 sm:!px-3 !text-[11px] sm:!text-xs xl:!text-sm text-center font-normal whitespace-nowrap bg-orange capitalize active:scale-95 rounded-none transition-all text-primaryWhite font-Poppins hover:bg-[#CC4910] flex items-center justify-center !leading-none"
            btnTitle="View Details"
          />
        </Link>

        <button
          onClick={handleWishlistClick}
          type="button"
          disabled={wishlistLoading}
          className={`w-full h-[32px] sm:h-[34px] xl:h-[38px] px-1.5 sm:px-3 text-[11px] sm:text-xs xl:text-sm font-normal whitespace-nowrap border capitalize active:scale-95 rounded-none transition-all inline-flex text-primaryWhite font-Poppins justify-center items-center gap-1.5 ${
            isInWishlist
              ? "bg-orange border-orange"
              : "bg-transparent border-white/20 hover:border-orange wishlist-button"
          } ${wishlistLoading ? "opacity-70 pointer-events-none" : ""}`}
        >
          {wishlistLoading ? (
            <span
              className="inline-block w-4 h-4 border-2 rounded-full animate-spin"
              style={{
                borderColor: "rgba(255,255,255,0.3)",
                borderTopColor: "#fff",
              }}
            />
          ) : (
            <>
              <img
                src={BadgeImage}
                alt="badge-image"
                className="hidden 2xl:block w-4 h-4 shrink-0"
              />
              <span>{isInWishlist ? "In List" : "Add to List"}</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};

export default ProductCard2;

