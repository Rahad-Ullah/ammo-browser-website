import { Link } from "react-router";
import { motion } from "motion/react";
import Button from "~/components/atoms/Button";
import overlay from "~/assets/overlay.svg";
import elips from "~/assets/Ellipse 11.svg";

const Hero = () => {
  return (
    <div
      id="hero-section"
      className="xl:h-[850px] lg:h-[680px] md:h-[540px] sm:h-[430px] sm:min-h-0 h-auto min-h-[520px] bg-center mt-10 md:mt-0 bg-cover md:bg-contain bg-no-repeat relative flex flex-col justify-center"
    >
      <img
        src={elips}
        alt=""
        className="absolute top-0 right-0 hidden md:block pointer-events-none"
      />
      <div className="container sm:h-full flex flex-col justify-center pt-14 sm:pt-20 md:pt-24">
        <div className="pt-[310px] sm:pt-0 flex items-center text-center sm:text-start gap-8 sm:gap-0 flex-col sm:flex-row justify-center sm:justify-between w-full my-auto">
          {/* Left Text Block */}
          <div className="flex flex-col z-20 max-w-full my-auto sm:-translate-y-10 md:sm:-translate-y-14 lg:sm:-translate-y-20 xl:sm:-translate-y-24">
            <h1 className="flex flex-col items-center sm:items-start tracking-tight leading-[1.04] select-none">
              <motion.span
                initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="xl:text-8xl text-5xl lg:text-6xl capitalize heading-gradient block"
              >
                Compare.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="xl:text-8xl text-5xl lg:text-6xl capitalize heading-gradient block whitespace-nowrap"
              >
                Save. Shoot
              </motion.span>
            </h1>

            {/* Description Subtitle */}
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="font-Poppins font-light leading-snug text-lg xl:text-2xl text-secondaryColor pt-3 xl:pt-5 w-full max-w-[420px] md:max-w-[400px] lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[620px]"
            >
              One search, multiple retailers, the best ammo prices at{" "}
              <span className="inline-block">your fingertips</span>
            </motion.p>
          </div>

          {/* Desktop "View All" circular button positioned in bottom right */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
              delay: 0.2,
            }}
            className="hidden sm:block sm:self-end sm:mb-8 md:sm:mb-12 lg:sm:mb-16 xl:sm:mb-24 z-20"
          >
            <Link to={"/ammo"}>
              <div className="xl:size-[150px] size-[90px] rounded-full transition text-primaryWhite hover:text-primaryWhite sm:hover:text-orange border-2 border-transparent flex items-center justify-center font-Poppins font-semibold text-sm xl:text-xl cursor-pointer relative after:absolute after:w-full after:h-full after:bg-orange overflow-hidden after:-z-10 z-10 after:scale-100 after:origin-center after:transition after:duration-300 hover:after:scale-0 hover:bg-[#f44a015d] after:rounded-full">
                View All
              </div>
            </Link>
          </motion.div>

          {/* Mobile "View All" Button */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
              delay: 0.2,
            }}
            className="sm:hidden relative z-50 mb-6"
          >
            <Link to={"/ammo"}>
              <Button btnTitle={"View All"} />
            </Link>
          </motion.div>
        </div>
      </div>
      {/* overlay */}
      <div>
        <img
          src={overlay}
          alt="overlay"
          className="absolute bottom-0 left-0 hidden sm:block w-full"
        />
      </div>
    </div>
  );
};

export default Hero;
