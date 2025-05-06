
// Constants for price calculator

// Property sizes
export const PROPERTY_SIZES = [{
  id: 'small',
  label: '0–1800 sq. ft.',
  icon: 'home-sm'
}, {
  id: 'medium',
  label: '1800–2800 sq. ft.',
  icon: 'home-md'
}, {
  id: 'large',
  label: '2800–3500 sq. ft.',
  icon: 'home-lg'
}, {
  id: 'xlarge',
  label: 'Over 3500 sq. ft. (On-site quote required)',
  icon: 'building'
}];

// Pricing matrix
export const PRICING = {
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

// Service icons mapping
export const SERVICE_ICONS = {
  'Window Cleaning (Outside)': 'droplets',
  'Window Cleaning (Inside)': 'droplets',
  'Both Window Sides': 'droplets',
  'House Washing': 'home',
  'House Wash + Windows': 'home',
  'Driveway Washing': 'car',
  'Driveway + House Washing': 'home',
  'Deck Washing': 'cloud-rain',
  'Gutter Cleaning (Inside)': 'home',
  'Gutter Cleaning (Outside)': 'home',
  'Gutter Cleaning (Both)': 'home',
  'Roof Cleaning': 'cloud-rain'
};

// Service categories for dropdowns
export const SERVICE_CATEGORIES = [{
  name: 'Window Cleaning',
  services: ['Window Cleaning (Outside)', 'Window Cleaning (Inside)', 'Both Window Sides']
}, {
  name: 'House & Property Washing',
  services: ['House Washing', 'House Wash + Windows', 'Driveway Washing', 'Driveway + House Washing']
}, {
  name: 'Gutter Cleaning',
  services: ['Gutter Cleaning (Inside)', 'Gutter Cleaning (Outside)', 'Gutter Cleaning (Both)']
}, {
  name: 'Other Services',
  services: ['Deck Washing', 'Roof Cleaning']
}];

// Add-on services
export const ADD_ONS = [{
  id: 'moss-treatment',
  name: 'Moss Treatment',
  price: 149
}, {
  id: 'gutter-guards',
  name: 'Gutter Guards Installation',
  price: 299
}, {
  id: 'fascia-cleaning',
  name: 'Fascia Cleaning',
  price: 99
}, {
  id: 'window-track',
  name: 'Window Track Cleaning',
  price: 49
}, {
  id: 'screen-cleaning',
  name: 'Screen Cleaning',
  price: 39
}];

// Promo information
export const PROMOS = [{
  title: "Bundle & Save – $200 OFF",
  description: "Book 3 or more services and get an instant $200 discount on your total. Mix and match from: Window Cleaning (Inside/Outside), House Washing, Driveway Cleaning, Gutter Cleaning, Deck Washing. No code needed — discount is automatic.",
  color: "bg-yellow-400 text-black"
}, {
  title: "Referral Program – Refer & Earn",
  description: "Refer a friend and get $50 off your next service when they book. They just need to mention your name during booking.",
  color: "bg-blue-100 text-blue-900"
}];
