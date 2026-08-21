import React from 'react';
import { Box, SvgIconProps } from '@mui/material';
import {
  CheckroomRounded,
  DryCleaningRounded,
  WomanRounded,
  ManRounded,
  ChildCareRounded,
  StyleRounded,
  DirectionsRunRounded,
  HikingRounded,
  AcUnitRounded,
  ShoppingBagRounded,
  WbSunnyRounded,
  StorefrontRounded,
} from '@mui/icons-material';

type IconType = React.ComponentType<SvgIconProps>;

// Solid brand color per section / garment category (used for chips, text, etc.)
export const categoryColors: Record<string, string> = {
  // Secciones Dressify
  Mujer: '#9B2242',
  Hombre: '#334155',
  'Niño': '#0E7490',
  Calzado: '#8A5A2B',
  Accesorios: '#B08422',
  // Subcategorías de prenda
  Vestidos: '#9333EA',
  'Camisas y Blusas': '#2563EB',
  Pantalones: '#4F46E5',
  Abrigos: '#B45309',
  Faldas: '#DB2777',
  Chaquetas: '#0F766E',
  Sudaderas: '#EA580C',
  Camisetas: '#059669',
  Deportivo: '#0891B2',
  Botas: '#7C2D12',
  Plano: '#6D28D9',
  'Tacón': '#BE123C',
  Bolsos: '#0E9F6E',
  Cinturones: '#92400E',
  Complementos: '#B08422',
};

// Two-tone gradient per section / garment category for the icon backgrounds
const categoryGradients: Record<string, [string, string]> = {
  // Secciones
  Mujer: ['#C24D68', '#9B2242'],
  Hombre: ['#64748B', '#334155'],
  'Niño': ['#22D3EE', '#0E7490'],
  Calzado: ['#B98B54', '#8A5A2B'],
  Accesorios: ['#D9B44A', '#B08422'],
  // Subcategorías
  Vestidos: ['#C084FC', '#9333EA'],
  'Camisas y Blusas': ['#60A5FA', '#2563EB'],
  Pantalones: ['#6366F1', '#4F46E5'],
  Abrigos: ['#F59E0B', '#B45309'],
  Faldas: ['#F472B6', '#DB2777'],
  Chaquetas: ['#2DD4BF', '#0F766E'],
  Sudaderas: ['#FB923C', '#EA580C'],
  Camisetas: ['#34D399', '#059669'],
  Deportivo: ['#22D3EE', '#0891B2'],
  Botas: ['#B45309', '#7C2D12'],
  Plano: ['#A78BFA', '#6D28D9'],
  'Tacón': ['#FB7185', '#BE123C'],
  Bolsos: ['#34D399', '#0E9F6E'],
  Cinturones: ['#B45309', '#92400E'],
  Complementos: ['#D9B44A', '#B08422'],
};

// Category shown per product (used when the API payload omits the category,
// e.g. cart items resolved through the simplified helper)
const productCategory: Record<string, string> = {
  'Vestido Midi Flores': 'Vestidos',
  'Blusa Satinada': 'Camisas y Blusas',
  'Vaquero Slim Tiro Alto': 'Pantalones',
  'Abrigo Lana Espiga': 'Abrigos',
  'Falda Plisada Midi': 'Faldas',
  'Blazer Entallado': 'Chaquetas',
  'Camisa Oxford': 'Camisas y Blusas',
  'Vaquero Slim': 'Pantalones',
  'Sudadera con Capucha': 'Sudaderas',
  'Chaqueta Bomber': 'Chaquetas',
  'Polo Piqué': 'Camisetas',
  'Pantalón Chino': 'Pantalones',
  'Camiseta Estampada Niño': 'Camisetas',
  'Pantalón Cargo Niño': 'Pantalones',
  'Vestido Flores Niña': 'Vestidos',
  'Sudadera Capucha Kids': 'Sudaderas',
  'Chaqueta Acolchada Niño': 'Abrigos',
  'Zapatilla Running': 'Deportivo',
  'Bota Chelsea Piel': 'Botas',
  'Bailarina Charol': 'Plano',
  'Sandalia Tacón': 'Tacón',
  'Mocasín Piel': 'Plano',
  'Bolso Bandolera': 'Bolsos',
  'Cinturón de Piel': 'Cinturones',
  'Bufanda de Punto': 'Complementos',
  'Gafas de Sol': 'Complementos',
  'Gorro de Lana': 'Complementos',
};

// One themed (Rounded) icon per section / garment category
const categoryIcons: Record<string, IconType> = {
  // Secciones
  Mujer: WomanRounded,
  Hombre: ManRounded,
  'Niño': ChildCareRounded,
  Calzado: DirectionsRunRounded,
  Accesorios: ShoppingBagRounded,
  // Subcategorías
  Vestidos: WomanRounded,
  'Camisas y Blusas': CheckroomRounded,
  Pantalones: DryCleaningRounded,
  Abrigos: AcUnitRounded,
  Faldas: StyleRounded,
  Chaquetas: CheckroomRounded,
  Sudaderas: CheckroomRounded,
  Camisetas: CheckroomRounded,
  Deportivo: DirectionsRunRounded,
  Botas: HikingRounded,
  Plano: StyleRounded,
  'Tacón': StyleRounded,
  Bolsos: ShoppingBagRounded,
  Cinturones: StyleRounded,
  Complementos: ShoppingBagRounded,
};

