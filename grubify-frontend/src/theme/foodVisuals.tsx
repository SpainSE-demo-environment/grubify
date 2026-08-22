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

// ---------------------------------------------------------------------------
// Fotos reales de platos (Unsplash).
// Se usan URLs directas y estables del CDN de Unsplash
// (https://images.unsplash.com/photo-<ID>), bajo licencia Unsplash: uso
// comercial libre y sin atribucion obligatoria. Cada plato recibe SIEMPRE la
// misma foto (mapa determinista nombre -> ID). Si una imagen fallara al cargar,
// ProductImage cae al mosaico de icono tematico (onError).
// ---------------------------------------------------------------------------

// Mapa nombre de plato -> ID de foto Unsplash (los 15 platos del catalogo food).
const productPhotoId: Record<string, string> = {
  'Margherita Pizza': '1604382354936-07c5d9983bd3',
  'Chicken Alfredo': '1645112411341-6c4fd023714a',
  'Caesar Salad': '1550304943-4f24f54ddde9',
  'California Roll': '1579584425555-c3ce17fd4351',
  'Spicy Tuna Roll': '1617196034796-73dfa7b1fd56',
  'Chicken Teriyaki Bowl': '1546069901-ba9599a7e63c',
  'Chicken Tikka Masala': '1565557623262-b51c2513a641',
  'Vegetable Biryani': '1563379091339-03b21ab4a4f8',
  'Garlic Naan': '1601050690597-df0568f70950',
  'Classic Cheeseburger': '1568901346375-23c9450c58cd',
  'Crispy Chicken Sandwich': '1606755962773-d324e0a13086',
  'Sweet Potato Fries': '1604908176997-125f25cc6f3d',
  'Quinoa Buddha Bowl': '1512621776951-a57141f2eefd',
  'Acai Berry Smoothie': '1553530666-ba11a7da3888',
  'Grilled Salmon Salad': '1467003909585-2f8a72700288',
};

// Construye una URL estable del CDN de Unsplash con recorte al tamano pedido.
export const buildFoodImageUrl = (photoId: string, width: number, height: number): string =>
  `https://images.unsplash.com/photo-${photoId}?w=${width}&h=${height}&fit=crop&auto=format&q=80`;

// Devuelve la foto Unsplash del plato, o null si no hay foto asociada.
export const getFoodImage = (
  name: string,
  width = 600,
  height = 600,
): string | null => {
  const photoId = productPhotoId[name];
  return photoId ? buildFoodImageUrl(photoId, width, height) : null;
};

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

interface ProductImageProps {
  name: string;
  category?: string;
  size?: number;
  iconSize?: number;
  radius?: number;
  fullHeight?: boolean;
}

// Foto real del plato con recorte cover. Sustituye a ProductIconBox manteniendo
// las mismas props/medidas. Si el plato no tiene foto o la imagen falla al
// cargar (onError), cae al mosaico de icono tematico (ProductIconBox).
export const ProductImage: React.FC<ProductImageProps> = ({
  name,
  category,
  size = 80,
  iconSize,
  radius = 12,
  fullHeight = false,
}) => {
  const [failed, setFailed] = React.useState(false);
  const src = getFoodImage(name, size * 2, fullHeight ? size * 3 : size * 2);

  if (!src || failed) {
    return (
      <ProductIconBox
        name={name}
        category={category}
        size={size}
        iconSize={iconSize}
        radius={radius}
        fullHeight={fullHeight}
      />
    );
  }

  return (
    <Box
      component="img"
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      sx={{
        width: size,
        height: fullHeight ? '100%' : size,
        minWidth: size,
        borderRadius: `${radius}px`,
        objectFit: 'cover',
        display: 'block',
        flexShrink: 0,
      }}
    />
  );
};
