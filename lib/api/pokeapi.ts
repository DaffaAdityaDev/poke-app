import { fetcher } from "./fetcher";

import {
  PokemonListResponse,
  PokemonDetails,
  PokemonType,
} from "@/types/pokemon";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemonList = (limit: number = 20, offset: number = 0) =>
  fetcher<PokemonListResponse>(
    `${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );

export const getPokemonDetails = (nameOrId: string | number) =>
  fetcher<PokemonDetails>(`${API_BASE_URL}/pokemon/${nameOrId}`);

export const getPokemonTypes = () =>
  fetcher<{ results: PokemonType[] }>(`${API_BASE_URL}/type`);

export const getPokemonTypeDetails = (name: string) =>
  fetcher<PokemonType>(`${API_BASE_URL}/type/${name}`);
