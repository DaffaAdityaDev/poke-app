import { useMemo } from "react";

import { useSWRConfig } from "@/lib/hooks/useSWRConfig";
import { PokemonDetails } from "@/types/pokemon";
import { ApiError } from "@/types/api";

export const usePokemonDetails = (listData: any, searchQuery: string) => {
  const pokemonUrls = useMemo(() => {
    if (searchQuery && listData) {
      return [`/pokemon/${searchQuery.toLowerCase()}`];
    }

    return (
      listData?.results.map((pokemon: any) => `/pokemon/${pokemon.name}`) || []
    );
  }, [listData, searchQuery]);

  const { data: pokemonDetails, error: detailsError } = useSWRConfig<
    PokemonDetails[],
    ApiError
  >(pokemonUrls, {
    onError: (error) => console.error("Details error:", error),
  });

  return { pokemonDetails, detailsError };
};
