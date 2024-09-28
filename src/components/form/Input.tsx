import React from "react";

interface InputProps {
  label?: string;
  className?: string;
  type?: string;
  placeholder?: string;
  id?: string;
  // These props will come from react-hook-form
  name: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label = "", className = "", type = "text", placeholder = "", id = "", onChange, onBlur, name, error }, ref) => {
    return (
      <div className="flex flex-col space-y-2">
        {label && (
          <label htmlFor={id} className="text-gray-700 font-semibold">
            {label}
          </label>
        )}
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          name={name}  // name attribute for react-hook-form to work
          className={`p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-md focus:ring-blue-500 ${className}`}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}  // react-hook-form will pass onChange and onBlur
        />
        {error && <span className="text-red-500">{error}</span>}
      </div>
    );
  }
);

export default Input;
