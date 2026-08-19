import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Clinify brand in navbar', () => {
  render(<App />);
  const brandElement = screen.getByText(/Clinify/i);
  expect(brandElement).toBeInTheDocument();
});
