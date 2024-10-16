import React from "react";
import { Pagination as NextUIPagination } from "@nextui-org/pagination";

// Define the props interface for the Pagination component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Pagination component using NextUI's Pagination
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center mt-4">
      {/* NextUI Pagination component */}
      <NextUIPagination
        initialPage={currentPage}
        total={totalPages}
        onChange={onPageChange}
      />
    </div>
  );
};
