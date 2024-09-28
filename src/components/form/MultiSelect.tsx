import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

// Define props, excluding `onChange`, since we'll handle it via `ref`
interface MultiSelectProps {
  label?: string;
  options: string[]; // Array of options for the multi-select
  placeholder?: string;
  className?: string;
  value: string[]; // The current value of selected options
  onChange: (selectedOptions: string[]) => void; // Handler for when options are selected/deselected
}

// Use forwardRef to expose the internal functionality to the parent
const MultiSelect = forwardRef<any, MultiSelectProps>(
  (
    {
      label = "",
      options,
      placeholder = "-- Select --",
      className = "",
      value,
      onChange,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>(
      value || []
    );

    // Toggle dropdown open/close
    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionChange = (option: string) => {
      const updatedSelectedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((o) => o !== option)
        : [...selectedOptions, option];

      setSelectedOptions(updatedSelectedOptions);
      onChange(updatedSelectedOptions); // Ensure this calls the parent `onChange`
    };

    // Expose the selected options to the parent via ref
    useImperativeHandle(ref, () => ({
      getSelectedOptions: () => selectedOptions,
      setSelectedOptions: (options: string[]) => setSelectedOptions(options),
    }));

    // Keep the selected options in sync with the value passed from the parent
    useEffect(() => {
      setSelectedOptions(value);
    }, [value]);

    // Check if an option is selected
    const isOptionSelected = (option: string) =>
      selectedOptions.includes(option);

    return (
      <div className={`relative ${className} ${isOpen ? 'mb-24' : ''}`}>
        {/* Label (if exists) */}
        {label && (
          <label className="block mb-2 text-md font-semibold text-gray-700">
            {label}
          </label>
        )}

        {/* Dropdown Trigger */}
        <div
          className="border border-gray-300 p-2 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500 text-black bg-white"
          onClick={toggleDropdown}
        >
          {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : placeholder}
        </div>

        {/* Dropdown Menu */}
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
  }
);

export default MultiSelect;
