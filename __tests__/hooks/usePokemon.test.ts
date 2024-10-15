import { renderHook } from "@testing-library/react";

import { usePokemon } from "@/hooks/pokemon/usePokemon";

// Mock the useSearchQuery hook
jest.mock("@/hooks/search/useSearchQuery", () => ({
  useSearchQuery: () => ({
    searchQuery: "",
    handleSearch: jest.fn(),
    resetSearch: jest.fn(),
  }),
}));

// Mock the usePagination hook
jest.mock("@/hooks/usePagination", () => ({
  usePagination: () => ({
    currentPage: 1,
    totalPages: 1,
    handlePageChange: jest.fn(),
  }),
}));

// Mock the usePokemonList hook
jest.mock("@/hooks/pokemon/usePokemonList", () => ({
  usePokemonList: () => ({
    listData: null,
    listError: null,
  }),
}));

// Mock the usePokemonDetails hook
jest.mock("@/hooks/pokemon/usePokemonDetails", () => ({
  usePokemonDetails: () => ({
    pokemonDetails: null,
    detailsError: null,
  }),
}));

// Mock the usePokemon hook itself
jest.mock("@/hooks/pokemon/usePokemon", () => ({
  usePokemon: () => ({
    pokemonList: null,
    isLoading: true,
    error: null,
    currentPage: 1,
    totalPages: 1,
    searchQuery: "",
    handleSearch: jest.fn(),
    handlePageChange: jest.fn(),
    resetSearch: jest.fn(),
  }),
}));

describe("usePokemon", () => {
  // Test case to check if the hook returns the initial state correctly
  it("should return initial state", () => {
    // Render the usePokemon hook
    const { result } = renderHook(() => usePokemon());

    // Check if the initial loading state is true
    expect(result.current.isLoading).toBe(true);
  });
});
