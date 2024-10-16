import { useMemo } from "react";

import { useSWRConfig } from "@/lib/hooks/useSWRConfig";
import { PokemonDetails } from "@/types/pokemon";
import { ApiError } from "@/types/api";

export const usePokemonDetails = (listData: any, searchQuery: string) => {
  // Determine which Pokemon URLs to fetch based on search query or list data
  const pokemonUrls = useMemo(() => {
    if (searchQuery && listData) {
      // If there's a search query, fetch details for that specific Pokemon
      return [`/pokemon/${searchQuery.toLowerCase()}`];
    }

    // Otherwise, fetch details for all Pokemon in the list
    return (
      listData?.results.map((pokemon: any) => `/pokemon/${pokemon.name}`) || []
    );
  }, [listData, searchQuery]);

  // Fetch Pokemon details using SWR
  const { data: pokemonDetails, error: detailsError } = useSWRConfig<
    PokemonDetails[],
    ApiError
  >(pokemonUrls, {
    onError: (error) => console.error("Details error:", error),
  });

  return { pokemonDetails, detailsError };
};
