import { useState, useCallback } from "react";

// Custom hook for managing pagination state and logic
export const usePagination = (initialTotal: number, itemsPerPage: number) => {
  // State for current page and total pages
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(initialTotal / itemsPerPage),
  );

  // Callback to handle page changes and update total pages if needed
  const handlePageChange = useCallback(
    (page: number, newTotal?: number) => {
      setCurrentPage(page);
      if (newTotal !== undefined) {
        setTotalPages(Math.ceil(newTotal / itemsPerPage));
      }
    },
    [itemsPerPage],
  );

  // Return pagination state and control function
  return { currentPage, totalPages, handlePageChange };
};
