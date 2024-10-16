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

import { ChevronRightIcon } from "@/components/icons";
import {
  HeartIcon,
  FlashIcon,
  ShieldIcon,
  SwordIcon,
  SpeedIcon,
  TargetIcon,
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
        return "bg-gradient-to-r from-red-300 to-red-500";
      case "attack":
        return "bg-gradient-to-r from-orange-300 to-orange-500";
      case "defense":
        return "bg-gradient-to-r from-yellow-300 to-yellow-500";
      case "special-attack":
        return "bg-gradient-to-r from-blue-300 to-blue-500";
      case "special-defense":
        return "bg-gradient-to-r from-green-300 to-green-500";
      case "speed":
        return "bg-gradient-to-r from-purple-300 to-purple-500";
      default:
        return "bg-gradient-to-r from-gray-300 to-gray-500";
    }
  };

  const renderEvolutionChain = () => {
    if (!pokemon.evolution_chain) return null;

    const chain = pokemon.evolution_chain.chain;
    const evolutions: string[] = [];

    const getEvolutions = (chain: any) => {
      evolutions.push(chain.species.name);
      if (chain.evolves_to.length > 0) {
        getEvolutions(chain.evolves_to[0]);
      }
    };

    getEvolutions(chain);

    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Evolution Chain</h3>
        <div className="flex flex-wrap gap-2">
          {evolutions.map((name, index) => (
            <Chip key={name} color="primary">
              {name}
              {index < evolutions.length - 1 && (
                <ChevronRightIcon className="w-4 h-4 ml-1" />
              )}
            </Chip>
          ))}
        </div>
      </div>
    );
  };

  const renderMoves = () => {
    if (!pokemon.moves || pokemon.moves.length === 0) return null;

    return (
      <div className="mt-4 w-full">
        <h3 className="text-lg font-semibold mb-2">Moves</h3>
        <div className="flex flex-wrap gap-2">
          {pokemon.moves.slice(0, 5).map((move) => (
            <Chip key={move.move.name} className="flex-grow" color="secondary">
              {move.move.name}
            </Chip>
          ))}
        </div>
      </div>
    );
  };

  console.log(pokemon.stats);

  return (
    <Modal
      className="max-h-[90vh]"
      isOpen={isOpen}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      scrollBehavior="inside"
      size="2xl"
      onClose={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center">
              <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <div className="w-full h-92 md:h-48 md:w-1/2 flex justify-center items-center">
                  <img
                    alt={pokemon.name}
                    className="w-full h-full object-contain"
                    src={pokemon.sprites.front_default}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/2">
                  <p>
                    <strong>Height:</strong>{" "}
                    {pokemon.height ? `${pokemon.height / 10} m` : "Unknown"}
                  </p>
                  <p>
                    <strong>Weight:</strong>{" "}
                    {pokemon.weight ? `${pokemon.weight / 10} kg` : "Unknown"}
                  </p>
                  <p>
                    <strong>Types:</strong>{" "}
                    {pokemon.types.map((t) => t.type.name).join(", ")}
                  </p>
                  <p>
                    <strong>Abilities:</strong>{" "}
                    {pokemon.abilities?.map((a) => a.ability.name).join(", ") ||
                      "Unknown"}
                  </p>
                  <div className="w-full">
                    <strong className="text-lg mb-2 block">Stats:</strong>
                    {pokemon.stats?.map((stat) => (
                      <Tooltip
                        key={stat.stat.name}
                        content={`Base stat: ${stat.base_stat}`}
                      >
                        <div className="flex items-center justify-center mb-2">
                          <div className="w-8 mr-2">
                            {getStatIcon(stat.stat.name)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm mb-1 capitalize">
                              {stat.stat.name}
                            </p>
                            <Progress
                              aria-label={`${stat.stat.name} stat`}
                              classNames={{
                                base: "max-w-md",
                                indicator: `${getStatColor(stat.stat.name)} rounded-full`,
                              }}
                              color="default"
                              maxValue={255}
                              size="sm"
                              value={stat.base_stat}
                            />
                          </div>
                          <p className="text-sm flex items-center justify-center w-10 -mb-4">
                            {stat.base_stat}
                          </p>
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                  {renderEvolutionChain()}
                </div>
              </div>
              {renderMoves()}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={onClose}>
                Close
              </Button>
              {/* <Button
                color="primary"
                onPress={() => window.open(`/pokemon/${pokemon.id}`, '_blank')}
              >
                View Full Details
              </Button> */}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
