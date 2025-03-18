import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { PokemonContext } from '../context/PokemonContext';
import { BasicPokemon, PokemonDetail } from '../types/pokemonTypes';

const PAGE_SIZE = 20;
const POKEMON_LIST_CACHE = 'pokemon_list';
const POKEMON_DETAILS_CACHE = 'pokemon_details';

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [pokemonList, setPokemonList] = useState<BasicPokemon[]>([]);
  const [detailsCache, setDetailsCache] = useState<
    Record<number, PokemonDetail>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchAllPokemon = async () => {
    try {
      setLoading(true);
      setError(null);

      const cachedList = await AsyncStorage.getItem(POKEMON_LIST_CACHE);
      if (cachedList) {
        setPokemonList(JSON.parse(cachedList));
        setLoading(false);
        return;
      }

      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=1500'
      );
      const basicPokemonList = await Promise.all(
        response.data.results.map(async (pokemon: any, index: number) => {
          const detailResponse = await axios.get(pokemon.url);
          return {
            id: index + 1,
            name: pokemon.name,
            image: detailResponse.data.sprites.front_default,
            types: detailResponse.data.types.map((t: any) => t.type.name)
          };
        })
      );

      setPokemonList(basicPokemonList);
      await AsyncStorage.setItem(
        POKEMON_LIST_CACHE,
        JSON.stringify(basicPokemonList)
      );
    } catch (error) {
      setError('Failed to load Pokémon list');
      console.error('Error fetching Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPokemonDetails = async (id: number): Promise<PokemonDetail> => {
    if (detailsCache[id]) {
      return detailsCache[id];
    }

    const cachedDetails = await AsyncStorage.getItem(
      `${POKEMON_DETAILS_CACHE}_${id}`
    );
    if (cachedDetails) {
      const details = JSON.parse(cachedDetails);
      setDetailsCache((prev) => ({ ...prev, [id]: details }));
      return details;
    }

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const rawData = response.data;

      const details: PokemonDetail = {
        id: rawData.id,
        name: rawData.name,
        height: rawData.height,
        weight: rawData.weight,
        types: rawData.types.map((t: any) => ({
          slot: t.slot,
          type: {
            name: t.type.name,
            url: t.type.url
          }
        })),
        sprites: {
          front_default: rawData.sprites.front_default,
          other: {
            'official-artwork': {
              front_default:
                rawData.sprites.other['official-artwork'].front_default
            }
          }
        },
        stats: rawData.stats.map((s: any) => ({
          base_stat: s.base_stat,
          stat: {
            name: s.stat.name
          }
        })),
        moves: rawData.moves.map((m: any) => ({
          move: {
            name: m.move.name
          }
        }))
      };

      setDetailsCache((prev) => ({ ...prev, [id]: details }));
      await AsyncStorage.setItem(
        `${POKEMON_DETAILS_CACHE}_${id}`,
        JSON.stringify(details)
      );

      return details;
    } catch (error) {
      throw new Error('Failed to load Pokémon details ' + error);
    }
  };

  const nextPage = () => {
    if ((currentPage + 1) * PAGE_SIZE < pokemonList.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  const paginatedPokemon = pokemonList.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );

  return (
    <PokemonContext.Provider
      value={{
        pokemonList: paginatedPokemon,
        allPokemonList: pokemonList,
        loading,
        error,
        getPokemonDetails,
        currentPage,
        totalPages: Math.ceil(pokemonList.length / PAGE_SIZE),
        nextPage,
        previousPage,
        setCurrentPage
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
