import { useState, useCallback } from "react";

export const usePagination = (initialTotal: number, itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(initialTotal / itemsPerPage),
  );

  const handlePageChange = useCallback(
    (page: number, newTotal?: number) => {
      setCurrentPage(page);
      if (newTotal !== undefined) {
        setTotalPages(Math.ceil(newTotal / itemsPerPage));
      }
    },
    [itemsPerPage],
  );

  return { currentPage, totalPages, handlePageChange };
};
