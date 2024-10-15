import React from "react";
import { render, screen } from "@testing-library/react";

import { Pagination } from "@/components/pokemon/Pagination";

describe("Pagination", () => {
  // Test case to ensure the component renders without errors
  it("renders without crashing", () => {
    // Render the Pagination component with sample props
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />,
    );
    // Check if a navigation element is present in the rendered component
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
