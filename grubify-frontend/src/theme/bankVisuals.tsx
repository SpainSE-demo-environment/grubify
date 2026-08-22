import React from 'react';
import { Box, SvgIconProps, Typography } from '@mui/material';
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
  'Traje Tres Piezas': 'Chaquetas',
  'Camisa Popelín Mujer': 'Camisas y Blusas',
  'Vaquero Slim': 'Pantalones',
  'Sudadera con Capucha': 'Sudaderas',
  'Chaqueta de Cuero': 'Chaquetas',
  'Camiseta Blanca': 'Camisetas',
  'Pantalón Chino': 'Pantalones',
  'Chaqueta de Punto Niño': 'Chaquetas',
  'Conjunto Dos Piezas Niña': 'Vestidos',
  'Vestido de Lunares Niña': 'Vestidos',
  'Abrigo con Capucha Kids': 'Abrigos',
  'Camiseta Blanca Niño': 'Camisetas',
  'Zapatilla Running': 'Deportivo',
  'Bota Chelsea Piel': 'Botas',
  'Zapato de Tacón': 'Tacón',
  'Zapato de Tacón Estampado': 'Tacón',
  'Mocasín Piel': 'Plano',
  'Bolso Bandolera': 'Bolsos',
  'Cinturón de Piel': 'Cinturones',
  'Bufanda de Punto': 'Complementos',
  'Gafas de Sol': 'Complementos',
  'Gorro de Lana': 'Complementos',
  // Productos nuevos
  'Jersey de Punto': 'Sudaderas',
  'Camiseta Blanca Hombre': 'Camisetas',
  'Abrigo Largo': 'Abrigos',
  'Blusa Estampada': 'Camisas y Blusas',
  'Camiseta Básica Hombre': 'Camisetas',
  'Poncho': 'Chaquetas',
  'Cazadora de Piel': 'Chaquetas',
  'Cazadora Vaquera': 'Chaquetas',
  'Deportiva Multicolor': 'Deportivo',
  'Cazadora de Piel Hombre': 'Chaquetas',
  'Reloj Analógico': 'Complementos',
  'Cartera de Piel': 'Complementos',
  'Mochila Urbana': 'Bolsos',
  'Sombrero de Fieltro': 'Complementos',
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
  'Traje Tres Piezas': CheckroomRounded,
  'Camisa Popelín Mujer': CheckroomRounded,
  'Vaquero Slim': DryCleaningRounded,
  'Sudadera con Capucha': CheckroomRounded,
  'Chaqueta de Cuero': CheckroomRounded,
  'Camiseta Blanca': CheckroomRounded,
  'Pantalón Chino': DryCleaningRounded,
  'Chaqueta de Punto Niño': ChildCareRounded,
  'Conjunto Dos Piezas Niña': ChildCareRounded,
  'Vestido de Lunares Niña': ChildCareRounded,
  'Abrigo con Capucha Kids': ChildCareRounded,
  'Camiseta Blanca Niño': ChildCareRounded,
  'Zapatilla Running': DirectionsRunRounded,
  'Bota Chelsea Piel': HikingRounded,
  'Zapato de Tacón': StyleRounded,
  'Zapato de Tacón Estampado': StyleRounded,
  'Mocasín Piel': HikingRounded,
  'Bolso Bandolera': ShoppingBagRounded,
  'Cinturón de Piel': StyleRounded,
  'Bufanda de Punto': AcUnitRounded,
  'Gafas de Sol': WbSunnyRounded,
  'Gorro de Lana': AcUnitRounded,
  // Productos nuevos
  'Jersey de Punto': CheckroomRounded,
  'Camiseta Blanca Hombre': CheckroomRounded,
  'Abrigo Largo': AcUnitRounded,
  'Blusa Estampada': CheckroomRounded,
  'Camiseta Básica Hombre': CheckroomRounded,
  'Poncho': CheckroomRounded,
  'Cazadora de Piel': CheckroomRounded,
  'Cazadora Vaquera': CheckroomRounded,
  'Deportiva Multicolor': DirectionsRunRounded,
  'Cazadora de Piel Hombre': CheckroomRounded,
  'Reloj Analógico': StyleRounded,
  'Cartera de Piel': ShoppingBagRounded,
  'Mochila Urbana': ShoppingBagRounded,
  'Sombrero de Fieltro': StyleRounded,
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
  'Traje Tres Piezas': {
    highlight: '149,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas 46-56', '3 piezas'],
  },
  'Camisa Popelín Mujer': {
    highlight: '29,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas XS-XL', 'Popelín algodón'],
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
  'Chaqueta de Cuero': {
    highlight: '89,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas XS-XL', 'Cuero'],
  },
  'Camiseta Blanca': {
    highlight: '14,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas S-XXL', 'Algodón'],
  },
  'Pantalón Chino': {
    highlight: '34,99 €',
    highlightLabel: 'Precio',
    badges: ['3 colores', 'Corte recto'],
  },
  'Chaqueta de Punto Niño': {
    highlight: '19,99 €',
    highlightLabel: 'Precio',
    badges: ['3-14 años', 'Punto'],
  },
  'Conjunto Dos Piezas Niña': {
    highlight: '24,99 €',
    highlightLabel: 'Precio',
    badges: ['3-12 años', 'Dos piezas'],
  },
  'Vestido de Lunares Niña': {
    highlight: '24,99 €',
    highlightLabel: 'Precio',
    badges: ['3-12 años', 'Estampado lunares'],
  },
  'Abrigo con Capucha Kids': {
    highlight: '34,99 €',
    highlightLabel: 'Precio',
    badges: ['3-14 años', 'Con capucha'],
  },
  'Camiseta Blanca Niño': {
    highlight: '9,99 €',
    highlightLabel: 'Precio',
    badges: ['3-14 años', 'Algodón'],
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
  'Zapato de Tacón': {
    highlight: '45,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas 35-41', 'Tacón medio'],
  },
  'Zapato de Tacón Estampado': {
    highlight: '49,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas 35-41', 'Estampado'],
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
  // ===== Productos nuevos (ampliacion de catalogo) =====
  'Jersey de Punto': {
    highlight: '35,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas XS-XL', 'Punto suave'],
  },
  'Camiseta Blanca Hombre': {
    highlight: '12,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas S-XXL', 'Algodón'],
  },
  'Abrigo Largo': {
    highlight: '99,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas S-XL', 'Corte recto'],
  },
  'Blusa Estampada': {
    highlight: '27,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas XS-XL', 'Estampado'],
  },
  'Camiseta Básica Hombre': {
    highlight: '12,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas S-XXL', 'Algodón orgánico'],
  },
  'Poncho': {
    highlight: '49,99 €',
    highlightLabel: 'Precio',
    badges: ['Talla única', 'Con flecos'],
  },
  'Cazadora de Piel': {
    highlight: '119,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas XS-XL', 'Piel'],
  },
  'Cazadora Vaquera': {
    highlight: '49,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas S-XL', 'Denim rígido'],
  },
  'Deportiva Multicolor': {
    highlight: '54,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas 36-46', 'Multicolor'],
  },
  'Cazadora de Piel Hombre': {
    highlight: '139,99 €',
    highlightLabel: 'Precio',
    badges: ['Tallas S-XXL', 'Piel'],
  },
  'Reloj Analógico': {
    highlight: '59,99 €',
    highlightLabel: 'Precio',
    badges: ['Acero inoxidable', 'Sumergible 3ATM'],
  },
  'Cartera de Piel': {
    highlight: '29,99 €',
    highlightLabel: 'Precio',
    badges: ['Piel auténtica', '8 tarjetas'],
  },
  'Mochila Urbana': {
    highlight: '44,99 €',
    highlightLabel: 'Precio',
    badges: ['20 L', 'Bolsillo portátil'],
  },
  'Sombrero de Fieltro': {
    highlight: '29,99 €',
    highlightLabel: 'Precio',
    badges: ['Talla única', 'Fieltro de lana'],
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

// ---------------------------------------------------------------------------
// Imagenes de moda reales (Unsplash).
// Se usan URLs directas y estables del CDN de Unsplash
// (https://images.unsplash.com/photo-<ID>), bajo licencia Unsplash: uso
// comercial libre y sin atribucion obligatoria. Solo fotos GRATUITAS: se
// excluyen las de Unsplash+ (premium_photo / plus.unsplash.com) y cualquier
// otra fuente con copyright. Cada producto recibe SIEMPRE la misma foto (hash
// determinista) del pool de su seccion, de modo que la imagen es coherente con
// la categoria. Si una imagen fallara al cargar, ProductImage cae al mosaico de
// icono tematico (onError). Todas las URLs se verificaron 200 image/*.
// ---------------------------------------------------------------------------

// Pools de IDs de fotos de moda de Unsplash (gratuitas) por seccion.
const unsplashPools: Record<string, string[]> = {
  Mujer: [
    '1515886657613-9f3515b0c78f',
    '1483985988355-763728e1935b',
    '1609505848912-b7c3b8b4beda',
    '1595777457583-95e059d581b8',
    '1613915617430-8ab0fd7c6baf',
    '1662532577856-e8ee8b138a8b',
  ],
  Hombre: [
    '1441984904996-e0b6ba687e04',
    '1617137968427-85924c800a22',
    '1618886614638-80e3c103d31a',
    '1490114538077-0a7f8cb49891',
    '1488161628813-04466f872be2',
    '1625698457101-fec2f565a8f0',
  ],
  'Niño': [
    '1525507119028-ed4c629a60a3',
    '1611708314849-8bb91fe0fa56',
    '1596870230751-ebdfce98ec42',
    '1622218286192-95f6a20083c7',
  ],
  Calzado: [
    '1542291026-7eec264c27ff',
    '1605733160314-4fc7dac4bb16',
    '1605812860427-4024433a70fd',
    '1543163521-1bf539c55dd2',
    '1535043934128-cf0b28d52f95',
  ],
  Accesorios: [
    '1598532163257-ae3c6b2524b6',
    '1584917865442-de89df76afd3',
    '1511499767150-a48a237f0083',
    '1572635196237-14b3f281503f',
  ],
};

// Pool general (mezcla) para productos sin seccion identificable.
const unsplashGeneral: string[] = [
  ...unsplashPools.Mujer.slice(0, 2),
  ...unsplashPools.Hombre.slice(0, 2),
  ...unsplashPools.Calzado.slice(0, 1),
  ...unsplashPools.Accesorios.slice(0, 1),
];

// Fotos editoriales apaisadas para el hero / banner.
const unsplashHero: string[] = ['1557777586-f6682739fcf3'];

// Mapa nombre de producto -> seccion (los 27 productos del catalogo).
const productSection: Record<string, string> = {
  'Vestido Midi Flores': 'Mujer',
  'Blusa Satinada': 'Mujer',
  'Vaquero Slim Tiro Alto': 'Mujer',
  'Abrigo Lana Espiga': 'Mujer',
  'Falda Plisada Midi': 'Mujer',
  'Traje Tres Piezas': 'Hombre',
  'Camisa Popelín Mujer': 'Mujer',
  'Vaquero Slim': 'Hombre',
  'Sudadera con Capucha': 'Hombre',
  'Chaqueta de Cuero': 'Mujer',
  'Camiseta Blanca': 'Hombre',
  'Pantalón Chino': 'Hombre',
  'Chaqueta de Punto Niño': 'Niño',
  'Conjunto Dos Piezas Niña': 'Niño',
  'Vestido de Lunares Niña': 'Niño',
  'Abrigo con Capucha Kids': 'Niño',
  'Camiseta Blanca Niño': 'Niño',
  'Zapatilla Running': 'Calzado',
  'Bota Chelsea Piel': 'Calzado',
  'Zapato de Tacón': 'Calzado',
  'Zapato de Tacón Estampado': 'Calzado',
  'Mocasín Piel': 'Calzado',
  'Bolso Bandolera': 'Accesorios',
  'Cinturón de Piel': 'Accesorios',
  'Bufanda de Punto': 'Accesorios',
  'Gafas de Sol': 'Accesorios',
  'Gorro de Lana': 'Accesorios',
  // Productos nuevos
  'Jersey de Punto': 'Mujer',
  'Camiseta Blanca Hombre': 'Hombre',
  'Abrigo Largo': 'Mujer',
  'Blusa Estampada': 'Mujer',
  'Camiseta Básica Hombre': 'Hombre',
  'Poncho': 'Mujer',
  'Cazadora de Piel': 'Mujer',
  'Cazadora Vaquera': 'Hombre',
  'Deportiva Multicolor': 'Calzado',
  'Cazadora de Piel Hombre': 'Hombre',
  'Reloj Analógico': 'Accesorios',
  'Cartera de Piel': 'Accesorios',
  'Mochila Urbana': 'Accesorios',
  'Sombrero de Fieltro': 'Accesorios',
};

// Mapa subcategoria -> seccion (fallback cuando solo se conoce la subcategoria).
const subcategorySection: Record<string, string> = {
  Vestidos: 'Mujer',
  Faldas: 'Mujer',
  'Camisas y Blusas': 'Mujer',
  Abrigos: 'Mujer',
  Chaquetas: 'Mujer',
  Sudaderas: 'Hombre',
  Camisetas: 'Hombre',
  Pantalones: 'Hombre',
  Deportivo: 'Calzado',
  Botas: 'Calzado',
  Plano: 'Calzado',
  'Tacón': 'Calzado',
  Bolsos: 'Accesorios',
  Cinturones: 'Accesorios',
  Complementos: 'Accesorios',
};

const SECTIONS = ['Mujer', 'Hombre', 'Niño', 'Calzado', 'Accesorios'];

// Resuelve la seccion de moda de un producto: seccion explicita -> nombre ->
// subcategoria -> 'general' (pool mezcla).
export const resolveSection = (name: string, category?: string): string => {
  const c = (category || '').trim();
  if (SECTIONS.includes(c)) return c;
  if (productSection[name]) return productSection[name];
  if (subcategorySection[c]) return subcategorySection[c];
  return 'general';
};

// Hash determinista de una cadena (mismo producto -> misma foto siempre).
const hashString = (value: string): number => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
};

