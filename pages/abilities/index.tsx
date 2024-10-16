import React from "react";
import { NextPage } from "next";

import DefaultLayout from "@/layouts/default";
import PokemonAbilities from "@/components/pokemon/PokemonAbilities";
import { Head } from "@/components/Head";

// Define the AbilitiesPage component as a Next.js page
const AbilitiesPage: NextPage = () => {
  return (
    <DefaultLayout>
      {/* Set metadata for the page */}
      <Head
        description="Explore Pokémon abilities and their effects in battle."
        title="Pokémon Abilities"
      />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* Page title and description */}
        <div className="inline-block max-w-xl text-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Pokémon Abilities</h1>
          <p className="text-lg mb-8">
            Discover and learn about various Pokémon abilities and their effects
            in battle.
          </p>
        </div>
        {/* Component to display Pokémon abilities */}
        <PokemonAbilities />
      </section>
    </DefaultLayout>
  );
};

export default AbilitiesPage;
