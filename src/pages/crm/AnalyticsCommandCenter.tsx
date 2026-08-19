import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowLeft,
  BadgeDollarSign,
  BarChart3,
  BriefcaseBusiness,
  CalendarCheck,
  CircleDollarSign,
  ExternalLink,
  Gauge,
  MapPin,
  Megaphone,
  Phone,
  RefreshCw,
  Route,
  Search,
  Store,
  Target,
  TrendingUp,
  Users,
  Video,
  WalletCards,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const PAGE_SIZE = 1000;
const ACCEPTED_QUOTE_STATUSES = new Set(['approved', 'accepted', 'booked', 'converted', 'completed']);
const LOST_QUOTE_STATUSES = new Set(['rejected', 'declined', 'cancelled', 'canceled', 'expired', 'lost', 'ignored']);
const OPEN_PIPELINE_STATUSES = new Set(['sent', 'pending', 'quoted', 'follow-up', 'follow_up']);
const PAID_STATUSES = new Set(['paid', 'succeeded', 'completed', 'success']);

type RangeDays = 7 | 30 | 90;
type AnyRow = Record<string, any>;
type FilterState = {
  source: string;
  city: string;
  device: string;
  service: string;
  campaign: string;
  customerType: string;
};

type UniversalRow = {
  key: string;
  kind: 'Page' | 'Campaign';
  visitors: Set<string>;
  sessions: number;
  leads: number;
  quotes: number;
  bookings: number;
  bookedRevenue: number;
  paidRevenue: number;
  linkedBookings: number;
};

const number = (value: unknown) => {
  const parsed = Number(value || 0);
  return Number.isFinite(parsed) ? parsed : 0;
};
const money = (value: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(value || 0);
const percent = (value: number) => `${(value || 0).toFixed(1)}%`;
const inWindow = (value: string | null | undefined, start: Date, end: Date) => {
  if (!value) return false;
  const time = new Date(value).getTime();
  return Number.isFinite(time) && time >= start.getTime() && time < end.getTime();
};
const normalize = (value: unknown) => String(value || '').trim().toLowerCase();
const median = (values: number[]) => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};
const sourceFromSession = (session: AnyRow | undefined) => {
  if (!session) return 'Unknown';
  if (session.utm_source) return String(session.utm_source);
  if (!session.referrer) return 'Direct';
  try {
    return new URL(session.referrer).hostname.replace(/^www\./, '');
  } catch {
    return String(session.referrer || 'Direct');
  }
};
const sourceFromQuote = (quote: AnyRow) => {
  const details = quote.source_details && typeof quote.source_details === 'object' ? quote.source_details : {};
  return String(details.utm_source || details.source || quote.source || quote.channel || 'Unknown');
};
const pathService = (path: string | null | undefined) => {
  const value = normalize(path);
  if (value.includes('window') || value.includes('storefront')) return 'Window Cleaning';
  if (value.includes('fleet')) return 'Fleet Washing';
  if (value.includes('gutter')) return 'Gutter Cleaning';
  if (value.includes('roof')) return 'Roof Cleaning';
  if (value.includes('house-wash') || value.includes('house_wash')) return 'House Washing';
  if (value.includes('fence')) return 'Fence Washing';
  if (value.includes('pressure')) return 'Pressure Washing';
  return 'Other / General';
};
const serviceLabels = (value: unknown): string[] => {
  const labels = new Set<string>();
  const visit = (item: unknown, fallback?: string) => {
    if (!item) return;
    if (typeof item === 'string') {
      const clean = item.trim();
      if (clean) labels.add(clean);
      return;
    }
    if (Array.isArray(item)) {
      item.forEach((child) => visit(child));
      return;
    }
    if (typeof item === 'object') {
      const row = item as Record<string, unknown>;
      const named = row.name || row.service || row.label || row.type || row.title;
      if (typeof named === 'string' && named.trim()) labels.add(named.trim());
      Object.entries(row).forEach(([key, child]) => {
        if (['price', 'amount', 'total', 'qty', 'quantity', 'selected', 'enabled'].includes(key.toLowerCase())) return;
        if (typeof child === 'boolean' && child) labels.add(key);
        else if (child && typeof child === 'object') visit(child, key);
        else if (fallback && child) labels.add(fallback);
      });
    }
  };
  visit(value);
  return Array.from(labels);
};
const familyFromLabel = (label: string) => {
  const value = normalize(label);
  if (value.includes('window') || value.includes('storefront') || value.includes('glass')) return 'Window Cleaning';
  if (value.includes('fleet') || value.includes('truck')) return 'Fleet Washing';
  if (value.includes('gutter')) return 'Gutter Cleaning';
  if (value.includes('roof')) return 'Roof Cleaning';
  if (value.includes('house') || value.includes('siding') || value.includes('soft wash')) return 'House Washing';
  if (value.includes('fence')) return 'Fence Washing';
  if (value.includes('pressure') || value.includes('driveway') || value.includes('patio') || value.includes('concrete')) return 'Pressure Washing';
  return 'Other / General';
};
const quoteFamilies = (quote: AnyRow) => {
  const families = new Set(serviceLabels(quote.services).map(familyFromLabel));
  if (!families.size && quote.quote_type) families.add(familyFromLabel(String(quote.quote_type)));
  return Array.from(families.size ? families : new Set(['Other / General']));
};
const monthlyAmount = (amount: number, frequency: string) => {
  const value = normalize(frequency);
  if (value.includes('week')) return amount * 52 / 12;
  if (value.includes('quarter') || value.includes('3 month')) return amount / 3;
  if (value.includes('annual') || value.includes('year')) return amount / 12;
  if (value.includes('biannual') || value.includes('6 month')) return amount / 6;
  return amount;
};
const confidenceFor = (row: UniversalRow) => {
  if (row.paidRevenue > 0) return 'Verified';
  if (row.bookedRevenue > 0 && row.linkedBookings === row.bookings && row.bookings > 0) return 'Attributed';
  if (row.bookedRevenue > 0 || row.quotes > 0) return 'Estimated';
  return 'Traffic only';
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

function MetricCard({ label, value, note, icon: Icon }: { label: string; value: string; note: string; icon: typeof Users }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="mt-2 text-2xl font-bold">{value}</div>
        <p className="mt-1 text-[11px] leading-4 text-muted-foreground">{note}</p>
      </CardContent>
    </Card>
  );
}

