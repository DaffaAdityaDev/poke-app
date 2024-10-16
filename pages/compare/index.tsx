import React from "react";
import { NextPage } from "next";

import DefaultLayout from "@/layouts/default";
import PokemonCompare from "@/components/pokemon/PokemonCompare";
import { Head } from "@/components/Head";

const ComparePage: NextPage = () => {
  return (
    <DefaultLayout>
      <Head
        description="Compare Pokémon stats and abilities side by side!"
        title="Pokémon Comparison"
      />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Pokémon Comparison</h1>
          <p className="text-lg mb-8">
            Compare two Pokémon side by side to see their stats, abilities, and
            more!
          </p>
        </div>
        <PokemonCompare />
      </section>
    </DefaultLayout>
  );
};

export default ComparePage;
