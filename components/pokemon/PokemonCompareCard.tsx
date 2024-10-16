import React from "react";
import { Progress } from "@nextui-org/progress";
import { Chip } from "@nextui-org/chip";

import { PokemonDetails } from "@/types/pokemon";

interface PokemonCompareCardProps {
  pokemon: PokemonDetails;
}

const PokemonCompareCard: React.FC<PokemonCompareCardProps> = ({ pokemon }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 capitalize">{pokemon.name}</h2>
      <img
        alt={pokemon.name}
        className="mb-4"
        height={200}
        src={pokemon.sprites.front_default}
        width={200}
      />
      <div className="w-full">
        <h3 className="text-xl font-semibold mb-2">Stats</h3>
        {pokemon.stats?.map((stat) => (
          <div key={stat.stat.name} className="mb-2">
            <div className="flex justify-between mb-1">
              <span className="capitalize">{stat.stat.name}</span>
              <span>{stat.base_stat}</span>
            </div>
            <Progress
              className="h-2"
              color="primary"
              maxValue={255}
              value={stat.base_stat}
            />
          </div>
        ))}
      </div>
      <div className="w-full mt-4">
        <h3 className="text-xl font-semibold mb-2">Types</h3>
        <div className="flex gap-2">
          {pokemon.types.map((type) => (
            <Chip key={type.type.name} className="capitalize" color="primary">
              {type.type.name}
            </Chip>
          ))}
        </div>
      </div>
      <div className="w-full mt-4">
        <h3 className="text-xl font-semibold mb-2">Abilities</h3>
        <ul className="list-disc list-inside">
          {pokemon.abilities?.map((ability) => (
            <li key={ability.ability.name} className="capitalize">
              {ability.ability.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonCompareCard;