export default function AnalyticsCommandCenter() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rangeDays, setRangeDays] = useState<RangeDays>(30);
  const [loading, setLoading] = useState(true);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({ source: 'All', city: 'All', device: 'All', service: 'All', campaign: 'All', customerType: 'All' });

  const [sessions, setSessions] = useState<AnyRow[]>([]);
  const [events, setEvents] = useState<AnyRow[]>([]);
  const [visitors, setVisitors] = useState<AnyRow[]>([]);
  const [leads, setLeads] = useState<AnyRow[]>([]);
  const [quotes, setQuotes] = useState<AnyRow[]>([]);
  const [bookings, setBookings] = useState<AnyRow[]>([]);
  const [jobs, setJobs] = useState<AnyRow[]>([]);
  const [invoices, setInvoices] = useState<AnyRow[]>([]);
  const [payments, setPayments] = useState<AnyRow[]>([]);
  const [profiles, setProfiles] = useState<AnyRow[]>([]);
  const [calls, setCalls] = useState<AnyRow[]>([]);
  const [d2dDaily, setD2dDaily] = useState<AnyRow[]>([]);
  const [d2dStreets, setD2dStreets] = useState<AnyRow[]>([]);
  const [doorVisits, setDoorVisits] = useState<AnyRow[]>([]);
  const [goals, setGoals] = useState<AnyRow[]>([]);
  const [storefrontLeads, setStorefrontLeads] = useState<AnyRow[]>([]);
  const [subscriptions, setSubscriptions] = useState<AnyRow[]>([]);
  const [plans, setPlans] = useState<AnyRow[]>([]);
  const [customSubscriptions, setCustomSubscriptions] = useState<AnyRow[]>([]);
  const [virtualSessions, setVirtualSessions] = useState<AnyRow[]>([]);
  const [campaignPerformance, setCampaignPerformance] = useState<AnyRow[]>([]);

  const { now, start, previousStart } = useMemo(() => {
    const end = new Date();
    const currentStart = new Date(end.getTime() - rangeDays * 86400000);
    return { now: end, start: currentStart, previousStart: new Date(currentStart.getTime() - rangeDays * 86400000) };
  }, [rangeDays]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      const warningBag: string[] = [];
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          navigate('/crm', { replace: true });
          return;
        }
        const db = supabase as any;
        const cutoff = previousStart.toISOString();
        const cutoffDate = cutoff.slice(0, 10);
        const safe = async <T,>(label: string, query: (from: number, to: number) => any) => {
          try {
            return await fetchAllRows<T>(query);
          } catch (error) {
            console.warn(`Analytics source unavailable: ${label}`, error);
            warningBag.push(label);
            return [] as T[];
          }
        };

        const results = await Promise.all([
          safe<AnyRow>('sessions', (from, to) => db.from('analytics_sessions').select('session_id,visitor_id,first_visit,last_activity,page_count,referrer,utm_source,utm_medium,utm_campaign,utm_term,utm_content,landing_page,detected_city,device_category,is_bot,is_internal,tracking_mode').gte('first_visit', cutoff).order('first_visit', { ascending: true }).range(from, to)),
          safe<AnyRow>('events', (from, to) => db.from('analytics_events').select('id,occurred_at,visitor_id,session_id,customer_id,lead_id,quote_id,event_type,event_name,event_label,page_path,source,utm_source,utm_campaign,device_category,city,is_internal,is_bot,is_test').gte('occurred_at', cutoff).order('occurred_at', { ascending: true }).range(from, to)),
          safe<AnyRow>('visitors', (from, to) => db.from('analytics_visitors').select('visitor_id,first_seen,last_seen,session_count,device_category,last_city,is_internal,is_bot,is_test').gte('last_seen', cutoff).order('last_seen', { ascending: true }).range(from, to)),
          safe<AnyRow>('leads', (from, to) => db.from('leads').select('id,email,phone,lead_source,service_requested,status,conversion_quote_id,conversion_customer_id,customer_id,created_at,updated_at,is_test').gte('updated_at', cutoff).order('updated_at', { ascending: true }).range(from, to)),
          safe<AnyRow>('quotes', (from, to) => db.from('quotes').select('id,customer_id,source,channel,source_details,services,total_amount,status,rejected_reason,cancellation_reason,customer_response,customer_feedback,created_at,updated_at,sent_at,approved_at,converted_at,completed_at,booking_completed_at,recurring_price,recurring_frequency,business_name,d2d_pin_id,confidence_level,data_source,quote_type,is_test').gte('updated_at', cutoff).order('updated_at', { ascending: true }).range(from, to)),
          safe<AnyRow>('bookings', (from, to) => db.from('bookings').select('id,customer_id,quote_id,status,services_subtotal,total_amount,scheduled_date,actual_end_time,created_at,updated_at,is_test').gte('created_at', cutoff).order('created_at', { ascending: true }).range(from, to)),
          safe<AnyRow>('jobs', (from, to) => db.from('jobs').select('id,quote_id,customer_id,status,actual_start_time,actual_end_time,created_at,updated_at,is_test').gte('updated_at', cutoff).order('updated_at', { ascending: true }).range(from, to)),
          safe<AnyRow>('invoices', (from, to) => db.from('invoices').select('id,customer_id,quote_id,job_id,total_amount,status,payment_date,created_at,updated_at,is_test').gte('updated_at', cutoff).order('updated_at', { ascending: true }).range(from, to)),
          safe<AnyRow>('payments', (from, to) => db.from('invoice_payments').select('id,invoice_id,amount,status,processed_at,created_at').gte('created_at', cutoff).order('created_at', { ascending: true }).range(from, to)),
          safe<AnyRow>('client value', (from, to) => db.from('admin_client_profiles').select('id,name,lead_source,lifecycle_stage,services_interested,quote_count,booking_count,job_count,invoice_count,paid_revenue,last_activity_at').order('paid_revenue', { ascending: false }).range(from, to)),
          safe<AnyRow>('calls', (from, to) => db.from('call_logs').select('id,session_id,page_path,status,duration,attempted_at,completed_at,outcome,voicemail_left,quote_sent,call_type,storefront_lead_id,storefront_id,created_at,is_test').gte('created_at', cutoff).order('created_at', { ascending: true }).range(from, to)),
          safe<AnyRow>('d2d daily', (from, to) => db.from('d2d_daily_rep_stats').select('employee_id,stat_date,doors_logged,interested_count,quotes_sent,booked_count,callbacks_pending,pipeline_value,first_log_at,last_log_at').gte('stat_date', cutoffDate).order('stat_date', { ascending: true }).range(from, to)),
          safe<AnyRow>('d2d streets', (from, to) => db.from('d2d_street_conversion_stats').select('street_name,hour_of_day,knocks,conversions,conversion_pct').order('conversion_pct', { ascending: false }).range(from, to)),
          safe<AnyRow>('door visits', (from, to) => db.from('door_visits').select('id,visit_start_time,visit_end_time,visit_duration_minutes,visit_status,contact_made,outcome,follow_up_required,quote_provided,quote_amount,objection_reason,created_at').gte('created_at', cutoff).order('created_at', { ascending: true }).range(from, to)),
          safe<AnyRow>('d2d goals', (from, to) => db.from('d2d_goals').select('id,employee_id,daily_door_goal,daily_quote_goal,weekly_door_goal,current_streak_days,longest_streak_days,personal_best_doors,personal_best_quotes,updated_at').order('updated_at', { ascending: false }).range(from, to)),
          safe<AnyRow>('storefront', (from, to) => db.from('storefront_call_leads').select('id,business_name,city,status,attempts,last_called_at,outcome,callback_at,quote_id,customer_id,created_at,updated_at').gte('updated_at', cutoff).order('updated_at', { ascending: true }).range(from, to)),
          safe<AnyRow>('subscriptions', (from, to) => db.from('customer_subscriptions').select('id,customer_id,plan_id,frequency,status,current_period_start,current_period_end,next_service_date,created_at,updated_at').order('updated_at', { ascending: false }).range(from, to)),
          safe<AnyRow>('subscription plans', (from, to) => db.from('subscription_plans').select('id,name,price_monthly,price_quarterly,price_annually,services,is_active').order('sort_order', { ascending: true }).range(from, to)),
          safe<AnyRow>('custom subscriptions', (from, to) => db.from('admin_custom_subscriptions').select('id,customer_id,plan_title,service_types,billing_frequency,cadence,status,recurring_amount,price_monthly,price_quarterly,next_service_date,created_at,updated_at').order('updated_at', { ascending: false }).range(from, to)),
          safe<AnyRow>('virtual estimates', (from, to) => db.from('virtual_estimate_sessions').select('id,session_id,customer_id,status,invite_status,participant_source,customer_last_seen,call_state,call_started_at,call_ended_at,created_at,updated_at,is_test').gte('updated_at', cutoff).order('updated_at', { ascending: true }).range(from, to)),
          safe<AnyRow>('campaign performance', (from, to) => db.from('lead_gen_weekly_performance').select('id,week_start,campaign_name,channel,area,service,planned_ad_spend,planned_other_spend,forecast_leads,forecast_booking_rate,forecast_close_rate,forecast_avg_job_value,actual_ad_spend,actual_lead_source_spend,actual_calling_spend,actual_software_spend,actual_other_spend,actual_web_sessions,actual_leads,actual_calls,actual_quotes,actual_booked_jobs,actual_revenue,actual_direct_job_cost').gte('week_start', cutoffDate).order('week_start', { ascending: true }).range(from, to)),
        ]);
        if (cancelled) return;
        const [sessionRows, eventRows, visitorRows, leadRows, quoteRows, bookingRows, jobRows, invoiceRows, paymentRows, profileRows, callRows, dailyRows, streetRows, visitRows, goalRows, storefrontRows, subscriptionRows, planRows, customRows, virtualRows, campaignRows] = results;
        setSessions(sessionRows); setEvents(eventRows); setVisitors(visitorRows); setLeads(leadRows); setQuotes(quoteRows); setBookings(bookingRows); setJobs(jobRows); setInvoices(invoiceRows); setPayments(paymentRows); setProfiles(profileRows); setCalls(callRows); setD2dDaily(dailyRows); setD2dStreets(streetRows); setDoorVisits(visitRows); setGoals(goalRows); setStorefrontLeads(storefrontRows); setSubscriptions(subscriptionRows); setPlans(planRows); setCustomSubscriptions(customRows); setVirtualSessions(virtualRows); setCampaignPerformance(campaignRows); setWarnings(warningBag);
      } catch (error) {
        console.error('Analytics command center failed to load', error);
        toast({ title: 'Analytics could not load', description: error instanceof Error ? error.message : 'Unexpected analytics error.', variant: 'destructive' });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [navigate, previousStart, toast]);

  const publicSessions = useMemo(() => sessions.filter((row) => !row.is_internal && !row.is_bot), [sessions]);
  const publicEvents = useMemo(() => events.filter((row) => !row.is_internal && !row.is_bot && !row.is_test), [events]);
  const cleanVisitors = useMemo(() => visitors.filter((row) => !row.is_internal && !row.is_bot && !row.is_test), [visitors]);
  const cleanLeads = useMemo(() => leads.filter((row) => !row.is_test), [leads]);
  const cleanQuotes = useMemo(() => quotes.filter((row) => !row.is_test), [quotes]);
  const cleanBookings = useMemo(() => bookings.filter((row) => !row.is_test), [bookings]);
  const cleanJobs = useMemo(() => jobs.filter((row) => !row.is_test), [jobs]);
  const cleanInvoices = useMemo(() => invoices.filter((row) => !row.is_test), [invoices]);
  const cleanCalls = useMemo(() => calls.filter((row) => !row.is_test), [calls]);
  const cleanVirtual = useMemo(() => virtualSessions.filter((row) => !row.is_test), [virtualSessions]);

  const sessionById = useMemo(() => new Map(publicSessions.map((row) => [row.session_id, row])), [publicSessions]);
  const visitorById = useMemo(() => new Map(cleanVisitors.map((row) => [row.visitor_id, row])), [cleanVisitors]);
  const quoteById = useMemo(() => new Map(cleanQuotes.map((row) => [row.id, row])), [cleanQuotes]);
  const invoiceById = useMemo(() => new Map(cleanInvoices.map((row) => [row.id, row])), [cleanInvoices]);

  const quoteEvent = useMemo(() => {
    const map = new Map<string, AnyRow>();
    publicEvents.filter((row) => row.quote_id).sort((a, b) => new Date(a.occurred_at).getTime() - new Date(b.occurred_at).getTime()).forEach((row) => {
      if (!map.has(row.quote_id)) map.set(row.quote_id, row);
    });
    return map;
  }, [publicEvents]);
  const leadEvent = useMemo(() => {
    const map = new Map<string, AnyRow>();
    publicEvents.filter((row) => row.lead_id).sort((a, b) => new Date(a.occurred_at).getTime() - new Date(b.occurred_at).getTime()).forEach((row) => {
      if (!map.has(row.lead_id)) map.set(row.lead_id, row);
    });
    return map;
  }, [publicEvents]);

  const attributionForQuote = (quote: AnyRow) => {
    const event = quoteEvent.get(quote.id);
    const session = event?.session_id ? sessionById.get(event.session_id) : undefined;
    const details = quote.source_details && typeof quote.source_details === 'object' ? quote.source_details : {};
    return {
      linked: !!session,
      sessionId: session?.session_id || event?.session_id || null,
      source: session ? sourceFromSession(session) : String(event?.utm_source || event?.source || sourceFromQuote(quote)),
      landing: String(session?.landing_page || event?.page_path || details.landing_page || '(unlinked)'),
      campaign: String(session?.utm_campaign || event?.utm_campaign || details.utm_campaign || '(none)'),
      city: String(session?.detected_city || event?.city || details.city || 'Unknown'),
      device: String(session?.device_category || event?.device_category || 'Unknown'),
      visitorId: session?.visitor_id || event?.visitor_id || null,
    };
  };
  const attributionForLead = (lead: AnyRow) => {
    const event = leadEvent.get(lead.id);
    if (event) {
      const session = event.session_id ? sessionById.get(event.session_id) : undefined;
      return {
        linked: !!session,
        source: session ? sourceFromSession(session) : String(event.utm_source || event.source || lead.lead_source || 'Unknown'),
        landing: String(session?.landing_page || event.page_path || '(unlinked)'),
        campaign: String(session?.utm_campaign || event.utm_campaign || '(none)'),
        city: String(session?.detected_city || event.city || 'Unknown'),
        device: String(session?.device_category || event.device_category || 'Unknown'),
      };
    }
    if (lead.conversion_quote_id && quoteById.has(lead.conversion_quote_id)) return attributionForQuote(quoteById.get(lead.conversion_quote_id)!);
    return { linked: false, source: String(lead.lead_source || 'Unknown'), landing: '(unlinked)', campaign: '(none)', city: 'Unknown', device: 'Unknown' };
  };

  const serviceOptions = useMemo(() => Array.from(new Set(cleanQuotes.flatMap(quoteFamilies))).sort(), [cleanQuotes]);
  const sourceOptions = useMemo(() => Array.from(new Set(publicSessions.map(sourceFromSession))).sort(), [publicSessions]);
  const cityOptions = useMemo(() => Array.from(new Set(publicSessions.map((row) => String(row.detected_city || 'Unknown')))).sort(), [publicSessions]);
  const deviceOptions = useMemo(() => Array.from(new Set(publicSessions.map((row) => String(row.device_category || 'Unknown')))).sort(), [publicSessions]);
  const campaignOptions = useMemo(() => Array.from(new Set(publicSessions.map((row) => String(row.utm_campaign || '(none)')))).sort(), [publicSessions]);

  const sessionMatches = (session: AnyRow) => {
    if (filters.source !== 'All' && sourceFromSession(session) !== filters.source) return false;
    if (filters.city !== 'All' && String(session.detected_city || 'Unknown') !== filters.city) return false;
    if (filters.device !== 'All' && String(session.device_category || 'Unknown') !== filters.device) return false;
    if (filters.campaign !== 'All' && String(session.utm_campaign || '(none)') !== filters.campaign) return false;
    if (filters.service !== 'All' && pathService(session.landing_page) !== filters.service) return false;
    if (filters.customerType !== 'All') {
      const visitor = visitorById.get(session.visitor_id);
      const returning = (visitor?.session_count || 0) > 1 || (visitor?.first_seen && new Date(visitor.first_seen).getTime() < start.getTime());
      if (filters.customerType === 'New' && returning) return false;
      if (filters.customerType === 'Returning' && !returning) return false;
    }
    return true;
  };
  const attributionMatches = (attribution: { source: string; city: string; device: string; campaign: string }, families?: string[]) => {
    if (filters.source !== 'All' && attribution.source !== filters.source) return false;
    if (filters.city !== 'All' && attribution.city !== filters.city) return false;
    if (filters.device !== 'All' && attribution.device !== filters.device) return false;
    if (filters.campaign !== 'All' && attribution.campaign !== filters.campaign) return false;
    if (filters.service !== 'All' && families && !families.includes(filters.service)) return false;
    return true;
  };

  const currentSessions = useMemo(() => publicSessions.filter((row) => inWindow(row.first_visit, start, now) && sessionMatches(row)), [publicSessions, start, now, filters, visitorById]);
  const previousSessions = useMemo(() => publicSessions.filter((row) => inWindow(row.first_visit, previousStart, start)), [publicSessions, previousStart, start]);
  const currentLeads = useMemo(() => cleanLeads.filter((row) => inWindow(row.created_at, start, now) && attributionMatches(attributionForLead(row))), [cleanLeads, start, now, filters, leadEvent, sessionById, quoteById]);
  const currentQuotes = useMemo(() => cleanQuotes.filter((row) => inWindow(row.created_at, start, now) && attributionMatches(attributionForQuote(row), quoteFamilies(row))), [cleanQuotes, start, now, filters, quoteEvent, sessionById]);
  const previousQuotes = useMemo(() => cleanQuotes.filter((row) => inWindow(row.created_at, previousStart, start)), [cleanQuotes, previousStart, start]);
  const currentBookings = useMemo(() => cleanBookings.filter((row) => {
    if (!inWindow(row.created_at, start, now)) return false;
    const quote = row.quote_id ? quoteById.get(row.quote_id) : undefined;
    return quote ? attributionMatches(attributionForQuote(quote), quoteFamilies(quote)) : filters.source === 'All' && filters.city === 'All' && filters.device === 'All' && filters.service === 'All' && filters.campaign === 'All';
  }), [cleanBookings, start, now, filters, quoteById, quoteEvent, sessionById]);
  const previousBookings = useMemo(() => cleanBookings.filter((row) => inWindow(row.created_at, previousStart, start)), [cleanBookings, previousStart, start]);

  const paidItems = useMemo(() => {
    const rows: { amount: number; quote: AnyRow | undefined; linked: boolean }[] = [];
    payments.filter((row) => inWindow(row.processed_at || row.created_at, start, now) && PAID_STATUSES.has(normalize(row.status))).forEach((payment) => {
      const invoice = invoiceById.get(payment.invoice_id);
      const quote = invoice?.quote_id ? quoteById.get(invoice.quote_id) : undefined;
      if (quote && !attributionMatches(attributionForQuote(quote), quoteFamilies(quote))) return;
      rows.push({ amount: number(payment.amount), quote, linked: !!quote && attributionForQuote(quote).linked });
    });
    cleanInvoices.filter((invoice) => inWindow(invoice.payment_date, start, now) && PAID_STATUSES.has(normalize(invoice.status))).forEach((invoice) => {
      if (payments.some((payment) => payment.invoice_id === invoice.id && PAID_STATUSES.has(normalize(payment.status)))) return;
      const quote = invoice.quote_id ? quoteById.get(invoice.quote_id) : undefined;
      if (quote && !attributionMatches(attributionForQuote(quote), quoteFamilies(quote))) return;
      rows.push({ amount: number(invoice.total_amount), quote, linked: !!quote && attributionForQuote(quote).linked });
    });
    return rows;
  }, [payments, cleanInvoices, invoiceById, start, now, quoteById, filters, quoteEvent, sessionById]);

  const bookedRevenue = useMemo(() => currentBookings.reduce((sum, booking) => {
    const quote = booking.quote_id ? quoteById.get(booking.quote_id) : undefined;
    return sum + (number(booking.total_amount) || number(quote?.total_amount));
  }, 0), [currentBookings, quoteById]);
  const paidRevenue = useMemo(() => paidItems.reduce((sum, row) => sum + row.amount, 0), [paidItems]);
  const completedRevenue = useMemo(() => cleanJobs.filter((row) => inWindow(row.actual_end_time || row.updated_at, start, now) && normalize(row.status).includes('complete')).reduce((sum, job) => sum + number(quoteById.get(job.quote_id)?.total_amount), 0), [cleanJobs, start, now, quoteById]);
  const avgQuote = currentQuotes.length ? currentQuotes.reduce((sum, quote) => sum + number(quote.total_amount), 0) / currentQuotes.length : 0;
  const eligibleQuotes = currentQuotes.filter((quote) => quote.sent_at || !['draft', 'new', 'saved'].includes(normalize(quote.status)));
  const acceptedQuotes = currentQuotes.filter((quote) => ACCEPTED_QUOTE_STATUSES.has(normalize(quote.status)) || quote.approved_at || quote.converted_at || quote.booking_completed_at);
  const quoteCloseRate = eligibleQuotes.length ? acceptedQuotes.length / eligibleQuotes.length * 100 : 0;
  const visitorIds = new Set(currentSessions.map((row) => row.visitor_id || row.session_id).filter(Boolean));
  const visitorCount = visitorIds.size;
  const bookingRate = visitorCount ? currentBookings.length / visitorCount * 100 : 0;

  const newReturning = useMemo(() => {
    let returning = 0;
    let fresh = 0;
    const seen = new Set<string>();
    currentSessions.forEach((session) => {
      const id = session.visitor_id || session.session_id;
      if (!id || seen.has(id)) return;
      seen.add(id);
      const visitor = visitorById.get(session.visitor_id);
      const isReturning = (visitor?.session_count || 0) > 1 || (visitor?.first_seen && new Date(visitor.first_seen).getTime() < start.getTime());
      if (isReturning) returning += 1; else fresh += 1;
    });
    return { fresh, returning };
  }, [currentSessions, visitorById, start]);

  const responseSpeedMinutes = useMemo(() => currentLeads.map((lead) => {
    const quote = lead.conversion_quote_id ? quoteById.get(lead.conversion_quote_id) : undefined;
    if (!quote?.sent_at || !lead.created_at) return null;
    const minutes = (new Date(quote.sent_at).getTime() - new Date(lead.created_at).getTime()) / 60000;
    return minutes >= 0 ? minutes : null;
  }).filter((value): value is number => value !== null), [currentLeads, quoteById]);
  const acceptanceMinutes = useMemo(() => currentQuotes.map((quote) => {
    const acceptedAt = quote.approved_at || quote.converted_at || quote.booking_completed_at;
    if (!acceptedAt) return null;
    const minutes = (new Date(acceptedAt).getTime() - new Date(quote.created_at).getTime()) / 60000;
    return minutes >= 0 ? minutes : null;
  }).filter((value): value is number => value !== null), [currentQuotes]);

  const universalRows = useMemo(() => {
    const map = new Map<string, UniversalRow>();
    const get = (kind: UniversalRow['kind'], key: string) => {
      const id = `${kind}:${key}`;
      if (!map.has(id)) map.set(id, { key, kind, visitors: new Set(), sessions: 0, leads: 0, quotes: 0, bookings: 0, bookedRevenue: 0, paidRevenue: 0, linkedBookings: 0 });
      return map.get(id)!;
    };
    currentSessions.forEach((session) => {
      const visitor = session.visitor_id || session.session_id;
      const page = String(session.landing_page || '(unknown landing page)');
      const campaign = String(session.utm_campaign || '(none)');
      const pageRow = get('Page', page); pageRow.sessions += 1; if (visitor) pageRow.visitors.add(visitor);
      const campaignRow = get('Campaign', campaign); campaignRow.sessions += 1; if (visitor) campaignRow.visitors.add(visitor);
    });
    currentLeads.forEach((lead) => {
      const attr = attributionForLead(lead);
      get('Page', attr.landing).leads += 1;
      get('Campaign', attr.campaign).leads += 1;
    });
    currentQuotes.forEach((quote) => {
      const attr = attributionForQuote(quote);
      get('Page', attr.landing).quotes += 1;
      get('Campaign', attr.campaign).quotes += 1;
    });
    currentBookings.forEach((booking) => {
      const quote = booking.quote_id ? quoteById.get(booking.quote_id) : undefined;
      const attr = quote ? attributionForQuote(quote) : { landing: '(unlinked)', campaign: '(none)', linked: false } as any;
      const revenue = number(booking.total_amount) || number(quote?.total_amount);
      const pageRow = get('Page', attr.landing); pageRow.bookings += 1; pageRow.bookedRevenue += revenue; if (attr.linked) pageRow.linkedBookings += 1;
      const campaignRow = get('Campaign', attr.campaign); campaignRow.bookings += 1; campaignRow.bookedRevenue += revenue; if (attr.linked) campaignRow.linkedBookings += 1;
    });
    paidItems.forEach((item) => {
      const attr = item.quote ? attributionForQuote(item.quote) : { landing: '(unlinked)', campaign: '(none)' } as any;
      get('Page', attr.landing).paidRevenue += item.amount;
      get('Campaign', attr.campaign).paidRevenue += item.amount;
    });
    return Array.from(map.values()).sort((a, b) => (b.paidRevenue + b.bookedRevenue) - (a.paidRevenue + a.bookedRevenue) || b.visitors.size - a.visitors.size).slice(0, 30);
  }, [currentSessions, currentLeads, currentQuotes, currentBookings, paidItems, quoteById, quoteEvent, leadEvent, sessionById]);

  const sourceRows = useMemo(() => {
    const map = new Map<string, { source: string; sessions: number; visitors: Set<string>; leads: number; quotes: number; bookings: number; revenue: number; paid: number }>();
    const get = (source: string) => {
      if (!map.has(source)) map.set(source, { source, sessions: 0, visitors: new Set(), leads: 0, quotes: 0, bookings: 0, revenue: 0, paid: 0 });
      return map.get(source)!;
    };
    currentSessions.forEach((session) => { const row = get(sourceFromSession(session)); row.sessions += 1; if (session.visitor_id || session.session_id) row.visitors.add(session.visitor_id || session.session_id); });
    currentLeads.forEach((lead) => { get(attributionForLead(lead).source).leads += 1; });
    currentQuotes.forEach((quote) => { get(attributionForQuote(quote).source).quotes += 1; });
    currentBookings.forEach((booking) => { const quote = booking.quote_id ? quoteById.get(booking.quote_id) : undefined; const source = quote ? attributionForQuote(quote).source : 'Unknown'; const row = get(source); row.bookings += 1; row.revenue += number(booking.total_amount) || number(quote?.total_amount); });
    paidItems.forEach((item) => { get(item.quote ? attributionForQuote(item.quote).source : 'Unknown').paid += item.amount; });
    return Array.from(map.values()).sort((a, b) => b.paid + b.revenue - a.paid - a.revenue || b.sessions - a.sessions);
  }, [currentSessions, currentLeads, currentQuotes, currentBookings, paidItems, quoteById, quoteEvent, leadEvent, sessionById]);

  const serviceRows = useMemo(() => {
    const families = ['Window Cleaning', 'Pressure Washing', 'Gutter Cleaning', 'Roof Cleaning', 'House Washing', 'Fence Washing', 'Fleet Washing', 'Other / General'];
    return families.map((family) => {
      const visitors = new Set(currentSessions.filter((session) => pathService(session.landing_page) === family).map((session) => session.visitor_id || session.session_id).filter(Boolean));
      const familyQuotes = currentQuotes.filter((quote) => quoteFamilies(quote).includes(family));
      const quoteIds = new Set(familyQuotes.map((quote) => quote.id));
      const familyBookings = currentBookings.filter((booking) => booking.quote_id && quoteIds.has(booking.quote_id));
      const revenue = familyBookings.reduce((sum, booking) => sum + (number(booking.total_amount) || number(quoteById.get(booking.quote_id)?.total_amount)), 0);
      return { family, visitors: visitors.size, quotes: familyQuotes.length, bookings: familyBookings.length, revenue, closeRate: familyQuotes.length ? familyBookings.length / familyQuotes.length * 100 : 0 };
    }).filter((row) => row.visitors || row.quotes || row.bookings).sort((a, b) => b.revenue - a.revenue || b.visitors - a.visitors);
  }, [currentSessions, currentQuotes, currentBookings, quoteById]);

  const cityRows = useMemo(() => {
    const map = new Map<string, { city: string; visitors: Set<string>; quotes: number; bookings: number; revenue: number }>();
    const get = (city: string) => { if (!map.has(city)) map.set(city, { city, visitors: new Set(), quotes: 0, bookings: 0, revenue: 0 }); return map.get(city)!; };
    currentSessions.forEach((session) => { const row = get(String(session.detected_city || 'Unknown')); if (session.visitor_id || session.session_id) row.visitors.add(session.visitor_id || session.session_id); });
    currentQuotes.forEach((quote) => { get(attributionForQuote(quote).city).quotes += 1; });
    currentBookings.forEach((booking) => { const quote = booking.quote_id ? quoteById.get(booking.quote_id) : undefined; const city = quote ? attributionForQuote(quote).city : 'Unknown'; const row = get(city); row.bookings += 1; row.revenue += number(booking.total_amount) || number(quote?.total_amount); });
    return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue || b.visitors.size - a.visitors.size).slice(0, 12);
  }, [currentSessions, currentQuotes, currentBookings, quoteById, quoteEvent, sessionById]);

  const lostReasons = useMemo(() => {
    const map = new Map<string, number>();
    currentQuotes.forEach((quote) => {
      const status = normalize(quote.status);
      const reason = quote.rejected_reason || quote.cancellation_reason || (LOST_QUOTE_STATUSES.has(status) ? quote.customer_response || quote.customer_feedback || 'No reason captured' : null);
      if (reason) map.set(String(reason), (map.get(String(reason)) || 0) + 1);
    });
    doorVisits.filter((visit) => inWindow(visit.created_at, start, now) && visit.objection_reason).forEach((visit) => map.set(String(visit.objection_reason), (map.get(String(visit.objection_reason)) || 0) + 1));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [currentQuotes, doorVisits, start, now]);

  const callStats = useMemo(() => {
    const rows = cleanCalls.filter((row) => inWindow(row.attempted_at || row.created_at, start, now));
    const connected = rows.filter((row) => number(row.duration) > 0 || ['answered', 'completed', 'connected'].some((key) => normalize(row.status).includes(key) || normalize(row.outcome).includes(key)));
    return {
      calls: rows.length,
      connected: connected.length,
      avgDuration: connected.length ? connected.reduce((sum, row) => sum + number(row.duration), 0) / connected.length : 0,
      quoteSent: rows.filter((row) => row.quote_sent).length,
      voicemail: rows.filter((row) => row.voicemail_left).length,
    };
  }, [cleanCalls, start, now]);

  const d2dStats = useMemo(() => {
    const rows = d2dDaily.filter((row) => inWindow(`${row.stat_date}T12:00:00`, start, now));
    const doors = rows.reduce((sum, row) => sum + number(row.doors_logged), 0);
    const interested = rows.reduce((sum, row) => sum + number(row.interested_count), 0);
    const quoteCount = rows.reduce((sum, row) => sum + number(row.quotes_sent), 0);
    const booked = rows.reduce((sum, row) => sum + number(row.booked_count), 0);
    const pipeline = rows.reduce((sum, row) => sum + number(row.pipeline_value), 0);
    const hours = rows.reduce((sum, row) => {
      if (!row.first_log_at || !row.last_log_at) return sum;
      return sum + Math.max(0, (new Date(row.last_log_at).getTime() - new Date(row.first_log_at).getTime()) / 3600000);
    }, 0);
    return { doors, interested, quoteCount, booked, pipeline, hours, doorsPerHour: hours ? doors / hours : 0 };
  }, [d2dDaily, start, now]);

  const topStreets = useMemo(() => d2dStreets.filter((row) => number(row.knocks) >= 3).sort((a, b) => number(b.conversion_pct) - number(a.conversion_pct) || number(b.knocks) - number(a.knocks)).slice(0, 6), [d2dStreets]);

  const storefrontStats = useMemo(() => {
    const rows = storefrontLeads.filter((row) => inWindow(row.updated_at || row.created_at, start, now) && (filters.city === 'All' || String(row.city || 'Unknown') === filters.city));
    const contacted = rows.filter((row) => row.last_called_at || number(row.attempts) > 0).length;
    const interested = rows.filter((row) => ['interest', 'owner', 'callback', 'quote', 'warm'].some((key) => normalize(`${row.status} ${row.outcome}`).includes(key))).length;
    const quoted = rows.filter((row) => row.quote_id).length;
    const booked = rows.filter((row) => row.quote_id && ACCEPTED_QUOTE_STATUSES.has(normalize(quoteById.get(row.quote_id)?.status))).length;
    return { total: rows.length, contacted, interested, quoted, booked };
  }, [storefrontLeads, start, now, filters.city, quoteById]);

  const recurringStats = useMemo(() => {
    const planMap = new Map(plans.map((plan) => [plan.id, plan]));
    let mrr = 0;
    let active = 0;
    subscriptions.filter((row) => ['active', 'trialing'].includes(normalize(row.status))).forEach((row) => {
      const plan = planMap.get(row.plan_id) || {};
      const frequency = normalize(row.frequency);
      let raw = number(plan.price_monthly);
      if (frequency.includes('quarter')) raw = number(plan.price_quarterly) || number(plan.price_monthly) * 3;
      else if (frequency.includes('annual') || frequency.includes('year')) raw = number(plan.price_annually) || number(plan.price_monthly) * 12;
      mrr += monthlyAmount(raw, frequency);
      active += 1;
    });
    customSubscriptions.filter((row) => ['active', 'accepted', 'live'].includes(normalize(row.status))).forEach((row) => {
      const raw = number(row.recurring_amount) || number(row.price_monthly) || number(row.price_quarterly);
      mrr += monthlyAmount(raw, String(row.billing_frequency || row.cadence || (row.price_quarterly ? 'quarterly' : 'monthly')));
      active += 1;
    });
    const churned = [...subscriptions, ...customSubscriptions].filter((row) => ['cancelled', 'canceled', 'churned', 'expired'].includes(normalize(row.status)) && inWindow(row.updated_at, start, now)).length;
    const nextService = [...subscriptions, ...customSubscriptions].map((row) => row.next_service_date).filter(Boolean).sort()[0] || null;
    return { active, mrr, churned, nextService };
  }, [subscriptions, plans, customSubscriptions, start, now]);

  const customerValue = useMemo(() => {
    const real = profiles.filter((row) => number(row.quote_count) || number(row.booking_count) || number(row.paid_revenue));
    const paid = real.reduce((sum, row) => sum + number(row.paid_revenue), 0);
    const repeat = real.filter((row) => number(row.booking_count) > 1 || number(row.job_count) > 1).length;
    return {
      clients: real.length,
      paid,
      avgLifetime: real.length ? paid / real.length : 0,
      repeatRate: real.length ? repeat / real.length * 100 : 0,
      top: [...real].sort((a, b) => number(b.paid_revenue) - number(a.paid_revenue)).slice(0, 5),
    };
  }, [profiles]);

  const virtualStats = useMemo(() => {
    const rows = cleanVirtual.filter((row) => inWindow(row.created_at, start, now));
    const invited = rows.filter((row) => row.invite_status).length;
    const joined = rows.filter((row) => row.customer_last_seen || ['joined', 'active', 'in_progress', 'in-progress'].includes(normalize(row.status))).length;
    const callsStarted = rows.filter((row) => row.call_started_at || normalize(row.call_state).includes('call')).length;
    const completed = rows.filter((row) => row.call_ended_at || normalize(row.status).includes('complete')).length;
    const customerIds = new Set(rows.filter((row) => row.customer_id).map((row) => row.customer_id));
    const quotesAfter = cleanQuotes.filter((quote) => quote.customer_id && customerIds.has(quote.customer_id) && rows.some((session) => session.customer_id === quote.customer_id && new Date(quote.created_at).getTime() >= new Date(session.created_at).getTime())).length;
    return { sessions: rows.length, invited, joined, callsStarted, completed, quotesAfter };
  }, [cleanVirtual, cleanQuotes, start, now]);

  const campaignRows = useMemo(() => {
    const map = new Map<string, AnyRow>();
    campaignPerformance.filter((row) => inWindow(`${row.week_start}T12:00:00`, start, now)).forEach((row) => {
      const key = String(row.campaign_name || row.channel || 'Unlabeled campaign');
      const item = map.get(key) || { name: key, channel: row.channel || 'Unknown', spend: 0, sessions: 0, leads: 0, quotes: 0, booked: 0, revenue: 0, cost: 0, forecastLeads: 0 };
      item.spend += number(row.actual_ad_spend) + number(row.actual_lead_source_spend) + number(row.actual_calling_spend) + number(row.actual_software_spend) + number(row.actual_other_spend);
      item.sessions += number(row.actual_web_sessions); item.leads += number(row.actual_leads); item.quotes += number(row.actual_quotes); item.booked += number(row.actual_booked_jobs); item.revenue += number(row.actual_revenue); item.cost += number(row.actual_direct_job_cost); item.forecastLeads += number(row.forecast_leads);
      map.set(key, item);
    });
    return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue || b.spend - a.spend);
  }, [campaignPerformance, start, now]);

  const forecast = useMemo(() => {
    const eligible = cleanQuotes.filter((quote) => inWindow(quote.created_at, previousStart, now) && (quote.sent_at || !['draft', 'new', 'saved'].includes(normalize(quote.status))));
    const accepted = eligible.filter((quote) => ACCEPTED_QUOTE_STATUSES.has(normalize(quote.status)) || quote.approved_at || quote.converted_at || quote.booking_completed_at);
    const historicalClose = eligible.length ? accepted.length / eligible.length : 0;
    const open = cleanQuotes.filter((quote) => OPEN_PIPELINE_STATUSES.has(normalize(quote.status)) && attributionMatches(attributionForQuote(quote), quoteFamilies(quote)));
    const openValue = open.reduce((sum, quote) => sum + number(quote.total_amount), 0);
    return { historicalClose, openCount: open.length, openValue, weighted: openValue * historicalClose };
  }, [cleanQuotes, previousStart, now, filters, quoteEvent, sessionById]);

  const anomalyAlerts = useMemo(() => {
    const alerts: string[] = [];
    const currentTraffic = currentSessions.length;
    const previousTraffic = previousSessions.length;
    const trafficChange = previousTraffic ? (currentTraffic - previousTraffic) / previousTraffic : 0;
    if (previousTraffic >= 5 && trafficChange <= -0.35) alerts.push(`Traffic is down ${Math.abs(trafficChange * 100).toFixed(0)}% versus the previous ${rangeDays} days.`);
    if (previousTraffic >= 5 && trafficChange >= 0.5) alerts.push(`Traffic is up ${(trafficChange * 100).toFixed(0)}%; check whether leads and bookings are keeping pace.`);
    const currentRate = currentQuotes.length ? currentBookings.length / currentQuotes.length : 0;
    const previousRate = previousQuotes.length ? previousBookings.length / previousQuotes.length : 0;
    if (previousRate > 0 && currentRate < previousRate * 0.65) alerts.push(`Quote-to-booking performance is materially below the previous period.`);
    const unknownBookings = currentBookings.filter((booking) => {
      const quote = booking.quote_id ? quoteById.get(booking.quote_id) : undefined;
      return !quote || !attributionForQuote(quote).linked;
    }).length;
    if (currentBookings.length >= 3 && unknownBookings / currentBookings.length > 0.25) alerts.push(`${unknownBookings} of ${currentBookings.length} bookings are missing website-session attribution.`);
    if (warnings.length) alerts.push(`${warnings.length} analytics source${warnings.length === 1 ? '' : 's'} could not be read; those sections are marked by missing data.`);
    return alerts;
  }, [currentSessions, previousSessions, currentQuotes, previousQuotes, currentBookings, previousBookings, quoteById, quoteEvent, sessionById, warnings, rangeDays]);

  const today = new Date().toISOString().slice(0, 10);
  const todayD2d = d2dDaily.filter((row) => row.stat_date === today);
  const goal = goals[0];
  const todayDoors = todayD2d.reduce((sum, row) => sum + number(row.doors_logged), 0);
  const todayQuotes = todayD2d.reduce((sum, row) => sum + number(row.quotes_sent), 0);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-background"><RefreshCw className="mr-2 h-5 w-5 animate-spin" /> Loading analytics command center…</div>;

  const filterSelect = (label: string, value: string, options: string[], key: keyof FilterState) => (
    <label className="min-w-[150px] text-xs font-medium text-muted-foreground">
      <span className="mb-1 block">{label}</span>
      <select className="h-9 w-full rounded-md border bg-background px-2 text-sm text-foreground" value={value} onChange={(event: any) => setFilters((current) => ({ ...current, [key]: event.target.value }))}>
        <option>All</option>
        {options.filter((option) => option !== 'All').map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <Button variant="ghost" size="sm" className="-ml-3 mb-2" onClick={() => navigate('/crm')}><ArrowLeft className="mr-2 h-4 w-4" /> CRM</Button>
            <div className="flex items-center gap-3"><div className="rounded-xl bg-primary/10 p-2.5"><Gauge className="h-6 w-6 text-primary" /></div><div><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Analytics Command Center</h1><p className="text-sm text-muted-foreground">Traffic → leads → quotes → bookings → completed work → paid revenue, with field sales and campaign profitability.</p></div></div>
          </div>
          <div className="flex flex-wrap gap-2">
            {([7, 30, 90] as RangeDays[]).map((days) => <Button key={days} size="sm" variant={rangeDays === days ? 'default' : 'outline'} onClick={() => setRangeDays(days)}>{days}d</Button>)}
            <Button size="sm" variant="outline" onClick={() => navigate('/crm/analytics/website')}><BarChart3 className="mr-2 h-4 w-4" /> Website detail</Button>
            <Button size="sm" variant="outline" onClick={() => navigate('/crm/seo')}><Search className="mr-2 h-4 w-4" /> SEO / Search Console</Button>
          </div>
        </div>

        <Card><CardContent className="p-4"><div className="flex flex-wrap gap-3">{filterSelect('Source', filters.source, sourceOptions, 'source')}{filterSelect('City', filters.city, cityOptions, 'city')}{filterSelect('Device', filters.device, deviceOptions, 'device')}{filterSelect('Service', filters.service, serviceOptions, 'service')}{filterSelect('Campaign', filters.campaign, campaignOptions, 'campaign')}{filterSelect('Customer type', filters.customerType, ['New', 'Returning'], 'customerType')}<div className="flex items-end"><Button variant="ghost" size="sm" onClick={() => setFilters({ source: 'All', city: 'All', device: 'All', service: 'All', campaign: 'All', customerType: 'All' })}>Reset filters</Button></div></div></CardContent></Card>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8">
          <MetricCard label="Visitors" value={visitorCount.toLocaleString()} note={`${newReturning.fresh} new · ${newReturning.returning} returning`} icon={Users} />
          <MetricCard label="Leads" value={currentLeads.length.toLocaleString()} note={visitorCount ? `${percent(currentLeads.length / visitorCount * 100)} visitor → lead` : 'No visitor denominator'} icon={Target} />
          <MetricCard label="Quotes" value={currentQuotes.length.toLocaleString()} note={`${money(avgQuote)} average quote`} icon={WalletCards} />
          <MetricCard label="Bookings" value={currentBookings.length.toLocaleString()} note={`${percent(bookingRate)} of visitors`} icon={CalendarCheck} />
          <MetricCard label="Booked Revenue" value={money(bookedRevenue)} note="Booking total, fallback to quote total" icon={CircleDollarSign} />
          <MetricCard label="Completed Revenue" value={money(completedRevenue)} note="Completed jobs linked to quote value" icon={BriefcaseBusiness} />
          <MetricCard label="Paid Revenue" value={money(paidRevenue)} note="Verified invoice payment records" icon={BadgeDollarSign} />
          <MetricCard label="Quote Close Rate" value={percent(quoteCloseRate)} note={`${acceptedQuotes.length}/${eligibleQuotes.length || 0} eligible quotes accepted`} icon={TrendingUp} />
        </div>

        <Card><CardHeader><CardTitle>Full revenue funnel</CardTitle><CardDescription>One view from site traffic to verified cash. Paid revenue is never estimated.</CardDescription></CardHeader><CardContent><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">{[
          ['Visitors', visitorCount, visitorCount],
          ['Leads', currentLeads.length, visitorCount],
          ['Quotes', currentQuotes.length, currentLeads.length],
          ['Bookings', currentBookings.length, currentQuotes.length],
          ['Completed jobs', cleanJobs.filter((row) => inWindow(row.actual_end_time || row.updated_at, start, now) && normalize(row.status).includes('complete')).length, currentBookings.length],
          ['Paid invoices', paidItems.length, currentBookings.length],
        ].map(([label, value, denominator]) => <div key={String(label)} className="rounded-xl border bg-background p-4"><div className="text-xs text-muted-foreground">{label}</div><div className="mt-1 text-2xl font-bold">{Number(value).toLocaleString()}</div><div className="mt-1 text-xs text-muted-foreground">{label === 'Visitors' ? 'Starting point' : `${Number(denominator) ? (Number(value) / Number(denominator) * 100).toFixed(1) : '0.0'}% from prior step`}</div></div>)}</div></CardContent></Card>

        <Card><CardHeader><CardTitle>Page / campaign → revenue</CardTitle><CardDescription>The universal performance table. Revenue is attributed through quote/session links when available; unlinked sales stay visible instead of being silently assigned.</CardDescription></CardHeader><CardContent className="overflow-x-auto"><table className="w-full min-w-[1100px] text-sm"><thead><tr className="border-b text-left text-xs text-muted-foreground"><th className="pb-3">Dimension</th><th className="pb-3">Page / campaign</th><th className="pb-3 text-right">Visitors</th><th className="pb-3 text-right">Leads</th><th className="pb-3 text-right">Quotes</th><th className="pb-3 text-right">Bookings</th><th className="pb-3 text-right">Booked $</th><th className="pb-3 text-right">Paid $</th><th className="pb-3 text-right">Booking conv.</th><th className="pb-3 text-right">$/visitor</th><th className="pb-3 text-right">Confidence</th></tr></thead><tbody>{universalRows.map((row) => <tr key={`${row.kind}-${row.key}`} className="border-b last:border-0"><td className="py-3"><Badge variant="outline">{row.kind}</Badge></td><td className="max-w-[300px] truncate py-3 font-medium" title={row.key}>{row.key}</td><td className="py-3 text-right">{row.visitors.size}</td><td className="py-3 text-right">{row.leads}</td><td className="py-3 text-right">{row.quotes}</td><td className="py-3 text-right">{row.bookings}</td><td className="py-3 text-right">{money(row.bookedRevenue)}</td><td className="py-3 text-right">{money(row.paidRevenue)}</td><td className="py-3 text-right">{row.visitors.size ? percent(row.bookings / row.visitors.size * 100) : '—'}</td><td className="py-3 text-right">{row.visitors.size ? money(row.bookedRevenue / row.visitors.size) : '—'}</td><td className="py-3 text-right"><Badge variant={confidenceFor(row) === 'Verified' ? 'default' : 'secondary'}>{confidenceFor(row)}</Badge></td></tr>)}</tbody></table>{!universalRows.length && <p className="py-8 text-center text-sm text-muted-foreground">No rows match these filters.</p>}</CardContent></Card>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card><CardHeader><CardTitle>Revenue attribution by source</CardTitle><CardDescription>Sessions, sales and verified paid revenue by acquisition source.</CardDescription></CardHeader><CardContent className="overflow-x-auto"><table className="w-full min-w-[720px] text-sm"><thead><tr className="border-b text-xs text-muted-foreground"><th className="pb-2 text-left">Source</th><th className="pb-2 text-right">Sessions</th><th className="pb-2 text-right">Leads</th><th className="pb-2 text-right">Quotes</th><th className="pb-2 text-right">Bookings</th><th className="pb-2 text-right">Booked $</th><th className="pb-2 text-right">Paid $</th></tr></thead><tbody>{sourceRows.map((row) => <tr key={row.source} className="border-b last:border-0"><td className="py-2 font-medium">{row.source}</td><td className="py-2 text-right">{row.sessions}</td><td className="py-2 text-right">{row.leads}</td><td className="py-2 text-right">{row.quotes}</td><td className="py-2 text-right">{row.bookings}</td><td className="py-2 text-right">{money(row.revenue)}</td><td className="py-2 text-right">{money(row.paid)}</td></tr>)}</tbody></table></CardContent></Card>
          <Card><CardHeader><CardTitle>Service performance</CardTitle><CardDescription>Traffic, quotes, close rate and booked revenue by service family.</CardDescription></CardHeader><CardContent className="overflow-x-auto"><table className="w-full min-w-[620px] text-sm"><thead><tr className="border-b text-xs text-muted-foreground"><th className="pb-2 text-left">Service</th><th className="pb-2 text-right">Visitors</th><th className="pb-2 text-right">Quotes</th><th className="pb-2 text-right">Bookings</th><th className="pb-2 text-right">Close</th><th className="pb-2 text-right">Revenue</th></tr></thead><tbody>{serviceRows.map((row) => <tr key={row.family} className="border-b last:border-0"><td className="py-2 font-medium">{row.family}</td><td className="py-2 text-right">{row.visitors}</td><td className="py-2 text-right">{row.quotes}</td><td className="py-2 text-right">{row.bookings}</td><td className="py-2 text-right">{percent(row.closeRate)}</td><td className="py-2 text-right">{money(row.revenue)}</td></tr>)}</tbody></table></CardContent></Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-4 w-4" /> City performance</CardTitle><CardDescription>Detected visitor city plus sales linked back to those sessions.</CardDescription></CardHeader><CardContent>{cityRows.map((row) => <div key={row.city} className="grid grid-cols-[minmax(0,1fr)_70px_70px_90px] gap-2 border-b py-3 text-sm last:border-0"><span className="truncate font-medium">{row.city}</span><span className="text-right text-muted-foreground">{row.visitors.size} users</span><span className="text-right text-muted-foreground">{row.bookings} booked</span><span className="text-right font-medium">{money(row.revenue)}</span></div>)}{!cityRows.length && <p className="py-6 text-center text-sm text-muted-foreground">No city data.</p>}</CardContent></Card>
          <Card><CardHeader><CardTitle>Quote performance</CardTitle><CardDescription>Acceptance, speed and loss signals from quote records.</CardDescription></CardHeader><CardContent><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Average quote</div><div className="mt-1 text-xl font-bold">{money(avgQuote)}</div></div><div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Accepted / eligible</div><div className="mt-1 text-xl font-bold">{acceptedQuotes.length} / {eligibleQuotes.length}</div></div><div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Median lead → quote sent</div><div className="mt-1 text-xl font-bold">{responseSpeedMinutes.length ? `${Math.round(median(responseSpeedMinutes))} min` : '—'}</div></div><div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Median quote → accepted</div><div className="mt-1 text-xl font-bold">{acceptanceMinutes.length ? `${Math.round(median(acceptanceMinutes) / 60)} hr` : '—'}</div></div></div><div className="mt-4"><div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Lost / objection reasons</div>{lostReasons.map(([reason, count]) => <div key={reason} className="flex items-center justify-between border-b py-2 text-sm last:border-0"><span className="max-w-[420px] truncate">{reason}</span><Badge variant="secondary">{count}</Badge></div>)}{!lostReasons.length && <p className="text-sm text-muted-foreground">No loss reasons captured in this period.</p>}</div></CardContent></Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><Phone className="h-4 w-4" /> Call analytics</CardTitle><CardDescription>Inbound/outbound call outcomes in this period.</CardDescription></CardHeader><CardContent className="grid grid-cols-2 gap-3"><div><div className="text-xs text-muted-foreground">Calls</div><div className="text-xl font-bold">{callStats.calls}</div></div><div><div className="text-xs text-muted-foreground">Connected</div><div className="text-xl font-bold">{callStats.connected}</div></div><div><div className="text-xs text-muted-foreground">Avg duration</div><div className="text-xl font-bold">{Math.round(callStats.avgDuration)}s</div></div><div><div className="text-xs text-muted-foreground">Quotes sent</div><div className="text-xl font-bold">{callStats.quoteSent}</div></div><div><div className="text-xs text-muted-foreground">Voicemails</div><div className="text-xl font-bold">{callStats.voicemail}</div></div><div><div className="text-xs text-muted-foreground">Quote / call</div><div className="text-xl font-bold">{callStats.calls ? percent(callStats.quoteSent / callStats.calls * 100) : '0.0%'}</div></div></CardContent></Card>
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><Store className="h-4 w-4" /> Storefront outreach</CardTitle><CardDescription>Lead list → contact → interest → quote → booked.</CardDescription></CardHeader><CardContent><div className="space-y-2">{[['Businesses', storefrontStats.total], ['Contacted', storefrontStats.contacted], ['Interested / warm', storefrontStats.interested], ['Quoted', storefrontStats.quoted], ['Booked', storefrontStats.booked]].map(([label, value]) => <div key={String(label)} className="flex items-center justify-between border-b py-2 text-sm last:border-0"><span>{label}</span><strong>{value}</strong></div>)}</div></CardContent></Card>
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><Video className="h-4 w-4" /> Virtual Estimate</CardTitle><CardDescription>Invite and call funnel plus quote follow-through.</CardDescription></CardHeader><CardContent><div className="space-y-2">{[['Sessions', virtualStats.sessions], ['Invited', virtualStats.invited], ['Customer joined', virtualStats.joined], ['Calls started', virtualStats.callsStarted], ['Calls completed', virtualStats.completed], ['Quotes after session', virtualStats.quotesAfter]].map(([label, value]) => <div key={String(label)} className="flex items-center justify-between border-b py-2 text-sm last:border-0"><span>{label}</span><strong>{value}</strong></div>)}</div></CardContent></Card>
        </div>

        <Card><CardHeader><CardTitle className="flex items-center gap-2"><Route className="h-4 w-4" /> D2D field performance</CardTitle><CardDescription>Door activity, conversion and pipeline. Street conversion ranking uses the existing all-time street stats view.</CardDescription></CardHeader><CardContent><div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-7"><div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Doors</div><div className="text-xl font-bold">{d2dStats.doors}</div></div><div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Interested</div><div className="text-xl font-bold">{d2dStats.interested}</div></div><div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Quotes</div><div className="text-xl font-bold">{d2dStats.quoteCount}</div></div><div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Booked</div><div className="text-xl font-bold">{d2dStats.booked}</div></div><div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Pipeline</div><div className="text-xl font-bold">{money(d2dStats.pipeline)}</div></div><div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Doors / hr</div><div className="text-xl font-bold">{d2dStats.doorsPerHour.toFixed(1)}</div></div><div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Door → booked</div><div className="text-xl font-bold">{d2dStats.doors ? percent(d2dStats.booked / d2dStats.doors * 100) : '0.0%'}</div></div></div><div className="mt-5 grid gap-4 xl:grid-cols-2"><div><div className="mb-2 text-sm font-semibold">Best streets / times</div>{topStreets.map((row, index) => <div key={`${row.street_name}-${row.hour_of_day}-${index}`} className="grid grid-cols-[minmax(0,1fr)_70px_70px_70px] gap-2 border-b py-2 text-sm last:border-0"><span className="truncate">{row.street_name || 'Unknown street'}</span><span className="text-right">{row.hour_of_day}:00</span><span className="text-right">{row.knocks} knocks</span><span className="text-right font-medium">{percent(number(row.conversion_pct))}</span></div>)}</div><div><div className="mb-2 text-sm font-semibold">Today vs D2D goal</div>{goal ? <div className="space-y-3"><div><div className="mb-1 flex justify-between text-xs"><span>Doors</span><span>{todayDoors} / {number(goal.daily_door_goal)}</span></div><div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${Math.min(100, number(goal.daily_door_goal) ? todayDoors / number(goal.daily_door_goal) * 100 : 0)}%` }} /></div></div><div><div className="mb-1 flex justify-between text-xs"><span>Quotes</span><span>{todayQuotes} / {number(goal.daily_quote_goal)}</span></div><div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${Math.min(100, number(goal.daily_quote_goal) ? todayQuotes / number(goal.daily_quote_goal) * 100 : 0)}%` }} /></div></div><p className="text-xs text-muted-foreground">Streak {goal.current_streak_days || 0}d · Best {goal.longest_streak_days || 0}d</p></div> : <p className="text-sm text-muted-foreground">No D2D goal is configured.</p>}</div></div></CardContent></Card>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><Megaphone className="h-4 w-4" /> Campaign & ad profitability</CardTitle><CardDescription>Uses your stored actual spend and revenue—not ad-platform conversion estimates.</CardDescription></CardHeader><CardContent className="overflow-x-auto"><table className="w-full min-w-[760px] text-sm"><thead><tr className="border-b text-xs text-muted-foreground"><th className="pb-2 text-left">Campaign</th><th className="pb-2 text-right">Spend</th><th className="pb-2 text-right">Leads</th><th className="pb-2 text-right">Booked</th><th className="pb-2 text-right">Revenue</th><th className="pb-2 text-right">ROAS</th></tr></thead><tbody>{campaignRows.map((row) => <tr key={row.name} className="border-b last:border-0"><td className="py-2"><div className="font-medium">{row.name}</div><div className="text-xs text-muted-foreground">{row.channel}</div></td><td className="py-2 text-right">{money(row.spend)}</td><td className="py-2 text-right">{row.leads}</td><td className="py-2 text-right">{row.booked}</td><td className="py-2 text-right">{money(row.revenue)}</td><td className="py-2 text-right font-medium">{row.spend ? `${(row.revenue / row.spend).toFixed(2)}×` : '—'}</td></tr>)}</tbody></table>{!campaignRows.length && <p className="py-6 text-center text-sm text-muted-foreground">No campaign performance rows in this period.</p>}</CardContent></Card>
          <Card><CardHeader><CardTitle>Recurring & customer value</CardTitle><CardDescription>Active recurring revenue plus lifetime customer performance.</CardDescription></CardHeader><CardContent><div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Active plans</div><div className="text-xl font-bold">{recurringStats.active}</div></div><div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Tracked MRR</div><div className="text-xl font-bold">{money(recurringStats.mrr)}</div></div><div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Avg lifetime paid</div><div className="text-xl font-bold">{money(customerValue.avgLifetime)}</div></div><div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Repeat customer rate</div><div className="text-xl font-bold">{percent(customerValue.repeatRate)}</div></div></div><div className="mt-4"><div className="mb-2 text-sm font-semibold">Top lifetime customers</div>{customerValue.top.map((row) => <div key={row.id} className="flex items-center justify-between border-b py-2 text-sm last:border-0"><span className="truncate">{row.name || 'Unnamed client'}</span><span className="font-medium">{money(number(row.paid_revenue))}</span></div>)}{!customerValue.top.length && <p className="text-sm text-muted-foreground">No paid customer history yet.</p>}</div></CardContent></Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <Card><CardHeader><CardTitle>Pipeline forecast</CardTitle><CardDescription>Weighted from your real historical eligible-quote close rate.</CardDescription></CardHeader><CardContent><div className="text-3xl font-bold">{money(forecast.weighted)}</div><p className="mt-1 text-sm text-muted-foreground">Weighted expected value from {money(forecast.openValue)} across {forecast.openCount} qualified open quotes.</p><div className="mt-4 text-xs text-muted-foreground">Historical eligible-quote close rate: <strong className="text-foreground">{percent(forecast.historicalClose * 100)}</strong></div></CardContent></Card>
          <Card><CardHeader><CardTitle>Automated anomaly checks</CardTitle><CardDescription>Actionable changes versus the previous matching period.</CardDescription></CardHeader><CardContent className="space-y-2">{anomalyAlerts.map((alert) => <div key={alert} className="rounded-lg border bg-background p-3 text-sm">{alert}</div>)}{!anomalyAlerts.length && <div className="rounded-lg border bg-background p-3 text-sm text-muted-foreground">No major anomalies detected with the current thresholds.</div>}</CardContent></Card>
          <Card><CardHeader><CardTitle>Data confidence</CardTitle><CardDescription>Know which numbers are real cash, attributed sales, or estimates.</CardDescription></CardHeader><CardContent className="space-y-3 text-sm"><div className="flex items-center justify-between"><span>Verified</span><Badge>Paid invoice/payment</Badge></div><div className="flex items-center justify-between"><span>Attributed</span><Badge variant="secondary">Booking ↔ quote ↔ session</Badge></div><div className="flex items-center justify-between"><span>Estimated</span><Badge variant="outline">Quote/booked value only</Badge></div><div className="flex items-center justify-between"><span>Unknown source</span><Badge variant="destructive">Not silently reassigned</Badge></div><div className="border-t pt-3 text-xs text-muted-foreground">{currentBookings.length ? `${currentBookings.filter((booking) => { const quote = booking.quote_id ? quoteById.get(booking.quote_id) : undefined; return quote && attributionForQuote(quote).linked; }).length}/${currentBookings.length} current bookings have direct session attribution.` : 'No bookings in this filtered period.'}</div></CardContent></Card>
        </div>

        <Card><CardHeader><CardTitle>SEO & search visibility</CardTitle><CardDescription>Your existing Google Search Console integration already tracks queries, impressions, clicks, CTR, position, landing pages and URL indexing. It remains the source of truth for SEO.</CardDescription></CardHeader><CardContent><Button onClick={() => navigate('/crm/seo')}><Search className="mr-2 h-4 w-4" /> Open Search Console analytics <ExternalLink className="ml-2 h-4 w-4" /></Button></CardContent></Card>

        <Card><CardHeader><CardTitle>Website behavior drill-down</CardTitle><CardDescription>Open the existing detailed page analytics for most-recent page views, paired service/city pages, CTAs, visitor journeys, tracking diagnostics and CSV export.</CardDescription></CardHeader><CardContent><Button variant="outline" onClick={() => navigate('/crm/analytics/website')}><Activity className="mr-2 h-4 w-4" /> Open website analytics</Button></CardContent></Card>
      </div>
    </div>
  );
}
