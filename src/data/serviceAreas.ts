export type ServiceAreaCoordinate = [number, number];

// Approximate operating boundaries used for the public service-area map.
// Final availability is confirmed after a customer submits their address.
export const extendedServiceArea: ServiceAreaCoordinate[] = [
  [49.425, -123.285],
  [49.435, -122.765],
  [49.360, -122.335],
  [49.235, -121.930],
  [49.090, -121.650],
  [48.980, -121.720],
  [48.970, -122.760],
  [48.995, -123.245],
  [49.115, -123.410],
  [49.315, -123.355],
];

export const primaryServiceArea: ServiceAreaCoordinate[] = [
  [49.205, -123.230],
  [49.245, -122.775],
  [49.205, -122.360],
  [48.990, -122.345],
  [48.980, -122.905],
  [49.000, -123.205],
];

export const whiteRockBase: ServiceAreaCoordinate = [49.0253, -122.8029];

export const primaryServiceCities = [
  'White Rock',
  'South Surrey',
  'Surrey',
  'Delta',
  'Langley',
];

export const extendedServiceCities = [
  'Vancouver',
  'Burnaby',
  'Richmond',
  'New Westminster',
  'Tri-Cities',
  'Maple Ridge',
  'Pitt Meadows',
  'North Vancouver',
  'Abbotsford',
  'Mission',
  'Chilliwack',
];
