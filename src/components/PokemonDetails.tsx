import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StatusBar
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/pokemonTypes';
import {
  getTypeColor,
  formatPokemonId,
  capitalize,
  formatStatName,
  getMainMoves
} from '../utils/pokemonUtils';
import styles from '../styles/PokemonDetails.styles';

type PokemonDetailsRouteProp = RouteProp<RootStackParamList, 'PokemonDetails'>;

const PokemonDetails: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<PokemonDetailsRouteProp>();
  const { pokemon } = route.params;

  const mainType = pokemon.types[0]?.type.name || 'normal';
  const backgroundColor = getTypeColor(mainType);

  const hasNextPokemon = pokemon.id < 898;
  const hasPrevPokemon = pokemon.id > 1;

  const heightInMeters = (pokemon.height / 10).toFixed(1);
  const weightInKg = (pokemon.weight / 10).toFixed(1);

  const mainMoves = getMainMoves(pokemon.moves);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <StatusBar backgroundColor={backgroundColor} barStyle="light-content" />
      <ImageBackground
        source={require('../assets/poke-background.png')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.pokemonName}>{capitalize(pokemon.name)}</Text>
          <Text style={styles.pokemonId}>{formatPokemonId(pokemon.id)}</Text>
        </View>

        <View style={styles.navigationArrows}>
          {hasPrevPokemon && (
            <TouchableOpacity style={styles.navArrow}>
              <Text style={styles.navArrowText}>←</Text>
            </TouchableOpacity>
          )}
          <View style={styles.navSpacer} />
          {hasNextPokemon && (
            <TouchableOpacity style={styles.navArrow}>
              <Text style={styles.navArrowText}>→</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  pokemon.sprites.other['official-artwork'].front_default ||
                  pokemon.sprites.front_default
              }}
              style={styles.pokemonImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.detailsCard}>
            <View style={styles.typeContainer}>
              {pokemon.types.map((typeInfo, index) => (
                <View
                  key={index}
                  style={[
                    styles.typeTag,
                    { backgroundColor: getTypeColor(typeInfo.type.name) }
                  ]}
                >
                  <Text style={styles.typeText}>
                    {capitalize(typeInfo.type.name)}
                  </Text>
                </View>
              ))}
            </View>

            <Text style={[styles.sectionTitle, { color: backgroundColor }]}>
              About
            </Text>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Text>⚖️</Text>
                </View>
                <Text style={styles.statValue}>{weightInKg} kg</Text>
                <Text style={styles.statLabel}>Weight</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Text>📏</Text>
                </View>
                <Text style={styles.statValue}>{heightInMeters} m</Text>
                <Text style={styles.statLabel}>Height</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.statItem}>
                <View style={styles.movesContainer}>
                  {mainMoves.map((move, index) => (
                    <Text key={index} style={styles.moveText}>
                      {move}
                    </Text>
                  ))}
                </View>
                <Text style={styles.statLabel}>Moves</Text>
              </View>
            </View>

            <Text style={styles.description}>
              {`This Pokémon has special abilities and characteristics that make it unique in the Pokémon world.`}
            </Text>

            <Text style={[styles.sectionTitle, { color: backgroundColor }]}>
              Base Stats
            </Text>

            <View style={styles.baseStatsContainer}>
              {pokemon.stats.map((stat, index) => (
                <View key={index} style={styles.baseStat}>
                  <Text
                    style={[styles.baseStatName, { color: backgroundColor }]}
                  >
                    {formatStatName(stat.stat.name)}
                  </Text>
                  <Text style={styles.baseStatValue}>
                    {stat.base_stat.toString().padStart(3, '0')}
                  </Text>
                  <View style={styles.baseStatBarContainer}>
                    <View
                      style={[
                        styles.baseStatBar,
                        {
                          width: `${Math.min(
                            100,
                            (stat.base_stat / 255) * 100
                          )}%`,
                          backgroundColor
                        }
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PokemonDetails;
