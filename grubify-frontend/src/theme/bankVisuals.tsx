import React from 'react';
import { Box, SvgIconProps } from '@mui/material';
import {
  BoltRounded,
  ElectricBoltRounded,
  WbSunnyRounded,
  DarkModeRounded,
  EvStationRounded,
  ElectricalServicesRounded,
  SolarPowerRounded,
  BatteryChargingFullRounded,
  LocalFireDepartmentRounded,
  LocalGasStationRounded,
  ElectricCarRounded,
  PowerRounded,
  HandymanRounded,
  SupportAgentRounded,
  EnergySavingsLeafRounded,
} from '@mui/icons-material';

type IconType = React.ComponentType<SvgIconProps>;

// Solid brand color per energy category (used for chips, text, etc.)
export const categoryColors: Record<string, string> = {
  Tarifas: '#F59E0B',
  'Recarga VE': '#16A34A',
  Autoconsumo: '#EAB308',
  Gas: '#0EA5E9',
  Movilidad: '#10B981',
  Servicios: '#14B8A6',
};

// Two-tone gradient per category for the icon backgrounds
const categoryGradients: Record<string, [string, string]> = {
  Tarifas: ['#FBBF24', '#F59E0B'],
  'Recarga VE': ['#22C55E', '#16A34A'],
  Autoconsumo: ['#FDE047', '#EAB308'],
  Gas: ['#38BDF8', '#0EA5E9'],
  Movilidad: ['#34D399', '#10B981'],
  Servicios: ['#2DD4BF', '#14B8A6'],
};

// Category shown per product (used when the API payload omits the category,
// e.g. cart items resolved through the simplified helper)
const productCategory: Record<string, string> = {
  'Tarifa Valle': 'Tarifas',
  'Tarifa Solar': 'Tarifas',
  'Tarifa Plana': 'Tarifas',
  'Tarifa Nocturna': 'Tarifas',
  'Recarga Rápida 50kW': 'Recarga VE',
  'Recarga Ultrarrápida 150kW': 'Recarga VE',
  'Recarga en Casa 7kW': 'Recarga VE',
  'Placas Solares Residencial': 'Autoconsumo',
  'Batería Virtual': 'Autoconsumo',
  'Kit Solar Plug & Play': 'Autoconsumo',
  'Tarifa Gas Hogar': 'Gas',
  'Tarifa Gas Plana': 'Gas',
  'Bono Recarga Ilimitada': 'Movilidad',
  'Instalación Punto de Recarga': 'Movilidad',
  'Mantenimiento Caldera': 'Servicios',
  'Asistencia Energética 24h': 'Servicios',
};

// One themed (Rounded) icon per category
const categoryIcons: Record<string, IconType> = {
  Tarifas: BoltRounded,
  'Recarga VE': EvStationRounded,
  Autoconsumo: SolarPowerRounded,
  Gas: LocalFireDepartmentRounded,
  Movilidad: ElectricCarRounded,
  Servicios: HandymanRounded,
};

// One themed (Rounded) icon per product
const productIcons: Record<string, IconType> = {
  'Tarifa Valle': BoltRounded,
  'Tarifa Solar': WbSunnyRounded,
  'Tarifa Plana': ElectricBoltRounded,
  'Tarifa Nocturna': DarkModeRounded,
  'Recarga Rápida 50kW': EvStationRounded,
  'Recarga Ultrarrápida 150kW': BoltRounded,
  'Recarga en Casa 7kW': ElectricalServicesRounded,
  'Placas Solares Residencial': SolarPowerRounded,
  'Batería Virtual': BatteryChargingFullRounded,
  'Kit Solar Plug & Play': EnergySavingsLeafRounded,
  'Tarifa Gas Hogar': LocalFireDepartmentRounded,
  'Tarifa Gas Plana': LocalGasStationRounded,
  'Bono Recarga Ilimitada': EvStationRounded,
  'Instalación Punto de Recarga': PowerRounded,
  'Mantenimiento Caldera': HandymanRounded,
  'Asistencia Energética 24h': SupportAgentRounded,
};

// Energy-appropriate headline figure and feature tags per product.
// A tariff shows a €/kWh price or a flat monthly fee, a charging session
// shows its power and €/kWh, a solar install shows an upfront amount, etc.
export interface ProductMeta {
  highlight: string; // headline figure (€/kWh, monthly fee, upfront amount)
  highlightLabel: string; // small caption above the headline
  badges: string[]; // up to two relevant feature tags
}

