import { TfiMinus } from "react-icons/tfi";
import { PiPlusBold } from "react-icons/pi";
import { Accordion, AccordionHeader, AccordionBody } from "./CustomAccordion";

interface AccordionItem {
  title: string;
  description: string;
}

interface AccordionComponentProps {
  item: AccordionItem;
  index: number;
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
}

interface IconProps {
  id: number;
  open: number | null;
  className?: string;
}

const Icon = ({ id, open, className }: IconProps) => {
  return (
    <span className={`text-xl xl:text-[28px] ${className}`}>
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
          className={`hover:text-primaryWhite px-4 xl:px-7 py-4 xl:py-8 font-Poppins bg-footerBG text-thirdColor hover:bg-orange transition border-b-0 text-base xl:text-2xl font-normal ${
            openIndex === index && "bg-orange text-primaryWhite"
          }`}
          onClick={() => handleOpen(index)}
          >
          {title}
        </AccordionHeader>
        <AccordionBody
          className={`${
            openIndex === index && "bg-orange text-primaryWhite py-0"
          } xl:text-xl text-xs font-light text-primaryWhite px-4 xl:px-7 pb-4 xl:pb-7 font-Poppins`}
          >
          {description}
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default AccordionComponent;
