import { useQuery } from "@tanstack/react-query";
import { RetailerDetails } from "~/components/organisms/retailers";
import { retailerService } from "~/services/httpServices/retailerService";
import { extractRetailerIdFromSlug, generateMeta } from "~/utils";
import type { Route } from "./+types/retailer-details";
import type { RetailerItem, Product } from "~/types";

export async function loader({ params, request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const rawSlug = params.slug || "";
  const id = extractRetailerIdFromSlug(rawSlug);

  try {
    const retailer = await retailerService.getRetailerDetails(rawSlug);
    let products: Product[] = [];

    if (id || retailer?.id) {
      products = await retailerService.getRetailerProducts(id || retailer!.id);
    }

    return {
      retailer,
      products,
      slug: rawSlug,
      url: url.toString(),
    };
  } catch (error) {
    console.error("Failed to load retailer details:", error);
    return {
      retailer: null,
      products: [] as Product[],
      slug: rawSlug,
      url: url.toString(),
    };
  }
}

export function meta({
  loaderData,
}: Route.MetaArgs): ReturnType<Route.MetaFunction> {
  if (!loaderData?.retailer) {
    return generateMeta({
      title: "Retailer Profile | AmmoBrowser",
      description: "View verified ammunition retailer profiles, shipping terms, and live deals on AmmoBrowser.",
    });
  }

  const { retailer, url } = loaderData;
  const name = retailer.title;
  const desc = `Compare in-stock ammunition prices, customer ratings, and live deals from ${name} on AmmoBrowser.`;

  return generateMeta({
    title: `${name} - Ammunition Retailer Review & In-Stock Deals | AmmoBrowser`,
    description: desc,
    ogUrl: url,
    keywords: `${name}, ${name} ammo, buy ammo from ${name}, ammo deals, ammo shipping, ammo ratings`,
  });
}

export default function RetailerDetailsPage({
  loaderData,
}: Route.ComponentProps) {
  const slug = loaderData.slug;
  const initialRetailer = loaderData.retailer;
  const initialProducts = loaderData.products;

  const { data: retailer, isLoading } = useQuery<RetailerItem | null>({
    queryKey: ["retailerDetails", slug],
    queryFn: () => retailerService.getRetailerDetails(slug),
    initialData: initialRetailer ?? undefined,
    staleTime: 5 * 60 * 1000,
  });

  const rawId = extractRetailerIdFromSlug(slug);
  const activeId = rawId || retailer?.id;

  const { data: products, isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ["retailerProducts", activeId],
    queryFn: () =>
      activeId ? retailerService.getRetailerProducts(activeId) : Promise.resolve([]),
    initialData: initialProducts?.length ? initialProducts : undefined,
    enabled: !!activeId,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading && !retailer) {
    return (
      <div className="py-36 text-center text-secondaryColor font-Poppins">
        <div className="inline-block w-8 h-8 border-2 border-orange border-t-transparent rounded-full animate-spin mb-4" />
        <p>Loading retailer information...</p>
      </div>
    );
  }

  if (!retailer) {
    return (
      <div className="py-36 text-center text-primaryWhite font-Poppins">
        <h2 className="text-2xl font-bold mb-2">Retailer Not Found</h2>
        <p className="text-secondaryColor text-sm mb-6">
          We could not find the retailer you are looking for.
        </p>
        <a
          href="/retailers"
          className="inline-block bg-orange hover:bg-[#CC4910] text-primaryWhite font-medium px-6 py-2.5 text-xs font-Poppins uppercase tracking-wider"
        >
          View All Retailers
        </a>
      </div>
    );
  }

  return (
    <RetailerDetails
      retailer={retailer}
      products={products || []}
      isLoadingProducts={isLoadingProducts && !products}
    />
  );
}
