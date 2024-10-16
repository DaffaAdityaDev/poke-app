import { useState, useEffect, useCallback } from "react";

import { getPokemonTypes, getPokemonTypeDetails } from "@/lib/api/pokeapi";
import { PokemonType } from "@/types/pokemon";

// Custom hook to fetch and manage Pokemon types
export const usePokemonTypes = () => {
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch Pokemon types and their details
  const fetchTypes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const typesData = await getPokemonTypes();

      // Fetch detailed information for each type
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

  // Fetch types on component mount
  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  // Function to manually refetch types
  const refetch = useCallback(() => {
    fetchTypes();
  }, [fetchTypes]);

  return { types, isLoading, error, refetch };
};
