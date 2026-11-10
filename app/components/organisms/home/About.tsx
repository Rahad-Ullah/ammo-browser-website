import { Link } from "react-router";
import { motion } from "motion/react";
import { IoSearchOutline } from "react-icons/io5";
import Button from "~/components/atoms/Button";
import aboutImg from "~/assets/about.png";
import elips from "~/assets/Ellipse 10.svg";
import overlayFade from "~/assets/overlay.svg";
import overlay from "~/assets/Ellipse 9.svg";

const About = () => {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16 pb-12 sm:pb-16 lg:pb-20 xl:pb-24 relative">
      <img
        src={elips}
        alt="elips"
        className="absolute right-0 top-0 hidden md:block pointer-events-none"
      />
      {/* overlay */}
      <img
        src={overlay}
        alt="overlay"
        className="absolute top-0 w-64 md:w-auto left-0 -z-10 pointer-events-none"
      />
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          {/* left */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.2,
            }}
            className="w-full lg:col-span-7"
          >
            {/* search */}
            <Link
              to={"/ammo"}
              className="w-full block mb-4 xl:mb-6 relative cursor-pointer"
            >
              <input
                readOnly
                type="text"
                placeholder="Search Ammunition"
                className="w-full bg-footerBG cursor-pointer hover:bg-[#333333] transition border-transparent text-primaryWhite py-3 xl:py-4 pl-4 xl:pl-6 pr-[60px] xl:pr-[70px] font-Poppins placeholder:font-Poppins placeholder:text-sm lg:placeholder:text-base placeholder:font-light rounded-sm"
              />
              <div className="text-primaryWhite absolute top-[50%] text-xl xl:text-2xl -translate-y-[50%] right-5 xl:right-6 pointer-events-none">
                <IoSearchOutline />
              </div>
            </Link>
            <div className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[460px] 2xl:h-[500px] overflow-hidden rounded-sm">
              <img
                src={aboutImg}
                alt="About AmmoBrowser"
                className="w-full h-full object-cover object-center"
              />
              {/* overlay fade */}
              <img
                src={overlayFade}
                alt="overlayFade"
                className="bottom-0 left-0 absolute w-full pointer-events-none"
              />
            </div>
          </motion.div>
          {/* right */}
          <motion.div
            className="flex flex-col justify-center w-full lg:col-span-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h4
              className="text-3xl lg:text-5xl xl:text-6xl heading-gradient font-bold"
              variants={fadeInUpVariant}
            >
              About Us
            </motion.h4>

            <motion.p
              className="font-light text-sm sm:text-base xl:text-lg text-secondaryColor pt-3 xl:pt-5 pb-5 xl:pb-6 leading-relaxed"
              variants={fadeInUpVariant}
            >
              Our mission is simple: to connect shooters, hunters, and firearm
              enthusiasts with the best retailers offering in-stock ammunition
              at competitive prices. We're here to help customers make informed
              decisions on where to purchase ammunition by providing a clear and
              comprehensive directory of available options from trusted
              retailers. Instead of visiting multiple websites to track down
              what you need, AmmoBrowser.com brings the options to you in one
              convenient place. <br /> <br /> We list a wide range of retailers,
              making it easy to compare availability and prices in real time.
              Whether you're looking for bulk deals, specialty calibers, or
              everyday range ammo, AmmoBrowser.com helps you save time and shop
              smarter. <br /> <br /> Stay informed, shop efficiently, and let us
              do the searching for you. AmmoBrowser.com — your shortcut to
              finding ammo online. <br /> <br /> We don't sell, ship, or process
              ammunition, we simply help you find it.
            </motion.p>

            <motion.div variants={fadeInUpVariant}>
              <Link to="/contact" className="inline-block">
                <Button btnTitle="Contact" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
