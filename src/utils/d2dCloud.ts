import { supabase } from '@/integrations/supabase/client';
import { HousePin } from '@/components/house-tracking/types';

export interface D2DCrawlStats {
  rawCount: number;
  eligibleCount: number;
  qualifiedCount: number;
  excludedVisited: number;
}

export interface D2DCrawlSnapshot<TCandidate = unknown> {
  id?: string;
  createdAt?: string;
  origin: { lat: number; lng: number };
  radiusMeters: number;
  results: TCandidate[];
  stats: D2DCrawlStats;
}

export interface D2DCloudTombstone {
  identityKey: string;
  clientPinId: string;
  updatedAt: string;
}

export interface D2DCloudState {
  pins: HousePin[];
  tombstones: D2DCloudTombstone[];
}

const normalizeIdentityText = (value: unknown) =>
  String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const safeIso = (value: unknown, fallback = new Date().toISOString()) => {
  const parsed = new Date(String(value || '')).getTime();
  return Number.isFinite(parsed) ? new Date(parsed).toISOString() : fallback;
};

export const d2dPinUpdatedAtMs = (pin: Pick<HousePin, 'updatedAt' | 'dateAdded'>) => {
  const parsed = new Date(pin.updatedAt || pin.dateAdded || 0).getTime();
  return Number.isFinite(parsed) ? parsed : 0;
};

export const ensureD2DPinUpdatedAt = <TPin extends HousePin>(pin: TPin): TPin => {
  if (pin.updatedAt) return pin;
  return {
    ...pin,
    updatedAt: safeIso(pin.dateAdded),
  };
};

export const d2dPinIdentity = (
  pin: Pick<HousePin, 'lat' | 'lng' | 'address' | 'isStorefront' | 'businessName' | 'customerName' | 'externalId'>,
) => {
  const address = normalizeIdentityText(pin.address);
  const businessName = normalizeIdentityText(pin.businessName || pin.customerName);
  const coordinates = `${pin.lat.toFixed(5)},${pin.lng.toFixed(5)}`;

  if (pin.isStorefront && pin.externalId) {
    return `storefront-source:${normalizeIdentityText(pin.externalId)}`;
  }

  if (pin.isStorefront && businessName) {
    // Coordinates prevent separate branches of the same chain from collapsing when
    // OpenStreetMap has no street address or uses the business name as the fallback.
    return `storefront:${businessName}|${address && address !== businessName ? address : 'no-address'}|${coordinates}`;
  }

  if (address) return `address:${address}`;
  return `geo:${coordinates}`;
};

const getAuthenticatedUserId = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!data.user) throw new Error('D2D cloud sync requires an authenticated user');
  return data.user.id;
};

const rowFromPin = (rawPin: HousePin) => {
  const pin = ensureD2DPinUpdatedAt(rawPin);
  return {
    identity_key: d2dPinIdentity(pin),
    client_pin_id: pin.id,
    address: pin.address,
    latitude: pin.lat,
    longitude: pin.lng,
    status: pin.status,
    lead_source: pin.leadSource || null,
    is_storefront: Boolean(pin.isStorefront),
    storefront_type: pin.storefrontType || null,
    business_name: pin.businessName || pin.customerName || null,
    phone_number: pin.phoneNumber || null,
    pin_data: pin,
    client_updated_at: pin.updatedAt,
  };
};

export const upsertD2DCloudPins = async (pins: HousePin[]) => {
  if (pins.length === 0) return;
  await getAuthenticatedUserId();
  const client = supabase as any;
  const { error } = await client.rpc('upsert_d2d_field_pins', {
    p_pins: pins.map(rowFromPin),
  });
  if (error) throw error;
};

export const upsertD2DCloudPin = async (pin: HousePin) => {
  await upsertD2DCloudPins([pin]);
};

