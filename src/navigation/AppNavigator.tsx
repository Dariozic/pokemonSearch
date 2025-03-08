import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PokemonScreen from '../components/PokemonScreen';
import PokemonDetails from '../components/PokemonDetails';
import { RootStackParamList } from '../types/pokemonTypes';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="PokemonScreen"
          component={PokemonScreen}
          options={{ title: 'Pokédex' }}
        />
        <Stack.Screen
          name="PokemonDetails"
          component={PokemonDetails}
          options={({ route }) => ({
            title: route.params.pokemon.name,
            headerShown: false
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
