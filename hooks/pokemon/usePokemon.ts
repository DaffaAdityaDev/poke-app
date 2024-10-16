import { useEffect, useMemo } from "react";

import { useSearchQuery } from "../search/useSearchQuery";
import { usePagination } from "../usePagination";
import { useErrorHandling } from "../error/useErrorHandling";

import { usePokemonList } from "./usePokemonList";
import { usePokemonDetails } from "./usePokemonDetails";

const ITEMS_PER_PAGE = 20;

export function usePokemon() {
  // Custom hooks for managing search, pagination, and data fetching
  const { searchQuery, handleSearch, resetSearch } = useSearchQuery();
  const { currentPage, totalPages, handlePageChange } = usePagination(
    0,
    ITEMS_PER_PAGE,
  );
  const { listData, listError } = usePokemonList(currentPage, searchQuery);
  const { pokemonDetails, detailsError } = usePokemonDetails(
    listData,
    searchQuery,
  );

  // Error handling hook
  const { getErrorMessage } = useErrorHandling(
    listError ? { name: "ListError", message: listError.message } : null,
    detailsError
      ? { name: "DetailsError", message: detailsError.message }
      : null,
    searchQuery,
  );

  const isLoading = !listData || !pokemonDetails;

  // Adjust total pages when searching
  const effectiveTotalPages = useMemo(() => {
    if (searchQuery) {
      return 1; // When searching, we only have one page of results
    }

    return totalPages;
  }, [searchQuery, totalPages]);

  // Update pagination when list data changes
  useEffect(() => {
    if (listData) {
      handlePageChange(currentPage, listData.count);
    }
  }, [listData, handlePageChange, currentPage]);

  // Reset to first page when searching
  useEffect(() => {
    if (searchQuery) {
      handlePageChange(1, 1);
    }
  }, [searchQuery, handlePageChange]);

  // Return all necessary data and functions for the Pokemon list view
  return {
    pokemonList: pokemonDetails || [],
    isLoading,
    error: getErrorMessage(),
    currentPage,
    totalPages: effectiveTotalPages,
    searchQuery,
    handleSearch,
    handlePageChange,
    resetSearch,
  };
}
