import { IoSearchOutline } from "react-icons/io5";
import { BlogCategoryFilter } from "~/components/molecules";

interface CategoryItem {
  name: string;
  slug: string;
}

interface TagItem {
  name: string;
  slug: string;
}

interface BlogSearchBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  categories: CategoryItem[];
  popularTags: TagItem[];
  onTagClick?: (tag: string) => void;
  activeCategory: string;
  activeTag?: string;
  handleCategoryChange: (slug: string) => void;
  isCategoriesLoading?: boolean;
  isTagsLoading?: boolean;
}

const BlogSearchBar = ({
  searchValue,
  onSearchChange,
  categories,
  popularTags,
  onTagClick,
  activeCategory,
  activeTag,
  handleCategoryChange,
  isCategoriesLoading,
  isTagsLoading,
}: BlogSearchBarProps) => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[672px_1fr] 2xl:grid-cols-[972px_1fr] gap-6 lg:gap-[20px] items-start">
      <div className="max-w-full">
      <div className="relative bg-[#2F1F18]">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search articles, tags, topics..."
          className="w-full h-12 md:h-[80px] pl-3 pr-10 md:pl-6 md:pr-16 bg-black/40 text-primaryWhite search-input-border placeholder:font-light placeholder:font-Poppins placeholder:text-base placeholder:md:text-[28px] placeholder:text-primaryWhite placeholder:leading-[48px] placeholder:md:leading-[64px] font-Poppins font-light text-base md:text-[28px] leading-[48px] md:leading-[64px] outline-none"
        />
        <IoSearchOutline className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-primaryWhite w-5 h-5 md:w-[30px] md:h-[30px]" />
      </div>
      <div className="mt-[24px] lg:mt-[25px]">
          <BlogCategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            isLoading={isCategoriesLoading}
          />
        </div>
      </div>

      <div className="flex flex-col overflow-auto gap-3 lg:gap-[12px] bg-[#5654534D] bottom-scroll pt-4 pb-4 px-4 lg:pt-[15px] lg:pb-[19px] lg:px-[25px]">
        <span className="text-primaryWhite text-base lg:text-lg font-medium font-Poppins">
          Popular tags
        </span>
        <div className="flex overflow-auto flex-nowrap sm:flex-wrap lg:flex-nowrap 2xl:flex-wrap gap-2 lg:gap-[10px] bottom-scroll pb-[5px]">
          {isTagsLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[25px] w-[100px] lg:w-[120px] bg-gray-700 animate-pulse"
                />
              ))
            : popularTags.map((tag) => {
                const isActive = activeTag === tag.slug;
                return (
                  <button
                    key={tag.slug}
                    onClick={() => onTagClick?.(tag.slug)}
                    className={`text-xs xl:text-[16px] leading-[25px] font-Poppins font-normal bg-transparent text-primaryWhite border-[1px] border-primaryWhite/80 transition-all duration-200 whitespace-nowrap px-4 lg:px-[19.3px] ${
                      isActive ? "!bg-white !text-black" : ""
                    }`}
                  >
                    {tag.name}
                  </button>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default BlogSearchBar;
