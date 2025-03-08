import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { PokemonContext } from '../context/PokemonContext';
import { Pokemon, PokemonProviderProps } from '../types/pokemonTypes';

export const PokemonProvider: React.FC<PokemonProviderProps> = ({
  children
}) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemons = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const cachedData = await AsyncStorage.getItem('pokemons');
      if (cachedData) {
        setPokemons(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=20'
      );
      const detailedPokemon = await Promise.all(
        response.data.results.map(async (pokemon: { url: string }) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );

      setPokemons(detailedPokemon);
      await AsyncStorage.setItem('pokemons', JSON.stringify(detailedPokemon));
    } catch (error) {
      setError('Failed to load Pokémon');
      console.error('Error fetching Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <PokemonContext.Provider
      value={{ pokemons, fetchPokemons, loading, error }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
