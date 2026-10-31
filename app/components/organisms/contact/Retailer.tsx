import { useState } from "react";
import AccordionComponent from "~/components/molecules/AccordionComponent";

const retailerFaqData = [
  {
    title: "How can I get my business listed on AmmoBrowser?",
    description: `To create a listing, we will need a data feed, such as XML or JSON, that includes your product catalog, pricing, and other key details.
For additional details or assistance, please email us, and our team will guide you through the process.`,
  },
  {
    title: "Is there a cost to be listed on AmmoBrowser?",
    description: `While we strive to make AmmoBrowser accessible to all retailers, there is a small fee for listings to help keep the platform running smoothly and maintain high-quality service. Please email us to get additional information and pricing details.`,
  },
  {
    title: "How does AmmoBrowser promote my business?",
    description: `AmmoBrowser increases your business visibility by showcasing your listings to a highly targeted audience of ammunition buyers. We also offer advertising opportunities to help your business stand out.`,
  },
];

const Retailer = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <div className="pb-28">
      <div className="container">
        <h4 className="text-3xl lg:text-5xl xl:text-[84px] heading-gradient pb-10 text-center mx-auto w-full">
          For Retailers
        </h4>

        <div className="flex flex-col gap-4">
          {retailerFaqData?.map((item, index) => (
            <AccordionComponent
              key={index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Retailer;
