import React from "react";
import { NextPage } from "next";

import DefaultLayout from "@/layouts/default";
import PokemonTypes from "@/components/pokemon/PokemonTypes";
import { Head } from "@/components/Head";

const TypesPage: NextPage = () => {
  return (
    <DefaultLayout>
      {/* Set metadata for the page */}
      <Head
        description="Explore and compare Pokémon types and their strengths/weaknesses."
        title="Pokémon Types"
      />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* Page title and description */}
        <div className="inline-block max-w-xl text-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Pokémon Types</h1>
          <p className="text-lg mb-8">
            Explore and compare different Pokémon types, their strengths, and
            weaknesses.
          </p>
        </div>
        {/* Component to display Pokémon types */}
        <PokemonTypes />
      </section>
    </DefaultLayout>
  );
};

export default TypesPage;
