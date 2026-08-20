import React from 'react';
import { Box, SvgIconProps } from '@mui/material';
import {
  LocalPizzaRounded,
  RamenDiningRounded,
  RiceBowlRounded,
  SetMealRounded,
  LunchDiningRounded,
  DinnerDiningRounded,
  BakeryDiningRounded,
  FastfoodRounded,
  LocalDiningRounded,
  LocalCafeRounded,
  RestaurantMenuRounded,
} from '@mui/icons-material';

type IconType = React.ComponentType<SvgIconProps>;

// Warm, appetite-friendly brand color per cuisine / menu category
export const categoryColors: Record<string, string> = {
  // Cuisine types (restaurant level)
  Italian: '#E11D48',
  Japanese: '#DB2777',
  Indian: '#EA580C',
  American: '#B45309',
  Healthy: '#16A34A',
  // Menu sections (dish level)
  Pizza: '#E11D48',
  Pasta: '#C2410C',
  Salad: '#16A34A',
  Sushi: '#DB2777',
  Bowl: '#0D9488',
  Curry: '#EA580C',
  Rice: '#CA8A04',
  Bread: '#D97706',
  Burger: '#B45309',
  Sandwich: '#C2410C',
  Sides: '#65A30D',
  Smoothie: '#7C3AED',
};

// Two-tone warm gradient per category for the icon backgrounds
const categoryGradients: Record<string, [string, string]> = {
  Italian: ['#FB7185', '#E11D48'],
  Japanese: ['#F472B6', '#DB2777'],
  Indian: ['#FB923C', '#EA580C'],
  American: ['#F59E0B', '#B45309'],
  Healthy: ['#4ADE80', '#16A34A'],
  Pizza: ['#FB7185', '#E11D48'],
  Pasta: ['#FDBA74', '#C2410C'],
  Salad: ['#4ADE80', '#16A34A'],
  Sushi: ['#F472B6', '#DB2777'],
  Bowl: ['#2DD4BF', '#0D9488'],
  Curry: ['#FB923C', '#EA580C'],
  Rice: ['#FACC15', '#CA8A04'],
  Bread: ['#FBBF24', '#D97706'],
  Burger: ['#F59E0B', '#B45309'],
  Sandwich: ['#FDBA74', '#C2410C'],
  Sides: ['#A3E635', '#65A30D'],
  Smoothie: ['#C4B5FD', '#7C3AED'],
};

// Menu section shown per dish (used when the API payload omits the category,
// e.g. cart items resolved through the simplified helper)
const productCategory: Record<string, string> = {
  'Margherita Pizza': 'Pizza',
  'Chicken Alfredo': 'Pasta',
  'Caesar Salad': 'Salad',
  'California Roll': 'Sushi',
  'Spicy Tuna Roll': 'Sushi',
  'Chicken Teriyaki Bowl': 'Bowl',
  'Chicken Tikka Masala': 'Curry',
  'Vegetable Biryani': 'Rice',
  'Garlic Naan': 'Bread',
  'Classic Cheeseburger': 'Burger',
  'Crispy Chicken Sandwich': 'Sandwich',
  'Sweet Potato Fries': 'Sides',
  'Quinoa Buddha Bowl': 'Bowl',
  'Acai Berry Smoothie': 'Smoothie',
  'Grilled Salmon Salad': 'Salad',
};

// One themed (Rounded) icon per cuisine / menu category
const categoryIcons: Record<string, IconType> = {
  Italian: LocalPizzaRounded,
  Japanese: SetMealRounded,
  Indian: RamenDiningRounded,
  American: LunchDiningRounded,
  Healthy: RiceBowlRounded,
  Pizza: LocalPizzaRounded,
  Pasta: DinnerDiningRounded,
  Salad: LocalDiningRounded,
  Sushi: SetMealRounded,
  Bowl: RiceBowlRounded,
  Curry: RamenDiningRounded,
  Rice: RiceBowlRounded,
  Bread: BakeryDiningRounded,
  Burger: LunchDiningRounded,
  Sandwich: LunchDiningRounded,
  Sides: FastfoodRounded,
  Smoothie: LocalCafeRounded,
};

