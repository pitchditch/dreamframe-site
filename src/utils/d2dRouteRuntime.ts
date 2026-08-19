export const AUTO_ROUTE_MIN_STOPS = 5;
export const ROUTE_DEVIATION_METERS = 80;

export interface RouteRuntimePoint {
  lat: number;
  lng: number;
}

export interface RouteRuntimeStop extends RouteRuntimePoint {
  id: string;
  status?: string;
  address?: string;
  streetSide?: string;
}

export interface RouteProgressBreakdown {
  total: number;
  worked: number;
  unvisited: number;
  visited: number;
  interested: number;
  quotes: number;
  notInterested: number;
  revisitLater: number;
  completedJobs: number;
  workedRate: number;
}

const EARTH_RADIUS_METERS = 6_371_000;
const WORKED_STATUSES = new Set([
  'visited',
  'interested',
  'needs-quote',
  'not-interested',
  'not_interested',
  'revisit-later',
  'revisit_later',
  'completed',
]);

const radians = (degrees: number) => degrees * Math.PI / 180;
const houseNumber = (address?: string) => {
  const match = String(address || '').trim().match(/^(\d+)/);
  return match ? Number(match[1]) : Number.NaN;
};
const normalizedSide = (value?: string) => String(value || '').trim().toLowerCase();

export const isAutoRouteEligible = (eligibleStops: number) => eligibleStops >= AUTO_ROUTE_MIN_STOPS;

export const isWorkedRouteStatus = (status: unknown) => {
  const normalized = String(status || '').trim().toLowerCase();
  return WORKED_STATUSES.has(normalized);
};

export const haversineMeters = (a: RouteRuntimePoint, b: RouteRuntimePoint) => {
  const lat1 = radians(a.lat);
  const lat2 = radians(b.lat);
  const deltaLat = radians(b.lat - a.lat);
  const deltaLng = radians(b.lng - a.lng);
  const sinLat = Math.sin(deltaLat / 2);
  const sinLng = Math.sin(deltaLng / 2);
  const h = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLng * sinLng;
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.min(1, Math.sqrt(h)));
};

/**
 * Produces the D2D-friendly "down one side, back the other" order.
 * Prefer explicit streetSide data. If crawler geometry did not populate it,
 * infer opposite sides from normal odd/even civic-address parity.
 */
export const buildStreetSweepOrder = <TStop extends RouteRuntimeStop>(stops: TStop[]): TStop[] => {
  if (stops.length < 2) return [...stops];
  const withNumbers = stops.map((stop, index) => ({ stop, index, number: houseNumber(stop.address), side: normalizedSide(stop.streetSide) }));
  const explicitSides = Array.from(new Set(withNumbers.map((item) => item.side).filter(Boolean)));

  const sortAscending = (items: typeof withNumbers) => [...items].sort((a, b) => {
    if (Number.isFinite(a.number) && Number.isFinite(b.number) && a.number !== b.number) return a.number - b.number;
    if (Number.isFinite(a.number) !== Number.isFinite(b.number)) return Number.isFinite(a.number) ? -1 : 1;
    return a.index - b.index;
  });

  if (explicitSides.length >= 2) {
    const firstSide = explicitSides[0];
    const secondSide = explicitSides[1];
    const first = sortAscending(withNumbers.filter((item) => item.side === firstSide));
    const second = sortAscending(withNumbers.filter((item) => item.side === secondSide)).reverse();
    const used = new Set([...first, ...second].map((item) => item.index));
    const remainder = sortAscending(withNumbers.filter((item) => !used.has(item.index)));
    return [...first, ...second, ...remainder].map((item) => item.stop);
  }

  const odd = sortAscending(withNumbers.filter((item) => Number.isFinite(item.number) && item.number % 2 === 1));
  const even = sortAscending(withNumbers.filter((item) => Number.isFinite(item.number) && item.number % 2 === 0));
  const unknown = sortAscending(withNumbers.filter((item) => !Number.isFinite(item.number)));

  if (odd.length > 0 && even.length > 0) {
    return [...odd, ...even.reverse(), ...unknown].map((item) => item.stop);
  }
  return sortAscending(withNumbers).map((item) => item.stop);
};

