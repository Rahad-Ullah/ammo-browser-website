import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import {
  BlogBanner,
  BlogSearchBar,
  BlogGrid,
} from "~/components/organisms/blog";
import { BlogPagination, BlogPaginationInfo } from "~/components/molecules";
import logoImage from "~/assets/logo.png";
import { blogService } from "~/services/httpServices/blogService";
import { seoService } from "~/services/httpServices/seoService";
import { generateMeta, seoDataToMetaConfig } from "~/utils";
import type { Route } from "./+types/blog";
import type { ApiBlogListItem, BlogCardProps } from "~/types";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  try {
    const seoData = await seoService.getSeoData("blog");
    return { seoData, url: url.toString() };
  } catch (error) {
    console.error("Failed to fetch SEO data for blog page:", error);
    return { seoData: null, url: url.toString() };
  }
}

export function meta({
  loaderData,
}: Route.MetaArgs): ReturnType<Route.MetaFunction> {
  if (!loaderData) {
    return generateMeta();
  }

  const config = seoDataToMetaConfig(loaderData.seoData, loaderData.url);
  return generateMeta(config);
}

function formatBlogDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function mapBlogToCardProps(item: ApiBlogListItem): BlogCardProps {
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    description: item.sub_title,
    category: item.category.name,
    tags: item.tags,
    image: item.image,
    author: {
      name: item.author,
      avatar: logoImage,
    },
    date: formatBlogDate(item.created_at),
    readTime: item.reading_time,
  };
}

export default function Blog() {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["blogCategories"],
    queryFn: () => blogService.getCategories(),
    staleTime: 5 * 60 * 1000,
  });

  const { data: tags = [], isLoading: isTagsLoading } = useQuery({
    queryKey: ["blogTags"],
    queryFn: () => blogService.getTags(),
    staleTime: 5 * 60 * 1000,
  });

  const { data: blogListData, isLoading } = useQuery({
    queryKey: [
      "blogList",
      activeCategory,
      activeTag,
      debouncedSearch,
      currentPage,
    ],
    queryFn: () =>
      blogService.getBlogList({
        category: activeCategory || undefined,
        tag: activeTag || undefined,
        search: debouncedSearch || undefined,
        page: currentPage,
      }),
    staleTime: 5 * 1000,
  });

  const categoryItems = [
    { name: "All", slug: "" },
    ...categories.map((c) => ({ name: c.name, slug: c.slug })),
  ];

  const popularTags = [
    { name: "All", slug: "" },
    ...tags.map((t) => ({ name: t.name, slug: t.slug })),
  ];

  const blogs = (blogListData?.data ?? []).map(mapBlogToCardProps);

  const totalItems = blogListData?.total ?? 0;
  const lastPage = blogListData?.last_page ?? 1;
  const perPage = blogListData?.per_page ?? 9;

  // Debounce the search term sent to the API so we don't fire a request per keystroke.
  const applyDebouncedSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setCurrentPage(1);
  }, 400);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    applyDebouncedSearch(value);
  };

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    // setActiveTag("");
    setCurrentPage(1);
    // setSearchValue("");
    setDebouncedSearch("");
    applyDebouncedSearch.cancel();
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    // setActiveCategory("");
    setCurrentPage(1);
    // setSearchValue("");
    setDebouncedSearch("");
    applyDebouncedSearch.cancel();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#0C0B0B]">
      <BlogBanner title="Insights, guides & updates" />

      <div className="container">
        <div className="mt-[60px] xl:mt-[36px]">
          <BlogSearchBar
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            categories={categoryItems}
            popularTags={popularTags}
            onTagClick={handleTagClick}
            activeCategory={activeCategory}
            activeTag={activeTag}
            handleCategoryChange={handleCategoryChange}
            isCategoriesLoading={isCategoriesLoading}
            isTagsLoading={isTagsLoading}
          />
        </div>

        <div className="mt-4 lg:mt-6 xl:mt-[43px]">
          <BlogGrid blogs={blogs} isLoading={isLoading} />
        </div>

        {blogs.length > 0 && (
          <div className="mt-6 xl:mt-[35px] pb-[60px] xl:pb-[100px] flex flex-col sm:flex-row items-center justify-between gap-6">
            <BlogPaginationInfo
              currentPage={currentPage}
              itemsPerPage={perPage}
              totalItems={totalItems}
              currentPageItemCount={blogs.length}
            />

            <BlogPagination
              lastPage={lastPage}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
