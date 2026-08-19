import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Dressify brand in navbar', () => {
  render(<App />);
  const brandElement = screen.getByText(/Dressify/i);
  expect(brandElement).toBeInTheDocument();
});
