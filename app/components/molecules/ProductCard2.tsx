import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { FaStar } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import Button from "~/components/atoms/Button";
import mask from "~/assets/Ellipse 11.png";
import bullet from "~/assets/Bullet.png";
import BadgeImage from "~/assets/badge-image.svg";

import { getProductUrl, getRetailerUrl } from "~/utils";

interface KeyFeatures {
  image_url?: string;
  system_image_url?: string;
}

interface Retailer {
  title?: string;
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
  key_features?: KeyFeatures;
  retailer?: Retailer;
  sponsored?: number;
  url?: string;
  quantity?: number | null;
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

  const handleWishlistClick = async () => {
    setWishlistLoading(true);
    try {
      await onToggleModal?.(item.id);
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="w-full p-3 xl:p-5 font-Poppins bg-mainBG relative z-10 overflow-hidden">
      <img src={mask} alt="mask" className="absolute bottom-0 right-0 -z-10" />
      <div className="flex items-start justify-between">
        <h5 className="text-primaryWhite text-sm xl:text-lg font-normal w-[200px] text-nowrap overflow-hidden text-ellipsis">
          {caliber || "N/A"}
          <br />
        </h5>
        <span className="font-normal text-base xl:text-lg text-primaryWhite flex items-center gap-[4px]">
          <FaStar className="text-starColor text-base xl:text-xl" />
          <span className="mt-[3px]">{retailer_avg_rating || "0.0"}</span>
        </span>
      </div>
      <h5 className="text-[10px] xl:text-sm font-normal font-Inter text-secondaryColor pt-4 xl:pt-7 pb-1">
        Retailer
      </h5>

      <h2 className="font-semibold text-base xl:text-xl block heading-gradient-mini">
        {item?.retailer?.title ? (
          <Link
            to={getRetailerUrl({
              name: item.retailer.title,
              id: (item.retailer as any)?.id,
            })}
            className="hover:underline hover:text-orange transition-colors"
          >
            {item.retailer.title}
          </Link>
        ) : (
          "N/A"
        )}
      </h2>
      <div className="pt-2 flex items-center xl:items-end gap-2 justify-between pb-[48px] sm:pb-[44px] lg:pb-[38px] 2xl:pb-[58px]">
        {/* left */}
        <div>
          <div className="flex flex-col gap-y-1">
            <h5 className="text-[10px] xl:text-sm font-Inter font-normal text-secondaryColor">
              Cost per round
            </h5>
            <p className="text-base xl:text-xl font-semibold text-primaryWhite">
              ${cost_per_round?.toFixed(2) || "N/A"}
            </p>
          </div>
          <div className="flex flex-col pt-2">
            <h5 className="text-[10px] xl:text-sm text-nowrap font-normal text-secondaryColor">
              Number of Rounds
            </h5>
            <p className="text-base xl:text-xl font-semibold text-primaryWhite">
              {num_of_rounds || "N/A"}
            </p>
          </div>
          <div className="flex flex-col pt-2">
            <h5 className="text-[10px] xl:text-sm font-Inter font-normal text-secondaryColor">
              Condition
            </h5>
            <p className="text-base xl:text-lg font-semibold capitalize text-primaryWhite">
              {condition
                ? condition.length > 10
                  ? condition.slice(0, 10) + ".."
                  : condition.slice(0, 10)
                : "N/A"}
            </p>
          </div>
          <div className="absolute right-0 bottom-0 px-[12px] 2xl:px-[20px] pb-[20px] w-full grid grid-cols-2 gap-[14px] 2xl:gap-[22px]">
            <Link
              to={getProductUrl(item, `page=${currentPage}`)}
              className="block"
            >
              <Button
                className="align-middle font-normal xs:py-2 px-3 xxs:px-3 !sm:px-5 !text-[11px] lg:!text-[11px] w-full xl:!text-[12px] h-[30px] xl:h-[34px] text-center sm:px-5 xl:px-9 lg:px-6 sm:!text-xs xl:!text-sm xl:py-3 py-[10px] !text-nowrap bg-orange capitalize active:scale-95 rounded-none transition-all text-primaryWhite font-Poppins !text-sm hover:bg-[#CC4910] after:display-none !leading-[13px] 2xl:!leading-[17px] !after:display-none"
                btnTitle="View Details"
              />
            </Link>

            <button
              onClick={handleWishlistClick}
              type="button"
              disabled={wishlistLoading}
              className={`font-normal 2xl:py-[7px] px-3 xs:px-3 !sm:px-5 text-[11px] py-[4.5px] xl:px-12 !text-nowrap border-[1px] capitalize active:scale-95 rounded-none transition-all inline-flex text-primaryWhite font-Poppins xl:text-[12px] justify-center gap-[11.5px] items-center ${isInWishlist ? "bg-orange border-orange" : "bg-transparent wishlist-button"} ${wishlistLoading ? "opacity-70 pointer-events-none" : ""}`}
            >
              {wishlistLoading ? (
                <span className="inline-block w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
              ) : (
                <>
                  <img
                    src={BadgeImage}
                    alt="badge-image"
                    className="hidden 2xl:block min-w-[18px] max-w-[18px] h-[18px]"
                  />
                  {isInWishlist ? "In List" : "Add to List"}
                </>
              )}
            </button>
          </div>
        </div>
        {/* right */}
        <div className="w-[110px] xl:w-[160px] shrink-0 xl:h-[150px]">
          <img
            src={
              key_features?.image_url ||
              key_features?.system_image_url ||
              bullet
            }
            alt="bullet"
            onError={(e) => {
              // Fallback chain: image_url -> system_image_url -> placeholder.
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
              img.src = bullet;
            }}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      {/* Sponsored tag */}
      {sponsored === 1 && (
        <div className="sponsore-tag font-Inter backdrop-blur-md text-xs px-2 py-1 absolute md:top-16 top-14 right-3">
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
  );
};

export default ProductCard2;
