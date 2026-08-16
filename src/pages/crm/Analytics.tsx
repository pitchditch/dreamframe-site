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
const NON_USER_EVENT_LABELS = new Set(['property_type_detected']);

type TimeRange = '24h' | '7d' | '30d';

type PageViewRow = {
  id: string;
  page_path: string | null;
  session_id: string | null;
  visitor_id: string | null;
  created_at: string | null;
  timestamp: string | null;
  detected_city: string | null;
  utm_source: string | null;
  referrer: string | null;
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
  event_type: string | null;
  event_name: string | null;
  event_label: string | null;
  page_path: string | null;
  element_id: string | null;
  element_text: string | null;
  source: string | null;
  utm_source: string | null;
  device_category: string | null;
  browser: string | null;
  city: string | null;
  is_internal: boolean | null;
  is_bot: boolean | null;
  is_test: boolean | null;
  metadata: Record<string, unknown> | null;
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
};

type LeadRow = {
  id: string;
  email: string | null;
  phone: string | null;
  lead_source: string | null;
  created_at: string;
  is_test: boolean | null;
};

type QuoteRow = {
  id: string;
  source: string | null;
  channel: string | null;
  created_at: string;
  is_test: boolean | null;
};

type BookingRow = {
  id: string;
  quote_id: string | null;
  created_at: string;
  is_test: boolean | null;
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
  firstAt: string;
  lastAt: string;
  device: string;
  city: string;
  pages: string[];
  interactions: number;
  eventCount: number;
};

