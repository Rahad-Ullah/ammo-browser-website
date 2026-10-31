import { GrFormNext, GrFormPrevious } from "react-icons/gr";

interface BlogPaginationProps {
  lastPage: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const BlogPagination = ({
  lastPage,
  currentPage,
  handlePageChange,
}: BlogPaginationProps) => {
  const totalPages = lastPage || 1;

  return (
    <div className="flex items-center gap-3 lg:gap-[17px]">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        type="button"
        className="cursor-pointer lg:py-2 py-1 px-3 lg:px-5  border-[1.5px] border-orange text-orange text-lg lg:text-2xl hover:bg-orange transition hover:text-primaryWhite"
      >
        <GrFormPrevious />
      </button>

      <span className="text-orange text-lg lg:text-[22px] leading-[24px] font-normal font-Poppins whitespace-nowrap">
        Page {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        type="button"
        className="cursor-pointer lg:py-2 py-1 px-3 lg:px-5  border-[1.5px] border-orange text-orange text-lg lg:text-2xl hover:bg-orange transition hover:text-primaryWhite"
      >
        <GrFormNext />
      </button>
    </div>
  );
};

export default BlogPagination;
