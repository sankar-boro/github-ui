import React from "react";

interface SkeletonProps {
  variant?: "text" | "circle" | "rectangle";
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = "text",
  width,
  height,
  className = "",
  count = 1,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "circle":
        return "rounded-full";
      case "rectangle":
        return "rounded-md";
      case "text":
      default:
        return "rounded";
    }
  };

  const getDimensions = () => {
    const styles: React.CSSProperties = {};

    if (width) {
      styles.width = typeof width === "number" ? `${width}px` : width;
    }

    if (height) {
      styles.height = typeof height === "number" ? `${height}px` : height;
    } else if (variant === "text") {
      styles.height = "1rem";
    } else if (variant === "circle") {
      styles.width = styles.width || "2.5rem";
      styles.height = styles.width;
    }

    return styles;
  };

  const baseClasses = "bg-gray-800 animate-pulse";
  const variantClasses = getVariantClasses();

  const renderSkeleton = (key: number) => (
    <div
      key={key}
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={getDimensions()}
    />
  );

  if (count === 1) {
    return renderSkeleton(0);
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => renderSkeleton(index))}
    </>
  );
};

export default Skeleton;
