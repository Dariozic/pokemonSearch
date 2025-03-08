import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ReactNode } from 'react';

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  moves: {
    move: {
      name: string;
    };
  }[];
}

export interface PokemonDetails {
  weight: number;
  height: number;
  types: { type: { name: string } }[];
  sprites: {
    front_default: string;
    other: { 'official-artwork': { front_default: string } };
  };
}

export interface PokemonCardProps {
  pokemon: Pokemon;
  onPress: () => void;
}

export interface PokemonDetailsProps {
  route: PokemonDetailsRouteProp;
}

export type RootStackParamList = {
  PokemonScreen: undefined;
  PokemonDetails: {
    pokemon: Pokemon;
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

export interface PokemonContextType {
  pokemons: Pokemon[];
  fetchPokemons: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export interface PokemonProviderProps {
  children: ReactNode;
}
