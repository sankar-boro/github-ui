import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Info, XCircle, X } from "lucide-react";

interface AlertProps {
  children: React.ReactNode;
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  onClose?: () => void;
  showIcon?: boolean;
  autoClose?: boolean;
  autoCloseDelay?: number;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  children,
  variant = "info",
  title,
  onClose,
  showIcon = true,
  autoClose = false,
  autoCloseDelay = 5000,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, onClose]);

  if (!isVisible) return null;

  const variantClasses = {
    info: "bg-blue-900/20 border-blue-500 text-blue-200",
    success: "bg-green-900/20 border-green-500 text-green-200",
    warning: "bg-yellow-900/20 border-yellow-500 text-yellow-200",
    error: "bg-red-900/20 border-red-500 text-red-200",
  };

  const iconMap = {
    info: <Info size={20} className="text-blue-400" />,
    success: <CheckCircle size={20} className="text-green-400" />,
    warning: <AlertCircle size={20} className="text-yellow-400" />,
    error: <XCircle size={20} className="text-red-400" />,
  };

  return (
    <div
      className={`
        relative border rounded-lg p-4
        ${variantClasses[variant]}
        ${className}
      `}
      role="alert"
    >
      <div className="flex gap-3">
        {showIcon && <div className="flex-shrink-0">{iconMap[variant]}</div>}

        <div className="flex-1">
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          <div className="text-sm">{children}</div>
        </div>

        {onClose && (
          <button
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            className="flex-shrink-0 text-gray-400 hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Progress bar for auto-close */}
      {autoClose && onClose && (
        <div
          className="absolute bottom-0 left-0 h-1 bg-current opacity-25 rounded-b-lg"
          style={{
            width: "100%",
            animation: `shrink ${autoCloseDelay}ms linear forwards`,
          }}
        />
      )}

      <style>
        {`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}
      </style>
    </div>
  );
};

export default Alert;
