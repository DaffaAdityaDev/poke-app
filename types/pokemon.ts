export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default?: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  height?: number;
  weight?: number;
  abilities?: {
    [x: string]: any;
    ability: {
      name: string;
    };
  }[];
  stats?: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  evolution_chain?: {
    chain: {
      species: {
        name: string;
      };
      evolves_to: any[];
    };
  };
  moves?: {
    move: {
      name: string;
    };
  }[];
}

export interface PokemonType {
  name: string;
  url: string;
  damage_relations?: {
    double_damage_from?: { name: string; url: string }[];
    double_damage_to?: { name: string; url: string }[];
    half_damage_from?: { name: string; url: string }[];
    half_damage_to?: { name: string; url: string }[];
    no_damage_from?: { name: string; url: string }[];
    no_damage_to?: { name: string; url: string }[];
  };
}

export interface EvolutionChain {
  species: {
    name: string;
    url: string;
  };
  evolution_details: {
    trigger: {
      name: string;
    };
    min_level?: number;
  }[];
  evolves_to: EvolutionChain[];
}

export interface PokemonAbility {
  name: string;
  effect_entries: {
    effect: string;
    language: {
      name: string;
    };
  }[];
  pokemon: {
    pokemon: {
      name: string;
    };
  }[];
}
