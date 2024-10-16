import { useState, useEffect, useCallback } from "react";

import { PokemonListItem } from "@/types/pokemon";
import { getPokemonList } from "@/lib/api/pokeapi";
import { ApiError } from "@/types/api";

const ITEMS_PER_PAGE = 20;

// Custom hook for searching Pokémon
const useSearchPokemon = () => {
  // State for search input, results, loading status, and errors
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<PokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  // Debounced search function to prevent excessive API calls
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.length > 0) {
        setIsLoading(true);
        setError(null);
        // Fetch all Pokémon and filter locally
        getPokemonList(1000, 0)
          .then((data) => {
            const filteredResults = data.results.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(value.toLowerCase()),
            );

            setItems(filteredResults.slice(0, ITEMS_PER_PAGE));
            setIsLoading(false);
          })
          .catch((err: ApiError) => {
            setItems([]);
            setIsLoading(false);
            setError(err);
          });
      } else {
        setItems([]);
        setError(null);
      }
    }, 300),
    [],
  );

  // Trigger search when input changes
  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  return {
    inputValue,
    setInputValue,
    items,
    isLoading,
    error,
  };
};

// Utility function for debouncing
function debounce<F extends (...args: any[]) => any>(func: F, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<F>) {
    const context = this;

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export default useSearchPokemon;
