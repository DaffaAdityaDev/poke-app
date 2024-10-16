import { NextPage } from "next";

import DefaultLayout from "@/layouts/default";
import PokemonList from "@/components/pokemon/PokemonList";
import { Head } from "@/components/Head";


const IndexPage: NextPage = () => {
  return (
    // rovides a consistent layout structure for the page
    <DefaultLayout>
      {/* Sets the metadata for the page, including title and description */}
      <Head
        description="Discover and explore Pokémon from various generations!"
        title="Pokémon Explorer"
      />
      {/* Main content section */}
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* Header content */}
        <div className="inline-block max-w-xl text-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Pokémon Explorer</h1>
          <p className="text-lg mb-8">
            Discover and explore Pokémon from various generations!
          </p>
        </div>
        {/* The main component that displays the list of Pokémon */}
        <PokemonList />
      </section>
    </DefaultLayout>
  );
};

export default IndexPage;