// One themed (Rounded) icon per dish
const productIcons: Record<string, IconType> = {
  'Margherita Pizza': LocalPizzaRounded,
  'Chicken Alfredo': DinnerDiningRounded,
  'Caesar Salad': LocalDiningRounded,
  'California Roll': SetMealRounded,
  'Spicy Tuna Roll': SetMealRounded,
  'Chicken Teriyaki Bowl': RiceBowlRounded,
  'Chicken Tikka Masala': RamenDiningRounded,
  'Vegetable Biryani': RiceBowlRounded,
  'Garlic Naan': BakeryDiningRounded,
  'Classic Cheeseburger': LunchDiningRounded,
  'Crispy Chicken Sandwich': LunchDiningRounded,
  'Sweet Potato Fries': FastfoodRounded,
  'Quinoa Buddha Bowl': RiceBowlRounded,
  'Acai Berry Smoothie': LocalCafeRounded,
  'Grilled Salmon Salad': LocalDiningRounded,
};

// Price headline and dietary feature tags per dish, shown in place of photos.
export interface ProductMeta {
  highlight: string; // headline figure (the price)
  highlightLabel: string; // small caption above the headline
  badges: string[]; // up to two relevant feature tags
}

const productMeta: Record<string, ProductMeta> = {
  'Margherita Pizza': { highlight: '16,99 €', highlightLabel: 'Precio', badges: ['Vegetariano'] },
  'Chicken Alfredo': { highlight: '19,99 €', highlightLabel: 'Precio', badges: [] },
  'Caesar Salad': { highlight: '12,99 €', highlightLabel: 'Precio', badges: ['Vegetariano'] },
  'California Roll': { highlight: '14,99 €', highlightLabel: 'Precio', badges: [] },
  'Spicy Tuna Roll': { highlight: '16,99 €', highlightLabel: 'Precio', badges: ['Picante'] },
  'Chicken Teriyaki Bowl': { highlight: '18,99 €', highlightLabel: 'Precio', badges: [] },
  'Chicken Tikka Masala': { highlight: '17,99 €', highlightLabel: 'Precio', badges: ['Picante'] },
  'Vegetable Biryani': { highlight: '15,99 €', highlightLabel: 'Precio', badges: ['Vegano', 'Picante'] },
  'Garlic Naan': { highlight: '4,99 €', highlightLabel: 'Precio', badges: ['Vegetariano'] },
  'Classic Cheeseburger': { highlight: '13,99 €', highlightLabel: 'Precio', badges: [] },
  'Crispy Chicken Sandwich': { highlight: '15,99 €', highlightLabel: 'Precio', badges: [] },
  'Sweet Potato Fries': { highlight: '6,99 €', highlightLabel: 'Precio', badges: ['Vegano'] },
  'Quinoa Buddha Bowl': { highlight: '14,99 €', highlightLabel: 'Precio', badges: ['Vegano'] },
  'Acai Berry Smoothie': { highlight: '8,99 €', highlightLabel: 'Precio', badges: ['Vegano'] },
  'Grilled Salmon Salad': { highlight: '18,99 €', highlightLabel: 'Precio', badges: [] },
};

export const resolveCategory = (name: string, category?: string): string =>
  (category && category.trim()) || productCategory[name] || 'Healthy';

export const getProductMeta = (name: string): ProductMeta =>
  productMeta[name] || { highlight: '', highlightLabel: '', badges: [] };

export const getCategoryColor = (category: string): string =>
  categoryColors[category] || '#FF6B35';

export const getCategoryGradient = (category: string): string => {
  const [from, to] = categoryGradients[category] || ['#FF8A65', '#FF6B35'];
  return `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
};

export const getCategoryIcon = (cuisineType: string): IconType =>
  categoryIcons[cuisineType] || RestaurantMenuRounded;

export const getProductIcon = (name: string, category?: string): IconType =>
  productIcons[name] || categoryIcons[resolveCategory(name, category)] || RestaurantMenuRounded;

interface ProductIconBoxProps {
  name: string;
  category?: string;
  size?: number;
  iconSize?: number;
  radius?: number;
  fullHeight?: boolean;
}

// Reusable gradient tile with a themed icon, used in place of dish photos
export const ProductIconBox: React.FC<ProductIconBoxProps> = ({
  name,
  category,
  size = 80,
  iconSize,
  radius = 12,
  fullHeight = false,
}) => {
  const resolved = resolveCategory(name, category);
  const Icon = getProductIcon(name, category);
  return (
    <Box
      sx={{
        width: size,
        height: fullHeight ? '100%' : size,
        minWidth: size,
        borderRadius: `${radius}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: getCategoryGradient(resolved),
        flexShrink: 0,
      }}
    >
      <Icon sx={{ fontSize: iconSize ?? Math.round(size * 0.5), color: '#fff' }} />
    </Box>
  );
};