export const orientStopsForLocation = <TStop extends RouteRuntimeStop>(
  stops: TStop[],
  location: RouteRuntimePoint | null | undefined,
): TStop[] => {
  const ordered = [...stops];
  if (!location || ordered.length < 2) return ordered;
  const firstDistance = haversineMeters(location, ordered[0]);
  const lastDistance = haversineMeters(location, ordered[ordered.length - 1]);
  return lastDistance < firstDistance ? ordered.reverse() : ordered;
};

export const routeProgressBreakdown = <TStop extends RouteRuntimeStop>(
  stops: TStop[],
  overrides: Record<string, string> = {},
): RouteProgressBreakdown => {
  const result: RouteProgressBreakdown = {
    total: stops.length,
    worked: 0,
    unvisited: 0,
    visited: 0,
    interested: 0,
    quotes: 0,
    notInterested: 0,
    revisitLater: 0,
    completedJobs: 0,
    workedRate: 0,
  };

  for (const stop of stops) {
    const status = String(overrides[stop.id] ?? stop.status ?? 'unvisited').trim().toLowerCase();
    if (isWorkedRouteStatus(status)) result.worked += 1;
    else result.unvisited += 1;
    if (status === 'visited') result.visited += 1;
    if (status === 'interested') result.interested += 1;
    if (status === 'needs-quote') result.quotes += 1;
    if (status === 'not-interested' || status === 'not_interested') result.notInterested += 1;
    if (status === 'revisit-later' || status === 'revisit_later') result.revisitLater += 1;
    if (status === 'completed') result.completedJobs += 1;
  }

  result.workedRate = result.total > 0 ? result.worked / result.total * 100 : 0;
  return result;
};

export const findNextUnworkedIndex = <TStop extends RouteRuntimeStop>(
  orderedStops: TStop[],
  startIndex: number,
  overrides: Record<string, string> = {},
  skippedStopIds: Iterable<string> = [],
) => {
  const skipped = new Set(skippedStopIds);
  for (let index = Math.max(0, startIndex); index < orderedStops.length; index += 1) {
    const stop = orderedStops[index];
    if (skipped.has(stop.id)) continue;
    const status = overrides[stop.id] ?? stop.status;
    if (!isWorkedRouteStatus(status)) return index;
  }
  return -1;
};

export const reorderRemainingFromLocation = <TStop extends RouteRuntimeStop>(
  stops: TStop[],
  location: RouteRuntimePoint,
): TStop[] => {
  const remaining = [...stops];
  const ordered: TStop[] = [];
  let cursor: RouteRuntimePoint = location;

  while (remaining.length > 0) {
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;
    for (let index = 0; index < remaining.length; index += 1) {
      const distance = haversineMeters(cursor, remaining[index]);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    }
    const [next] = remaining.splice(closestIndex, 1);
    ordered.push(next);
    cursor = next;
  }

  return ordered;
};

const pointToSegmentMeters = (
  point: RouteRuntimePoint,
  start: RouteRuntimePoint,
  end: RouteRuntimePoint,
) => {
  const meanLat = radians((point.lat + start.lat + end.lat) / 3);
  const metersPerDegreeLat = 111_320;
  const metersPerDegreeLng = Math.max(1, 111_320 * Math.cos(meanLat));
  const px = (point.lng - start.lng) * metersPerDegreeLng;
  const py = (point.lat - start.lat) * metersPerDegreeLat;
  const ex = (end.lng - start.lng) * metersPerDegreeLng;
  const ey = (end.lat - start.lat) * metersPerDegreeLat;
  const denominator = ex * ex + ey * ey;
  const t = denominator <= 0 ? 0 : Math.max(0, Math.min(1, (px * ex + py * ey) / denominator));
  const dx = px - ex * t;
  const dy = py - ey * t;
  return Math.sqrt(dx * dx + dy * dy);
};

export const distanceToPolylineMeters = (
  point: RouteRuntimePoint,
  path: RouteRuntimePoint[],
) => {
  if (path.length === 0) return Number.POSITIVE_INFINITY;
  if (path.length === 1) return haversineMeters(point, path[0]);
  let closest = Number.POSITIVE_INFINITY;
  for (let index = 0; index < path.length - 1; index += 1) {
    closest = Math.min(closest, pointToSegmentMeters(point, path[index], path[index + 1]));
  }
  return closest;
};

export const routePathDistanceMeters = (path: RouteRuntimePoint[]) => {
  let total = 0;
  for (let index = 1; index < path.length; index += 1) total += haversineMeters(path[index - 1], path[index]);
  return total;
};
