import { useEffect } from "react";

import { usePagination } from "./usePagination";
import { useSearchQuery } from "./search/useSearchQuery";
import { usePokemonList } from "./pokemon/usePokemonList";
import { usePokemonDetails } from "./pokemon/usePokemonDetails";
import { useErrorHandling } from "./error/useErrorHandling";

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

  // Update total pages when listData changes
  useEffect(() => {
    if (listData) {
      handlePageChange(currentPage, Math.ceil(listData.count / ITEMS_PER_PAGE));
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