export const loadD2DCloudState = async (): Promise<D2DCloudState> => {
  const userId = await getAuthenticatedUserId();
  const client = supabase as any;
  const { data, error } = await client
    .from('d2d_field_pins')
    .select('identity_key,client_pin_id,pin_data,client_updated_at,deleted_at')
    .eq('user_id', userId)
    .order('client_updated_at', { ascending: true });
  if (error) throw error;

  const pins: HousePin[] = [];
  const tombstones: D2DCloudTombstone[] = [];

  for (const row of data || []) {
    const updatedAt = safeIso(row?.client_updated_at);
    if (row?.deleted_at) {
      tombstones.push({
        identityKey: String(row.identity_key || ''),
        clientPinId: String(row.client_pin_id || ''),
        updatedAt,
      });
      continue;
    }

    if (!row?.pin_data || typeof row.pin_data !== 'object') continue;
    pins.push({
      ...row.pin_data,
      id: String(row.client_pin_id || row.pin_data.id),
      updatedAt,
    } as HousePin);
  }

  return { pins, tombstones };
};

export const loadD2DCloudPins = async (): Promise<HousePin[]> => {
  const state = await loadD2DCloudState();
  return state.pins;
};

export const tombstoneD2DCloudPins = async (items: D2DCloudTombstone[]) => {
  if (items.length === 0) return;
  await getAuthenticatedUserId();
  const client = supabase as any;
  const { error } = await client.rpc('tombstone_d2d_field_pins', {
    p_items: items.map((item) => ({
      identity_key: item.identityKey,
      client_pin_id: item.clientPinId,
      client_updated_at: safeIso(item.updatedAt),
    })),
  });
  if (error) throw error;
};

/** Backward-compatible helper. New callers should pass stable client pin IDs too. */
export const deleteD2DCloudPinsByIdentity = async (identityKeys: string[]) => {
  const now = new Date().toISOString();
  await tombstoneD2DCloudPins(
    Array.from(new Set(identityKeys.filter(Boolean))).map((identityKey) => ({
      identityKey,
      clientPinId: '',
      updatedAt: now,
    })),
  );
};

export const saveD2DCrawlSession = async <TCandidate>(snapshot: D2DCrawlSnapshot<TCandidate>) => {
  const userId = await getAuthenticatedUserId();
  const client = supabase as any;
  const clientSessionId = snapshot.id || null;
  const { data, error } = await client
    .from('d2d_crawl_sessions')
    .upsert({
      user_id: userId,
      client_session_id: clientSessionId,
      origin_lat: snapshot.origin.lat,
      origin_lng: snapshot.origin.lng,
      radius_meters: snapshot.radiusMeters,
      raw_count: snapshot.stats.rawCount,
      eligible_count: snapshot.stats.eligibleCount,
      shown_count: snapshot.stats.qualifiedCount,
      excluded_visited: snapshot.stats.excludedVisited,
      candidates: snapshot.results,
    }, clientSessionId ? { onConflict: 'user_id,client_session_id' } : undefined)
    .select('id,client_session_id,created_at')
    .single();
  if (error) throw error;
  return data as { id: string; client_session_id: string | null; created_at: string };
};

export const loadLatestD2DCrawlSession = async <TCandidate>(): Promise<D2DCrawlSnapshot<TCandidate> | null> => {
  const userId = await getAuthenticatedUserId();
  const client = supabase as any;
  const { data, error } = await client
    .from('d2d_crawl_sessions')
    .select('id,client_session_id,origin_lat,origin_lng,radius_meters,raw_count,eligible_count,shown_count,excluded_visited,candidates,created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;

  return {
    id: data.client_session_id || data.id,
    createdAt: data.created_at,
    origin: { lat: Number(data.origin_lat), lng: Number(data.origin_lng) },
    radiusMeters: Number(data.radius_meters || 1500),
    results: Array.isArray(data.candidates) ? data.candidates as TCandidate[] : [],
    stats: {
      rawCount: Number(data.raw_count || 0),
      eligibleCount: Number(data.eligible_count || 0),
      qualifiedCount: Number(data.shown_count || 0),
      excludedVisited: Number(data.excluded_visited || 0),
    },
  };
};
