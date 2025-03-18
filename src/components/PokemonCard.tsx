import { View, Text, Image, TouchableOpacity } from 'react-native';
import { PokemonCardProps } from '../types/pokemonTypes';
import {
  getTypeColor,
  formatPokemonId,
  capitalize
} from '../utils/pokemonUtils';
import styles from '../styles/PokemonCard.styles';

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onPress
}) => {
  const mainType = pokemon.types[0] || 'normal';
  const cardBackgroundColor = `${getTypeColor(mainType)}40`;

  return (
    <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
      <TouchableOpacity
        style={styles.cardTouchable}
        onPress={onPress}
        activeOpacity={0.7}
        testID="pokemon-card"
      >
        <Image
          source={{ uri: pokemon.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.name}>
          {formatPokemonId(pokemon.id)} {capitalize(pokemon.name)}
        </Text>
        <View style={styles.typeContainer}>
          {pokemon.types.map((type, index) => (
            <View
              key={index}
              style={[styles.typeTag, { backgroundColor: getTypeColor(type) }]}
            >
              <Text style={styles.typeText}>{type}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    </View>
  );
};
