import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ReactNode } from 'react';

export interface BasicPokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{
    slot: number;
    type: { name: string; url: string };
  }>;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': { front_default: string };
    };
  };
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  moves: Array<{ move: { name: string } }>;
}

export interface PokemonContextType {
  pokemonList: BasicPokemon[];
  allPokemonList: BasicPokemon[];
  loading: boolean;
  error: string | null;
  getPokemonDetails: (id: number) => Promise<PokemonDetail>;
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  previousPage: () => void;
  setCurrentPage: (page: number) => void;
}

export interface PokemonCardProps {
  pokemon: BasicPokemon;
  onPress: () => void;
}

export interface PokemonDetailsProps {
  route: PokemonDetailsRouteProp;
}

export type RootStackParamList = {
  PokemonScreen: undefined;
  PokemonDetails: {
    pokemon: BasicPokemon;
  };
};

export type PokemonDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PokemonDetails'
>;

export type PokemonDetailsRouteProp = RouteProp<
  RootStackParamList,
  'PokemonDetails'
>;

export interface PokemonProviderProps {
  children: ReactNode;
}
