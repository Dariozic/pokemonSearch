import { useContext } from 'react';
import { PokemonContextType } from '../types/pokemonTypes';
import { PokemonContext } from '../context/PokemonContext';

export const usePokemon = (): PokemonContextType => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};
