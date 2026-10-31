import { useState } from "react";
import { motion } from "motion/react";
import AccordionComponent from "~/components/molecules/AccordionComponent";
import { faqData } from "~/utils/data/faqData";
import faqImg from "~/assets/faq.png";
import overlay from "~/assets/overlay2.png";

const HomeFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <div className="xl:pb-28 pb-20">
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between gap-8 xl:gap-12">
          {/* left */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.2,
            }}
          >
            <div className="xl:w-[783px] w-full lg:w-[500px] h-[218px] lg:h-[650px] sm:h-[256px] md:h-[300px] xl:h-[800px] overflow-hidden relative">
              <img
                src={faqImg}
                alt="faqImg"
                className="w-full h-full object-cover"
              />
              {/* overlay */}
              <img
                src={overlay}
                alt="overlay"
                className="absolute bottom-0 sm:h-[108px] md:h-full left-0 w-full"
              />
            </div>
          </motion.div>
          {/* right */}
          <div>
            <motion.div
              initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="heading-gradient text-3xl lg:text-5xl xl:text-6xl"
            >
              Frequently Asked Questions
            </motion.div>
            <div className="xl:pt-12 pt-8 flex flex-col gap-2 xl:gap-5">
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
