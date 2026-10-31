interface CardLoaderProps {
  className?: string;
}

const CardLoader = ({ className }: CardLoaderProps) => {
  return (
    <div
      className={`w-full bg-cynicalBlack rounded-sm overflow-hidden animate-pulse ${className}`}
    >
      {/* Image placeholder */}
      <div className="w-full h-[200px] sm:h-[240px] lg:h-[294px] bg-gray-700" />

      <div className="p-4 lg:p-5 xl:p-6">
        {/* Category badge + tags row */}
        <div className="flex items-center gap-2 lg:gap-[18px] mb-3 lg:mb-[11px]">
          <div className="h-[16px] lg:h-[18px] w-[80px] bg-gray-700 rounded-sm" />
          <div className="h-[16px] lg:h-[18px] w-[100px] bg-gray-800 rounded-sm" />
        </div>

        {/* Title (2 lines) */}
        <div className="h-5 sm:h-6 lg:h-7 w-full bg-gray-700 rounded-sm mb-2" />
        <div className="h-5 sm:h-6 lg:h-7 w-3/4 bg-gray-700 rounded-sm mb-2 lg:mb-[20px]" />

        {/* Description (3 lines) */}
        <div className="h-3 lg:h-[18px] w-full bg-gray-800 rounded-sm mb-1.5" />
        <div className="h-3 lg:h-[18px] w-full bg-gray-800 rounded-sm mb-1.5" />
        <div className="h-3 lg:h-[18px] w-2/3 bg-gray-800 rounded-sm" />

        {/* Author avatar + name/date */}
        <div className="flex items-center gap-2 lg:gap-3 mt-4 lg:mt-[18px]">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-700 shrink-0" />
          <div className="flex-1">
            <div className="h-3 lg:h-[14px] w-[150px] bg-gray-700 rounded-sm mb-1.5" />
            <div className="h-3 lg:h-[14px] w-[50px] bg-gray-700 rounded-sm" />
          </div>
        </div>

        {/* Read article button */}
        <div className="mt-5 lg:mt-[36px]">
          <div className="h-[36px] lg:h-[48px] w-[160px] lg:w-[208px] bg-gray-700 rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export default CardLoader;
