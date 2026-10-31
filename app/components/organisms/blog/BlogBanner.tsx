import blogHero from "~/assets/blog-hero.png";

interface BlogBannerProps {
  title?: string;
  className?: string;
}

const BlogBanner = ({ title = "Blog", className = "" }: BlogBannerProps) => {
  return (
    <div className={`xl:pb-32 pb-24 relative lg:min-h-[560px] xl:min-h-[760px] z-10 ${className}`}>
      <img
        src={blogHero}
        alt="blog-banner"
        className="w-full h-full xl:h-[760px] object-cover object-center absolute top-0 left-0 -z-10"
      />
      <div className="container">
        <div className="flex flex-col items-start justify-center pt-[122px] sm:pt-[150px] md:pt-[200px] xl:pt-[252px]">
          <h4 className="text-3xl sm:text-[40px] md:text-[52px] xl:text-[64px] heading-gradient !text-left heading-white !text-[#FFFFFF] !leading-[38px] sm:!leading-[50px] md:!leading-[65px] xl:!leading-[77px]">
            {title}
          </h4>
          <p className="font-Poppins font-normal text-[14px] sm:text-[18px] md:text-[24px] xl:text-[28px] leading-[22px] sm:leading-[32px] md:leading-[40px] xl:leading-[48px] tracking-normal text-white max-w-[993px] mt-[16px] sm:mt-[20px] md:mt-[26px] xl:mt-[31px]">
            Smart guides on choosing the right rounds, finding the best deals, and shooting with confidence. Trusted info straight from the AmmoBrowser team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogBanner;
