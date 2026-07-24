import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Medify brand in navbar', () => {
  render(<App />);
  const brandElement = screen.getByText(/Medify/i);
  expect(brandElement).toBeInTheDocument();
});