const ranges: Record<TimeRange, { days: number; label: string; previousLabel: string }> = {
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
  const clean = value.replace(/\s+/g, ' ').trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
};
const humanize = (value: string) => value.replace(/[_-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
const isWebsiteLead = (row: LeadRow) => (row.lead_source || '').toLowerCase().startsWith('website');
const isWebsiteQuote = (row: QuoteRow) =>
  (row.source || '').toLowerCase().startsWith('website') || (row.channel || '').toLowerCase() === 'web_quote';

const leadIdentity = (row: LeadRow) => {
  const email = row.email?.trim().toLowerCase();
  if (email) return `email:${email}`;
  const phone = row.phone?.replace(/\D/g, '');
  if (phone) return `phone:${phone}`;
  return `id:${row.id}`;
};

const isFeedInteraction = (event: AnalyticsEventRow) => {
  if (event.event_type === 'page_view' || event.event_name === 'page_view') return false;
  return !NON_USER_EVENT_LABELS.has(event.event_label || '');
};

const isCtaClick = (event: AnalyticsEventRow) =>
  event.event_type === 'click' &&
  event.event_label !== 'scroll_depth' &&
  !NON_USER_EVENT_LABELS.has(event.event_label || '');

const eventLabel = (event: AnalyticsEventRow) => {
  if (event.event_label === 'scroll_depth') {
    const depth = typeof event.metadata?.depth === 'number' ? event.metadata.depth : null;
    return depth ? `Scrolled ${depth}%` : 'Scrolled page';
  }
  if (event.event_name?.includes('quote_started')) return 'Started a quote';
  if (event.event_name === 'address_entered') return 'Entered an address';
  if (event.event_name === 'quote_click') return 'Clicked quote CTA';
  const text = event.element_text?.trim();
  if (text && text !== event.event_label) return `${shorten(text)} clicked`;
  const label = event.event_label?.trim();
  if (label) return humanize(shorten(label));
  if (event.event_name) return humanize(event.event_name);
  return humanize(event.event_type || 'interaction');
};

const ctaLabel = (event: AnalyticsEventRow) =>
  shorten(event.element_text || event.event_label || event.element_id || event.event_name || 'Button click', 58);

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
  const [databaseConnected, setDatabaseConnected] = useState(false);
  const [pageViews, setPageViews] = useState<PageViewRow[]>([]);
  const [events, setEvents] = useState<AnalyticsEventRow[]>([]);
  const [sessions, setSessions] = useState<AnalyticsSessionRow[]>([]);
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [quotes, setQuotes] = useState<QuoteRow[]>([]);
  const [bookings, setBookings] = useState<BookingRow[]>([]);

  const { start, previousStart, now } = useMemo(() => {
    const end = new Date();
    const days = ranges[timeRange].days;
    const currentStart = new Date(end.getTime() - days * 86400000);
    return {
      now: end,
      start: currentStart,
      previousStart: new Date(currentStart.getTime() - days * 86400000),
    };
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
        const cutoff = previousStart.toISOString();
        const [viewRows, eventRows, sessionRows, leadRows, quoteRows, bookingRows] = await Promise.all([
          fetchAllRows<PageViewRow>((from, to) => supabase
            .from('page_views')
            .select('id,page_path,session_id,visitor_id,created_at,timestamp,detected_city,utm_source,referrer,device_category,is_bot,is_internal,tracking_mode')
            .gte('created_at', cutoff).order('created_at', { ascending: true }).range(from, to)),
          fetchAllRows<AnalyticsEventRow>((from, to) => supabase
            .from('analytics_events')
            .select('id,occurred_at,visitor_id,session_id,event_type,event_name,event_label,page_path,element_id,element_text,source,utm_source,device_category,browser,city,is_internal,is_bot,is_test,metadata')
            .gte('occurred_at', cutoff).order('occurred_at', { ascending: true }).range(from, to)),
          fetchAllRows<AnalyticsSessionRow>((from, to) => supabase
            .from('analytics_sessions')
            .select('session_id,visitor_id,first_visit,last_activity,page_count,referrer,utm_source,landing_page,detected_city,device_category,is_bot,is_internal')
            .gte('first_visit', cutoff).order('first_visit', { ascending: true }).range(from, to)),
          fetchAllRows<LeadRow>((from, to) => supabase
            .from('leads')
            .select('id,email,phone,lead_source,created_at,is_test')
            .gte('created_at', cutoff).order('created_at', { ascending: true }).range(from, to)),
          fetchAllRows<QuoteRow>((from, to) => supabase
            .from('quotes')
            .select('id,source,channel,created_at,is_test')
            .gte('created_at', cutoff).order('created_at', { ascending: true }).range(from, to)),
          fetchAllRows<BookingRow>((from, to) => supabase
            .from('bookings')
            .select('id,quote_id,created_at,is_test')
            .gte('created_at', cutoff).order('created_at', { ascending: true }).range(from, to)),
        ]);
        if (cancelled) return;
        setPageViews(viewRows);
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
            description: 'The dashboard could not read the analytics tables. Tracking data was not changed.',
            variant: 'destructive',
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [navigate, previousStart, toast]);

  const currentViews = useMemo(() => pageViews.filter((r) => inWindow(getPageViewTime(r), start, now)), [pageViews, start, now]);
  const previousViews = useMemo(() => pageViews.filter((r) => inWindow(getPageViewTime(r), previousStart, start)), [pageViews, previousStart, start]);
  const publicCurrentViews = useMemo(() => currentViews.filter(isPublic), [currentViews]);
  const publicPreviousViews = useMemo(() => previousViews.filter(isPublic), [previousViews]);
  const internalCurrentViews = useMemo(() => currentViews.filter((r) => !!r.is_internal), [currentViews]);
  const currentEvents = useMemo(() => events.filter((r) => inWindow(r.occurred_at, start, now) && isPublic(r)), [events, start, now]);
  const previousEvents = useMemo(() => events.filter((r) => inWindow(r.occurred_at, previousStart, start) && isPublic(r)), [events, previousStart, start]);
  const currentSessions = useMemo(() => sessions.filter((r) => inWindow(r.first_visit, start, now) && isPublic(r)), [sessions, start, now]);
  const previousSessions = useMemo(() => sessions.filter((r) => inWindow(r.first_visit, previousStart, start) && isPublic(r)), [sessions, previousStart, start]);

  const websiteLeadCount = (from: Date, to: Date) => new Set(
    leads.filter((r) => inWindow(r.created_at, from, to) && !r.is_test && isWebsiteLead(r)).map(leadIdentity)
  ).size;
  const websiteQuotes = useMemo(() => quotes.filter((r) => !r.is_test && isWebsiteQuote(r)), [quotes]);
  const websiteQuoteIds = useMemo(() => new Set(websiteQuotes.map((r) => r.id)), [websiteQuotes]);
  const quoteCount = (from: Date, to: Date) => websiteQuotes.filter((r) => inWindow(r.created_at, from, to)).length;
  const bookingCount = (from: Date, to: Date) => bookings.filter((r) =>
    inWindow(r.created_at, from, to) && !r.is_test && !!r.quote_id && websiteQuoteIds.has(r.quote_id)
  ).length;
  const uniqueVisitors = (rows: PageViewRow[]) => new Set(rows.map((r) => r.visitor_id || r.session_id).filter(Boolean)).size;
  const engagedSessions = (rows: AnalyticsSessionRow[]) => rows.filter((r) => {
    const seconds = Math.max(0, (new Date(r.last_activity).getTime() - new Date(r.first_visit).getTime()) / 1000);
    return (r.page_count || 0) >= 2 || seconds >= 30;
  }).length;
  const quoteStarts = (rows: AnalyticsEventRow[]) => new Set(rows
    .filter((r) => r.event_name?.includes('quote_started'))
    .map((r) => r.session_id || r.visitor_id || r.id)).size;

  const currentVisitors = uniqueVisitors(publicCurrentViews);
  const previousVisitors = uniqueVisitors(publicPreviousViews);
  const currentLeads = websiteLeadCount(start, now);
  const previousLeads = websiteLeadCount(previousStart, start);
  const currentQuoteStarts = quoteStarts(currentEvents);
  const previousQuoteStarts = quoteStarts(previousEvents);
  const currentQuoteCount = quoteCount(start, now);
  const previousQuoteCount = quoteCount(previousStart, start);
  const currentBookingCount = bookingCount(start, now);
  const previousBookingCount = bookingCount(previousStart, start);
  const currentEngaged = engagedSessions(currentSessions);
  const previousEngaged = engagedSessions(previousSessions);
  const currentConversion = currentVisitors ? (currentLeads / currentVisitors) * 100 : 0;
  const previousConversion = previousVisitors ? (previousLeads / previousVisitors) * 100 : 0;

  const metrics: Metric[] = [
    { label: 'Visitors', value: currentVisitors.toLocaleString(), current: currentVisitors, previous: previousVisitors, note: 'Unique public visitors', icon: Users },
    { label: 'Page Views', value: publicCurrentViews.length.toLocaleString(), current: publicCurrentViews.length, previous: publicPreviousViews.length, note: 'Admin, bot and test traffic excluded', icon: Eye },
    { label: 'Engaged Sessions', value: currentEngaged.toLocaleString(), current: currentEngaged, previous: previousEngaged, note: '2+ pages or 30+ seconds', icon: Activity },
    { label: 'Website Leads', value: currentLeads.toLocaleString(), current: currentLeads, previous: previousLeads, note: 'Unique website-sourced contacts', icon: Target },
    { label: 'Quote Starts', value: currentQuoteStarts.toLocaleString(), current: currentQuoteStarts, previous: previousQuoteStarts, note: 'Distinct public sessions', icon: MousePointerClick },
    { label: 'Bookings', value: currentBookingCount.toLocaleString(), current: currentBookingCount, previous: previousBookingCount, note: 'Bookings tied to web quotes', icon: CalendarCheck },
    { label: 'Conversion Rate', value: `${currentConversion.toFixed(1)}%`, current: currentConversion, previous: previousConversion, note: 'Visitors → website leads', icon: BarChart3 },
  ];

  const trendData = useMemo(() => {
    const bucketCount = timeRange === '24h' ? 24 : ranges[timeRange].days;
    const bucketMs = (start.getTime() - previousStart.getTime()) / bucketCount;
    const rows = Array.from({ length: bucketCount }, (_, index) => {
      const date = new Date(start.getTime() + index * bucketMs);
      return {
        label: timeRange === '24h' ? date.toLocaleTimeString([], { hour: 'numeric' }) : date.toLocaleDateString([], { month: 'short', day: 'numeric' }),
        current: 0,
        previous: 0,
      };
    });
    publicCurrentViews.forEach((r) => {
      const i = Math.floor((new Date(getPageViewTime(r)).getTime() - start.getTime()) / bucketMs);
      if (i >= 0 && i < rows.length) rows[i].current += 1;
    });
    publicPreviousViews.forEach((r) => {
      const i = Math.floor((new Date(getPageViewTime(r)).getTime() - previousStart.getTime()) / bucketMs);
      if (i >= 0 && i < rows.length) rows[i].previous += 1;
    });
    return rows;
  }, [publicCurrentViews, publicPreviousViews, previousStart, start, timeRange]);

  const quoteStartSessions = useMemo(() => new Set(currentEvents
    .filter((e) => e.event_name?.includes('quote_started'))
    .map((e) => e.session_id).filter(Boolean)), [currentEvents]);

  const topPages = useMemo(() => {
    const map = new Map<string, { views: number; visitors: Set<string>; clicks: number; starts: Set<string> }>();
    publicCurrentViews.forEach((view) => {
      const path = view.page_path || '(unknown)';
      const row = map.get(path) || { views: 0, visitors: new Set<string>(), clicks: 0, starts: new Set<string>() };
      row.views += 1;
      if (view.visitor_id || view.session_id) row.visitors.add(view.visitor_id || view.session_id || '');
      map.set(path, row);
    });
    currentEvents.forEach((event) => {
      if (!event.page_path) return;
      const row = map.get(event.page_path);
      if (!row) return;
      if (isCtaClick(event)) row.clicks += 1;
      if (event.event_name?.includes('quote_started') && event.session_id) row.starts.add(event.session_id);
    });
    return Array.from(map.entries()).map(([path, row]) => ({
      path,
      views: row.views,
      visitors: row.visitors.size,
      clicks: row.clicks,
      starts: row.starts.size,
      rate: row.visitors.size ? (row.starts.size / row.visitors.size) * 100 : 0,
    })).sort((a, b) => b.views - a.views).slice(0, 8);
  }, [currentEvents, publicCurrentViews]);

  const topCtas = useMemo(() => {
    const map = new Map<string, { clicks: number; sessions: Set<string>; quoteStarts: Set<string> }>();
    currentEvents.filter(isCtaClick).forEach((event) => {
      const label = ctaLabel(event);
      const row = map.get(label) || { clicks: 0, sessions: new Set<string>(), quoteStarts: new Set<string>() };
      row.clicks += 1;
      if (event.session_id) {
        row.sessions.add(event.session_id);
        if (quoteStartSessions.has(event.session_id)) row.quoteStarts.add(event.session_id);
      }
      map.set(label, row);
    });
    return Array.from(map.entries()).map(([label, row]) => ({
      label,
      clicks: row.clicks,
      sessions: row.sessions.size,
      quoteStarts: row.quoteStarts.size,
    })).sort((a, b) => b.clicks - a.clicks).slice(0, 8);
  }, [currentEvents, quoteStartSessions]);

  const journeys = useMemo<Journey[]>(() => {
    const grouped = new Map<string, AnalyticsEventRow[]>();
    currentEvents.forEach((event) => {
      if (!event.session_id) return;
      grouped.set(event.session_id, [...(grouped.get(event.session_id) || []), event]);
    });
    return Array.from(grouped.entries()).map(([sessionId, sessionEvents]) => {
      const ordered = [...sessionEvents].sort((a, b) => new Date(a.occurred_at).getTime() - new Date(b.occurred_at).getTime());
      const pages: string[] = [];
      ordered.forEach((event) => {
        if (event.page_path && pages[pages.length - 1] !== event.page_path) pages.push(event.page_path);
      });
      const first = ordered[0];
      const last = ordered[ordered.length - 1];
      return {
        sessionId,
        firstAt: first.occurred_at,
        lastAt: last.occurred_at,
        device: first.device_category || 'Unknown device',
        city: first.city || 'Unknown location',
        pages: pages.slice(0, 5),
        interactions: ordered.filter(isFeedInteraction).length,
        eventCount: ordered.length,
      };
    }).sort((a, b) => new Date(b.lastAt).getTime() - new Date(a.lastAt).getTime()).slice(0, 8);
  }, [currentEvents]);

  const sources = useMemo(() => {
    const map = new Map<string, number>();
    currentSessions.forEach((session) => map.set(sourceLabel(session), (map.get(sourceLabel(session)) || 0) + 1));
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

  const latestPublicView = useMemo(() => [...pageViews].filter(isPublic)
    .sort((a, b) => new Date(getPageViewTime(b)).getTime() - new Date(getPageViewTime(a)).getTime())[0], [pageViews]);
  const latestInternalView = useMemo(() => [...pageViews].filter((r) => !!r.is_internal)
    .sort((a, b) => new Date(getPageViewTime(b)).getTime() - new Date(getPageViewTime(a)).getTime())[0], [pageViews]);
  const recentRecordedViews = useMemo(() => [...currentViews]
    .sort((a, b) => new Date(getPageViewTime(b)).getTime() - new Date(getPageViewTime(a)).getTime()).slice(0, 8), [currentViews]);
  const recentInteractions = useMemo(() => [...currentEvents].filter(isFeedInteraction)
    .sort((a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime()).slice(0, 10), [currentEvents]);

  const funnel = [
    { label: 'Visitors', value: currentVisitors },
    { label: 'Quote starts', value: currentQuoteStarts },
    { label: 'Quotes created', value: currentQuoteCount },
    { label: 'Bookings', value: currentBookingCount },
  ];
  const funnelMax = Math.max(1, ...funnel.map((step) => step.value));

  const change = (current: number, previous: number) => {
    if (previous === 0) return current === 0 ? 'No change' : 'New activity';
    const value = ((current - previous) / previous) * 100;
    return `${value >= 0 ? '+' : ''}${value.toFixed(0)}%`;
  };

  const exportCsv = () => {
    const headers = ['timestamp', 'record_type', 'page_path', 'event', 'session_id', 'visitor_id', 'device', 'city', 'source'];
    const rows = [
      ...publicCurrentViews.map((view) => [
        getPageViewTime(view), 'page_view', view.page_path || '', 'Page view', view.session_id || '', view.visitor_id || '',
        view.device_category || '', view.detected_city || '', view.utm_source || view.referrer || 'Direct',
      ]),
      ...currentEvents.filter(isFeedInteraction).map((event) => [
        event.occurred_at, 'interaction', event.page_path || '', eventLabel(event), event.session_id || '', event.visitor_id || '',
        event.device_category || '', event.city || '', event.utm_source || event.source || 'Direct',
      ]),
    ];
    const escape = (value: string) => `"${String(value).replace(/"/g, '""')}"`;
    const csv = [headers, ...rows].map((row) => row.map(escape).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `website-analytics-${timeRange}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
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
            <Button variant="ghost" size="sm" className="-ml-3 mb-2" onClick={() => navigate('/crm')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> CRM
            </Button>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2.5"><BarChart3 className="h-6 w-6 text-primary" /></div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Analytics Dashboard</h1>
                <p className="text-sm text-muted-foreground">Website performance, visitor behavior and lead conversion</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {(['24h', '7d', '30d'] as TimeRange[]).map((range) => (
              <Button key={range} size="sm" variant={timeRange === range ? 'default' : 'outline'} onClick={() => setTimeRange(range)}>
                {ranges[range].label}
              </Button>
            ))}
            <Button size="sm" variant="outline" onClick={exportCsv} disabled={!databaseConnected}>
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Comparing with the {ranges[timeRange].previousLabel}. Public analytics exclude owner/admin, bot and test traffic.
        </p>

        <Card className={databaseConnected ? 'border-emerald-200' : 'border-destructive/30'}>
          <CardContent className="p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3">
                <div className={`mt-1 h-2.5 w-2.5 rounded-full ${databaseConnected ? 'bg-emerald-500' : 'bg-destructive'}`} />
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-semibold">Tracking {databaseConnected ? 'healthy' : 'needs attention'}</span>
                    {latestPublicView && <span className="text-sm text-muted-foreground">· Last public visit {new Date(getPageViewTime(latestPublicView)).toLocaleString()}</span>}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{publicCurrentViews.length} public page views · {internalCurrentViews.length} owner/admin views excluded</p>
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
                    {recentRecordedViews.map((view) => (
                      <div key={view.id} className="rounded-lg border bg-background p-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="min-w-0 truncate text-sm font-medium">{view.page_path || '/'}</span>
                          <Badge variant={view.is_internal ? 'secondary' : 'outline'}>{view.is_internal ? 'Owner/Admin · excluded' : 'Public / unrecognized'}</Badge>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {view.device_category || 'Unknown device'} · Session {shortId(view.session_id)} · {new Date(getPageViewTime(view)).toLocaleString()}
                        </div>
                      </div>
                    ))}
                    {!recentRecordedViews.length && <p className="py-4 text-sm text-muted-foreground">No page-view rows in this period.</p>}
                  </div>
                  {latestInternalView && <p className="mt-3 text-xs text-muted-foreground">Last owner/admin view: {new Date(getPageViewTime(latestInternalView)).toLocaleString()}</p>}
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold">Recent interaction events</h3>
                  <div className="space-y-2">
                    {recentInteractions.map((event) => (
                      <div key={event.id} className="rounded-lg border bg-background p-3">
                        <div className="text-sm font-medium">{eventLabel(event)}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {event.page_path || 'Unknown page'} · Session {shortId(event.session_id)} · {event.device_category || 'Unknown device'} · {new Date(event.occurred_at).toLocaleString()}
                        </div>
                      </div>
                    ))}
                    {!recentInteractions.length && <p className="py-4 text-sm text-muted-foreground">No interaction events in this period.</p>}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-7">
          {metrics.map((metric) => {
            const Trend = metric.current >= metric.previous ? TrendingUp : TrendingDown;
            const Icon = metric.icon;
            return (
              <Card key={metric.label}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-3"><span className="text-xs font-medium text-muted-foreground">{metric.label}</span><Icon className="h-4 w-4 text-muted-foreground" /></div>
                  <div className="mt-2 text-2xl font-bold">{metric.value}</div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><Trend className="h-3.5 w-3.5" />{change(metric.current, metric.previous)} vs prior</div>
                  <p className="mt-1 text-[11px] leading-4 text-muted-foreground">{metric.note}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader><CardTitle>Traffic trend</CardTitle><CardDescription>Public page views compared with the previous period</CardDescription></CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} minTickGap={18} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip /><Legend />
                  <Line type="monotone" dataKey="current" name="Current" stroke="currentColor" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="previous" name="Previous" stroke="currentColor" strokeOpacity={0.35} strokeDasharray="5 5" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Top pages</CardTitle><CardDescription>Pages attracting attention and starting quotes</CardDescription></CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-sm">
                <thead><tr className="border-b text-left text-xs text-muted-foreground"><th className="pb-3 font-medium">Page</th><th className="pb-3 text-right font-medium">Views</th><th className="pb-3 text-right font-medium">Visitors</th><th className="pb-3 text-right font-medium">CTA clicks</th><th className="pb-3 text-right font-medium">Quote starts</th><th className="pb-3 text-right font-medium">Start rate</th></tr></thead>
                <tbody>{topPages.map((page) => <tr key={page.path} className="border-b last:border-0"><td className="max-w-[260px] truncate py-3 font-medium">{page.path}</td><td className="py-3 text-right">{page.views}</td><td className="py-3 text-right">{page.visitors}</td><td className="py-3 text-right">{page.clicks}</td><td className="py-3 text-right">{page.starts}</td><td className="py-3 text-right">{page.rate.toFixed(1)}%</td></tr>)}</tbody>
              </table>
              {!topPages.length && <p className="py-8 text-center text-sm text-muted-foreground">No public page views in this period.</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Top buttons & CTAs</CardTitle><CardDescription>Scroll events are excluded so this is actual CTA activity</CardDescription></CardHeader>
            <CardContent>
              {topCtas.map((cta) => (
                <div key={cta.label} className="grid grid-cols-[minmax(0,1fr)_60px_72px_82px] items-center gap-2 border-b py-3 text-sm last:border-0">
                  <span className="truncate font-medium" title={cta.label}>{cta.label}</span><span className="text-right">{cta.clicks}</span><span className="text-right text-muted-foreground">{cta.sessions} users</span><span className="text-right text-muted-foreground">{cta.quoteStarts} starts</span>
                </div>
              ))}
              {!topCtas.length && <p className="py-8 text-center text-sm text-muted-foreground">No CTA clicks in this period.</p>}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Conversion funnel</CardTitle><CardDescription>Website journey from public traffic to booked work</CardDescription></CardHeader>
          <CardContent>
            <div className="grid gap-4 lg:grid-cols-4">
              {funnel.map((step) => (
                <div key={step.label} className="rounded-xl border bg-background p-4">
                  <div className="flex items-center justify-between"><span className="text-xs font-medium text-muted-foreground">{step.label}</span>{step.label !== 'Visitors' && <span className="text-xs text-muted-foreground">{currentVisitors ? ((step.value / currentVisitors) * 100).toFixed(0) : 0}% of visitors</span>}</div>
                  <div className="mt-2 text-2xl font-bold">{step.value}</div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(step.value ? 3 : 0, Math.min(100, (step.value / funnelMax) * 100))}%` }} /></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent visitor journeys</CardTitle><CardDescription>Rapid events from one session are grouped instead of filling the feed with repeated rows</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {journeys.map((journey) => {
              const seconds = Math.max(0, Math.round((new Date(journey.lastAt).getTime() - new Date(journey.firstAt).getTime()) / 1000));
              return (
                <div key={journey.sessionId} className="rounded-xl border bg-background p-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-sm"><span className="font-semibold">Session {shortId(journey.sessionId)}</span><Badge variant="outline">{journey.device}</Badge>{journey.city !== 'Unknown location' && <Badge variant="secondary">{journey.city}</Badge>}</div>
                      <div className="mt-2 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">{journey.pages.length ? journey.pages.map((page, index) => <span key={`${page}-${index}`} className="flex items-center gap-1">{index > 0 && <span>→</span>}<span className="max-w-[220px] truncate">{page}</span></span>) : <span>No page path recorded</span>}</div>
                    </div>
                    <div className="flex shrink-0 items-center gap-5 text-xs text-muted-foreground"><span><strong className="text-foreground">{journey.interactions}</strong> interactions</span><span><strong className="text-foreground">{journey.eventCount}</strong> events</span><span><strong className="text-foreground">{seconds}s</strong> span</span></div>
                  </div>
                </div>
              );
            })}
            {!journeys.length && <p className="py-8 text-center text-sm text-muted-foreground">No public visitor journeys in this period.</p>}
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Traffic sources</CardTitle><CardDescription>Session source from UTM data or referrer</CardDescription></CardHeader>
            <CardContent className="space-y-3">{sources.map(([source, count]) => <div key={source} className="flex items-center justify-between gap-4"><span className="truncate text-sm font-medium">{source}</span><Badge variant="secondary">{count} sessions</Badge></div>)}{!sources.length && <p className="py-6 text-center text-sm text-muted-foreground">No source data in this period.</p>}</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-4 w-4" />Visitor locations</CardTitle><CardDescription>Detected city for public sessions</CardDescription></CardHeader>
            <CardContent className="space-y-3">{locations.map(([city, count]) => <div key={city} className="flex items-center justify-between gap-4"><span className="truncate text-sm font-medium">{city}</span><Badge variant="secondary">{count} sessions</Badge></div>)}{!locations.length && <p className="py-6 text-center text-sm text-muted-foreground">No location data in this period.</p>}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
