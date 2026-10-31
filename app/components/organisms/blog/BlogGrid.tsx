import BlogCard from "~/components/molecules/BlogCard";
import CardLoader from "~/components/molecules/CardLoader";
import type { BlogCardProps } from "~/types";

interface BlogGridProps {
  blogs: BlogCardProps[];
  isLoading?: boolean;
}

const BlogGrid = ({ blogs, isLoading = false }: BlogGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 xl:gap-10">
        {Array.from({ length: 8 }).map((_, index) => (
          <CardLoader key={index} />
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 lg:py-24">
        <p className="text-thirdColor text-lg lg:text-xl font-Poppins font-normal text-center">
          No blog posts found
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-8 xl:gap-[20px]">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} {...blog} />
      ))}
    </div>
  );
};

export default BlogGrid;
