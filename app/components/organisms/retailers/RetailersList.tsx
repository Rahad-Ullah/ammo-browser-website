import { useMemo, useState } from "react";
import { IoSearchOutline, IoCloseCircleOutline } from "react-icons/io5";
import { FaStore, FaShippingFast, FaStar } from "react-icons/fa";
import type { RetailerItem } from "~/types";
import RetailerCard from "./RetailerCard";
import Pagination from "~/components/molecules/Pagination";

interface RetailersListProps {
  retailers: RetailerItem[];
  isLoading?: boolean;
  currentPage?: number;
  lastPage?: number;
  total?: number;
  onPageChange?: (page: number) => void;
}

type FilterTab = "all" | "free-shipping" | "top-rated";

export default function RetailersList({
  retailers,
  isLoading = false,
  currentPage = 1,
  lastPage = 1,
  total,
  onPageChange,
}: RetailersListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredRetailers = useMemo(() => {
    return retailers.filter((retailer) => {
      const name = (retailer.title || "").toLowerCase();
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch = !search || name.includes(search);
      if (!matchesSearch) return false;

      if (activeTab === "free-shipping") {
        return retailer.free_shipping === true;
      }

      if (activeTab === "top-rated") {
        const rating = retailer.google_rating
          ? parseFloat(retailer.google_rating)
          : 0;
        return !isNaN(rating) && rating >= 4.8;
      }

      return true;
    });
  }, [retailers, searchTerm, activeTab]);

  return (
    <div className="w-full">
      {/* Search & Filter Controls Bar */}
      <div className="bg-[#131114] border border-[#2D2A2E] p-4 md:p-6 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondaryColor text-lg pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search retailers by name..."
            className="w-full bg-[#1A181C] border border-[#332F36] focus:border-orange text-primaryWhite placeholder-secondaryColor pl-10 pr-10 py-2.5 text-sm font-Inter outline-none transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondaryColor hover:text-primaryWhite"
            >
              <IoCloseCircleOutline className="text-lg" />
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-Inter transition-colors border ${
              activeTab === "all"
                ? "bg-orange text-primaryWhite border-orange"
                : "bg-[#1A181C] text-secondaryColor border-[#332F36] hover:text-primaryWhite"
            }`}
          >
            <FaStore className="text-xs" />
            <span>All on page ({retailers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("free-shipping")}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-Inter transition-colors border ${
              activeTab === "free-shipping"
                ? "bg-orange text-primaryWhite border-orange"
                : "bg-[#1A181C] text-secondaryColor border-[#332F36] hover:text-primaryWhite"
            }`}
          >
            <FaShippingFast className="text-xs" />
            <span>Free Shipping Deals</span>
          </button>

          <button
            onClick={() => setActiveTab("top-rated")}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-Inter transition-colors border ${
              activeTab === "top-rated"
                ? "bg-orange text-primaryWhite border-orange"
                : "bg-[#1A181C] text-secondaryColor border-[#332F36] hover:text-primaryWhite"
            }`}
          >
            <FaStar className="text-xs text-starColor" />
            <span>Top Rated (4.8+)</span>
          </button>
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 text-xs md:text-sm text-secondaryColor font-Inter">
        <p>
          Showing <span className="text-primaryWhite font-semibold">{filteredRetailers.length}</span>{" "}
          verified ammunition {filteredRetailers.length === 1 ? "retailer" : "retailers"}
          {total !== undefined ? (
            <span>
              {" "}of <span className="text-primaryWhite font-semibold">{total}</span> total
            </span>
          ) : null}
          {searchTerm && (
            <span>
              {" "}
              matching &quot;<span className="text-orange">{searchTerm}</span>&quot;
            </span>
          )}
        </p>

        {lastPage > 1 && (
          <p className="text-xs text-[#817D81]">
            Page <span className="text-primaryWhite font-medium">{currentPage}</span> of{" "}
            <span className="text-primaryWhite font-medium">{lastPage}</span>
          </p>
        )}
      </div>

      {/* Retailers Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#131114] border border-[#2D2A2E] p-6 animate-pulse space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-[#242125] rounded" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-[#242125] rounded w-3/4" />
                  <div className="h-3 bg-[#242125] rounded w-1/2" />
                </div>
              </div>
              <div className="h-12 bg-[#242125] rounded" />
              <div className="h-9 bg-[#242125] rounded" />
            </div>
          ))}
        </div>
      ) : filteredRetailers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredRetailers.map((retailer) => (
              <RetailerCard key={retailer.id} retailer={retailer} />
            ))}
          </div>

          {/* Pagination Controls */}
          {lastPage > 1 && onPageChange && (
            <div className="flex justify-center mt-12 pb-6">
              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                handlePageChange={onPageChange}
              />
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="bg-[#131114] border border-[#2D2A2E] text-center py-16 px-6">
          <FaStore className="text-4xl text-secondaryColor mx-auto mb-4 opacity-50" />
          <h3 className="font-Poppins font-medium text-xl text-primaryWhite mb-2">
            No retailers found
          </h3>
          <p className="text-secondaryColor text-sm font-Inter max-w-md mx-auto mb-6">
            We couldn&apos;t find any retailers matching your current search criteria.
            Try clearing your filters or searching with different terms.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setActiveTab("all");
            }}
            className="bg-orange hover:bg-[#CC4910] text-primaryWhite px-6 py-2.5 text-xs font-Poppins uppercase tracking-wider font-semibold transition-colors active:scale-95"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
