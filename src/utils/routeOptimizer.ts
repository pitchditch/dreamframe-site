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

const MAX_STOREFRONT_CRAWL_RESULTS = 50;
const OVERPASS_HOST = 'overpass-api.de';
const STOREFRONT_QUERY_MARKERS = ['["shop"]', '["amenity"'];

const normalizeStorefrontText = (value: unknown): string =>
  String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const storefrontDistanceKm = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  const earthRadiusKm = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) ** 2;

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const getStorefrontCenter = (element: any): { lat: number; lng: number } | null => {
  const lat = Number(element?.center?.lat ?? element?.lat);
  const lng = Number(element?.center?.lon ?? element?.lon);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
};

const getStorefrontStreetAddress = (tags: Record<string, any>): string => {
  const street = String(tags?.['addr:street'] || '').trim();
  const houseNumber = String(tags?.['addr:housenumber'] || '').trim();
  if (!street) return '';
  return `${houseNumber} ${street}`.trim();
};

const getStorefrontType = (tags: Record<string, any>): string =>
  String(tags?.shop || tags?.amenity || '').toLowerCase().trim();

const isClosedOrLowQualityStorefront = (element: any): boolean => {
  const tags = element?.tags || {};
  const name = String(tags.name || '').trim();
  const shopType = String(tags.shop || '').toLowerCase().trim();

  if (!name || normalizeStorefrontText(name) === 'unknown business') return true;

  if (
    ['vacant', 'no', 'closed', 'disused', 'abandoned', 'construction'].includes(shopType)
  ) {
    return true;
  }

  const tagKeys = Object.keys(tags);
  if (
    tagKeys.some(
      (key) =>
        key.startsWith('disused:') ||
        key.startsWith('abandoned:') ||
        key.startsWith('demolished:')
    )
  ) {
    return true;
  }

  return false;
};

const storefrontBaseScore = (shopType: string): number => {
  if (['restaurant', 'cafe', 'bar', 'fast_food', 'ice_cream', 'bakery'].includes(shopType)) {
    return 100;
  }

  if (['hairdresser', 'beauty', 'beauty_salon', 'nail_salon'].includes(shopType)) {
    return 98;
  }

  if (
    [
      'supermarket',
      'convenience',
      'clothes',
      'shoes',
      'optician',
      'jewelry',
      'florist',
      'gift',
      'books',
      'electronics',
      'mobile_phone',
      'sports',
      'pet',
      'variety_store',
      'department_store',
      'furniture',
      'hardware',
      'chemist',
      'alcohol',
      'bicycle',
    ].includes(shopType)
  ) {
    return 92;
  }

  if (['bank', 'pharmacy'].includes(shopType)) return 84;
  if (['fitness_centre', 'gym'].includes(shopType)) return 80;
  if (['dentist', 'doctors', 'clinic'].includes(shopType)) return 74;
  if (['car_repair', 'car_wash', 'car', 'tyres'].includes(shopType)) return 52;

  // Named shops not covered above are still useful, but rank below the strongest glass-front targets.
  return 76;
};

