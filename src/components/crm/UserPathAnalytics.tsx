import { useEffect, useMemo, useState } from 'react';
import { Activity, ArrowRight, Filter, Route, ShieldCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cities } from '@/data/cities';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PAGE_SIZE = 1000;
const QUOTE_WORDS = /\b(quote|price|pricing|estimate|book|availability)\b/i;
type Range = '24h' | '7d' | '30d';
type ViewRow = {
  id: string; page_path: string | null; session_id: string | null; visitor_id: string | null;
  created_at: string | null; timestamp: string | null; detected_city: string | null;
  utm_source: string | null; referrer: string | null; device_category: string | null;
  is_bot: boolean | null; is_internal: boolean | null; tracking_mode: string | null;
};
type EventRow = {
  id: string; occurred_at: string; session_id: string | null; quote_id: string | null;
  event_type: string | null; event_name: string | null; event_label: string | null;
  page_path: string | null; element_id: string | null; element_text: string | null;
  destination_url: string | null; source: string | null; utm_source: string | null;
  device_category: string | null; city: string | null; is_internal: boolean | null;
  is_bot: boolean | null; is_test: boolean | null;
};
type SessionRow = {
  session_id: string; first_visit: string; last_activity: string; referrer: string | null;
  utm_source: string | null; detected_city: string | null; device_category: string | null;
  is_bot: boolean | null; is_internal: boolean | null;
};
type BookingRow = { id: string; quote_id: string | null; created_at: string; is_test: boolean | null };
type Step = { path: string; at: string };
type Journey = {
  sessionId: string; pages: string[]; steps: Step[]; firstAt: string; lastAt: string;
  source: string; device: string; city: string; interactions: number; quoteClicks: number;
  quoteStarted: boolean; quoteStartedAt: string | null; booked: boolean; bookedAt: string | null;
  suspicious: boolean;
};
type Pattern = { pattern: string[]; sessions: number; quoteStarts: number; bookings: number };
type Breakdown = { label: string; sessions: number; avgPages: number; quoteRate: number; bookingRate: number };

const ranges: Record<Range, { days: number; label: string }> = {
  '24h': { days: 1, label: '24 Hours' }, '7d': { days: 7, label: '7 Days' }, '30d': { days: 30, label: '30 Days' },
};
const cityPaths = new Set(cities.map((city) => `/${city.slug}`));
const aliases: Record<string, string> = {
  '/window-cleaning': '/services/window-cleaning',
  '/pressure-washing': '/services/pressure-washing',
  '/gutter-cleaning': '/services/gutter-cleaning',
  '/roof-cleaning': '/services/roof-cleaning',
  '/house-washing': '/services/house-washing',
  '/soft-washing': '/services/house-washing',
  '/fence-washing': '/services/fence-washing',
  '/storefront': '/storefront-window-cleaning',
  '/service-areas': '/services',
  '/residential-maintenance': '/maintenance-memberships',
  '/maintenance-plans': '/maintenance-memberships',
};

const viewTime = (row: ViewRow) => row.timestamp || row.created_at || '';
const isPublic = (row: { is_internal?: boolean | null; is_bot?: boolean | null; is_test?: boolean | null }) =>
  !row.is_internal && !row.is_bot && !row.is_test;
