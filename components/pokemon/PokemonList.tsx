import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Spinner } from "@nextui-org/spinner";

import { SearchBar } from "./SearchBar";
import { Pagination } from "./Pagination";

import { usePokemon } from "@/hooks/usePokemon";

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
  } = usePokemon();

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
          <h2 className="text-lg font-semibold text-red-500 mb-2">
            {error.includes("not found") ? "Pokémon Not Found" : "Error"}
          </h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <Button color="primary" onClick={() => handleSearch("")}>
            Clear Search and Retry
          </Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <SearchBar onSearch={handleSearch} />
      {pokemonList.length === 0 && searchQuery ? (
        <Card className="max-w-md mx-auto mt-8">
          <CardBody>
            <p className="text-lg mb-4">
              No Pokémon found for &quot;{searchQuery}&quot;
            </p>
            <Button color="primary" onClick={() => handleSearch("")}>
              Clear Search
            </Button>
          </CardBody>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {pokemonList.map((pokemon) => (
              <Card key={pokemon.id} isPressable>
                <CardBody className="p-0">
                  <Image
                    alt={pokemon.name}
                    className="w-full h-48 object-contain"
                    fallbackSrc="/placeholder-pokemon.png"
                    src={pokemon.sprites.front_default}
                  />
                </CardBody>
                <CardFooter className="flex flex-col items-start">
                  <h2 className="text-lg font-semibold capitalize">
                    {pokemon.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Types:{" "}
                    {pokemon.types.map((type) => type.type.name).join(", ")}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
          {!searchQuery && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PokemonList;
