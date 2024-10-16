import React, { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/skeleton";

import PokemonEvolutionChain from "./PokemonEvolutionChain";

import useSearchPokemon from "@/hooks/search/useSearchPokemon";
import { usePokemonEvolution } from "@/hooks/pokemon/usePokemonEvolution";

const PokemonEvolution: React.FC = () => {
  // State for selected Pokémon and error handling
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Custom hook for Pokémon search functionality
  const {
    inputValue,
    setInputValue,
    items,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchPokemon();

  // Custom hook for fetching Pokémon evolution data
  const {
    evolutionChain,
    isLoading: isEvolutionLoading,
    error: evolutionError,
  } = usePokemonEvolution(selectedPokemon);

  // Handler for search submission
  const handleSearch = (value: string) => {
    setError(null);
    if (!value) {
      setError("Please select a Pokémon");

      return;
    }
    setSelectedPokemon(value);
  };

  // Handler for clearing the search
  const handleClear = () => {
    setError(null);
    setSelectedPokemon(null);
    setInputValue("");
  };

  // Function to render the appropriate content based on the current state
  const renderContent = () => {
    if (isEvolutionLoading) {
      return (
        <Card className="w-full max-w-3xl mx-auto">
          <CardBody>
            <Skeleton className="rounded-lg">
              <div className="h-72 rounded-lg bg-default-300" />
            </Skeleton>
          </CardBody>
        </Card>
      );
    }

    if (evolutionError) {
      return (
        <Card className="w-full max-w-3xl mx-auto">
          <CardBody>
            <p className="text-danger text-center mb-4">
              {evolutionError.message}
            </p>
            <Button className="mx-auto" color="primary" onClick={handleClear}>
              Try Again
            </Button>
          </CardBody>
        </Card>
      );
    }

    if (!evolutionChain) {
      return (
        <Card className="w-full max-w-3xl mx-auto">
          <CardBody>
            <p className="text-center">
              No evolution data available for this Pokémon.
            </p>
          </CardBody>
        </Card>
      );
    }

    return <PokemonEvolutionChain chain={evolutionChain} />;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Card className="mb-8">
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <Autocomplete
              className="flex-grow"
              errorMessage={searchError?.message || error}
              inputValue={inputValue}
              isLoading={isSearchLoading}
              label="Search Pokémon"
              placeholder="Enter a Pokémon name"
              onInputChange={(value) => {
                setInputValue(value);
                setError(null);
              }}
              onSelectionChange={(value) => handleSearch(value as string)}
            >
              {items.map((item) => (
                <AutocompleteItem key={item.name} value={item.name}>
                  {item.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            <Button
              className="mt-2 sm:mt-0"
              color="primary"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Render evolution chain or prompt message */}
      {selectedPokemon ? (
        renderContent()
      ) : (
        <p className="text-center">
          Select a Pokémon to view its evolution chain.
        </p>
      )}
    </div>
  );
};

export default PokemonEvolution;
