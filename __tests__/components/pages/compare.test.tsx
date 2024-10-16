import React from "react";
import { render, screen } from "@testing-library/react";

import ComparePage from "@/pages/compare";

// Mock the DefaultLayout component
jest.mock("@/layouts/default", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock the Head component
jest.mock("@/components/Head", () => ({
  Head: () => null,
}));

// Mock the PokemonCompare component
jest.mock("@/components/pokemon/PokemonCompare", () => ({
  __esModule: true,
  default: () => <div data-testid="pokemon-compare">Mocked PokemonCompare</div>,
}));

describe("ComparePage", () => {
  it("renders without crashing", () => {
    render(<ComparePage />);

    // Check if the page title is rendered
    expect(screen.getByText("Pokémon Comparison")).toBeInTheDocument();

    // Check if the description is rendered
    expect(
      screen.getByText(
        "Compare two Pokémon side by side to see their stats, abilities, and more!",
      ),
    ).toBeInTheDocument();

    // Check if the PokemonCompare component is rendered
    expect(screen.getByTestId("pokemon-compare")).toBeInTheDocument();
  });
});
