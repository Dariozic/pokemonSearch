import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PokemonCard } from '../PokemonCard';

describe('PokemonCard', () => {
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    types: ['grass', 'poison']
  };

  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <PokemonCard pokemon={mockPokemon} onPress={mockOnPress} />
    );
    expect(getByText('#001 Bulbasaur')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByTestId } = render(
      <PokemonCard pokemon={mockPokemon} onPress={mockOnPress} />
    );
    fireEvent.press(getByTestId('pokemon-card'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
