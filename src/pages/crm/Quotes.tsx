import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { MagicLinkLogin } from '@/components/auth/MagicLinkLogin';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  DollarSign,
  FileText,
  Mail,
  Receipt,
  RefreshCw,
  Search,
  ShieldCheck,
  UserRound,
  WalletCards,
} from 'lucide-react';

type Quote = {
  id: string;
  customer_id: string | null;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  property_address: string | null;
  business_name: string | null;
  status: string;
  services: unknown;
  add_ons: unknown;
  products: unknown;
  services_subtotal: number | string;
  products_subtotal: number | string;
  discount_amount: number | string | null;
  travel_surcharge: number | string | null;
  gst_amount: number | string;
  pst_amount: number | string;
  total_amount: number | string;
  sent_to_customer_at: string | null;
  last_email_sent_at: string | null;
  email_delivery_status: string | null;
  opened: boolean | null;
  opened_at: string | null;
  viewed_at: string | null;
  approved_at: string | null;
  follow_up_at: string | null;
  internal_notes: string | null;
  source: string | null;
  channel: string | null;
  is_test: boolean;
  created_at: string;
  updated_at: string;
};

type FollowUp = {
  id: string;
  source_id: string;
  quote_id: string | null;
  customer_id: string | null;
  rule_key: string;
  due_at: string;
  status: string;
  priority: number;
  automatic: boolean;
  title: string;
  reason: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  address: string | null;
  value_estimate: number | string | null;
};

type Invoice = {
  id: string;
  quote_id: string | null;
  customer_id: string;
  invoice_number: string;
  invoice_date: string;
  due_date: string | null;
  total_amount: number | string;
  status: string;
  sent_at: string | null;
  payment_date: string | null;
  email_delivery_status: string | null;
};

type ReceiptRow = {
  id: string;
  quote_id: string | null;
  customer_id: string | null;
  customer_name: string;
  receipt_number: string;
  receipt_date: string;
  total_amount: number | string;
  payment_method: string | null;
};

type Plan = {
  id: string;
  customer_id: string | null;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  address: string | null;
  plan_title: string | null;
  service_description: string;
  service_types: string[] | null;
  status: string;
  cadence: string | null;
  billing_frequency: string;
  one_time_amount: number | string | null;
  recurring_amount: number | string | null;
  discount_percent: number | string | null;
  next_service_date: string | null;
  email_sent_at: string | null;
  accepted_at: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
  updated_at: string;
};

type WorkspaceTab = 'quotes' | 'followups' | 'finance' | 'plans';

const QUOTE_STATUSES = [
  'draft',
  'unfinished',
  'saved',
  'sent',
  'viewed',
  'revised',
  'approved',
  'declined',
  'booked',
  'completed',
  'cancelled',
  'expired',
  'superseded',
] as const;

const PLAN_STATUSES = ['draft', 'sent', 'viewed', 'accepted', 'active', 'paused', 'cancelled', 'expired'];

const PLACEHOLDER_NAMES = new Set([
  'website visitor',
  'website customer',
  'visitor',
  'guest',
  'anonymous',
  'anonymous visitor',
  'commercial lead',
  'lead',
  'customer',
  'client',
  'quote lead',
]);

const money = (value: number | string | null | undefined) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(Number(value || 0));

const formatDateTime = (value: string | null | undefined) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' });
};

const formatDate = (value: string | null | undefined) => {
  if (!value) return '—';
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString('en-CA', { dateStyle: 'medium' });
};

const statusClass = (status: string) => {
  switch (status) {
    case 'approved':
    case 'active':
    case 'completed':
    case 'paid':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'viewed':
    case 'sent':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'declined':
    case 'cancelled':
    case 'expired':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'booked':
      return 'bg-violet-100 text-violet-800 border-violet-200';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const isAnonymousSession = (quote: Quote) => {
  const name = (quote.customer_name || '').trim().toLowerCase();
  const placeholder = PLACEHOLDER_NAMES.has(name) || /^client( \d{4})?$/.test(name) || name.length < 2;
  return placeholder && !quote.customer_email?.trim() && !quote.customer_phone?.replace(/\D/g, '');
};

const serviceSummary = (value: unknown) => {
  if (!Array.isArray(value) || value.length === 0) return 'No services listed';
  return value
    .slice(0, 3)
    .map((item) => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object') {
        const record = item as Record<string, unknown>;
        return String(record.name || record.service || record.label || record.type || 'Service');
      }
      return 'Service';
    })
    .join(', ');
};

