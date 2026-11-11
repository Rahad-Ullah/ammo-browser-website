import { Link } from "react-router";
import type { ApiBlogDetail } from "~/types";
import LatestBlogSlider from "./LatestBlogSlider";
import { formatBlogImageUrl, blogHero, cleanBlogHtml } from "~/utils";

interface BlogDetailsContentProps {
  blog: ApiBlogDetail | null;
  isLoading?: boolean;
}

function formatBlogDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const BlogDetailsSkeleton = () => (
  <div className="bg-[#0C0B0B] min-h-screen animate-pulse">
    <div className="container">
      <div className="max-w-5xl mx-auto">
        {/* Back to Blog */}
        <div className="pt-[120px] sm:pt-[140px] md:pt-[160px] lg:pt-[180px] xl:pt-[210px]">
          <div className="h-6 md:h-8 xl:h-[36px] w-[150px] md:w-[180px] bg-gray-700 rounded-sm" />
        </div>

        {/* Tags */}
        <div className="mt-6 lg:mt-8 flex items-center gap-3">
          <div className="h-7 w-[80px] bg-gray-700 rounded-full" />
          <div className="h-7 w-[100px] bg-gray-800 rounded-full" />
          <div className="h-7 w-[90px] bg-gray-800 rounded-full" />
        </div>

        {/* Title */}
        <div className="mt-4 md:mt-5">
          <div className="h-8 sm:h-10 md:h-[34px] lg:h-10 xl:h-[48px] w-full bg-gray-700 rounded-sm mb-3" />
          <div className="h-8 sm:h-10 md:h-[34px] lg:h-10 xl:h-[48px] w-3/4 bg-gray-700 rounded-sm" />
        </div>

        {/* Author / Date / Read Time */}
        <div className="flex items-center gap-4 mt-4">
          <div className="h-5 w-[120px] bg-gray-700 rounded-sm" />
          <div className="h-5 w-[100px] bg-gray-700 rounded-sm" />
          <div className="h-5 w-[60px] bg-gray-700 rounded-sm" />
        </div>

        {/* Hero Image */}
        <div className="mt-8">
          <div className="w-full h-[250px] sm:h-[350px] md:h-[420px] lg:h-[480px] xl:h-[520px] bg-gray-700 rounded-xl md:rounded-2xl" />
        </div>

        {/* Content paragraphs */}
        <div className="mt-8 space-y-4">
          <div className="h-4 w-full bg-gray-800 rounded-sm" />
          <div className="h-4 w-full bg-gray-800 rounded-sm" />
          <div className="h-4 w-5/6 bg-gray-800 rounded-sm" />
          <div className="h-4 w-full bg-gray-800 rounded-sm" />
          <div className="h-4 w-4/5 bg-gray-800 rounded-sm" />
          <div className="h-7 w-2/3 bg-gray-700 rounded-sm mt-6" />
          <div className="h-4 w-full bg-gray-800 rounded-sm" />
          <div className="h-4 w-full bg-gray-800 rounded-sm" />
          <div className="h-4 w-3/4 bg-gray-800 rounded-sm" />
        </div>
      </div>
    </div>
  </div>
);