// Construye una URL estable del CDN de Unsplash con recorte al tamano pedido.
const buildUnsplashUrl = (photoId: string, width: number, height: number): string =>
  `https://images.unsplash.com/photo-${photoId}?w=${width}&h=${height}&fit=crop&auto=format&q=80`;

// Mapa determinista nombre-de-producto -> foto Unsplash CONCRETA que muestra
// exactamente ese tipo de prenda/objeto (cinturon->cinturon, gafas->gafas,
// zapatilla->zapatilla, etc.). Cuando no existe una foto 100% exacta se usa una
// similar y coherente de la misma categoria. Todas las URLs (photo-<ID>) se han
// verificado: HTTP 200 + content-type image/*. Fotos GRATUITAS de Unsplash
// (sin premium_photo / plus.unsplash.com). Si un producto no tuviera entrada
// aqui, getProductImage cae al pool por seccion (fallback).
const productPhotoId: Record<string, string> = {
  // ===== Mujer =====
  'Vestido Midi Flores': '1572804013309-59a88b7e92f1',
  'Blusa Satinada': '1564257631407-4deb1f99d992',
  'Vaquero Slim Tiro Alto': '1541099649105-f69ad21f3246',
  'Abrigo Lana Espiga': '1544022613-e87ca75a784a',
  'Falda Plisada Midi': '1594633312681-425c7b97ccd1',
  'Traje Tres Piezas': '1594938298603-c8148c4dae35',
  // ===== Hombre =====
  'Camisa Popelín Mujer': '1596755094514-f87e34085b2c',
  'Vaquero Slim': '1542272604-787c3835535d',
  'Sudadera con Capucha': '1556821840-3a63f95609a7',
  'Chaqueta de Cuero': '1551028719-00167b16eac5',
  'Camiseta Blanca': '1586790170083-2f9ceadc732d',
  'Pantalón Chino': '1473966968600-fa801b869a1a',
  // ===== Niño =====
  'Chaqueta de Punto Niño': '1519238263530-99bdd11df2ea',
  'Conjunto Dos Piezas Niña': '1560506840-ec148e82a604',
  'Vestido de Lunares Niña': '1518831959646-742c3a14ebf7',
  'Abrigo con Capucha Kids': '1503919545889-aef636e10ad4',
  'Camiseta Blanca Niño': '1622290291468-a28f7a7dc6a8',
  // ===== Calzado =====
  'Zapatilla Running': '1600185365483-26d7a4cc7519',
  'Bota Chelsea Piel': '1608256246200-53e635b5b65f',
  'Zapato de Tacón': '1596703263926-eb0762ee17e4',
  'Zapato de Tacón Estampado': '1543163521-1bf539c55dd2',
  'Mocasín Piel': '1533867617858-e7b97e060509',
  // ===== Accesorios =====
  'Bolso Bandolera': '1584917865442-de89df76afd3',
  'Cinturón de Piel': '1624222247344-550fb60583dc',
  'Bufanda de Punto': '1520903920243-00d872a2d1c9',
  'Gafas de Sol': '1511499767150-a48a237f0083',
  'Gorro de Lana': '1576871337622-98d48d1cf531',
  // ===== Productos nuevos (ampliacion de catalogo) =====
  'Jersey de Punto': '1576566588028-4147f3842f27',
  'Camiseta Blanca Hombre': '1521572163474-6864f9cf17ab',
  'Abrigo Largo': '1485462537746-965f33f7f6a7',
  'Blusa Estampada': '1520006403909-838d6b92c22e',
  'Camiseta Básica Hombre': '1583743814966-8936f5b7be1a',
  'Poncho': '1434389677669-e08b4cac3105',
  'Cazadora de Piel': '1608063615781-e2ef8c73d114',
  'Cazadora Vaquera': '1601333144130-8cbb312386b6',
  'Deportiva Multicolor': '1595950653106-6c9ebd614d3a',
  'Cazadora de Piel Hombre': '1614252369475-531eba835eb1',
  'Reloj Analógico': '1524592094714-0f0654e20314',
  'Cartera de Piel': '1627123424574-724758594e93',
  'Mochila Urbana': '1553062407-98eeb64c6a62',
  'Sombrero de Fieltro': '1521369909029-2afed882baee',
};

