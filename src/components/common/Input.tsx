import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      onLeftIconClick,
      onRightIconClick,
      fullWidth = false,
      className = "",
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;

    const baseClasses =
      "bg-gray-900 border rounded-md px-3 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-github-dark transition-colors";
    const stateClasses = hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "border-github-border focus:border-blue-500 focus:ring-blue-500";
    const widthClass = fullWidth ? "w-full" : "";
    const withLeftIcon = leftIcon ? "pl-10" : "";
    const withRightIcon = rightIcon ? "pr-10" : "";

    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ${
                onLeftIconClick ? "cursor-pointer hover:text-gray-300" : ""
              }`}
              onClick={onLeftIconClick}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`${baseClasses} ${stateClasses} ${withLeftIcon} ${withRightIcon} ${widthClass} ${className}`}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${inputId}-error`
                : hint
                  ? `${inputId}-hint`
                  : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 ${
                onRightIconClick ? "cursor-pointer hover:text-gray-300" : ""
              }`}
              onClick={onRightIconClick}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1 text-sm text-gray-500">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
