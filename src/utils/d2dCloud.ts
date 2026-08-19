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

const normalizeIdentityText = (value: unknown) =>
  String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

export const d2dPinIdentity = (pin: Pick<HousePin, 'lat' | 'lng' | 'address' | 'isStorefront' | 'businessName' | 'customerName'>) => {
  const address = normalizeIdentityText(pin.address);
  const businessName = normalizeIdentityText(pin.businessName || pin.customerName);

  if (pin.isStorefront && businessName) {
    return `storefront:${businessName}|${address || `${pin.lat.toFixed(5)},${pin.lng.toFixed(5)}`}`;
  }

  if (address) return `address:${address}`;
  return `geo:${pin.lat.toFixed(5)},${pin.lng.toFixed(5)}`;
};

const getAuthenticatedUserId = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!data.user) throw new Error('D2D cloud sync requires an authenticated user');
  return data.user.id;
};

const rowFromPin = (pin: HousePin, userId: string) => ({
  user_id: userId,
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
  updated_at: new Date().toISOString(),
});

export const upsertD2DCloudPins = async (pins: HousePin[]) => {
  if (pins.length === 0) return;
  const userId = await getAuthenticatedUserId();
  const rows = pins.map((pin) => rowFromPin(pin, userId));
  const client = supabase as any;
  const { error } = await client
    .from('d2d_field_pins')
    .upsert(rows, { onConflict: 'user_id,identity_key' });
  if (error) throw error;
};

export const upsertD2DCloudPin = async (pin: HousePin) => {
  await upsertD2DCloudPins([pin]);
};

export const loadD2DCloudPins = async (): Promise<HousePin[]> => {
  const userId = await getAuthenticatedUserId();
  const client = supabase as any;
  const { data, error } = await client
    .from('d2d_field_pins')
    .select('client_pin_id,pin_data,updated_at')
    .eq('user_id', userId)
    .order('updated_at', { ascending: true });
  if (error) throw error;

  return (data || [])
    .map((row: any) => {
      if (!row?.pin_data || typeof row.pin_data !== 'object') return null;
      return { ...row.pin_data, id: String(row.client_pin_id || row.pin_data.id) } as HousePin;
    })
    .filter((pin: HousePin | null): pin is HousePin => Boolean(pin));
};

export const deleteD2DCloudPinsByIdentity = async (identityKeys: string[]) => {
  const uniqueKeys = Array.from(new Set(identityKeys.filter(Boolean)));
  if (uniqueKeys.length === 0) return;
  const userId = await getAuthenticatedUserId();
  const client = supabase as any;
  const { error } = await client
    .from('d2d_field_pins')
    .delete()
    .eq('user_id', userId)
    .in('identity_key', uniqueKeys);
  if (error) throw error;
};

export const saveD2DCrawlSession = async <TCandidate>(snapshot: D2DCrawlSnapshot<TCandidate>) => {
  const userId = await getAuthenticatedUserId();
  const client = supabase as any;
  const { data, error } = await client
    .from('d2d_crawl_sessions')
    .insert({
      user_id: userId,
      origin_lat: snapshot.origin.lat,
      origin_lng: snapshot.origin.lng,
      radius_meters: snapshot.radiusMeters,
      raw_count: snapshot.stats.rawCount,
      eligible_count: snapshot.stats.eligibleCount,
      shown_count: snapshot.stats.qualifiedCount,
      excluded_visited: snapshot.stats.excludedVisited,
      candidates: snapshot.results,
    })
    .select('id,created_at')
    .single();
  if (error) throw error;
  return data as { id: string; created_at: string };
};

export const loadLatestD2DCrawlSession = async <TCandidate>(): Promise<D2DCrawlSnapshot<TCandidate> | null> => {
  const userId = await getAuthenticatedUserId();
  const client = supabase as any;
  const { data, error } = await client
    .from('d2d_crawl_sessions')
    .select('id,origin_lat,origin_lng,radius_meters,raw_count,eligible_count,shown_count,excluded_visited,candidates,created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
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
