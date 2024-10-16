import { useState, useEffect, useCallback } from "react";

import { getPokemonTypes, getPokemonTypeDetails } from "@/lib/api/pokeapi";
import { PokemonType } from "@/types/pokemon";

export const usePokemonTypes = () => {
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTypes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const typesData = await getPokemonTypes();
      const detailedTypes = await Promise.all(
        typesData.results.map(async (type) => {
          try {
            const details = await getPokemonTypeDetails(type.name);

            return { ...type, ...details };
          } catch (err) {
            console.error(`Error fetching details for ${type.name}:`, err);

            return { ...type, damage_relations: {} };
          }
        }),
      );

      setTypes(detailedTypes);
    } catch (err) {
      setError("Failed to fetch Pokémon types. Please try again later.");
      console.error("Error fetching Pokémon types:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  const refetch = useCallback(() => {
    fetchTypes();
  }, [fetchTypes]);

  return { types, isLoading, error, refetch };
};
