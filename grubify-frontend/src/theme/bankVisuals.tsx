import React from 'react';
import { Box, SvgIconProps } from '@mui/material';
import {
  SavingsRounded,
  HomeRounded,
  HouseRounded,
  BeachAccessRounded,
  AccountBalanceRounded,
  MedicalServicesRounded,
  DirectionsCarRounded,
  TwoWheelerRounded,
  ShieldRounded,
  PetsRounded,
  HealthAndSafetyRounded,
  FlightTakeoffRounded,
} from '@mui/icons-material';

type IconType = React.ComponentType<SvgIconProps>;

// Solid brand color per insurance line (used for chips, text, etc.)
export const categoryColors: Record<string, string> = {
  Auto: '#4F46E5',
  Hogar: '#059669',
  Vida: '#DB2777',
  Salud: '#0D9488',
  Moto: '#EA580C',
  Viaje: '#0891B2',
};

// Two-tone gradient per category for the icon backgrounds
const categoryGradients: Record<string, [string, string]> = {
  Auto: ['#6366F1', '#4F46E5'],
  Hogar: ['#34D399', '#059669'],
  Vida: ['#EC4899', '#DB2777'],
  Salud: ['#2DD4BF', '#0D9488'],
  Moto: ['#FB923C', '#EA580C'],
  Viaje: ['#22D3EE', '#0891B2'],
};

// Category shown per product (used when the API payload omits the category,
// e.g. cart items resolved through the simplified helper)
const productCategory: Record<string, string> = {
  'Seguro de Auto a Terceros': 'Auto',
  'Seguro de Auto Terceros Ampliado': 'Auto',
  'Seguro de Auto Todo Riesgo': 'Auto',
  'Seguro de Hogar Básico': 'Hogar',
  'Seguro de Hogar Completo': 'Hogar',
  'Seguro de Vida Riesgo': 'Vida',
  'Seguro de Vida Ahorro': 'Vida',
  'Seguro de Salud Básico': 'Salud',
  'Seguro de Salud Completo': 'Salud',
  'Seguro Dental': 'Salud',
  'Seguro de Moto a Terceros': 'Moto',
  'Seguro de Moto Todo Riesgo': 'Moto',
  'Seguro de Viaje': 'Viaje',
  'Seguro de Mascotas': 'Viaje',
  'Seguro de Decesos': 'Viaje',
  'Seguro de Accidentes': 'Viaje',
};

// One themed (Rounded) icon per category
const categoryIcons: Record<string, IconType> = {
  Auto: DirectionsCarRounded,
  Hogar: HouseRounded,
  Vida: ShieldRounded,
  Salud: MedicalServicesRounded,
  Moto: TwoWheelerRounded,
  Viaje: FlightTakeoffRounded,
};

// One themed (Rounded) icon per product
const productIcons: Record<string, IconType> = {
  'Seguro de Auto a Terceros': DirectionsCarRounded,
  'Seguro de Auto Terceros Ampliado': DirectionsCarRounded,
  'Seguro de Auto Todo Riesgo': DirectionsCarRounded,
  'Seguro de Hogar Básico': HouseRounded,
  'Seguro de Hogar Completo': HomeRounded,
  'Seguro de Vida Riesgo': ShieldRounded,
  'Seguro de Vida Ahorro': SavingsRounded,
  'Seguro de Salud Básico': MedicalServicesRounded,
  'Seguro de Salud Completo': MedicalServicesRounded,
  'Seguro Dental': HealthAndSafetyRounded,
  'Seguro de Moto a Terceros': TwoWheelerRounded,
  'Seguro de Moto Todo Riesgo': TwoWheelerRounded,
  'Seguro de Viaje': BeachAccessRounded,
  'Seguro de Mascotas': PetsRounded,
  'Seguro de Decesos': ShieldRounded,
  'Seguro de Accidentes': HealthAndSafetyRounded,
};

// Insurance-appropriate headline figure and feature tags per product.
// This replaces the food-style "price" display: each policy shows a monthly
// premium ("prima") plus its most relevant coverage tags.
export interface ProductMeta {
  highlight: string; // headline figure (monthly premium, "Sin comisiones")
  highlightLabel: string; // small caption above the headline
  badges: string[]; // up to two relevant feature tags
}

