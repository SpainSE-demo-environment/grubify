import React from 'react';
import { Box, SvgIconProps } from '@mui/material';
import {
  AccountBalanceWalletRounded,
  SavingsRounded,
  CreditCardRounded,
  CreditScoreRounded,
  RequestQuoteRounded,
  PriceCheckRounded,
  HomeRounded,
  HouseRounded,
  BeachAccessRounded,
  PieChartRounded,
  ShowChartRounded,
  TrendingUpRounded,
  AccountBalanceRounded,
  MedicalServicesRounded,
  DirectionsCarRounded,
  TwoWheelerRounded,
  ShieldRounded,
} from '@mui/icons-material';

type IconType = React.ComponentType<SvgIconProps>;

// Solid brand color per financial category (used for chips, text, etc.)
export const categoryColors: Record<string, string> = {
  Cuentas: '#4F46E5',
  Tarjetas: '#DB2777',
  Préstamos: '#EA580C',
  Inversión: '#0891B2',
  Ahorro: '#059669',
  Seguros: '#0D9488',
};

// Two-tone gradient per category for the icon backgrounds
const categoryGradients: Record<string, [string, string]> = {
  Cuentas: ['#6366F1', '#4F46E5'],
  Tarjetas: ['#EC4899', '#DB2777'],
  Préstamos: ['#FB923C', '#EA580C'],
  Inversión: ['#22D3EE', '#0891B2'],
  Ahorro: ['#34D399', '#059669'],
  Seguros: ['#2DD4BF', '#0D9488'],
};

// Category shown per product (used when the API payload omits the category,
// e.g. cart items resolved through the simplified helper)
const productCategory: Record<string, string> = {
  'Cuenta Personal': 'Cuentas',
  'Cuenta de Ahorro': 'Cuentas',
  'Tarjeta de Débito': 'Tarjetas',
  'Tarjeta de Crédito': 'Tarjetas',
  'Préstamo Personal': 'Préstamos',
  'Préstamo Personal Preconcedido': 'Préstamos',
  Hipoteca: 'Préstamos',
  'Plan de Pensiones': 'Inversión',
  'Fondos de Inversión': 'Inversión',
  'Acciones y ETFs': 'Inversión',
  Depósito: 'Ahorro',
  'Cuenta de Ahorro Remunerada': 'Ahorro',
  'Seguro de Salud': 'Seguros',
  'Seguro de Hogar': 'Seguros',
  'Seguro de Auto': 'Seguros',
  'Seguro de Moto': 'Seguros',
};

// One themed (Rounded) icon per category
const categoryIcons: Record<string, IconType> = {
  Cuentas: AccountBalanceWalletRounded,
  Tarjetas: CreditCardRounded,
  Préstamos: RequestQuoteRounded,
  Inversión: TrendingUpRounded,
  Ahorro: SavingsRounded,
  Seguros: ShieldRounded,
};

// One themed (Rounded) icon per product
const productIcons: Record<string, IconType> = {
  'Cuenta Personal': AccountBalanceWalletRounded,
  'Cuenta de Ahorro': SavingsRounded,
  'Tarjeta de Débito': CreditCardRounded,
  'Tarjeta de Crédito': CreditScoreRounded,
  'Préstamo Personal': RequestQuoteRounded,
  'Préstamo Personal Preconcedido': PriceCheckRounded,
  Hipoteca: HomeRounded,
  'Plan de Pensiones': BeachAccessRounded,
  'Fondos de Inversión': PieChartRounded,
  'Acciones y ETFs': ShowChartRounded,
  Depósito: AccountBalanceRounded,
  'Cuenta de Ahorro Remunerada': SavingsRounded,
  'Seguro de Salud': MedicalServicesRounded,
  'Seguro de Hogar': HouseRounded,
  'Seguro de Auto': DirectionsCarRounded,
  'Seguro de Moto': TwoWheelerRounded,
};

export const resolveCategory = (name: string, category?: string): string =>
  (category && category.trim()) || productCategory[name] || 'Cuentas';

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