const productMeta: Record<string, ProductMeta> = {
  'Tarifa Valle': {
    highlight: '0,12 €/kWh',
    highlightLabel: 'Precio valle',
    badges: ['Discriminación horaria', 'Sin permanencia'],
  },
  'Tarifa Solar': {
    highlight: '0,10 €/kWh',
    highlightLabel: 'Con excedentes',
    badges: ['Ideal autoconsumo', 'Compensa excedentes'],
  },
  'Tarifa Plana': {
    highlight: '55 €/mes',
    highlightLabel: 'Cuota fija',
    badges: ['Precio estable', '100% renovable'],
  },
  'Tarifa Nocturna': {
    highlight: '0,09 €/kWh',
    highlightLabel: 'Precio noche',
    badges: ['Horas valle', 'Recarga tu VE de noche'],
  },
  'Recarga Rápida 50kW': {
    highlight: '0,45 €/kWh',
    highlightLabel: '50 kW · DC',
    badges: ['80% en 30 min', 'CCS / CHAdeMO'],
  },
  'Recarga Ultrarrápida 150kW': {
    highlight: '0,55 €/kWh',
    highlightLabel: '150 kW · DC',
    badges: ['80% en 15 min', 'Alta potencia'],
  },
  'Recarga en Casa 7kW': {
    highlight: '0,18 €/kWh',
    highlightLabel: '7,4 kW · AC',
    badges: ['Wallbox incluido', 'Recarga nocturna'],
  },
  'Placas Solares Residencial': {
    highlight: 'Desde 3.900 €',
    highlightLabel: 'Instalación 3 kWp',
    badges: ['Hasta 60% de ahorro', 'Legalización incluida'],
  },
  'Batería Virtual': {
    highlight: '0 €/mes',
    highlightLabel: 'Tus excedentes',
    badges: ['Sin baterías físicas', 'Energía 24h'],
  },
  'Kit Solar Plug & Play': {
    highlight: '699 €',
    highlightLabel: 'Kit 800 W',
    badges: ['Autoinstalable', 'Enchufa y ahorra'],
  },
  'Tarifa Gas Hogar': {
    highlight: '0,06 €/kWh',
    highlightLabel: 'Gas natural',
    badges: ['Sin permanencia', 'Factura clara'],
  },
  'Tarifa Gas Plana': {
    highlight: '42 €/mes',
    highlightLabel: 'Cuota fija gas',
    badges: ['Precio estable', 'Todo incluido'],
  },
  'Bono Recarga Ilimitada': {
    highlight: '39 €/mes',
    highlightLabel: 'Red pública',
    badges: ['Recargas ilimitadas', 'Miles de puntos'],
  },
  'Instalación Punto de Recarga': {
    highlight: 'Desde 590 €',
    highlightLabel: 'Wallbox 7,4 kW',
    badges: ['Instalación incluida', 'Subvención Moves'],
  },
  'Mantenimiento Caldera': {
    highlight: '6,90 €/mes',
    highlightLabel: 'Plan mantenimiento',
    badges: ['Revisión anual', 'Asistencia 24h'],
  },
  'Asistencia Energética 24h': {
    highlight: '4,50 €/mes',
    highlightLabel: 'Averías luz y gas',
    badges: ['Técnico 24/7', 'Sin desplazamiento'],
  },
};

export const resolveCategory = (name: string, category?: string): string =>
  (category && category.trim()) || productCategory[name] || 'Tarifas';

export const getProductMeta = (name: string): ProductMeta =>
  productMeta[name] || { highlight: 'Sin permanencia', highlightLabel: '', badges: [] };

export const getCategoryColor = (category: string): string =>
  categoryColors[category] || '#16A34A';

export const getCategoryGradient = (category: string): string => {
  const [from, to] = categoryGradients[category] || ['#22C55E', '#16A34A'];
  return `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
};

export const getCategoryIcon = (cuisineType: string): IconType =>
  categoryIcons[cuisineType] || BoltRounded;

export const getProductIcon = (name: string, category?: string): IconType =>
  productIcons[name] || categoryIcons[resolveCategory(name, category)] || BoltRounded;

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
