import { useSWRConfig } from "@/lib/hooks/useSWRConfig";
import { EvolutionChain } from "@/types/pokemon";
import { ApiError } from "@/types/api";

export const usePokemonEvolution = (pokemonName: string | null) => {
  const { data: speciesData, error: speciesError } = useSWRConfig<
    any,
    ApiError
  >(pokemonName ? `/pokemon-species/${pokemonName.toLowerCase()}` : null);

  const { data: evolutionData, error: evolutionError } = useSWRConfig<
    any,
    ApiError
  >(speciesData?.evolution_chain?.url || null);

  const isLoading = pokemonName && (!speciesData || !evolutionData);

  let error = null;

  if (speciesError) {
    error = {
      message: `Failed to fetch species data: ${speciesError.message}`,
    };
  } else if (evolutionError) {
    error = {
      message: `Failed to fetch evolution data: ${evolutionError.message}`,
    };
  } else if (speciesData && !speciesData.evolution_chain) {
    error = { message: "No evolution data available for this Pokémon" };
  }

  return {
    evolutionChain: evolutionData?.chain as EvolutionChain | null,
    isLoading,
    error,
  };
};
