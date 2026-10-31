import { createContext, useContext } from "react";
import type { ReactNode } from "react";

interface AccordionContextType {
  open: boolean;
  icon?: ReactNode;
}

const AccordionContext = createContext<AccordionContextType>({ open: false });

interface AccordionProps {
  open: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

interface AccordionHeaderProps {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

interface AccordionBodyProps {
  className?: string;
  children: ReactNode;
}

export const Accordion = ({ open, icon, children }: AccordionProps) => {
  return (
    <AccordionContext.Provider value={{ open, icon }}>
      <div>{children}</div>
    </AccordionContext.Provider>
  );
};

export const AccordionHeader = ({
  className = "",
  onClick,
  children,
}: AccordionHeaderProps) => {
  const { icon } = useContext(AccordionContext);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between ${className}`}
    >
      {children}
      {icon}
    </button>
  );
};

export const AccordionBody = ({
  className = "",
  children,
}: AccordionBodyProps) => {
  const { open } = useContext(AccordionContext);

  return (
    <div
      className={`grid transition-all ease-in-out ${
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className={`overflow-hidden ${className}`}>
        <div className="px-4 xl:px-7 pb-4 xl:pb-7">
        {children}
        </div>
      </div>
    </div>
  );
};
