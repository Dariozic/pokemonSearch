import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  PokemonDetail,
  PokemonDetailsNavigationProp,
  RootStackParamList
} from '../types/pokemonTypes';
import {
  getTypeColor,
  formatPokemonId,
  capitalize,
  formatStatName
} from '../utils/pokemonUtils';
import styles from '../styles/PokemonDetails.styles';
import { usePokemon } from '../hooks/usePokemon';

type PokemonDetailsRouteProp = RouteProp<RootStackParamList, 'PokemonDetails'>;

const PokemonDetails: React.FC = () => {
  const navigation = useNavigation<PokemonDetailsNavigationProp>();
  const route = useRoute<PokemonDetailsRouteProp>();
  const { pokemon } = route.params;
  const { getPokemonDetails, allPokemonList } = usePokemon();
  const [details, setDetails] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const navigateToPokemon = (id: number) => {
    const nextPokemon = allPokemonList.find((p) => p.id === id);
    if (nextPokemon) {
      navigation.replace('PokemonDetails', { pokemon: nextPokemon });
    }
  };

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const pokemonDetails = await getPokemonDetails(pokemon.id);
        setDetails(pokemonDetails);
      } catch (error) {
        console.error('Error loading details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [pokemon.id]);

  if (loading || !details) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: getTypeColor(pokemon.types[0]) }
        ]}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const mainType = details.types[0].type.name;
  const backgroundColor = getTypeColor(mainType);

  const hasNextPokemon = pokemon.id < 898;
  const hasPrevPokemon = pokemon.id > 1;

  const heightInMeters = (details.height / 10).toFixed(1);
  const weightInKg = (details.weight / 10).toFixed(1);
  const mainMoves = details.moves
    .slice(0, 2)
    .map((m) => capitalize(m.move.name));

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
          <Text style={styles.pokemonName}>{capitalize(details.name)}</Text>
          <Text style={styles.pokemonId}>{formatPokemonId(details.id)}</Text>
        </View>

        <View style={styles.navigationArrows}>
          {hasPrevPokemon && (
            <TouchableOpacity
              style={styles.navArrow}
              onPress={() => navigateToPokemon(pokemon.id - 1)}
            >
              <Text style={styles.navArrowText}>←</Text>
            </TouchableOpacity>
          )}
          <View style={styles.navSpacer} />
          {hasNextPokemon && (
            <TouchableOpacity
              style={styles.navArrow}
              onPress={() => navigateToPokemon(pokemon.id + 1)}
            >
              <Text style={styles.navArrowText}>→</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: details.sprites.other['official-artwork'].front_default
              }}
              style={styles.pokemonImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.detailsCard}>
            <View style={styles.typeContainer}>
              {details.types.map((typeInfo, index) => (
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
                <Text style={styles.statIcon}>⚖️</Text>
                <Text style={styles.statValue}>{weightInKg} kg</Text>
                <Text style={styles.statLabel}>Weight</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.statItem}>
                <Text style={styles.statIcon}>📏</Text>
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

            <Text style={[styles.sectionTitle, { color: backgroundColor }]}>
              Base Stats
            </Text>

            <View style={styles.baseStatsContainer}>
              {details.stats.map((stat, index) => (
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
