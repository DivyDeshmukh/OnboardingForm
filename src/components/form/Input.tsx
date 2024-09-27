import React from "react";

interface InputProps {
  label?: string;
  className?: string;
  type?: string;
  placeholder?: string;
  id?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label = "", className = "", type = "text", placeholder = "", id = "" }, ref) => {
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
          className={`p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-md focus:ring-blue-500 ${className}`}
          ref={ref}
        />
      </div>
    );
  }
);

export default Input;
