import React from "react";
import { NextPage } from "next";

import DefaultLayout from "@/layouts/default";
import PokemonAbilities from "@/components/pokemon/PokemonAbilities";
import { Head } from "@/components/Head";

const AbilitiesPage: NextPage = () => {
  return (
    <DefaultLayout>
      <Head
        description="Explore Pokémon abilities and their effects in battle."
        title="Pokémon Abilities"
      />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Pokémon Abilities</h1>
          <p className="text-lg mb-8">
            Discover and learn about various Pokémon abilities and their effects
            in battle.
          </p>
        </div>
        <PokemonAbilities />
      </section>
    </DefaultLayout>
  );
};

export default AbilitiesPage;
