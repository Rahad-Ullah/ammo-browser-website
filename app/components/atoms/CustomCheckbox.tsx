import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface CustomCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const CustomCheckbox = forwardRef<HTMLInputElement, CustomCheckboxProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        className={`w-5 h-5 cursor-pointer appearance-none rounded border-2 border-gray-400 checked:bg-orange checked:border-orange relative before:content-[''] before:absolute before:hidden checked:before:block before:left-[5px] before:top-[2px] before:w-[6px] before:h-[10px] before:border-white before:border-r-2 before:border-b-2 before:rotate-45 ${className}`}
        {...props}
      />
    );
  }
);

CustomCheckbox.displayName = "CustomCheckbox";

export default CustomCheckbox;
