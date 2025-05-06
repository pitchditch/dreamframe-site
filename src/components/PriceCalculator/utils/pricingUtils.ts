
// Utility functions for price calculations

/**
 * Get the pricing for a specific service based on property size
 */
export function getPricing(size: string, service: string): number | null {
  // Only handle "Roof Cleaning" as on-site estimate
  if (service === 'Roof Cleaning') {
    return null;
  }
  if (size === 'xlarge') {
    return null;
  }

  // Get the pricing from the PRICING object based on size and service
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
      'Roof Cleaning': null
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
      'Roof Cleaning': null
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
      'Roof Cleaning': null
    },
    xlarge: {
      'Roof Cleaning': null
    }
  };

  // Fix the TypeScript error by using proper type annotations
  const typedPricingMap = pricingMap as Record<string, Record<string, number | null>>;
  return typedPricingMap[size] && typedPricingMap[size][service] || null;
}

/**
 * Format a number as currency or return a message for null values
 */
export function formatCurrency(n: number | null): string {
  if (!n && n !== 0) return "On-site quote required";
  return `$${n.toLocaleString(undefined, {
    minimumFractionDigits: 2
  })}`;
}

/**
 * Check if a service should be disabled based on selected services
 */
export function isServiceDisabled(service: string, services: string[], size: string): boolean {
  if (services.includes('Both Window Sides')) {
    if (service === 'Window Cleaning (Outside)' || service === 'Window Cleaning (Inside)') return true;
  }
  if (services.includes('House Wash + Windows')) {
    if (service === 'House Washing' || service === 'Both Window Sides') return true;
  }
  if (services.includes('Driveway + House Washing')) {
    if (service === 'Driveway Washing' || service === 'House Washing') return true;
  }
  if (services.includes('Gutter Cleaning (Both)')) {
    if (service === 'Gutter Cleaning (Inside)' || service === 'Gutter Cleaning (Outside)') return true;
  }
  if (service === 'Roof Cleaning' && size !== 'xlarge' && size !== '') {
    // Allow selection but price will state "On-site quote required"
    return false;
  }
  if (size === 'xlarge' && service !== 'Roof Cleaning') return true;
  return false;
}
