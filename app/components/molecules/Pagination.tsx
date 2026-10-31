import { GrFormNext, GrFormPrevious } from "react-icons/gr";

interface PaginationProps {
  lastPage: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const Pagination = ({ lastPage, currentPage, handlePageChange }: PaginationProps) => {
  const totalPages = lastPage || 1;
  const pageRange = 4;

  const getPageNumbers = () => {
    const startPage = Math.max(currentPage - Math.floor(pageRange / 2), 1);
    const endPage = Math.min(startPage + pageRange - 1, totalPages);
    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();
  const showPrevious = currentPage > 1;
  const showNext = currentPage < totalPages;

  return (
    <div className="mt-10 flex items-center flex-col sm:flex-row gap-2 lg:gap-4">
      {currentPage !== 1 && (
        <button
          onClick={() => handlePageChange(1)}
          className="lg:py-2 py-1 px-3 lg:px-5 border-[1.5px] hidden sm:block border-orange text-orange text-[10px] lg:text-xs hover:bg-orange transition hover:text-primaryWhite"
        >
          First page
        </button>
      )}
      <div className="flex items-center gap-2 lg:gap-4">
        {showPrevious && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="lg:py-2 py-1 px-3 lg:px-5  border-[1.5px] border-orange text-orange text-lg lg:text-2xl hover:bg-orange transition hover:text-primaryWhite"
          >
            <GrFormPrevious />
          </button>
        )}
        <div className="flex items-center gap-2 lg:gap-3">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`lg:py-2 py-1 px-2 lg:px-4 flex items-center justify-center ${
                page === currentPage
                  ? "bg-orange text-primaryWhite font-bold"
                  : "bg-cynicalBlack font-Poppins font-normal text-base lg:text-xl text-thirdColor hover:bg-orange hover:text-primaryWhite duration-150 active:scale-90"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        {showNext && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="lg:py-2 py-1 px-3 lg:px-5 border-[1.5px] border-orange text-orange text-lg lg:text-2xl hover:bg-orange transition hover:text-primaryWhite"
          >
            <GrFormNext />
          </button>
        )}
      </div>
      {currentPage !== totalPages && (
        <button
          onClick={() => handlePageChange(totalPages)}
          className="lg:py-2 py-1 px-3 lg:px-5 border-[1.5px] border-orange hidden sm:block text-orange text-[10px] lg:text-xs hover:bg-orange transition hover:text-primaryWhite"
        >
          Last page
        </button>
      )}
    </div>
  );
};

export default Pagination;
