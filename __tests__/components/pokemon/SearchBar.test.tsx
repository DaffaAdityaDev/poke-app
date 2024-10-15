import React from "react";
import { render, screen } from "@testing-library/react";

import { SearchBar } from "@/components/pokemon/SearchBar";

describe("SearchBar", () => {
  // Test case to ensure the component renders without errors
  it("renders without crashing", () => {
    // Render the SearchBar component with empty callback functions
    render(
      <SearchBar currentSearch="" onReset={() => {}} onSearch={() => {}} />,
    );
    // Find the search input element by its label
    const inputElement = screen.getByLabelText("Search Pokémon");

    // Check if the input element is present in the document
    expect(inputElement).toBeInTheDocument();
    // Verify that the input has the correct placeholder text
    expect(inputElement).toHaveAttribute("placeholder", "Type to search...");
  });
});
