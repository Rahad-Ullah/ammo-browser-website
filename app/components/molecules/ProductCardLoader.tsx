interface ProductCardLoaderProps {
  className?: string;
}

const ProductCardLoader = ({ className }: ProductCardLoaderProps) => {
  return (
    <div
      className={`w-full p-3 xl:p-5 bg-mainBG relative overflow-hidden animate-pulse ${className}`}
    >
      {/* Caliber + Star rating row */}
      <div className="flex items-start justify-between">
        <div className="h-4 xl:h-5 w-[140px] bg-gray-700 rounded-sm" />
        <div className="h-4 xl:h-5 w-[50px] bg-gray-700 rounded-sm" />
      </div>

      {/* Retailer label */}
      <div className="h-3 xl:h-4 w-[60px] bg-gray-800 rounded-sm mt-4 xl:mt-7 mb-1" />

      {/* Retailer name */}
      <div className="h-5 xl:h-6 w-[150px] bg-gray-700 rounded-sm" />

      {/* Content area: stats left + image right */}
      <div className="pt-2 flex items-start gap-2 justify-between pb-[48px] sm:pb-[44px] lg:pb-[38px] 2xl:pb-[58px]">
        {/* Left - Stats */}
        <div>
          {/* Cost per round */}
          <div className="flex flex-col gap-y-1">
            <div className="h-[10px] xl:h-3 w-[80px] bg-gray-800 rounded-sm" />
            <div className="h-4 xl:h-5 w-[60px] bg-gray-700 rounded-sm" />
          </div>

          {/* Number of Rounds */}
          <div className="flex flex-col pt-2 gap-y-1">
            <div className="h-[10px] xl:h-3 w-[100px] bg-gray-800 rounded-sm" />
            <div className="h-4 xl:h-5 w-[50px] bg-gray-700 rounded-sm" />
          </div>

          {/* Condition */}
          <div className="flex flex-col pt-2 gap-y-1">
            <div className="h-[10px] xl:h-3 w-[65px] bg-gray-800 rounded-sm" />
            <div className="h-4 xl:h-5 w-[70px] bg-gray-700 rounded-sm" />
          </div>
        </div>

        {/* Right - Product image placeholder */}
        <div className="w-[110px] xl:w-[160px] h-[100px] xl:h-[150px] shrink-0 bg-gray-700 rounded-sm" />
      </div>

      {/* Buttons row */}
      <div className="absolute right-0 bottom-0 px-[12px] 2xl:px-[20px] pb-[20px] w-full grid grid-cols-2 gap-[14px] 2xl:gap-[22px]">
        <div className="h-[30px] xl:h-[34px] bg-gray-700 rounded-none" />
        <div className="h-[30px] xl:h-[34px] bg-gray-800 rounded-none border-[1px] border-gray-700" />
      </div>
    </div>
  );
};

export default ProductCardLoader;