const rawPath = (raw: string | null | undefined) => {
  if (!raw?.trim()) return '/';
  try { if (/^https?:\/\//i.test(raw)) return new URL(raw).pathname || '/'; } catch {}
  return raw.split('?')[0].split('#')[0] || '/';
};
const canonical = (raw: string | null | undefined) => {
  let path = rawPath(raw).toLowerCase();
  if (!path.startsWith('/')) path = `/${path}`;
  path = path.replace(/\/{2,}/g, '/');
  if (path.length > 1) path = path.replace(/\/$/, '');
  if (aliases[path]) path = aliases[path];
  const city = path.match(/^\/locations\/([^/]+)$/)?.[1];
  if (city && cityPaths.has(`/${city}`)) path = `/${city}`;
  if (/^\/quote\/[0-9a-f-]{20,}$/i.test(path)) return '/quote/:id';
  if (/^\/virtual-estimate\/[^/]+$/i.test(path)) return '/virtual-estimate/:session';
  return path || '/';
};
const quoteIdFromPath = (raw: string | null | undefined) => rawPath(raw).match(/^\/quote\/([0-9a-f-]{20,})/i)?.[1] || null;
const labelPath = (path: string) => {
  if (path === '/') return 'Home';
  if (path === 'Entry' || path === 'Exit') return path;
  if (path === '/quote-results') return 'Quote Results';
  if (path === '/quote/:id') return 'Quote';
  if (path === '/booking') return 'Booking';
  const city = cities.find((item) => `/${item.slug}` === path);
  if (city) return city.name;
  return (path.split('/').filter(Boolean).pop() || path).replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};
const family = (path: string) => {
  const value = canonical(path);
  if (cityPaths.has(value)) return 'City Page';
  if (value.includes('window-cleaning') || value.includes('storefront')) return 'Window Cleaning';
  if (value.includes('fleet-washing')) return 'Fleet Washing';
  if (value.includes('pressure-washing')) return 'Pressure Washing';
  if (value.includes('gutter-cleaning')) return 'Gutter Cleaning';
  if (value.includes('roof-cleaning')) return 'Roof Cleaning';
  if (value.includes('house-washing')) return 'House Washing';
  if (value.includes('fence-washing')) return 'Fence Washing';
  return null;
};
const isClick = (event: EventRow) => event.event_type === 'click' && event.event_label !== 'scroll_depth';
const quoteClick = (event: EventRow) => isClick(event) && QUOTE_WORDS.test(
  [event.element_text, event.event_label, event.event_name, event.element_id, event.destination_url].filter(Boolean).join(' ')
);
const quoteStart = (event: EventRow) =>
  !!event.event_name?.includes('quote_started') ||
  (event.event_name === 'page_view' && canonical(event.page_path) === '/quote-results');
const interaction = (event: EventRow) => event.event_type !== 'page_view' && event.event_name !== 'page_view';
const sourceOf = (session: SessionRow | undefined, view: ViewRow) => {
  const source = session?.utm_source || view.utm_source;
  if (source) return source;
  const referrer = session?.referrer || view.referrer;
  if (!referrer) return 'Direct';
  try { return new URL(referrer).hostname.replace(/^www\./, ''); } catch { return referrer; }
};
const median = (values: number[]) => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b), middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};
async function allRows<T>(query: (from: number, to: number) => any): Promise<T[]> {
  const result: T[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await query(from, from + PAGE_SIZE - 1);
    if (error) throw error;
    const rows = (data || []) as T[];
    result.push(...rows);
    if (rows.length < PAGE_SIZE) return result;
  }
}
const patterns = (journeys: Journey[], size: 2 | 3 | 'full'): Pattern[] => {
  const map = new Map<string, { pattern: string[]; sessions: Set<string>; quotes: Set<string>; bookings: Set<string> }>();
  journeys.forEach((journey) => {
    const parts = size === 'full'
      ? (journey.pages.length ? [journey.pages] : [])
      : Array.from({ length: Math.max(0, journey.pages.length - size + 1) }, (_, i) => journey.pages.slice(i, i + size));
    const seen = new Set<string>();
    parts.forEach((part) => {
      const key = part.join(' → ');
      if (seen.has(key)) return;
      seen.add(key);
      const row = map.get(key) || { pattern: part, sessions: new Set(), quotes: new Set(), bookings: new Set() };
      row.sessions.add(journey.sessionId);
      if (journey.quoteStarted) row.quotes.add(journey.sessionId);
      if (journey.booked) row.bookings.add(journey.sessionId);
      map.set(key, row);
    });
  });
  return Array.from(map.values()).map((row) => ({
    pattern: row.pattern, sessions: row.sessions.size, quoteStarts: row.quotes.size, bookings: row.bookings.size,
  })).sort((a, b) => b.sessions - a.sessions || b.bookings - a.bookings).slice(0, 8);
};
const breakdown = (journeys: Journey[], pick: (journey: Journey) => string): Breakdown[] => {
  const groups = new Map<string, Journey[]>();
  journeys.forEach((journey) => {
    const key = pick(journey) || 'Unknown';
    groups.set(key, [...(groups.get(key) || []), journey]);
  });
  return Array.from(groups.entries()).map(([label, rows]) => ({
    label, sessions: rows.length,
    avgPages: rows.reduce((sum, row) => sum + row.pages.length, 0) / Math.max(1, rows.length),
    quoteRate: rows.filter((row) => row.quoteStarted).length / Math.max(1, rows.length) * 100,
    bookingRate: rows.filter((row) => row.booked).length / Math.max(1, rows.length) * 100,
  })).sort((a, b) => b.sessions - a.sessions).slice(0, 8);
};

