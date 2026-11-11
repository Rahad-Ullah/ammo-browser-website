import { useSearchParams } from "react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { RetailersList } from "~/components/organisms/retailers";
import { retailerService } from "~/services/httpServices/retailerService";
import { generateMeta } from "~/utils";
import type { Route } from "./+types/retailers";
import type { PaginatedRetailersResponse, RetailerQueryParams } from "~/types";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get("page");
  const searchParam =
    url.searchParams.get("search") || url.searchParams.get("title");
  const freeShippingParam = url.searchParams.get("free_shipping");
  const googleRatingParam = url.searchParams.get("google_rating");

  const page = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;
  const search = searchParam?.trim() || "";
  const free_shipping = freeShippingParam === "true";
  const google_rating = googleRatingParam?.trim() || "";

  const queryParams: RetailerQueryParams = {
    page,
    ...(search ? { search } : {}),
    ...(free_shipping ? { free_shipping: true } : {}),
    ...(google_rating ? { google_rating } : {}),
  };

  try {
    const paginatedData = await retailerService.getPaginatedRetailers(queryParams);
    return { paginatedData, queryParams, url: url.toString() };
  } catch (error) {
    console.error("Failed to fetch retailers in loader:", error);
    return {
      paginatedData: null as PaginatedRetailersResponse | null,
      queryParams,
      url: url.toString(),
    };
  }
}

export function shouldRevalidate({
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}: {
  currentUrl: URL;
  nextUrl: URL;
  defaultShouldRevalidate: boolean;
}) {
  // The page already refetches retailers on the client. Rerunning the route
  // loader on each keystroke navigates the document and interrupts typing.
  if (currentUrl.pathname === nextUrl.pathname) return false;
  return defaultShouldRevalidate;
}

export function meta({
  loaderData,
}: Route.MetaArgs): ReturnType<Route.MetaFunction> {
  const ogUrl = loaderData?.url || "https://www.ammobrowser.com/retailers";
  const page = loaderData?.queryParams?.page || 1;
  const pageSuffix = page > 1 ? ` - Page ${page}` : "";
  const searchQuery =
    loaderData?.queryParams?.search || loaderData?.queryParams?.title;
  const searchSuffix = searchQuery ? ` - "${searchQuery}"` : "";

  return generateMeta({
    title: `Ammunition Retailers Directory${searchSuffix}${pageSuffix} | Top Online Gun & Ammo Stores | AmmoBrowser`,
    description:
      "Explore verified online ammunition retailers. Compare bulk discounts, customer ratings, free shipping policies, and in-stock inventory from top suppliers nationwide.",
    ogUrl,
    keywords:
      "ammo retailers, gun stores, ammunition suppliers, buy ammo online, bulk ammo deals, ammo shipping",
  });
}

export default function RetailersPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;
  const searchQuery =
    searchParams.get("search") || searchParams.get("title") || "";
  const isFreeShipping = searchParams.get("free_shipping") === "true";
  const googleRating = searchParams.get("google_rating") || "";

  const activeParams: RetailerQueryParams = {
    page: currentPage,
    ...(searchQuery.trim() ? { search: searchQuery.trim() } : {}),
    ...(isFreeShipping ? { free_shipping: true } : {}),
    ...(googleRating ? { google_rating: googleRating } : {}),
  };

  const isInitialMatch =
    currentPage === (loaderData?.queryParams?.page || 1) &&
    searchQuery ===
      (loaderData?.queryParams?.search ||
        loaderData?.queryParams?.title ||
        "") &&
    isFreeShipping === Boolean(loaderData?.queryParams?.free_shipping) &&
    googleRating ===
      (loaderData?.queryParams?.google_rating
        ? String(loaderData.queryParams.google_rating)
        : "");

  const { data: paginatedData, isLoading } = useQuery<PaginatedRetailersResponse | null>({
    queryKey: [
      "allRetailers",
      currentPage,
      searchQuery,
      isFreeShipping,
      googleRating,
    ],
    queryFn: () => retailerService.getPaginatedRetailers(activeParams),
    initialData: isInitialMatch ? loaderData.paginatedData : undefined,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });

  const updateQueryParams = (updates: {
    search?: string;
    free_shipping?: boolean;
    google_rating?: string;
    page?: number;
  }) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("title"); // Clean up old 'title' param

      if (updates.search !== undefined) {
        if (updates.search.trim()) {
          next.set("search", updates.search);
        } else {
          next.delete("search");
        }
      }

      if (updates.free_shipping !== undefined) {
        if (updates.free_shipping) {
          next.set("free_shipping", "true");
        } else {
          next.delete("free_shipping");
        }
      }

      if (updates.google_rating !== undefined) {
        if (updates.google_rating) {
          next.set("google_rating", updates.google_rating);
        } else {
          next.delete("google_rating");
        }
      }

      if (updates.page !== undefined) {
        if (updates.page > 1) {
          next.set("page", String(updates.page));
        } else {
          next.delete("page");
        }
      } else {
        // Any filter or search term change resets page to 1
        next.delete("page");
      }

      return next;
    }, { replace: true, preventScrollReset: true });
  };

  const handleSearchChange = (newSearch: string) => {
    updateQueryParams({ search: newSearch });
  };

  const handleToggleFreeShipping = () => {
    updateQueryParams({ free_shipping: !isFreeShipping });
  };

  const handleToggleTopRated = () => {
    updateQueryParams({
      google_rating: googleRating === "4.8" ? "" : "4.8",
    });
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true, preventScrollReset: true });
  };

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const retailers = paginatedData?.data || [];
  const lastPage = paginatedData?.last_page || 1;
  const total = paginatedData?.total;

  return (
    <div className="py-24 sm:py-28 lg:py-36 font-Poppins">
      <div className="container">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl heading-gradient font-bold pb-4">
            Ammunition Retailers
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-secondaryColor font-Inter font-light leading-relaxed">
            Discover verified retailers, compare shipping rates, check verified store reviews,
            and find the lowest prices per round across the nation&apos;s most reliable ammunition suppliers.
          </p>
        </div>

        {/* Directory List with Search, Filters & Pagination */}
        <RetailersList
          retailers={retailers}
          isLoading={isLoading && retailers.length === 0}
          searchQuery={searchQuery}
          isFreeShipping={isFreeShipping}
          googleRating={googleRating}
          currentPage={currentPage}
          lastPage={lastPage}
          total={total}
          onSearchChange={handleSearchChange}
          onToggleFreeShipping={handleToggleFreeShipping}
          onToggleTopRated={handleToggleTopRated}
          onResetFilters={handleResetFilters}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
