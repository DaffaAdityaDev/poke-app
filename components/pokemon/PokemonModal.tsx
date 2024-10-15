import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";

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

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Image
              alt={pokemon.name}
              className="w-full md:w-1/2 h-64 object-contain"
              src={pokemon.sprites.front_default}
            />
            <div className="flex flex-col gap-2">
              <p>
                <strong>Height:</strong> {pokemon.height / 10} m
              </p>
              <p>
                <strong>Weight:</strong> {pokemon.weight / 10} kg
              </p>
              <p>
                <strong>Types:</strong>{" "}
                {pokemon.types.map((t) => t.type.name).join(", ")}
              </p>
              <p>
                <strong>Abilities:</strong>{" "}
                {pokemon.abilities.map((a) => a.ability.name).join(", ")}
              </p>
              <div>
                <strong>Stats:</strong>
                <ul>
                  {pokemon.stats.map((stat) => (
                    <li key={stat.stat.name}>
                      {stat.stat.name}: {stat.base_stat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
