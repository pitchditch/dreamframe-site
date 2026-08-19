import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HousePin, RouteSession } from './types';
import { useGoogleMapsRouting } from '@/hooks/useGoogleMapsRouting';
import { usePropertyEnrichment } from '@/hooks/usePropertyEnrichment';
import { toast } from 'sonner';

interface MapComponentProps {
  pins: HousePin[];
  routes: RouteSession[];
  onAddPin: (newPin: Omit<HousePin, 'id'>) => void;
  onUpdatePin: (pinId: string, updates: Partial<HousePin>) => void;
  onUpdateRoutes: React.Dispatch<React.SetStateAction<RouteSession[]>>;
  onClearAllPins?: () => void;
  highlightedPinId: string | null;
  onPinHover: React.Dispatch<React.SetStateAction<string | null>>;
}

type Priority = 'A' | 'B' | 'C';
type StorefrontCategory = 'food' | 'salon' | 'retail' | 'medical' | 'finance' | 'fitness' | 'automotive' | 'other';
type RouteKind = 'residential' | 'storefront' | null;

interface StorefrontCandidate {
  id: string;
  lat: number;
  lng: number;
  type: 'commercial';
  businessName: string;
  buildingType: string;
  storefrontType: NonNullable<HousePin['storefrontType']>;
  category: StorefrontCategory;
  address: string;
  phone: string | null;
  website: string | null;
  openingHours: string | null;
  score: number;
  priority: Priority;
  distanceMeters: number;
}

interface ResidentialCandidate {
  id: string;
  lat: number;
  lng: number;
  type: 'residential' | 'commercial' | 'other';
  buildingType: string;
  address: string;
  distanceMeters: number;
}

type RouteTarget = StorefrontCandidate | ResidentialCandidate;

interface CrawlStats {
  rawCount: number;
  eligibleCount: number;
  qualifiedCount: number;
  excludedVisited: number;
}

interface CrawlSnapshot {
  id: string;
  createdAt: string;
  origin: { lat: number; lng: number };
  results: StorefrontCandidate[];
  stats: CrawlStats;
}

const STOREFRONT_RADIUS_METERS = 1500;
const RESIDENTIAL_RADIUS_METERS = 2000;
const MAX_STOREFRONT_RESULTS = 50;
const ROUTE_BATCH_SIZE = 20;
const CRAWL_HISTORY_KEY = 'bc-storefront-crawl-history-v2';

const statusConfig: Record<HousePin['status'], { color: string; label: string }> = {
  visited: { color: '#3b82f6', label: 'Visited' },
  interested: { color: '#10b981', label: 'Interested' },
  'not-interested': { color: '#ef4444', label: 'Not Interested' },
  completed: { color: '#8b5cf6', label: 'Completed' },
  'revisit-later': { color: '#fbbf24', label: 'Revisit Later' },
  'needs-quote': { color: '#f97316', label: 'Needs Quote' },
};

