import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CalendarDays, FileText, Receipt, RefreshCw, UserRound, WalletCards } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type Customer = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  notes: string | null;
  lifecycle_stage: string;
  first_client_at: string | null;
  last_activity_at: string | null;
  is_internal: boolean;
  is_test: boolean;
};

type RelatedRow = {
  id: string;
  status?: string | null;
  quote_id?: string | null;
  total_amount?: number | string | null;
  created_at?: string | null;
  scheduled_date?: string | null;
  invoice_number?: string | null;
  receipt_number?: string | null;
  plan_title?: string | null;
  next_service_date?: string | null;
  property_address?: string | null;
  service_address?: string | null;
};

const money = (value: number | string | null | undefined) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(Number(value || 0));

const date = (value: string | null | undefined) => {
  if (!value) return '—';
  const parsed = new Date(value.length === 10 ? `${value}T12:00:00` : value);
  return Number.isNaN(parsed.getTime()) ? '—' : parsed.toLocaleDateString('en-CA', { dateStyle: 'medium' });
};

const ClientDetail = ({ customerId, onBack }: { customerId: string; onBack: () => void }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [quotes, setQuotes] = useState<RelatedRow[]>([]);
  const [bookings, setBookings] = useState<RelatedRow[]>([]);
  const [invoices, setInvoices] = useState<RelatedRow[]>([]);
  const [receipts, setReceipts] = useState<RelatedRow[]>([]);
  const [plans, setPlans] = useState<RelatedRow[]>([]);

  const load = async () => {
    setLoading(true);
    const [customerResult, quoteResult, bookingResult, invoiceResult, receiptResult, planResult] = await Promise.all([
      (supabase.from('customers') as any)
        .select('id,name,email,phone,address,notes,lifecycle_stage,first_client_at,last_activity_at,is_internal,is_test')
        .eq('id', customerId)
        .maybeSingle(),
      (supabase.from('quotes') as any)
        .select('id,status,total_amount,created_at,property_address')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false }),
      (supabase.from('bookings') as any)
        .select('id,status,quote_id,total_amount,scheduled_date,service_address,created_at')
        .eq('customer_id', customerId)
        .order('scheduled_date', { ascending: false }),
      (supabase.from('invoices') as any)
        .select('id,status,quote_id,total_amount,invoice_number,created_at')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false }),
      (supabase.from('receipts') as any)
        .select('id,quote_id,total_amount,receipt_number,created_at')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false }),
      (supabase.from('admin_custom_subscriptions') as any)
        .select('id,status,plan_title,next_service_date,created_at')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false }),
    ]);

    const firstError = customerResult.error || quoteResult.error || bookingResult.error || invoiceResult.error || receiptResult.error || planResult.error;
    if (firstError) {
      toast({ title: 'Could not load client history', description: firstError.message, variant: 'destructive' });
    }

    setCustomer((customerResult.data || null) as Customer | null);
    setQuotes((quoteResult.data || []) as RelatedRow[]);
    setBookings((bookingResult.data || []) as RelatedRow[]);
    setInvoices((invoiceResult.data || []) as RelatedRow[]);
    setReceipts((receiptResult.data || []) as RelatedRow[]);
    setPlans((planResult.data || []) as RelatedRow[]);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, [customerId]);

  const quotedValue = useMemo(() => quotes.reduce((sum, row) => sum + Number(row.total_amount || 0), 0), [quotes]);
  const invoicedValue = useMemo(() => invoices.reduce((sum, row) => sum + Number(row.total_amount || 0), 0), [invoices]);

  if (loading) {
    return <div className="py-16 text-center"><RefreshCw className="mx-auto h-6 w-6 animate-spin" /></div>;
  }

  if (!customer) {
    return (
      <Card>
        <CardContent className="space-y-3 p-8 text-center">
          <p className="font-semibold">Client not found</p>
          <Button variant="outline" onClick={onBack}>Back to clients</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack} aria-label="Back to clients"><ArrowLeft className="h-5 w-5" /></Button>
            <div>
              <h1 className="text-xl font-bold">{customer.name}</h1>
              <p className="text-xs text-muted-foreground">Complete client history</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => void load()}><RefreshCw className="mr-2 h-4 w-4" />Refresh</Button>
        </div>
      </header>

      <main className="container mx-auto space-y-5 px-4 py-6">
        <Card>
          <CardContent className="grid gap-4 p-5 md:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <UserRound className="h-5 w-5" />
                <p className="text-lg font-semibold">{customer.name}</p>
                <Badge variant="secondary">{customer.lifecycle_stage}</Badge>
                {(customer.is_internal || customer.is_test) && <Badge variant="destructive">ADMIN TEST</Badge>}
              </div>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                <p>{customer.email || 'No email'}</p>
                <p>{customer.phone || 'No phone'}</p>
                <p>{customer.address || 'No address'}</p>
                {customer.notes && <p className="pt-2 text-foreground">{customer.notes}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Quotes</p><p className="text-xl font-bold">{quotes.length}</p><p className="text-xs text-muted-foreground">{money(quotedValue)}</p></div>
              <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Bookings</p><p className="text-xl font-bold">{bookings.length}</p></div>
              <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Invoices</p><p className="text-xl font-bold">{invoices.length}</p><p className="text-xs text-muted-foreground">{money(invoicedValue)}</p></div>
              <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Plans</p><p className="text-xl font-bold">{plans.length}</p></div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 xl:grid-cols-2">
          <HistoryCard title="Quotes" icon={<FileText className="h-5 w-5" />} rows={quotes} empty="No linked quotes" onOpen={(row) => navigate(`/crm/quotes?quote=${row.id}`)} />
          <HistoryCard title="Bookings" icon={<CalendarDays className="h-5 w-5" />} rows={bookings} empty="No linked bookings" />
          <HistoryCard title="Invoices" icon={<Receipt className="h-5 w-5" />} rows={invoices} empty="No linked invoices" onOpen={(row) => row.quote_id && navigate(`/crm/quotes?quote=${row.quote_id}`)} />
          <HistoryCard title="Receipts" icon={<Receipt className="h-5 w-5" />} rows={receipts} empty="No linked receipts" onOpen={(row) => row.quote_id && navigate(`/crm/quotes?quote=${row.quote_id}`)} />
          <HistoryCard title="Plans" icon={<WalletCards className="h-5 w-5" />} rows={plans} empty="No linked plans" onOpen={() => navigate('/crm/plans')} />
        </div>
      </main>
    </div>
  );
};

const HistoryCard = ({ title, icon, rows, empty, onOpen }: { title: string; icon: React.ReactNode; rows: RelatedRow[]; empty: string; onOpen?: (row: RelatedRow) => void }) => (
  <Card>
    <CardHeader><CardTitle className="flex items-center gap-2 text-lg">{icon}{title} ({rows.length})</CardTitle></CardHeader>
    <CardContent className="space-y-2">
      {rows.length === 0 ? <p className="text-sm text-muted-foreground">{empty}</p> : rows.map((row) => (
        <button key={row.id} type="button" disabled={!onOpen} onClick={() => onOpen?.(row)} className="flex w-full items-center justify-between gap-3 rounded-md border p-3 text-left disabled:cursor-default">
          <div className="min-w-0">
            <p className="truncate font-medium">{row.invoice_number || row.receipt_number || row.plan_title || row.property_address || row.service_address || title.slice(0, -1)}</p>
            <p className="text-xs text-muted-foreground">{row.status || 'record'} · {date(row.scheduled_date || row.next_service_date || row.created_at)}</p>
          </div>
          {row.total_amount != null && <p className="font-semibold">{money(row.total_amount)}</p>}
        </button>
      ))}
    </CardContent>
  </Card>
);

export default ClientDetail;