function PatternCard({ title, rows }: { title: string; rows: Pattern[] }) {
  return <div className="overflow-hidden rounded-xl border bg-background">
    <div className="border-b p-4"><h3 className="font-semibold">{title}</h3></div>
    <div className="divide-y">
      {rows.map((row, index) => <div key={`${title}-${row.pattern.join('|')}`} className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] text-muted-foreground">#{index + 1}</div>
            <div className="mt-1 flex flex-wrap items-center gap-1 text-sm font-medium">
              {row.pattern.map((path, i) => <span key={`${path}-${i}`} className="flex items-center gap-1">
                {i > 0 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                <span title={path}>{labelPath(path)}</span>
              </span>)}
            </div>
          </div>
          <Badge variant="secondary">{row.sessions}</Badge>
        </div>
        <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
          <span>{row.quoteStarts} quote</span><span>{row.bookings} booked</span>
        </div>
      </div>)}
      {!rows.length && <p className="p-5 text-center text-sm text-muted-foreground">Not enough multi-page traffic yet.</p>}
    </div>
  </div>;
}
function BreakdownCard({ title, rows }: { title: string; rows: Breakdown[] }) {
  return <Card>
    <CardHeader className="pb-3"><CardTitle className="text-base">{title}</CardTitle></CardHeader>
    <CardContent className="overflow-x-auto">
      <table className="w-full min-w-[430px] text-sm">
        <thead><tr className="border-b text-xs text-muted-foreground">
          <th className="pb-2 text-left font-medium">Group</th><th className="pb-2 text-right font-medium">Sessions</th>
          <th className="pb-2 text-right font-medium">Avg pages</th><th className="pb-2 text-right font-medium">Quote</th>
          <th className="pb-2 text-right font-medium">Booked</th>
        </tr></thead>
        <tbody>{rows.map((row) => <tr key={`${title}-${row.label}`} className="border-b last:border-0">
          <td className="max-w-[170px] truncate py-2 font-medium" title={row.label}>{row.label}</td>
          <td className="py-2 text-right">{row.sessions}</td><td className="py-2 text-right">{row.avgPages.toFixed(1)}</td>
          <td className="py-2 text-right">{row.quoteRate.toFixed(1)}%</td><td className="py-2 text-right">{row.bookingRate.toFixed(1)}%</td>
        </tr>)}</tbody>
      </table>
    </CardContent>
  </Card>;
}