// One themed (Rounded) icon per product
const productIcons: Record<string, IconType> = {
  'Vestido Midi Flores': WomanRounded,
  'Blusa Satinada': CheckroomRounded,
  'Vaquero Slim Tiro Alto': DryCleaningRounded,
  'Abrigo Lana Espiga': AcUnitRounded,
  'Falda Plisada Midi': StyleRounded,
  'Blazer Entallado': CheckroomRounded,
  'Camisa Oxford': CheckroomRounded,
  'Vaquero Slim': DryCleaningRounded,
  'Sudadera con Capucha': CheckroomRounded,
  'Chaqueta Bomber': CheckroomRounded,
  'Polo Piqué': CheckroomRounded,
  'Pantalón Chino': DryCleaningRounded,
  'Camiseta Estampada Niño': ChildCareRounded,
  'Pantalón Cargo Niño': DryCleaningRounded,
  'Vestido Flores Niña': ChildCareRounded,
  'Sudadera Capucha Kids': ChildCareRounded,
  'Chaqueta Acolchada Niño': AcUnitRounded,
  'Zapatilla Running': DirectionsRunRounded,
  'Bota Chelsea Piel': HikingRounded,
  'Bailarina Charol': StyleRounded,
  'Sandalia Tacón': StyleRounded,
  'Mocasín Piel': HikingRounded,
  'Bolso Bandolera': ShoppingBagRounded,
  'Cinturón de Piel': StyleRounded,
  'Bufanda de Punto': AcUnitRounded,
  'Gafas de Sol': WbSunnyRounded,
  'Gorro de Lana': AcUnitRounded,
};

// Retail headline (price) and feature tags per product. This drives the
// card display: a price plus up to two relevant tags (sizes, material, colors).
export interface ProductMeta {
  highlight: string; // headline figure (price)
  highlightLabel: string; // small caption above the headline
  badges: string[]; // up to two relevant feature tags
}

const productMeta: Record<string, ProductMeta> = {
  'Vestido Midi Flores': {
    highlight: '45,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas XS-L', 'Estampado floral'],
  },
  'Blusa Satinada': {
    highlight: '29,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas XS-XL', 'Tacto satinado'],
  },
  'Vaquero Slim Tiro Alto': {
    highlight: '39,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas 34-46', 'Tiro alto'],
  },
  'Abrigo Lana Espiga': {
    highlight: '119,99 €',
    highlightLabel: 'Precio',
    badges: ['Mezcla de lana', 'Tallas S-XL'],
  },
  'Falda Plisada Midi': {
    highlight: '34,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas XS-L', 'Plisada'],
  },
  'Blazer Entallado': {
    highlight: '59,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas XS-XL', 'Entallado'],
  },
  'Camisa Oxford': {
    highlight: '29,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas S-XXL', 'Algodón Oxford'],
  },
  'Vaquero Slim': {
    highlight: '39,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas 38-48', 'Denim elástico'],
  },
  'Sudadera con Capucha': {
    highlight: '34,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas S-XXL', 'Felpa'],
  },
  'Chaqueta Bomber': {
    highlight: '69,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas S-XL', 'Ligera'],
  },
  'Polo Piqué': {
    highlight: '22,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas S-XXL', 'Punto piqué'],
  },
  'Pantalón Chino': {
    highlight: '34,99 €',
    highlightLabel: 'Precio',
    badges: ['3 colores', 'Corte recto'],
  },
  'Camiseta Estampada Niño': {
    highlight: '9,99 €',
    highlightLabel: 'Precio',
    badges: ['3-14 años', 'Algodón'],
  },
  'Pantalón Cargo Niño': {
    highlight: '19,99 €',
    highlightLabel: 'Precio',
    badges: ['3-14 años', 'Cintura ajustable'],
  },
  'Vestido Flores Niña': {
    highlight: '24,99 €',
    highlightLabel: 'Precio',
    badges: ['3-12 años', 'Estampado flores'],
  },
  'Sudadera Capucha Kids': {
    highlight: '19,99 €',
    highlightLabel: 'Precio',
    badges: ['3-14 años', 'Felpa suave'],
  },
  'Chaqueta Acolchada Niño': {
    highlight: '39,99 €',
    highlightLabel: 'Precio',
    badges: ['3-14 años', 'Con capucha'],
  },
  'Zapatilla Running': {
    highlight: '59,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas 36-46', 'Amortiguación'],
  },
  'Bota Chelsea Piel': {
    highlight: '89,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas 39-45', 'Piel'],
  },
  'Bailarina Charol': {
    highlight: '35,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas 35-42', 'Charol'],
  },
  'Sandalia Tacón': {
    highlight: '45,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas 35-41', 'Tacón medio'],
  },
  'Mocasín Piel': {
    highlight: '55,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas 39-45', 'Piel'],
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
  'Gorro de Lana': {
    highlight: '15,99 €',
    highlightLabel: 'Precio',
    badges: ['Talla única', 'Lana'],
  },
};

export const resolveCategory = (name: string, category?: string): string =>
  (category && category.trim()) || productCategory[name] || 'Complementos';

export const getProductMeta = (name: string): ProductMeta =>
  productMeta[name] || { highlight: 'Consultar precio', highlightLabel: '', badges: [] };

export const getCategoryColor = (category: string): string =>
  categoryColors[category] || '#9B2242';

export const getCategoryGradient = (category: string): string => {
  const [from, to] = categoryGradients[category] || ['#C24D68', '#9B2242'];
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
