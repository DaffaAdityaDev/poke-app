import { useSWRConfig } from "@/lib/hooks/useSWRConfig";
import { PokemonListResponse } from "@/types/pokemon";
import { ApiError } from "@/types/api";

// Number of Pokémon to fetch per page
const ITEMS_PER_PAGE = 20;

export const usePokemonList = (currentPage: number, searchQuery: string) => {
  // Fetch Pokémon list data using SWR
  const { data: listData, error: listError } = useSWRConfig<
    PokemonListResponse,
    ApiError
  >(
    // Determine the API endpoint based on whether it's a search or paginated list
    searchQuery
      ? `/pokemon/${searchQuery.toLowerCase()}`
      : `/pokemon?limit=${ITEMS_PER_PAGE}&offset=${(currentPage - 1) * ITEMS_PER_PAGE}`,
    {
      // Error handling for API requests
      onError: (error) => {
        console.error("API error:", error);

        return error instanceof Error
          ? { message: error.message }
          : { message: "An unknown error occurred" };
      },
    },
  );

  // Return the fetched data and any errors
  return {
    listData,
    listError: listError
      ? { message: listError.message || "Failed to fetch Pokémon list" }
      : null,
  };
};
