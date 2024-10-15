import React from "react";
import { render, screen } from "@testing-library/react";

import PokemonList from "@/components/pokemon/PokemonList";

// Mock the usePokemon hook to provide controlled test data
jest.mock("@/hooks/pokemon/usePokemon", () => ({
  usePokemon: () => ({
    pokemonList: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    searchQuery: "",
    handleSearch: jest.fn(),
    handlePageChange: jest.fn(),
    resetSearch: jest.fn(),
  }),
}));

describe("PokemonList", () => {
  // Test case to ensure the component renders without errors
  it("renders without crashing", () => {
    // Render the PokemonList component
    render(<PokemonList />);
    // Check if the "No Pokémon found" message is displayed when the list is empty
    expect(
      screen.getByText("No Pokémon found for the selected criteria."),
    ).toBeInTheDocument();
  });
});
