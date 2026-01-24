import * as React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./based";
// Adjust the import path as necessary

interface CustomPaginationProps {
  currentPage: number;
  totalPageCount: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // Number of pages to show around the current page
  className?: string;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPageCount,
  onPageChange,
  siblingCount = 1,
  className,
}) => {
  // Helper function to create an array of page numbers
  const range = (start: number, end: number): number[] => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const paginationRange = React.useMemo(() => {
    const totalPageNumbers = siblingCount + 5; // First, last, current, siblings, and ellipses
    if (totalPageCount > totalPageNumbers) {
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPageCount
      );

      const shouldShowLeftEllipsis = leftSiblingIndex > 2;
      const shouldShowRightEllipsis = rightSiblingIndex < totalPageCount - 1;

      const firstPageIndex = 1;
      const lastPageIndex = totalPageCount;

      const pages = range(leftSiblingIndex, rightSiblingIndex);

      let newPages;
      if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
        newPages = [firstPageIndex, ...pages, "...", lastPageIndex];
      } else if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
        newPages = [firstPageIndex, "...", ...pages, lastPageIndex];
      } else if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
        newPages = [firstPageIndex, "...", ...pages, "...", lastPageIndex];
      } else {
        newPages = [firstPageIndex, ...pages, lastPageIndex];
      }

      return newPages.filter(
        (page, index, self) => self.indexOf(page) === index
      ); // Filter out duplicates
    } else {
      return range(1, totalPageCount);
    }
  }, [currentPage, totalPageCount, siblingCount]);

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationPrevious
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        />
        {paginationRange.map((page, index) =>
          typeof page === "number" ? (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationEllipsis key={index} />
          )
        )}
        <PaginationNext
          onClick={() =>
            onPageChange(Math.min(totalPageCount, currentPage + 1))
          }
        />
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
