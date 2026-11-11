import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { AnimatePresence } from "motion/react";
import CustomCheckbox from "~/components/atoms/CustomCheckbox";
import { TbProgressAlert } from "react-icons/tb";
import { axiosPublic } from "~/lib/axios/axios.config";
import { useAuth } from "~/hooks/providers/AuthProvider";
import {
  useWishlistUrls,
  WISHLIST_URLS_QUERY_KEY,
} from "~/hooks/useWishlistUrls";
import WishlistSuccessModal from "~/components/molecules/WishlistSuccessModal";
import type { PriceAlertData, ProgressBar } from "~/types";
import { errorToast } from "~/utils/toast";
import { getLocalStorage } from "~/utils/localStorage";
import { extractProductIdFromSlug, caliberToSlug, formatReviewCount, getRetailerUrl, isHandgunCaliber } from "~/utils";
import Button from "~/components/atoms/Button";
import { TopPicks } from "~/components/organisms/shared";
import Description from "./Description";
import ProductReview from "./ProductReview";
import PriceAlert from "./PriceAlert";
import bullet from "~/assets/Bullet.png";
import bulletHandgun from "~/assets/bullet2.png";
import elips1 from "~/assets/Ellipse 12.png";
import elips2 from "~/assets/Ellipse 13.png";
import elips3 from "~/assets/Ellipse15.png";
import BadgeImage from "~/assets/badge-image.svg";

interface KeyFeatures {
  image_url?: string;
  system_image_url?: string;
  bullet_type?: string;
  muzzle_velocity?: string;
  muzzle_energy?: string;
  use_case?: string;
  compatibility?: string;
  category?: {
    name?: string;
  };
}

interface Retailer {
  title?: string;
  google_reviews_count?: number | string | null;
}

interface ProductData {
  id: string;
  caliber?: string;
  cost_per_round?: number;
  price?: number;
  num_of_rounds?: string;
  condition?: string;
  retailer_avg_rating?: number;
  total_ratings_count?: number | string | null;
  key_features?: KeyFeatures;
  retailer?: Retailer;
  brand?: string;
  limit?: string;
  shot_size?: string;
  shell_length?: string;
  casing?: string;
  url?: string;
  title?: string;
  shipping_cost?: number;
  shipping_cost_type?: string;
  progress_bar?: ProgressBar;
}

type WishlistModalMode = "success" | "already-exists" | "login-prompt";

