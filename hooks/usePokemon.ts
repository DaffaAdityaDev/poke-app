import { useState } from "react";

import { useSWRConfig } from "@/lib/hooks/useSWRConfig";
import { PokemonListResponse, PokemonDetails } from "@/types/pokemon";
import { ApiError } from "@/types/api";

const ITEMS_PER_PAGE = 20;

export function usePokemon() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: listData, error: listError } = useSWRConfig<
    PokemonListResponse,
    ApiError
  >(
    `/pokemon?limit=${ITEMS_PER_PAGE}&offset=${(currentPage - 1) * ITEMS_PER_PAGE}`,
    { onError: (error) => console.error("List error:", error) },
  );

  const { data: pokemonDetails, error: detailsError } = useSWRConfig<
    PokemonDetails[],
    ApiError
  >(
    listData
      ? listData.results.map((pokemon) => `/pokemon/${pokemon.name}`)
      : null,
    { onError: (error) => console.error("Details error:", error) },
  );

  const { data: searchResult, error: searchError } = useSWRConfig<
    PokemonDetails,
    ApiError
  >(searchQuery ? `/pokemon/${searchQuery.toLowerCase()}` : null, {
    onError: (error) => console.error("Search error:", error),
  });

  const isLoading = !listData || !pokemonDetails;

  const totalPages = listData ? Math.ceil(listData.count / ITEMS_PER_PAGE) : 0;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchQuery("");
  };

  const getErrorMessage = () => {
    if (searchError) {
      return searchError.status === 404
        ? `Pokémon "${searchQuery}" not found. Please try a different name or ID.`
        : null; // Return null for other search errors to let the global handler take care of it
    }
    if (listError || detailsError) {
      return "An error occurred while fetching Pokémon data. Please try again.";
    }

    return null;
  };

  return {
    pokemonList: searchQuery
      ? searchResult
        ? [searchResult]
        : []
      : pokemonDetails || [],
    isLoading,
    error: getErrorMessage(),
    currentPage,
    totalPages,
    searchQuery,
    handleSearch,
    handlePageChange,
  };
}
