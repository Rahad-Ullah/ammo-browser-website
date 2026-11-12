import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { IoChevronForwardOutline, IoArrowBackOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "~/redux/store/hooks";
import { getAllProductThunk } from "~/services/httpServices/productService";
import {
  addProductFilterData,
  resetSuccess,
  setIsProductApiCall,
} from "~/redux/features/productSlice";
import { AmmoSearch, AmmoProducts, AmmoFilter, Ads } from "~/components/organisms/ammo";
import NotFoundPage from "~/pages/public/error";
import { axiosPublic } from "~/lib/axios/axios.config";
import {
  generateMeta,
  caliberToSlug,
  slugToDisplayCaliber,
  findCaliberBySlug,
  type CaliberItem,
} from "~/utils";
import type { Route } from "./+types/ammo-caliber";
import type { ProductFilterData } from "~/types";

export function meta({
  params,
}: Route.MetaArgs): ReturnType<Route.MetaFunction> {
  const displayName = slugToDisplayCaliber(params.caliber || "");
  return generateMeta({
    title: `Best ${displayName} Ammo Deals & In-Stock Prices | AmmoBrowser`,
    description: `Compare in-stock ${displayName} ammunition from top retailers. Find the lowest cost-per-round on ${displayName} bulk ammo, target practice, and self-defense rounds.`,
    ogUrl: `https://www.ammobrowser.com/ammo/${params.caliber || ""}`,
  });
}

export default function AmmoCaliberPage() {
  const { caliber: caliberParam } = useParams<{ caliber: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { productFilterData, isProductsApiCall, allProduct } = useAppSelector(
    (state) => state.productSlice
  );

  const apiLoad = useRef(true);
  const filtersBeforeSearch = useRef<ProductFilterData | null>(null);
  const userTypedSearch = useRef(false);

  // Fetch all calibers to resolve the slug to its ID and formal title
  const { data: caliberData, isLoading: isCalibersLoading, isError: isCalibersError } = useQuery<CaliberItem[]>({
    queryKey: ["caliberData"],
    queryFn: async () => {
      const response = await axiosPublic.get("/calibers");
      return response?.data?.data;
    },
    staleTime: 10 * 1000,
  });

  // Resolve matching caliber from route slug
  const matchedCaliber = useMemo(() => {
    return findCaliberBySlug(caliberData || [], caliberParam);
  }, [caliberData, caliberParam]);

  const caliberTitle = matchedCaliber?.caliber || slugToDisplayCaliber(caliberParam || "");

  const [productQueryData, setProductQueryData] = useState<ProductFilterData>(() => ({
    page: 1,
    ...(caliberTitle ? { search: caliberTitle } : {}),
  }));

  const caliberNotFound = !isCalibersLoading && !isCalibersError && !!caliberData && !matchedCaliber;

  useEffect(() => {
    if (caliberNotFound) {
      document.title = "Page Not Found | AmmoBrowser";
    }
  }, [caliberNotFound]);

  // Caliber pages filter products by the caliber name in `search`, never by key_feature_id.
  useEffect(() => {
    if (!caliberParam || !matchedCaliber || userTypedSearch.current) return;

    const payload: ProductFilterData = { page: 1, search: matchedCaliber.caliber };
    setProductQueryData(payload);
    dispatch(
      addProductFilterData({
        page: 1,
        key_feature_id: matchedCaliber,
      } as ProductFilterData)
    );
    dispatch(resetSuccess());
    dispatch(setIsProductApiCall());
    dispatch(getAllProductThunk(payload));
    apiLoad.current = false;
  }, [dispatch, caliberParam, matchedCaliber]);

  // Execute product search thunk
  useEffect(() => {
    if (!matchedCaliber) return;
    const hasProducts = (allProduct?.data?.data?.length ?? 0) > 0;
    if (apiLoad.current && (isProductsApiCall || !hasProducts)) {
      dispatch(resetSuccess());
      dispatch(getAllProductThunk(productQueryData));
      apiLoad.current = false;
    }
  }, [dispatch, productQueryData, isProductsApiCall, allProduct, matchedCaliber]);

  if (isCalibersLoading) {
    return null;
  }

  if (caliberNotFound) {
    return <NotFoundPage />;
  }

  const handleProductSearch = (query: string) => {
    const nextSearch = query.trim();
    dispatch(setIsProductApiCall());

    if (nextSearch) {
      userTypedSearch.current = true;
      setProductQueryData((prev) => {
        if (!prev.search) filtersBeforeSearch.current = prev;
        return { page: 1, search: nextSearch };
      });
      dispatch(addProductFilterData({ page: 1, search: nextSearch, key_feature_id: matchedCaliber } as ProductFilterData));
    } else {
      userTypedSearch.current = false;
      const restored: ProductFilterData = { page: 1, search: caliberTitle };
      filtersBeforeSearch.current = null;
      setProductQueryData(restored);
      dispatch(addProductFilterData({ ...restored, key_feature_id: matchedCaliber } as ProductFilterData));
    }

    apiLoad.current = true;
  };

  // When a user selects a caliber from the search dropdown or sidebar filter on this page, navigate to that caliber's page
  const handleSelectCaliber = (selected: CaliberItem | "default") => {
    if (selected === "default") {
      navigate("/ammo");
    } else {
      const nextSlug = caliberToSlug(selected.caliber);
      navigate(`/ammo/${nextSlug}`);
    }
  };

  return (
    <div className="pt-28 md:pt-36 xl:pt-[190px]">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs md:text-sm text-[#817D81] font-Poppins pb-4"
        >
          <Link to="/" className="hover:text-primaryWhite transition-colors">
            Home
          </Link>
          <IoChevronForwardOutline className="text-xs" />
          <Link to="/ammo" className="hover:text-primaryWhite transition-colors">
            Ammo
          </Link>
          <IoChevronForwardOutline className="text-xs" />
          <span className="text-primaryWhite font-medium capitalize">{caliberTitle}</span>
        </nav>

        {/* Caliber Hero Banner */}
        <div className="bg-[#1e1e1e] border border-[#333333] p-4 md:p-6 mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primaryWhite font-Poppins capitalize">
                {caliberTitle} Ammunition
              </h1>
              <span className="px-2.5 py-1 bg-orange/20 text-orange border border-orange/40 text-xs font-semibold uppercase tracking-wider rounded">
                Caliber
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#9e9e9e] font-Poppins pt-1.5">
              Find bulk {caliberTitle} ammo deals, compare price per round, and browse in-stock ammunition from trusted retailers.
            </p>
          </div>

          <Link
            to="/ammo"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs md:text-sm text-secondaryColor hover:text-primaryWhite border border-[#444444] hover:border-[#666666] px-3 py-1.5 transition-colors font-Poppins"
          >
            <IoArrowBackOutline className="text-sm" /> All Calibers
          </Link>
        </div>

        {/* Main Ammo Filter & Products Grid */}
        <div className="bg-secondaryBg p-3 xl:p-4 flex flex-col gap-3 xl:gap-4">
          <div className="sticky top-0 left-0 z-[666] sm:z-[1000] bg-secondaryBg pb-3 pt-1">
            <AmmoSearch value={caliberTitle} onSelectCaliber={handleSelectCaliber} onSearchChange={handleProductSearch} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[200px_minmax(0,1fr)] lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)] gap-3 xl:gap-4">
            <div className="relative min-w-0">
              <AmmoFilter
                setProductQueryData={setProductQueryData}
                apiLoad={apiLoad}
                onSelectCaliber={handleSelectCaliber}
              />
            </div>
            <div className="min-w-0">
              <AmmoProducts setProductQueryData={setProductQueryData} apiLoad={apiLoad} />
            </div>
          </div>
        </div>
      </div>
      <Ads />
    </div>
  );
}
