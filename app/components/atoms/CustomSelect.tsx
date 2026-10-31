import { useState, useRef, useEffect } from "react";
import { LuChevronDown } from "react-icons/lu";

interface CustomSelectProps {
  label?: string;
  defaultLabel?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  isEdit?: boolean;
  isEditData?: string;
}

export default function CustomSelect({
  label = "Select",
  defaultLabel = "Default",
  options,
  value,
  onChange,
  className = "",
  isEdit = false,
  isEditData = "",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultLabel);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle edit mode - pre-populate from isEditData
  useEffect(() => {
    if (isEdit && isEditData) {
      setSelected(isEditData);
    }
  }, [isEdit, isEditData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-primaryWhite capitalize font-normal text-sm hover:bg-[#303030] transition flex items-center justify-between px-4 py-2 border-none"
      >
        <span className="w-[180px] overflow-hidden text-ellipsis whitespace-nowrap text-left">
          {selected === "default" ? defaultLabel : selected}
        </span>
        <LuChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <ul
        className={`w-full bg-secondaryBg duration-300 overflow-auto transition-all text-thirdColor z-10 ${
          isOpen ? "max-h-[300px]" : "max-h-0"
        }`}
      >
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleSelect(option)}
            className="px-4 py-2 capitalize cursor-pointer text-xs font-normal hover:bg-orange hover:text-primaryWhite transition"
          >
            {option === "default" ? defaultLabel : option}
          </li>
        ))}
      </ul>
    </div>
  );
}
