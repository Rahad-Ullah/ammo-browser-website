interface ProductCardLoaderProps {
  className?: string;
}

const ProductCardLoader = ({ className }: ProductCardLoaderProps) => {
  return (
    <div
      className={`w-full h-full p-3.5 sm:p-4 xl:p-5 bg-mainBG relative overflow-hidden animate-pulse flex flex-col justify-between ${className}`}
    >
      {/* Caliber + Star rating row */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="h-4 xl:h-5 w-[130px] bg-gray-700 rounded-sm" />
          <div className="h-4 xl:h-5 w-[45px] bg-gray-700 rounded-sm shrink-0" />
        </div>

        {/* Retailer label */}
        <div className="h-3 xl:h-3.5 w-[50px] bg-gray-800 rounded-sm mt-3 xl:mt-5 mb-1" />

        {/* Retailer name */}
        <div className="h-5 xl:h-6 w-[140px] bg-gray-700 rounded-sm" />
      </div>

      {/* Content area: stats left + image right */}
      <div className="pt-2 sm:pt-3 flex items-center justify-between gap-2 my-auto">
        {/* Left - Stats */}
        <div className="min-w-0 flex-1 space-y-1.5 xl:space-y-2">
          <div className="space-y-1">
            <div className="h-[9px] xl:h-2.5 w-[75px] bg-gray-800 rounded-sm" />
            <div className="h-4 xl:h-5 w-[55px] bg-gray-700 rounded-sm" />
          </div>

          <div className="space-y-1">
            <div className="h-[9px] xl:h-2.5 w-[90px] bg-gray-800 rounded-sm" />
            <div className="h-4 xl:h-5 w-[45px] bg-gray-700 rounded-sm" />
          </div>

          <div className="space-y-1">
            <div className="h-[9px] xl:h-2.5 w-[60px] bg-gray-800 rounded-sm" />
            <div className="h-3.5 xl:h-4 w-[65px] bg-gray-700 rounded-sm" />
          </div>
        </div>

        {/* Right - Product image placeholder */}
        <div className="w-[100px] sm:w-[115px] xl:w-[135px] h-[95px] sm:h-[105px] xl:h-[115px] shrink-0 bg-gray-700/60 rounded" />
      </div>

      {/* Buttons row */}
      <div className="pt-3 xl:pt-4 mt-auto w-full grid grid-cols-2 gap-2 sm:gap-2.5 xl:gap-3.5">
        <div className="h-[32px] sm:h-[34px] xl:h-[38px] bg-gray-700 rounded-none" />
        <div className="h-[32px] sm:h-[34px] xl:h-[38px] bg-gray-800 rounded-none border-[1px] border-gray-700" />
      </div>
    </div>
  );
};

export default ProductCardLoader;
