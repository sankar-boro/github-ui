import React, { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "onChange"
> {
  label?: string;
  error?: string;
  hint?: string;
  options: Option[];
  fullWidth?: boolean;
  onChange?: (value: string) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      hint,
      options,
      fullWidth = false,
      className = "",
      id,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;

    const baseClasses =
      "bg-gray-900 border rounded-md px-3 py-2 text-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-github-dark transition-colors";
    const stateClasses = hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "border-github-border focus:border-blue-500 focus:ring-blue-500";
    const widthClass = fullWidth ? "w-full" : "";

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`${baseClasses} ${stateClasses} ${widthClass} pr-10 ${className}`}
            value={value}
            onChange={handleChange}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${selectId}-error`
                : hint
                  ? `${selectId}-hint`
                  : undefined
            }
            {...props}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-gray-900"
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        {error && (
          <p id={`${selectId}-error`} className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={`${selectId}-hint`} className="mt-1 text-sm text-gray-500">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
