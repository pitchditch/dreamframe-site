import { HousePin } from '@/components/house-tracking/types';

export interface OptimizedRoute {
  cityName: string;
  pins: HousePin[];
  totalDistance: number;
  color: string;
  // Google Maps route data (populated after fetching)
  googleRouteGeometry?: Array<{ lat: number; lng: number }>;
  googleRouteDuration?: number; // seconds
  googleRouteDistance?: number; // meters
  hasUphill?: boolean;
  hasDownhill?: boolean;
}

/**
 * Calculate distance between two coordinates in kilometers using Haversine formula
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Extract city name from address
 */
function extractCityFromAddress(address: string): string {
  // Common BC cities
  const cities = [
    'Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Coquitlam', 
    'Langley', 'Delta', 'New Westminster', 'Port Coquitlam', 
    'Port Moody', 'Maple Ridge', 'Pitt Meadows', 'White Rock',
    'Township of Langley', 'Langley City'
  ];
  
  const upperAddress = address.toUpperCase();
  for (const city of cities) {
    if (upperAddress.includes(city.toUpperCase())) {
      return city;
    }
  }
  
  return 'Unknown';
}

/**
 * Optimize route using nearest neighbor algorithm
 */
function optimizeRouteOrder(pins: HousePin[]): HousePin[] {
  if (pins.length <= 1) return pins;
  
  const unvisited = [...pins];
  const route: HousePin[] = [];
  
  // Start with first pin
  let current = unvisited.shift()!;
  route.push(current);
  
  // Find nearest neighbor for each step
  while (unvisited.length > 0) {
    let nearestIndex = 0;
    let nearestDistance = Infinity;
    
    for (let i = 0; i < unvisited.length; i++) {
      const distance = calculateDistance(
        current.lat,
        current.lng,
        unvisited[i].lat,
        unvisited[i].lng
      );
      
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = i;
      }
    }
    
    current = unvisited.splice(nearestIndex, 1)[0];
    route.push(current);
  }
  
  return route;
}

/**
 * Calculate total route distance
 */
function calculateRouteDistance(pins: HousePin[]): number {
  let totalDistance = 0;
  for (let i = 0; i < pins.length - 1; i++) {
    totalDistance += calculateDistance(
      pins[i].lat,
      pins[i].lng,
      pins[i + 1].lat,
      pins[i + 1].lng
    );
  }
  return totalDistance;
}

/**
 * Generate optimized routes grouped by city
 */
export function generateOptimizedRoutes(pins: HousePin[]): OptimizedRoute[] {
  // Group pins by city
  const cityGroups = new Map<string, HousePin[]>();
  
  pins.forEach(pin => {
    const city = extractCityFromAddress(pin.address);
    if (!cityGroups.has(city)) {
      cityGroups.set(city, []);
    }
    cityGroups.get(city)!.push(pin);
  });
  
  // City-specific colors
  const cityColors: { [key: string]: string } = {
    'Vancouver': '#3b82f6',
    'Surrey': '#10b981',
    'Burnaby': '#f59e0b',
    'Richmond': '#ef4444',
    'Coquitlam': '#8b5cf6',
    'Langley': '#ec4899',
    'Langley City': '#ec4899',
    'Township of Langley': '#14b8a6',
    'Delta': '#f97316',
    'New Westminster': '#84cc16',
    'Port Coquitlam': '#06b6d4',
    'Port Moody': '#a855f7',
    'Maple Ridge': '#eab308',
    'Pitt Meadows': '#22c55e',
    'White Rock': '#6366f1',
    'Unknown': '#6b7280'
  };
  
  // Generate optimized routes for each city
  const routes: OptimizedRoute[] = [];
  
  cityGroups.forEach((cityPins, cityName) => {
    if (cityPins.length > 1) {
      const optimizedPins = optimizeRouteOrder(cityPins);
      const totalDistance = calculateRouteDistance(optimizedPins);
      
      routes.push({
        cityName,
        pins: optimizedPins,
        totalDistance,
        color: cityColors[cityName] || cityColors['Unknown']
      });
    }
  });
  
  // Sort by city name for consistency
  return routes.sort((a, b) => a.cityName.localeCompare(b.cityName));
}
