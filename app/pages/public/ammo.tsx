import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { useAppDispatch, useAppSelector } from "~/redux/store/hooks";
import { getAllProductThunk } from "~/services/httpServices/productService";
import {
  addProductFilterData,
  resetSuccess,
  setCancelPreviousRequest,
  setIsProductApiCall,
} from "~/redux/features/productSlice";
import { AmmoSearch, AmmoProducts, AmmoFilter, Ads } from "~/components/organisms/ammo";
import { axiosPublic } from "~/lib/axios/axios.config";
import { caliberToSlug, type CaliberItem } from "~/utils";
import type { ProductFilterData } from "~/types";

export default function Ammo() {
  const dispatch = useAppDispatch();
  const { productFilterData, isProductsApiCall, allProduct } = useAppSelector(
    (state) => state.productSlice
  );
  const hasProducts = (allProduct?.data?.data?.length ?? 0) > 0;

  const { data: caliberData } = useQuery<CaliberItem[]>({
    queryKey: ["caliberData"],
    queryFn: async () => {
      const response = await axiosPublic.get("/calibers");
      return response?.data?.data;
    },
    staleTime: 10 * 1000,
  });

  const apiLoad = useRef(true);
  const keyFeatureId = productFilterData?.key_feature_id;
  const keyFeatureIdValue = typeof keyFeatureId === "object" && keyFeatureId !== null ? keyFeatureId.id : keyFeatureId;

  const [productQueryData, setProductQueryData] = useState<ProductFilterData>({
    page: productFilterData?.page || 1,
    ...(productFilterData?.search && { search: productFilterData?.search }),
    ...(keyFeatureIdValue && { key_feature_id: keyFeatureIdValue }),
    ...(productFilterData?.brand &&
      productFilterData?.brand !== "default" && { brand: productFilterData?.brand }),
    ...(productFilterData?.shell_length &&
      productFilterData?.shell_length !== "default" && { shell_length: productFilterData?.shell_length }),
    ...(productFilterData?.casing &&
      productFilterData?.casing !== "default" && { casing: productFilterData?.casing }),
    ...(productFilterData?.shot_size &&
      productFilterData?.shot_size !== "default" && { shot_size: productFilterData?.shot_size }),
    ...(productFilterData?.grains &&
      productFilterData?.grains !== "default" && { grains: productFilterData?.grains }),
    ...(productFilterData?.num_of_rounds &&
      productFilterData?.num_of_rounds !== "default" && { num_of_rounds: productFilterData?.num_of_rounds }),
    ...(productFilterData?.shipping_review &&
      productFilterData?.shipping_review !== "default" && { shipping_review: productFilterData?.shipping_review }),
    ...(productFilterData?.retailer_review &&
      productFilterData?.retailer_review !== "default" && { retailer_review: productFilterData?.retailer_review }),
    ...(productFilterData?.price_sort &&
      productFilterData?.price_sort !== "default" && { price_sort: productFilterData?.price_sort }),
  });

  useEffect(() => {
    if (apiLoad.current && productQueryData && (isProductsApiCall || !hasProducts)) {
      dispatch(resetSuccess());
      dispatch(getAllProductThunk(productQueryData));
      apiLoad.current = false;
    }
  }, [dispatch, productQueryData, isProductsApiCall, hasProducts]);

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(resetSuccess());
      dispatch(setIsProductApiCall());
      dispatch(setCancelPreviousRequest(true));

      const searchValue = e.target.value;
      setProductQueryData((prev) => ({
        ...prev,
        search: searchValue,
      }));
      dispatch(
        addProductFilterData({
          ...productFilterData,
          search: searchValue,
        } as ProductFilterData)
      );

      dispatch(setCancelPreviousRequest(false));
      apiLoad.current = true;
    },
    300
  );

  return (
    <div className="pt-32 md:pt-40 xl:pt-[210px]">
      <div className="container">
        <div className="bg-secondaryBg p-3 xl:p-[30px] grid grid-cols-12 gap-4 xl:gap-[30px]">
          <div className="col-span-12 sticky top-0 left-0 z-[666] sm:z-[1000] flex flex-col gap-2.5 bg-secondaryBg pb-3 pt-1">
            <AmmoSearch handleChange={handleChange} isEdit={true} />
            {caliberData && caliberData.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto py-2 px-3 bg-[#141414] border border-[#2b2b2b] rounded-md scrollbar-thin">
                <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#817D81] font-Poppins shrink-0 font-medium">
                  Calibers:
                </span>
                {caliberData.slice(0, 12).map((c) => (
                  <a
                    key={c.id}
                    href={`/ammo/${caliberToSlug(c.caliber)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2.5 py-1 bg-[#202020] hover:bg-[#303030] text-primaryWhite hover:text-orange border border-[#3e3e3e] transition-colors rounded-sm shrink-0 font-Poppins"
                  >
                    {c.caliber}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 relative">
            <AmmoFilter setProductQueryData={setProductQueryData} apiLoad={apiLoad} />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-8 lg:col-span-9 xl:col-span-10">
            <AmmoProducts setProductQueryData={setProductQueryData} apiLoad={apiLoad} />
          </div>
        </div>
      </div>
      <Ads />
    </div>
  );
}
