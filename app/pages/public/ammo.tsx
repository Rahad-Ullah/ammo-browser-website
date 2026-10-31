import { useEffect, useRef, useState } from "react";
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
import type { ProductFilterData } from "~/types";

export default function Ammo() {
  const dispatch = useAppDispatch();
  const { productFilterData, isProductsApiCall, allProduct } = useAppSelector(
    (state) => state.productSlice
  );
  const hasProducts = (allProduct?.data?.data?.length ?? 0) > 0;

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
          <div className="col-span-12 sticky top-0 left-0 z-[666] sm:z-[1000]">
            <AmmoSearch handleChange={handleChange} isEdit={true} />
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