const normalizeText = (value: unknown) =>
  String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const distanceKm = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const toRad = (degrees: number) => degrees * (Math.PI / 180);
  const radius = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const getElementCenter = (element: any): { lat: number; lng: number } | null => {
  const lat = Number(element?.center?.lat ?? element?.lat);
  const lng = Number(element?.center?.lon ?? element?.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
};

const streetAddress = (tags: Record<string, any>) => {
  const street = String(tags?.['addr:street'] || '').trim();
  const number = String(tags?.['addr:housenumber'] || '').trim();
  return street ? `${number} ${street}`.trim() : '';
};

const storefrontCategory = (shopType: string): StorefrontCategory => {
  if (['restaurant', 'cafe', 'bar', 'fast_food', 'ice_cream', 'bakery', 'food_court'].includes(shopType)) return 'food';
  if (['hairdresser', 'beauty', 'beauty_salon', 'nail_salon', 'massage'].includes(shopType)) return 'salon';
  if (['dentist', 'doctors', 'clinic', 'pharmacy'].includes(shopType)) return 'medical';
  if (['bank'].includes(shopType)) return 'finance';
  if (['fitness_centre', 'gym'].includes(shopType)) return 'fitness';
  if (['car_repair', 'car_wash', 'car', 'tyres'].includes(shopType)) return 'automotive';
  if (
    [
      'supermarket', 'convenience', 'clothes', 'shoes', 'optician', 'jewelry', 'florist', 'gift',
      'books', 'electronics', 'mobile_phone', 'sports', 'pet', 'variety_store', 'department_store',
      'furniture', 'hardware', 'chemist', 'alcohol', 'bicycle', 'boutique', 'cosmetics', 'copyshop',
    ].includes(shopType)
  ) return 'retail';
  return 'other';
};

const storefrontPinType = (shopType: string): NonNullable<HousePin['storefrontType']> => {
  if (shopType === 'nail_salon') return 'nail-salon';
  if (['hairdresser', 'beauty', 'beauty_salon', 'massage'].includes(shopType)) return 'hair-salon';
  if (['cafe', 'bakery'].includes(shopType)) return 'coffee-shop';
  if (['restaurant', 'bar', 'fast_food', 'ice_cream', 'food_court'].includes(shopType)) return 'restaurant';
  if (['dentist', 'doctors', 'clinic', 'pharmacy'].includes(shopType)) return 'medical';
  if (['fitness_centre', 'gym'].includes(shopType)) return 'gym';
  if (['car_repair', 'car_wash', 'car', 'tyres'].includes(shopType)) return 'automotive';
  if (storefrontCategory(shopType) === 'retail') return 'retail';
  return 'other';
};

const baseStorefrontScore = (shopType: string) => {
  if (['restaurant', 'cafe', 'bar', 'fast_food', 'ice_cream', 'bakery', 'food_court'].includes(shopType)) return 100;
  if (['hairdresser', 'beauty', 'beauty_salon', 'nail_salon', 'massage'].includes(shopType)) return 98;
  if (storefrontCategory(shopType) === 'retail') return 92;
  if (['bank', 'pharmacy'].includes(shopType)) return 84;
  if (['fitness_centre', 'gym'].includes(shopType)) return 80;
  if (['dentist', 'doctors', 'clinic'].includes(shopType)) return 74;
  if (['car_repair', 'car_wash', 'car', 'tyres'].includes(shopType)) return 52;
  return 76;
};

const isClosedOrLowQuality = (tags: Record<string, any>, name: string) => {
  if (!name || normalizeText(name) === 'unknown business') return true;
  const shopType = String(tags?.shop || '').toLowerCase().trim();
  if (['vacant', 'no', 'closed', 'disused', 'abandoned', 'construction'].includes(shopType)) return true;
  return Object.keys(tags || {}).some(
    (key) => key.startsWith('disused:') || key.startsWith('abandoned:') || key.startsWith('demolished:')
  );
};

const existingStorefrontKeys = (pins: HousePin[]) => {
  const keys = new Set<string>();
  pins.filter((pin) => pin.isStorefront).forEach((pin) => {
    const name = normalizeText(pin.businessName || pin.customerName);
    const address = normalizeText(pin.address);
    if (address) keys.add(`address:${address}`);
    if (name && address) keys.add(`name-address:${name}|${address}`);
    if (name) keys.add(`name:${name}`);
  });
  return keys;
};

const selectBalancedTopStorefronts = (ranked: StorefrontCandidate[]) => {
  const caps: Record<StorefrontCategory, number> = {
    food: 20,
    salon: 10,
    retail: 15,
    medical: 8,
    finance: 6,
    fitness: 5,
    automotive: 4,
    other: 10,
  };
  const counts: Record<StorefrontCategory, number> = {
    food: 0,
    salon: 0,
    retail: 0,
    medical: 0,
    finance: 0,
    fitness: 0,
    automotive: 0,
    other: 0,
  };
  const selected: StorefrontCandidate[] = [];
  const selectedIds = new Set<string>();

  for (const candidate of ranked) {
    if (selected.length >= MAX_STOREFRONT_RESULTS) break;
    if (counts[candidate.category] >= caps[candidate.category]) continue;
    selected.push(candidate);
    selectedIds.add(candidate.id);
    counts[candidate.category] += 1;
  }

  if (selected.length < MAX_STOREFRONT_RESULTS) {
    for (const candidate of ranked) {
      if (selected.length >= MAX_STOREFRONT_RESULTS) break;
      if (selectedIds.has(candidate.id)) continue;
      selected.push(candidate);
      selectedIds.add(candidate.id);
    }
  }

  return selected.sort((a, b) => b.score - a.score || a.distanceMeters - b.distanceMeters);
};

const processStorefrontElements = (
  elements: any[],
  origin: { lat: number; lng: number },
  pins: HousePin[]
): { results: StorefrontCandidate[]; stats: CrawlStats } => {
  const seen = new Map<string, StorefrontCandidate>();
  const existing = existingStorefrontKeys(pins);
  let excludedVisited = 0;

  for (const element of elements) {
    const tags = element?.tags || {};
    const center = getElementCenter(element);
    if (!center) continue;

    const name = String(tags.name || tags.brand || tags.operator || '').trim();
    if (isClosedOrLowQuality(tags, name)) continue;

    const shopType = String(tags.shop || tags.amenity || 'business').toLowerCase().trim();
    const address = streetAddress(tags);
    const normalizedName = normalizeText(name);
    const normalizedAddress = normalizeText(address);
    const existingNameAddressKey = normalizedName && normalizedAddress ? `name-address:${normalizedName}|${normalizedAddress}` : '';

    if (
      (normalizedAddress && existing.has(`address:${normalizedAddress}`)) ||
      (existingNameAddressKey && existing.has(existingNameAddressKey))
    ) {
      excludedVisited += 1;
      continue;
    }

    const distanceMeters = Math.round(distanceKm(origin.lat, origin.lng, center.lat, center.lng) * 1000);
    let score = baseStorefrontScore(shopType);
    if (address) score += 5;
    if (tags.phone || tags['contact:phone']) score += 3;
    if (tags.website || tags['contact:website']) score += 2;
    if (tags.opening_hours) score += 2;
    score -= Math.round(Math.min(distanceMeters / STOREFRONT_RADIUS_METERS, 1) * 14);
    score = Math.max(0, Math.round(score));

    const priority: Priority = score >= 92 ? 'A' : score >= 78 ? 'B' : 'C';
    const dedupeKey = normalizedAddress
      ? `${normalizedName}|${normalizedAddress}`
      : `${normalizedName}|${center.lat.toFixed(4)}|${center.lng.toFixed(4)}`;

    const candidate: StorefrontCandidate = {
      id: `${String(element?.type || 'osm')}-${String(element?.id || dedupeKey)}`,
      lat: center.lat,
      lng: center.lng,
      type: 'commercial',
      businessName: name,
      buildingType: shopType,
      storefrontType: storefrontPinType(shopType),
      category: storefrontCategory(shopType),
      address: address || name,
      phone: tags.phone || tags['contact:phone'] || null,
      website: tags.website || tags['contact:website'] || null,
      openingHours: tags.opening_hours || null,
      score,
      priority,
      distanceMeters,
    };

    const previous = seen.get(dedupeKey);
    if (!previous || candidate.score > previous.score || (candidate.score === previous.score && candidate.distanceMeters < previous.distanceMeters)) {
      seen.set(dedupeKey, candidate);
    }
  }

  const ranked = Array.from(seen.values()).sort((a, b) => b.score - a.score || a.distanceMeters - b.distanceMeters);
  const results = selectBalancedTopStorefronts(ranked);

  return {
    results,
    stats: {
      rawCount: elements.length,
      eligibleCount: ranked.length,
      qualifiedCount: results.length,
      excludedVisited,
    },
  };
};

const fetchOverpass = async (query: string) => {
  const endpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
  ];
  let lastError: unknown = null;

  for (const endpoint of endpoints) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint, { method: 'POST', body: query, signal: controller.signal });
      if (!response.ok) throw new Error(`Overpass ${response.status}`);
      return await response.json();
    } catch (error) {
      lastError = error;
    } finally {
      window.clearTimeout(timeout);
    }
  }

  throw lastError instanceof Error ? lastError : new Error('OpenStreetMap request failed');
};

