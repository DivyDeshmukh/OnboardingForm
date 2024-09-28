import React from "react";

interface SelectProps {
  label?: string;
  className?: string;
  options: string[]; // Array of string options for the dropdown
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Add onChange handler prop
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label = "", className = "", options, id = "", placeholder = "", value = "", onChange }, ref) => {
    return (
      <div className="flex flex-col space-y-2">
        {label && (
          <label htmlFor={id} className="text-gray-700 font-semibold">
            {label}
          </label>
        )}
        <select
          id={id}
          className={`p-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-blue-500 ${className}`}
          value={value} // Use value prop
          onChange={onChange} // Use onChange prop
          ref={ref}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
