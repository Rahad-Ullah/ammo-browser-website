import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "~/components/molecules/BlogCard";
import logoImage from "~/assets/logo.png";
import { blogService } from "~/services/httpServices/blogService";
import { formatBlogImageUrl } from "~/utils";
import type { ApiBlogListItem, BlogCardProps } from "~/types";

interface LatestBlogSliderProps {
  currentBlogSlug?: string;
}

function mapBlogToCardProps(item: ApiBlogListItem): BlogCardProps {
  const date = new Date(item.created_at);
  const formattedDate = isNaN(date.getTime())
    ? item.created_at
    : date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    description: item.sub_title,
    category: item.category.name,
    tags: item.tags,
    image: formatBlogImageUrl(item.image),
    author: {
      name: item.author,
      avatar: logoImage,
    },
    date: formattedDate,
    readTime: item.reading_time,
  };
}

const LatestBlogSlider = ({ currentBlogSlug }: LatestBlogSliderProps) => {
  const { data: blogListData } = useQuery({
    queryKey: ["latestBlogs"],
    queryFn: () => blogService.getBlogList({ page: 1 }),
    staleTime: 5 * 60 * 1000,
  });

  const allBlogs = (blogListData?.data ?? []).map(mapBlogToCardProps);

  const filteredBlogs = currentBlogSlug
    ? allBlogs.filter((blog) => blog.slug !== currentBlogSlug)
    : allBlogs;

  if (filteredBlogs.length === 0) return null;

  return (
    <section className="pt-10 sm:pt-12 md:pt-14 lg:pt-16 xl:pt-[50px] pb-[40px] sm:pb-[48px] md:pb-[64px] lg:pb-[80px] xl:pb-[131px]">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[48px] font-bold font-Poppins text-white leading-snug lg:leading-tight xl:leading-[58px] mb-8 sm:mb-10 lg:mb-12 xl:mb-[30px]">
        Latest Blogs
      </h2>

      <div className="blog-slider overflow-hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={12}
          loop={filteredBlogs.length > 4}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            500: {
              slidesPerView: 1.5,
              spaceBetween: 14,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 18,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1680: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {filteredBlogs.map((blog) => (
            <SwiperSlide key={blog.id} className="!h-auto">
              <BlogCard {...blog} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default LatestBlogSlider;
