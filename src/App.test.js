import { render, screen } from '@testing-library/react';
import App from './App';

test('renders FlavorVault brand', () => {
  render(<App />);
  const brand = screen.getAllByText(/FlavorVault/i);
  expect(brand.length).toBeGreaterThan(0);
});

test('renders navigation links', () => {
  render(<App />);
  expect(screen.getAllByText(/Recipes/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/About/i).length).toBeGreaterThan(0);
});
