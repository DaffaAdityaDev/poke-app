import React from "react";
import { render, screen } from "@testing-library/react";

import PokemonCompareCard from "@/components/pokemon/PokemonCompareCard";

const mockPokemon = {
  name: "Pikachu",
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

describe("PokemonCompareCard", () => {
  it("renders Pokemon details correctly", () => {
    const pokemonWithId = { ...mockPokemon, id: 25 }; // Add id to the mock Pokemon

    render(<PokemonCompareCard pokemon={pokemonWithId} />);

    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByAltText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText("Stats")).toBeInTheDocument();
    expect(screen.getByText("hp")).toBeInTheDocument();
    expect(screen.getByText("35")).toBeInTheDocument();
    expect(screen.getByText("attack")).toBeInTheDocument();
    expect(screen.getByText("55")).toBeInTheDocument();
    expect(screen.getByText("Types")).toBeInTheDocument();
    expect(screen.getByText("electric")).toBeInTheDocument();
    expect(screen.getByText("Abilities")).toBeInTheDocument();
    expect(screen.getByText("static")).toBeInTheDocument();
  });
});
