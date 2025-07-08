
// Pricing structure based on house size and service type
const PRICING_MATRIX = {
  small: { // 0-1800 sqft
    'window-outside': 300,
    'window-inside': 300,
    'window-both': 547.20,
    'house-wash': 414.30,
    'house-wash-windows': 664.20,
    'driveway': 300,
    'driveway-house': 635.40,
    'gutter-inside': 300,
    'gutter-outside': 154,
    'gutter-both': 454,
    'roof': 'on-site'
  },
  medium: { // 1800-2800 sqft
    'window-outside': 357.30,
    'window-inside': 411.30,
    'window-both': 768.60,
    'house-wash': 627.30,
    'house-wash-windows': 984.60,
    'driveway': 314.10,
    'driveway-house': 941.10,
    'gutter-inside': 386.10,
    'gutter-outside': 300,
    'gutter-both': 682.20,
    'roof': 'on-site'
  },
  large: { // 2800-3500 sqft
    'window-outside': 431.10,
    'window-inside': 521.10,
    'window-both': 952.20,
    'house-wash': 888.30,
    'house-wash-windows': 1319.40,
    'driveway': 384.30,
    'driveway-house': 1272.60,
    'gutter-inside': 465.30,
    'gutter-outside': 357.30,
    'gutter-both': 822.60,
    'roof': 'on-site'
  },
  xlarge: { // 3500+ sqft
    'window-outside': 'on-site',
    'window-inside': 'on-site',
    'window-both': 'on-site',
    'house-wash': 'on-site',
    'house-wash-windows': 'on-site',
    'driveway': 'on-site',
    'driveway-house': 'on-site',
    'gutter-inside': 'on-site',
    'gutter-outside': 'on-site',
    'gutter-both': 'on-site',
    'roof': 'on-site'
  }
};

const SERVICE_NAMES = {
  'window-outside': 'Window Cleaning (Outside)',
  'window-inside': 'Window Cleaning (Inside)',
  'window-both': 'Window Cleaning (Both Sides)',
  'house-wash': 'House Washing',
  'house-wash-windows': 'House Wash + Windows',
  'driveway': 'Driveway Washing',
  'driveway-house': 'Driveway + House Washing',
  'gutter-inside': 'Gutter Cleaning (Inside)',
  'gutter-outside': 'Gutter Cleaning (Outside)',
  'gutter-both': 'Gutter Cleaning (Both)',
  'roof': 'Roof Cleaning'
};

const ADD_ON_NAMES = {
  'deck-wash': 'Deck Washing',
  'fence-wash': 'Fence Washing',
  'garage-floor': 'Garage Floor Cleaning',
  'concrete-sealing': 'Concrete Sealing'
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2
  }).format(amount);
};

export const calculateQuotePrice = (
  houseSize: string,
  services: string[],
  addOns: string[],
  addOnOptions: Array<{ id: string; label: string; price: number }>
) => {
  const servicePrices = [];
  const addOnPrices = [];
  let subtotal = 0;

  // Calculate service prices
  services.forEach(serviceId => {
    const price = PRICING_MATRIX[houseSize as keyof typeof PRICING_MATRIX]?.[serviceId as keyof typeof PRICING_MATRIX.small];
    
    if (price === 'on-site') {
      servicePrices.push({
        name: SERVICE_NAMES[serviceId as keyof typeof SERVICE_NAMES],
        price: 0,
        note: 'On-site quote required'
      });
    } else if (typeof price === 'number') {
      servicePrices.push({
        name: SERVICE_NAMES[serviceId as keyof typeof SERVICE_NAMES],
        price: price
      });
      subtotal += price;
    }
  });

  // Calculate add-on prices
  addOns.forEach(addOnId => {
    const addOn = addOnOptions.find(option => option.id === addOnId);
    if (addOn) {
      addOnPrices.push({
        name: ADD_ON_NAMES[addOnId as keyof typeof ADD_ON_NAMES] || addOn.label,
        price: addOn.price
      });
      subtotal += addOn.price;
    }
  });

  // Calculate tax (12% for BC)
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  return {
    services: servicePrices,
    addOns: addOnPrices,
    subtotal,
    tax,
    total
  };
};
