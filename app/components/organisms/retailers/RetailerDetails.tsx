import { Link } from "react-router";
import { FaStar, FaExternalLinkAlt, FaBoxes } from "react-icons/fa";
import { MdLocalShipping, MdStorefront } from "react-icons/md";
import { RiDiscountPercentLine } from "react-icons/ri";
import type { RetailerItem, Product } from "~/types";
import { formatReviewCount } from "~/utils/retailerHelpers";
import Button from "~/components/atoms/Button";
import ProductCard2 from "~/components/molecules/ProductCard2";
import elips1 from "~/assets/Ellipse 12.png";
import elips2 from "~/assets/Ellipse 13.png";

interface RetailerDetailsProps {
  retailer: RetailerItem;
  products?: Product[];
  isLoadingProducts?: boolean;
}

export default function RetailerDetails({
  retailer,
  products = [],
  isLoadingProducts = false,
}: RetailerDetailsProps) {
  const ratingValue = retailer.google_rating ? parseFloat(retailer.google_rating) : null;
  const initial = (retailer.title || "R").charAt(0).toUpperCase();

  return (
    <div className="py-24 sm:py-28 lg:py-36 font-Poppins">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs md:text-sm text-[#817D81] font-Poppins pb-6 relative z-10"
        >
          <Link to="/" className="hover:text-primaryWhite transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/retailers" className="hover:text-primaryWhite transition-colors">
            Retailers
          </Link>
          <span>/</span>
          <span className="text-primaryWhite font-medium truncate max-w-[200px] sm:max-w-md">
            {retailer.title}
          </span>
        </nav>

        {/* Hero Banner with Retailer Information */}
        <div className="relative bg-[#131114] border border-[#2D2A2E] p-6 sm:p-8 lg:p-10 mb-12 overflow-hidden shadow-2xl">
          {/* Decorative Background Elements */}
          <img
            src={elips2}
            alt=""
            className="absolute -top-16 -right-16 w-80 h-80 opacity-20 pointer-events-none"
          />
          <img
            src={elips1}
            alt=""
            className="absolute -bottom-16 -left-16 w-80 h-80 opacity-15 pointer-events-none"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left: Avatar & Basic Information */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Initial Badge */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#1E1B20] border-2 border-orange/40 flex items-center justify-center shrink-0 shadow-lg">
                <span className="font-SairaStencil text-4xl text-orange font-bold">
                  {initial}
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <h1 className="font-Poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-primaryWhite">
                    {retailer.title}
                  </h1>

                  {retailer.discount_value && (
                    <span className="inline-flex items-center gap-1 bg-green-500/15 border border-green-500/40 text-green-400 text-xs px-2.5 py-0.5 rounded-full font-Inter">
                      <RiDiscountPercentLine className="text-sm" />
                      {retailer.discount_type === "percentage"
                        ? `${retailer.discount_value}% Discount`
                        : `$${retailer.discount_value} Discount`}
                    </span>
                  )}
                </div>

                {/* Rating & Product Count Info */}
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-secondaryColor font-Inter mt-2">
                  {ratingValue !== null && !isNaN(ratingValue) ? (
                    <div className="flex items-center gap-1.5 text-starColor">
                      <FaStar className="text-sm" />
                      <span className="font-semibold text-primaryWhite">
                        {ratingValue.toFixed(1)}
                        {formatReviewCount(retailer.google_reviews_count)}
                      </span>
                      <span className="text-[#817D81]">(Google Rating)</span>
                    </div>
                  ) : null}

                  {retailer.products_count > 0 && (
                    <div className="flex items-center gap-1.5 text-secondaryColor">
                      <FaBoxes className="text-orange" />
                      <span>{retailer.products_count.toLocaleString()} in-stock items</span>
                    </div>
                  )}

                  {retailer.free_shipping && (
                    <div className="flex items-center gap-1.5 text-orange">
                      <MdLocalShipping className="text-base" />
                      <span>
                        {retailer.minimum_purchase_amount
                          ? `Free shipping over $${retailer.minimum_purchase_amount}`
                          : "Free Shipping Available"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Direct Store CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              {retailer.retailer_website && (
                <a
                  href={retailer.retailer_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    btnTitle="Visit Official Store"
                    className="w-full bg-orange hover:bg-[#CC4910] text-primaryWhite font-Poppins text-sm py-3 px-6 rounded-none transition-all active:scale-95 font-medium flex items-center justify-center gap-2"
                  />
                </a>
              )}

              <Link to="/ammo" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full border border-[#3B383D] hover:border-orange text-primaryWhite hover:text-orange text-sm font-Poppins py-2.5 px-6 rounded-none transition-colors active:scale-95 font-medium flex items-center justify-center gap-2 bg-[#1A181C]"
                >
                  <MdStorefront className="text-base" /> Browse All Ammo
                </button>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#242125]">
            <div className="bg-[#1A181C] p-4 border border-[#2D2A2E]">
              <div className="flex items-center gap-2 text-orange mb-1">
                <MdLocalShipping className="text-lg" />
                <span className="text-xs font-Inter text-secondaryColor">Free Shipping</span>
              </div>
              <p className="font-Poppins font-semibold text-base sm:text-lg text-primaryWhite">
                {retailer.free_shipping
                  ? retailer.minimum_purchase_amount
                    ? `Over $${retailer.minimum_purchase_amount}`
                    : "Available"
                  : "No Free Shipping"}
              </p>
            </div>

            <div className="bg-[#1A181C] p-4 border border-[#2D2A2E]">
              <div className="flex items-center gap-2 text-starColor mb-1">
                <FaStar className="text-base" />
                <span className="text-xs font-Inter text-secondaryColor">Google Rating</span>
              </div>
              <p className="font-Poppins font-semibold text-base sm:text-lg text-primaryWhite">
                {ratingValue !== null && !isNaN(ratingValue)
                  ? `${ratingValue.toFixed(1)} / 5.0${formatReviewCount(retailer.google_reviews_count)}`
                  : "N/A"}
              </p>
            </div>

            <div className="bg-[#1A181C] p-4 border border-[#2D2A2E] col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <FaBoxes className="text-base" />
                <span className="text-xs font-Inter text-secondaryColor">Live Products</span>
              </div>
              <p className="font-Poppins font-semibold text-base sm:text-lg text-primaryWhite">
                {retailer.products_count
                  ? `${retailer.products_count.toLocaleString()} Items`
                  : "0 Items"}
              </p>
            </div>
          </div>
        </div>

        {/* Active Retailer Deals & Product Inventory */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-Poppins font-bold text-xl sm:text-2xl text-primaryWhite">
                In-Stock Ammunition from {retailer.title}
              </h2>
              <p className="text-xs sm:text-sm text-secondaryColor font-Inter mt-1">
                Compare caliber prices, grain weight, and rounds per box.
              </p>
            </div>

            <Link
              to="/ammo"
              className="text-orange hover:text-[#CC4910] text-xs sm:text-sm font-Poppins font-medium flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              Browse all ammunition deals &rarr;
            </Link>
          </div>

          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#131114] border border-[#2D2A2E] p-6 animate-pulse h-80"
                />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((item) => (
                <ProductCard2 key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="bg-[#131114] border border-[#2D2A2E] text-center py-12 px-6">
              <MdStorefront className="text-4xl text-secondaryColor mx-auto mb-3 opacity-50" />
              <p className="text-primaryWhite font-Poppins font-medium mb-1">
                No individual inventory items currently filtered for {retailer.title}
              </p>
              <p className="text-secondaryColor text-xs font-Inter max-w-md mx-auto mb-4">
                Explore our main search directory to compare live in-stock rounds across all calibers and brands.
              </p>
              <Link to="/ammo">
                <Button
                  btnTitle="Search All Deals"
                  className="bg-orange hover:bg-[#CC4910] text-primaryWhite px-5 py-2 text-xs font-Poppins"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
