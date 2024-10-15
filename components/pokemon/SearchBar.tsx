import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input
        aria-label="Search Pokémon"
        placeholder="Search Pokémon..."
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button aria-label="Search" disabled={!query.trim()} type="submit">
        Search
      </Button>
    </form>
  );
};
