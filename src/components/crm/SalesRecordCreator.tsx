import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { FilePlus2, Loader2, Plus, Trash2, WalletCards } from 'lucide-react';

export type SalesCreatorDefaults = {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  address?: string;
  services?: string[];
  source?: 'admin' | 'virtual_estimate';
  sourceContextId?: string;
  internalNotes?: string;
};

type CreatedRecord = { kind: 'quote' | 'plan'; id: string };

type SalesRecordCreatorProps = {
  kind: 'quote' | 'plan';
  defaults?: SalesCreatorDefaults;
  onCreated?: (record: CreatedRecord) => void | Promise<void>;
  triggerClassName?: string;
  triggerVariant?: 'default' | 'outline' | 'secondary' | 'ghost';
};

type ServiceLine = { name: string; price: string };

const inputClass = 'border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus-visible:ring-red-500';
const selectClass = 'h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3 text-sm text-white outline-none focus:border-red-500';
const labelClass = 'space-y-1.5 text-sm';

const money = (value: number) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(Number.isFinite(value) ? value : 0);

const numberValue = (value: string) => {
  if (!value.trim()) return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : NaN;
};

const cleanServices = (lines: ServiceLine[]) =>
  lines
    .map((line) => ({ name: line.name.trim(), price: numberValue(line.price) }))
    .filter((line) => line.name.length > 0);

const initialLines = (services?: string[]): ServiceLine[] => {
  const normalized = (services || []).map((name) => name.trim()).filter(Boolean);
  return normalized.length > 0 ? normalized.map((name) => ({ name, price: '' })) : [{ name: '', price: '' }];
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className={labelClass}>
    <span className="font-medium text-slate-200">{label}</span>
    {children}
  </label>
);

