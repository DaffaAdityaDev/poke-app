import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import { PokemonDetails } from "@/types/pokemon";

interface PokemonCardProps {
  pokemon: PokemonDetails;
  onClick: (pokemon: PokemonDetails) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  return (
    <Card isPressable onPress={() => onClick(pokemon)}>
      <CardBody className="p-0 flex justify-center items-center">
        <Image
          alt={pokemon.name}
          className="w-full h-48 object-contain"
          fallbackSrc="/placeholder-pokemon.png"
          src={pokemon.sprites.front_default || "/placeholder-pokemon.png"}
        />
      </CardBody>
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
