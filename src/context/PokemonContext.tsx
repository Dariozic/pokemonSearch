import { createContext } from 'react';
import { PokemonContextType } from '../types/pokemonTypes';

export const PokemonContext = createContext<PokemonContextType | undefined>(
  undefined
);
