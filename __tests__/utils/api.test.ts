import { getPokemonListUrl, getPokemonDetailsUrl } from '@/utils/api';

describe('API utility functions', () => {
  it('getPokemonListUrl returns correct URL', () => {
    expect(getPokemonListUrl(20, 0)).toBe('/pokemon?limit=20&offset=0');
  });

  it('getPokemonDetailsUrl returns correct URL', () => {
    expect(getPokemonDetailsUrl('pikachu')).toBe('/pokemon/pikachu');
  });
});