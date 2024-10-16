import React from "react";
import { render, screen } from "@testing-library/react";

import EvolutionPage from "@/pages/evolutions";

// Mock the DefaultLayout component
jest.mock("@/layouts/default", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="default-layout">{children}</div>
  ),
}));

// Mock the Head component
jest.mock("@/components/Head", () => ({
  Head: () => null,
}));

// Mock the PokemonEvolution component
jest.mock("@/components/pokemon/PokemonEvolution", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="pokemon-evolution">Mocked PokemonEvolution</div>
  ),
}));

describe("EvolutionPage", () => {
  it("renders without crashing", () => {
    render(<EvolutionPage />);

    // Check if the DefaultLayout is rendered
    expect(screen.getByTestId("default-layout")).toBeInTheDocument();

    // Check if the page title is rendered
    expect(screen.getByText("Pokémon Evolution")).toBeInTheDocument();

    // Check if the description is rendered
    expect(
      screen.getByText(
        "Explore and compare Pokémon evolution chains and their different stages.",
      ),
    ).toBeInTheDocument();

    // Check if the PokemonEvolution component is rendered
    expect(screen.getByTestId("pokemon-evolution")).toBeInTheDocument();
  });
});
