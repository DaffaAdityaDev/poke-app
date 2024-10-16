import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Pagination } from "@nextui-org/pagination";

import { usePokemonAbilities } from "@/hooks/pokemon/usePokemonAbilities";

const PokemonAbilities: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { abilities, isLoading, error, totalPages, totalAbilities } =
    usePokemonAbilities(searchQuery, currentPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center">
          <Spinner label="Loading abilities..." />
        </div>
      );
    }

    if (error) {
      return (
        <Card>
          <CardBody>
            <p className="text-center text-red-500">Error: {error.message}</p>
          </CardBody>
        </Card>
      );
    }

    if (abilities.length === 0) {
      return (
        <Card>
          <CardBody>
            <p className="text-center">
              No abilities found. Try a different search term.
            </p>
          </CardBody>
        </Card>
      );
    }

    return (
      <>
        <Accordion>
          {abilities.map((ability) => (
            <AccordionItem key={ability.name} title={ability.name}>
              <p>
                {ability.effect_entries.find(
                  (entry) => entry.language.name === "en",
                )?.effect || "No effect description available."}
              </p>
              <h4 className="mt-4 font-semibold">Pokémon with this ability:</h4>
              <ul className="list-disc list-inside">
                {ability.pokemon.map((pokemon) => (
                  <li key={pokemon.pokemon.name}>{pokemon.pokemon.name}</li>
                ))}
              </ul>
            </AccordionItem>
          ))}
        </Accordion>
        <Pagination
          className="mt-4 flex justify-center"
          initialPage={currentPage}
          total={totalPages}
          onChange={handlePageChange}
        />
      </>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Card className="mb-8">
        <CardBody>
          <form
            className="flex flex-col items-center sm:flex-row gap-4"
            onSubmit={handleSearch}
          >
            <Input
              className="flex-grow"
              label="Search Abilities"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button color="primary" isLoading={isLoading} type="submit">
              Search
            </Button>
          </form>
        </CardBody>
      </Card>

      {renderContent()}

      {totalAbilities > 0 && (
        <p className="text-center mt-4">
          Showing {abilities.length} of {totalAbilities} abilities
        </p>
      )}
    </div>
  );
};

export default PokemonAbilities;
