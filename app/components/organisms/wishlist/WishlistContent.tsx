import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TbWorld } from "react-icons/tb";
import WishlistTableRow from "~/components/molecules/WishlistTableRow";
import WishlistIcon from "../../../assets/icon.svg";
import { axiosPrivate } from "~/lib/axios/axios.config";
import { useAuth } from "~/hooks/providers/AuthProvider";
import { WISHLIST_URLS_QUERY_KEY } from "~/hooks/useWishlistUrls";
import { handleApiError } from "~/utils/errorHandler";
import { successToast } from "~/utils/toast";
import { getLocalStorage } from "~/utils/localStorage";
import type { WishlistRetailerGroup } from "~/types";

export default function WishlistContent() {
  const [token, setToken] = useState<string | null>(null);
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("US");
  const [debouncedZip, setDebouncedZip] = useState("");
  const [debouncedCountry, setDebouncedCountry] = useState("US");
  const queryClient = useQueryClient();
  const { addToWishlist, removeFromWishlist } = useAuth();

  useEffect(() => {
    setToken(getLocalStorage<string>("berg-user-response") as string | null);
    const storedZip = localStorage.getItem("destination_zip") ?? "";
    const storedCountry = localStorage.getItem("berg-destination-country") ?? "";
    setZip(storedZip);
    setCountry(storedCountry ?? "US");
    setDebouncedZip(storedZip);
    setDebouncedCountry(storedCountry ?? "US");
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedZip(zip), 500);
    return () => clearTimeout(timer);
  }, [zip]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedCountry(country ?? "US"), 500);
    return () => clearTimeout(timer);
  }, [country]);

  const [actionLoading, setActionLoading] = useState<{ url: string; action: "increase" | "decrease" | "remove" } | null>(null);

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setZip(value);
    if (value) {
      localStorage.setItem("destination_zip", value);
    } else {
      localStorage.removeItem("destination_zip");
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCountry(value);
    localStorage.setItem("berg-destination-country", value);
  };

  const { data: wishlistData, isLoading } = useQuery<WishlistRetailerGroup[]>({
    queryKey: ["wishlist", debouncedZip, debouncedCountry],
    queryFn: async () => {
      const response = await axiosPrivate.get("/wishlist", {
        params: {
          // ...(debouncedCountry && { destination_country: debouncedCountry }),
          destination_country: 'us',
          ...(debouncedZip && { destination_zip: debouncedZip }),
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      return response?.data?.data;
    },
    staleTime: 5 * 1000,
    enabled: !!token,
  });

  const handleQuantityChange = async (productUrl: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const currentProduct = wishlistData?.flatMap((g) => g.products).find((p) => p.url === productUrl);
    const action = newQuantity > (currentProduct?.quantity ?? 0) ? "increase" : "decrease";
    setActionLoading({ url: productUrl, action });
    try {
      await addToWishlist(productUrl, String(newQuantity));
      await queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    } catch (error) {
      handleApiError(error as Parameters<typeof handleApiError>[0]);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemoveItem = async (productUrl: string) => {
    setActionLoading({ url: productUrl, action: "remove" });
    try {
      await removeFromWishlist(productUrl);
      successToast("Item removed from wishlist");
      await queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      // Keep the wishlist-URL set in sync so other pages (e.g. product details)
      // show "Add to List" instead of "In List" after this item is removed.
      queryClient.invalidateQueries({ queryKey: WISHLIST_URLS_QUERY_KEY });
    } catch (error) {
      handleApiError(error as Parameters<typeof handleApiError>[0]);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="pt-32 md:pt-40 xl:pt-[210px] pb-[40px] sm:pb-[60px] md:pb-[80px] lg:pb-[90px] 2xl:pb-[113px]">
      <div className="container">
        <div className="bg-[#1B1B1B] p-3 xl:p-[40px]">
          <div className="mb-[26px] sm:mb-[36px] 2xl:mb-[43px] flex items-start md:items-center justify-between gap-[16px] sm:gap-[20px] flex-col md:flex-row">
            <h1 className="font-Poppins font-semibold text-[20px] sm:text-[24px] 2xl:text-[32px] leading-[28px] sm:leading-[34px] 2xl:leading-[48px] tracking-normal text-white whitespace-nowrap">
              Shipping List
            </h1>

            <div className="flex sm:items-center justify-start flex-col-reverse sm:flex-row md:justify-end gap-[10px] sm:gap-[16px] md:gap-[20px] 2xl:gap-[30px]">
              {/* <h2 className="rounded-[10px] md:rounded-[14px] 2xl:rounded-[20px] bg-[#0C0B0B] py-[10px] md:py-[12px] 2xl:py-[17px] px-[14px] md:px-[18px] 2xl:px-[30px] text-[12px] sm:text-[14px] md:text-[16px] 2xl:text-[20px] leading-[18px] sm:leading-[20px] md:leading-[24px] 2xl:leading-[30px] font-Poppins font-normal text-white text-center max-w-[248px] sm:max-w-auto md:max-w-[350px] 2xl:max-w-[432px] w-auto md:w-full ">
                Free shipping threshold (per retailer)
              </h2> */}
              <div className="rounded-[10px] md:rounded-[14px] 2xl:rounded-[20px] bg-[#0C0B0B] py-[10px] md:py-[12px] 2xl:py-[17px] px-[14px] md:px-[18px] 2xl:px-[30px] flex items-center justify-start gap-[6px] md:gap-[9px] 2xl:gap-[11px] min-w-[98px] sm:min-w-[110px] md:min-w-[132px] 2xl:min-w-[169px] max-w-[200px]">
                <img src={WishlistIcon} alt="wishlist-icon" className="min-w-[16px] md:min-w-[20px] 2xl:min-w-[24px] max-w-[16px] md:max-w-[20px] 2xl:max-w-[24px] h-[16px] md:h-[20px] 2xl:h-[24px]" />
                <input
                  type="text"
                  value={zip}
                  onChange={handleZipChange}
                  placeholder="Zip Code"
                  className="bg-transparent text-white text-[12px] sm:text-[14px] md:text-[16px] 2xl:text-[20px] leading-[18px] sm:leading-[20px] md:leading-[24px] 2xl:leading-[30px] font-Poppins font-normal outline-none w-full placeholder:text-white/50"
                />
              </div>
              <div className="rounded-[10px] md:rounded-[14px] 2xl:rounded-[20px] bg-[#0C0B0B] py-[10px] md:py-[12px] 2xl:py-[17px] px-[14px] md:px-[18px] 2xl:px-[30px] flex items-center justify-start gap-[6px] md:gap-[9px] 2xl:gap-[11px] min-w-[98px] sm:min-w-[110px] md:min-w-[132px] 2xl:min-w-[169px] max-w-[200px]">
                <TbWorld className="min-w-[16px] md:min-w-[20px] 2xl:min-w-[24px] max-w-[16px] md:max-w-[20px] 2xl:max-w-[24px] h-[16px] md:h-[20px] 2xl:h-[24px] text-white" />
                <input
                  type="text"
                  // value={country}
                  value={"US"}
                  readOnly={true}
                  onChange={handleCountryChange}
                  placeholder="Country"
                  className="bg-transparent text-white text-[12px] sm:text-[14px] md:text-[16px] 2xl:text-[20px] leading-[18px] sm:leading-[20px] md:leading-[24px] 2xl:leading-[30px] font-Poppins font-normal outline-none w-full placeholder:text-white/50"
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-[24px] sm:gap-[30px] 2xl:gap-[33px]">
              {[1, 2].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-[48px] bg-gray-700 rounded-t-[15px]" />
                  <div className="space-y-1 mt-1">
                    <div className="h-[42px] bg-gray-700/30 rounded" />
                    <div className="h-[42px] bg-gray-700/30 rounded" />
                    <div className="h-[42px] bg-gray-700/30 rounded" />
                  </div>
                  <div className="flex gap-[18px] sm:gap-[22px] 2xl:gap-[45px] flex-col xl:flex-row mt-[26px] 2xl:mt-[31px]">
                    <div className="h-[180px] bg-gray-700/20 rounded-[10px] md:rounded-[14px] 2xl:rounded-[20px] flex-1" />
                    <div className="h-[180px] bg-gray-700/20 rounded-[10px] md:rounded-[14px] 2xl:rounded-[20px] xl:max-w-[606px] w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : !wishlistData || wishlistData.length === 0 ? (
            <div className="flex items-center justify-center py-[60px] sm:py-[80px] 2xl:py-[120px]">
              <p className="font-Poppins font-light text-[16px] sm:text-[18px] 2xl:text-[20px] leading-[24px] sm:leading-[28px] 2xl:leading-[30px] text-white/60 text-center">
                Your wishlist is empty.
              </p>
            </div>
          ) : (
            <div className="grid gap-[24px] sm:gap-[30px] 2xl:gap-[33px]">
              {wishlistData.map((group) => {
                const { retailer, products, pricing, free_shipping_message } = group;
                const discountLabel =
                  retailer.discount_type === "percentage"
                    ? `Additional discount (${parseFloat(retailer.discount_value)}%)`
                    : `Additional discount`;

                const remainingForFreeShipping = pricing.remaining_for_discount;
                // const free_shipping_message = free_shipping_message
                const shippingDisplay =
                  retailer.free_shipping > 0 && pricing.shipping === 0
                    ? "Free"
                    : `$${pricing.shipping.toFixed(2)}`;

                return (
                  <div key={retailer.id} aria-label="shipping-cost">
                    <div aria-label="table">
                      <div className="py-[8px] lg:py-[10px] px-[12px] lg:px-[14px] 2xl:py-[13px] 2xl:px-[20px] bg-[#E34602] rounded-tl-[10px] rounded-tr-[10px] sm:rounded-tl-[15px] sm:rounded-tr-[15px] flex items-center justify-between gap-[14px]" aria-label="table-head">
                        <div className="min-w-[170px] max-w-[170px] sm:min-w-[196px] sm:max-w-[196px] pe-[7px]">
                          <p className="font-poppins font-medium text-[14px] lg:text-[16px] 2xl:text-[20px] leading-[22px] lg:leading-[24px] 2xl:leading-[30px] text-[#FFFFFF] tracking-normal uppercase">
                            Product
                          </p>
                        </div>
                        <div className="hidden md:block min-w-[82px] max-w-[82px] 2xl:min-w-[96px] 2xl:max-w-[96px] px-[4px] lg:px-[7px]">
                          <p className="font-poppins font-medium text-[13px] sm:text-[14px] lg:text-[16px] 2xl:text-[20px] leading-[22px] lg:leading-[24px] 2xl:leading-[30px] text-[#FFFFFF] tracking-normal uppercase">
                            Caliber
                          </p>
                        </div>
                        <div className="hidden xl:block min-w-[94px] max-w-[94px] lg:min-w-[114px] lg:max-w-[114px] px-[4px] lg:px-[7px]">
                          <p className="font-poppins font-medium text-[13px] sm:text-[14px] lg:text-[16px] 2xl:text-[20px] leading-[22px] lg:leading-[24px] 2xl:leading-[30px] text-[#FFFFFF] tracking-normal uppercase">
                            Retailer
                          </p>
                        </div>
                        <div className="hidden md:block max-w-[152px] min-w-[152px] md:min-w-[180px] md:max-w-[180px] 2xl:min-w-[194px] 2xl:max-w-[194px] px-[4px] lg:px-[7px]">
                          <p className="font-poppins font-medium text-[13px] sm:text-[14px] lg:text-[16px] 2xl:text-[20px] leading-[22px] lg:leading-[24px] 2xl:leading-[30px] text-[#FFFFFF] tracking-normal uppercase">
                            Qty
                          </p>
                        </div>
                        <div className="hidden xl:block min-w-[128px] max-w-[128px] 2xl:min-w-[136px] 2xl:max-w-[136px] px-[4px] lg:px-[7px]">
                          <p className="font-poppins font-medium text-[13px] sm:text-[14px] lg:text-[16px] 2xl:text-[20px] leading-[22px] lg:leading-[24px] 2xl:leading-[30px] text-[#FFFFFF] tracking-normal uppercase">
                            Rounds/Box
                          </p>
                        </div>
                        <div className="hidden 2xl:block min-w-[110px] max-w-[110px] 2xl:min-w-[124px] 2xl:max-w-[124px] px-[4px] lg:px-[7px]">
                          <p className="font-poppins font-medium text-[13px] sm:text-[14px] lg:text-[16px] 2xl:text-[20px] leading-[22px] lg:leading-[24px] 2xl:leading-[30px] text-[#FFFFFF] tracking-normal uppercase">
                            Price/Box
                          </p>
                        </div>
                        <div className="min-w-[100px] max-w-[100px] sm:min-w-[110px] sm:max-w-[110px] lg:min-w-[128px] lg:max-w-[128px] 2xl:min-w-[154px] 2xl:max-w-[154px] px-[4px] lg:px-[7px]">
                          <p className="font-poppins font-medium text-[13px] sm:text-[14px] lg:text-[16px] 2xl:text-[20px] leading-[22px] lg:leading-[24px] 2xl:leading-[30px] text-[#FFFFFF] tracking-normal uppercase">
                            Cost/Round
                          </p>
                        </div>
                        <div className="hidden 2xl:block min-w-[110px] max-w-[110px] 2xl:min-w-[138px] 2xl:max-w-[138px] px-[4px] lg:px-[7px]">
                          <p className="font-poppins font-medium text-[13px] sm:text-[14px] lg:text-[16px] 2xl:text-[20px] leading-[22px] lg:leading-[24px] 2xl:leading-[30px] text-[#FFFFFF] tracking-normal uppercase">
                            Line Total
                          </p>
                        </div>
                        <div className="hidden lg:block max-w-[23px] min-w-[23px] sm:max-w-[82px] sm:min-w-[82px] lg:min-w-[102px] lg:max-w-[102px] ps-[7px]">
                          <p className="font-poppins font-medium text-[13px] sm:text-[14px] lg:text-[16px] 2xl:text-[20px] leading-[22px] lg:leading-[24px] 2xl:leading-[30px] text-[#FFFFFF] tracking-normal uppercase"></p>
                        </div>
                      </div>
                      <div aria-label="table-body">
                        {products.map((product, index) => (
                          <WishlistTableRow
                            key={product.product_id}
                            isTrue={index === 0}
                            product={product}
                            retailerTitle={retailer.title}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemoveItem}
                            actionLoading={actionLoading?.url === product.url ? actionLoading : null}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-[18px] sm:gap-[22px] 2xl:gap-[45px] flex-col xl:flex-row justify-between mt-[26px] 2xl:mt-[31px]">
                      <div className="p-[14px] sm:p-[18px] md:p-[20px] bg-[#2F1F18] max-w-[947px] rounded-[10px] md:rounded-[14px] 2xl:rounded-[20px] w-full">
                        <div className="grid gap-[4px] sm:gap-[10px]">
                          <p className="flex items-center justify-between gap-[20px] font-Poppins font-light tracking-light capitalize text-[14px] lg:text-[16px] 2xl:text-[20px] leading-[22px] lg:leading-[24px] 2xl:leading-[30px] text-white">
                            <span>Merchandise Subtotal</span>
                            <span className="font-medium">${pricing.subtotal.toFixed(2)}</span>
                          </p>
                          <p className="flex items-center justify-between gap-[20px] font-Poppins font-light tracking-light capitalize text-[14px] lg:text-[16px] 2xl:text-[20px] leading-[22px] lg:leading-[24px] 2xl:leading-[30px] text-white">
                            <span>Total Shipping (all retailers)</span>
                            <span className="font-medium">{shippingDisplay}</span>
                          </p>
                          <p className="flex items-center justify-between gap-[20px] font-Poppins font-light tracking-light capitalize text-[14px] lg:text-[16px] 2xl:text-[20px] leading-[22px] lg:leading-[24px] 2xl:leading-[30px] text-white">
                            <span>{discountLabel}</span>
                            <span className="font-medium">-${pricing.discount.toFixed(2)}</span>
                          </p>
                        </div>

                        <div className="mt-[14px] sm:mt-[18px] 2xl:mt-[22px] grid gap-[10px] 2xl:gap-[15px]">
                          <h1 className="flex items-center justify-between font-Poppins font-medium text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] 2xl:text-[24px] leading-[24px] sm:leading-[28px] lg:leading-[32px] 2xl:leading-[36px] text-white tracking-normal">
                            Grand Total
                            <span>${pricing.final_total.toFixed(2)}</span>
                          </h1>

                          {free_shipping_message && (
                            <h2 className="rounded-[10px] md:rounded-[14px] 2xl:rounded-[20px] bg-[#0C0B0B] py-[10px] md:py-[12px] 2xl:py-[17px] px-[14px] md:px-[18px] 2xl:px-[30px] text-[12px] sm:text-[14px] md:text-[16px] 2xl:text-[20px] leading-[20px] sm:leading-[20px] md:leading-[24px] 2xl:leading-[30px] font-Poppins font-normal text-white w-full">
                              💡 {free_shipping_message}
                              {/* You are ${remainingForFreeShipping.toFixed(2)} away to get a free shipping from {retailer.title}. */}
                            </h2>
                          )}
                        </div>
                      </div>

                      <div className="p-[14px] sm:p-[18px] md:p-[20px] bg-[#2F1F18] rounded-[10px] md:rounded-[14px] 2xl:rounded-[20px] xl:max-w-[606px] w-full">
                        <h1 className="flex md:items-center justify-between font-Poppins font-medium text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] 2xl:text-[24px] leading-[24px] sm:leading-[28px] lg:leading-[32px] 2xl:leading-[36px] text-white tracking-normal flex-col md:flex-row">
                          <span>
                            {retailer.title} <small className="font-light !text-[16px] 2xl:text-[20px] leading-[24px] 2xl:leading-[30px]">(Subtotal: ${pricing.subtotal.toFixed(2)})</small>
                          </span>
                          <small className="font-Poppins font-light text-[14px] sm:text-[16px] 2xl:text-[20px] leading-[24px] 2xl:leading-[30px] text-[#F44A01]">
                            {shippingDisplay === "Free" ? "Free shipping" : `${shippingDisplay} shipping`}
                          </small>
                        </h1>

                        {remainingForFreeShipping > 0 && (
                          <p className="flex items-center justify-between gap-[20px] font-Poppins font-light text-[13px] sm:text-[14px] 2xl:text-[16px] leading-[22px] 2xl:leading-[24px] tracking-light capitalize text-white mt-[12px] 2xl:mt-[15px]">
                            You are ${remainingForFreeShipping.toFixed(2)} away to get{" "}
                            {parseFloat(retailer.discount_value) > 0
                              ? retailer.discount_type === "percentage"
                                ? `${parseFloat(retailer.discount_value)}% off`
                                : `$${parseFloat(retailer.discount_value).toFixed(2)} off`
                              : "free shipping"}{" "}
                            from {retailer.title}.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
