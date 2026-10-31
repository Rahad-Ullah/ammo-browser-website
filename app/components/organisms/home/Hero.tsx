import { Link } from "react-router";
import { motion } from "motion/react";
import Button from "~/components/atoms/Button";
import overlay from "~/assets/overlay.svg";
import elips from "~/assets/Ellipse 11.svg";

const Hero = () => {
  const heading = "Compare. Save. Shoot";
  const description =
    "One search, multiple retailers, the best ammo prices at your fingertips";
  const words = heading.split(" ");
  const paragraph = description.split(" ");

  return (
    <div
      id="hero-section"
      className="xl:h-[850px] h-[500px] md:h-[485px] sm:h-[395px] bg-center mt-10 md:mt-0 bg-cover md:bg-contain bg-no-repeat relative"
    >
      <img
        src={elips}
        alt=""
        className="absolute top-0 right-0 hidden md:block"
      />
      <div className="container">
        <div className="pt-[352px] sm:pt-[110px] md:pt-[175px] lg:pt-[205px] xl:pt-[280px] flex sm:items-end items-center text-center sm:text-start gap-10 sm:gap-0 flex-col sm:flex-row justify-center sm:justify-between">
          <div className="inline-flex flex-col">
            <div className="flex w-full max-w-[566px] gap-x-2 lg:gap-x-4 flex-wrap items-center justify-center sm:justify-start">
              {words?.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: index * 0.2,
                  }}
                  className="xl:text-8xl text-5xl lg:text-6xl capitalize heading-gradient"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            {/* paragraph */}
            <div className="max-w-[558px] sm:max-w-[400px] md:max-w-[650px] gap-y-2 gap-1 flex-wrap items-center justify-center md:justify-start flex pt-3 xl:pt-5">
              {paragraph.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
                  animate={{
                    opacity: 1,
                    filter: "blur(0px)",
                    y: 0,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: index * 0.1,
                  }}
                  className="font-Poppins font-light leading-snug text-lg xl:text-2xl text-secondaryColor"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
              delay: 0.2,
            }}
            className="hidden sm:block"
          >
            <Link to={"/ammo"}>
              <div className="xl:size-[150px] size-[90px] rounded-full transition text-primaryWhite hover:text-primaryWhite sm:hover:text-orange border-2 border-transparent flex items-center justify-center font-Poppins font-semibold text-sm xl:text-xl cursor-pointer relative after:absolute after:w-full after:h-full after:bg-orange overflow-hidden after:-z-10 z-10 after:scale-100 after:origin-center after:transition after:duration-300 hover:after:scale-0 hover:bg-[#f44a015d] after:rounded-full">
                View All
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
              delay: 0.2,
            }}
            className="sm:hidden relative z-50"
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
