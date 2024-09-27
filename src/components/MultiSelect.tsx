import React, { useState } from "react";

interface MultiSelectProps {
  label?: string;
  options: string[]; // Array of options for the multi-select
  placeholder?: string;
  className?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label = "",
  options,
  placeholder = "-- Select --",
  className = "",
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((o) => o !== option) // Deselect option
        : [...prevSelected, option] // Select option
    );
  };

  const isOptionSelected = (option: string) =>
    selectedOptions.includes(option);

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-black">
          {label}
        </label>
      )}

      <div
        className="border border-gray-300 p-2 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500 text-black"
        onClick={toggleDropdown}
      >
        {selectedOptions.length > 0
          ? selectedOptions.join(", ")
          : placeholder}
      </div>

      {isOpen && (
        <ul className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg max-h-60 overflow-auto w-full shadow-lg">
          {options.map((option, idx) => (
            <li
              key={idx}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer text-black"
            >
              <input
                type="checkbox"
                checked={isOptionSelected(option)}
                onChange={() => handleOptionChange(option)}
                className="mr-2 text-black"
              />
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
