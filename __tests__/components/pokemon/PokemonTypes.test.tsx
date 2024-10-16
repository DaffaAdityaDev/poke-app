import React from "react";
import { render, screen } from "@testing-library/react";

import PokemonTypes from "@/components/pokemon/PokemonTypes";
import { usePokemonTypes } from "@/hooks/pokemon/usePokemonTypes";

// Mock the usePokemonTypes hook
jest.mock("@/hooks/pokemon/usePokemonTypes");

describe("PokemonTypes", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  it("renders loading state", () => {
    (usePokemonTypes as jest.Mock).mockReturnValue({
      types: [],
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    render(<PokemonTypes />);
    expect(screen.getByText("Loading types...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    const mockError = "Error loading types. Please try again later.";

    (usePokemonTypes as jest.Mock).mockReturnValue({
      types: [],
      isLoading: false,
      error: mockError,
      refetch: jest.fn(),
    });

    render(<PokemonTypes />);
    expect(screen.getByText(mockError)).toBeInTheDocument();
  });

  it("renders empty state", () => {
    (usePokemonTypes as jest.Mock).mockReturnValue({
      types: [],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<PokemonTypes />);
    expect(
      screen.getByText(
        "Select up to two types to compare their damage relations.",
      ),
    ).toBeInTheDocument();
  });

  it("renders types list", () => {
    const mockTypes = [
      { name: "fire", damage_relations: {} },
      { name: "water", damage_relations: {} },
    ];

    (usePokemonTypes as jest.Mock).mockReturnValue({
      types: mockTypes,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<PokemonTypes />);
    expect(screen.getByText("fire")).toBeInTheDocument();
    expect(screen.getByText("water")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Select up to two types to compare their damage relations.",
      ),
    ).toBeInTheDocument();
  });
});