let googleMapsLoadPromise: Promise<void> | null = null;
const loadGoogleMaps = () => {
  if ((window as any).google?.maps) return Promise.resolve();
  if (googleMapsLoadPromise) return googleMapsLoadPromise;

  googleMapsLoadPromise = new Promise<void>((resolve, reject) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      reject(new Error('Google Maps API key not found'));
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>('script[src*="maps.googleapis.com"]');
    if (existing) {
      if ((window as any).google?.maps) resolve();
      else {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Failed to load Google Maps')), { once: true });
      }
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Maps'));
    document.head.appendChild(script);
  });

  return googleMapsLoadPromise;
};

const isStorefront = (target: RouteTarget): target is StorefrontCandidate => 'priority' in target;

const MapComponentFixed: React.FC<MapComponentProps> = ({
  pins,
  routes,
  onAddPin,
  onClearAllPins,
  highlightedPinId,
  onPinHover,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const pinMarkersRef = useRef<any[]>([]);
  const targetMarkersRef = useRef<any[]>([]);
  const savedRouteLinesRef = useRef<any[]>([]);
  const routeLineRef = useRef<any>(null);
  const radiusCircleRef = useRef<any>(null);
  const startMarkerRef = useRef<any>(null);
  const routeSelectModeRef = useRef(false);
  const storefrontRouteModeRef = useRef(false);
  const onAddPinRef = useRef(onAddPin);
  const pinsRef = useRef(pins);

  const [showSavedRoutes, setShowSavedRoutes] = useState(true);
  const [showStorefrontRoutes, setShowStorefrontRoutes] = useState(true);
  const [routeSelectMode, setRouteSelectMode] = useState(false);
  const [storefrontRouteMode, setStorefrontRouteMode] = useState(false);
  const [walkingRouteActive, setWalkingRouteActive] = useState(false);
  const [activeRouteKind, setActiveRouteKind] = useState<RouteKind>(null);
  const [routeStartLocation, setRouteStartLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyBuildings, setNearbyBuildings] = useState<RouteTarget[]>([]);
  const [routeMessage, setRouteMessage] = useState('Tap on map to add location');
  const [storefrontBatchIndex, setStorefrontBatchIndex] = useState(0);
  const [crawlStats, setCrawlStats] = useState<CrawlStats | null>(null);
  const [crawlHistory, setCrawlHistory] = useState<CrawlSnapshot[]>([]);
  const [crawlerLoading, setCrawlerLoading] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{ time: string; distance: string } | null>(null);

  const { getRoute, formatDuration, formatDistance, loading: routeLoading } = useGoogleMapsRouting();
  const { fetchPropertyData } = usePropertyEnrichment();
  const fetchPropertyDataRef = useRef(fetchPropertyData);
  const residentialGeneratorRef = useRef<(lat: number, lng: number) => void>(() => undefined);
  const storefrontGeneratorRef = useRef<(lat: number, lng: number) => void>(() => undefined);

  useEffect(() => { onAddPinRef.current = onAddPin; }, [onAddPin]);
  useEffect(() => { pinsRef.current = pins; }, [pins]);
  useEffect(() => { fetchPropertyDataRef.current = fetchPropertyData; }, [fetchPropertyData]);
  useEffect(() => { routeSelectModeRef.current = routeSelectMode; }, [routeSelectMode]);
  useEffect(() => { storefrontRouteModeRef.current = storefrontRouteMode; }, [storefrontRouteMode]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CRAWL_HISTORY_KEY) || '[]');
      if (Array.isArray(saved)) setCrawlHistory(saved.slice(0, 10));
    } catch {
      setCrawlHistory([]);
    }
  }, []);

  const saveCrawlSnapshot = useCallback((origin: { lat: number; lng: number }, results: StorefrontCandidate[], stats: CrawlStats) => {
    const snapshot: CrawlSnapshot = {
      id: `crawl-${Date.now()}`,
      createdAt: new Date().toISOString(),
      origin,
      results,
      stats,
    };
    setCrawlHistory((previous) => {
      const next = [snapshot, ...previous].slice(0, 10);
      localStorage.setItem(CRAWL_HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const generateStorefrontRouteFromPoint = useCallback(async (lat: number, lng: number) => {
    setCrawlerLoading(true);
    setWalkingRouteActive(true);
    setActiveRouteKind('storefront');
    setStorefrontBatchIndex(0);
    setRouteInfo(null);
    setRouteMessage('Finding and ranking storefronts...');

    const query = `
      [out:json][timeout:15];
      (
        node["shop"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        node["amenity"~"restaurant|cafe|bar|fast_food|food_court|bank|pharmacy|dentist|doctors|clinic|hairdresser|beauty|car_repair|car_wash|fitness_centre"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        way["shop"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        way["amenity"~"restaurant|cafe|bar|fast_food|food_court|bank|pharmacy|dentist|doctors|clinic|hairdresser|beauty|car_repair|car_wash|fitness_centre"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        relation["shop"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        relation["amenity"~"restaurant|cafe|bar|fast_food|food_court|bank|pharmacy|dentist|doctors|clinic|hairdresser|beauty|car_repair|car_wash|fitness_centre"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
      );
      out center;
    `;

    try {
      const data = await fetchOverpass(query);
      const elements = Array.isArray(data?.elements) ? data.elements : [];
      const processed = processStorefrontElements(elements, { lat, lng }, pinsRef.current);
      setNearbyBuildings(processed.results);
      setCrawlStats(processed.stats);
      saveCrawlSnapshot({ lat, lng }, processed.results, processed.stats);

      if (processed.results.length === 0) {
        setWalkingRouteActive(false);
        setRouteMessage(processed.stats.excludedVisited > 0 ? 'No new storefronts here — matching businesses were already marked.' : 'No qualified storefronts found. Try another location.');
      } else {
        const end = Math.min(ROUTE_BATCH_SIZE, processed.results.length);
        setRouteMessage(`Found ${processed.results.length} qualified storefronts from ${processed.stats.rawCount} map results. Routing 1–${end}.`);
        toast.success(`${processed.results.length} qualified storefronts ready`);
      }
    } catch (error) {
      console.error('Storefront crawl failed:', error);
      setNearbyBuildings([]);
      setCrawlStats(null);
      setWalkingRouteActive(false);
      setRouteMessage('Error finding storefronts. OpenStreetMap did not respond.');
      toast.error('Storefront crawl failed');
    } finally {
      setCrawlerLoading(false);
    }
  }, [saveCrawlSnapshot]);

  const generateResidentialRouteFromPoint = useCallback(async (lat: number, lng: number) => {
    setCrawlerLoading(true);
    setWalkingRouteActive(true);
    setActiveRouteKind('residential');
    setCrawlStats(null);
    setRouteInfo(null);
    setRouteMessage('Finding nearby buildings...');

    const query = `
      [out:json][timeout:15];
      (
        way["building"~"house|residential|apartments|detached|terrace|semidetached_house|bungalow|commercial|retail|office"](around:${RESIDENTIAL_RADIUS_METERS},${lat},${lng});
        relation["building"~"house|residential|apartments|detached|terrace|semidetached_house|bungalow|commercial|retail|office"](around:${RESIDENTIAL_RADIUS_METERS},${lat},${lng});
      );
      out center;
    `;

    try {
      const data = await fetchOverpass(query);
      const elements = Array.isArray(data?.elements) ? data.elements : [];
      const targets: ResidentialCandidate[] = elements
        .map((element: any): ResidentialCandidate | null => {
          const center = getElementCenter(element);
          if (!center) return null;
          const tags = element.tags || {};
          const buildingType = String(tags.building || 'yes');
          const residential = ['house', 'residential', 'apartments', 'detached', 'terrace', 'semidetached_house', 'bungalow'].includes(buildingType);
          const commercial = ['commercial', 'retail', 'office'].includes(buildingType);
          return {
            id: `${String(element.type || 'osm')}-${String(element.id || Math.random())}`,
            lat: center.lat,
            lng: center.lng,
            type: residential ? 'residential' : commercial ? 'commercial' : 'other',
            buildingType,
            address: streetAddress(tags) || 'Unknown Address',
            distanceMeters: Math.round(distanceKm(lat, lng, center.lat, center.lng) * 1000),
          };
        })
        .filter((item: ResidentialCandidate | null): item is ResidentialCandidate => Boolean(item))
        .sort((a, b) => a.distanceMeters - b.distanceMeters)
        .slice(0, 80);

      setNearbyBuildings(targets);
      if (targets.length === 0) {
        setWalkingRouteActive(false);
        setRouteMessage('No buildings found in this area. Try another location.');
      } else {
        setRouteMessage(`Found ${targets.length} nearby buildings. Routing the nearest ${Math.min(ROUTE_BATCH_SIZE, targets.length)}.`);
      }
    } catch (error) {
      console.error('Residential crawl failed:', error);
      setNearbyBuildings([]);
      setWalkingRouteActive(false);
      setRouteMessage('Error connecting to OpenStreetMap');
    } finally {
      setCrawlerLoading(false);
    }
  }, []);

  useEffect(() => { storefrontGeneratorRef.current = (lat, lng) => { void generateStorefrontRouteFromPoint(lat, lng); }; }, [generateStorefrontRouteFromPoint]);
  useEffect(() => { residentialGeneratorRef.current = (lat, lng) => { void generateResidentialRouteFromPoint(lat, lng); }; }, [generateResidentialRouteFromPoint]);

  useEffect(() => {
    let clickListener: any = null;
    let cancelled = false;

    void loadGoogleMaps().then(() => {
      if (cancelled || !mapRef.current || mapInstanceRef.current) return;
      const googleMaps = (window as any).google;
      const map = new googleMaps.maps.Map(mapRef.current, {
        center: { lat: 49.0504, lng: -122.8048 },
        zoom: 13,
        mapTypeId: 'roadmap',
        styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }],
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });
      mapInstanceRef.current = map;

      clickListener = map.addListener('click', async (event: any) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        if (routeSelectModeRef.current) {
          routeSelectModeRef.current = false;
          setRouteSelectMode(false);
          setRouteStartLocation({ lat, lng });
          residentialGeneratorRef.current(lat, lng);
          return;
        }

        if (storefrontRouteModeRef.current) {
          storefrontRouteModeRef.current = false;
          setStorefrontRouteMode(false);
          setRouteStartLocation({ lat, lng });
          storefrontGeneratorRef.current(lat, lng);
          return;
        }

        setRouteMessage('Detecting address and property data...');
        try {
          const geocoder = new googleMaps.maps.Geocoder();
          const result = await geocoder.geocode({ location: { lat, lng } });
          const address = result.results[0]?.formatted_address || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
          let propertyData: any = null;
          try {
            propertyData = await fetchPropertyDataRef.current(address, lat, lng);
          } catch (error) {
            console.log('Property enrichment unavailable:', error);
          }

          onAddPinRef.current({
            lat,
            lng,
            address,
            status: 'visited',
            notes: '',
            dateAdded: new Date().toISOString().split('T')[0],
            leadSource: 'door-to-door',
            squareFootage: propertyData?.squareFootage || undefined,
            yearBuilt: propertyData?.yearBuilt || undefined,
            stories: propertyData?.stories || undefined,
            propertyType: propertyData?.propertyType || undefined,
            lotSize: propertyData?.lotSize || undefined,
            bedrooms: propertyData?.bedrooms || undefined,
            bathrooms: propertyData?.bathrooms || undefined,
            propertyDataSource: propertyData?.source && propertyData.source !== 'none' ? propertyData.source : undefined,
          });
          setRouteMessage('Location added!');
        } catch {
          onAddPinRef.current({
            lat,
            lng,
            address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
            status: 'visited',
            notes: '',
            dateAdded: new Date().toISOString().split('T')[0],
            leadSource: 'door-to-door',
          });
          setRouteMessage('Location added!');
        }
      });
    }).catch((error) => {
      console.error(error);
      setRouteMessage('Google Maps failed to load');
    });

    return () => {
      cancelled = true;
      if (clickListener) clickListener.remove();
    };
  }, []);

  useEffect(() => {
    const googleMaps = (window as any).google;
    if (!mapInstanceRef.current || !googleMaps?.maps) return;

    pinMarkersRef.current.forEach((marker) => marker.setMap(null));
    pinMarkersRef.current = [];

    pins.forEach((pin) => {
      const config = statusConfig[pin.status];
      const highlighted = highlightedPinId === pin.id;
      const marker = new googleMaps.maps.Marker({
        position: { lat: pin.lat, lng: pin.lng },
        map: mapInstanceRef.current,
        icon: {
          path: pin.leadSource === 'door-to-door' ? 'M 0,-11 L 10,8 L -10,8 Z' : googleMaps.maps.SymbolPath.CIRCLE,
          scale: pin.leadSource === 'door-to-door' ? (highlighted ? 1.25 : 1) : (highlighted ? 10 : 8),
          fillColor: config.color,
          fillOpacity: 1,
          strokeColor: highlighted ? '#facc15' : '#ffffff',
          strokeWeight: highlighted ? 3 : 2,
        },
        title: pin.businessName || pin.address,
      });

      const content = document.createElement('div');
      content.style.minWidth = '210px';
      const title = document.createElement('strong');
      title.textContent = pin.businessName || pin.customerName || config.label;
      content.appendChild(title);
      const address = document.createElement('div');
      address.textContent = pin.address;
      address.style.fontSize = '12px';
      address.style.marginTop = '4px';
      content.appendChild(address);
      const status = document.createElement('div');
      status.textContent = config.label;
      status.style.fontSize = '12px';
      status.style.color = config.color;
      status.style.marginTop = '4px';
      content.appendChild(status);
      if (pin.phoneNumber) {
        const phone = document.createElement('a');
        phone.href = `tel:${pin.phoneNumber}`;
        phone.textContent = pin.phoneNumber;
        phone.style.display = 'block';
        phone.style.fontSize = '12px';
        phone.style.marginTop = '4px';
        content.appendChild(phone);
      }

      const info = new googleMaps.maps.InfoWindow({ content });
      marker.addListener('click', () => {
        info.open(mapInstanceRef.current, marker);
        onPinHover(pin.id);
      });
      pinMarkersRef.current.push(marker);
    });
  }, [pins, highlightedPinId, onPinHover]);

  const markStorefront = useCallback((candidate: StorefrontCandidate, status: HousePin['status']) => {
    const normalizedAddress = normalizeText(candidate.address);
    const normalizedName = normalizeText(candidate.businessName);
    const duplicate = pinsRef.current.some((pin) =>
      pin.isStorefront &&
      ((normalizedAddress && normalizeText(pin.address) === normalizedAddress) ||
        (normalizedName && normalizeText(pin.businessName || pin.customerName) === normalizedName && normalizeText(pin.address) === normalizedAddress))
    );

    if (duplicate) {
      toast.info('This storefront is already marked');
      setNearbyBuildings((current) => current.filter((item) => item.id !== candidate.id));
      return;
    }

    onAddPinRef.current({
      lat: candidate.lat,
      lng: candidate.lng,
      address: candidate.address,
      status,
      notes: `Storefront crawler · Priority ${candidate.priority} · Score ${candidate.score} · ${candidate.buildingType}`,
      dateAdded: new Date().toISOString().split('T')[0],
      customerName: candidate.businessName,
      businessName: candidate.businessName,
      phoneNumber: candidate.phone || undefined,
      contactInfo: [candidate.phone, candidate.website, candidate.openingHours].filter(Boolean).join(' · ') || undefined,
      leadSource: 'door-to-door',
      isStorefront: true,
      storefrontType: candidate.storefrontType,
      leadScore: candidate.priority === 'A' ? 'high' : candidate.priority === 'B' ? 'medium' : 'low',
    });

    setNearbyBuildings((current) => current.filter((item) => item.id !== candidate.id));
    toast.success(`${candidate.businessName}: ${status.replace('-', ' ')}`);
  }, []);

  const activeStorefrontBatch = useMemo(() => {
    if (activeRouteKind !== 'storefront') return [] as StorefrontCandidate[];
    const storefronts = nearbyBuildings.filter(isStorefront);
    const start = storefrontBatchIndex * ROUTE_BATCH_SIZE;
    return storefronts.slice(start, start + ROUTE_BATCH_SIZE);
  }, [activeRouteKind, nearbyBuildings, storefrontBatchIndex]);

  const storefrontBatchCount = useMemo(() => {
    const count = nearbyBuildings.filter(isStorefront).length;
    return Math.max(1, Math.ceil(count / ROUTE_BATCH_SIZE));
  }, [nearbyBuildings]);

  useEffect(() => {
    if (storefrontBatchIndex > storefrontBatchCount - 1) {
      setStorefrontBatchIndex(Math.max(0, storefrontBatchCount - 1));
    }
  }, [storefrontBatchIndex, storefrontBatchCount]);

  useEffect(() => {
    const googleMaps = (window as any).google;
    if (!mapInstanceRef.current || !googleMaps?.maps) return;

    targetMarkersRef.current.forEach((marker) => marker.setMap(null));
    targetMarkersRef.current = [];

    const visibleTargets = activeRouteKind === 'storefront' && !showStorefrontRoutes ? [] : nearbyBuildings;
    const activeIds = new Set(activeStorefrontBatch.map((candidate) => candidate.id));

    visibleTargets.forEach((target) => {
      const storefront = isStorefront(target);
      const activeBatch = storefront ? activeIds.has(target.id) : true;
      const priorityColor = storefront
        ? target.priority === 'A' ? '#16a34a' : target.priority === 'B' ? '#f59e0b' : '#64748b'
        : target.type === 'residential' ? '#3b82f6' : target.type === 'commercial' ? '#f97316' : '#8b5cf6';

      const marker = new googleMaps.maps.Marker({
        position: { lat: target.lat, lng: target.lng },
        map: mapInstanceRef.current,
        icon: {
          path: googleMaps.maps.SymbolPath.CIRCLE,
          scale: storefront ? (activeBatch ? 8 : 5) : 5,
          fillColor: priorityColor,
          fillOpacity: storefront && !activeBatch ? 0.55 : 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
        label: storefront ? { text: target.priority, color: '#ffffff', fontSize: '10px', fontWeight: '700' } : undefined,
        title: storefront ? target.businessName : target.address,
      });

      const content = document.createElement('div');
      content.style.minWidth = storefront ? '250px' : '200px';
      content.style.maxWidth = '300px';

      if (storefront) {
        const heading = document.createElement('div');
        heading.textContent = target.businessName;
        heading.style.fontWeight = '700';
        heading.style.fontSize = '15px';
        content.appendChild(heading);

        const meta = document.createElement('div');
        meta.textContent = `Priority ${target.priority} · Score ${target.score} · ${Math.round(target.distanceMeters)}m away`;
        meta.style.fontSize = '12px';
        meta.style.marginTop = '4px';
        meta.style.fontWeight = '600';
        content.appendChild(meta);

        const type = document.createElement('div');
        type.textContent = target.buildingType.replace(/_/g, ' ');
        type.style.fontSize = '12px';
        type.style.marginTop = '3px';
        content.appendChild(type);

        const address = document.createElement('div');
        address.textContent = target.address;
        address.style.fontSize = '12px';
        address.style.marginTop = '3px';
        content.appendChild(address);

        if (target.phone) {
          const phone = document.createElement('a');
          phone.href = `tel:${target.phone}`;
          phone.textContent = `Call ${target.phone}`;
          phone.style.display = 'block';
          phone.style.fontSize = '12px';
          phone.style.marginTop = '5px';
          content.appendChild(phone);
        }

        if (target.website) {
          const website = document.createElement('a');
          website.href = /^https?:\/\//i.test(target.website) ? target.website : `https://${target.website}`;
          website.target = '_blank';
          website.rel = 'noopener noreferrer';
          website.textContent = 'Website';
          website.style.display = 'block';
          website.style.fontSize = '12px';
          website.style.marginTop = '3px';
          content.appendChild(website);
        }

        if (target.openingHours) {
          const hours = document.createElement('div');
          hours.textContent = `Hours: ${target.openingHours}`;
          hours.style.fontSize = '11px';
          hours.style.marginTop = '3px';
          content.appendChild(hours);
        }

        const actions = document.createElement('div');
        actions.style.display = 'grid';
        actions.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
        actions.style.gap = '6px';
        actions.style.marginTop = '10px';
        const addButton = (label: string, status: HousePin['status']) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.textContent = label;
          button.style.padding = '6px 8px';
          button.style.borderRadius = '6px';
          button.style.border = '1px solid #d1d5db';
          button.style.background = '#ffffff';
          button.style.fontSize = '12px';
          button.style.fontWeight = '600';
          button.style.cursor = 'pointer';
          button.addEventListener('click', () => markStorefront(target, status));
          actions.appendChild(button);
        };
        addButton('Hit', 'visited');
        addButton('Interested', 'interested');
        addButton('Skip', 'not-interested');
        addButton('Quote', 'needs-quote');
        content.appendChild(actions);
      } else {
        const heading = document.createElement('strong');
        heading.textContent = target.address;
        content.appendChild(heading);
        const type = document.createElement('div');
        type.textContent = `${target.type} · ${target.buildingType}`;
        type.style.fontSize = '12px';
        type.style.marginTop = '4px';
        content.appendChild(type);
      }

      const info = new googleMaps.maps.InfoWindow({ content });
      marker.addListener('click', () => info.open(mapInstanceRef.current, marker));
      targetMarkersRef.current.push(marker);
    });
  }, [nearbyBuildings, activeRouteKind, activeStorefrontBatch, showStorefrontRoutes, markStorefront]);

  useEffect(() => {
    const googleMaps = (window as any).google;
    if (!mapInstanceRef.current || !googleMaps?.maps) return;

    if (radiusCircleRef.current) radiusCircleRef.current.setMap(null);
    if (startMarkerRef.current) startMarkerRef.current.setMap(null);
    radiusCircleRef.current = null;
    startMarkerRef.current = null;

    if (!routeStartLocation || !activeRouteKind) return;
    const radius = activeRouteKind === 'storefront' ? STOREFRONT_RADIUS_METERS : RESIDENTIAL_RADIUS_METERS;
    const color = activeRouteKind === 'storefront' ? '#f97316' : '#10b981';
    radiusCircleRef.current = new googleMaps.maps.Circle({
      center: routeStartLocation,
      radius,
      strokeColor: color,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.08,
      map: mapInstanceRef.current,
    });
    startMarkerRef.current = new googleMaps.maps.Marker({
      position: routeStartLocation,
      map: mapInstanceRef.current,
      icon: {
        path: googleMaps.maps.SymbolPath.CIRCLE,
        scale: 9,
        fillColor: '#111827',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3,
      },
      title: 'Route Start',
    });
  }, [routeStartLocation, activeRouteKind]);

  useEffect(() => {
    const googleMaps = (window as any).google;
    if (!mapInstanceRef.current || !googleMaps?.maps) return;

    savedRouteLinesRef.current.forEach((line) => line.setMap(null));
    savedRouteLinesRef.current = [];
    if (!showSavedRoutes) return;

    routes.forEach((route) => {
      if (!Array.isArray(route.path) || route.path.length < 2) return;
      const line = new googleMaps.maps.Polyline({
        path: route.path.map((point) => ({ lat: point.lat, lng: point.lng })),
        strokeColor: route.color || '#2563eb',
        strokeWeight: 4,
        strokeOpacity: 0.65,
        map: mapInstanceRef.current,
      });
      savedRouteLinesRef.current.push(line);
    });
  }, [routes, showSavedRoutes]);

  useEffect(() => {
    let cancelled = false;
    const googleMaps = (window as any).google;
    if (!mapInstanceRef.current || !googleMaps?.maps) return;

    if (routeLineRef.current) {
      routeLineRef.current.setMap(null);
      routeLineRef.current = null;
    }
    setRouteInfo(null);

    if (!walkingRouteActive || !routeStartLocation || !activeRouteKind) return;
    if (activeRouteKind === 'storefront' && !showStorefrontRoutes) return;

    let targets: RouteTarget[] = [];
    if (activeRouteKind === 'storefront') {
      targets = activeStorefrontBatch;
    } else {
      targets = [...nearbyBuildings]
        .sort((a, b) => distanceKm(routeStartLocation.lat, routeStartLocation.lng, a.lat, a.lng) - distanceKm(routeStartLocation.lat, routeStartLocation.lng, b.lat, b.lng))
        .slice(0, ROUTE_BATCH_SIZE);
    }
    if (targets.length === 0) return;

    const waypointPins: HousePin[] = [
      {
        id: 'route-start',
        lat: routeStartLocation.lat,
        lng: routeStartLocation.lng,
        address: 'Route Start',
        status: 'visited',
        notes: '',
        dateAdded: new Date().toISOString().split('T')[0],
      },
      ...targets.map((target, index) => ({
        id: `route-target-${index}`,
        lat: target.lat,
        lng: target.lng,
        address: target.address,
        status: 'visited' as const,
        notes: '',
        dateAdded: new Date().toISOString().split('T')[0],
      })),
    ];

    setRouteMessage(activeRouteKind === 'storefront' ? 'Calculating priority storefront walking route...' : 'Calculating walking route...');

    void getRoute(waypointPins).then((routeData) => {
      if (cancelled) return;
      if (routeData?.geometry?.length) {
        routeLineRef.current = new googleMaps.maps.Polyline({
          path: routeData.geometry,
          strokeColor: activeRouteKind === 'storefront' ? '#f97316' : '#10b981',
          strokeWeight: 5,
          strokeOpacity: 0.9,
          map: mapInstanceRef.current,
        });
        setRouteInfo({
          time: formatDuration(routeData.totalDuration),
          distance: formatDistance(routeData.totalDistance),
        });
        setRouteMessage(`Route ready · ${targets.length} stops · ${formatDuration(routeData.totalDuration)} · ${formatDistance(routeData.totalDistance)}`);
        return;
      }

      routeLineRef.current = new googleMaps.maps.Polyline({
        path: [routeStartLocation, ...targets.map((target) => ({ lat: target.lat, lng: target.lng }))],
        strokeColor: activeRouteKind === 'storefront' ? '#f97316' : '#10b981',
        strokeWeight: 4,
        strokeOpacity: 0.7,
        map: mapInstanceRef.current,
      });
      setRouteMessage(`Route ready · ${targets.length} stops · straight-line fallback`);
    }).catch((error) => {
      console.error('Route calculation failed:', error);
      if (!cancelled) setRouteMessage('Could not calculate walking route');
    });

    return () => { cancelled = true; };
  }, [walkingRouteActive, routeStartLocation, activeRouteKind, nearbyBuildings, activeStorefrontBatch, showStorefrontRoutes, getRoute, formatDuration, formatDistance]);

  const beginResidentialSelection = () => {
    setRouteSelectMode(true);
    routeSelectModeRef.current = true;
    setStorefrontRouteMode(false);
    storefrontRouteModeRef.current = false;
    setRouteMessage('Tap map to select residential route start');
  };

  const beginStorefrontSelection = () => {
    setStorefrontRouteMode(true);
    storefrontRouteModeRef.current = true;
    setRouteSelectMode(false);
    routeSelectModeRef.current = false;
    setShowStorefrontRoutes(true);
    setRouteMessage('Tap map to crawl nearby storefronts');
  };

  const clearRoute = () => {
    setWalkingRouteActive(false);
    setActiveRouteKind(null);
    setRouteStartLocation(null);
    setNearbyBuildings([]);
    setCrawlStats(null);
    setRouteInfo(null);
    setStorefrontBatchIndex(0);
    setRouteSelectMode(false);
    setStorefrontRouteMode(false);
    routeSelectModeRef.current = false;
    storefrontRouteModeRef.current = false;
    setRouteMessage('Tap on map to add location');
  };

  const restoreLatestCrawl = () => {
    const latest = crawlHistory[0];
    if (!latest) return;
    const existing = existingStorefrontKeys(pinsRef.current);
    const remaining = latest.results.filter((candidate) => {
      const name = normalizeText(candidate.businessName);
      const address = normalizeText(candidate.address);
      return !((address && existing.has(`address:${address}`)) || (name && address && existing.has(`name-address:${name}|${address}`)));
    });
    setRouteStartLocation(latest.origin);
    setActiveRouteKind('storefront');
    setWalkingRouteActive(remaining.length > 0);
    setNearbyBuildings(remaining);
    setCrawlStats({ ...latest.stats, qualifiedCount: remaining.length });
    setStorefrontBatchIndex(0);
    setShowStorefrontRoutes(true);
    setRouteMessage(`Restored crawl · ${remaining.length} unmarked storefronts remaining`);
    mapInstanceRef.current?.setCenter(latest.origin);
    mapInstanceRef.current?.setZoom(15);
  };

  const storefrontCount = nearbyBuildings.filter(isStorefront).length;
  const batchStart = storefrontBatchIndex * ROUTE_BATCH_SIZE;
  const batchEnd = Math.min(batchStart + ROUTE_BATCH_SIZE, storefrontCount);

  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="bg-background border rounded-lg shadow-sm p-2 sm:p-3">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <label className="flex items-center gap-1.5 cursor-pointer text-xs sm:text-sm font-medium">
            <input type="checkbox" checked={showSavedRoutes} onChange={(event) => setShowSavedRoutes(event.target.checked)} className="rounded w-4 h-4" />
            Saved Routes
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-xs sm:text-sm font-medium">
            <input type="checkbox" checked={showStorefrontRoutes} onChange={(event) => setShowStorefrontRoutes(event.target.checked)} className="rounded w-4 h-4" />
            Storefront Route
          </label>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-2">
          <button
            onClick={beginResidentialSelection}
            disabled={routeSelectMode || storefrontRouteMode || crawlerLoading}
            className={`text-xs sm:text-sm rounded px-2 sm:px-3 py-2 font-medium ${routeSelectMode ? 'bg-yellow-500 text-white' : 'bg-primary text-primary-foreground hover:bg-primary/90'} disabled:opacity-60`}
          >
            {routeSelectMode ? '📍 Tap Map...' : '🏠 Residential'}
          </button>
          <button
            onClick={beginStorefrontSelection}
            disabled={routeSelectMode || storefrontRouteMode || crawlerLoading}
            className={`text-xs sm:text-sm rounded px-2 sm:px-3 py-2 font-medium ${storefrontRouteMode ? 'bg-orange-500 text-white' : 'bg-orange-600 text-white hover:bg-orange-700'} disabled:opacity-60`}
          >
            {storefrontRouteMode ? '📍 Tap Map...' : crawlerLoading && activeRouteKind === 'storefront' ? 'Scanning...' : '🏪 Storefronts'}
          </button>
          {(walkingRouteActive || routeStartLocation) && (
            <button onClick={clearRoute} className="text-xs sm:text-sm bg-destructive text-destructive-foreground rounded px-2 sm:px-3 py-2 font-medium hover:bg-destructive/90">
              Clear Route
            </button>
          )}
          {crawlHistory.length > 0 && activeRouteKind !== 'storefront' && (
            <button onClick={restoreLatestCrawl} className="text-xs sm:text-sm border rounded px-2 sm:px-3 py-2 font-medium hover:bg-muted">
              Restore Last Crawl
            </button>
          )}
          <button
            onClick={() => {
              if (!confirm('Clear all saved pins from this map? This cannot be undone.')) return;
              if (onClearAllPins) onClearAllPins();
              else localStorage.removeItem('housePins');
              toast.success('All pins cleared');
            }}
            className="text-xs sm:text-sm bg-red-600 text-white rounded px-2 sm:px-3 py-2 font-medium hover:bg-red-700"
          >
            🗑️ Clear All
          </button>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <div className={`text-xs px-2 py-1 rounded ${routeMessage.includes('Error') || routeMessage.includes('No ') || routeMessage.includes('failed') ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
            {(crawlerLoading || routeLoading) ? '⏳ ' : ''}{routeMessage}
          </div>
          {routeInfo && (
            <div className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              {routeInfo.time} · {routeInfo.distance}
            </div>
          )}
        </div>

        {activeRouteKind === 'storefront' && storefrontCount > 0 && (
          <div className="mt-2 pt-2 border-t space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold">{storefrontCount} qualified</span>
              {crawlStats && <span className="text-muted-foreground">from {crawlStats.rawCount} raw · {crawlStats.excludedVisited} already marked excluded</span>}
              <span className="text-muted-foreground">Route stops {batchStart + 1}–{batchEnd}</span>
            </div>
            {storefrontBatchCount > 1 && (
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={storefrontBatchIndex === 0}
                  onClick={() => setStorefrontBatchIndex((index) => Math.max(0, index - 1))}
                  className="text-xs border rounded px-2 py-1 disabled:opacity-40"
                >
                  ← Previous 20
                </button>
                <button
                  type="button"
                  disabled={storefrontBatchIndex >= storefrontBatchCount - 1}
                  onClick={() => setStorefrontBatchIndex((index) => Math.min(storefrontBatchCount - 1, index + 1))}
                  className="text-xs border rounded px-2 py-1 disabled:opacity-40"
                >
                  Next 20 →
                </button>
                <span className="text-xs text-muted-foreground self-center">Batch {storefrontBatchIndex + 1}/{storefrontBatchCount}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div
        ref={mapRef}
        className="w-full border-2 border-border rounded-lg overflow-hidden touch-manipulation"
        style={{ height: 'calc(100vh - 280px)', minHeight: '350px', maxHeight: '650px' }}
      />
    </div>
  );
};

export default MapComponentFixed;
