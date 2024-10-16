import React, { useState, useCallback } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Spinner } from "@nextui-org/spinner";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

import PokemonCompareCard from "./PokemonCompareCard";

import useSearchPokemon from "@/hooks/search/useSearchPokemon";
import { usePokemonDetails } from "@/hooks/pokemon/usePokemonDetails";
import { PokemonDetails } from "@/types/pokemon";

const PokemonCompare: React.FC = () => {
  const [selectedPokemon1, setSelectedPokemon1] = useState<string | null>(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState<string | null>(null);

  const {
    inputValue: input1,
    setInputValue: setInput1,
    items: items1,
    isLoading: isLoading1,
    error: searchError1,
  } = useSearchPokemon();
  const {
    inputValue: input2,
    setInputValue: setInput2,
    items: items2,
    isLoading: isLoading2,
    error: searchError2,
  } = useSearchPokemon();

  const { pokemonDetails: details1, detailsError: error1 } = usePokemonDetails(
    selectedPokemon1 ? { results: [{ name: selectedPokemon1 }] } : null,
    selectedPokemon1 || "",
  );
  const { pokemonDetails: details2, detailsError: error2 } = usePokemonDetails(
    selectedPokemon2 ? { results: [{ name: selectedPokemon2 }] } : null,
    selectedPokemon2 || "",
  );

  // const handleCompare = useCallback(() => {
  //   // Trigger comparison or any additional logic if needed
  // }, []);

  const renderPokemonDetails = useCallback(
    (pokemon: PokemonDetails | null, error: any, isSelected: boolean) => {
      if (!isSelected) {
        return <p>Select a Pokémon to compare</p>;
      }
      if (error) {
        return (
          <p className="text-red-500">
            Error loading Pokémon details: {error.message}
          </p>
        );
      }
      if (!pokemon) {
        return <p>Loading Pokémon details...</p>;
      }

      return <PokemonCompareCard pokemon={pokemon} />;
    },
    [],
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Autocomplete
          className="w-full"
          data-testid="pokemon-input-1"
          errorMessage={searchError1?.message}
          inputValue={input1}
          isLoading={isLoading1}
          label="Select first Pokémon"
          placeholder="Type to search"
          onInputChange={setInput1}
          onSelectionChange={(value) => setSelectedPokemon1(value as string)}
        >
          {items1.map((item) => (
            <AutocompleteItem key={item.name} value={item.name}>
              {item.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          className="w-full"
          errorMessage={searchError2?.message}
          inputValue={input2}
          isLoading={isLoading2}
          label="Select second Pokémon"
          placeholder="Type to search"
          onInputChange={setInput2}
          onSelectionChange={(value) => setSelectedPokemon2(value as string)}
        >
          {items2.map((item) => (
            <AutocompleteItem key={item.name} value={item.name}>
              {item.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
      {/* <Button
        color="primary"
        onClick={handleCompare}
        disabled={isCompareDisabled}
        className="mb-8"
      >
        Compare
      </Button> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {isLoading1 || isLoading2 ? (
          <Spinner color="primary" label="Loading Pokémon data..." />
        ) : (
          <>
            <Card>
              <CardBody>
                {renderPokemonDetails(
                  details1?.[0] || null,
                  error1,
                  !!selectedPokemon1,
                )}
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                {renderPokemonDetails(
                  details2?.[0] || null,
                  error2,
                  !!selectedPokemon2,
                )}
              </CardBody>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonCompare;
