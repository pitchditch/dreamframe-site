import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HousePin, RouteSession } from './types';
import { useGoogleMapsRouting } from '@/hooks/useGoogleMapsRouting';
import { usePropertyEnrichment } from '@/hooks/usePropertyEnrichment';
import {
  D2DCrawlSnapshot,
  D2DCrawlStats,
  d2dPinIdentity,
  loadLatestD2DCrawlSession,
  saveD2DCrawlSession,
} from '@/utils/d2dCloud';
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
type StorefrontCategory = 'food' | 'salon' | 'retail' | 'medical' | 'finance' | 'fitness' | 'automotive' | 'office' | 'other';
type RouteKind = 'residential' | 'storefront' | null;

interface StorefrontCandidate {
  id: string;
  externalId: string;
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
type CrawlSnapshot = D2DCrawlSnapshot<StorefrontCandidate>;

const STOREFRONT_RADIUS_METERS = 1500;
const RESIDENTIAL_RADIUS_METERS = 2000;
const MAX_STOREFRONT_RESULTS = 50;
const ROUTE_BATCH_SIZE = 20;
const CRAWL_HISTORY_KEY = 'bc-storefront-crawl-history-v3';
const OVERPASS_CACHE_TTL_MS = 10 * 60 * 1000;

const overpassStorefrontCache = new Map<string, { at: number; data: any }>();

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
  const unit = String(tags?.['addr:unit'] || '').trim();
  if (!street) return '';
  return `${number} ${street}${unit ? ` #${unit}` : ''}`.trim();
};

const businessTypeFromTags = (tags: Record<string, any>) =>
  String(tags.shop || tags.amenity || tags.office || tags.healthcare || tags.leisure || tags.craft || 'business')
    .toLowerCase()
    .trim();

const storefrontCategory = (businessType: string, tags?: Record<string, any>): StorefrontCategory => {
  if (tags?.office) return 'office';
  if (['restaurant', 'cafe', 'bar', 'fast_food', 'ice_cream', 'bakery', 'food_court'].includes(businessType)) return 'food';
  if (['hairdresser', 'beauty', 'beauty_salon', 'nail_salon', 'massage'].includes(businessType)) return 'salon';
  if (['dentist', 'doctors', 'clinic', 'pharmacy', 'physiotherapist', 'optometrist'].includes(businessType)) return 'medical';
  if (businessType === 'bank' || businessType === 'financial') return 'finance';
  if (['fitness_centre', 'gym'].includes(businessType)) return 'fitness';
  if (['car_repair', 'car_wash', 'car', 'tyres'].includes(businessType)) return 'automotive';
  if (
    [
      'supermarket', 'convenience', 'clothes', 'shoes', 'optician', 'jewelry', 'florist', 'gift',
      'books', 'electronics', 'mobile_phone', 'sports', 'pet', 'variety_store', 'department_store',
      'furniture', 'hardware', 'chemist', 'alcohol', 'bicycle', 'boutique', 'cosmetics', 'copyshop',
    ].includes(businessType)
  ) return 'retail';
  return 'other';
};

const storefrontPinType = (businessType: string, tags?: Record<string, any>): NonNullable<HousePin['storefrontType']> => {
  const category = storefrontCategory(businessType, tags);
  if (tags?.office) return 'office';
  if (businessType === 'nail_salon') return 'nail-salon';
  if (category === 'salon') return 'hair-salon';
  if (['cafe', 'bakery'].includes(businessType)) return 'coffee-shop';
  if (category === 'food') return 'restaurant';
  if (category === 'medical') return 'medical';
  if (category === 'fitness') return 'gym';
  if (category === 'automotive') return 'automotive';
  if (category === 'retail') return 'retail';
  return 'other';
};

const baseStorefrontScore = (businessType: string, tags?: Record<string, any>) => {
  const category = storefrontCategory(businessType, tags);
  if (category === 'salon') return 100;
  if (category === 'retail') return 96;
  if (category === 'food') return 94;
  if (category === 'office') return 88;
  if (category === 'finance') return 87;
  if (category === 'fitness') return 85;
  if (category === 'medical') return 82;
  if (category === 'automotive') return 55;
  return 76;
};