const parseStorefrontCrawlOrigin = (
  body: unknown
): { lat: number; lng: number; radiusMeters: number } | null => {
  if (typeof body !== 'string') return null;

  const match = body.match(
    /around:\s*(\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/
  );
  if (!match) return null;

  const radiusMeters = Number(match[1]);
  const lat = Number(match[2]);
  const lng = Number(match[3]);

  if (![radiusMeters, lat, lng].every(Number.isFinite)) return null;
  return { lat, lng, radiusMeters };
};

const rankStorefrontElements = (elements: any[], queryBody: unknown): any[] => {
  const origin = parseStorefrontCrawlOrigin(queryBody);
  const deduped = new Map<string, { element: any; score: number; distanceMeters: number }>();

  for (const element of elements) {
    if (isClosedOrLowQualityStorefront(element)) continue;

    const center = getStorefrontCenter(element);
    if (!center) continue;

    const tags = element?.tags || {};
    const name = String(tags.name || '').trim();
    const normalizedName = normalizeStorefrontText(name);
    if (!normalizedName) continue;

    const shopType = getStorefrontType(tags);
    const address = getStorefrontStreetAddress(tags);
    const normalizedAddress = normalizeStorefrontText(address);

    const distanceMeters = origin
      ? Math.round(storefrontDistanceKm(origin.lat, origin.lng, center.lat, center.lng) * 1000)
      : 0;

    let score = storefrontBaseScore(shopType);

    // Favor records that are immediately actionable in the field.
    if (address) score += 5;
    if (tags.phone || tags['contact:phone']) score += 3;
    if (tags.website || tags['contact:website']) score += 2;
    if (tags.opening_hours) score += 2;

    // Nearby businesses are more efficient to walk while keeping category quality dominant.
    if (origin && origin.radiusMeters > 0) {
      const normalizedDistance = Math.min(distanceMeters / origin.radiusMeters, 1);
      score -= Math.round(normalizedDistance * 14);
    }

    score = Math.max(0, Math.round(score));
    const priority = score >= 92 ? 'A' : score >= 78 ? 'B' : 'C';

    const dedupeKey = normalizedAddress
      ? `${normalizedName}|${normalizedAddress}`
      : `${normalizedName}|${center.lat.toFixed(4)}|${center.lng.toFixed(4)}`;

    const rankedElement = {
      ...element,
      tags: {
        ...tags,
        'crawler:score': String(score),
        'crawler:priority': priority,
        'crawler:distance_m': String(distanceMeters),
      },
    };

    const existing = deduped.get(dedupeKey);
    if (
      !existing ||
      score > existing.score ||
      (score === existing.score && distanceMeters < existing.distanceMeters)
    ) {
      deduped.set(dedupeKey, { element: rankedElement, score, distanceMeters });
    }
  }

  return Array.from(deduped.values())
    .sort((a, b) => b.score - a.score || a.distanceMeters - b.distanceMeters)
    .slice(0, MAX_STOREFRONT_CRAWL_RESULTS)
    .map(({ element }) => element);
};

const shouldFilterStorefrontOverpassRequest = (input: RequestInfo | URL, init?: RequestInit): boolean => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
  if (!url.includes(OVERPASS_HOST)) return false;

  const body = init?.body;
  if (typeof body !== 'string') return false;

  return STOREFRONT_QUERY_MARKERS.every((marker) => body.includes(marker));
};

const installStorefrontCrawlFilter = () => {
  if (typeof window === 'undefined') return;

  const globalWindow = window as typeof window & {
    __bcStorefrontCrawlFilterInstalled?: boolean;
  };

  if (globalWindow.__bcStorefrontCrawlFilterInstalled) return;
  globalWindow.__bcStorefrontCrawlFilterInstalled = true;

  const nativeFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const response = await nativeFetch(input, init);

    if (!response.ok || !shouldFilterStorefrontOverpassRequest(input, init)) {
      return response;
    }

    try {
      const payload = await response.clone().json();
      if (!Array.isArray(payload?.elements)) return response;

      const filteredElements = rankStorefrontElements(payload.elements, init?.body);
      const headers = new Headers(response.headers);
      headers.delete('content-length');
      headers.delete('content-encoding');
      headers.set('content-type', 'application/json');

      return new Response(
        JSON.stringify({
          ...payload,
          elements: filteredElements,
          crawlerMeta: {
            rawCount: payload.elements.length,
            shownCount: filteredElements.length,
            maxResults: MAX_STOREFRONT_CRAWL_RESULTS,
          },
        }),
        {
          status: response.status,
          statusText: response.statusText,
          headers,
        }
      );
    } catch (error) {
      console.warn('Storefront crawl ranking skipped; using raw Overpass results.', error);
      return response;
    }
  };
};

installStorefrontCrawlFilter();

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
