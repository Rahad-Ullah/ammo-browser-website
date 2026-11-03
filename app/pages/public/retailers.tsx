import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { RetailersList } from "~/components/organisms/retailers";
import { retailerService } from "~/services/httpServices/retailerService";
import { generateMeta } from "~/utils";
import type { Route } from "./+types/retailers";
import type { PaginatedRetailersResponse } from "~/types";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get("page");
  const page = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;

  try {
    const paginatedData = await retailerService.getPaginatedRetailers(page);
    return { paginatedData, page, url: url.toString() };
  } catch (error) {
    console.error("Failed to fetch retailers in loader:", error);
    return {
      paginatedData: null as PaginatedRetailersResponse | null,
      page,
      url: url.toString(),
    };
  }
}

export function meta({
  loaderData,
}: Route.MetaArgs): ReturnType<Route.MetaFunction> {
  const ogUrl = loaderData?.url || "https://www.ammobrowser.com/retailers";
  const page = loaderData?.page || 1;
  const pageSuffix = page > 1 ? ` - Page ${page}` : "";

  return generateMeta({
    title: `Ammunition Retailers Directory${pageSuffix} | Top Online Gun & Ammo Stores | AmmoBrowser`,
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

  const { data: paginatedData, isLoading } = useQuery<PaginatedRetailersResponse | null>({
    queryKey: ["allRetailers", currentPage],
    queryFn: () => retailerService.getPaginatedRetailers(currentPage),
    initialData:
      currentPage === loaderData.page ? loaderData.paginatedData : undefined,
    staleTime: 5 * 60 * 1000,
  });

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (newPage > 1) {
        next.set("page", String(newPage));
      } else {
        next.delete("page");
      }
      return next;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const retailers = paginatedData?.data || [];
  const lastPage = paginatedData?.last_page || 1;
  const total = paginatedData?.total;

  return (
    <div className="py-24 sm:py-28 lg:py-36 font-Poppins">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Directory List with Pagination */}
        <RetailersList
          retailers={retailers}
          isLoading={isLoading && retailers.length === 0}
          currentPage={currentPage}
          lastPage={lastPage}
          total={total}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