const BlogDetailsContent = ({ blog, isLoading }: BlogDetailsContentProps) => {
  if (isLoading) {
    return <BlogDetailsSkeleton />;
  }

  if (!blog) {
    return (
      <div className="bg-[#0C0B0B] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-primaryWhite text-2xl lg:text-3xl xl:text-4xl font-Poppins font-bold">
            Blog Post Not Found
          </h2>
          <Link
            to="/blog"
            className="text-orange mt-4 inline-block font-Poppins text-base hover:opacity-80 transition-opacity"
          >
            &larr; Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0C0B0B] min-h-screen">
      <div className="container">
        {/* Unified article reading container */}
        <div className="max-w-5xl mx-auto">
          {/* Back to Blog Link */}
          <div className="pt-[120px] sm:pt-[140px] md:pt-[160px] lg:pt-[180px] xl:pt-[210px]">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 md:gap-2 text-[#99A1AF] font-Poppins font-normal text-sm md:text-base lg:text-lg hover:text-primaryWhite transition-colors duration-200"
            >
              <svg width="24" height="24" viewBox="0 0 33 33" fill="none" className="w-4 h-4 md:w-5 md:h-5">
                <path d="M16.1322 25.5454L6.7207 16.134L16.1322 6.72253" stroke="currentColor" strokeWidth="2.68899" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M25.5436 16.134H6.7207" stroke="currentColor" strokeWidth="2.68899" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Blog
            </Link>
          </div>

          {/* Tags */}
          <div className="mt-5 lg:mt-7 flex items-center gap-2 md:gap-3 flex-wrap">
            {blog.tags &&
              blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-3.5 lg:px-4 py-1 text-xs sm:text-sm font-Poppins font-normal rounded-full text-orange border-[1px] ${
                    index === 0
                      ? "bg-[#FF572233] border-[#FF57224D]"
                      : "bg-[#1E2939] border-transparent !text-[#D1D5DC]"
                  }`}
                >
                  {tag}
                </span>
              ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[48px] font-bold font-Poppins text-white mt-4 md:mt-5 leading-snug md:leading-tight">
            {blog.title}
          </h1>

          {/* Author / Date / Read Time */}
          <div className="flex items-center gap-4 lg:gap-6 mt-4 flex-wrap text-[#99A1AF] font-Poppins font-normal text-xs sm:text-sm md:text-base">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5">
                <path d="M25.5436 28.2343V25.5453C25.5436 24.119 24.977 22.7511 23.9684 21.7425C22.9599 20.734 21.592 20.1674 20.1656 20.1674H12.0987C10.6724 20.1674 9.30444 20.734 8.29588 21.7425C7.28731 22.7511 6.7207 24.119 6.7207 25.5453V28.2343" stroke="#99A1AF" strokeWidth="2.68899" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.1358 14.7895C19.106 14.7895 21.5138 12.3817 21.5138 9.41149C21.5138 6.44131 19.106 4.03351 16.1358 4.03351C13.1656 4.03351 10.7578 6.44131 10.7578 9.41149C10.7578 12.3817 13.1656 14.7895 16.1358 14.7895Z" stroke="#99A1AF" strokeWidth="2.68899" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5">
                <path d="M10.7559 2.68909V8.06706" stroke="#99A1AF" strokeWidth="2.68899" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.5098 2.68909V8.06706" stroke="#99A1AF" strokeWidth="2.68899" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M25.5471 5.37796H6.72414C5.23906 5.37796 4.03516 6.58186 4.03516 8.06695V26.8899C4.03516 28.375 5.23906 29.5789 6.72414 29.5789H25.5471C27.0321 29.5789 28.236 28.375 28.236 26.8899V8.06695C28.236 6.58186 27.0321 5.37796 25.5471 5.37796Z" stroke="#99A1AF" strokeWidth="2.68899" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.03516 13.445H28.236" stroke="#99A1AF" strokeWidth="2.68899" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{formatBlogDate(blog.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5">
                <path d="M16.1348 8.06696V16.1339L21.5127 18.8229" stroke="#99A1AF" strokeWidth="2.68899" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.1363 29.579C23.5618 29.579 29.5813 23.5595 29.5813 16.134C29.5813 8.70859 23.5618 2.68909 16.1363 2.68909C8.71091 2.68909 2.69141 8.70859 2.69141 16.134C2.69141 23.5595 8.71091 29.579 16.1363 29.579Z" stroke="#99A1AF" strokeWidth="2.68899" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{blog.reading_time}</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-6 md:mt-8 bg-[#161616] rounded-xl md:rounded-2xl overflow-hidden border border-[#232323]">
            <img
              src={formatBlogImageUrl(blog.image)}
              alt={blog.title}
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
              className="w-full max-h-[520px] object-cover rounded-xl md:rounded-2xl"
            />
          </div>

          {/* Article Content (HTML from API) */}
          <article
            className="mt-8 md:mt-10 blog-content w-full"
            dangerouslySetInnerHTML={{ __html: cleanBlogHtml(blog.content) }}
          />
        </div>

        {/* Latest Blogs Slider */}
        <LatestBlogSlider currentBlogSlug={blog.slug} />
      </div>
    </div>
  );
};

export default BlogDetailsContent;