const ServiceLines = ({ lines, setLines, showPrices }: { lines: ServiceLine[]; setLines: React.Dispatch<React.SetStateAction<ServiceLine[]>>; showPrices: boolean }) => {
  const update = (index: number, key: keyof ServiceLine, value: string) => {
    setLines((current) => current.map((line, lineIndex) => lineIndex === index ? { ...line, [key]: value } : line));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-200">Services *</p>
        <Button type="button" size="sm" variant="ghost" className="text-slate-300 hover:bg-slate-800 hover:text-white" onClick={() => setLines((current) => [...current, { name: '', price: '' }])}>
          <Plus className="mr-1 h-4 w-4" />Add service
        </Button>
      </div>
      {lines.map((line, index) => (
        <div key={index} className={`grid gap-2 ${showPrices ? 'grid-cols-[minmax(0,1fr)_120px_auto]' : 'grid-cols-[minmax(0,1fr)_auto]'}`}>
          <Input className={inputClass} value={line.name} onChange={(event) => update(index, 'name', event.target.value)} placeholder="Window cleaning" />
          {showPrices && <Input className={inputClass} type="number" min="0" step="0.01" value={line.price} onChange={(event) => update(index, 'price', event.target.value)} placeholder="$" />}
          <Button type="button" variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-800 hover:text-red-300" disabled={lines.length === 1} onClick={() => setLines((current) => current.filter((_, lineIndex) => lineIndex !== index))} aria-label="Remove service">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export const SalesRecordCreator = ({ kind, defaults, onCreated, triggerClassName = '', triggerVariant = 'default' }: SalesRecordCreatorProps) => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [customerName, setCustomerName] = useState(defaults?.customerName || '');
  const [customerEmail, setCustomerEmail] = useState(defaults?.customerEmail || '');
  const [customerPhone, setCustomerPhone] = useState(defaults?.customerPhone || '');
  const [address, setAddress] = useState(defaults?.address || '');
  const [services, setServices] = useState<ServiceLine[]>(() => initialLines(defaults?.services));
  const [internalNotes, setInternalNotes] = useState(defaults?.internalNotes || '');

  const [businessName, setBusinessName] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [travelSurcharge, setTravelSurcharge] = useState('');
  const [gstAmount, setGstAmount] = useState('');
  const [pstAmount, setPstAmount] = useState('');

  const [planTitle, setPlanTitle] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [oneTimeAmount, setOneTimeAmount] = useState('');
  const [recurringAmount, setRecurringAmount] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [cadence, setCadence] = useState('Monthly');
  const [billingFrequency, setBillingFrequency] = useState('monthly');
  const [renewalInterval, setRenewalInterval] = useState('annual');
  const [nextServiceDate, setNextServiceDate] = useState('');
  const [includeInterior, setIncludeInterior] = useState(false);

  useEffect(() => {
    if (!open) return;
    setCustomerName(defaults?.customerName || '');
    setCustomerEmail(defaults?.customerEmail || '');
    setCustomerPhone(defaults?.customerPhone || '');
    setAddress(defaults?.address || '');
    setServices(initialLines(defaults?.services));
    setInternalNotes(defaults?.internalNotes || '');
  }, [defaults?.address, defaults?.customerEmail, defaults?.customerName, defaults?.customerPhone, defaults?.internalNotes, defaults?.services, open]);

  const quoteMath = useMemo(() => {
    const cleaned = cleanServices(services);
    const subtotal = cleaned.reduce((sum, line) => sum + (Number.isFinite(line.price) ? line.price : 0), 0);
    const discount = numberValue(discountAmount);
    const travel = numberValue(travelSurcharge);
    const gst = numberValue(gstAmount);
    const pst = numberValue(pstAmount);
    const values = [subtotal, discount, travel, gst, pst];
    return {
      valid: values.every(Number.isFinite),
      subtotal,
      discount,
      travel,
      gst,
      pst,
      total: Math.max(0, subtotal - (Number.isFinite(discount) ? discount : 0) + (Number.isFinite(travel) ? travel : 0) + (Number.isFinite(gst) ? gst : 0) + (Number.isFinite(pst) ? pst : 0)),
    };
  }, [discountAmount, gstAmount, pstAmount, services, travelSurcharge]);

  const resetAfterCreate = () => {
    setBusinessName('');
    setDiscountAmount('');
    setTravelSurcharge('');
    setGstAmount('');
    setPstAmount('');
    setPlanTitle('');
    setServiceDescription('');
    setOneTimeAmount('');
    setRecurringAmount('');
    setDiscountPercent('');
    setCadence('Monthly');
    setBillingFrequency('monthly');
    setRenewalInterval('annual');
    setNextServiceDate('');
    setIncludeInterior(false);
  };

  const createQuote = async () => {
    const cleaned = cleanServices(services);
    if (!customerName.trim()) throw new Error('Customer name is required.');
    if (cleaned.length === 0) throw new Error('Add at least one service.');
    if (!quoteMath.valid || cleaned.some((line) => !Number.isFinite(line.price))) throw new Error('Check the quote pricing fields.');

    const source = defaults?.source || 'admin';
    const sourceDetails: Record<string, unknown> = { created_from: source };
    if (defaults?.sourceContextId) sourceDetails.virtual_estimate_session_id = defaults.sourceContextId;

    const { data, error } = await (supabase.from('quotes') as any)
      .insert({
        customer_name: customerName.trim(),
        customer_email: customerEmail.trim() || null,
        customer_phone: customerPhone.trim() || null,
        property_address: address.trim() || null,
        business_name: businessName.trim() || null,
        services: cleaned.map((line) => ({ name: line.name, price: line.price })),
        services_subtotal: quoteMath.subtotal,
        products_subtotal: 0,
        discount_amount: quoteMath.discount,
        travel_surcharge: quoteMath.travel,
        gst_amount: quoteMath.gst,
        pst_amount: quoteMath.pst,
        total_amount: quoteMath.total,
        status: 'draft',
        internal_notes: internalNotes.trim() || null,
        source,
        channel: source === 'virtual_estimate' ? 'virtual_estimate' : 'admin_quote',
        source_details: sourceDetails,
        is_test: false,
      })
      .select('id')
      .single();
    if (error) throw error;
    return String(data.id);
  };

  const createPlan = async () => {
    const cleaned = cleanServices(services);
    const recurring = numberValue(recurringAmount);
    const oneTime = numberValue(oneTimeAmount);
    const travel = numberValue(travelSurcharge);
    const discount = numberValue(discountPercent);
    if (!customerName.trim()) throw new Error('Customer name is required.');
    if (cleaned.length === 0) throw new Error('Add at least one service.');
    if (!serviceDescription.trim()) throw new Error('Service description is required.');
    if (![recurring, oneTime, travel, discount].every(Number.isFinite)) throw new Error('Check the plan pricing fields.');

    const { data, error } = await (supabase.from('admin_custom_subscriptions') as any)
      .insert({
        customer_name: customerName.trim(),
        customer_email: customerEmail.trim() || null,
        customer_phone: customerPhone.trim() || null,
        address: address.trim() || null,
        plan_title: planTitle.trim() || null,
        service_description: serviceDescription.trim(),
        service_types: cleaned.map((line) => line.name),
        service_items: cleaned.map((line) => ({ name: line.name })),
        status: 'draft',
        cadence,
        billing_frequency: billingFrequency,
        renewal_interval: renewalInterval,
        one_time_amount: oneTime,
        recurring_amount: recurring,
        price_monthly: billingFrequency === 'monthly' ? recurring : 0,
        price_quarterly: billingFrequency === 'quarterly' ? recurring : null,
        travel_surcharge: travel,
        discount_percent: discount,
        next_service_date: nextServiceDate || null,
        include_interior: includeInterior,
        internal_notes: internalNotes.trim() || null,
        plan_source: defaults?.source || 'admin',
      })
      .select('id')
      .single();
    if (error) throw error;
    return String(data.id);
  };

  const save = async () => {
    setSaving(true);
    try {
      const id = kind === 'quote' ? await createQuote() : await createPlan();
      toast({
        title: kind === 'quote' ? 'Draft quote created' : 'Draft plan created',
        description: `${customerName.trim()} · Review before sending to the customer.`,
      });
      setOpen(false);
      resetAfterCreate();
      await onCreated?.({ kind, id });
    } catch (saveError) {
      const message = saveError instanceof Error ? saveError.message : `Could not create ${kind}.`;
      toast({ title: `Could not create ${kind}`, description: message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const title = kind === 'quote' ? 'Create Quote' : 'Create Plan';
  const Icon = kind === 'quote' ? FilePlus2 : WalletCards;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} className={`${triggerVariant === 'default' ? 'bg-red-600 text-white hover:bg-red-700' : ''} ${triggerClassName}`}>
          <Icon className="mr-2 h-4 w-4" />{title}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] overflow-y-auto border-slate-800 bg-slate-950 text-white sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl"><Icon className="h-5 w-5 text-red-400" />{title}</DialogTitle>
          <DialogDescription className="text-slate-400">
            Same admin workflow as Virtual Estimate. Customer details are prefilled when available; new records stay drafts until you review and send them.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)]">
          <div className="space-y-5">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Customer</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Customer name *"><Input className={inputClass} value={customerName} onChange={(event) => setCustomerName(event.target.value)} /></Field>
                {kind === 'quote' && <Field label="Business name"><Input className={inputClass} value={businessName} onChange={(event) => setBusinessName(event.target.value)} /></Field>}
                <Field label="Email"><Input className={inputClass} type="email" value={customerEmail} onChange={(event) => setCustomerEmail(event.target.value)} /></Field>
                <Field label="Phone"><Input className={inputClass} value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} /></Field>
                <div className="sm:col-span-2"><Field label="Service address"><Input className={inputClass} value={address} onChange={(event) => setAddress(event.target.value)} /></Field></div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              {kind === 'plan' && (
                <div className="mb-4 grid gap-3 sm:grid-cols-2">
                  <Field label="Plan title"><Input className={inputClass} value={planTitle} onChange={(event) => setPlanTitle(event.target.value)} placeholder="Essential Care" /></Field>
                  <Field label="Next service"><Input className={inputClass} type="date" value={nextServiceDate} onChange={(event) => setNextServiceDate(event.target.value)} /></Field>
                </div>
              )}
              <ServiceLines lines={services} setLines={setServices} showPrices={kind === 'quote'} />
              {kind === 'plan' && <div className="mt-4"><Field label="Service description *"><Textarea className={`${inputClass} min-h-24`} value={serviceDescription} onChange={(event) => setServiceDescription(event.target.value)} placeholder="What the customer receives on each visit..." /></Field></div>}
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{kind === 'quote' ? 'Pricing' : 'Plan terms'}</p>
              {kind === 'quote' ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Discount amount"><Input className={inputClass} type="number" min="0" step="0.01" value={discountAmount} onChange={(event) => setDiscountAmount(event.target.value)} /></Field>
                  <Field label="Travel surcharge"><Input className={inputClass} type="number" min="0" step="0.01" value={travelSurcharge} onChange={(event) => setTravelSurcharge(event.target.value)} /></Field>
                  <Field label="GST"><Input className={inputClass} type="number" min="0" step="0.01" value={gstAmount} onChange={(event) => setGstAmount(event.target.value)} /></Field>
                  <Field label="PST"><Input className={inputClass} type="number" min="0" step="0.01" value={pstAmount} onChange={(event) => setPstAmount(event.target.value)} /></Field>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="One-time price"><Input className={inputClass} type="number" min="0" step="0.01" value={oneTimeAmount} onChange={(event) => setOneTimeAmount(event.target.value)} /></Field>
                  <Field label="Recurring price *"><Input className={inputClass} type="number" min="0" step="0.01" value={recurringAmount} onChange={(event) => setRecurringAmount(event.target.value)} /></Field>
                  <Field label="Discount %"><Input className={inputClass} type="number" min="0" max="100" step="0.1" value={discountPercent} onChange={(event) => setDiscountPercent(event.target.value)} /></Field>
                  <Field label="Travel surcharge"><Input className={inputClass} type="number" min="0" step="0.01" value={travelSurcharge} onChange={(event) => setTravelSurcharge(event.target.value)} /></Field>
                  <Field label="Service cadence"><select className={selectClass} value={cadence} onChange={(event) => setCadence(event.target.value)}><option>Weekly</option><option>Biweekly</option><option>Monthly</option><option>Quarterly</option><option>Seasonal</option><option>Semiannual</option><option>Annual</option></select></Field>
                  <Field label="Billing frequency"><select className={selectClass} value={billingFrequency} onChange={(event) => setBillingFrequency(event.target.value)}><option value="weekly">Weekly</option><option value="biweekly">Biweekly</option><option value="monthly">Monthly</option><option value="quarterly">Quarterly</option><option value="semiannual">Semiannual</option><option value="annual">Annual</option></select></Field>
                  <Field label="Renewal interval"><select className={selectClass} value={renewalInterval} onChange={(event) => setRenewalInterval(event.target.value)}><option value="monthly">Monthly</option><option value="quarterly">Quarterly</option><option value="semiannual">Semiannual</option><option value="annual">Annual</option></select></Field>
                  <label className="flex items-center gap-2 self-end rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-200"><input type="checkbox" checked={includeInterior} onChange={(event) => setIncludeInterior(event.target.checked)} className="h-4 w-4 accent-red-600" />Include interior cleaning</label>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <Field label="Internal notes"><Textarea className={`${inputClass} min-h-20`} value={internalNotes} onChange={(event) => setInternalNotes(event.target.value)} placeholder="Admin-only notes..." /></Field>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-0 lg:self-start">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Admin review</p>
              <h3 className="mt-2 text-lg font-bold">{kind === 'quote' ? 'Draft quote' : planTitle.trim() || 'Draft maintenance plan'}</h3>
              <p className="mt-1 text-sm text-slate-400">{customerName.trim() || 'Customer'}{address.trim() ? ` · ${address.trim()}` : ''}</p>

              <div className="mt-4 space-y-2 border-t border-slate-800 pt-4">
                {cleanServices(services).map((service, index) => (
                  <div key={`${service.name}-${index}`} className="flex items-start justify-between gap-3 text-sm">
                    <span className="text-slate-300">{service.name}</span>
                    {kind === 'quote' && <span className="font-semibold">{money(Number.isFinite(service.price) ? service.price : 0)}</span>}
                  </div>
                ))}
                {cleanServices(services).length === 0 && <p className="text-sm text-slate-500">Add services to preview the record.</p>}
              </div>

              {kind === 'quote' ? (
                <div className="mt-4 space-y-2 border-t border-slate-800 pt-4 text-sm">
                  <div className="flex justify-between text-slate-400"><span>Services</span><span>{money(quoteMath.subtotal)}</span></div>
                  {quoteMath.discount > 0 && <div className="flex justify-between text-slate-400"><span>Discount</span><span>-{money(quoteMath.discount)}</span></div>}
                  {quoteMath.travel > 0 && <div className="flex justify-between text-slate-400"><span>Travel</span><span>{money(quoteMath.travel)}</span></div>}
                  {quoteMath.gst > 0 && <div className="flex justify-between text-slate-400"><span>GST</span><span>{money(quoteMath.gst)}</span></div>}
                  {quoteMath.pst > 0 && <div className="flex justify-between text-slate-400"><span>PST</span><span>{money(quoteMath.pst)}</span></div>}
                  <div className="flex justify-between border-t border-slate-800 pt-3 text-base font-bold"><span>Total</span><span>{money(quoteMath.total)}</span></div>
                </div>
              ) : (
                <div className="mt-4 space-y-2 border-t border-slate-800 pt-4 text-sm">
                  <div className="flex justify-between text-slate-400"><span>Recurring</span><span className="font-semibold text-white">{money(Number.isFinite(numberValue(recurringAmount)) ? numberValue(recurringAmount) : 0)}</span></div>
                  <div className="flex justify-between text-slate-400"><span>Cadence</span><span className="text-white">{cadence}</span></div>
                  <div className="flex justify-between text-slate-400"><span>Billing</span><span className="text-white capitalize">{billingFrequency}</span></div>
                  <div className="flex justify-between text-slate-400"><span>Renewal</span><span className="text-white capitalize">{renewalInterval}</span></div>
                </div>
              )}

              <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-100">
                Creation always starts as Draft. Sending, approval, payment, and activation stay separate admin actions.
              </div>
            </div>

            <Button disabled={saving} onClick={() => void save()} className="h-12 w-full bg-red-600 hover:bg-red-700">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Icon className="mr-2 h-4 w-4" />}
              {saving ? 'Creating…' : `Create Draft ${kind === 'quote' ? 'Quote' : 'Plan'}`}
            </Button>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
};
