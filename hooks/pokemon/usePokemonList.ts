import { useSWRConfig } from "@/lib/hooks/useSWRConfig";
import { PokemonListResponse } from "@/types/pokemon";
import { ApiError } from "@/types/api";

const ITEMS_PER_PAGE = 20;

export const usePokemonList = (currentPage: number, searchQuery: string) => {
  const { data: listData, error: listError } = useSWRConfig<
    PokemonListResponse,
    ApiError
  >(
    searchQuery
      ? `/pokemon/${searchQuery.toLowerCase()}`
      : `/pokemon?limit=${ITEMS_PER_PAGE}&offset=${(currentPage - 1) * ITEMS_PER_PAGE}`,
    {
      onError: (error) => {
        console.error("API error:", error);

        return error instanceof Error
          ? { message: error.message }
          : { message: "An unknown error occurred" };
      },
    },
  );

  return {
    listData,
    listError: listError
      ? { message: listError.message || "Failed to fetch Pokémon list" }
      : null,
  };
};
