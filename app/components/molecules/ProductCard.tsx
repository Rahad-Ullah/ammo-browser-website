import { useState } from "react";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import Button from "~/components/atoms/Button";
import mask from "~/assets/Mask group.png";
import BadgeImage from "~/assets/badge-image.svg";

import { formatReviewCount, getPlaceholderImage, getProductUrl, getRetailerUrl } from "~/utils";

interface KeyFeatures {
  image_url?: string;
  system_image_url?: string;
}

interface Retailer {
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
  url?: string;
  quantity?: number | null;
}

interface ProductCardProps {
  imgClass?: string;
  item: ProductItem;
  onToggleModal?: (id: string) => Promise<void> | void;
  isInWishlist?: boolean;
}

const ProductCard = ({ imgClass, item, onToggleModal, isInWishlist }: ProductCardProps) => {
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const {
    num_of_rounds,
    condition,
    id,
    caliber,
    cost_per_round,
    retailer_avg_rating,
    key_features,
  } = item;

  const defaultBullet = getPlaceholderImage(
    caliber,
    (key_features as { category?: { name?: string } })?.category?.name
  );

  const handleWishlistClick = async () => {
    setWishlistLoading(true);
    try {
      await onToggleModal?.(item.id);
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="relative">
      <div
        style={{ background: `url(${mask})` }}
        className="w-full bg-cover bg-center bg-no-repeat p-5 xl:p-10 font-Poppins"
      >
        <div className="flex items-start justify-between">
          <h5 className="text-primaryWhite text-base lg:text-lg xl:text-2xl font-normal w-[250px] sm:w-[350px] text-nowrap overflow-hidden text-ellipsis">
            {caliber ? caliber : "N/A"}
          </h5>
          <span className="font-normal text-sm lg:text-base xl:text-xl text-primaryWhite flex items-center gap-[6px]">
            <FaStar className="text-starColor text-sm lg:text-base xl:text-[22px]" />
            <span className="mt-1">
              {retailer_avg_rating ? retailer_avg_rating : "0.0"}
              {formatReviewCount(
                item.total_ratings_count ?? item.retailer?.google_reviews_count
              )}
            </span>
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 pt-4 xl:pt-7 lg:pb-1">
          <h5 className="text-xs lg:text-sm xl:text-lg font-normal text-secondaryColor">
            Retailer
          </h5>
          <div className="sponsore-tag font-Inter text-xs px-2 py-1 shrink-0">
            <span className="spark__container">
              <span className="spark" />
            </span>
            <span className="backdrop" />
            <span className="text-primaryWhite relative z-10 flex items-center gap-1">
              <MdStars className="text-yellow-600" />
              Sponsored
            </span>
          </div>
        </div>
        <h2 className="font-semibold text-xl lg:text-2xl xl:text-[40px] block heading-gradient-mini">
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
        {/* <Link to={`/product-details/${id}`} className="pt-7 xl:pt-11 block">
          <Button
            className="font-normal sm:px-5 px-3 xl:px-9 text-[10px] lg:px-6 sm:!text-xs lg:!text-xs xl:!text-sm
              xl:py-3 py-[10px] !text-nowrap bg-orange capitalize active:scale-95 rounded-none transition-all inline-block text-primaryWhite font-Poppins text-sm hover:bg-[#CC4910] after:display-none"
            btnTitle="View Details"
          />
        </Link> */}

        <div className="pt-3 flex xs:gap-2  lg:gap-3 items-end justify-between pb-[50px] 2xl:pb-[60px]">
          <div>
            <div className="flex flex-col gap-y-1 lg:gap-y-2">
              <h5 className="text-xs lg:text-sm xl:text-lg font-normal text-secondaryColor">
                Cost per round
              </h5>
              <p className="text-xl lg:text-2xl xl:text-4xl font-semibold text-primaryWhite">
                ${cost_per_round?.toFixed(2) || "N/A"}
              </p>
            </div>
            <div className="flex flex-col pt-2">
              <h5 className="text-xs lg:text-sm xl:text-lg font-normal text-secondaryColor">
                Number of Rounds
              </h5>
              <p className="text-sm lg:text-base xl:text-xl font-semibold text-primaryWhite">
                {num_of_rounds ? num_of_rounds : "N/A"}
              </p>
            </div>
            <div className="flex flex-col pt-2">
              <h5 className="text-xs lg:text-sm xl:text-lg font-normal text-secondaryColor">
                Condition
              </h5>
              <p className="text-sm lg:text-base xl:text-lg font-semibold capitalize text-primaryWhite">
                {condition
                  ? condition?.length > 20
                    ? condition?.slice(0, 10) + ".."
                    : condition?.slice(0, 10)
                  : "N/A"}
              </p>
            </div>

            <div className="absolute right-0 bottom-0 px-[20px] 2xl:px-[40px] pb-[20px] 2xl:pb-[40px] w-full grid grid-cols-2 gap-[14px] 2xl:gap-[22px]">
              <Link to={getProductUrl(item)} className="block">
                <Button
                  className="
                  w-full text-center font-normal !sm:px-5 !px-3 xl:px-9 text-[10px] lg:px-6 !sm:text-xs lg:!text-xs xl:!text-sm xl:py-3 py-[10px] !text-nowrap bg-orange capitalize active:scale-95 rounded-none transition-all inline-block text-primaryWhite font-Poppins text-sm hover:bg-[#CC4910] after:display-none"
                  btnTitle="View Details"
                />
              </Link>

              <button
                type="button"
                onClick={handleWishlistClick}
                disabled={wishlistLoading}
                className={`font-normal xs:py-2 px-3 xxs:px-3 !sm:px-5 sm:text-xs xl:text-sm w-full xl:h-[44px] 2xl:py-[7px] xs:px-3 !sm:px-5 text-[14px] wishlist-button py-[4.5px] xl:px-12 !text-nowrap border-[1px] capitalize active:scale-95 rounded-none transition-all inline-flex text-primaryWhite font-Poppins justify-center gap-[11.5px] items-center ${isInWishlist ? "bg-orange border-orange" : "bg-transparent"} ${wishlistLoading ? "opacity-70 pointer-events-none" : ""}`}
              >
                {wishlistLoading ? (
                  <span className="inline-block w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
                ) : (
                  <>
                    <img
                      src={BadgeImage}
                      alt="badge-image"
                      className="hidden 2xl:block min-w-[20px] max-w-[20px] h-[20px]"
                    />
                    {isInWishlist ? "In List" : "Add to List"}
                  </>
                )}
              </button>
            </div>
          </div>
          <div
            className={`xl:w-[213px] w-[130px] h-[154px] xxs:h-[127px] sm:!h-[170px] md:!h-[176px] lg:!h-[165px] xl:!h-[275px] shrink-0 flex items-center justify-center overflow-hidden rounded ${imgClass}`}
          >
            <img
              src={
                key_features?.image_url ||
                key_features?.system_image_url ||
                (item as any)?.image ||
                defaultBullet
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
                img.src = defaultBullet;
              }}
              className="object-contain block"
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                width: "auto",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
