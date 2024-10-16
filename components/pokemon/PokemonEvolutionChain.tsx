import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";

import { ArrowRightIcon } from "@/components/icons";
import { EvolutionChain } from "@/types/pokemon";

interface PokemonEvolutionChainProps {
  chain: EvolutionChain;
}

const PokemonEvolutionChain: React.FC<PokemonEvolutionChainProps> = ({
  chain,
}) => {
  const renderEvolutionStage = (stage: EvolutionChain) => {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Card className="w-32 h-32 sm:w-40 sm:h-40 hover:shadow-lg transition-shadow duration-200">
          <CardBody className="flex items-center justify-center p-2">
            <Image
              alt={stage.species.name}
              className="object-contain"
              height={100}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${stage.species.url.split("/")[6]}.png`}
              width={100}
            />
          </CardBody>
        </Card>
        <p className="mt-2 text-center capitalize text-sm sm:text-base">
          {stage.species.name}
        </p>

        <Chip
          className={`mt-1 text-xs sm:text-sm ${
            stage?.evolution_details[0]?.trigger?.name === "level-up"
              ? ""
              : "opacity-0"
          }`}
          color={
            stage?.evolution_details[0]?.trigger?.name === "level-up"
              ? "success"
              : "default"
          }
          size="sm"
        >
          {stage?.evolution_details[0]?.trigger?.name}
          {stage?.evolution_details[0]?.min_level &&
            ` (Lvl ${stage?.evolution_details[0]?.min_level})`}
        </Chip>
      </div>
    );
  };

  const renderEvolutionChain = (chain: EvolutionChain) => {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        {renderEvolutionStage(chain)}
        {chain.evolves_to.length > 0 && (
          <>
            <ArrowRightIcon className="hidden sm:block mx-2 text-2xl" />
            <div className="sm:hidden w-0.5 h-8 bg-gray-300" />
            {renderEvolutionChain(chain.evolves_to[0])}
          </>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardBody>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6">Evolution Chain</h2>
          {renderEvolutionChain(chain)}
        </div>
      </CardBody>
    </Card>
  );
};

export default PokemonEvolutionChain;
