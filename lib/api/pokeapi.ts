import { fetcher } from "./fetcher";

import { PokemonListResponse, PokemonDetails } from "@/types/pokemon";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemonList = (
  limit: number = 20,
  offset: number = 0,
  search?: string,
) =>
  fetcher<PokemonListResponse>(
    `${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );

export const getPokemonDetails = (nameOrId: string | number) =>
  fetcher<PokemonDetails>(`${API_BASE_URL}/pokemon/${nameOrId}`);
