import { useEffect } from "react";

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
    listError,
    detailsError,
    searchQuery,
  );

  const isLoading = !listData || !pokemonDetails;

  useEffect(() => {
    if (listData) {
      handlePageChange(currentPage, listData.count);
    }
  }, [listData, handlePageChange, currentPage]);

  return {
    pokemonList: pokemonDetails || [],
    isLoading,
    error: getErrorMessage(),
    currentPage,
    totalPages,
    searchQuery,
    handleSearch,
    handlePageChange,
    resetSearch,
  };
}
