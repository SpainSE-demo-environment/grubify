import React from 'react';
import { Box, SvgIconProps } from '@mui/material';
import {
  SmartphoneRounded,
  PhoneAndroidRounded,
  SignalCellularAltRounded,
  SimCardRounded,
  RouterRounded,
  WifiRounded,
  DevicesRounded,
  DevicesOtherRounded,
  DataUsageRounded,
  SettingsInputAntennaRounded,
  PublicRounded,
  LiveTvRounded,
  SecurityRounded,
  SupportAgentRounded,
} from '@mui/icons-material';

type IconType = React.ComponentType<SvgIconProps>;

// Solid brand color per telco category (used for chips, text, etc.)
export const categoryColors: Record<string, string> = {
  Móvil: '#E6007E',
  Fibra: '#7C3AED',
  Convergente: '#F97316',
  Dispositivos: '#0EA5E9',
  Datos: '#DB2777',
  Servicios: '#14B8A6',
};

// Two-tone gradient per category for the icon backgrounds
const categoryGradients: Record<string, [string, string]> = {
  Móvil: ['#F0499F', '#E6007E'],
  Fibra: ['#A78BFA', '#7C3AED'],
  Convergente: ['#FB923C', '#F97316'],
  Dispositivos: ['#38BDF8', '#0EA5E9'],
  Datos: ['#EC4899', '#DB2777'],
  Servicios: ['#2DD4BF', '#14B8A6'],
};

// Category shown per product (used when the API payload omits the category,
// e.g. cart items resolved through the simplified helper)
const productCategory: Record<string, string> = {
  'Tarifa Móvil 5GB': 'Móvil',
  'Tarifa Móvil 20GB': 'Móvil',
  'Tarifa Móvil Ilimitada': 'Móvil',
  'Tarifa Móvil 100GB 5G': 'Móvil',
  'Fibra 300 Mbps': 'Fibra',
  'Fibra 600 Mbps': 'Fibra',
  'Fibra 1 Gbps': 'Fibra',
  'Combo Fibra 600 + Móvil 20GB': 'Convergente',
  'Combo Fibra 1Gb + Ilimitada': 'Convergente',
  'Combo Fibra 300 + Móvil 5GB': 'Convergente',
  'Smartphone 5G a plazos': 'Dispositivos',
  'Router WiFi 6': 'Dispositivos',
  'SIM Datos 50GB': 'Datos',
  'Roaming Internacional': 'Datos',
  'Pack TV y Streaming': 'Servicios',
  'Seguro de Móvil': 'Servicios',
};

// One themed (Rounded) icon per category
const categoryIcons: Record<string, IconType> = {
  Móvil: SmartphoneRounded,
  Fibra: RouterRounded,
  Convergente: DevicesRounded,
  Dispositivos: PhoneAndroidRounded,
  Datos: SignalCellularAltRounded,
  Servicios: SupportAgentRounded,
};

// One themed (Rounded) icon per product
const productIcons: Record<string, IconType> = {
  'Tarifa Móvil 5GB': SignalCellularAltRounded,
  'Tarifa Móvil 20GB': SmartphoneRounded,
  'Tarifa Móvil Ilimitada': DataUsageRounded,
  'Tarifa Móvil 100GB 5G': SettingsInputAntennaRounded,
  'Fibra 300 Mbps': WifiRounded,
  'Fibra 600 Mbps': RouterRounded,
  'Fibra 1 Gbps': RouterRounded,
  'Combo Fibra 600 + Móvil 20GB': DevicesRounded,
  'Combo Fibra 1Gb + Ilimitada': DevicesRounded,
  'Combo Fibra 300 + Móvil 5GB': DevicesOtherRounded,
  'Smartphone 5G a plazos': PhoneAndroidRounded,
  'Router WiFi 6': RouterRounded,
  'SIM Datos 50GB': SimCardRounded,
  'Roaming Internacional': PublicRounded,
  'Pack TV y Streaming': LiveTvRounded,
  'Seguro de Móvil': SecurityRounded,
};

// Telco-appropriate headline figure and feature tags per product.
// A mobile plan shows its monthly fee, a fibre plan shows its speed,
// a device shows an instalment or upfront amount, etc.
export interface ProductMeta {
  highlight: string; // headline figure (monthly fee, upfront amount, speed)
  highlightLabel: string; // small caption above the headline
  badges: string[]; // up to two relevant feature tags
}

