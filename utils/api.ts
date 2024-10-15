export const API_BASE_URL = "https://pokeapi.co/api/v2";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`);

  if (!response.ok) {
    if (response.status === 429) {
      throw new ApiError(429, "Rate limit exceeded. Please try again later.");
    }
    throw new ApiError(
      response.status,
      `Failed to fetch data: ${response.statusText}`,
    );
  }

  const data = await response.json();

  return data as T;
}

export function getPokemonListUrl(limit: number, offset: number): string {
  return `/pokemon?limit=${limit}&offset=${offset}`;
}

export function getPokemonDetailsUrl(nameOrId: string | number): string {
  return `/pokemon/${nameOrId}`;
}
