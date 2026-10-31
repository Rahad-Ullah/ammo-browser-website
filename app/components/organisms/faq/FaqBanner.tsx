import { useState } from "react";
import AccordionComponent from "~/components/molecules/AccordionComponent";
import { faqData } from "~/utils/data/faqData";
import faqbanner from "~/assets/faq_banner.png";

const FaqBanner = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <div className="xl:pb-32 pb-24">
      <img
        src={faqbanner}
        alt="faqbanner"
        className="w-full h-[227px] sm:h-[300px] xl:h-[700px] md:h-[370px] object-cover absolute top-0 left-0 -z-10"
      />
      <div className="container">
        <div className="flex flex-col items-center justify-center pt-[122px] md:pt-[200px] sm:pt-[150px] xl:pt-[400px]">
          <h4 className="text-3xl xl:text-8xl heading-gradient pb-10 xl:pb-16">
            Frequently Asked Questions
          </h4>
          <div className="flex flex-col gap-3">
            {faqData?.map((item, index) => (
              <AccordionComponent
                key={index}
                setOpenIndex={setOpenIndex}
                openIndex={openIndex}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqBanner;
