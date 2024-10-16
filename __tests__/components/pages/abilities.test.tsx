import React from "react";
import { render, screen } from "@testing-library/react";

import AbilitiesPage from "@/pages/abilities";

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

// Mock the PokemonAbilities component
jest.mock("@/components/pokemon/PokemonAbilities", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="pokemon-abilities">Mocked PokemonAbilities</div>
  ),
}));

describe("AbilitiesPage", () => {
  it("renders without crashing", () => {
    render(<AbilitiesPage />);

    // Check if the DefaultLayout is rendered
    expect(screen.getByTestId("default-layout")).toBeInTheDocument();

    // Check if the page title is rendered
    expect(screen.getByText("Pokémon Abilities")).toBeInTheDocument();

    // Check if the description is rendered
    expect(
      screen.getByText(
        "Discover and learn about various Pokémon abilities and their effects in battle.",
      ),
    ).toBeInTheDocument();

    // Check if the PokemonAbilities component is rendered
    expect(screen.getByTestId("pokemon-abilities")).toBeInTheDocument();
  });
});
