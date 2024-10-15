import { NextPage } from "next";

import DefaultLayout from "@/layouts/default";
import PokemonList from "@/components/pokemon/PokemonList";
import { Head } from "@/components/Head";

const IndexPage: NextPage = () => {
  return (
    <DefaultLayout>
      <Head
        description="Discover and explore Pokémon from various generations!"
        title="Pokémon Explorer"
      />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Pokémon Explorer</h1>
          <p className="text-lg mb-8">
            Discover and explore Pokémon from various generations!
          </p>
        </div>
        <PokemonList />
      </section>
    </DefaultLayout>
  );
};

export default IndexPage;
