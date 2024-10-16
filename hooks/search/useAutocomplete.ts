import { useState, useEffect, useCallback, useRef } from "react";
import { Subject, Observable, of, from } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  map,
  tap,
} from "rxjs/operators";

import { PokemonListItem } from "@/types/pokemon";
import { fetchData, getPokemonListUrl } from "@/utils/api";
import { ApiError } from "@/types/api";

// Constants for autocomplete behavior
const DEBOUNCE_TIME = 300;
const MAX_SUGGESTIONS = 10;
const MIN_SEARCH_LENGTH = 0;

// Custom hook for Pokemon name autocomplete
export const useAutocomplete = (initialValue: string = "") => {
  // State for managing input, suggestions, loading, and errors
  const [immediateInputValue, setImmediateInputValue] = useState(initialValue);
  const [debouncedInputValue, setDebouncedInputValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<PokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // RxJS Subject for handling search input
  const searchSubject = useRef(new Subject<string>());
  // Cache for storing previous search results
  const cacheRef = useRef<Map<string, PokemonListItem[]>>(new Map());

  // Function to search for Pokemon based on input query
  const searchPokemon = useCallback(
    (query: string): Observable<PokemonListItem[]> => {
      if (query.length < MIN_SEARCH_LENGTH) {
        return of([]);
      }

      const cachedResult = cacheRef.current.get(query);

      if (cachedResult) {
        return of(cachedResult);
      }

      return from(
        fetchData<{ results: PokemonListItem[] }>(getPokemonListUrl(1000, 0)),
      ).pipe(
        map((data) => {
          const filteredResults = data.results
            .filter((pokemon) =>
              pokemon.name.toLowerCase().includes(query.toLowerCase()),
            )
            .slice(0, MAX_SUGGESTIONS);

          cacheRef.current.set(query, filteredResults);

          return filteredResults;
        }),
        catchError((error: ApiError) => {
          if (error.status === 404) {
            return of([]);
          }
          throw error;
        }),
      );
    },
    [],
  );

  // Effect for setting up the RxJS pipeline
  useEffect(() => {
    const subscription = searchSubject.current
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        tap(() => setIsLoading(true)),
        switchMap(searchPokemon),
        catchError((error) => {
          setError("An error occurred while fetching suggestions.");
          console.error("Search error:", error);

          return of([]);
        }),
      )
      .subscribe((results) => {
        setSuggestions(results);
        setIsLoading(false);
      });

    return () => subscription.unsubscribe();
  }, [searchPokemon]);

  // Effect to trigger search when debounced input changes
  useEffect(() => {
    searchSubject.current.next(debouncedInputValue);
  }, [debouncedInputValue]);

  // Effect for debouncing input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInputValue(immediateInputValue);
    }, DEBOUNCE_TIME);

    return () => clearTimeout(timer);
  }, [immediateInputValue]);

  // Handler for input changes
  const handleInputChange = useCallback((value: string) => {
    setImmediateInputValue(value);
  }, []);

  // Return values and functions for use in components
  return {
    inputValue: immediateInputValue,
    setInputValue: handleInputChange,
    suggestions,
    isLoading,
    error,
  };
};