const ProductDetails = () => {
  const queryClient = useQueryClient();
  const { user, authToken, getPriceAlert, addToWishlist } = useAuth();
  const { isInWishlist } = useWishlistUrls();
  const [alert, setAlert] = useState(false);
  const [openDescription, setOpenDescription] = useState(true);
  const [openProductReview, setOpenProductReview] = useState(false);
  const [productRating, setProductRating] = useState(false);
  const [toast, setToast] = useState(false);
  const [wishlistModal, setWishlistModal] = useState<{
    open: boolean;
    mode: WishlistModalMode;
    discountMessage?: string;
  }>({ open: false, mode: "success" });
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [destinationZip, setDestinationZip] = useState("");
  const token = getLocalStorage<string>("berg-user-response");

  const params = useParams();
  const id = extractProductIdFromSlug(
    (params as Record<string, string | undefined>).productSlug || params.id
  );

  useEffect(() => {
    const stored = localStorage.getItem("destination_zip") ?? "";
    if (stored) setDestinationZip(stored);
  }, []);

  const handleDescription = () => {
    setOpenDescription(true);
    setOpenProductReview(false);
  };

  const handleProductReview = () => {
    setOpenProductReview(true);
    setOpenDescription(false);
  };

  const {
    data: detailsData,
    isLoading,
    isError,
  } = useQuery<ProductData>({
    queryKey: ["productDetails", id, destinationZip],
    queryFn: async () => {
      const url = destinationZip
        ? `/products/details/${id}?destination_zip=${encodeURIComponent(destinationZip)}`
        : `/products/details/${id}`;
      // Send the Bearer token only if the user is logged in; otherwise call as a guest.
      const token = getLocalStorage<string>("berg-user-response");
      const response = await axiosPublic.get(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return response?.data.data;
    },
    staleTime: 5 * 1000,
    // Drop the cache as soon as this page unmounts so navigating back to a
    // product-details page always re-calls the API and shows the skeleton
    // (isLoading is true again because there is no cached data). While the page
    // stays mounted (e.g. the Add-to-List refetch above) the cache is kept, so
    // that refetch remains skeleton-free.
    gcTime: 0,
    enabled: !!id,
  });

  const tableData = [
    {
      label: "Brand",
      value: detailsData?.brand || "Not specified",
    },
    {
      label: "Retailer",
      value: detailsData?.retailer?.title || "Not specified",
    },
    { label: "Limit", value: detailsData?.limit || "0" },
    detailsData?.key_features?.category?.name?.toLowerCase() === "shotgun"
      ? {
          label: "Shot size",
          value: detailsData?.shot_size || "Not specified",
        }
      : {
          label: "Quantity",
          value: detailsData?.num_of_rounds || "Not specified",
        },
    detailsData?.key_features?.category?.name?.toLowerCase() === "shotgun"
      ? { label: "Length", value: detailsData?.shell_length || "Not specified" }
      : {
          label: "Casing",
          value: detailsData?.casing || "Brass",
        },
  ];

  const handleRetailerUrl = () => {
    window.open(detailsData?.url, "_blank");
  };

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError && !detailsData) {
      errorToast("Something went wrong");
    }
  }, [isError, detailsData]);

  const handleProductRating = () => {
    if (!user) {
      errorToast("You must be logged in first!");
    } else if (openProductReview) {
      setProductRating(true);
    }
  };

  const { data: alertData, refetch } = useQuery<PriceAlertData>({
    queryKey: ["priceAlertData", id],
    queryFn: async () => {
      if (!id) throw new Error("Product ID is required");
      const response = await getPriceAlert({ product_id: id });
      return response?.data as PriceAlertData;
    },
    staleTime: 5 * 1000,
    enabled: !!id && !!token,
  });

  const handleAddToWishlist = async () => {
    if (!authToken) {
      setWishlistModal({ open: true, mode: "login-prompt" });
      return;
    }

    if (isInWishlist(detailsData?.url)) {
      setWishlistModal({ open: true, mode: "already-exists" });
      return;
    }

    setWishlistLoading(true);
    try {
      const response = await addToWishlist(detailsData?.url || "");
      setWishlistModal({
        open: true,
        mode: "success",
        discountMessage: response.data?.discount_message || "",
      });
      queryClient.invalidateQueries({ queryKey: WISHLIST_URLS_QUERY_KEY });
      // Re-fetch product details so the free-shipping progress bar reflects the
      // updated wishlist subtotal. isLoading stays false (data is already cached),
      // so the skeleton loader does not appear.
      queryClient.invalidateQueries({ queryKey: ["productDetails"] });
    } catch {
      setWishlistModal({ open: true, mode: "already-exists" });
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleAlertOpen = () => {
    if (token) {
      setAlert(true);
    } else {
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 4000);
    }
  };

  return (
    <div className="pt-28 pb-16 md:pt-32 2xl:py-48 font-Poppins">
      {/* toast */}
      <div
        className={`bg-[#1f0c01] py-2 lg:py-3 px-3 lg:px-4 text-xs lg:text-sm text-primaryWhite gap-2 flex items-center border-[1.5px] border-borderColor fixed duration-300 top-8 left-1/2 -translate-x-1/2 ${
          toast ? "scale-100 opacity-100 z-[999]" : "scale-0 opacity-0 z-0"
        }`}
      >
        You have to log in first to set the alert
        <TbProgressAlert className="text-xl text-red-700 shrink-0" />
      </div>

      <div className="container">
        {isLoading ? (
          <div className="animate-pulse p-6 w-full flex flex-col sm:flex-row gap-6">
            <div className="w-[180px] sm:w-[340px] h-[200px] lg:w-[368px] lg:h-[390px] xl:w-[567px] xl:h-[686px] bg-gray-700 rounded-lg"></div>
            <div className="w-full lg:w-[400px] xl:min-w-[580px] space-y-4">
              <div className="h-8 bg-gray-700 rounded w-3/4"></div>
              <div className="h-10 bg-gray-700 rounded w-1/2"></div>
              <div className="h-6 bg-gray-700 rounded w-1/3"></div>
              <div className="h-20 bg-gray-700 rounded w-full"></div>
            </div>
          </div>
        ) : (
          <div>
            <div className="p-5 lg:p-6 2xl:p-14 w-full bg-cynicalBlack relative overflow-hidden">
              <img src={elips2} alt="" className="absolute top-0 left-0 z-20" />
              <img
                src={elips3}
                alt=""
                className="absolute top-0 right-0 z-10"
              />
              <img src={elips1} alt="" className="absolute bottom-0 left-0" />

              {/* Breadcrumb Navigation */}
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-xs md:text-sm text-[#817D81] font-Poppins pb-4 relative z-10"
              >
                <Link to="/" className="hover:text-primaryWhite transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link to="/ammo" className="hover:text-primaryWhite transition-colors">
                  Ammo
                </Link>
                {detailsData?.caliber && (
                  <>
                    <span>/</span>
                    <Link
                      to={`/ammo/${caliberToSlug(detailsData.caliber)}`}
                      className="hover:text-primaryWhite transition-colors capitalize"
                    >
                      {detailsData.caliber}
                    </Link>
                  </>
                )}
                <span>/</span>
                <span className="text-primaryWhite font-Poppins font-normal truncate max-w-[150px] sm:max-w-xs md:max-w-md">
                  {detailsData?.title || "Product Details"}
                </span>
              </nav>

              <h4 className="text-lg xl:text-2xl 2xl:text-3xl text-primaryWhite font-medium relative z-10">
                {detailsData?.caliber || "N/A"}
              </h4>
              <div className="pt-4 lg:pt-5 2xl:pt-20 flex flex-col md:flex-row items-start gap-5 lg:gap-6 2xl:gap-10">
                {/* left - image */}
                <div className="w-full max-w-[280px] h-[180px] md:w-[200px] md:max-w-none md:h-[210px] md:shrink-0 md:mt-2 lg:w-[260px] lg:h-[240px] xl:w-[300px] xl:h-[260px] 2xl:w-[567px] 2xl:h-[640px]">
                  {(() => {
                    const defaultBullet = isHandgunCaliber(
                      detailsData?.caliber,
                      detailsData?.key_features?.category?.name
                    )
                      ? bulletHandgun
                      : bullet;
                    return (
                      <img
                        src={
                          detailsData?.key_features?.image_url ||
                          detailsData?.key_features?.system_image_url ||
                          (detailsData as any)?.image ||
                          defaultBullet
                        }
                        alt="bullet"
                        onError={(e) => {
                          // Fallback chain: image_url -> system_image_url -> placeholder.
                          const img = e.currentTarget;
                          const system = detailsData?.key_features?.system_image_url;
                          if (
                            detailsData?.key_features?.image_url &&
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
                        className="w-full h-full object-contain"
                      />
                    );
                  })()}
                </div>
                {/* right - details */}
                <div className="relative z-20 text-primaryWhite w-full min-w-0 flex-1">
                  <h5 className="font-light text-base 2xl:text-xl">
                    Cost per round
                  </h5>
                  <h3 className="text-2xl xl:text-4xl 2xl:text-6xl font-medium py-1 2xl:py-3 mb-2 lg:mb-3 2xl:mb-[22px]">
                    ${detailsData?.cost_per_round?.toFixed(2) || "N/A"}
                  </h3>

                  <h5 className="text-base 2xl:text-xl font-light">
                    Total Cost
                  </h5>
                  <h3 className="text-lg xl:text-2xl 2xl:text-3xl font-medium pt-1 2xl:pt-2 mb-2 lg:mb-3 2xl:mb-[22px]">
                    ${detailsData?.price?.toFixed(2) || "0.0"}
                  </h3>

                  <h5 className="text-base 2xl:text-xl font-light">
                    Estimated Shipping
                  </h5>
                  <h3 className="text-lg xl:text-2xl 2xl:text-3xl font-medium pt-1 2xl:pt-2">
                    ${detailsData?.shipping_cost?.toFixed(2) || "0.0"}
                    {detailsData?.shipping_cost_type
                      ? ` (${detailsData?.shipping_cost_type})`
                      : ""}
                  </h3>

                  {
                    !destinationZip && (
                      <p className="text-sm 2xl:text-lg font-light mt-1 2xl:mt-2">
                        Please enter your ZIP Code in the Filters section on the Ammo page to view estimated shipping costs.
                      </p>
                    )
                  }

                  {/* rating star */}
                  <div className="pt-4 lg:pt-5 2xl:pt-12 flex items-center gap-2">
                    <div className="text-starColor flex items-center gap-[2px] text-lg 2xl:text-2xl">
                      <MdOutlineStarPurple500 />
                      <MdOutlineStarPurple500 />
                      <MdOutlineStarPurple500 />
                      <MdOutlineStarPurple500 />
                      <MdOutlineStarPurple500 />
                    </div>
                    <div className="font-normal text-sm 2xl:text-lg text-starColor">
                      <span>
                        {detailsData?.retailer_avg_rating || "0.0"}/5
                        {formatReviewCount(
                          detailsData?.total_ratings_count ??
                            detailsData?.retailer?.google_reviews_count
                        )}
                      </span>
                    </div>
                  </div>
                  {/* other details table */}
                  <table className="w-full mt-1 sm:mt-0 mb-4 lg:mb-5 2xl:mb-10">
                    <tbody>
                      {tableData.map((item, index) => (
                        <tr key={index}>
                          <td className="py-1.5 2xl:py-2 pr-2 2xl:pr-7 font-normal text-base 2xl:text-xl text-primaryWhite vertical">
                            {item.label}
                          </td>
                          <td className="py-1.5 2xl:py-2 pl-1 2xl:px-4 text-base 2xl:text-xl capitalize text-thirdColor font-normal vertical">
                            <span className="pr-5">:</span>
                            {item.label === "Retailer" && detailsData?.retailer?.title ? (
                              <Link
                                to={getRetailerUrl({
                                  name: detailsData.retailer.title,
                                  id: (detailsData.retailer as any)?.id,
                                })}
                                className="hover:underline hover:text-orange text-primaryWhite transition-colors"
                              >
                                {item.value}
                              </Link>
                            ) : (
                              item.value
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="grid grid-cols-2 gap-3 lg:gap-4 xl:gap-6">
                    <Button
                      onClick={handleRetailerUrl}
                      btnTitle="Visit Retailer"
                      className="2xl:py-3 py-[10px] !px-3 md:!px-4 2xl:!px-12 !text-nowrap bg-orange capitalize active:scale-95 rounded-none transition-all text-primaryWhite font-Poppins font-medium 2xl:!text-base hover:bg-[#CC4910] w-full text-xs md:!text-sm after:!w-0 !text-center flex items-center justify-center"
                    />
                    <button
                      type="button"
                      onClick={handleAddToWishlist}
                      disabled={wishlistLoading}
                      className={`gap-2 items-center justify-center w-full text-xs md:text-sm 2xl:py-3 py-[10px] px-3 md:px-4 2xl:px-12 text-nowrap capitalize active:scale-95 rounded-none transition-all inline-flex text-primaryWhite font-Poppins font-medium 2xl:text-base border-[1px] ${isInWishlist(detailsData?.url) ? "bg-orange border-orange" : "bg-transparent wishlist-button"} ${wishlistLoading ? "opacity-70 pointer-events-none" : ""}`}
                    >
                      {wishlistLoading ? (
                        <span className="inline-block w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
                      ) : (
                        <>
                          <img
                            src={BadgeImage}
                            alt="badge-image"
                            className="min-w-[20px] max-w-[20px] h-[20px] shrink-0 2xl:min-w-[32px] 2xl:max-w-[32px] 2xl:h-[32px]"
                          />
                          {isInWishlist(detailsData?.url)
                            ? "In List"
                            : "Add to List"}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Free shipping progress bar */}
            {detailsData?.progress_bar && (() => {
              const pb = detailsData?.progress_bar;
              const current = pb?.current_total ?? 0;
              const target = pb?.target_amount ?? 0;
              const remaining = pb?.remaining_amount ?? 0;
              const message =
                pb?.message ?? `Add $${remaining.toFixed(2)} more to get FREE SHIPPING!`;
              const percent =
                target > 0 ? Math.min(100, Math.max(0, (current / target) * 100)) : 0;
              const parts = message.match(/^(.*?)(\$[\d.,]+)(.*)$/);

              return (
                <div className="p-[16px] sm:p-[22px] md:p-[26px] lg:p-[30px] xl:p-[34px] bg-[#1B1B1B] mt-[40px]">
                  <p className="text-center text-white text-[18px] sm:text-[20px] lg:text-[24px] xl:text-[28px] font-Poppins font-medium leading-[24px] sm:leading-[28px] lg:leading-[36px] xl:leading-[42px] mb-[9px]">
                    {parts ? (
                      <>
                        {parts[1]}
                        <span className="text-[#F44A01]">{parts[2]}</span>
                        {parts[3]}
                      </>
                    ) : (
                      message
                    )}
                  </p>
                  <div className="flex items-center justify-center gap-[12px] sm:gap-[20px]">
                    <p className="text-center text-white text-[18px] sm:text-[20px] lg:text-[24px] xl:text-[28px] font-Poppins font-medium leading-[24px] sm:leading-[28px] lg:leading-[36px] xl:leading-[42px]">
                      ${current}
                    </p>
                    <div className="rounded-[50px] overflow-hidden max-w-[899px] w-full bg-white h-[10px] sm:h-[12px] lg:h-[14px] xl:h-[18px]">
                      <div
                        style={{ width: `${percent}%` }}
                        className="bg-[#F44A01] h-[10px] sm:h-[12px] lg:h-[14px] xl:h-[18px] rounded-[50px] transition-all duration-300"
                      />
                    </div>
                    <p className="text-center text-white text-[18px] sm:text-[20px] lg:text-[24px] xl:text-[28px] font-Poppins font-medium leading-[24px] sm:leading-[28px] lg:leading-[36px] xl:leading-[42px]">
                      ${target}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        <div className="flex items-center justify-between flex-col md:flex-row md:gap-5 xl:gap-0">
          {/* product title */}
          <h2 className="text-lg xl:text-4xl font-medium text-primaryWhite mr-auto max-w-[1100px] leading-6 xl:leading-10 pt-5 xl:pt-7 pb-7 xl:pb-10">
            {detailsData?.title}
          </h2>
          {/* price alert */}
          {!isLoading && (
            <label
              htmlFor="check"
              onClick={handleAlertOpen}
              className="font-Poppins text-primaryWhite ml-auto mb-5 md:mb-0 text-nowrap flex items-center text-sm xl:text-lg font-medium bg-secondaryBg py-1 xl:py-2 cursor-pointer px-4 xl:px-8"
            >
              <div className="min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center">
                <CustomCheckbox
                  onChange={() => {}}
                  checked={alertData?.status === "active"}
                  id="check"
                  className={`text-primaryWhite ${alertData?.status === "active" && "!bg-orange"}`}
                />
              </div>
              Price Alert
            </label>
          )}
        </div>

        {/* Description/Review tabs */}
        <div className="grid grid-cols-12 gap-3 xl:gap-5 pb-5">
          <div
            onClick={handleDescription}
            className="col-span-12 sm:col-span-7 xl:col-span-4"
          >
            <Button
              btnTitle="Description"
              className={`w-full !bg-secondaryBg !font-light text-xs md:text-sm !text-gravelFint hover:!bg-[#313131] border-transparent after:!w-0 text-center ${
                openDescription && "!font-medium !text-[#ffffff] !bg-[#313131]"
              }`}
            />
          </div>
          <div
            onClick={handleProductReview}
            className="col-span-6 sm:col-span-5 xl:col-span-4"
          >
            <Button
              btnTitle="Retailer Review"
              className={`w-full !bg-secondaryBg !font-light text-xs md:text-sm !text-gravelFint hover:!bg-[#313131] border-transparent after:!w-0 text-center ${
                openProductReview &&
                "!font-medium !text-[#ffffff] !bg-[#313131]"
              }`}
            />
          </div>
          <div
            onClick={handleProductRating}
            className="col-span-6 sm:col-span-4 xl:col-span-4 w-full"
          >
            <Button
              disabled={!user || !openProductReview}
              btnTitle="Rating"
              img={<MdOutlineStarPurple500 className="text-starColor" />}
              className="align-middle select-none text-center disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none xl:py-3 py-[10px] xl:px-12 !text-nowrap capitalize active:scale-95 rounded-none transition-all !text-[#ffffff] !font-Poppins xl:!text-base !px-1 w-full bg-secondaryBg !text-xs md:!text-sm flex items-center flex-row-reverse justify-center gap-1 !font-light hover:bg-[#313131] border-transparent"
            />
          </div>
        </div>

        {/* Description */}
        <Description
          openDescription={openDescription}
          item={detailsData?.key_features}
        />

        {/* Product Review */}
        <ProductReview id={id} openProductReview={openProductReview} />

        {/* Price Alert Modal */}
        {detailsData?.url && detailsData?.caliber && (
          <PriceAlert
            open={alert}
            onClose={() => setAlert(false)}
            productData={{
              url: detailsData.url,
              caliber: detailsData.caliber,
            }}
            alertData={alertData || null}
            onSuccess={() => refetch()}
          />
        )}

        {/* Top picks */}
        <TopPicks className="!pb-0 pt-20 xl:pt-48" />
      </div>

      <AnimatePresence>
        {wishlistModal.open && (
          <WishlistSuccessModal
            onToggleModalClose={() =>
              setWishlistModal({ open: false, mode: "success" })
            }
            mode={wishlistModal.mode}
            discountMessage={wishlistModal.discountMessage}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetails;
