import React from "react";
import { render, screen } from "@testing-library/react";

import IndexPage from "@/pages/index";

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

// Mock the PokemonList component
jest.mock("@/components/pokemon/PokemonList", () => ({
  __esModule: true,
  default: () => <div data-testid="pokemon-list">Mocked PokemonList</div>,
}));

describe("IndexPage", () => {
  it("renders without crashing", () => {
    render(<IndexPage />);

    // Check if the DefaultLayout is rendered
    expect(screen.getByTestId("default-layout")).toBeInTheDocument();

    // Check if the page title is rendered
    expect(screen.getByText("Pokémon Explorer")).toBeInTheDocument();

    // Check if the description is rendered
    expect(
      screen.getByText(
        "Discover and explore Pokémon from various generations!",
      ),
    ).toBeInTheDocument();

    // Check if the PokemonList component is rendered
    expect(screen.getByTestId("pokemon-list")).toBeInTheDocument();
  });
});
