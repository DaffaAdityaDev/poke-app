import { useState, useCallback } from "react";

export const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const resetSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  return { searchQuery, handleSearch, resetSearch };
};
