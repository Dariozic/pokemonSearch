export const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  };

  return typeColors[type] || '#A8A878';
};

export const formatPokemonId = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatStatName = (statName: string): string => {
  const statMap: Record<string, string> = {
    hp: 'HP',
    attack: 'ATK',
    defense: 'DEF',
    'special-attack': 'SATK',
    'special-defense': 'SDEF',
    speed: 'SPD'
  };

  return statMap[statName] || statName.toUpperCase();
};

export const getMainMoves = (
  moves: { move: { name: string } }[],
  limit: number = 2
): string[] => {
  const formattedMoves: string[] = [];

  const limitedMoves = moves.slice(0, limit);

  for (const moveData of limitedMoves) {
    const moveName = moveData.move.name.split('-').map(capitalize).join('-');

    formattedMoves.push(moveName);
  }

  return formattedMoves;
};
