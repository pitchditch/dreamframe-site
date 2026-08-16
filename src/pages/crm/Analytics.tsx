import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowLeft,
  BarChart3,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  MapPin,
  MousePointerClick,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const PAGE_SIZE = 1000;
const TELEMETRY_LABELS = new Set(['scroll_depth', 'property_type_detected']);

type TimeRange = '24h' | '7d' | '30d';

type PageViewRow = {
  id: string;
  page_path: string | null;
  page_title: string | null;
  referrer: string | null;
  session_id: string | null;
  visitor_id: string | null;
  created_at: string | null;
  timestamp: string | null;
  detected_city: string | null;
  utm_source: string | null;
  device_category: string | null;
  is_bot: boolean | null;
  is_internal: boolean | null;
  tracking_mode: string | null;
};

type AnalyticsEventRow = {
  id: string;
  occurred_at: string;
  visitor_id: string | null;
  session_id: string | null;
  lead_id: string | null;
  quote_id: string | null;
  event_type: string | null;
  event_name: string | null;
  event_label: string | null;
  page_path: string | null;
  element_id: string | null;
  element_text: string | null;
  element_type: string | null;
  destination_url: string | null;
  referrer: string | null;
  source: string | null;
  utm_source: string | null;
  device_category: string | null;
  browser: string | null;
  city: string | null;
  tracking_mode: string | null;
  is_internal: boolean | null;
  is_bot: boolean | null;
  is_test: boolean | null;
};

type AnalyticsSessionRow = {
  session_id: string;
  visitor_id: string | null;
  first_visit: string;
  last_activity: string;
  page_count: number | null;
  referrer: string | null;
  utm_source: string | null;
  landing_page: string | null;
  detected_city: string | null;
  device_category: string | null;
  is_bot: boolean | null;
  is_internal: boolean | null;
  tracking_mode: string | null;
};

type BusinessRow = {
  id: string;
  created_at: string;
  is_test: boolean | null;
  status?: string | null;
};

type Metric = {
  label: string;
  value: string;
  current: number;
  previous: number;
  note: string;
  icon: typeof Eye;
};

type Journey = {
  sessionId: string;
  visitorId: string | null;
  firstAt: string;
  lastAt: string;
  device: string;
  city: string;
  pages: string[];
  interactions: number;
  eventCount: number;
};

const rangeConfig: Record<TimeRange, { days: number; label: string; previousLabel: string }> = {
  '24h': { days: 1, label: 'Last 24 Hours', previousLabel: 'previous 24 hours' },
  '7d': { days: 7, label: 'Last 7 Days', previousLabel: 'previous 7 days' },
  '30d': { days: 30, label: 'Last 30 Days', previousLabel: 'previous 30 days' },
};

const getPageViewTime = (row: PageViewRow) => row.timestamp || row.created_at || '';
const isPublic = (row: { is_internal?: boolean | null; is_bot?: boolean | null; is_test?: boolean | null }) =>
  !row.is_internal && !row.is_bot && !row.is_test;

const inWindow = (value: string | null | undefined, start: Date, end: Date) => {
  if (!value) return false;
  const time = new Date(value).getTime();
  return time >= start.getTime() && time < end.getTime();
};

const shortId = (value: string | null | undefined) => (value ? value.slice(0, 8) : 'unknown');

const shorten = (value: string, max = 64) => {
  const normalized = value.replace(/\s+/g, ' ').trim();
  return normalized.length > max ? `${normalized.slice(0, max - 1)}…` : normalized;
};

const humanize = (value: string) =>
  value
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const eventLabel = (event: AnalyticsEventRow) => {
  if (event.event_type === 'page_view' || event.event_name === 'page_view') {
    return `Viewed ${event.page_path || 'a page'}`;
  }

  if (event.event_name?.includes('quote_started')) return 'Started a quote';
  if (event.event_name === 'address_entered') return 'Entered an address';
  if (event.event_name === 'quote_click') return 'Clicked quote CTA';

  const text = event.element_text?.trim();
  if (text) return `${shorten(text)} clicked`;

  const label = event.event_label?.trim();
  if (label && !TELEMETRY_LABELS.has(label)) return humanize(shorten(label));

  if (event.event_name) return humanize(event.event_name);
  return humanize(event.event_type || 'interaction');
};

const ctaLabel = (event: AnalyticsEventRow) => {
  const candidate = event.element_text || event.event_label || event.element_id || event.event_name || 'Button click';
  return shorten(candidate, 58);
};

