import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  disabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  showPrevNext = true,
  disabled = false,
}) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const getPageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [1, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, "...", ...middleRange, "...", totalPages];
    }

    return [];
  };

  const handlePageChange = (page: number) => {
    if (!disabled && page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const baseButtonClasses =
    "px-3 py-2 border border-github-border rounded-md text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const activeButtonClasses =
    "bg-github-primary border-github-primary hover:bg-github-primaryHover";
  const inactiveButtonClasses = "hover:bg-gray-800";

  return (
    <nav
      className="flex items-center justify-center space-x-2"
      aria-label="Pagination"
    >
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(1)}
          disabled={disabled || currentPage === 1}
          className={`${baseButtonClasses} ${inactiveButtonClasses}`}
          aria-label="First page"
        >
          <ChevronsLeft size={16} />
        </button>
      )}

      {showPrevNext && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          className={`${baseButtonClasses} ${inactiveButtonClasses}`}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>
      )}

      <div className="flex space-x-2">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span key={`dots-${index}`} className="px-3 py-2 text-gray-400">
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              disabled={disabled}
              className={`
                ${baseButtonClasses}
                ${isActive ? activeButtonClasses : inactiveButtonClasses}
              `}
              aria-current={isActive ? "page" : undefined}
              aria-label={`Page ${pageNumber}`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {showPrevNext && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
          className={`${baseButtonClasses} ${inactiveButtonClasses}`}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      )}

      {showFirstLast && (
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={disabled || currentPage === totalPages}
          className={`${baseButtonClasses} ${inactiveButtonClasses}`}
          aria-label="Last page"
        >
          <ChevronsRight size={16} />
        </button>
      )}
    </nav>
  );
};

export default Pagination;
