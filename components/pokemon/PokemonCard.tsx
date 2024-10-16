import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import { PokemonDetails } from "@/types/pokemon";

// Define props interface for PokemonCard
interface PokemonCardProps {
  pokemon: PokemonDetails;
  onClick: (pokemon: PokemonDetails) => void;
}

// PokemonCard component to display individual Pokemon information
const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  return (
    <Card isPressable onPress={() => onClick(pokemon)}>
      {/* Card body with Pokemon image */}
      <CardBody className="p-0 flex justify-center items-center">
        <Image
          alt={pokemon.name}
          className="w-full h-48 object-contain"
          fallbackSrc="/placeholder-pokemon.png"
          src={pokemon.sprites.front_default || "/placeholder-pokemon.png"}
        />
      </CardBody>
      {/* Card footer with Pokemon name and types */}
      <CardFooter className="flex flex-col items-start">
        <h2 className="text-lg font-semibold capitalize">{pokemon.name}</h2>
        <p className="text-sm text-gray-500">
          Types: {pokemon.types.map((type) => type.type.name).join(", ")}
        </p>
      </CardFooter>
    </Card>
  );
};

export default PokemonCard;
