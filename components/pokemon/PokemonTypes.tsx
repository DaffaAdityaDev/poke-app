import React, { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Spinner } from "@nextui-org/spinner";
import { Chip } from "@nextui-org/chip";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";

import { usePokemonTypes } from "@/hooks/pokemon/usePokemonTypes";
import { PokemonType } from "@/types/pokemon";

const PokemonTypes: React.FC = () => {
  // Custom hook to fetch Pokemon types
  const { types, isLoading, error } = usePokemonTypes();
  // State to track selected types 
  const [selectedTypes, setSelectedTypes] = useState<any>([]);

  // Handler for selecting/deselecting types
  const handleTypeSelect = (type: PokemonType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t: PokemonType) => t !== type));
    } else if (selectedTypes.length < 2) {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // Helper function to render damage relations for a type
  const renderDamageRelations = (type: PokemonType, relation: string) => {
    const relations =
      type.damage_relations?.[relation as keyof typeof type.damage_relations] ??
      [];

    return relations.map((r: { name: string }) => (
      <Chip key={r.name} className="capitalize mr-1 mb-1" size="sm">
        {r.name}
      </Chip>
    ));
  };

  // Loading and error states
  if (isLoading) return <Spinner label="Loading types..." />;
  if (error) return <p>Error loading types. Please try again later.</p>;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Render selectable type chips */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {types.map((type) => (
          <Chip
            key={type.name}
            className="capitalize cursor-pointer"
            color={selectedTypes.includes(type) ? "primary" : "default"}
            onClick={() => handleTypeSelect(type)}
          >
            {type.name}
          </Chip>
        ))}
      </div>

      {/* Render comparison table if types are selected */}
      {selectedTypes.length > 0 ? (
        <Card>
          <CardBody>
            <div className="overflow-x-auto">
              <Table aria-label="Type comparison table" className="min-w-full">
                {/* Table header */}
                <TableHeader>
                  <TableColumn>Property</TableColumn>
                  {selectedTypes.map((type: any) => (
                    <TableColumn key={type.name} className="capitalize">
                      {type.name}
                    </TableColumn>
                  ))}
                </TableHeader>
                {/* Table body */}
                <TableBody>
                  {[
                    "double_damage_from",
                    "double_damage_to",
                    "half_damage_from",
                    "half_damage_to",
                    "no_damage_from",
                    "no_damage_to",
                  ].map((relation) => (
                    <TableRow key={relation}>
                      <TableCell className="capitalize whitespace-nowrap">
                        {relation.replace(/_/g, " ")}
                      </TableCell>
                      {selectedTypes.map((type: any) => (
                        <TableCell
                          key={`${type.name}-${relation}`}
                          className="max-w-xs overflow-hidden"
                        >
                          <div className="flex flex-wrap">
                            {renderDamageRelations(type, relation)}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardBody>
        </Card>
      ) : (
        // Prompt to select types if none are selected
        <p className="text-center">
          Select up to two types to compare their damage relations.
        </p>
      )}
    </div>
  );
};

export default PokemonTypes;
