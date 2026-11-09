import { useState, useMemo } from "react";
import {
  IoSearchOutline,
  IoCloseOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
} from "react-icons/io5";
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
  popularTags: TagItem[];
  onTagClick?: (tag: string) => void;
  activeTag?: string;
  isTagsLoading?: boolean;
  categories?: CategoryItem[];
  activeCategory?: string;
  handleCategoryChange?: (slug: string) => void;
  isCategoriesLoading?: boolean;
}

const BlogSearchBar = ({
  searchValue,
  onSearchChange,
  popularTags,
  onTagClick,
  activeTag,
  isTagsLoading,
}: BlogSearchBarProps) => {
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  const [tagSearchQuery, setTagSearchQuery] = useState("");

  const activeTagItem = useMemo(() => {
    if (!activeTag) return null;
    return popularTags.find((t) => t.slug === activeTag);
  }, [activeTag, popularTags]);

  const filteredTags = useMemo(() => {
    if (!isTagsExpanded || !tagSearchQuery.trim()) {
      return popularTags;
    }
    const query = tagSearchQuery.toLowerCase();
    return popularTags.filter((tag) =>
      tag.name.toLowerCase().includes(query)
    );
  }, [popularTags, isTagsExpanded, tagSearchQuery]);

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-5">
      {/* Search Input Bar (Full Width) */}
      <div className="relative bg-[#2F1F18]">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search articles, tags, topics..."
          className="w-full h-12 md:h-[72px] xl:h-[80px] pl-3 pr-20 md:pl-6 md:pr-24 bg-black/40 text-primaryWhite search-input-border placeholder:font-light placeholder:font-Poppins placeholder:text-base placeholder:md:text-[24px] xl:placeholder:text-[28px] placeholder:text-primaryWhite placeholder:leading-[48px] placeholder:md:leading-[64px] font-Poppins font-light text-base md:text-[24px] xl:text-[28px] leading-[48px] md:leading-[64px] outline-none"
        />
        <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {searchValue && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="text-primaryWhite/60 hover:text-primaryWhite transition-colors p-1"
              title="Clear search"
            >
              <IoCloseOutline className="w-5 h-5 md:w-[24px] md:h-[24px]" />
            </button>
          )}
          <IoSearchOutline className="text-primaryWhite w-5 h-5 md:w-[28px] md:h-[28px]" />
        </div>
      </div>

      {/* Popular Tags (Compact Horizontal Row / Expandable Grid) */}
      <div className="bg-[#5654534D] pt-3 pb-3 px-4 lg:pt-[14px] lg:pb-[16px] lg:px-[20px] transition-all duration-300">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-primaryWhite text-sm md:text-base lg:text-lg font-medium font-Poppins">
              Popular tags
            </span>
            {activeTag && activeTagItem && (
              <span className="inline-flex items-center gap-1.5 text-xs lg:text-sm font-Poppins px-2.5 py-0.5 bg-white text-black font-medium">
                <span>Tag: {activeTagItem.name}</span>
                <button
                  type="button"
                  onClick={() => onTagClick?.("")}
                  className="hover:opacity-70 transition-opacity"
                  title="Clear tag filter"
                >
                  <IoCloseOutline className="w-4 h-4" />
                </button>
              </span>
            )}
          </div>

          {popularTags.length > 6 && (
            <button
              type="button"
              onClick={() => {
                setIsTagsExpanded((prev) => !prev);
                if (isTagsExpanded) setTagSearchQuery("");
              }}
              className="inline-flex items-center gap-1.5 text-xs lg:text-sm font-Poppins text-primaryWhite hover:text-orange transition-colors shrink-0 font-normal cursor-pointer"
            >
              <span>
                {isTagsExpanded
                  ? "Show fewer tags"
                  : `All tags (${popularTags.length})`}
              </span>
              {isTagsExpanded ? (
                <IoChevronUpOutline className="w-4 h-4" />
              ) : (
                <IoChevronDownOutline className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Quick Tag Search in Expanded Mode */}
        {isTagsExpanded && popularTags.length > 15 && (
          <div className="mb-3 relative max-w-xs">
            <input
              type="text"
              value={tagSearchQuery}
              onChange={(e) => setTagSearchQuery(e.target.value)}
              placeholder="Filter tags..."
              className="w-full h-8 pl-8 pr-3 bg-black/60 text-primaryWhite text-xs font-Poppins border border-primaryWhite/20 focus:border-orange outline-none placeholder:text-secondaryColor/60"
            />
            <IoSearchOutline className="absolute left-2.5 top-1/2 -translate-y-1/2 text-secondaryColor w-3.5 h-3.5" />
            {tagSearchQuery && (
              <button
                type="button"
                onClick={() => setTagSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-secondaryColor hover:text-white"
              >
                <IoCloseOutline className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Tags Container: Horizontal scroll when collapsed, wrapped scrollable cloud when expanded */}
        <div
          className={
            isTagsExpanded
              ? "flex flex-wrap gap-2 lg:gap-[10px] max-h-[260px] overflow-y-auto bottom-scroll pr-1 pb-1"
              : "flex overflow-x-auto flex-nowrap gap-2 lg:gap-[10px] bottom-scroll pb-[5px] pt-[2px]"
          }
        >
          {isTagsLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[25px] w-[100px] lg:w-[120px] bg-gray-700 animate-pulse shrink-0"
                />
              ))
            : filteredTags.map((tag) => {
                const isActive = activeTag === tag.slug;
                return (
                  <button
                    key={tag.slug || "all-tag"}
                    onClick={() => onTagClick?.(tag.slug)}
                    className={`text-xs xl:text-[16px] leading-[25px] font-Poppins font-normal bg-transparent text-primaryWhite border-[1px] border-primaryWhite/80 hover:border-orange hover:text-orange transition-all duration-200 whitespace-nowrap px-4 lg:px-[19.3px] shrink-0 cursor-pointer ${
                      isActive ? "!bg-white !text-black !border-white font-medium" : ""
                    }`}
                  >
                    {tag.name}
                  </button>
                );
              })}
          {isTagsExpanded && filteredTags.length === 0 && (
            <span className="text-secondaryColor text-xs font-Poppins py-1">
              No matching tags found
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogSearchBar;
