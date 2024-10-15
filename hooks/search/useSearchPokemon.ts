import { useState, useEffect, useCallback } from "react";

import { PokemonListItem } from "@/types/pokemon";
import { getPokemonList } from "@/lib/api/pokeapi";

const ITEMS_PER_PAGE = 20;

const useSearchPokemon = (currentPage: number) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<PokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.length > 0) {
        setIsLoading(true);
        getPokemonList(1000, 0, value) // Fetch more results to filter
          .then((data) => {
            const filteredResults = data.results.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(value.toLowerCase()),
            );

            setItems(filteredResults.slice(0, ITEMS_PER_PAGE));
            setIsLoading(false);
          })
          .catch(() => {
            setItems([]);
            setIsLoading(false);
          });
      } else {
        setItems([]);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  return {
    inputValue,
    setInputValue,
    items,
    isLoading,
  };
};

// Debounce function
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