const isClosedOrLowQuality = (tags: Record<string, any>, name: string) => {
  if (!name || normalizeText(name) === 'unknown business') return true;
  const shopType = String(tags?.shop || '').toLowerCase().trim();
  if (['vacant', 'no', 'closed', 'disused', 'abandoned', 'construction'].includes(shopType)) return true;
  if (String(tags?.disused || '').toLowerCase() === 'yes' || String(tags?.abandoned || '').toLowerCase() === 'yes') return true;
  return Object.keys(tags || {}).some(
    (key) => key.startsWith('disused:') || key.startsWith('abandoned:') || key.startsWith('demolished:'),
  );
};

const candidateIdentity = (candidate: StorefrontCandidate) => d2dPinIdentity({
  lat: candidate.lat,
  lng: candidate.lng,
  address: candidate.address,
  isStorefront: true,
  businessName: candidate.businessName,
  customerName: candidate.businessName,
  externalId: candidate.externalId,
});

const selectTopStorefronts = (ranked: StorefrontCandidate[]) => {
  const caps: Record<StorefrontCategory, number> = {
    food: 18,
    salon: 10,
    retail: 14,
    medical: 7,
    finance: 5,
    fitness: 5,
    automotive: 3,
    office: 7,
    other: 8,
  };
  const counts = Object.fromEntries(Object.keys(caps).map((key) => [key, 0])) as Record<StorefrontCategory, number>;
  const selected: StorefrontCandidate[] = [];
  const selectedIds = new Set<string>();

  for (const candidate of ranked) {
    if (selected.length >= MAX_STOREFRONT_RESULTS) break;
    if (counts[candidate.category] >= caps[candidate.category]) continue;
    selected.push(candidate);
    selectedIds.add(candidate.id);
    counts[candidate.category] += 1;
  }

  for (const candidate of ranked) {
    if (selected.length >= MAX_STOREFRONT_RESULTS) break;
    if (selectedIds.has(candidate.id)) continue;
    selected.push(candidate);
    selectedIds.add(candidate.id);
  }

  return selected;
};

const buildBalancedRouteBatches = (ranked: StorefrontCandidate[]) => {
  const remaining = [...ranked];
  const batches: StorefrontCandidate[][] = [];
  const perBatchCaps: Record<StorefrontCategory, number> = {
    food: 8,
    salon: 4,
    retail: 5,
    medical: 3,
    finance: 2,
    fitness: 2,
    automotive: 2,
    office: 3,
    other: 3,
  };

  while (remaining.length > 0) {
    // Seed with the highest-ranked remaining business, then cluster the rest of
    // the batch around that seed while respecting category caps when possible.
    const seed = remaining.shift()!;
    const batch: StorefrontCandidate[] = [seed];
    const counts = Object.fromEntries(Object.keys(perBatchCaps).map((key) => [key, 0])) as Record<StorefrontCategory, number>;
    counts[seed.category] = 1;

    while (batch.length < ROUTE_BATCH_SIZE && remaining.length > 0) {
      const centroid = batch.reduce(
        (acc, candidate) => ({ lat: acc.lat + candidate.lat / batch.length, lng: acc.lng + candidate.lng / batch.length }),
        { lat: 0, lng: 0 },
      );

      const underCapIndexes = remaining
        .map((candidate, index) => ({ candidate, index }))
        .filter(({ candidate }) => counts[candidate.category] < perBatchCaps[candidate.category]);
      const pool = underCapIndexes.length > 0
        ? underCapIndexes
        : remaining.map((candidate, index) => ({ candidate, index }));

      let best = pool[0];
      let bestCost = Number.POSITIVE_INFINITY;
      for (const option of pool) {
        const geoMeters = distanceKm(centroid.lat, centroid.lng, option.candidate.lat, option.candidate.lng) * 1000;
        // Keep score meaningful without allowing a high score on the far side of
        // the crawl radius to destroy walkability.
        const rankPenalty = Math.max(0, 100 - option.candidate.score) * 2;
        const cost = geoMeters + rankPenalty;
        if (cost < bestCost) {
          best = option;
          bestCost = cost;
        }
      }

      const [chosen] = remaining.splice(best.index, 1);
      batch.push(chosen);
      counts[chosen.category] += 1;
    }

    batches.push(batch);
  }

  return batches;
};

