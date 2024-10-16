import { useState, useCallback } from "react";

// Custom hook to manage search functionality
export const useSearchQuery = () => {
  // State to store the current search query
  const [searchQuery, setSearchQuery] = useState("");

  // Memoized function to update the search query
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Memoized function to reset the search query
  const resetSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  // Return the search state and functions
  return { searchQuery, handleSearch, resetSearch };
};
