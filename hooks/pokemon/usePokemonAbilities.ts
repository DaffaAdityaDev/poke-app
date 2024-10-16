import { useState, useEffect, useMemo, useCallback } from "react";

import { PokemonAbility } from "@/types/pokemon";
import { ApiError } from "@/types/api";

const API_BASE_URL = "https://pokeapi.co/api/v2";
const ITEMS_PER_PAGE = 20;

export const usePokemonAbilities = (
  searchQuery: string,
  currentPage: number,
) => {
  // State variables for managing abilities data, loading state, and errors
  const [abilities, setAbilities] = useState<PokemonAbility[]>([]);
  const [totalAbilities, setTotalAbilities] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  // Function to fetch abilities from the API
  const fetchAbilities = useCallback(async (page: number) => {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const url = `/ability?limit=${ITEMS_PER_PAGE}&offset=${offset}`;

    try {
      const response = await fetch(`${API_BASE_URL}${url}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch abilities: ${response.status}`);
      }
      const data = await response.json();

      setTotalAbilities(data.count);

      const abilitiesDetails = await Promise.all(
        data.results.map(async (ability: { url: string }) => {
          const abilityResponse = await fetch(ability.url);

          if (!abilityResponse.ok) {
            throw new Error(
              `Failed to fetch ability details: ${abilityResponse.status}`,
            );
          }

          return abilityResponse.json();
        }),
      );

      return abilitiesDetails;
    } catch (error) {
      setError(
        error instanceof Error
          ? { name: "FetchError", message: error.message }
          : { name: "UnknownError", message: "An unknown error occurred" },
      );

      return [];
    }
  }, []);

  // Effect to load abilities when the page changes
  useEffect(() => {
    const loadAbilities = async () => {
      setIsLoading(true);
      const fetchedAbilities = await fetchAbilities(currentPage);

      setAbilities(fetchedAbilities);
      setIsLoading(false);
    };

    loadAbilities();
  }, [fetchAbilities, currentPage]);

  // Memoized filtered abilities based on search query
  const filteredAbilities = useMemo(() => {
    return abilities.filter((ability) =>
      ability.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [abilities, searchQuery]);

  // Calculate total filtered abilities and total pages
  const totalFilteredAbilities = useMemo(() => {
    return searchQuery ? filteredAbilities.length : totalAbilities;
  }, [searchQuery, filteredAbilities, totalAbilities]);

  const totalPages = Math.ceil(totalFilteredAbilities / ITEMS_PER_PAGE);

  // Return the hook's output
  return {
    abilities: filteredAbilities,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalAbilities: totalFilteredAbilities,
  };
};
