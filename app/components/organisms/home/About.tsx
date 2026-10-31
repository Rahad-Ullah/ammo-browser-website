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
    <div className="xl:py-32 lg:py-20 pb-10 pt-48 relative">
      <img
        src={elips}
        alt="elips"
        className="absolute right-0 top-0 hidden md:block"
      />
      {/* overlay */}
      <img
        src={overlay}
        alt="overlay"
        className="absolute top-0 w-64 md:w-auto md:top-12 left-0 -z-10"
      />
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between gap-10 lg:gap-6 xl:gap-16">
          {/* left */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.2,
            }}
            className="w-full xl:w-auto"
          >
            {/* search */}
            <Link
              to={"/ammo"}
              className="w-ful block mb-4 xl:mb-8 relative cursor-pointer"
            >
              <input
                readOnly
                type="text"
                placeholder="Search Ammunition"
                className="w-full bg-footerBG cursor-pointer hover:bg-[#333333] transition border-transparent text-primaryWhite py-3 xl:py-5 pl-4 xl:pl-7 pr-[80px] font-Poppins placeholder:font-Poppins placeholder:text-sm placeholder:xl:text-lg placeholder:font-light"
              />
              <div className="text-primaryWhite absolute top-[50%] text-xl xl:text-3xl -translate-y-[50%] right-7">
                <IoSearchOutline />
              </div>
            </Link>
            <div className="xl:w-[986px] md:h-[263px] lg:h-[400px] relative w-full h-[222px] sm:h-[186px] xl:h-[680px] overflow-hidden">
              <img
                src={aboutImg}
                alt="aboutImg"
                className="w-full h-full object-cover"
              />
              {/* overlay fade */}
              <img
                src={overlayFade}
                alt="overlayFade"
                className="bottom-0 left-0 absolute"
              />
            </div>
          </motion.div>
          {/* right */}
          <motion.div
            className="inline-flex flex-col"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h4
              className="text-3xl lg:text-5xl xl:text-7xl heading-gradient"
              variants={fadeInUpVariant}
            >
              About Us
            </motion.h4>

            <motion.p
              className="font-light text-sm lg:text-base xl:text-xl text-secondaryColor pt-2 xl:pt-5 pb-5 xl:pb-7 max-w-[600px]"
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
              <Link to="/contact">
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
