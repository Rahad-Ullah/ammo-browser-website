import { useEffect, useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { LuChevronDown } from "react-icons/lu";

interface SelectProps {
  onSelectOption: (name: string, option: string) => void;
  name: string;
  options?: string[];
  defaultLabel: string;
  search?: boolean;
  isEdit?: boolean;
  isEditData?: string;
}

const Select = ({
  onSelectOption,
  name,
  options,
  defaultLabel,
  search = false,
  isEdit,
  isEditData,
}: SelectProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultLabel);

  useEffect(() => {
    if (isEditData && isEdit) {
      setSelected(isEditData);
    }
  }, [isEditData, isEdit]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelectOption(name, option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="w-full bg-secondaryBg font-Inter relative">
      <button
        className="w-full text-primaryWhite capitalize font-normal text-sm hover:bg-[#303030] transition flex items-center justify-between px-4 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="w-[180px] text-start text-nowrap overflow-hidden text-ellipsis">
          {selected}
        </span>
        <LuChevronDown
          className={`h-5 w-5 text-gray-500 transition ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      <ul
        id="select_option"
        className={`w-full bg-secondaryBg duration-300 overflow-auto transition-all text-thirdColor z-10 ${
          search ? "overflow-auto h-[250px]" : ""
        } ${isOpen ? "max-h-[300px]" : "max-h-0"}`}
      >
        {search && (
          <div className="sticky top-0 left-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#222222] pl-8 border-[1px] border-[#3E3E3E] text-xs py-2 placeholder:text-thirdColor placeholder:text-xs"
              />
              <GoSearch className="absolute top-[50%] -translate-y-[50%] left-3" />
            </div>
          </div>
        )}

        {options?.map((option, index) => (
          <li
            key={index}
            className="px-4 py-2 capitalize cursor-pointer text-xs font-normal hover:bg-orange hover:text-primaryWhite transition"
            onClick={() => handleSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