const productMeta: Record<string, ProductMeta> = {
  'Seguro de Auto a Terceros': {
    highlight: 'Desde 22 €/mes',
    highlightLabel: 'Prima',
    badges: ['Asistencia 24h', 'Defensa jurídica'],
  },
  'Seguro de Auto Terceros Ampliado': {
    highlight: 'Desde 30 €/mes',
    highlightLabel: 'Prima',
    badges: ['Lunas incluidas', 'Robo e incendio'],
  },
  'Seguro de Auto Todo Riesgo': {
    highlight: 'Desde 45 €/mes',
    highlightLabel: 'Prima',
    badges: ['Todo riesgo', 'Coche de sustitución'],
  },
  'Seguro de Hogar Básico': {
    highlight: 'Desde 12 €/mes',
    highlightLabel: 'Prima',
    badges: ['Urgencias 24h', 'Responsabilidad civil'],
  },
  'Seguro de Hogar Completo': {
    highlight: 'Desde 22 €/mes',
    highlightLabel: 'Prima',
    badges: ['Cobertura integral', 'Bricohogar'],
  },
  'Seguro de Vida Riesgo': {
    highlight: 'Desde 15 €/mes',
    highlightLabel: 'Prima',
    badges: ['Fallecimiento', 'Invalidez'],
  },
  'Seguro de Vida Ahorro': {
    highlight: 'Desde 40 €/mes',
    highlightLabel: 'Prima',
    badges: ['Ahorro garantizado', 'Ventajas fiscales'],
  },
  'Seguro de Salud Básico': {
    highlight: 'Desde 35 €/mes',
    highlightLabel: 'Prima',
    badges: ['Cuadro médico', 'Sin listas de espera'],
  },
  'Seguro de Salud Completo': {
    highlight: 'Desde 55 €/mes',
    highlightLabel: 'Prima',
    badges: ['Sin copagos', 'Videoconsulta 24h'],
  },
  'Seguro Dental': {
    highlight: 'Desde 12 €/mes',
    highlightLabel: 'Prima',
    badges: ['Limpiezas incluidas', 'Sin copagos'],
  },
  'Seguro de Moto a Terceros': {
    highlight: 'Desde 14 €/mes',
    highlightLabel: 'Prima',
    badges: ['Defensa jurídica', 'Asistencia 24h'],
  },
  'Seguro de Moto Todo Riesgo': {
    highlight: 'Desde 28 €/mes',
    highlightLabel: 'Prima',
    badges: ['Daños propios', 'Robo e incendio'],
  },
  'Seguro de Viaje': {
    highlight: 'Desde 8 €/mes',
    highlightLabel: 'Prima',
    badges: ['Asistencia en el extranjero', 'Cancelación'],
  },
  'Seguro de Mascotas': {
    highlight: 'Desde 11 €/mes',
    highlightLabel: 'Prima',
    badges: ['Gastos veterinarios', 'Responsabilidad civil'],
  },
  'Seguro de Decesos': {
    highlight: 'Desde 9 €/mes',
    highlightLabel: 'Prima',
    badges: ['Servicio completo', 'Tramitación incluida'],
  },
  'Seguro de Accidentes': {
    highlight: 'Desde 13 €/mes',
    highlightLabel: 'Prima',
    badges: ['Indemnización', 'Asistencia 24h'],
  },
};

export const resolveCategory = (name: string, category?: string): string =>
  (category && category.trim()) || productCategory[name] || 'Auto';

export const getProductMeta = (name: string): ProductMeta =>
  productMeta[name] || { highlight: 'Sin comisiones', highlightLabel: '', badges: [] };

export const getCategoryColor = (category: string): string =>
  categoryColors[category] || '#4F46E5';

export const getCategoryGradient = (category: string): string => {
  const [from, to] = categoryGradients[category] || ['#6366F1', '#4F46E5'];
  return `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
};

export const getCategoryIcon = (cuisineType: string): IconType =>
  categoryIcons[cuisineType] || AccountBalanceRounded;

export const getProductIcon = (name: string, category?: string): IconType =>
  productIcons[name] || categoryIcons[resolveCategory(name, category)] || AccountBalanceRounded;

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
