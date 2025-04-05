
export interface ServiceOption {
  id: string;
  label: string;
}

export interface ServicePricing {
  small: number;
  medium: number;
  large: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  hasOptions: boolean;
  options?: ServiceOption[];
  multiSelect?: boolean;
  info?: string;
  pricing?: ServicePricing; // Added pricing property
}

export const services: Service[] = [
  {
    id: 'window-cleaning',
    title: 'Window Cleaning',
    description: 'Professional window cleaning with streak-free results',
    hasOptions: true,
    options: [
      { id: 'outside', label: 'Outside' },
      { id: 'inside', label: 'Inside' },
      { id: 'both', label: 'Both' }
    ],
    info: 'Our water purification technology ensures that windows are spot free and streak free.',
    pricing: {
      small: 300,
      medium: 357.30,
      large: 431.10
    }
  },
  {
    id: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    description: 'Thorough gutter cleaning to prevent damage',
    hasOptions: true,
    options: [
      { id: 'inside', label: 'Inside the gutter' },
      { id: 'outside', label: 'Outside the gutter' },
      { id: 'both', label: 'Both' }
    ],
    info: 'With our equipment and professional training, we\'ll take the worry out of cleaning your gutters.',
    pricing: {
      small: 454.00,
      medium: 686.10,
      large: 822.60
    }
  },
  {
    id: 'pressure-washing',
    title: 'Pressure Washing',
    description: 'High-pressure cleaning for stubborn dirt and grime',
    hasOptions: true,
    options: [
      { id: 'house-washing', label: 'House washing' },
      { id: 'driveway-washing', label: 'Driveway washing' },
      { id: 'deck-washing', label: 'Deck washing' }
    ],
    multiSelect: true,
    pricing: {
      small: 414.30,
      medium: 627.30,
      large: 888.30
    }
  },
  {
    id: 'roof-cleaning',
    title: 'Roof Cleaning',
    description: 'Gentle roof cleaning to remove moss and algae',
    hasOptions: false,
    pricing: {
      small: 500,
      medium: 750,
      large: 1000
    }
  },
];