export default function UserPathAnalytics() {
  const [range, setRange] = useState<Range>('7d');
  const [focus, setFocus] = useState('/services/gutter-cleaning');
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState<ViewRow[]>([]);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [bookings, setBookings] = useState<BookingRow[]>([]);

  const { start, now } = useMemo(() => {
    const end = new Date(), days = ranges[range].days;
    return { now: end, start: new Date(end.getTime() - days * 86400000) };
  }, [range]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const cutoff = start.toISOString();
        const [viewRows, eventRows, sessionRows, bookingRows] = await Promise.all([
          allRows<ViewRow>((from, to) => supabase.from('page_views')
            .select('id,page_path,session_id,visitor_id,created_at,timestamp,detected_city,utm_source,referrer,device_category,is_bot,is_internal,tracking_mode')
            .gte('created_at', cutoff).order('created_at', { ascending: true }).range(from, to)),
          allRows<EventRow>((from, to) => supabase.from('analytics_events')
            .select('id,occurred_at,session_id,quote_id,event_type,event_name,event_label,page_path,element_id,element_text,destination_url,source,utm_source,device_category,city,is_internal,is_bot,is_test')
            .gte('occurred_at', cutoff).order('occurred_at', { ascending: true }).range(from, to)),
          allRows<SessionRow>((from, to) => supabase.from('analytics_sessions')
            .select('session_id,first_visit,last_activity,referrer,utm_source,detected_city,device_category,is_bot,is_internal')
            .gte('first_visit', cutoff).order('first_visit', { ascending: true }).range(from, to)),
          allRows<BookingRow>((from, to) => supabase.from('bookings')
            .select('id,quote_id,created_at,is_test').gte('created_at', cutoff)
            .order('created_at', { ascending: true }).range(from, to)),
        ]);
        if (!cancelled) { setViews(viewRows); setEvents(eventRows); setSessions(sessionRows); setBookings(bookingRows); }
      } catch (error) { console.error('User path analytics failed to load', error); }
      finally { if (!cancelled) setLoading(false); }
    };
    load();
    return () => { cancelled = true; };
  }, [start]);

  const publicViews = useMemo(() => views.filter((row) => isPublic(row) && viewTime(row) && new Date(viewTime(row)) <= now), [views, now]);
  const publicEvents = useMemo(() => events.filter(isPublic), [events]);
  const journeys = useMemo<Journey[]>(() => {
    const bySession = new Map<string, ViewRow[]>(), eventsBySession = new Map<string, EventRow[]>();
    const sessionMap = new Map(sessions.filter(isPublic).map((row) => [row.session_id, row]));
    const bookingMap = new Map<string, BookingRow[]>();
    bookings.filter((row) => !row.is_test && row.quote_id).forEach((row) =>
      bookingMap.set(row.quote_id || '', [...(bookingMap.get(row.quote_id || '') || []), row]));

    publicViews.forEach((row) => {
      if (row.session_id) bySession.set(row.session_id, [...(bySession.get(row.session_id) || []), row]);
    });
    publicEvents.forEach((row) => {
      if (row.session_id) eventsBySession.set(row.session_id, [...(eventsBySession.get(row.session_id) || []), row]);
    });

    return Array.from(bySession.entries()).map(([sessionId, sessionViews]) => {
      const orderedViews = [...sessionViews].sort((a, b) => new Date(viewTime(a)).getTime() - new Date(viewTime(b)).getTime());
      const steps: Step[] = [];
      orderedViews.forEach((row) => {
        const step = { path: canonical(row.page_path), at: viewTime(row) };
        if (!steps.length || steps[steps.length - 1].path !== step.path) steps.push(step);
      });
      const sessionEvents = [...(eventsBySession.get(sessionId) || [])].sort((a, b) => new Date(a.occurred_at).getTime() - new Date(b.occurred_at).getTime());
      const quoteEvents = sessionEvents.filter(quoteStart);
      const quoteIds = new Set<string>();
      [...sessionEvents.map((row) => row.quote_id), ...sessionEvents.map((row) => quoteIdFromPath(row.page_path)),
        ...sessionEvents.map((row) => quoteIdFromPath(row.destination_url)), ...orderedViews.map((row) => quoteIdFromPath(row.page_path))]
        .filter(Boolean).forEach((id) => quoteIds.add(id as string));
      const matchingBookings = Array.from(quoteIds).flatMap((id) => bookingMap.get(id) || []);
      const first = orderedViews[0], firstAt = viewTime(first), lastView = viewTime(orderedViews[orderedViews.length - 1]);
      const lastEvent = sessionEvents[sessionEvents.length - 1]?.occurred_at || lastView;
      const lastAt = new Date(lastEvent).getTime() > new Date(lastView).getTime() ? lastEvent : lastView;
      const seconds = Math.max(0, (new Date(lastAt).getTime() - new Date(firstAt).getTime()) / 1000);
      const serviceFamilies = new Set(steps.map((step) => family(step.path)).filter((value) => value && value !== 'City Page'));
      const interactions = sessionEvents.filter(interaction).length;
      const quoteStarted = quoteEvents.length > 0 || steps.some((step) => step.path === '/quote-results');
      const booked = matchingBookings.length > 0;
      const session = sessionMap.get(sessionId);
      return {
        sessionId, pages: steps.map((step) => step.path), steps, firstAt, lastAt,
        source: sourceOf(session, first), device: session?.device_category || first.device_category || 'Unknown device',
        city: session?.detected_city || first.detected_city || 'Unknown location', interactions,
        quoteClicks: sessionEvents.filter(quoteClick).length, quoteStarted,
        quoteStartedAt: quoteEvents[0]?.occurred_at || null, booked,
        bookedAt: matchingBookings.map((row) => row.created_at).sort()[0] || null,
        suspicious: serviceFamilies.size >= 5 && seconds <= 45 && interactions <= 2 && !quoteStarted && !booked,
      };
    }).sort((a, b) => new Date(b.lastAt).getTime() - new Date(a.lastAt).getTime());
  }, [bookings, publicEvents, publicViews, sessions]);

  const clean = useMemo(() => journeys.filter((row) => !row.suspicious), [journeys]);
  const excluded = journeys.length - clean.length;
  const depths = clean.map((row) => row.pages.length);
  const avgPages = depths.length ? depths.reduce((a, b) => a + b, 0) / depths.length : 0;
  const medianPages = median(depths);
  const multiRate = clean.length ? clean.filter((row) => row.pages.length > 1).length / clean.length * 100 : 0;
  const quoteRate = clean.length ? clean.filter((row) => row.quoteStarted).length / clean.length * 100 : 0;
  const bookingRate = clean.length ? clean.filter((row) => row.booked).length / clean.length * 100 : 0;
  const clickEvents = publicEvents.filter(isClick);
  const destinationCoverage = clickEvents.length ? clickEvents.filter((row) => row.destination_url).length / clickEvents.length * 100 : 0;

  const two = useMemo(() => patterns(clean, 2), [clean]);
  const three = useMemo(() => patterns(clean, 3), [clean]);
  const full = useMemo(() => patterns(clean, 'full'), [clean]);

  const focusOptions = useMemo(() => {
    const observed = new Set(clean.flatMap((row) => row.pages));
    observed.add('/services/gutter-cleaning');
    return Array.from(observed).filter((path) => path !== '/quote/:id').sort((a, b) => labelPath(a).localeCompare(labelPath(b)));
  }, [clean]);

  const focusData = useMemo(() => {
    const reached = clean.filter((row) => row.pages.includes(focus));
    const next = new Map<string, { sessions: number; quotes: number; booked: number }>();
    const previous = new Map<string, { sessions: number; quotes: number; booked: number }>();
    reached.forEach((row) => {
      const i = row.pages.indexOf(focus), before = i > 0 ? row.pages[i - 1] : 'Entry',
        after = i < row.pages.length - 1 ? row.pages[i + 1] : 'Exit';
      [[previous, before], [next, after]].forEach(([map, key]) => {
        const target = map as Map<string, { sessions: number; quotes: number; booked: number }>;
        const current = target.get(key as string) || { sessions: 0, quotes: 0, booked: 0 };
        current.sessions += 1; if (row.quoteStarted) current.quotes += 1; if (row.booked) current.booked += 1;
        target.set(key as string, current);
      });
    });
    const rows = (map: Map<string, { sessions: number; quotes: number; booked: number }>) =>
      Array.from(map.entries()).map(([path, row]) => ({ path, ...row, share: reached.length ? row.sessions / reached.length * 100 : 0 }))
        .sort((a, b) => b.sessions - a.sessions);
    const quoteClickSessions = new Set(publicEvents.filter((event) => event.session_id && canonical(event.page_path) === focus && quoteClick(event)).map((event) => event.session_id));
    return {
      reached: reached.length, previous: rows(previous), next: rows(next), quoteClickSessions: quoteClickSessions.size,
      exitRate: reached.length ? (next.get('Exit')?.sessions || 0) / reached.length * 100 : 0,
      quoteRate: reached.length ? reached.filter((row) => row.quoteStarted).length / reached.length * 100 : 0,
      bookingRate: reached.length ? reached.filter((row) => row.booked).length / reached.length * 100 : 0,
    };
  }, [clean, focus, publicEvents]);

  const transitions = useMemo(() => {
    const map = new Map<string, { from: string; to: string; sessions: Set<string>; quotes: Set<string>; bookings: Set<string> }>();
    const origins = new Map<string, Set<string>>();
    clean.forEach((journey) => {
      const seen = new Set<string>();
      journey.pages.slice(0, -1).forEach((from, i) => {
        const to = journey.pages[i + 1], key = `${from}→${to}`;
        if (seen.has(key)) return; seen.add(key);
        const row = map.get(key) || { from, to, sessions: new Set(), quotes: new Set(), bookings: new Set() };
        row.sessions.add(journey.sessionId); if (journey.quoteStarted) row.quotes.add(journey.sessionId);
        if (journey.booked) row.bookings.add(journey.sessionId); map.set(key, row);
        const origin = origins.get(from) || new Set<string>(); origin.add(journey.sessionId); origins.set(from, origin);
      });
    });
    return Array.from(map.values()).map((row) => ({
      from: row.from, to: row.to, sessions: row.sessions.size,
      share: row.sessions.size / Math.max(1, origins.get(row.from)?.size || 0) * 100,
      quotes: row.quotes.size, bookings: row.bookings.size,
    })).sort((a, b) => b.sessions - a.sessions).slice(0, 15);
  }, [clean]);

  const exitRows = useMemo(() => {
    const map = new Map<string, { sessions: Set<string>; exits: Set<string>; quotes: Set<string>; bookings: Set<string> }>();
    clean.forEach((journey) => new Set(journey.pages).forEach((path) => {
      const row = map.get(path) || { sessions: new Set(), exits: new Set(), quotes: new Set(), bookings: new Set() };
      row.sessions.add(journey.sessionId); if (journey.pages.at(-1) === path) row.exits.add(journey.sessionId);
      const first = journey.steps.find((step) => step.path === path);
      if (journey.quoteStarted && (!journey.quoteStartedAt || !first || new Date(journey.quoteStartedAt) >= new Date(first.at))) row.quotes.add(journey.sessionId);
      if (journey.booked && (!journey.bookedAt || !first || new Date(journey.bookedAt) >= new Date(first.at))) row.bookings.add(journey.sessionId);
      map.set(path, row);
    }));
    return Array.from(map.entries()).map(([path, row]) => ({
      path, sessions: row.sessions.size, exits: row.exits.size,
      exitRate: row.exits.size / Math.max(1, row.sessions.size) * 100, quotes: row.quotes.size, bookings: row.bookings.size,
    })).sort((a, b) => b.sessions - a.sessions).slice(0, 20);
  }, [clean]);

  const depthRows = [
    ['1 page', 1, 1], ['2 pages', 2, 2], ['3 pages', 3, 3], ['4 pages', 4, 4], ['5+ pages', 5, Infinity],
  ].map(([label, min, max]) => {
    const count = clean.filter((row) => row.pages.length >= (min as number) && row.pages.length <= (max as number)).length;
    return { label: label as string, count, share: clean.length ? count / clean.length * 100 : 0 };
  });

  const sourceRows = useMemo(() => breakdown(clean, (row) => row.source), [clean]);
  const deviceRows = useMemo(() => breakdown(clean, (row) => row.device), [clean]);
  const cityRows = useMemo(() => breakdown(clean, (row) => row.city), [clean]);
  const serviceRows = useMemo(() => breakdown(clean, (row) => row.pages.map((path) => family(path)).find((value) => value && value !== 'City Page') || 'General / no service page'), [clean]);

  if (loading) return <Card className="mx-auto mt-6 max-w-[1500px]"><CardContent className="flex items-center gap-3 p-6 text-sm text-muted-foreground">
    <Activity className="h-4 w-4 animate-pulse" /> Building user paths…
  </CardContent></Card>;

  return <section className="bg-muted/20 px-4 pb-8 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-[1500px] space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div><CardTitle className="flex items-center gap-2"><Route className="h-5 w-5" /> User Paths & Patterns</CardTitle>
              <CardDescription>Common journeys, next-page behavior, exits, quote intent and linked booking conversion.</CardDescription></div>
            <div className="flex gap-2">{(Object.keys(ranges) as Range[]).map((key) =>
              <Button key={key} size="sm" variant={range === key ? 'default' : 'outline'} onClick={() => setRange(key)}>{ranges[key].label}</Button>)}</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {[
              ['Avg pages', avgPages.toFixed(2), 'per session'], ['Median pages', medianPages.toFixed(0), 'typical session'],
              ['Multi-page', `${multiRate.toFixed(1)}%`, '2+ pages'], ['Quote start', `${quoteRate.toFixed(1)}%`, 'path sessions'],
              ['Booked', `${bookingRate.toFixed(1)}%`, 'linked sessions'], ['Click destinations', `${destinationCoverage.toFixed(1)}%`, 'clicks with URL'],
            ].map(([name, value, note]) => <div key={name} className="rounded-xl border bg-background p-4">
              <div className="text-xs text-muted-foreground">{name}</div><div className="mt-1 text-2xl font-bold">{value}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">{note}</div>
            </div>)}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline">{clean.length} analyzed sessions</Badge>
            <Badge variant="secondary">{excluded} rapid service sweeps excluded</Badge>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" />Raw rows stay untouched; only aggregate averages are filtered.</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
        <Card><CardHeader><CardTitle className="text-base">Session depth</CardTitle><CardDescription>Distinct page steps per session</CardDescription></CardHeader>
          <CardContent className="space-y-3">{depthRows.map((row) => <div key={row.label}>
            <div className="flex justify-between text-sm"><span>{row.label}</span><span className="font-medium">{row.count} · {row.share.toFixed(1)}%</span></div>
            <div className="mt-1 h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(row.count ? 2 : 0, row.share)}%` }} /></div>
          </div>)}</CardContent></Card>
        <div className="grid gap-4 md:grid-cols-3"><PatternCard title="Top 2-step paths" rows={two} /><PatternCard title="Top 3-step paths" rows={three} /><PatternCard title="Top full paths" rows={full} /></div>
      </div>

      <Card>
        <CardHeader><div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div><CardTitle>Previous + next page</CardTitle><CardDescription>Example: Gutter Cleaning → Quote, Home, another service, or Exit.</CardDescription></div>
          <label className="text-xs font-medium text-muted-foreground"><span className="flex items-center gap-1"><Filter className="h-3.5 w-3.5" />Focus page</span>
            <select value={focus} onChange={(e) => setFocus(e.target.value)} className="mt-1 min-w-[270px] rounded-md border bg-background px-3 py-2 text-sm text-foreground">
              {focusOptions.map((path) => <option key={path} value={path}>{labelPath(path)} — {path}</option>)}
            </select>
          </label>
        </div></CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ['Reached', focusData.reached], ['Quote CTA users', focusData.quoteClickSessions],
              ['Exit rate', `${focusData.exitRate.toFixed(1)}%`], ['Quote-start rate', `${focusData.quoteRate.toFixed(1)}%`],
              ['Booking rate', `${focusData.bookingRate.toFixed(1)}%`],
            ].map(([name, value]) => <div key={name} className="rounded-xl border bg-background p-4"><div className="text-xs text-muted-foreground">{name}</div><div className="mt-1 text-xl font-bold">{value}</div></div>)}
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            {[["How users arrived", focusData.previous], ["Where users went next", focusData.next]].map(([title, data]) =>
              <div key={title as string} className="overflow-x-auto rounded-xl border bg-background p-4"><h3 className="mb-3 font-semibold">{title as string}</h3>
                <table className="w-full min-w-[520px] text-sm"><thead><tr className="border-b text-xs text-muted-foreground">
                  <th className="pb-2 text-left font-medium">Page</th><th className="pb-2 text-right font-medium">Sessions</th>
                  <th className="pb-2 text-right font-medium">Share</th><th className="pb-2 text-right font-medium">Quote</th><th className="pb-2 text-right font-medium">Booked</th>
                </tr></thead><tbody>{(data as typeof focusData.next).map((row) => <tr key={`${title}-${row.path}`} className="border-b last:border-0">
                  <td className="py-2 font-medium">{labelPath(row.path)}{!['Entry', 'Exit'].includes(row.path) && <span className="ml-2 text-xs font-normal text-muted-foreground">{row.path}</span>}</td>
                  <td className="py-2 text-right">{row.sessions}</td><td className="py-2 text-right">{row.share.toFixed(1)}%</td>
                  <td className="py-2 text-right">{row.quotes}</td><td className="py-2 text-right">{row.booked}</td>
                </tr>)}</tbody></table>
                {!(data as typeof focusData.next).length && <p className="py-6 text-center text-sm text-muted-foreground">No sessions reached this page.</p>}
              </div>)}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card><CardHeader><CardTitle>Top page-to-page transitions</CardTitle><CardDescription>Unique-session moves and downstream conversion</CardDescription></CardHeader>
          <CardContent className="overflow-x-auto"><table className="w-full min-w-[620px] text-sm"><thead><tr className="border-b text-xs text-muted-foreground">
            <th className="pb-2 text-left font-medium">Transition</th><th className="pb-2 text-right font-medium">Sessions</th><th className="pb-2 text-right font-medium">Origin share</th><th className="pb-2 text-right font-medium">Quote</th><th className="pb-2 text-right font-medium">Booked</th>
          </tr></thead><tbody>{transitions.map((row) => <tr key={`${row.from}-${row.to}`} className="border-b last:border-0">
            <td className="py-2 font-medium">{labelPath(row.from)} <span className="text-muted-foreground">→</span> {labelPath(row.to)}</td>
            <td className="py-2 text-right">{row.sessions}</td><td className="py-2 text-right">{row.share.toFixed(1)}%</td><td className="py-2 text-right">{row.quotes}</td><td className="py-2 text-right">{row.bookings}</td>
          </tr>)}</tbody></table></CardContent></Card>
        <Card><CardHeader><CardTitle>Exit & downstream conversion</CardTitle><CardDescription>Where users stop, then whether they quote or book</CardDescription></CardHeader>
          <CardContent className="overflow-x-auto"><table className="w-full min-w-[620px] text-sm"><thead><tr className="border-b text-xs text-muted-foreground">
            <th className="pb-2 text-left font-medium">Page</th><th className="pb-2 text-right font-medium">Reached</th><th className="pb-2 text-right font-medium">Exits</th><th className="pb-2 text-right font-medium">Exit rate</th><th className="pb-2 text-right font-medium">Quote</th><th className="pb-2 text-right font-medium">Booked</th>
          </tr></thead><tbody>{exitRows.map((row) => <tr key={row.path} className="border-b last:border-0">
            <td className="max-w-[210px] truncate py-2 font-medium" title={row.path}>{labelPath(row.path)}</td><td className="py-2 text-right">{row.sessions}</td>
            <td className="py-2 text-right">{row.exits}</td><td className="py-2 text-right">{row.exitRate.toFixed(1)}%</td><td className="py-2 text-right">{row.quotes}</td><td className="py-2 text-right">{row.bookings}</td>
          </tr>)}</tbody></table></CardContent></Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2"><BreakdownCard title="By traffic source" rows={sourceRows} /><BreakdownCard title="By device" rows={deviceRows} /><BreakdownCard title="By service" rows={serviceRows} /><BreakdownCard title="By city" rows={cityRows} /></div>

      <Card><CardHeader><CardTitle>Recent full journeys</CardTitle><CardDescription>Page-view paths, quote intent and linked bookings for the latest sessions.</CardDescription></CardHeader>
        <CardContent className="space-y-3">{journeys.slice(0, 10).map((row) => {
          const seconds = Math.max(0, Math.round((new Date(row.lastAt).getTime() - new Date(row.firstAt).getTime()) / 1000));
          return <div key={row.sessionId} className="rounded-xl border bg-background p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-sm"><span className="font-semibold">Session {row.sessionId.slice(0, 8)}</span>
                <Badge variant="outline">{row.device}</Badge><Badge variant="outline">{row.source}</Badge>
                {row.city !== 'Unknown location' && <Badge variant="secondary">{row.city}</Badge>}
                {row.quoteStarted && <Badge>Quote started</Badge>}{row.booked && <Badge>Booked</Badge>}
                {row.suspicious && <Badge variant="secondary">Excluded from averages</Badge>}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">{row.pages.slice(0, 10).map((path, i) =>
                <span key={`${path}-${i}`} className="flex items-center gap-1">{i > 0 && <ArrowRight className="h-3 w-3" />}<span title={path}>{labelPath(path)}</span></span>)}
                {row.pages.length > 10 && <span>+{row.pages.length - 10} more</span>}</div>
            </div><div className="flex shrink-0 flex-wrap gap-4 text-xs text-muted-foreground">
              <span><strong className="text-foreground">{row.pages.length}</strong> pages</span><span><strong className="text-foreground">{row.interactions}</strong> interactions</span>
              <span><strong className="text-foreground">{row.quoteClicks}</strong> quote clicks</span><span><strong className="text-foreground">{seconds}s</strong> span</span>
            </div></div>
          </div>;
        })}{!journeys.length && <p className="py-8 text-center text-sm text-muted-foreground">No public path data in this period.</p>}</CardContent>
      </Card>
    </div>
  </section>;
}
