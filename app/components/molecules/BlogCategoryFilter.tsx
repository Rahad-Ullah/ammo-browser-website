interface CategoryItem {
  name: string;
  slug: string;
}

interface BlogCategoryFilterProps {
  categories: CategoryItem[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  isLoading?: boolean;
}

const BlogCategoryFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
  isLoading,
}: BlogCategoryFilterProps) => {
  return (
    <div className="w-full overflow-x-auto bottom-scroll">
      <div className="flex items-center gap-2 lg:gap-[10px] min-w-max">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-[25px] w-[80px] lg:w-[100px] bg-gray-700 animate-pulse"
              />
            ))
          : categories.map((category) => {
              const isActive = activeCategory === category.slug;
              return (
                <button
                  key={category.slug}
                  onClick={() => onCategoryChange(category.slug)}
                  className={`
                    text-[12px] xl:text-[16px] leading-[25px] font-Poppins font-normal bg-transparent text-primaryWhite border-[1px] border-primaryWhite/80 transition-all duration-200 whitespace-nowrap !px-4 lg:!px-[12px]
                    ${
                      isActive
                        && "!bg-white !text-black"
                    }
                  `}
                  type="button"
                >
                  {category.name}
                </button>
              );
            })}
      </div>
    </div>
  );
};

export default BlogCategoryFilter;
