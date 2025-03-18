import { View, Text, Image } from 'react-native';
import styles from '../styles/EmptyState.styles';

export const EmptyState: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/sad-pikachu.jpg')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>No Pokémon found</Text>
    </View>
  );
};
