import { useState, type ReactNode } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import type { UseFormRegister, FieldErrors } from "react-hook-form";

interface InputProps {
  className?: string;
  icon?: ReactNode;
  type?: string;
  placeholder?: string;
  passwordToggle?: boolean;
  parentClass?: string;
  register?: UseFormRegister<Record<string, unknown>>;
  name: string;
  errors?: FieldErrors;
}

const Input = ({
  className,
  icon,
  type = "text",
  placeholder,
  passwordToggle = false,
  parentClass,
  register,
  name,
  errors = {},
}: InputProps) => {
  const [toggle, setToggle] = useState(false);
  const error = errors?.[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className={`relative ${parentClass}`}>
      <input
        type={toggle ? "text" : type}
        placeholder={errorMessage || placeholder || "Enter here"}
        className={`xl:pl-14 pl-10 py-3 bg-additionalColor pr-7 xl:pr-14 font-Inter text-thirdColor border-[1px] border-transparent hover:border-orange/50 focus:border-orange transition-colors duration-200 -mt-[2px] placeholder:font-normal placeholder:font-Inter placeholder:text-xs placeholder:lg:text-base placeholder:text-thirdColor md:w-[480px] xl:w-[562px] w-full ${className} ${
          error && "!border-errorColor placeholder:!text-errorColor"
        }`}
        {...(register ? register(name, { required: `Please enter your ${name}!` }) : {})}
      />

      {icon && (
        <div
          className={`absolute top-[50%] -translate-y-[50%] left-3 xl:left-7 text-primaryWhite opacity-50 text-xl ${
            error && "!text-errorColor"
          }`}
        >
          {icon}
        </div>
      )}

      {passwordToggle && (
        <div
          className="absolute top-[50%] -translate-y-[50%] right-4 xl:right-7 text-primaryWhite opacity-50 text-xl cursor-pointer"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </div>
      )}
    </div>
  );
};

export default Input;
