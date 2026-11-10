import { useState } from "react";
import { motion } from "motion/react";
import AccordionComponent from "~/components/molecules/AccordionComponent";
import { faqData } from "~/utils/data/faqData";
import faqImg from "~/assets/faq.png";
import overlay from "~/assets/overlay2.png";

const HomeFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <div className="xl:pb-28 pb-20 pt-4 lg:pt-8">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
          {/* left: Image */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.2,
            }}
            className="w-full lg:col-span-5"
          >
            <div className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] lg:h-[540px] xl:h-[600px] 2xl:h-[640px] overflow-hidden rounded-sm">
              <img
                src={faqImg}
                alt="Frequently Asked Questions"
                className="w-full h-full object-cover object-center"
              />
              {/* overlay fade */}
              <img
                src={overlay}
                alt="overlay"
                className="absolute bottom-0 left-0 w-full h-[100px] sm:h-[130px] lg:h-[160px] pointer-events-none object-cover"
              />
            </div>
          </motion.div>
          {/* right: FAQ Accordion */}
          <div className="w-full lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="heading-gradient text-3xl lg:text-4xl xl:text-5xl font-bold"
            >
              Frequently Asked Questions
            </motion.div>
            <div className="pt-6 sm:pt-8 xl:pt-10 flex flex-col gap-3 xl:gap-4">
              {faqData?.slice(0, 5).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                    delay: index * 0.1,
                  }}
                >
                  <AccordionComponent
                    key={index}
                    item={item}
                    index={index}
                    openIndex={openIndex}
                    setOpenIndex={setOpenIndex}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFaq;
