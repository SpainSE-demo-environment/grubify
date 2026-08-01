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

// Banking-appropriate headline figure and feature tags per product.
// This replaces the food-style "price" display: a loan shows a rate,
// a card shows a credit limit, an insurance shows a monthly premium, etc.
export interface ProductMeta {
  highlight: string; // headline figure (rate, amount, monthly fee, "Sin comisiones")
  highlightLabel: string; // small caption above the headline
  badges: string[]; // up to two relevant feature tags
}

const productMeta: Record<string, ProductMeta> = {
  'Cuenta Personal': {
    highlight: 'Sin comisiones',
    highlightLabel: 'Cuenta corriente',
    badges: ['Sin comisiones', '100% online'],
  },
  'Cuenta de Ahorro': {
    highlight: '0,75%',
    highlightLabel: 'TAE',
    badges: ['Sin comisiones', 'Liquidez total'],
  },
  'Tarjeta de Débito': {
    highlight: '0 €',
    highlightLabel: 'Cuota anual',
    badges: ['Sin comisiones', 'Contactless'],
  },
  'Tarjeta de Crédito': {
    highlight: 'Hasta 6.000 €',
    highlightLabel: 'Límite de crédito',
    badges: ['Pago aplazado', 'Gratis 1er año'],
  },
  'Préstamo Personal': {
    highlight: '6,95%',
    highlightLabel: 'TIN desde',
    badges: ['Hasta 60.000 €', 'Sin comisión de apertura'],
  },
  'Préstamo Personal Preconcedido': {
    highlight: 'Hasta 30.000 €',
    highlightLabel: 'Preconcedido',
    badges: ['Al instante', 'Sin papeleo'],
  },
  Hipoteca: {
    highlight: '2,90%',
    highlightLabel: 'TIN fijo',
    badges: ['Hasta 30 años', 'Cuota estable'],
  },
  'Plan de Pensiones': {
    highlight: 'Desde 30 €/mes',
    highlightLabel: 'Aportación',
    badges: ['Ventajas fiscales', 'Aportación flexible'],
  },
  'Fondos de Inversión': {
    highlight: '+5,2%',
    highlightLabel: 'Rentab. anual*',
    badges: ['Gestión activa', 'Diversificado'],
  },
  'Acciones y ETFs': {
    highlight: '0 €',
    highlightLabel: 'Comisión de custodia',
    badges: ['Tiempo real', 'Bajas comisiones'],
  },
  Depósito: {
    highlight: '3,00%',
    highlightLabel: 'TAE a 12 meses',
    badges: ['Capital garantizado'],
  },
  'Cuenta de Ahorro Remunerada': {
    highlight: '2,50%',
    highlightLabel: 'TAE',
    badges: ['Liquidez diaria', 'Sin permanencia'],
  },
  'Seguro de Salud': {
    highlight: 'Desde 45 €/mes',
    highlightLabel: 'Prima',
    badges: ['Sin copagos', 'Videoconsulta 24h'],
  },
  'Seguro de Hogar': {
    highlight: 'Desde 18 €/mes',
    highlightLabel: 'Prima',
    badges: ['Cobertura integral', 'Asistencia 24h'],
  },
  'Seguro de Auto': {
    highlight: 'Desde 30 €/mes',
    highlightLabel: 'Prima',
    badges: ['Todo riesgo', 'Asistencia en carretera'],
  },
  'Seguro de Moto': {
    highlight: 'Desde 20 €/mes',
    highlightLabel: 'Prima',
    badges: ['Defensa jurídica', 'Asistencia 24h'],
  },
};

export const resolveCategory = (name: string, category?: string): string =>
  (category && category.trim()) || productCategory[name] || 'Cuentas';

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
