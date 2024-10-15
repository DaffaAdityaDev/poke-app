import React from 'react';
import { render, screen } from '@testing-library/react';
import {SearchBar} from '@/components/pokemon/SearchBar';

describe('SearchBar', () => {
  it('renders without crashing', () => {
    render(<SearchBar onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Search Pokémon...');
    expect(inputElement).toBeInTheDocument();
  });
});