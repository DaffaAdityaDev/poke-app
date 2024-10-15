import React, { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";

import { SearchBar } from "./SearchBar";
import { Pagination } from "./Pagination";
import { PokemonModal } from "./PokemonModal";
import PokemonCard from "./PokemonCard";

import { usePokemon } from "@/hooks/pokemon/usePokemon";
import { PokemonDetails } from "@/types/pokemon";

const PokemonList: React.FC = () => {
  const {
    pokemonList,
    isLoading,
    error,
    currentPage,
    totalPages,
    searchQuery,
    handleSearch,
    handlePageChange,
    resetSearch,
  } = usePokemon();

  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (pokemon: PokemonDetails) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner
          color="primary"
          label="Loading Pokémon..."
          labelColor="primary"
        />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto">
        <CardBody>
          <h2 className="text-lg font-semibold text-red-500 mb-2">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <Button color="primary" onClick={resetSearch}>
            Clear Search and Retry
          </Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <SearchBar
        currentSearch={searchQuery}
        onReset={resetSearch}
        onSearch={handleSearch}
      />
      {pokemonList?.length === 0 || !pokemonList ? (
        <Card className="max-w-md mx-auto mt-8">
          <CardBody>
            <p className="text-lg mb-4">
              No Pokémon found for the selected criteria.
            </p>
            <Button color="primary" onClick={resetSearch}>
              Clear Search
            </Button>
          </CardBody>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {pokemonList.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onClick={handleCardClick}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      <PokemonModal
        isOpen={isModalOpen}
        pokemon={selectedPokemon}
        onClose={closeModal}
      />
    </div>
  );
};

export default PokemonList;
