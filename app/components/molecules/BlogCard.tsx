import { Link } from "react-router";
import ReadArticleSvg from "~/components/svg/ReadArticleSvg";
import { formatBlogImageUrl, blogHero } from "~/utils";
import type { BlogCardProps } from "~/types";

const BlogCard = ({
  id,
  slug,
  title,
  description,
  category,
  tags,
  image,
  author,
  date,
  readTime,
  link,
}: BlogCardProps) => {
  const blogLink = link || `/blog/${slug || id}`;

  return (
    <div className="bg-cynicalBlack hover:scale-[1.02] transition-transform duration-300 rounded-sm overflow-hidden">
      <Link to={blogLink}>
        <div className="relative overflow-hidden group bg-[#161616]">
          <img
            src={formatBlogImageUrl(image)}
            alt={title}
            onError={(e) => {
              const img = e.currentTarget;
              if (img.src.includes("test.ammobrowser.com/uploads/blogs/")) {
                img.src = img.src.replace(
                  "test.ammobrowser.com/uploads/blogs/",
                  "admin.ammobrowser.com/uploads/blogs/"
                );
                return;
              }
              img.onerror = null;
              img.src = blogHero;
            }}
            className="w-full h-[200px] sm:h-[240px] lg:h-[294px] object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      <div className="p-4 lg:p-5 xl:p-6">
        <div className="flex items-center gap-2 lg:gap-[18px] mb-3 lg:mb-[11px] flex-wrap">
          <span className="border border-primaryWhite text-primaryWhite px-2 lg:px-[9px] leading-[16px] lg:leading-[18px] text-[10px] lg:text-[11.75px] font-Poppins font-normal">
            {category}
          </span>
          {tags && tags.length > 0 && (
            <span className="text-primaryWhite text-[10px] lg:text-[11.75px] font-Poppins font-normal leading-none">
              {tags.join("   ")}
            </span>
          )}
        </div>

        <Link to={blogLink}>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-[24px] sm:leading-[28px] lg:leading-[36px] tracking-normal text-primaryWhite line-clamp-2 font-Poppins">
            {title}
          </h3>
        </Link>

        <p className="text-primaryWhite text-[10px] lg:text-[11.75px] font-normal font-Poppins leading-[14px] lg:leading-[18px] mt-2 lg:mt-[20px] line-clamp-3">
          {description}
        </p>

        <div className="flex items-center gap-2 lg:gap-3 mt-4 lg:mt-[18px]">
          {author.avatar && (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <p className="text-primaryWhite text-[12px] lg:text-[14px] font-normal font-Poppins leading-[16px] lg:leading-[21px]">
              {author.name} • {date}
            </p>
            <p className="text-primaryWhite text-[12px] lg:text-[14px] font-normal font-Poppins leading-[16px] lg:leading-[21px]">
              {readTime}
            </p>
          </div>
        </div>

        <div className="max-w-[208px] mt-5 lg:mt-[36px]">
          <Link
            to={blogLink}
            className="flex items-center justify-center gap-[10px] w-full py-2 lg:py-3 px-4 lg:px-6 bg-orange text-primaryWhite text-[14px] lg:text-[16px] font-normal font-Poppins leading-[20px] lg:leading-[24px] hover:opacity-90 transition-opacity duration-200"
          >
            Read article <ReadArticleSvg />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
