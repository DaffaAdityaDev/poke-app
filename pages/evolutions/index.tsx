import React from "react";
import { NextPage } from "next";

import DefaultLayout from "@/layouts/default";
import PokemonEvolution from "@/components/pokemon/PokemonEvolution";
import { Head } from "@/components/Head";

// Evolution page component
const EvolutionPage: NextPage = () => {
  return (
    <DefaultLayout>
      {/* Custom Head component for SEO */}
      <Head
        description="Explore Pokémon evolution chains and compare different stages."
        title="Pokémon Evolution"
      />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* Page title and description */}
        <div className="inline-block max-w-xl text-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Pokémon Evolution</h1>
          <p className="text-lg mb-8">
            Explore and compare Pokémon evolution chains and their different
            stages.
          </p>
        </div>
        {/* Main component for displaying Pokémon evolution */}
        <PokemonEvolution />
      </section>
    </DefaultLayout>
  );
};

export default EvolutionPage;