const processStorefrontElements = (
  elements: any[],
  origin: { lat: number; lng: number },
  pins: HousePin[],
): { results: StorefrontCandidate[]; stats: D2DCrawlStats } => {
  const seen = new Map<string, StorefrontCandidate>();

  for (const element of elements) {
    const tags = element?.tags || {};
    const center = getElementCenter(element);
    if (!center) continue;

    const name = String(tags.name || tags.brand || tags.operator || '').trim();
    if (isClosedOrLowQuality(tags, name)) continue;

    const businessType = businessTypeFromTags(tags);
    const actualAddress = streetAddress(tags);
    const coordinateKey = `${center.lat.toFixed(4)}|${center.lng.toFixed(4)}`;
    const address = actualAddress || `${name} · ${center.lat.toFixed(5)}, ${center.lng.toFixed(5)}`;
    const normalizedName = normalizeText(name);
    const normalizedAddress = normalizeText(actualAddress);
    const locationKey = normalizedAddress || coordinateKey;
    const phone = String(tags.phone || tags['contact:phone'] || '').replace(/\D+/g, '');
    const website = String(tags.website || tags['contact:website'] || '').trim();
    let websiteHost = '';
    if (website) {
      try {
        websiteHost = new URL(/^https?:\/\//i.test(website) ? website : `https://${website}`).hostname.replace(/^www\./, '');
      } catch {
        websiteHost = '';
      }
    }

    const distanceMeters = Math.round(distanceKm(origin.lat, origin.lng, center.lat, center.lng) * 1000);
    let score = baseStorefrontScore(businessType, tags);
    if (actualAddress) score += 5;
    if (phone) score += 3;
    if (websiteHost) score += 2;
    if (tags.opening_hours) score += 2;
    score -= Math.round(Math.min(distanceMeters / STOREFRONT_RADIUS_METERS, 1) * 14);
    score = Math.max(0, Math.round(score));

    const priority: Priority = score >= 92 ? 'A' : score >= 80 ? 'B' : 'C';
    const dedupeKey = phone
      ? `phone:${phone}|${locationKey}`
      : websiteHost
        ? `web:${websiteHost}|${locationKey}`
        : normalizedAddress
          ? `name-address:${normalizedName}|${normalizedAddress}`
          : `name-geo:${normalizedName}|${coordinateKey}`;
    const externalId = `${String(element?.type || 'osm')}:${String(element?.id || dedupeKey)}`;

    const candidate: StorefrontCandidate = {
      id: externalId,
      externalId,
      lat: center.lat,
      lng: center.lng,
      type: 'commercial',
      businessName: name,
      buildingType: businessType,
      storefrontType: storefrontPinType(businessType, tags),
      category: storefrontCategory(businessType, tags),
      address,
      phone: phone ? String(tags.phone || tags['contact:phone']) : null,
      website: website || null,
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

  const rankedAll = Array.from(seen.values()).sort((a, b) => b.score - a.score || a.distanceMeters - b.distanceMeters);
  const markedIdentities = new Set(pins.filter((pin) => pin.isStorefront).map(d2dPinIdentity));
  const available = rankedAll.filter((candidate) => !markedIdentities.has(candidateIdentity(candidate)));
  const results = selectTopStorefronts(available);

  return {
    results,
    stats: {
      rawCount: elements.length,
      eligibleCount: rankedAll.length,
      qualifiedCount: results.length,
      excludedVisited: rankedAll.length - available.length,
    },
  };
};

const fetchOverpass = async (query: string, externalSignal: AbortSignal) => {
  const endpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
  ];
  let lastError: unknown = null;

  for (const endpoint of endpoints) {
    if (externalSignal.aborted) throw new DOMException('Crawl cancelled', 'AbortError');
    const controller = new AbortController();
    const abortFromParent = () => controller.abort();
    externalSignal.addEventListener('abort', abortFromParent, { once: true });
    const timeout = window.setTimeout(() => controller.abort(), 22000);

    try {
      const response = await fetch(endpoint, { method: 'POST', body: query, signal: controller.signal });
      if (!response.ok) throw new Error(`Overpass ${response.status}`);
      return await response.json();
    } catch (error) {
      if (externalSignal.aborted) throw new DOMException('Crawl cancelled', 'AbortError');
      lastError = error;
    } finally {
      externalSignal.removeEventListener('abort', abortFromParent);
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

const MapComponentV4: React.FC<MapComponentProps> = ({
  pins,
  routes,
  onAddPin,
  onUpdateRoutes,
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
  const fetchPropertyDataRef = useRef<(address: string, lat: number, lng: number) => Promise<any>>(async () => null);
  const residentialGeneratorRef = useRef<(lat: number, lng: number) => void>(() => undefined);
  const storefrontGeneratorRef = useRef<(lat: number, lng: number) => void>(() => undefined);
  const crawlAbortRef = useRef<AbortController | null>(null);
  const crawlRequestIdRef = useRef(0);

  const [showSavedRoutes, setShowSavedRoutes] = useState(true);
  const [showStorefrontRoutes, setShowStorefrontRoutes] = useState(true);
  const [routeSelectMode, setRouteSelectMode] = useState(false);
  const [storefrontRouteMode, setStorefrontRouteMode] = useState(false);
  const [walkingRouteActive, setWalkingRouteActive] = useState(false);
  const [activeRouteKind, setActiveRouteKind] = useState<RouteKind>(null);
  const [routeStartLocation, setRouteStartLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyBuildings, setNearbyBuildings] = useState<RouteTarget[]>([]);
  const [storefrontBatches, setStorefrontBatches] = useState<StorefrontCandidate[][]>([]);
  const [routeMessage, setRouteMessage] = useState('Tap on map to add location');
  const [storefrontBatchIndex, setStorefrontBatchIndex] = useState(0);
  const [crawlStats, setCrawlStats] = useState<D2DCrawlStats | null>(null);
  const [crawlHistory, setCrawlHistory] = useState<CrawlSnapshot[]>([]);
  const [crawlerLoading, setCrawlerLoading] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{ time: string; distance: string } | null>(null);

  const { getRoute, formatDuration, formatDistance, loading: routeLoading } = useGoogleMapsRouting();
  const { fetchPropertyData } = usePropertyEnrichment();

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

    void loadLatestD2DCrawlSession<StorefrontCandidate>()
      .then((cloudSnapshot) => {
        if (!cloudSnapshot) return;
        setCrawlHistory((previous) => {
          if (previous.some((item) => item.id === cloudSnapshot.id)) return previous;
          const next = [cloudSnapshot, ...previous]
            .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
            .slice(0, 10);
          try { localStorage.setItem(CRAWL_HISTORY_KEY, JSON.stringify(next)); } catch { /* local cache is optional */ }
          return next;
        });
      })
      .catch((error) => console.error('Could not load cloud crawl history:', error));
  }, []);

  useEffect(() => () => {
    crawlAbortRef.current?.abort();
    crawlRequestIdRef.current += 1;
  }, []);

  const saveCrawlSnapshot = useCallback((snapshot: CrawlSnapshot) => {
    const localSnapshot: CrawlSnapshot = {
      ...snapshot,
      id: snapshot.id || `crawl-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: snapshot.createdAt || new Date().toISOString(),
    };

    setCrawlHistory((previous) => {
      const next = [localSnapshot, ...previous.filter((item) => item.id !== localSnapshot.id)].slice(0, 10);
      try { localStorage.setItem(CRAWL_HISTORY_KEY, JSON.stringify(next)); } catch { /* Supabase is authoritative */ }
      return next;
    });

    // Save the exact local snapshot so Supabase keeps the same client_session_id.
    void saveD2DCrawlSession(localSnapshot).catch((error) => console.error('Could not save crawl session to Supabase:', error));
  }, []);

  const generateStorefrontRouteFromPoint = useCallback(async (lat: number, lng: number) => {
    crawlAbortRef.current?.abort();
    const controller = new AbortController();
    crawlAbortRef.current = controller;
    const requestId = ++crawlRequestIdRef.current;

    setCrawlerLoading(true);
    setWalkingRouteActive(false);
    setActiveRouteKind('storefront');
    setStorefrontBatchIndex(0);
    setNearbyBuildings([]);
    setStorefrontBatches([]);
    setCrawlStats(null);
    setRouteInfo(null);
    setRouteMessage('Finding and ranking storefronts...');

    const query = `
      [out:json][timeout:18];
      (
        node["shop"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        way["shop"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        relation["shop"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        node["amenity"~"restaurant|cafe|bar|fast_food|food_court|bank|pharmacy|dentist|doctors|clinic"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        way["amenity"~"restaurant|cafe|bar|fast_food|food_court|bank|pharmacy|dentist|doctors|clinic"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        relation["amenity"~"restaurant|cafe|bar|fast_food|food_court|bank|pharmacy|dentist|doctors|clinic"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        node["leisure"="fitness_centre"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        way["leisure"="fitness_centre"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        relation["leisure"="fitness_centre"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        node["office"~"estate_agent|insurance|financial|travel_agent|coworking|company|accountant|lawyer"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        way["office"~"estate_agent|insurance|financial|travel_agent|coworking|company|accountant|lawyer"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        node["healthcare"~"dentist|clinic|physiotherapist|optometrist"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        way["healthcare"~"dentist|clinic|physiotherapist|optometrist"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        node["craft"~"photographer|tailor|shoemaker"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
        way["craft"~"photographer|tailor|shoemaker"](around:${STOREFRONT_RADIUS_METERS},${lat},${lng});
      );
      out center;
    `;

    try {
      const cacheKey = `${lat.toFixed(3)}:${lng.toFixed(3)}:${STOREFRONT_RADIUS_METERS}`;
      const cached = overpassStorefrontCache.get(cacheKey);
      let data: any;
      if (cached && Date.now() - cached.at < OVERPASS_CACHE_TTL_MS) {
        data = cached.data;
      } else {
        data = await fetchOverpass(query, controller.signal);
        overpassStorefrontCache.set(cacheKey, { at: Date.now(), data });
      }

      if (controller.signal.aborted || requestId !== crawlRequestIdRef.current) return;
      const elements = Array.isArray(data?.elements) ? data.elements : [];
      const processed = processStorefrontElements(elements, { lat, lng }, pinsRef.current);
      const batches = buildBalancedRouteBatches(processed.results);

      setNearbyBuildings(processed.results);
      setStorefrontBatches(batches);
      setCrawlStats(processed.stats);
      setWalkingRouteActive(processed.results.length > 0);
      saveCrawlSnapshot({
        origin: { lat, lng },
        radiusMeters: STOREFRONT_RADIUS_METERS,
        results: processed.results,
        stats: processed.stats,
      });

      if (processed.results.length === 0) {
        setRouteMessage(processed.stats.excludedVisited > 0
          ? 'No new storefronts here — matching businesses were already marked.'
          : 'No qualified storefronts found. Try another location.');
      } else {
        setRouteMessage(`${processed.results.length} best storefronts shown · ${processed.stats.eligibleCount} eligible · ${processed.stats.rawCount} raw.`);
        toast.success(`${processed.results.length} storefronts ready`);
      }
    } catch (error: any) {
      if (error?.name === 'AbortError') return;
      console.error('Storefront crawl failed:', error);
      if (requestId !== crawlRequestIdRef.current) return;
      setNearbyBuildings([]);
      setStorefrontBatches([]);
      setCrawlStats(null);
      setWalkingRouteActive(false);
      setRouteMessage('Error finding storefronts. OpenStreetMap did not respond.');
      toast.error('Storefront crawl failed');
    } finally {
      if (requestId === crawlRequestIdRef.current) setCrawlerLoading(false);
    }
  }, [saveCrawlSnapshot]);

  const generateResidentialRouteFromPoint = useCallback(async (lat: number, lng: number) => {
    crawlAbortRef.current?.abort();
    const controller = new AbortController();
    crawlAbortRef.current = controller;
    const requestId = ++crawlRequestIdRef.current;

    setCrawlerLoading(true);
    setWalkingRouteActive(false);
    setActiveRouteKind('residential');
    setNearbyBuildings([]);
    setStorefrontBatches([]);
    setCrawlStats(null);
    setRouteInfo(null);
    setRouteMessage('Finding nearby buildings...');

    const query = `
      [out:json][timeout:18];
      (
        way["building"~"house|residential|apartments|detached|terrace|semidetached_house|bungalow|commercial|retail|office"](around:${RESIDENTIAL_RADIUS_METERS},${lat},${lng});
        relation["building"~"house|residential|apartments|detached|terrace|semidetached_house|bungalow|commercial|retail|office"](around:${RESIDENTIAL_RADIUS_METERS},${lat},${lng});
      );
      out center;
    `;

    try {
      const data = await fetchOverpass(query, controller.signal);
      if (controller.signal.aborted || requestId !== crawlRequestIdRef.current) return;
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
      setWalkingRouteActive(targets.length > 0);
      setRouteMessage(targets.length > 0
        ? `Found ${targets.length} nearby buildings. Routing the nearest ${Math.min(ROUTE_BATCH_SIZE, targets.length)}.`
        : 'No buildings found in this area. Try another location.');
    } catch (error: any) {
      if (error?.name === 'AbortError') return;
      console.error('Residential crawl failed:', error);
      if (requestId !== crawlRequestIdRef.current) return;
      setNearbyBuildings([]);
      setWalkingRouteActive(false);
      setRouteMessage('Error connecting to OpenStreetMap');
    } finally {
      if (requestId === crawlRequestIdRef.current) setCrawlerLoading(false);
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
            propertyDataSource: propertyData?.source || undefined,
          });
          setRouteMessage('Location added!');
        } catch (error) {
          console.error('Map click add failed:', error);
          onAddPinRef.current({
            lat,
            lng,
            address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
            status: 'visited',
            notes: '',
            dateAdded: new Date().toISOString().split('T')[0],
            leadSource: 'door-to-door',
          });
          setRouteMessage('Location added without address details');
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
    const identity = candidateIdentity(candidate);
    const duplicate = pinsRef.current.some((pin) => pin.isStorefront && d2dPinIdentity(pin) === identity);

    if (duplicate) {
      toast.info('This storefront is already marked');
      setNearbyBuildings((current) => current.filter((item) => item.id !== candidate.id));
      setStorefrontBatches((current) => current.map((batch) => batch.filter((item) => item.id !== candidate.id)));
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
      externalId: candidate.externalId,
      phoneNumber: candidate.phone || undefined,
      contactInfo: [candidate.phone, candidate.website, candidate.openingHours].filter(Boolean).join(' · ') || undefined,
      leadSource: 'door-to-door',
      isStorefront: true,
      storefrontType: candidate.storefrontType,
      leadScore: candidate.priority === 'A' ? 'high' : candidate.priority === 'B' ? 'medium' : 'low',
    });

    setNearbyBuildings((current) => current.filter((item) => item.id !== candidate.id));
    setStorefrontBatches((current) => current.map((batch) => batch.filter((item) => item.id !== candidate.id)));
    toast.success(`${candidate.businessName}: ${status.replace('-', ' ')}`);
  }, []);

  const activeStorefrontBatch = useMemo(() => {
    if (activeRouteKind !== 'storefront') return [] as StorefrontCandidate[];
    const existingIds = new Set(nearbyBuildings.filter(isStorefront).map((candidate) => candidate.id));
    return (storefrontBatches[storefrontBatchIndex] || []).filter((candidate) => existingIds.has(candidate.id));
  }, [activeRouteKind, nearbyBuildings, storefrontBatches, storefrontBatchIndex]);

  const storefrontBatchCount = Math.max(1, storefrontBatches.length);

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
          fillOpacity: storefront && !activeBatch ? 0.5 : 1,
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
        type.textContent = `${target.category} · ${target.buildingType.replace(/_/g, ' ')}`;
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
      const batch = [...activeStorefrontBatch];
      if (batch.length > 1) {
        let farthestIndex = 0;
        let farthestDistance = -1;
        batch.forEach((candidate, index) => {
          const distance = distanceKm(routeStartLocation.lat, routeStartLocation.lng, candidate.lat, candidate.lng);
          if (distance > farthestDistance) {
            farthestDistance = distance;
            farthestIndex = index;
          }
        });
        const [destination] = batch.splice(farthestIndex, 1);
        targets = [...batch, destination];
      } else {
        targets = batch;
      }
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

    const saveRouteSession = (
      geometry: Array<{ lat: number; lng: number }>,
      duration?: number,
      distance?: number,
    ) => {
      const now = new Date().toISOString();
      const routeId = [
        'crawler',
        activeRouteKind,
        routeStartLocation.lat.toFixed(5),
        routeStartLocation.lng.toFixed(5),
        activeRouteKind === 'storefront' ? storefrontBatchIndex : 0,
      ].join(':');
      onUpdateRoutes((previous) => {
        const existing = previous.find((route) => route.id === routeId);
        const nextRoute: RouteSession = {
          id: routeId,
          name: activeRouteKind === 'storefront'
            ? `Storefront Crawl · Batch ${storefrontBatchIndex + 1}`
            : 'Residential Crawl',
          startTime: existing?.startTime || now,
          endTime: now,
          duration,
          distance,
          path: geometry.map((point) => ({ ...point, timestamp: now })),
          homesVisited: targets.length,
          color: activeRouteKind === 'storefront' ? '#f97316' : '#10b981',
          isActive: false,
        };
        const found = previous.findIndex((route) => route.id === routeId);
        if (found < 0) return [...previous, nextRoute];
        const next = [...previous];
        next[found] = nextRoute;
        return next;
      });
    };

    setRouteMessage(activeRouteKind === 'storefront' ? 'Calculating clustered storefront walking route...' : 'Calculating walking route...');

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
        saveRouteSession(routeData.geometry, routeData.totalDuration, routeData.totalDistance);
        setRouteMessage(`Route ready · ${targets.length} stops · ${formatDuration(routeData.totalDuration)} · ${formatDistance(routeData.totalDistance)}`);
        return;
      }

      const fallbackGeometry = [routeStartLocation, ...targets.map((target) => ({ lat: target.lat, lng: target.lng }))];
      routeLineRef.current = new googleMaps.maps.Polyline({
        path: fallbackGeometry,
        strokeColor: activeRouteKind === 'storefront' ? '#f97316' : '#10b981',
        strokeWeight: 4,
        strokeOpacity: 0.7,
        map: mapInstanceRef.current,
      });
      saveRouteSession(fallbackGeometry);
      setRouteMessage(`Route ready · ${targets.length} stops · straight-line fallback`);
    }).catch((error) => {
      console.error('Route calculation failed:', error);
      if (!cancelled) setRouteMessage('Could not calculate walking route');
    });

    return () => { cancelled = true; };
  }, [walkingRouteActive, routeStartLocation, activeRouteKind, nearbyBuildings, activeStorefrontBatch, storefrontBatchIndex, showStorefrontRoutes, getRoute, formatDuration, formatDistance, onUpdateRoutes]);

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
    crawlAbortRef.current?.abort();
    crawlRequestIdRef.current += 1;
    setCrawlerLoading(false);
    setWalkingRouteActive(false);
    setActiveRouteKind(null);
    setRouteStartLocation(null);
    setNearbyBuildings([]);
    setStorefrontBatches([]);
    setCrawlStats(null);
    setRouteInfo(null);
    setStorefrontBatchIndex(0);
    setRouteSelectMode(false);
    setStorefrontRouteMode(false);
    routeSelectModeRef.current = false;
    storefrontRouteModeRef.current = false;
    setRouteMessage('Tap on map to add location');
  };

  const restoreLatestCrawl = async () => {
    let latest = crawlHistory[0] || null;
    if (!latest) {
      try { latest = await loadLatestD2DCrawlSession<StorefrontCandidate>(); }
      catch (error) { console.error('Could not restore cloud crawl:', error); }
    }
    if (!latest) {
      toast.info('No saved storefront crawl yet');
      return;
    }

    const marked = new Set(pinsRef.current.filter((pin) => pin.isStorefront).map(d2dPinIdentity));
    const remaining = latest.results.filter((candidate) => !marked.has(candidateIdentity(candidate)));
    setRouteStartLocation(latest.origin);
    setActiveRouteKind('storefront');
    setWalkingRouteActive(remaining.length > 0);
    setNearbyBuildings(remaining);
    setStorefrontBatches(buildBalancedRouteBatches(remaining));
    setCrawlStats({ ...latest.stats, qualifiedCount: latest.results.length });
    setStorefrontBatchIndex(0);
    setShowStorefrontRoutes(true);
    setRouteMessage(`Restored crawl · ${remaining.length} unmarked of ${latest.results.length} shown`);
    mapInstanceRef.current?.setCenter(latest.origin);
    mapInstanceRef.current?.setZoom(15);
  };

  const storefrontCount = nearbyBuildings.filter(isStorefront).length;
  const activeBatchRemaining = activeStorefrontBatch.length;

  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="bg-background border rounded-lg shadow-sm p-2 sm:p-3">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <label className="flex items-center gap-1.5 cursor-pointer text-xs sm:text-sm font-medium">
            <input type="checkbox" checked={showSavedRoutes} onChange={(event) => setShowSavedRoutes(event.target.checked)} className="rounded w-4 h-4" />
            Saved Routes
          </label>
          {activeRouteKind === 'storefront' && (
            <label className="flex items-center gap-1.5 cursor-pointer text-xs sm:text-sm font-medium">
              <input type="checkbox" checked={showStorefrontRoutes} onChange={(event) => setShowStorefrontRoutes(event.target.checked)} className="rounded w-4 h-4" />
              Storefront Crawl
            </label>
          )}
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
          {(walkingRouteActive || routeStartLocation || crawlerLoading) && (
            <button onClick={clearRoute} className="text-xs sm:text-sm bg-destructive text-destructive-foreground rounded px-2 sm:px-3 py-2 font-medium hover:bg-destructive/90">
              Clear Route
            </button>
          )}
          {crawlHistory.length > 0 && activeRouteKind !== 'storefront' && (
            <button onClick={() => void restoreLatestCrawl()} className="text-xs sm:text-sm border rounded px-2 sm:px-3 py-2 font-medium hover:bg-muted">
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

        {activeRouteKind === 'storefront' && crawlStats && (
          <div className="mt-2 pt-2 border-t space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold">{storefrontCount} remaining</span>
              <span className="text-muted-foreground">{crawlStats.qualifiedCount} best shown · {crawlStats.eligibleCount} eligible · {crawlStats.rawCount} raw</span>
              {crawlStats.excludedVisited > 0 && <span className="text-muted-foreground">{crawlStats.excludedVisited} already marked excluded</span>}
              <span className="text-muted-foreground">{activeBatchRemaining} stops in current route batch</span>
            </div>
            {storefrontBatches.length > 1 && (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={storefrontBatchIndex === 0}
                  onClick={() => setStorefrontBatchIndex((index) => Math.max(0, index - 1))}
                  className="text-xs border rounded px-2 py-1 disabled:opacity-40"
                >
                  ← Previous batch
                </button>
                <button
                  type="button"
                  disabled={storefrontBatchIndex >= storefrontBatches.length - 1}
                  onClick={() => setStorefrontBatchIndex((index) => Math.min(storefrontBatches.length - 1, index + 1))}
                  className="text-xs border rounded px-2 py-1 disabled:opacity-40"
                >
                  Next batch →
                </button>
                <span className="text-xs text-muted-foreground self-center">Batch {storefrontBatchIndex + 1}/{storefrontBatches.length} · geographically clustered + category-balanced</span>
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

export default MapComponentV4;