// Imagen vertical (3:4) de producto: primero busca la foto ESPECIFICA del
// producto (productPhotoId); si no existe, cae al pool de moda de su seccion,
// estable por producto.
export const getProductImage = (
  name: string,
  section?: string,
  id?: number,
  width = 600,
  height = 800,
): string => {
  const specific = productPhotoId[name];
  if (specific) {
    return buildUnsplashUrl(specific, width, height);
  }
  const resolved =
    section && unsplashPools[section] ? section : resolveSection(name, section);
  const pool = unsplashPools[resolved] || unsplashGeneral;
  const photoId = pool[hashString(`${id ?? ''}-${name}`) % pool.length];
  return buildUnsplashUrl(photoId, width, height);
};

// Imagen representativa de una seccion (campana / banner).
export const getSectionImage = (section: string, width = 800, height = 1000): string => {
  const pool = unsplashPools[section] || unsplashGeneral;
  const photoId = pool[hashString(`seccion-${section}`) % pool.length];
  return buildUnsplashUrl(photoId, width, height);
};

// Imagen de hero / banner a ancho completo (editorial apaisada).
export const getHeroImage = (seedKey = 'nueva-coleccion', width = 1600, height = 600): string => {
  const photoId = unsplashHero[hashString(seedKey) % unsplashHero.length];
  return buildUnsplashUrl(photoId, width, height);
};

