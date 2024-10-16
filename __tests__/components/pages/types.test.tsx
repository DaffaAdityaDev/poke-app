import React from "react";
import { render, screen } from "@testing-library/react";

import TypesPage from "@/pages/types";

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

// Mock the PokemonTypes component
jest.mock("@/components/pokemon/PokemonTypes", () => ({
  __esModule: true,
  default: () => <div data-testid="pokemon-types">Mocked PokemonTypes</div>,
}));

describe("TypesPage", () => {
  it("renders without crashing", () => {
    render(<TypesPage />);

    // Check if the DefaultLayout is rendered
    expect(screen.getByTestId("default-layout")).toBeInTheDocument();

    // Check if the page title is rendered
    expect(screen.getByText("Pokémon Types")).toBeInTheDocument();

    // Check if the description is rendered
    expect(
      screen.getByText(
        "Explore and compare different Pokémon types, their strengths, and weaknesses.",
      ),
    ).toBeInTheDocument();

    // Check if the PokemonTypes component is rendered
    expect(screen.getByTestId("pokemon-types")).toBeInTheDocument();
  });
});