const toDateTimeLocal = (value: string | null) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const Quotes = ({ initialTab = 'quotes' as WorkspaceTab }) => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tab, setTab] = useState<WorkspaceTab>(initialTab);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [receipts, setReceipts] = useState<ReceiptRow[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('active');
  const [showAnonymous, setShowAnonymous] = useState(false);
  const [expandedQuote, setExpandedQuote] = useState<string | null>(null);
  const [followUpDraft, setFollowUpDraft] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const tables = useMemo(
    () => ({
      quotes: supabase.from('quotes') as any,
      followups: supabase.from('sales_follow_up_tasks') as any,
      invoices: supabase.from('invoices') as any,
      receipts: supabase.from('receipts') as any,
      plans: supabase.from('admin_custom_subscriptions') as any,
    }),
    [],
  );

  const checkAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setAuthorized(false);
      setLoading(false);
      return false;
    }

    const { data, error } = await (supabase as any).rpc('is_admin', {});
    const allowed = !error && data === true;
    setAuthorized(allowed);
    if (!allowed) setLoading(false);
    return allowed;
  };

  const loadWorkspace = async (quiet = false) => {
    if (!quiet) setLoading(true);
    else setRefreshing(true);

    const [quoteResult, followUpResult, invoiceResult, receiptResult, planResult] = await Promise.all([
      tables.quotes
        .select('id,customer_id,customer_name,customer_email,customer_phone,property_address,business_name,status,services,add_ons,products,services_subtotal,products_subtotal,discount_amount,travel_surcharge,gst_amount,pst_amount,total_amount,sent_to_customer_at,last_email_sent_at,email_delivery_status,opened,opened_at,viewed_at,approved_at,follow_up_at,internal_notes,source,channel,is_test,created_at,updated_at')
        .eq('is_test', false)
        .order('updated_at', { ascending: false })
        .limit(500),
      tables.followups
        .select('id,source_id,quote_id,customer_id,rule_key,due_at,status,priority,automatic,title,reason,contact_name,contact_phone,contact_email,address,value_estimate')
        .eq('source_type', 'quote')
        .order('due_at', { ascending: true })
        .limit(300),
      tables.invoices
        .select('id,quote_id,customer_id,invoice_number,invoice_date,due_date,total_amount,status,sent_at,payment_date,email_delivery_status')
        .order('created_at', { ascending: false })
        .limit(300),
      tables.receipts
        .select('id,quote_id,customer_id,customer_name,receipt_number,receipt_date,total_amount,payment_method')
        .order('created_at', { ascending: false })
        .limit(300),
      tables.plans
        .select('id,customer_id,customer_name,customer_email,customer_phone,address,plan_title,service_description,service_types,status,cadence,billing_frequency,one_time_amount,recurring_amount,discount_percent,next_service_date,email_sent_at,accepted_at,stripe_subscription_id,created_at,updated_at')
        .order('updated_at', { ascending: false })
        .limit(300),
    ]);

    const firstError = quoteResult.error || followUpResult.error || invoiceResult.error || receiptResult.error || planResult.error;
    if (firstError) {
      toast({ title: 'Could not load sales workspace', description: firstError.message, variant: 'destructive' });
    }

    setQuotes((quoteResult.data || []) as Quote[]);
    setFollowUps((followUpResult.data || []) as FollowUp[]);
    setInvoices((invoiceResult.data || []) as Invoice[]);
    setReceipts((receiptResult.data || []) as ReceiptRow[]);
    setPlans((planResult.data || []) as Plan[]);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    void (async () => {
      if (await checkAccess()) await loadWorkspace();
    })();
  }, []);

  useEffect(() => {
    if (!expandedQuote || tab !== 'quotes') return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(`quote-${expandedQuote}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [expandedQuote, tab]);

  const anonymousCount = useMemo(() => quotes.filter(isAnonymousSession).length, [quotes]);
  const realQuotes = useMemo(() => quotes.filter((quote) => !isAnonymousSession(quote)), [quotes]);
  const openFollowUps = useMemo(() => followUps.filter((item) => item.status === 'open'), [followUps]);
  const overdueFollowUps = useMemo(
    () => openFollowUps.filter((item) => new Date(item.due_at).getTime() < Date.now()),
    [openFollowUps],
  );
  const activeQuotes = useMemo(
    () => realQuotes.filter((quote) => ['sent', 'viewed', 'approved'].includes(quote.status)),
    [realQuotes],
  );
  const pipelineValue = useMemo(
    () => activeQuotes.reduce((sum, quote) => sum + Number(quote.total_amount || 0), 0),
    [activeQuotes],
  );

  const filteredQuotes = useMemo(() => {
    const term = search.trim().toLowerCase();
    return quotes.filter((quote) => {
      if (!showAnonymous && isAnonymousSession(quote)) return false;
      if (statusFilter === 'active' && !['sent', 'viewed', 'approved'].includes(quote.status)) return false;
      if (statusFilter !== 'all' && statusFilter !== 'active' && quote.status !== statusFilter) return false;
      if (!term) return true;
      return [quote.customer_name, quote.customer_email, quote.customer_phone, quote.property_address, quote.business_name, quote.status]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term));
    });
  }, [quotes, showAnonymous, statusFilter, search]);

  const updateQuote = async (quote: Quote, patch: Record<string, unknown>, successTitle: string) => {
    if (patch.status === 'approved' && quote.status !== 'approved') {
      const confirmed = window.confirm('Approve this quote? Approval automatically creates or refreshes the linked receipt.');
      if (!confirmed) return;
    }

    setSavingId(quote.id);
    const { error } = await tables.quotes.update(patch).eq('id', quote.id);
    setSavingId(null);
    if (error) {
      toast({ title: 'Quote update failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: successTitle, description: quote.customer_name || quote.property_address || quote.id });
    await loadWorkspace(true);
  };

  const saveFollowUp = async (quote: Quote) => {
    const localValue = followUpDraft[quote.id] ?? toDateTimeLocal(quote.follow_up_at);
    if (!localValue) {
      await updateQuote(quote, { follow_up_at: null, follow_up_date: null, follow_up_period: null }, 'Follow-up cleared');
      return;
    }
    const date = new Date(localValue);
    if (Number.isNaN(date.getTime())) {
      toast({ title: 'Choose a valid follow-up date', variant: 'destructive' });
      return;
    }
    await updateQuote(
      quote,
      {
        follow_up_at: date.toISOString(),
        follow_up_date: date.toISOString().slice(0, 10),
        follow_up_period: date.toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' }),
      },
      'Follow-up scheduled',
    );
  };

  const openQuoteFromRelated = (quoteId: string | null | undefined) => {
    if (!quoteId) {
      toast({ title: 'This record is not linked to a quote yet', variant: 'destructive' });
      return;
    }
    setSearch('');
    setStatusFilter('all');
    setShowAnonymous(true);
    setExpandedQuote(quoteId);
    setTab('quotes');
  };

  const runFollowUpAction = async (item: FollowUp, action: 'done' | 'lost' | 'booked') => {
    setSavingId(item.id);
    const { error } = await (supabase as any).rpc('admin_follow_up_action', {
      p_task_id: item.id,
      p_action: action,
      p_due_at: null,
      p_note: null,
    });
    setSavingId(null);
    if (error) {
      toast({ title: 'Follow-up update failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: action === 'done' ? 'Follow-up completed' : action === 'booked' ? 'Marked booked' : 'Marked lost' });
    await loadWorkspace(true);
  };

  const updatePlan = async (plan: Plan, patch: Record<string, unknown>, label: string) => {
    setSavingId(plan.id);
    const { error } = await tables.plans.update(patch).eq('id', plan.id);
    setSavingId(null);
    if (error) {
      toast({ title: 'Plan update failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: label, description: plan.plan_title || plan.customer_name });
    await loadWorkspace(true);
  };

  if (authorized === false) {
    return (
      <div className="min-h-screen bg-muted/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" /> Admin access required</CardTitle>
          </CardHeader>
          <CardContent>
            <MagicLinkLogin />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading || authorized === null) {
    return <div className="min-h-screen flex items-center justify-center"><RefreshCw className="h-7 w-7 animate-spin" /></div>;
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/crm')} aria-label="Back to CRM">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Quotes & Sales</h1>
              <p className="text-xs text-muted-foreground">One source of truth from quote to plan</p>
            </div>
          </div>
          <Button variant="outline" size="sm" disabled={refreshing} onClick={() => void loadWorkspace(true)}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </header>

      <main className="container mx-auto space-y-5 px-4 py-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-xs text-muted-foreground">Active quotes</p><p className="text-2xl font-bold">{activeQuotes.length}</p></div><FileText className="h-5 w-5 text-muted-foreground" /></div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-xs text-muted-foreground">Pipeline</p><p className="text-2xl font-bold">{money(pipelineValue)}</p></div><DollarSign className="h-5 w-5 text-muted-foreground" /></div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-xs text-muted-foreground">Overdue follow-ups</p><p className="text-2xl font-bold">{overdueFollowUps.length}</p></div><CalendarClock className="h-5 w-5 text-muted-foreground" /></div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-xs text-muted-foreground">Anonymous sessions</p><p className="text-2xl font-bold">{anonymousCount}</p></div><UserRound className="h-5 w-5 text-muted-foreground" /></div></CardContent></Card>
        </div>

        <Tabs value={tab} onValueChange={(value) => setTab(value as WorkspaceTab)}>
          <TabsList className="grid h-auto w-full grid-cols-2 gap-1 sm:grid-cols-4">
            <TabsTrigger value="quotes"><FileText className="mr-2 h-4 w-4" />Quotes</TabsTrigger>
            <TabsTrigger value="followups"><CalendarClock className="mr-2 h-4 w-4" />Follow-ups ({openFollowUps.length})</TabsTrigger>
            <TabsTrigger value="finance"><Receipt className="mr-2 h-4 w-4" />Invoices & receipts</TabsTrigger>
            <TabsTrigger value="plans"><WalletCards className="mr-2 h-4 w-4" />Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="quotes" className="mt-4 space-y-4">
            <Card>
              <CardContent className="space-y-3 p-4">
                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search customer, email, phone or address..." className="pl-9" />
                  </div>
                  <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-10 rounded-md border bg-background px-3 text-sm">
                    <option value="active">Active sales</option>
                    <option value="all">All statuses</option>
                    {QUOTE_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                  <Button variant={showAnonymous ? 'default' : 'outline'} onClick={() => setShowAnonymous((value) => !value)}>
                    {showAnonymous ? 'Hide' : 'Show'} anonymous ({anonymousCount})
                  </Button>
                </div>
              </CardContent>
            </Card>

            {filteredQuotes.length === 0 ? (
              <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">No quotes match these filters.</CardContent></Card>
            ) : filteredQuotes.map((quote) => {
              const expanded = expandedQuote === quote.id;
              const anonymous = isAnonymousSession(quote);
              return (
                <Card key={quote.id} id={`quote-${quote.id}`} className={expanded ? 'ring-2 ring-primary/30' : ''}>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                      <button className="min-w-0 flex-1 text-left" onClick={() => setExpandedQuote(expanded ? null : quote.id)}>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold">{quote.business_name || quote.customer_name || 'Quote'}</span>
                          <Badge variant="outline" className={statusClass(quote.status)}>{quote.status}</Badge>
                          {anonymous && <Badge variant="secondary">anonymous session</Badge>}
                          {quote.customer_id && <Badge variant="secondary">customer linked</Badge>}
                        </div>
                        <p className="mt-1 truncate text-sm text-muted-foreground">{quote.property_address || 'No address'} · {serviceSummary(quote.services)}</p>
                        <p className="mt-1 text-xs text-muted-foreground">Updated {formatDateTime(quote.updated_at)}</p>
                      </button>
                      <div className="flex items-center justify-between gap-3 xl:justify-end">
                        <div className="text-right"><p className="text-xs text-muted-foreground">Total</p><p className="font-bold">{money(quote.total_amount)}</p></div>
                        <select
                          aria-label="Quote status"
                          value={quote.status}
                          disabled={savingId === quote.id || anonymous}
                          onChange={(event) => void updateQuote(quote, { status: event.target.value }, `Quote marked ${event.target.value}`)}
                          className="h-9 rounded-md border bg-background px-2 text-sm"
                        >
                          {QUOTE_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                        </select>
                        <Button variant="ghost" size="icon" onClick={() => setExpandedQuote(expanded ? null : quote.id)} aria-label="Quote details">
                          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    {expanded && (
                      <div className="mt-4 grid gap-4 border-t pt-4 lg:grid-cols-3">
                        <div className="space-y-2 text-sm">
                          <p className="font-semibold">Customer</p>
                          <p>{quote.customer_name || '—'}</p>
                          <p className="text-muted-foreground">{quote.customer_email || 'No email'}</p>
                          <p className="text-muted-foreground">{quote.customer_phone || 'No phone'}</p>
                          <p className="text-muted-foreground">{quote.property_address || 'No address'}</p>
                          {quote.customer_id && <Button variant="outline" size="sm" onClick={() => navigate(`/crm/clients?customer=${quote.customer_id}`)}>Open client</Button>}
                        </div>
                        <div className="space-y-2 text-sm">
                          <p className="font-semibold">Quote activity</p>
                          <p>Sent: {formatDateTime(quote.sent_to_customer_at || quote.last_email_sent_at)}</p>
                          <p>Delivery: {quote.email_delivery_status || '—'}</p>
                          <p>Viewed: {formatDateTime(quote.viewed_at || quote.opened_at)}</p>
                          <p>Approved: {formatDateTime(quote.approved_at)}</p>
                          <p>Source: {quote.source || quote.channel || '—'}</p>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p className="font-semibold">Follow-up</p>
                          <Input
                            type="datetime-local"
                            value={followUpDraft[quote.id] ?? toDateTimeLocal(quote.follow_up_at)}
                            onChange={(event) => setFollowUpDraft((current) => ({ ...current, [quote.id]: event.target.value }))}
                            disabled={anonymous}
                          />
                          <div className="flex gap-2">
                            <Button size="sm" disabled={anonymous || savingId === quote.id} onClick={() => void saveFollowUp(quote)}>Save follow-up</Button>
                            {quote.follow_up_at && <Button size="sm" variant="outline" disabled={savingId === quote.id} onClick={() => { setFollowUpDraft((current) => ({ ...current, [quote.id]: '' })); void updateQuote(quote, { follow_up_at: null, follow_up_date: null, follow_up_period: null }, 'Follow-up cleared'); }}>Clear</Button>}
                          </div>
                          <p className="text-xs text-muted-foreground">Current: {formatDateTime(quote.follow_up_at)}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="followups" className="mt-4 space-y-3">
            {openFollowUps.length === 0 ? (
              <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">No open quote follow-ups.</CardContent></Card>
            ) : openFollowUps.map((item) => {
              const overdue = new Date(item.due_at).getTime() < Date.now();
              return (
                <Card key={item.id} className={overdue ? 'border-amber-300' : ''}>
                  <CardContent className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{item.title}</p>
                        {overdue && <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-800">overdue</Badge>}
                        {!item.automatic && <Badge variant="secondary">manual</Badge>}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{item.reason || item.address || 'Quote follow-up'}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Due {formatDateTime(item.due_at)} · {item.contact_email || item.contact_phone || 'No contact'}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => openQuoteFromRelated(item.quote_id || item.source_id)}>Open exact quote</Button>
                      <Button size="sm" variant="outline" disabled={savingId === item.id} onClick={() => void runFollowUpAction(item, 'done')}>Done</Button>
                      <Button size="sm" variant="outline" disabled={savingId === item.id} onClick={() => void runFollowUpAction(item, 'booked')}>Booked</Button>
                      <Button size="sm" variant="ghost" disabled={savingId === item.id} onClick={() => void runFollowUpAction(item, 'lost')}>Lost</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="finance" className="mt-4 grid gap-4 xl:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><ClipboardList className="h-5 w-5" />Invoices ({invoices.length})</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {invoices.length === 0 ? <p className="text-sm text-muted-foreground">No invoices yet.</p> : invoices.map((invoice) => (
                  <div key={invoice.id} className="rounded-lg border p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div><p className="font-semibold">{invoice.invoice_number}</p><p className="text-xs text-muted-foreground">{formatDate(invoice.invoice_date)} · due {formatDate(invoice.due_date)}</p></div>
                      <div className="text-right"><Badge variant="outline" className={statusClass(invoice.status)}>{invoice.status}</Badge><p className="mt-1 font-semibold">{money(invoice.total_amount)}</p></div>
                    </div>
                    <div className="mt-2 flex gap-2"><Button size="sm" variant="outline" onClick={() => openQuoteFromRelated(invoice.quote_id)}>Open quote</Button></div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Receipt className="h-5 w-5" />Receipts ({receipts.length})</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {receipts.length === 0 ? <p className="text-sm text-muted-foreground">No receipts yet.</p> : receipts.map((receipt) => (
                  <div key={receipt.id} className="rounded-lg border p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div><p className="font-semibold">{receipt.receipt_number}</p><p className="text-xs text-muted-foreground">{receipt.customer_name} · {formatDate(receipt.receipt_date)}</p></div>
                      <p className="font-semibold">{money(receipt.total_amount)}</p>
                    </div>
                    <div className="mt-2 flex gap-2"><Button size="sm" variant="outline" onClick={() => openQuoteFromRelated(receipt.quote_id)}>Open quote</Button></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans" className="mt-4 space-y-3">
            <Card><CardContent className="p-4 text-sm text-muted-foreground">Templates define the offer. Customer plans are managed here. Legacy anonymous calculator plans stay unlinked instead of becoming fake clients.</CardContent></Card>
            {plans.length === 0 ? (
              <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">No customer plans yet.</CardContent></Card>
            ) : plans.map((plan) => {
              const scheduleMissing = plan.status === 'active' && !plan.next_service_date;
              const deliveryMissing = ['sent', 'viewed'].includes(plan.status) && !plan.email_sent_at;
              return (
                <Card key={plan.id} className={scheduleMissing || deliveryMissing ? 'border-amber-300' : ''}>
                  <CardContent className="p-4">
                    <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_auto] lg:items-center">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold">{plan.plan_title || plan.service_description || 'Custom plan'}</p>
                          <Badge variant="outline" className={statusClass(plan.status)}>{plan.status}</Badge>
                          {plan.customer_id && <Badge variant="secondary">customer linked</Badge>}
                          {scheduleMissing && <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-800">schedule needed</Badge>}
                          {deliveryMissing && <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-800">delivery unverified</Badge>}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{plan.customer_name} · {plan.address || 'No address'}</p>
                        <p className="text-xs text-muted-foreground">{plan.customer_email || plan.customer_phone || 'No customer contact'} · {plan.cadence || plan.billing_frequency}</p>
                      </div>
                      <div><p className="text-xs text-muted-foreground">Recurring</p><p className="font-semibold">{money(plan.recurring_amount)}</p></div>
                      <div className="space-y-1"><p className="text-xs text-muted-foreground">Next service</p><Input type="date" defaultValue={plan.next_service_date || ''} onBlur={(event) => { const value = event.target.value || null; if (value !== plan.next_service_date) void updatePlan(plan, { next_service_date: value }, value ? 'Next service updated' : 'Next service cleared'); }} /></div>
                      <select value={plan.status} disabled={savingId === plan.id} onChange={(event) => void updatePlan(plan, { status: event.target.value }, `Plan marked ${event.target.value}`)} className="h-9 rounded-md border bg-background px-2 text-sm">
                        {PLAN_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                      </select>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Quotes;
