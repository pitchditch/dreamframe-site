
import { ADD_ONS } from '../data/constants';

/**
 * Formats a number as currency
 */
export const formatCurrency = (amount: number | null): string => {
  if (amount === null) return 'Custom Quote Required';
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Get pricing for a specific service and property size
 */
export const getPricing = (size: string, service: string): number | null => {
  if (service === 'Roof Cleaning' || size === 'xlarge') return null;

  const pricingMap = {
    small: {
      'Window Cleaning (Outside)': 300,
      'Window Cleaning (Inside)': 300,
      'Both Window Sides': 547.2,
      'House Washing': 414.3,
      'House Wash + Windows': 664.2,
      'Driveway Washing': 300,
      'Driveway + House Washing': 635.4,
      'Deck Washing': 300,
      'Gutter Cleaning (Inside)': 300,
      'Gutter Cleaning (Outside)': 154,
      'Gutter Cleaning (Both)': 454,
    },
    medium: {
      'Window Cleaning (Outside)': 357.3,
      'Window Cleaning (Inside)': 411.3,
      'Both Window Sides': 768.6,
      'House Washing': 627.3,
      'House Wash + Windows': 984.6,
      'Driveway Washing': 314.1,
      'Driveway + House Washing': 941.1,
      'Deck Washing': 300,
      'Gutter Cleaning (Inside)': 386.1,
      'Gutter Cleaning (Outside)': 300,
      'Gutter Cleaning (Both)': 682.2,
    },
    large: {
      'Window Cleaning (Outside)': 431.1,
      'Window Cleaning (Inside)': 521.1,
      'Both Window Sides': 952.2,
      'House Washing': 888.3,
      'House Wash + Windows': 1319.4,
      'Driveway Washing': 384.3,
      'Driveway + House Washing': 1272.6,
      'Deck Washing': 300,
      'Gutter Cleaning (Inside)': 465.3,
      'Gutter Cleaning (Outside)': 357.3,
      'Gutter Cleaning (Both)': 822.6,
    },
    xlarge: {
      'Roof Cleaning': null
    }
  };

  const typedPricingMap = pricingMap as Record<string, Record<string, number | null>>;
  return typedPricingMap[size]?.[service] ?? null;
};

// Re-export ADD_ONS for backwards compatibility
export { ADD_ONS };
