import { Link } from "react-router";
import { FaStar, FaExternalLinkAlt, FaBoxes } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { RiDiscountPercentLine } from "react-icons/ri";
import type { RetailerItem } from "~/types";
import { getRetailerUrl } from "~/utils/retailerHelpers";
import Button from "~/components/atoms/Button";

interface RetailerCardProps {
  retailer: RetailerItem;
}

export default function RetailerCard({ retailer }: RetailerCardProps) {
  const detailUrl = getRetailerUrl(retailer);
  const ratingValue = retailer.google_rating ? parseFloat(retailer.google_rating) : null;
  const initial = (retailer.title || "R").charAt(0).toUpperCase();

  return (
    <div className="group relative bg-[#131114] border border-[#2D2A2E] hover:border-orange transition-all duration-300 flex flex-col justify-between p-5 md:p-6 shadow-lg hover:shadow-orange/10">
      {/* Top Header: Initial Avatar + Title + Outbound Website Link */}
      <div>
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#242125]">
          <Link to={detailUrl} className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-lg bg-[#1E1B20] border border-[#332F36] flex items-center justify-center shrink-0 group-hover:border-orange/60 transition-colors">
              <span className="font-SairaStencil text-2xl text-orange font-bold">
                {initial}
              </span>
            </div>

            <div>
              <h3 className="font-Poppins font-semibold text-lg text-primaryWhite group-hover:text-orange transition-colors line-clamp-1">
                {retailer.title}
              </h3>
              {retailer.products_count > 0 && (
                <p className="text-xs text-secondaryColor font-Inter mt-0.5">
                  {retailer.products_count.toLocaleString()} in-stock items
                </p>
              )}
            </div>
          </Link>

          {/* Outbound Website Link if available */}
          {retailer.retailer_website && (
            <a
              href={retailer.retailer_website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${retailer.title}`}
              className="text-secondaryColor hover:text-orange p-1.5 transition-colors"
              title="Visit official store"
            >
              <FaExternalLinkAlt className="text-xs" />
            </a>
          )}
        </div>

        {/* Badges: Rating, Free Shipping, Discount, Products */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          {ratingValue !== null && !isNaN(ratingValue) && (
            <div className="flex items-center gap-1 bg-[#1A181C] px-2.5 py-1 rounded text-xs text-starColor font-Inter">
              <FaStar className="text-[11px]" />
              <span className="font-semibold">{ratingValue.toFixed(1)}</span>
              <span className="text-[#817D81]">Google Rating</span>
            </div>
          )}

          {retailer.free_shipping && (
            <div className="flex items-center gap-1 bg-orange/10 border border-orange/30 px-2.5 py-1 rounded text-xs text-orange font-Inter">
              <MdLocalShipping className="text-sm shrink-0" />
              <span>
                {retailer.minimum_purchase_amount
                  ? `Free ship over $${retailer.minimum_purchase_amount}`
                  : "Free Shipping"}
              </span>
            </div>
          )}

          {retailer.products_count > 0 && (
            <div className="flex items-center gap-1 bg-[#1A181C] border border-[#332F36] px-2.5 py-1 rounded text-xs text-secondaryColor font-Inter">
              <FaBoxes className="text-[10px] text-orange" />
              <span>{retailer.products_count.toLocaleString()} Products</span>
            </div>
          )}

          {retailer.discount_value && (
            <div className="flex items-center gap-1 bg-green-500/10 border border-green-500/30 px-2.5 py-1 rounded text-xs text-green-400 font-Inter">
              <RiDiscountPercentLine className="text-xs" />
              <span>
                {retailer.discount_type === "percentage"
                  ? `${retailer.discount_value}% OFF`
                  : `$${retailer.discount_value} OFF`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-5 mt-4 border-t border-[#242125] flex items-center gap-2.5">
        <Link to={detailUrl} className="flex-1">
          <Button
            btnTitle="View Details"
            className="w-full bg-orange hover:bg-[#CC4910] text-primaryWhite font-Poppins text-xs sm:text-sm py-2.5 px-4 rounded-none transition-all active:scale-95 font-medium !text-center flex items-center justify-center"
          />
        </Link>
        {retailer.retailer_website && (
          <a
            href={retailer.retailer_website}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 border border-[#3B383D] hover:border-orange text-secondaryColor hover:text-primaryWhite text-xs font-Inter transition-colors flex items-center gap-1.5"
          >
            Store <FaExternalLinkAlt className="text-[10px]" />
          </a>
        )}
      </div>
    </div>
  );
}
