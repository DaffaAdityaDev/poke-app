import { useSWRConfig } from "@/lib/hooks/useSWRConfig";
import { EvolutionChain } from "@/types/pokemon";
import { ApiError } from "@/types/api";

export const usePokemonEvolution = (pokemonName: string | null) => {
  // Fetch species data for the given Pokemon
  const { data: speciesData, error: speciesError } = useSWRConfig<
    any,
    ApiError
  >(pokemonName ? `/pokemon-species/${pokemonName.toLowerCase()}` : null);

  // Fetch evolution chain data using the URL from species data
  const { data: evolutionData, error: evolutionError } = useSWRConfig<
    any,
    ApiError
  >(speciesData?.evolution_chain?.url || null);

  // Determine if data is still loading
  const isLoading = pokemonName && (!speciesData || !evolutionData);

  let error = null;

  // Error handling for different scenarios
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

  // Return the evolution chain data, loading state, and any errors
  return {
    evolutionChain: evolutionData?.chain as EvolutionChain | null,
    isLoading,
    error,
  };
};
