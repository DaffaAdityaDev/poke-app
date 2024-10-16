import { useState, useEffect, useMemo } from "react";
import { PokemonAbility } from "@/types/pokemon";
import { useSWRConfig } from "@/lib/hooks/useSWRConfig";
import { ApiError } from "@/types/api";

const API_BASE_URL = "https://pokeapi.co/api/v2";
const ITEMS_PER_PAGE = 20;

export const usePokemonAbilities = (
  searchQuery: string,
  currentPage: number,
) => {
  const { data, error } = useSWRConfig<{ results: { name: string; url: string }[], count: number }, ApiError>(
    `/ability?limit=1000`, // Fetch all abilities at once
    {
      onError: (error) => {
        console.error("API error:", error);
        return error instanceof Error
          ? { message: error.message }
          : { message: "An unknown error occurred" };
      },
    }
  );

  const [abilities, setAbilities] = useState<PokemonAbility[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAbilityDetails = async () => {
      if (data) {
        setIsLoading(true);
        const abilitiesDetails = await Promise.all(
          data.results.map(async (ability) => {
            const response = await fetch(ability.url);
            if (!response.ok) {
              throw new Error(`Failed to fetch ability details: ${response.status}`);
            }
            return response.json();
          })
        );
        setAbilities(abilitiesDetails);
        setIsLoading(false);
      }
    };

    fetchAbilityDetails();
  }, [data]);

  const filteredAbilities = useMemo(() => {
    return abilities.filter((ability) =>
      ability.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [abilities, searchQuery]);

  const paginatedAbilities = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAbilities.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAbilities, currentPage]);

  const totalPages = Math.ceil(filteredAbilities.length / ITEMS_PER_PAGE);

  return {
    abilities: paginatedAbilities,
    isLoading,
    error: error ? { message: error.message || "Failed to fetch abilities" } : null,
    totalPages,
    totalAbilities: filteredAbilities.length,
  };
};