interface ProductImageProps {
  name: string;
  id?: number;
  category?: string;
  ratio?: string; // aspect-ratio css, por defecto 3/4
  zoomOnHover?: boolean;
  overlayLabel?: string; // texto editorial superpuesto (para tiles de seccion)
  height?: number | string;
}

// Imagen vertical de moda con zoom sutil en hover. Sustituye a las fotos reales.
// Incluye un fallback al mosaico de icono tematico si la imagen no carga.
export const ProductImage: React.FC<ProductImageProps> = ({
  name,
  id,
  category,
  ratio = '3 / 4',
  zoomOnHover = true,
  overlayLabel,
  height,
}) => {
  const resolved = resolveCategory(name, category);
  const Icon = getProductIcon(name, category);
  const [failed, setFailed] = React.useState(false);

  return (
    <Box
      className="dressify-image-frame"
      sx={{
        position: 'relative',
        width: '100%',
        height: height ?? 'auto',
        aspectRatio: height ? undefined : ratio,
        overflow: 'hidden',
        backgroundColor: '#F2F2F2',
      }}
    >
      {failed ? (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: getCategoryGradient(resolved),
          }}
        >
          <Icon sx={{ fontSize: 72, color: 'rgba(255,255,255,0.9)' }} />
        </Box>
      ) : (
        <Box
          component="img"
          src={getProductImage(name, resolveSection(name, category), id)}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="dressify-image"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
            ...(zoomOnHover && {
              '.dressify-image-frame:hover &': { transform: 'scale(1.05)' },
            }),
          }}
        />
      )}
      {overlayLabel && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            p: 3,
            background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 55%)',
          }}
        >
          <Typography
            sx={{
              color: '#fff',
              fontFamily: '"Jost", "Helvetica Neue", sans-serif',
              fontWeight: 400,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontSize: '1.05rem',
            }}
          >
            {overlayLabel}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

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
