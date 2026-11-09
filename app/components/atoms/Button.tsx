import type { ReactNode } from "react";

interface ButtonProps {
  btnTitle?: string | ReactNode;
  className?: string;
  img?: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

export default function Button({
  btnTitle,
  children,
  className = "",
  img,
  type,
  disabled,
  onClick
}: ButtonProps) {
  const baseClasses = `py-2 lg:py-3 px-8 lg:px-14 font-Poppins font-medium inline-block cursor-pointer text-orange hover:text-primaryWhite transition border-[1.5px] border-orange lg:text-lg text-sm whitespace-nowrap after:origin-left after:scale-x-0 relative z-10 after:-z-10 after:absolute after:top-0 after:left-0 after:w-full after:bg-orange after:h-full hover:after:scale-x-100 hover:after:origin-right after:transition after:duration-200 active:scale-95 ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`;

  const content = (
    <>
      {btnTitle || children}
      {img}
    </>
  );

  // Use button element for form submissions
  if (type) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={baseClasses}
      >
        {content}
      </button>
    );
  }

  // Use div for other uses (Link wrappers, etc.)
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={baseClasses}
    >
      {content}
    </div>
  );
}
