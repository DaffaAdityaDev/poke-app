import { useEffect, useMemo } from "react";

import { useSearchQuery } from "../search/useSearchQuery";
import { usePagination } from "../usePagination";
import { useErrorHandling } from "../error/useErrorHandling";

import { usePokemonList } from "./usePokemonList";
import { usePokemonDetails } from "./usePokemonDetails";

const ITEMS_PER_PAGE = 20;

export function usePokemon() {
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
  const { getErrorMessage } = useErrorHandling(
    listError ? { name: "ListError", message: listError.message } : null,
    detailsError
      ? { name: "DetailsError", message: detailsError.message }
      : null,
    searchQuery,
  );

  const isLoading = !listData || !pokemonDetails;

  const effectiveTotalPages = useMemo(() => {
    if (searchQuery) {
      return 1; // When searching, we only have one page of results
    }

    return totalPages;
  }, [searchQuery, totalPages]);

  useEffect(() => {
    if (listData) {
      handlePageChange(currentPage, listData.count);
    }
  }, [listData, handlePageChange, currentPage]);

  useEffect(() => {
    if (searchQuery) {
      handlePageChange(1, 1); // Reset to first page when searching
    }
  }, [searchQuery, handlePageChange]);

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
