import { useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonCard } from './PokemonCard';
import { RootStackParamList } from '../types/pokemonTypes';
import styles from '../styles/PokemonScreen.styles';
import { Pagination } from './Pagination';
import { EmptyState } from './EmptyState';

type PokemonScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PokemonScreen'
>;

const PokemonScreen: React.FC = () => {
  const navigation = useNavigation<PokemonScreenNavigationProp>();
  const {
    pokemonList,
    allPokemonList,
    loading,
    error,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    setCurrentPage
  } = usePokemon();
  const [search, setSearch] = useState('');

  const filteredPokemons = search.trim()
    ? allPokemonList.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
          pokemon.id.toString().includes(search)
      )
    : pokemonList;

  if (loading) {
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
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#D32F2F" barStyle="light-content" />
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={() => {
          setSearch('');
          navigation.navigate('PokemonScreen');
        }}
      >
        <Text style={styles.headerTitle}>Pokédex</Text>
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search Pokémon by name or number"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
        {search.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearch('')}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      {filteredPokemons.length > 0 ? (
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
          showsVerticalScrollIndicator={true}
          initialNumToRender={8}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      ) : (
        <EmptyState />
      )}

      {!search && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onFirstPage={() => setCurrentPage(0)}
          onPreviousPage={previousPage}
          onNextPage={nextPage}
          onLastPage={() => setCurrentPage(totalPages - 1)}
        />
      )}
    </SafeAreaView>
  );
};

export default PokemonScreen;
