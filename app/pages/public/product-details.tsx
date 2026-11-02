import { useEffect, useRef } from "react";
import { useAppDispatch } from "~/redux/store/hooks";
import { resetProductApiCall } from "~/redux/features/productSlice";
import { ProductDetails } from "~/components/organisms/product";
import type { Route } from "./+types/product-details";
import { axiosPublic } from "~/lib/axios/axios.config";
import { generateMeta, extractProductIdFromSlug } from "~/utils";

interface ProductData {
  id: string;
  caliber?: string;
  cost_per_round?: number;
  price?: number;
  title?: string;
  brand?: string;
  retailer?: { title?: string };
  key_features?: {
    image_url?: string;
    bullet_type?: string;
    use_case?: string;
    category?: { name?: string };
  };
  condition?: string;
}

export async function loader({ params, request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const routeParams = params as Record<string, string | undefined>;
  const rawId = routeParams.productSlug || routeParams.id;
  const id = extractProductIdFromSlug(rawId);

  if (!id) {
    return { productData: null, url: url.toString() };
  }

  try {
    const response = await axiosPublic.get(`/products/details/${id}`);
    const productData = response?.data?.data as ProductData;
    return { productData, url: url.toString() };
  } catch (error) {
    console.error("Failed to fetch product data for SEO:", error);
    return { productData: null, url: url.toString() };
  }
}

export function meta({ loaderData }: Route.MetaArgs): ReturnType<Route.MetaFunction> {
  if (!loaderData?.productData) {
    // Fallback to default meta if product data not available
    return generateMeta({
      title: "Product Details | AmmoBrowser",
      description: "View ammunition product details, pricing, and availability.",
    });
  }

  const { productData, url } = loaderData;

  // Build dynamic title
  const title = productData.caliber && productData.title
    ? `${productData.caliber} - ${productData.title} | AmmoBrowser`
    : productData.title || productData.caliber || "Product Details | AmmoBrowser";

  // Build dynamic description
  const parts: string[] = [];
  if (productData.title) parts.push(productData.title);
  if (productData.caliber) parts.push(`${productData.caliber} ammunition`);
  if (productData.cost_per_round) parts.push(`$${productData.cost_per_round.toFixed(2)}/round`);
  if (productData.brand) parts.push(`Brand: ${productData.brand}`);
  if (productData.condition) parts.push(productData.condition);
  parts.push("Shop now at AmmoBrowser.");

  const description = parts.join(". ").replace(/\.\./g, ".");

  // Build keywords
  const keywords: string[] = ["ammunition", "ammo", "buy ammo online"];
  if (productData.caliber) keywords.unshift(productData.caliber);
  if (productData.brand) keywords.push(productData.brand);
  if (productData.key_features?.bullet_type) keywords.push(productData.key_features.bullet_type);
  if (productData.key_features?.category?.name) keywords.push(productData.key_features.category.name);

  return generateMeta({
    title,
    description,
    keywords: keywords.join(", "),
    ogImage: productData.key_features?.image_url || "",
    ogUrl: url,
    ogType: "product",
  });
}

export default function ProductDetailsPage() {
  const dispatch = useAppDispatch();
  const apiLoad = useRef(true);

  useEffect(() => {
    if (apiLoad.current) {
      dispatch(resetProductApiCall());
      apiLoad.current = false;
    }
  }, [dispatch]);

  return <ProductDetails />;
}
