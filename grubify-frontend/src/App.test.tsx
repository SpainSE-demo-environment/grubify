import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Voltify brand in navbar', () => {
  render(<App />);
  const brandElement = screen.getByText(/Voltify/i);
  expect(brandElement).toBeInTheDocument();
});
