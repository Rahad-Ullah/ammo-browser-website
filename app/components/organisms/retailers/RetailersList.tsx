import { useEffect, useRef, useState } from "react";
import { IoSearchOutline, IoCloseCircleOutline } from "react-icons/io5";
import { FaStore, FaShippingFast, FaStar } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";
import type { RetailerItem } from "~/types";
import RetailerCard from "./RetailerCard";
import Pagination from "~/components/molecules/Pagination";

interface RetailersListProps {
  retailers: RetailerItem[];
  isLoading?: boolean;
  searchQuery?: string;
  searchTitle?: string;
  isFreeShipping?: boolean;
  googleRating?: string;
  currentPage?: number;
  lastPage?: number;
  total?: number;
  onSearchChange?: (search: string) => void;
  onToggleFreeShipping?: () => void;
  onToggleTopRated?: () => void;
  onResetFilters?: () => void;
  onPageChange?: (page: number) => void;
}

export default function RetailersList({
  retailers,
  isLoading = false,
  searchQuery,
  searchTitle = "",
  isFreeShipping = false,
  googleRating = "",
  currentPage = 1,
  lastPage = 1,
  total,
  onSearchChange,
  onToggleFreeShipping,
  onToggleTopRated,
  onResetFilters,
  onPageChange,
}: RetailersListProps) {
  const currentSearch = searchQuery !== undefined ? searchQuery : searchTitle;
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasText, setHasText] = useState(Boolean(currentSearch));

  // Results and the URL update after typing. Never write those values back into
  // the field while it is focused, or in-progress letters get replaced.
  useEffect(() => {
    const input = inputRef.current;
    if (!input || document.activeElement === input) return;
    if (input.value !== currentSearch) {
      input.value = currentSearch;
      setHasText(Boolean(currentSearch));
    }
  }, [currentSearch]);

  const debouncedSearch = useDebouncedCallback((val: string) => {
    onSearchChange?.(val);
  }, 400);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasText(Boolean(e.target.value));
    debouncedSearch(e.target.value);
  };

  const handleClearSearch = () => {
    if (inputRef.current) inputRef.current.value = "";
    setHasText(false);
    debouncedSearch.cancel();
    onSearchChange?.("");
  };

  const isAllActive = !isFreeShipping && !googleRating;
  const isTopRatedActive = googleRating === "4.8" || Number(googleRating) >= 4.8;

  return (
    <div className="w-full">
      {/* Search & Filter Controls Bar */}
      <div className="bg-[#131114] border border-[#2D2A2E] p-4 md:p-6 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondaryColor text-lg pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            defaultValue={currentSearch}
            onChange={handleInputChange}
            onBlur={() => {
              debouncedSearch.flush();
            }}
            placeholder="Search retailers by name..."
            className="w-full bg-[#1A181C] border border-[#332F36] focus:border-orange text-primaryWhite placeholder-secondaryColor pl-10 pr-10 py-2.5 text-sm font-Inter outline-none transition-colors"
          />
          {hasText && (
            <button
              type="button"
              onClick={handleClearSearch}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondaryColor hover:text-primaryWhite"
            >
              <IoCloseCircleOutline className="text-lg" />
            </button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* All Retailers */}
          <button
            type="button"
            onClick={() => {
              if (!isAllActive) {
                onResetFilters?.();
              }
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-Inter transition-colors border cursor-pointer ${
              isAllActive
                ? "bg-orange text-primaryWhite border-orange"
                : "bg-[#1A181C] text-secondaryColor border-[#332F36] hover:text-primaryWhite"
            }`}
          >
            <FaStore className="text-xs" />
            <span>All Retailers</span>
          </button>

          {/* Free Shipping Deals */}
          <button
            type="button"
            onClick={() => onToggleFreeShipping?.()}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-Inter transition-colors border cursor-pointer ${
              isFreeShipping
                ? "bg-orange text-primaryWhite border-orange"
                : "bg-[#1A181C] text-secondaryColor border-[#332F36] hover:text-primaryWhite"
            }`}
          >
            <FaShippingFast className="text-xs" />
            <span>Free Shipping Deals</span>
          </button>

          {/* Top Rated (4.8+) */}
          <button
            type="button"
            onClick={() => onToggleTopRated?.()}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-Inter transition-colors border cursor-pointer ${
              isTopRatedActive
                ? "bg-orange text-primaryWhite border-orange"
                : "bg-[#1A181C] text-secondaryColor border-[#332F36] hover:text-primaryWhite"
            }`}
          >
            <FaStar
              className={`text-xs ${
                isTopRatedActive ? "text-primaryWhite" : "text-starColor"
              }`}
            />
            <span>Top Rated (4.8+)</span>
          </button>
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 text-xs md:text-sm text-secondaryColor font-Inter">
        <p>
          Showing{" "}
          <span className="text-primaryWhite font-semibold">
            {retailers.length}
          </span>{" "}
          verified ammunition {retailers.length === 1 ? "retailer" : "retailers"}
          {total !== undefined ? (
            <span>
              {" "}
              of <span className="text-primaryWhite font-semibold">{total}</span>{" "}
              total
            </span>
          ) : null}
          {currentSearch && (
            <span>
              {" "}
              matching &quot;
              <span className="text-orange">{currentSearch}</span>
              &quot;
            </span>
          )}
          {isFreeShipping && (
            <span className="text-primaryWhite font-medium">
              {" "}
              • Free Shipping
            </span>
          )}
          {isTopRatedActive && (
            <span className="text-primaryWhite font-medium">
              {" "}
              • Rated 4.8+
            </span>
          )}
        </p>

        {lastPage > 1 && (
          <p className="text-xs text-[#817D81]">
            Page{" "}
            <span className="text-primaryWhite font-medium">{currentPage}</span> of{" "}
            <span className="text-primaryWhite font-medium">{lastPage}</span>
          </p>
        )}
      </div>

      {/* Retailers Grid / Skeletons */}
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
      ) : retailers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {retailers.map((retailer) => (
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
            type="button"
            onClick={() => {
              handleClearSearch();
              onResetFilters?.();
            }}
            className="bg-orange hover:bg-[#CC4910] text-primaryWhite px-6 py-2.5 text-xs font-Poppins uppercase tracking-wider font-semibold transition-colors active:scale-95 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
