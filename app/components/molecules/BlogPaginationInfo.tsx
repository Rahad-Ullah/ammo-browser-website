interface BlogPaginationInfoProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  currentPageItemCount: number;
}

const BlogPaginationInfo = ({
  currentPage,
  itemsPerPage,
  totalItems,
  currentPageItemCount,
}: BlogPaginationInfoProps) => {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = start + currentPageItemCount - 1;

  return (
    <p className="text-orange text-sm lg:text-lg xl:text-[24px] font-medium font-Poppins leading-none text-[]">
      Showing {start}–{end} of {totalItems}
    </p>
  );
};

export default BlogPaginationInfo;
