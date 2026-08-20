import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Mobify brand in navbar', () => {
  render(<App />);
  const brandElement = screen.getByText(/Mobify/i);
  expect(brandElement).toBeInTheDocument();
});
