import React from "react";
import { render, screen } from "@testing-library/react";

import PokemonCompare from "@/components/pokemon/PokemonCompare";
import { usePokemonDetails } from "@/hooks/pokemon/usePokemonDetails";
import useSearchPokemon from "@/hooks/search/useSearchPokemon";

// Mock the custom hooks
jest.mock("@/hooks/pokemon/usePokemonDetails");
jest.mock("@/hooks/search/useSearchPokemon");

const mockPokemon = {
  id: 25,
  name: "pikachu",
  sprites: {
    front_default: "https://example.com/pikachu.png",
  },
  stats: [
    { stat: { name: "hp" }, base_stat: 35 },
    { stat: { name: "attack" }, base_stat: 55 },
  ],
  types: [{ type: { name: "electric" } }],
  abilities: [{ ability: { name: "static" } }],
};

describe("PokemonCompare", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();

    // Mock the useSearchPokemon hook
    (useSearchPokemon as jest.Mock).mockReturnValue({
      inputValue: "",
      setInputValue: jest.fn(),
      items: [],
      isLoading: false,
      error: null,
    });

    // Mock the usePokemonDetails hook
    (usePokemonDetails as jest.Mock).mockReturnValue({
      pokemonDetails: null,
      detailsError: null,
    });
  });

  it("renders without crashing", () => {
    render(<PokemonCompare />);
    expect(screen.getByText("Select first Pokémon")).toBeInTheDocument();
    expect(screen.getByText("Select second Pokémon")).toBeInTheDocument();
  });

  it("displays loading state when fetching Pokemon data", async () => {
    (useSearchPokemon as jest.Mock).mockReturnValue({
      inputValue: "pikachu",
      setInputValue: jest.fn(),
      items: [{ name: "pikachu" }],
      isLoading: true,
      error: null,
    });

    render(<PokemonCompare />);
    expect(screen.getByText("Loading Pokémon data...")).toBeInTheDocument();
  });
});
