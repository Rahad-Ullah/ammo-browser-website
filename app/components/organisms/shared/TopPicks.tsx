import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import { axiosPublic } from "~/lib/axios/axios.config";
import { useAuth } from "~/hooks/providers/AuthProvider";
import { useWishlistUrls, WISHLIST_URLS_QUERY_KEY } from "~/hooks/useWishlistUrls";
import ProductCard2 from "~/components/molecules/ProductCard2";
import ProductCardLoader from "~/components/molecules/ProductCardLoader";
import WishlistSuccessModal from "~/components/molecules/WishlistSuccessModal";

interface ProductItem {
  id: string;
  caliber?: string;
  cost_per_round?: number;
  num_of_rounds?: string;
  condition?: string;
  retailer_avg_rating?: number;
  key_features?: { image_url?: string; system_image_url?: string };
  retailer?: { title?: string };
  url?: string;
  quantity?: number | null;
}

interface TopPicksProps {
  className?: string;
}

type WishlistModalMode = "success" | "already-exists" | "login-prompt";

const TopPicks = ({ className }: TopPicksProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<ProductItem[]>({
    queryKey: ["top-picks"],
    queryFn: async () => {
      const response = await axiosPublic.get("/products/top-picks");
      return response?.data?.data?.data;
    },
    staleTime: 5 * 1000,
  });

  const { authToken, addToWishlist } = useAuth();
  const { isInWishlist } = useWishlistUrls();
  const [wishlistModal, setWishlistModal] = useState<{ open: boolean; mode: WishlistModalMode; discountMessage?: string }>({ open: false, mode: "success" });

  const onToggleModal = async (id: string) => {
    const product = data?.find((p) => String(p.id) === String(id));

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
      queryClient.invalidateQueries({ queryKey: ["top-picks"] });
    } catch {
      setWishlistModal({ open: true, mode: "already-exists" });
    }
  };

  const onToggleModalClose = () => {
    setWishlistModal({ open: false, mode: "success" });
  };

  return (
    <div className={`pb-32 ${className}`}>
      <div>
        <h4 className="text-3xl xl:text-7xl heading-gradient">Top Picks</h4>
        <div className="xl:pt-12 pt-8">
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".button-next",
              prevEl: ".button-prev",
            }}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              480: {
                slidesPerView: 1.5,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1536: {
                slidesPerView: 4,
                spaceBetween: 28,
              },
            }}
            className="mySwiper !pb-2"
          >
            {isLoading &&
              new Array(8).fill(null).map((_, index) => (
                <SwiperSlide key={index} className="!h-auto flex">
                  <ProductCardLoader className={"border-[1px] border-transparent h-full"} />
                </SwiperSlide>
              ))}
            {((data?.length ?? 0) < 1 || isError) &&
              new Array(8).fill(null).map((_, index) => (
                <SwiperSlide key={`empty-${index}`} className="!h-auto flex">
                  <ProductCardLoader className={"border-[1px] border-transparent h-full"} />
                </SwiperSlide>
              ))}
            {data?.slice(0, 10).map((item, index) => (
              <SwiperSlide key={item.id ?? index} className="!h-auto flex">
                <ProductCard2 item={item} onToggleModal={onToggleModal} isInWishlist={isInWishlist(item?.url)} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* next & prev */}
          <div className="flex items-center gap-5 justify-center pt-8 xl:pt-14">
            <div
              className="border-[1.5px] border-orange text-orange py-1 xl:py-2 hover:bg-orange hover:text-primaryWhite active:scale-95 transition cursor-pointer
             xl:px-9 px-4 text-xl xl:text-3xl button-prev"
            >
              <GoChevronLeft />
            </div>
            <div
              className="border-[1.5px] border-orange text-orange py-1 xl:py-2 hover:bg-orange hover:text-primaryWhite active:scale-95 transition cursor-pointer
             xl:px-9 px-4 text-xl xl:text-3xl button-next"
            >
              <GoChevronRight />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {wishlistModal.open && (
          <WishlistSuccessModal onToggleModalClose={onToggleModalClose} mode={wishlistModal.mode} discountMessage={wishlistModal.discountMessage} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopPicks;
