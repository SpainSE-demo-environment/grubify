import React from 'react';
import { Box, SvgIconProps } from '@mui/material';
import {
  CheckroomRounded,
  DryCleaningRounded,
  WomanRounded,
  StyleRounded,
  DirectionsRunRounded,
  HikingRounded,
  AcUnitRounded,
  ShoppingBagRounded,
  WbSunnyRounded,
  StorefrontRounded,
} from '@mui/icons-material';

type IconType = React.ComponentType<SvgIconProps>;

// Solid brand color per fashion category (used for chips, text, etc.)
export const categoryColors: Record<string, string> = {
  Camisetas: '#DB2777',
  Pantalones: '#4F46E5',
  Vestidos: '#9333EA',
  Calzado: '#0891B2',
  Abrigos: '#B45309',
  Accesorios: '#059669',
};

// Two-tone gradient per category for the icon backgrounds
const categoryGradients: Record<string, [string, string]> = {
  Camisetas: ['#F472B6', '#DB2777'],
  Pantalones: ['#6366F1', '#4F46E5'],
  Vestidos: ['#C084FC', '#9333EA'],
  Calzado: ['#22D3EE', '#0891B2'],
  Abrigos: ['#F59E0B', '#B45309'],
  Accesorios: ['#34D399', '#059669'],
};

// Category shown per product (used when the API payload omits the category,
// e.g. cart items resolved through the simplified helper)
const productCategory: Record<string, string> = {
  'Camiseta Básica': 'Camisetas',
  'Camiseta Oversize': 'Camisetas',
  'Vaqueros Slim': 'Pantalones',
  'Pantalón Chino': 'Pantalones',
  'Vestido Midi': 'Vestidos',
  'Vestido de Fiesta': 'Vestidos',
  'Vestido Camisero': 'Vestidos',
  'Zapatillas Urbanas': 'Calzado',
  'Botas de Piel': 'Calzado',
  Bailarinas: 'Calzado',
  'Abrigo de Lana': 'Abrigos',
  'Chaqueta Vaquera': 'Abrigos',
  'Bolso Bandolera': 'Accesorios',
  'Cinturón de Piel': 'Accesorios',
  'Bufanda de Punto': 'Accesorios',
  'Gafas de Sol': 'Accesorios',
};

// One themed (Rounded) icon per category
const categoryIcons: Record<string, IconType> = {
  Camisetas: CheckroomRounded,
  Pantalones: DryCleaningRounded,
  Vestidos: WomanRounded,
  Calzado: DirectionsRunRounded,
  Abrigos: AcUnitRounded,
  Accesorios: ShoppingBagRounded,
};

// One themed (Rounded) icon per product
const productIcons: Record<string, IconType> = {
  'Camiseta Básica': CheckroomRounded,
  'Camiseta Oversize': CheckroomRounded,
  'Vaqueros Slim': DryCleaningRounded,
  'Pantalón Chino': DryCleaningRounded,
  'Vestido Midi': WomanRounded,
  'Vestido de Fiesta': StyleRounded,
  'Vestido Camisero': WomanRounded,
  'Zapatillas Urbanas': DirectionsRunRounded,
  'Botas de Piel': HikingRounded,
  Bailarinas: DirectionsRunRounded,
  'Abrigo de Lana': AcUnitRounded,
  'Chaqueta Vaquera': CheckroomRounded,
  'Bolso Bandolera': ShoppingBagRounded,
  'Cinturón de Piel': StyleRounded,
  'Bufanda de Punto': AcUnitRounded,
  'Gafas de Sol': WbSunnyRounded,
};

// Retail headline (price) and feature tags per product. This drives the
// card display: a price plus up to two relevant tags (sizes, material, colors).
export interface ProductMeta {
  highlight: string; // headline figure (price)
  highlightLabel: string; // small caption above the headline
  badges: string[]; // up to two relevant feature tags
}

const productMeta: Record<string, ProductMeta> = {
  'Camiseta Básica': {
    highlight: '12,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas S-XXL', 'Algodón orgánico'],
  },
  'Camiseta Oversize': {
    highlight: '19,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas S-XL', 'Unisex'],
  },
  'Vaqueros Slim': {
    highlight: '39,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas 36-46', 'Denim elástico'],
  },
  'Pantalón Chino': {
    highlight: '34,99 €',
    highlightLabel: 'Precio',
    badges: ['3 colores', 'Corte recto'],
  },
  'Vestido Midi': {
    highlight: '45,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas XS-L', 'Estampado floral'],
  },
  'Vestido de Fiesta': {
    highlight: '79,99 €',
    highlightLabel: 'Precio',
    badges: ['Lentejuelas', 'Espalda abierta'],
  },
  'Vestido Camisero': {
    highlight: '42,99 €',
    highlightLabel: 'Precio',
    badges: ['Lino', 'Tallas XS-XL'],
  },
  'Zapatillas Urbanas': {
    highlight: '59,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas 36-45', 'Suela cómoda'],
  },
  'Botas de Piel': {
    highlight: '89,99 €',
    highlightLabel: 'Precio',
    badges: ['Piel auténtica', 'Forro cálido'],
  },
  Bailarinas: {
    highlight: '35,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas 35-42', 'Varios colores'],
  },
  'Abrigo de Lana': {
    highlight: '119,99 €',
    highlightLabel: 'Precio',
    badges: ['Mezcla de lana', 'Tallas S-XL'],
  },
  'Chaqueta Vaquera': {
    highlight: '49,99 €',
    highlightLabel: 'Precio',
    badges: ['Denim', 'Tallas XS-XXL'],
  },
  'Bolso Bandolera': {
    highlight: '39,99 €',
    highlightLabel: 'Precio',
    badges: ['Correa ajustable', 'Varios colores'],
  },
  'Cinturón de Piel': {
    highlight: '24,99 €',
    highlightLabel: 'Precio',
    badges: ['Piel auténtica', '90-110 cm'],
  },
  'Bufanda de Punto': {
    highlight: '19,99 €',
    highlightLabel: 'Precio',
    badges: ['Punto suave', 'Tonos de temporada'],
  },
  'Gafas de Sol': {
    highlight: '29,99 €',
    highlightLabel: 'Precio',
    badges: ['UV400', 'Montura ligera'],
  },
};

export const resolveCategory = (name: string, category?: string): string =>
  (category && category.trim()) || productCategory[name] || 'Camisetas';

export const getProductMeta = (name: string): ProductMeta =>
  productMeta[name] || { highlight: 'Consultar precio', highlightLabel: '', badges: [] };

export const getCategoryColor = (category: string): string =>
  categoryColors[category] || '#4F46E5';

export const getCategoryGradient = (category: string): string => {
  const [from, to] = categoryGradients[category] || ['#6366F1', '#4F46E5'];
  return `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
};

export const getCategoryIcon = (cuisineType: string): IconType =>
  categoryIcons[cuisineType] || StorefrontRounded;

export const getProductIcon = (name: string, category?: string): IconType =>
  productIcons[name] || categoryIcons[resolveCategory(name, category)] || StorefrontRounded;

interface ProductIconBoxProps {
  name: string;
  category?: string;
  size?: number;
  iconSize?: number;
  radius?: number;
  fullHeight?: boolean;
}

// Reusable gradient tile with a themed icon, used in place of product photos
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
