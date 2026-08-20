import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Grubify brand', () => {
  render(<App />);
  const elements = screen.getAllByText(/Grubify/i);
  expect(elements.length).toBeGreaterThan(0);
});
