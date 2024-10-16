import React from "react";
import { NextPage } from "next";

import DefaultLayout from "@/layouts/default";
import PokemonCompare from "@/components/pokemon/PokemonCompare";
import { Head } from "@/components/Head";

// Define the ComparePage component as a Next.js page
const ComparePage: NextPage = () => {
  return (
    <DefaultLayout>
      {/* Set meta tags for SEO */}
      <Head
        description="Compare Pokémon stats and abilities side by side!"
        title="Pokémon Comparison"
      />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* Page title and description */}
        <div className="inline-block max-w-xl text-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Pokémon Comparison</h1>
          <p className="text-lg mb-8">
            Compare two Pokémon side by side to see their stats, abilities, and
            more!
          </p>
        </div>
        {/* Main comparison component */}
        <PokemonCompare />
      </section>
    </DefaultLayout>
  );
};

export default ComparePage;
