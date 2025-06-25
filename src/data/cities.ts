

export interface City {
  name: string;
  slug: string;
}

export interface CityData extends City {
  postalCodePrefix: string;
  nearbyAreas: string[];
  testimonials: Array<{
    author: string;
    text: string;
    rating: number;
  }>;
}

export const cities: City[] = [
  { name: 'Surrey', slug: 'surrey' },
  { name: 'White Rock', slug: 'white-rock' },
  { name: 'Langley', slug: 'langley' },
  { name: 'Richmond', slug: 'richmond' },
  { name: 'Burnaby', slug: 'burnaby' },
  { name: 'Vancouver', slug: 'vancouver' },
  { name: 'Delta', slug: 'delta' }
];

export const getCityBySlug = (slug: string): City | CityData | undefined => {
  const city = cities.find(city => city.slug === slug);
  if (!city) return undefined;
  
  // Return enhanced city data with postal code prefix for known cities
  const cityDataMap: Record<string, CityData> = {
    'surrey': {
      ...city,
      postalCodePrefix: 'V3R, V3S, V3T, V3V, V3W, V3X, V4N',
      nearbyAreas: ['White Rock', 'Langley', 'Delta'],
      testimonials: []
    },
    'white-rock': {
      ...city,
      postalCodePrefix: 'V4B',
      nearbyAreas: ['Surrey', 'Langley'],
      testimonials: []
    },
    'langley': {
      ...city,
      postalCodePrefix: 'V1M, V2Y, V2Z, V3A',
      nearbyAreas: ['Surrey', 'White Rock'],
      testimonials: []
    },
    'richmond': {
      ...city,
      postalCodePrefix: 'V6V, V6W, V6X, V6Y, V7A, V7C, V7E',
      nearbyAreas: ['Vancouver', 'Burnaby'],
      testimonials: []
    },
    'burnaby': {
      ...city,
      postalCodePrefix: 'V3J, V3N, V5A, V5B, V5C, V5E, V5G, V5H, V5J',
      nearbyAreas: ['Vancouver', 'Richmond'],
      testimonials: []
    },
    'vancouver': {
      ...city,
      postalCodePrefix: 'V5K, V5L, V5M, V5N, V5P, V5R, V5S, V5T, V5V, V5W, V5X, V5Y, V5Z, V6A, V6B, V6C, V6E, V6G, V6H, V6J, V6K, V6L, V6M, V6N, V6P, V6R, V6S, V6T, V6Z',
      nearbyAreas: ['Burnaby', 'Richmond'],
      testimonials: []
    },
    'delta': {
      ...city,
      postalCodePrefix: 'V4C, V4E, V4K, V4L, V4M',
      nearbyAreas: ['Surrey', 'Richmond'],
      testimonials: []
    }
  };
  
  return cityDataMap[slug] || city;
};
