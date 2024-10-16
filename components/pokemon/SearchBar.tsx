import React, { useCallback, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";

import { useAutocomplete } from "@/hooks/search/useAutocomplete";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onReset: () => void;
  currentSearch: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onReset,
  currentSearch,
}) => {
  const { inputValue, setInputValue, suggestions, isLoading, error } =
    useAutocomplete(currentSearch);

  useEffect(() => {
    setInputValue(currentSearch);
  }, [currentSearch, setInputValue]);

  const handleSelectionChange = useCallback(
    (key: React.Key | null) => {
      if (key !== null) {
        onSearch(key.toString());
      }
    },
    [onSearch],
  );

  const handleInputChange = useCallback(
    (value: string) => {
      setInputValue(value);
      if (value === "") {
        onReset();
      }
    },
    [setInputValue, onReset],
  );

  return (
    <div className="flex items-center gap-2">
      <Autocomplete
        className="w-full"
        errorMessage={error}
        inputValue={inputValue}
        isLoading={isLoading}
        label="Search Pokémon"
        placeholder="Type to search..."
        onInputChange={handleInputChange}
        onSelectionChange={handleSelectionChange}
      >
        {suggestions.map((pokemon) => (
          <AutocompleteItem key={pokemon.name} textValue={pokemon.name}>
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-small">{pokemon.name}</span>
              </div>
            </div>
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Button color="primary" onClick={onReset}>
        Clear
      </Button>
    </div>
  );
};