const productMeta: Record<string, ProductMeta> = {
  'Tarifa Móvil 5GB': {
    highlight: '5,99 €/mes',
    highlightLabel: '5 GB',
    badges: ['Llamadas ilimitadas', 'Sin permanencia'],
  },
  'Tarifa Móvil 20GB': {
    highlight: '9,99 €/mes',
    highlightLabel: '20 GB · 5G',
    badges: ['Llamadas ilimitadas', 'Roaming UE'],
  },
  'Tarifa Móvil Ilimitada': {
    highlight: '19,99 €/mes',
    highlightLabel: 'Datos ilimitados',
    badges: ['Red 5G', 'Llamadas ilimitadas'],
  },
  'Tarifa Móvil 100GB 5G': {
    highlight: '14,99 €/mes',
    highlightLabel: '100 GB · 5G',
    badges: ['Red 5G', 'Llamadas ilimitadas'],
  },
  'Fibra 300 Mbps': {
    highlight: '25,99 €/mes',
    highlightLabel: '300 Mbps simétrica',
    badges: ['Router WiFi 6', 'Instalación gratis'],
  },
  'Fibra 600 Mbps': {
    highlight: '30,99 €/mes',
    highlightLabel: '600 Mbps simétrica',
    badges: ['Router WiFi 6', 'Sin permanencia'],
  },
  'Fibra 1 Gbps': {
    highlight: '39,99 €/mes',
    highlightLabel: '1 Gbps simétrica',
    badges: ['Máxima velocidad', 'Router WiFi 6'],
  },
  'Combo Fibra 600 + Móvil 20GB': {
    highlight: '45,99 €/mes',
    highlightLabel: 'Fibra 600 + 20 GB',
    badges: ['Todo en uno', 'Llamadas ilimitadas'],
  },
  'Combo Fibra 1Gb + Ilimitada': {
    highlight: '59,99 €/mes',
    highlightLabel: 'Fibra 1 Gb + ilimitado',
    badges: ['Máxima potencia', 'Datos ilimitados'],
  },
  'Combo Fibra 300 + Móvil 5GB': {
    highlight: '35,99 €/mes',
    highlightLabel: 'Fibra 300 + 5 GB',
    badges: ['Precio ajustado', 'Sin permanencia'],
  },
  'Smartphone 5G a plazos': {
    highlight: 'Desde 15,99 €/mes',
    highlightLabel: 'A 24 meses',
    badges: ['Sin intereses', 'Red 5G'],
  },
  'Router WiFi 6': {
    highlight: '59,99 €',
    highlightLabel: 'Pago único',
    badges: ['WiFi 6', 'Alta cobertura'],
  },
  'SIM Datos 50GB': {
    highlight: '12,99 €/mes',
    highlightLabel: '50 GB solo datos',
    badges: ['Para tablet/portátil', 'Red 5G'],
  },
  'Roaming Internacional': {
    highlight: '9,99 €/mes',
    highlightLabel: 'Roaming',
    badges: ['UE incluida', 'Destinos internacionales'],
  },
  'Pack TV y Streaming': {
    highlight: '12,99 €/mes',
    highlightLabel: 'TV + streaming',
    badges: ['Cientos de canales', 'Plataformas incluidas'],
  },
  'Seguro de Móvil': {
    highlight: '6,99 €/mes',
    highlightLabel: 'Protección',
    badges: ['Roturas y robo', 'Asistencia 24h'],
  },
};

export const resolveCategory = (name: string, category?: string): string =>
  (category && category.trim()) || productCategory[name] || 'Móvil';

export const getProductMeta = (name: string): ProductMeta =>
  productMeta[name] || { highlight: 'Sin permanencia', highlightLabel: '', badges: [] };

export const getCategoryColor = (category: string): string =>
  categoryColors[category] || '#E6007E';

export const getCategoryGradient = (category: string): string => {
  const [from, to] = categoryGradients[category] || ['#F0499F', '#E6007E'];
  return `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
};

export const getCategoryIcon = (cuisineType: string): IconType =>
  categoryIcons[cuisineType] || SmartphoneRounded;

export const getProductIcon = (name: string, category?: string): IconType =>
  productIcons[name] || categoryIcons[resolveCategory(name, category)] || SmartphoneRounded;

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
