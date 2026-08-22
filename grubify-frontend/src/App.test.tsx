import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Coverfy brand in navbar', () => {
  render(<App />);
  const brandElement = screen.getByText(/Coverfy/i);
  expect(brandElement).toBeInTheDocument();
});
