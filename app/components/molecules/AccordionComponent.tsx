import { TfiMinus } from "react-icons/tfi";
import { PiPlusBold } from "react-icons/pi";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "~/components/atoms/CustomAccordion";

interface FaqItem {
  title: string;
  description: string;
}

interface AccordionComponentProps {
  item: FaqItem;
  index: number;
  openIndex: number | null;
  setOpenIndex: (value: number | null) => void;
}

interface IconProps {
  id: number;
  open: number | null;
  className?: string;
}

const Icon = ({ id, open, className }: IconProps) => {
  return (
    <span className={`text-lg xl:text-2xl shrink-0 ml-4 ${className}`}>
      {id === open ? <TfiMinus /> : <PiPlusBold />}
    </span>
  );
};

const AccordionComponent = ({
  item,
  index,
  openIndex,
  setOpenIndex,
}: AccordionComponentProps) => {
  const { title, description } = item;

  const handleOpen = (value: number) => {
    setOpenIndex(openIndex === value ? null : value);
  };

  return (
    <div>
      <Accordion
        open={openIndex === index}
        icon={
          <Icon
            id={index}
            open={openIndex}
            className={`text-orange ${
              openIndex === index ? "text-primaryWhite" : "text-orange"
            }`}
          />
        }
      >
        <AccordionHeader
          className={`hover:text-primaryWhite px-4 sm:px-6 xl:px-7 py-3.5 sm:py-4 xl:py-5 font-Poppins bg-footerBG text-thirdColor hover:bg-orange transition border-b-0 text-base sm:text-lg xl:text-xl font-normal text-left ${
            openIndex === index ? "bg-orange !text-primaryWhite" : ""
          }`}
          onClick={() => handleOpen(index)}
        >
          <span>{title}</span>
        </AccordionHeader>
        {/* openIndex === index &&  */}
        <AccordionBody
          className="bg-orange text-primaryWhite py-0 text-sm sm:text-base xl:text-base font-light font-Poppins leading-relaxed"
        >
          {description}
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default AccordionComponent;