const isMeaningfulInteraction = (event: AnalyticsEventRow) => {
  if (event.event_type === 'page_view' || event.event_name === 'page_view') return false;
  const marker = event.event_label || event.element_id || '';
  return !TELEMETRY_LABELS.has(marker);
};

const sourceLabel = (session: AnalyticsSessionRow) => {
  if (session.utm_source) return session.utm_source;
  if (!session.referrer) return 'Direct';
  try {
    return new URL(session.referrer).hostname.replace(/^www\./, '');
  } catch {
    return session.referrer;
  }
};

async function fetchAllRows<T>(makeQuery: (from: number, to: number) => any): Promise<T[]> {
  const rows: T[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await makeQuery(from, from + PAGE_SIZE - 1);
    if (error) throw error;

    const page = (data || []) as T[];
    rows.push(...page);
    if (page.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return rows;
}

export default function Analytics() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [loading, setLoading] = useState(true);
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);
  const [pageViews, setPageViews] = useState<PageViewRow[]>([]);
  const [events, setEvents] = useState<AnalyticsEventRow[]>([]);
  const [sessions, setSessions] = useState<AnalyticsSessionRow[]>([]);
  const [leads, setLeads] = useState<BusinessRow[]>([]);
  const [quotes, setQuotes] = useState<BusinessRow[]>([]);
  const [bookings, setBookings] = useState<BusinessRow[]>([]);
  const [databaseConnected, setDatabaseConnected] = useState(false);

  const { start, previousStart, now } = useMemo(() => {
    const end = new Date();
    const days = rangeConfig[timeRange].days;
    const currentStart = new Date(end.getTime() - days * 24 * 60 * 60 * 1000);
    const priorStart = new Date(currentStart.getTime() - days * 24 * 60 * 60 * 1000);
    return { start: currentStart, previousStart: priorStart, now: end };
  }, [timeRange]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          navigate('/crm', { replace: true });
          return;
        }

        const startIso = previousStart.toISOString();

        const [pageViewRows, eventRows, sessionRows, leadRows, quoteRows, bookingRows] = await Promise.all([
          fetchAllRows<PageViewRow>((from, to) =>
            supabase
              .from('page_views')
              .select('id,page_path,page_title,referrer,session_id,visitor_id,created_at,timestamp,detected_city,utm_source,device_category,is_bot,is_internal,tracking_mode')
              .gte('created_at', startIso)
              .order('created_at', { ascending: true })
              .range(from, to)
          ),
          fetchAllRows<AnalyticsEventRow>((from, to) =>
            supabase
              .from('analytics_events')
              .select('id,occurred_at,visitor_id,session_id,lead_id,quote_id,event_type,event_name,event_label,page_path,element_id,element_text,element_type,destination_url,referrer,source,utm_source,device_category,browser,city,tracking_mode,is_internal,is_bot,is_test')
              .gte('occurred_at', startIso)
              .order('occurred_at', { ascending: true })
              .range(from, to)
          ),
          fetchAllRows<AnalyticsSessionRow>((from, to) =>
            supabase
              .from('analytics_sessions')
              .select('session_id,visitor_id,first_visit,last_activity,page_count,referrer,utm_source,landing_page,detected_city,device_category,is_bot,is_internal,tracking_mode')
              .gte('first_visit', startIso)
              .order('first_visit', { ascending: true })
              .range(from, to)
          ),
          fetchAllRows<BusinessRow>((from, to) =>
            supabase
              .from('leads')
              .select('id,created_at,is_test,status')
              .gte('created_at', startIso)
              .order('created_at', { ascending: true })
              .range(from, to)
          ),
          fetchAllRows<BusinessRow>((from, to) =>
            supabase
              .from('quotes')
              .select('id,created_at,is_test,status')
              .gte('created_at', startIso)
              .order('created_at', { ascending: true })
              .range(from, to)
          ),
          fetchAllRows<BusinessRow>((from, to) =>
            supabase
              .from('bookings')
              .select('id,created_at,is_test,status')
              .gte('created_at', startIso)
              .order('created_at', { ascending: true })
              .range(from, to)
          ),
        ]);

        if (cancelled) return;
        setPageViews(pageViewRows);
        setEvents(eventRows);
        setSessions(sessionRows);
        setLeads(leadRows);
        setQuotes(quoteRows);
        setBookings(bookingRows);
        setDatabaseConnected(true);
      } catch (error) {
        console.error('Error loading website analytics:', error);
        if (!cancelled) {
          setDatabaseConnected(false);
          toast({
            title: 'Analytics could not load',
            description: 'The dashboard could not read the analytics tables. Your tracking data was not changed.',
            variant: 'destructive',
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [navigate, previousStart, toast]);

  const currentViews = useMemo(
    () => pageViews.filter((row) => inWindow(getPageViewTime(row), start, now)),
    [pageViews, start, now]
  );
  const previousViews = useMemo(
    () => pageViews.filter((row) => inWindow(getPageViewTime(row), previousStart, start)),
    [pageViews, previousStart, start]
  );
  const publicCurrentViews = useMemo(() => currentViews.filter(isPublic), [currentViews]);
  const publicPreviousViews = useMemo(() => previousViews.filter(isPublic), [previousViews]);
  const internalCurrentViews = useMemo(() => currentViews.filter((row) => !!row.is_internal), [currentViews]);

  const currentEvents = useMemo(
    () => events.filter((row) => inWindow(row.occurred_at, start, now) && isPublic(row)),
    [events, start, now]
  );
  const previousEvents = useMemo(
    () => events.filter((row) => inWindow(row.occurred_at, previousStart, start) && isPublic(row)),
    [events, previousStart, start]
  );
  const currentSessions = useMemo(
    () => sessions.filter((row) => inWindow(row.first_visit, start, now) && isPublic(row)),
    [sessions, start, now]
  );
  const previousSessions = useMemo(
    () => sessions.filter((row) => inWindow(row.first_visit, previousStart, start) && isPublic(row)),
    [sessions, previousStart, start]
  );
  const currentLeads = useMemo(
    () => leads.filter((row) => inWindow(row.created_at, start, now) && !row.is_test),
    [leads, start, now]
  );
  const previousLeads = useMemo(
    () => leads.filter((row) => inWindow(row.created_at, previousStart, start) && !row.is_test),
    [leads, previousStart, start]
  );
  const currentQuotes = useMemo(
    () => quotes.filter((row) => inWindow(row.created_at, start, now) && !row.is_test),
    [quotes, start, now]
  );
  const currentBookings = useMemo(
    () => bookings.filter((row) => inWindow(row.created_at, start, now) && !row.is_test),
    [bookings, start, now]
  );
  const previousBookings = useMemo(
    () => bookings.filter((row) => inWindow(row.created_at, previousStart, start) && !row.is_test),
    [bookings, previousStart, start]
  );

  const currentVisitors = useMemo(
    () => new Set(publicCurrentViews.map((row) => row.visitor_id || row.session_id).filter(Boolean)).size,
    [publicCurrentViews]
  );
  const previousVisitors = useMemo(
    () => new Set(publicPreviousViews.map((row) => row.visitor_id || row.session_id).filter(Boolean)).size,
    [publicPreviousViews]
  );

  const engagedCount = (rows: AnalyticsSessionRow[]) =>
    rows.filter((row) => {
      const durationSeconds = Math.max(0, (new Date(row.last_activity).getTime() - new Date(row.first_visit).getTime()) / 1000);
      return (row.page_count || 0) >= 2 || durationSeconds >= 30;
    }).length;

  const quoteStartCount = (rows: AnalyticsEventRow[]) =>
    new Set(
      rows
        .filter((event) => event.event_name?.includes('quote_started'))
        .map((event) => event.session_id || event.visitor_id || event.id)
    ).size;

  const currentEngaged = engagedCount(currentSessions);
  const previousEngaged = engagedCount(previousSessions);
  const currentQuoteStarts = quoteStartCount(currentEvents);
  const previousQuoteStarts = quoteStartCount(previousEvents);
  const currentConversion = currentVisitors > 0 ? (currentLeads.length / currentVisitors) * 100 : 0;
  const previousConversion = previousVisitors > 0 ? (previousLeads.length / previousVisitors) * 100 : 0;

  const metrics: Metric[] = [
    { label: 'Visitors', value: currentVisitors.toLocaleString(), current: currentVisitors, previous: previousVisitors, note: 'Unique public visitors', icon: Users },
    { label: 'Page Views', value: publicCurrentViews.length.toLocaleString(), current: publicCurrentViews.length, previous: publicPreviousViews.length, note: 'Owner/admin and bots excluded', icon: Eye },
    { label: 'Engaged Sessions', value: currentEngaged.toLocaleString(), current: currentEngaged, previous: previousEngaged, note: '2+ pages or 30+ seconds', icon: Activity },
    { label: 'Leads', value: currentLeads.length.toLocaleString(), current: currentLeads.length, previous: previousLeads.length, note: 'Non-test leads created', icon: Target },
    { label: 'Quote Starts', value: currentQuoteStarts.toLocaleString(), current: currentQuoteStarts, previous: previousQuoteStarts, note: 'Distinct sessions starting a quote', icon: MousePointerClick },
    { label: 'Bookings', value: currentBookings.length.toLocaleString(), current: currentBookings.length, previous: previousBookings.length, note: 'Non-test bookings created', icon: CalendarCheck },
    { label: 'Conversion Rate', value: `${currentConversion.toFixed(1)}%`, current: currentConversion, previous: previousConversion, note: 'Visitors → leads', icon: BarChart3 },
  ];

  const trendData = useMemo(() => {
    const buckets = timeRange === '24h' ? 24 : rangeConfig[timeRange].days;
    const totalMs = start.getTime() - previousStart.getTime();
    const bucketMs = totalMs / buckets;
    const data = Array.from({ length: buckets }, (_, index) => {
      const labelDate = new Date(start.getTime() + index * bucketMs);
      return {
        label: timeRange === '24h'
          ? labelDate.toLocaleTimeString([], { hour: 'numeric' })
          : labelDate.toLocaleDateString([], { month: 'short', day: 'numeric' }),
        current: 0,
        previous: 0,
      };
    });

    publicCurrentViews.forEach((row) => {
      const index = Math.floor((new Date(getPageViewTime(row)).getTime() - start.getTime()) / bucketMs);
      if (index >= 0 && index < data.length) data[index].current += 1;
    });
    publicPreviousViews.forEach((row) => {
      const index = Math.floor((new Date(getPageViewTime(row)).getTime() - previousStart.getTime()) / bucketMs);
      if (index >= 0 && index < data.length) data[index].previous += 1;
    });

    return data;
  }, [publicCurrentViews, publicPreviousViews, previousStart, start, timeRange]);

  const leadSessions = useMemo(
    () => new Set(currentEvents.filter((event) => event.lead_id).map((event) => event.session_id).filter(Boolean)),
    [currentEvents]
  );

  const topPages = useMemo(() => {
    const map = new Map<string, { views: number; visitors: Set<string>; clicks: number; leads: Set<string> }>();

    publicCurrentViews.forEach((view) => {
      const path = view.page_path || '(unknown)';
      const row = map.get(path) || { views: 0, visitors: new Set<string>(), clicks: 0, leads: new Set<string>() };
      row.views += 1;
      if (view.visitor_id || view.session_id) row.visitors.add(view.visitor_id || view.session_id || '');
      map.set(path, row);
    });

    currentEvents.forEach((event) => {
      if (!event.page_path) return;
      const row = map.get(event.page_path);
      if (!row) return;
      if (event.event_type === 'click' && isMeaningfulInteraction(event)) row.clicks += 1;
      if (event.lead_id) row.leads.add(event.lead_id);
    });

    return Array.from(map.entries())
      .map(([path, row]) => ({
        path,
        views: row.views,
        visitors: row.visitors.size,
        clicks: row.clicks,
        leads: row.leads.size,
        conversion: row.visitors.size ? (row.leads.size / row.visitors.size) * 100 : 0,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 8);
  }, [currentEvents, publicCurrentViews]);

  const topCtas = useMemo(() => {
    const map = new Map<string, { clicks: number; sessions: Set<string>; leadSessions: Set<string> }>();

    currentEvents
      .filter((event) => event.event_type === 'click' && isMeaningfulInteraction(event))
      .forEach((event) => {
        const label = ctaLabel(event);
        const row = map.get(label) || { clicks: 0, sessions: new Set<string>(), leadSessions: new Set<string>() };
        row.clicks += 1;
        if (event.session_id) {
          row.sessions.add(event.session_id);
          if (leadSessions.has(event.session_id)) row.leadSessions.add(event.session_id);
        }
        map.set(label, row);
      });

    return Array.from(map.entries())
      .map(([label, row]) => ({ label, clicks: row.clicks, people: row.sessions.size, leads: row.leadSessions.size }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 8);
  }, [currentEvents, leadSessions]);

  const journeys = useMemo<Journey[]>(() => {
    const grouped = new Map<string, AnalyticsEventRow[]>();

    currentEvents.forEach((event) => {
      if (!event.session_id) return;
      const list = grouped.get(event.session_id) || [];
      list.push(event);
      grouped.set(event.session_id, list);
    });

    return Array.from(grouped.entries())
      .map(([sessionId, sessionEvents]) => {
        const ordered = [...sessionEvents].sort((a, b) => new Date(a.occurred_at).getTime() - new Date(b.occurred_at).getTime());
        const pages: string[] = [];
        ordered.forEach((event) => {
          if (event.page_path && pages[pages.length - 1] !== event.page_path) pages.push(event.page_path);
        });
        const first = ordered[0];
        const last = ordered[ordered.length - 1];
        return {
          sessionId,
          visitorId: first.visitor_id,
          firstAt: first.occurred_at,
          lastAt: last.occurred_at,
          device: first.device_category || 'Unknown device',
          city: first.city || 'Unknown location',
          pages: pages.slice(0, 5),
          interactions: ordered.filter(isMeaningfulInteraction).length,
          eventCount: ordered.length,
        };
      })
      .sort((a, b) => new Date(b.lastAt).getTime() - new Date(a.lastAt).getTime())
      .slice(0, 8);
  }, [currentEvents]);

  const sources = useMemo(() => {
    const map = new Map<string, number>();
    currentSessions.forEach((session) => {
      const source = sourceLabel(session);
      map.set(source, (map.get(source) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [currentSessions]);

  const locations = useMemo(() => {
    const map = new Map<string, number>();
    currentSessions.forEach((session) => {
      const city = session.detected_city || 'Unknown';
      map.set(city, (map.get(city) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [currentSessions]);

  const latestPublicView = useMemo(
    () => [...pageViews].filter(isPublic).sort((a, b) => new Date(getPageViewTime(b)).getTime() - new Date(getPageViewTime(a)).getTime())[0],
    [pageViews]
  );
  const latestInternalView = useMemo(
    () => [...pageViews].filter((row) => !!row.is_internal).sort((a, b) => new Date(getPageViewTime(b)).getTime() - new Date(getPageViewTime(a)).getTime())[0],
    [pageViews]
  );
  const recentRecordedViews = useMemo(
    () => [...currentViews].sort((a, b) => new Date(getPageViewTime(b)).getTime() - new Date(getPageViewTime(a)).getTime()).slice(0, 8),
    [currentViews]
  );
  const recentInteractions = useMemo(
    () => [...currentEvents].filter(isMeaningfulInteraction).sort((a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime()).slice(0, 10),
    [currentEvents]
  );

  const funnel = [
    { label: 'Visitors', value: currentVisitors },
    { label: 'Quote starts', value: currentQuoteStarts },
    { label: 'Quotes created', value: currentQuotes.length },
    { label: 'Leads', value: currentLeads.length },
    { label: 'Bookings', value: currentBookings.length },
  ];
  const funnelMax = Math.max(1, ...funnel.map((item) => item.value));

  const change = (current: number, previous: number) => {
    if (previous === 0) return current === 0 ? 'No change' : 'New activity';
    const percent = ((current - previous) / previous) * 100;
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(0)}%`;
  };

  const exportCsv = () => {
    const headers = ['timestamp', 'record_type', 'page_path', 'event', 'session_id', 'visitor_id', 'device', 'city', 'source'];
    const rows = [
      ...publicCurrentViews.map((view) => [
        getPageViewTime(view),
        'page_view',
        view.page_path || '',
        'Page view',
        view.session_id || '',
        view.visitor_id || '',
        view.device_category || '',
        view.detected_city || '',
        view.utm_source || view.referrer || 'Direct',
      ]),
      ...currentEvents.filter(isMeaningfulInteraction).map((event) => [
        event.occurred_at,
        'interaction',
        event.page_path || '',
        eventLabel(event),
        event.session_id || '',
        event.visitor_id || '',
        event.device_category || '',
        event.city || '',
        event.utm_source || event.source || event.referrer || 'Direct',
      ]),
    ];

    const escape = (value: string) => `"${String(value).replace(/"/g, '""')}"`;
    const csv = [headers, ...rows].map((row) => row.map(escape).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `website-analytics-${timeRange}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-r-transparent" />
          Loading website analytics…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="mx-auto max-w-[1500px] space-y-6 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Button variant="ghost" size="sm" className="-ml-3" onClick={() => navigate('/crm')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                CRM
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2.5">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Analytics Dashboard</h1>
                <p className="text-sm text-muted-foreground">Website performance, visitor behavior and lead conversion</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(['24h', '7d', '30d'] as TimeRange[]).map((range) => (
              <Button
                key={range}
                size="sm"
                variant={timeRange === range ? 'default' : 'outline'}
                onClick={() => setTimeRange(range)}
              >
                {rangeConfig[range].label}
              </Button>
            ))}
            <Button size="sm" variant="outline" onClick={exportCsv} disabled={!databaseConnected}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Comparing with the {rangeConfig[timeRange].previousLabel}. Public analytics exclude owner/admin, bot and test traffic.
        </div>

        <Card className={databaseConnected ? 'border-emerald-200' : 'border-destructive/30'}>
          <CardContent className="p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 h-2.5 w-2.5 rounded-full ${databaseConnected ? 'bg-emerald-500' : 'bg-destructive'}`} />
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-semibold">Tracking {databaseConnected ? 'healthy' : 'needs attention'}</span>
                    {latestPublicView && <span className="text-sm text-muted-foreground">· Last public visit {new Date(getPageViewTime(latestPublicView)).toLocaleString()}</span>}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {publicCurrentViews.length} public page views · {internalCurrentViews.length} owner/admin views excluded
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setDiagnosticsOpen((open) => !open)}>
                {diagnosticsOpen ? 'Hide diagnostics' : 'View tracking details'}
                {diagnosticsOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </Button>
            </div>

            {diagnosticsOpen && (
              <div className="mt-4 grid gap-5 border-t pt-4 xl:grid-cols-2">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Recent recorded page views</h3>
                    <Badge variant="outline">Database connected</Badge>
                  </div>
                  <div className="space-y-2">
                    {recentRecordedViews.length === 0 ? (
                      <p className="py-4 text-sm text-muted-foreground">No page-view rows in this period.</p>
                    ) : recentRecordedViews.map((view) => (
                      <div key={view.id} className="rounded-lg border bg-background p-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="min-w-0 truncate text-sm font-medium">{view.page_path || '/'}</span>
                          <Badge variant={view.is_internal ? 'secondary' : 'outline'}>
                            {view.is_internal ? 'Owner/Admin · excluded' : 'Public / unrecognized'}
                          </Badge>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {view.device_category || 'Unknown device'} · Session {shortId(view.session_id)} · {new Date(getPageViewTime(view)).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                  {latestInternalView && (
                    <p className="mt-3 text-xs text-muted-foreground">Last owner/admin view: {new Date(getPageViewTime(latestInternalView)).toLocaleString()}</p>
                  )}
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold">Recent interaction events</h3>
                  <div className="space-y-2">
                    {recentInteractions.length === 0 ? (
                      <p className="py-4 text-sm text-muted-foreground">No interaction events in this period.</p>
                    ) : recentInteractions.map((event) => (
                      <div key={event.id} className="rounded-lg border bg-background p-3">
                        <div className="text-sm font-medium">{eventLabel(event)}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {event.page_path || 'Unknown page'} · Session {shortId(event.session_id)} · {event.device_category || 'Unknown device'} · {new Date(event.occurred_at).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-7">
          {metrics.map((metric) => {
            const delta = metric.current - metric.previous;
            const TrendIcon = delta >= 0 ? TrendingUp : TrendingDown;
            const Icon = metric.icon;
            return (
              <Card key={metric.label}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-medium text-muted-foreground">{metric.label}</span>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="mt-2 text-2xl font-bold">{metric.value}</div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendIcon className="h-3.5 w-3.5" />
                    <span>{change(metric.current, metric.previous)} vs prior</span>
                  </div>
                  <p className="mt-1 text-[11px] leading-4 text-muted-foreground">{metric.note}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Traffic trend</CardTitle>
            <CardDescription>Public page views compared with the previous period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} minTickGap={18} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="current" name="Current" stroke="currentColor" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="previous" name="Previous" stroke="currentColor" strokeOpacity={0.35} strokeDasharray="5 5" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top pages</CardTitle>
              <CardDescription>Which pages attract attention and produce actions</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-sm">
                <thead>
                  <tr className="border-b text-left text-xs text-muted-foreground">
                    <th className="pb-3 font-medium">Page</th>
                    <th className="pb-3 text-right font-medium">Views</th>
                    <th className="pb-3 text-right font-medium">Visitors</th>
                    <th className="pb-3 text-right font-medium">CTA clicks</th>
                    <th className="pb-3 text-right font-medium">Leads</th>
                    <th className="pb-3 text-right font-medium">Conv.</th>
                  </tr>
                </thead>
                <tbody>
                  {topPages.map((page) => (
                    <tr key={page.path} className="border-b last:border-0">
                      <td className="max-w-[260px] truncate py-3 font-medium">{page.path}</td>
                      <td className="py-3 text-right">{page.views}</td>
                      <td className="py-3 text-right">{page.visitors}</td>
                      <td className="py-3 text-right">{page.clicks}</td>
                      <td className="py-3 text-right">{page.leads}</td>
                      <td className="py-3 text-right">{page.conversion.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {topPages.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No public page views in this period.</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top buttons & CTAs</CardTitle>
              <CardDescription>Actual click targets, unique sessions and sessions that became leads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {topCtas.map((cta) => (
                  <div key={cta.label} className="grid grid-cols-[minmax(0,1fr)_60px_72px_62px] items-center gap-2 border-b py-3 text-sm last:border-0">
                    <span className="truncate font-medium" title={cta.label}>{cta.label}</span>
                    <span className="text-right">{cta.clicks}</span>
                    <span className="text-right text-muted-foreground">{cta.people} users</span>
                    <span className="text-right text-muted-foreground">{cta.leads} leads</span>
                  </div>
                ))}
                {topCtas.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No meaningful CTA clicks in this period.</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Conversion funnel</CardTitle>
            <CardDescription>From public traffic to booked work using real analytics and business records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 lg:grid-cols-5">
              {funnel.map((step, index) => {
                const previousStep = index > 0 ? funnel[index - 1].value : step.value;
                const stepRate = index === 0 ? 100 : previousStep > 0 ? (step.value / previousStep) * 100 : 0;
                return (
                  <div key={step.label} className="rounded-xl border bg-background p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">{step.label}</span>
                      {index > 0 && <span className="text-xs text-muted-foreground">{stepRate.toFixed(0)}%</span>}
                    </div>
                    <div className="mt-2 text-2xl font-bold">{step.value}</div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(step.value > 0 ? 3 : 0, (step.value / funnelMax) * 100)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent visitor journeys</CardTitle>
            <CardDescription>Rapid events from the same session are grouped into one readable journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {journeys.map((journey) => {
                const durationSeconds = Math.max(0, Math.round((new Date(journey.lastAt).getTime() - new Date(journey.firstAt).getTime()) / 1000));
                return (
                  <div key={journey.sessionId} className="rounded-xl border bg-background p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="font-semibold">Session {shortId(journey.sessionId)}</span>
                          <Badge variant="outline">{journey.device}</Badge>
                          {journey.city !== 'Unknown location' && <Badge variant="secondary">{journey.city}</Badge>}
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
                          {journey.pages.length ? journey.pages.map((page, index) => (
                            <span key={`${page}-${index}`} className="flex items-center gap-1">
                              {index > 0 && <span>→</span>}
                              <span className="max-w-[220px] truncate">{page}</span>
                            </span>
                          )) : <span>No page path recorded</span>}
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-5 text-xs text-muted-foreground">
                        <span><strong className="text-foreground">{journey.interactions}</strong> interactions</span>
                        <span><strong className="text-foreground">{journey.eventCount}</strong> events</span>
                        <span><strong className="text-foreground">{durationSeconds}s</strong> span</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {journeys.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No public visitor journeys in this period.</p>}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Traffic sources</CardTitle>
              <CardDescription>Session source from UTM data or referrer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {sources.map(([source, count]) => (
                <div key={source} className="flex items-center justify-between gap-4">
                  <span className="truncate text-sm font-medium">{source}</span>
                  <Badge variant="secondary">{count} sessions</Badge>
                </div>
              ))}
              {sources.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">No source data in this period.</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Visitor locations</CardTitle>
              <CardDescription>Detected city for public sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {locations.map(([city, count]) => (
                <div key={city} className="flex items-center justify-between gap-4">
                  <span className="truncate text-sm font-medium">{city}</span>
                  <Badge variant="secondary">{count} sessions</Badge>
                </div>
              ))}
              {locations.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">No location data in this period.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
