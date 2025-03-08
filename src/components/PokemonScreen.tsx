import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Text,
  SafeAreaView,
  RefreshControl,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonCard } from './PokemonCard';
import { FAB } from 'react-native-paper';
import { RootStackParamList } from '../types/pokemonTypes';
import styles from '../styles/PokemonScreen.styles';

type PokemonScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PokemonScreen'
>;

const PokemonScreen: React.FC = () => {
  const navigation = useNavigation<PokemonScreenNavigationProp>();
  const { pokemons, fetchPokemons, loading, error } = usePokemon();
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
      pokemon.id.toString().includes(search)
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPokemons();
    setRefreshing(false);
  }, [fetchPokemons]);

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D32F2F" />
        <Text style={styles.loadingText}>Loading Pokémon...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchPokemons}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#D32F2F" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search Pokémon by name or number"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>

        <FlatList
          data={filteredPokemons}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PokemonCard
              pokemon={item}
              onPress={() =>
                navigation.navigate('PokemonDetails', { pokemon: item })
              }
            />
          )}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#D32F2F']}
            />
          }
          showsVerticalScrollIndicator={false}
          initialNumToRender={8}
          maxToRenderPerBatch={10}
          windowSize={10}
        />

        <FAB
          icon="refresh"
          onPress={fetchPokemons}
          style={styles.fab}
          color="white"
        />
      </View>
    </SafeAreaView>
  );
};

export default PokemonScreen;
