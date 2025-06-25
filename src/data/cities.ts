
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

export const getCityBySlug = (slug: string): City | undefined => {
  return cities.find(city => city.slug === slug);
};
