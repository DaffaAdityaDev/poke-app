import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Progress } from "@nextui-org/progress";
import { Tooltip } from "@nextui-org/tooltip";
import { Chip } from "@nextui-org/chip";

import {
  HeartIcon,
  FlashIcon,
  ShieldIcon,
  SwordIcon,
  SpeedIcon,
  TargetIcon,
  InfoIcon,
} from "@/components/icons";
import { PokemonDetails } from "@/types/pokemon";

interface PokemonModalProps {
  pokemon: PokemonDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PokemonModal: React.FC<PokemonModalProps> = ({
  pokemon,
  isOpen,
  onClose,
}) => {
  if (!pokemon) return null;

  const getStatIcon = (statName: string) => {
    switch (statName) {
      case "hp":
        return <HeartIcon className="text-danger" />;
      case "attack":
        return <SwordIcon className="text-warning" />;
      case "defense":
        return <ShieldIcon className="text-success" />;
      case "special-attack":
        return <FlashIcon className="text-secondary" />;
      case "special-defense":
        return <TargetIcon className="text-primary" />;
      case "speed":
        return <SpeedIcon className="text-info" />;
      default:
        return null;
    }
  };

  const getStatColor = (statName: string) => {
    switch (statName) {
      case "hp":
        return "danger";
      case "attack":
        return "warning";
      case "defense":
        return "success";
      case "special-attack":
        return "secondary";
      case "special-defense":
        return "primary";
      case "speed":
        return "info";
      default:
        return "default";
    }
  };

  const renderMoves = () => {
    if (!pokemon.moves || pokemon.moves.length === 0) return null;

    return (
      <div className="mt-4 w-full">
        <h3 className="text-lg font-semibold mb-2">Moves</h3>
        <div className="flex flex-wrap gap-2">
          {pokemon.moves.slice(0, 10).map((move) => (
            <Chip key={move.move.name} className="capitalize" variant="flat">
              {move.move.name}
            </Chip>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} scrollBehavior="inside" size="2xl" onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col items-center">
            <img
              alt={pokemon.name}
              className="w-48 h-48 object-contain mb-4"
              src={pokemon.sprites.front_default}
            />
            <div className="w-full">
              <h3 className="text-xl font-semibold mb-2">Stats</h3>
              {pokemon.stats?.map((stat) => (
                <Tooltip
                  key={stat.stat.name}
                  content={`Base stat: ${stat.base_stat}`}
                >
                  <div className="flex items-center mb-2">
                    <div className="w-8 mr-2">
                      {getStatIcon(stat.stat.name)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm capitalize">
                          {stat.stat.name}
                        </span>
                        <span className="text-sm font-semibold">
                          {stat.base_stat}
                        </span>
                      </div>
                      <Progress
                        color={
                          getStatColor(stat.stat.name) as
                            | "default"
                            | "danger"
                            | "warning"
                            | "success"
                            | "secondary"
                            | "primary"
                        }
                        maxValue={255}
                        size="sm"
                        value={stat.base_stat}
                      />
                    </div>
                  </div>
                </Tooltip>
              ))}
            </div>
            <div className="w-full mt-4">
              <h3 className="text-xl font-semibold mb-2">Types</h3>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <Chip
                    key={type.type.name}
                    className="capitalize"
                    color="primary"
                  >
                    {type.type.name}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="w-full mt-4">
              <h3 className="text-xl font-semibold mb-2">Abilities</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities?.map((ability) => (
                  <Chip
                    key={ability.ability.name}
                    className="capitalize"
                    color={ability.is_hidden ? "secondary" : "default"}
                    variant="flat"
                  >
                    {ability.ability.name}
                  </Chip>
                ))}
              </div>
            </div>
            {renderMoves()}
            <div className="w-full mt-4 flex items-center">
              <InfoIcon className="mr-2" />
              <span className="text-sm">
                Height: {pokemon.height ? `${pokemon.height / 10}m` : "N/A"} |
                Weight: {pokemon.weight ? `${pokemon.weight / 10}kg` : "N/A"}
              </span>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
