import rawData from '../../data/processed/finnova_analytics.json';
import { FinnovaAnalyticsData } from '../types';

export const finnovaData = rawData as unknown as FinnovaAnalyticsData;

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('es-ES', {
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}
