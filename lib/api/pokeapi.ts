import { fetcher } from "./fetcher";

import { API_BASE_URL } from "@/utils/api";
import {
  PokemonListResponse,
  PokemonDetails,
  PokemonType,
} from "@/types/pokemon";

// Function to fetch a list of Pokemon with pagination
export const getPokemonList = (limit: number = 20, offset: number = 0) =>
  fetcher<PokemonListResponse>(
    `${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );

// Function to fetch details of a specific Pokemon by name or ID
export const getPokemonDetails = (nameOrId: string | number) =>
  fetcher<PokemonDetails>(`${API_BASE_URL}/pokemon/${nameOrId}`);

// Function to fetch all Pokemon types
export const getPokemonTypes = () =>
  fetcher<{ results: PokemonType[] }>(`${API_BASE_URL}/type`);

// Function to fetch details of a specific Pokemon type
export const getPokemonTypeDetails = (name: string) =>
  fetcher<PokemonType>(`${API_BASE_URL}/type/${name}`);
