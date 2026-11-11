import { useState, type MutableRefObject } from "react";
import { AnimatePresence } from "motion/react";
import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "~/redux/store/hooks";
import { addProductFilterData, setIsProductApiCall, silentUpdateProducts } from "~/redux/features/productSlice";
import { productManagementService } from "~/services/httpServices/productService";
import { useAuth } from "~/hooks/providers/AuthProvider";
import { useWishlistUrls, WISHLIST_URLS_QUERY_KEY } from "~/hooks/useWishlistUrls";
import ProductCard2 from "~/components/molecules/ProductCard2";
import ProductCardLoader from "~/components/molecules/ProductCardLoader";
import Pagination from "~/components/molecules/Pagination";
import WishlistSuccessModal from "~/components/molecules/WishlistSuccessModal";
import type { ProductFilterData } from "~/types";

type WishlistModalMode = "success" | "already-exists" | "login-prompt";

interface AmmoProductsProps {
  setProductQueryData: React.Dispatch<React.SetStateAction<ProductFilterData>>;
  apiLoad: MutableRefObject<boolean>;
}

const AmmoProducts = ({ setProductQueryData, apiLoad }: AmmoProductsProps) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { allProduct, productFilterData, loading, error } = useAppSelector(
    (state) => state.productSlice
  );
  const products = allProduct?.data?.data ?? [];
  const isWaitingForProducts = loading || (allProduct == null && !error);
  const { authToken, addToWishlist } = useAuth();
  const { isInWishlist } = useWishlistUrls();
  const [wishlistModal, setWishlistModal] = useState<{ open: boolean; mode: WishlistModalMode; discountMessage?: string }>({ open: false, mode: "success" });

  const handlePageChange = (newPage: number) => {
    dispatch(setIsProductApiCall());
    dispatch(
      addProductFilterData({
        ...productFilterData,
        page: newPage,
      } as ProductFilterData)
    );
    setProductQueryData((prev) => ({
      ...prev,
      page: newPage,
    }));
    apiLoad.current = true;
    window.scrollTo(0, 0);
  };

  const onToggleModal = async (id: string) => {
    const product = allProduct?.data?.data?.find((p) => String(p.id) === String(id));

    if (!authToken) {
      setWishlistModal({ open: true, mode: "login-prompt" });
      return;
    }

    if (isInWishlist(product?.url)) {
      setWishlistModal({ open: true, mode: "already-exists" });
      return;
    }

    try {
      const response = await addToWishlist(product?.url || "");
      setWishlistModal({ open: true, mode: "success", discountMessage: response.data?.discount_message || "" });
      queryClient.invalidateQueries({ queryKey: WISHLIST_URLS_QUERY_KEY });
      // Silent refetch products without loader
      if (productFilterData) {
        productManagementService.getAllProducts(productFilterData).then((data) => {
          dispatch(silentUpdateProducts(data));
        });
      }
    } catch {
      setWishlistModal({ open: true, mode: "already-exists" });
    }
  };

  const onToggleModalClose = () => {
    setWishlistModal({ open: false, mode: "success" });
  };

  return (
    <>
      {isWaitingForProducts ? (
        <div className="grid grid-cols-1 xxs:grid-cols-2 sm:!grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 xl:!grid-cols-4 gap-2 sm:gap-3 xl:gap-3">
          {new Array(12).fill(null).map((_, index) => (
            <ProductCardLoader key={index} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 xxs:grid-cols-2 sm:!grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 xl:!grid-cols-4 gap-2 sm:gap-3 xl:gap-3">
            {products.map((item) => (
              <ProductCard2 key={item?.id} item={item} onToggleModal={onToggleModal} isInWishlist={isInWishlist(item?.url)} />
            ))}
          </div>

          <div className="flex items-center justify-center">
            {products.length > 0 && (
              <Pagination
                currentPage={productFilterData?.page || 1}
                handlePageChange={handlePageChange}
                lastPage={allProduct?.data?.last_page || 1}
              />
            )}
          </div>

          <AnimatePresence>
            {wishlistModal.open && (
              <WishlistSuccessModal onToggleModalClose={onToggleModalClose} mode={wishlistModal.mode} discountMessage={wishlistModal.discountMessage} />
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="p-5 text-secondaryColor font-Inter text-lg">No product found</div>
      )}
    </>
  );
};

export default AmmoProducts;
