import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { CalendarDays, Check, Eye, MapPin, Pencil, RefreshCw } from 'lucide-react';

export type EditableCustomerPlan = {
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
  renewal_interval: string | null;
  include_interior: boolean | null;
  travel_surcharge: number | string | null;
  discount_percent: number | string | null;
  next_service_date: string | null;
};

type PlanDraft = {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  plan_title: string;
  service_description: string;
  service_types: string;
  status: string;
  cadence: string;
  billing_frequency: string;
  one_time_amount: string;
  recurring_amount: string;
  renewal_interval: string;
  include_interior: boolean;
  travel_surcharge: string;
  discount_percent: string;
  next_service_date: string;
};

const PLAN_STATUSES = ['draft', 'sent', 'viewed', 'accepted', 'active', 'paused', 'cancelled', 'expired'];
const CADENCE_OPTIONS = ['Weekly', 'Biweekly', 'Monthly', 'Quarterly', 'Seasonal', 'Semiannual', 'Annual'];
const BILLING_OPTIONS = ['weekly', 'biweekly', 'monthly', 'quarterly', 'semiannual', 'annual'];
const RENEWAL_OPTIONS = ['monthly', 'quarterly', 'semiannual', 'annual'];

const money = (value: string | number | null | undefined) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(Number(value || 0));

const toDraft = (plan: EditableCustomerPlan): PlanDraft => ({
  customer_name: plan.customer_name || '',
  customer_email: plan.customer_email || '',
  customer_phone: plan.customer_phone || '',
  address: plan.address || '',
  plan_title: plan.plan_title || '',
  service_description: plan.service_description || '',
  service_types: (plan.service_types || []).join(', '),
  status: plan.status || 'draft',
  cadence: plan.cadence || '',
  billing_frequency: plan.billing_frequency || 'monthly',
  one_time_amount: plan.one_time_amount == null ? '' : String(plan.one_time_amount),
  recurring_amount: plan.recurring_amount == null ? '' : String(plan.recurring_amount),
  renewal_interval: plan.renewal_interval || 'annual',
  include_interior: Boolean(plan.include_interior),
  travel_surcharge: plan.travel_surcharge == null ? '' : String(plan.travel_surcharge),
  discount_percent: plan.discount_percent == null ? '' : String(plan.discount_percent),
  next_service_date: plan.next_service_date || '',
});

const normalizedServices = (value: string) =>
  value
    .split(',')
    .map((service) => service.trim())
    .filter(Boolean);

const readableFrequency = (value: string) => {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return 'Recurring service';
  if (normalized === 'semiannual') return 'Every 6 months';
  if (normalized === 'biweekly') return 'Every 2 weeks';
  return `${normalized.charAt(0).toUpperCase()}${normalized.slice(1)} billing`;
};

const readableInterval = (value: string) => {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return 'No renewal interval set';
  if (normalized === 'semiannual') return 'Renews every 6 months';
  return `Renews ${normalized}`;
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="space-y-1.5 text-sm">
    <span className="font-medium">{label}</span>
    {children}
  </label>
);

export const CustomerPlanPreview = ({ draft }: { draft: PlanDraft }) => {
  const services = useMemo(() => normalizedServices(draft.service_types), [draft.service_types]);
  const discount = Number(draft.discount_percent || 0);
  const recurring = Number(draft.recurring_amount || 0);
  const oneTime = Number(draft.one_time_amount || 0);
  const travel = Number(draft.travel_surcharge || 0);

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="bg-slate-950 px-5 py-4 text-white">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">BC Pressure Washing</p>
            <h3 className="mt-1 text-xl font-bold">{draft.plan_title.trim() || 'Your Maintenance Plan'}</h3>
          </div>
          <Badge className="border-white/20 bg-white/10 text-white hover:bg-white/10">Plan</Badge>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Prepared for</p>
          <p className="mt-1 font-semibold">{draft.customer_name.trim() || 'Customer'}</p>
          {draft.address.trim() && (
            <p className="mt-1 flex items-start gap-1.5 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{draft.address.trim()}</span>
            </p>
          )}
        </div>

        <div className="rounded-xl border bg-muted/20 p-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Recurring price</p>
              <p className="mt-1 text-3xl font-bold">{money(recurring)}</p>
              <p className="text-sm text-muted-foreground">{readableFrequency(draft.billing_frequency)}</p>
            </div>
            {discount > 0 && <Badge variant="secondary">{discount}% plan savings</Badge>}
          </div>
          {oneTime > 0 && (
            <div className="mt-3 border-t pt-3 text-sm">
              <span className="text-muted-foreground">One-time / initial service</span>
              <span className="float-right font-semibold">{money(oneTime)}</span>
            </div>
          )}
          {travel > 0 && (
            <div className="mt-2 text-sm">
              <span className="text-muted-foreground">Travel surcharge</span>
              <span className="float-right font-semibold">{money(travel)}</span>
            </div>
          )}
        </div>

        {(services.length > 0 || draft.service_description.trim() || draft.include_interior) && (
          <div>
            <p className="font-semibold">What’s included</p>
            <div className="mt-2 space-y-2">
              {services.map((service) => (
                <div key={service} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check className="h-3.5 w-3.5" /></span>
                  <span>{service}</span>
                </div>
              ))}
              {draft.include_interior && (
                <div className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check className="h-3.5 w-3.5" /></span>
                  <span>Interior cleaning included</span>
                </div>
              )}
            </div>
            {draft.service_description.trim() && <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{draft.service_description.trim()}</p>}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Service cadence</p>
            <p className="mt-1 font-medium">{draft.cadence.trim() || 'To be scheduled'}</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Renewal</p>
            <p className="mt-1 font-medium">{readableInterval(draft.renewal_interval)}</p>
          </div>
          <div className="rounded-lg border p-3 sm:col-span-2">
            <p className="text-xs text-muted-foreground">Next service</p>
            <p className="mt-1 flex items-center gap-1.5 font-medium"><CalendarDays className="h-4 w-4" />{draft.next_service_date || 'To be scheduled'}</p>
          </div>
        </div>

        <div className="rounded-lg bg-muted/30 p-3 text-xs text-muted-foreground">
          This preview is read-only. Customer actions such as accepting, paying, or requesting changes are intentionally disabled here.
        </div>
      </div>
    </div>
  );
};

export const PlanEditor = ({ plan, onSaved }: { plan: EditableCustomerPlan; onSaved?: () => void | Promise<void> }) => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<PlanDraft>(() => toDraft(plan));

  useEffect(() => {
    if (!open) setDraft(toDraft(plan));
  }, [plan, open]);

  const set = (key: Exclude<keyof PlanDraft, 'include_interior'>, value: string) => setDraft((current) => ({ ...current, [key]: value }));

  const save = async () => {
    const recurringAmount = draft.recurring_amount === '' ? null : Number(draft.recurring_amount);
    const oneTimeAmount = draft.one_time_amount === '' ? null : Number(draft.one_time_amount);
    const travelSurcharge = draft.travel_surcharge === '' ? null : Number(draft.travel_surcharge);
    const discountPercent = draft.discount_percent === '' ? null : Number(draft.discount_percent);

    if ([recurringAmount, oneTimeAmount, travelSurcharge, discountPercent].some((value) => value != null && !Number.isFinite(value))) {
      toast({ title: 'Check plan pricing', description: 'Price, surcharge, and discount fields must be valid numbers.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    const { error } = await (supabase.from('admin_custom_subscriptions') as any)
      .update({
        customer_name: draft.customer_name.trim(),
        customer_email: draft.customer_email.trim() || null,
        customer_phone: draft.customer_phone.trim() || null,
        address: draft.address.trim() || null,
        plan_title: draft.plan_title.trim() || null,
        service_description: draft.service_description.trim(),
        service_types: normalizedServices(draft.service_types),
        status: draft.status,
        cadence: draft.cadence.trim() || null,
        billing_frequency: draft.billing_frequency,
        one_time_amount: oneTimeAmount,
        recurring_amount: recurringAmount,
        renewal_interval: draft.renewal_interval.trim() || null,
        include_interior: draft.include_interior,
        travel_surcharge: travelSurcharge,
        discount_percent: discountPercent,
        next_service_date: draft.next_service_date || null,
      })
      .eq('id', plan.id);
    setSaving(false);

    if (error) {
      toast({ title: 'Plan update failed', description: error.message, variant: 'destructive' });
      return;
    }

    toast({ title: 'Plan updated', description: draft.plan_title.trim() || draft.customer_name.trim() || 'Customer plan' });
    setOpen(false);
    await onSaved?.();
  };

  return (
    <>
      <Button type="button" size="sm" variant="outline" onClick={() => setOpen(true)}>
        <Pencil className="mr-2 h-4 w-4" />Edit + preview
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[94vh] max-w-6xl overflow-y-auto p-0 sm:rounded-2xl">
          <DialogHeader className="border-b px-5 py-4 pr-12">
            <DialogTitle>Edit Plan</DialogTitle>
            <DialogDescription>Changes on the left update the customer-facing preview on the right before you save.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)]">
            <div className="space-y-5 p-5 lg:border-r">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Customer name"><Input value={draft.customer_name} onChange={(event) => set('customer_name', event.target.value)} /></Field>
                <Field label="Email"><Input type="email" value={draft.customer_email} onChange={(event) => set('customer_email', event.target.value)} /></Field>
                <Field label="Phone"><Input value={draft.customer_phone} onChange={(event) => set('customer_phone', event.target.value)} /></Field>
                <Field label="Service address"><Input value={draft.address} onChange={(event) => set('address', event.target.value)} /></Field>
              </div>

              <Field label="Plan title"><Input value={draft.plan_title} onChange={(event) => set('plan_title', event.target.value)} placeholder="Essential Care" /></Field>
              <Field label="Services included"><Input value={draft.service_types} onChange={(event) => set('service_types', event.target.value)} placeholder="Window Cleaning, Gutter Cleaning, Pressure Washing" /></Field>
              <Field label="Service description"><Textarea rows={4} value={draft.service_description} onChange={(event) => set('service_description', event.target.value)} /></Field>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Field label="One-time price"><Input type="number" min="0" step="0.01" value={draft.one_time_amount} onChange={(event) => set('one_time_amount', event.target.value)} /></Field>
                <Field label="Recurring price"><Input type="number" min="0" step="0.01" value={draft.recurring_amount} onChange={(event) => set('recurring_amount', event.target.value)} /></Field>
                <Field label="Travel surcharge"><Input type="number" min="0" step="0.01" value={draft.travel_surcharge} onChange={(event) => set('travel_surcharge', event.target.value)} /></Field>
                <Field label="Discount %"><Input type="number" min="0" max="100" step="0.01" value={draft.discount_percent} onChange={(event) => set('discount_percent', event.target.value)} /></Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Cadence">
                  <select value={draft.cadence} onChange={(event) => set('cadence', event.target.value)} className="h-10 w-full rounded-md border bg-background px-3 text-sm">
                    <option value="">Choose cadence</option>
                    {draft.cadence && !CADENCE_OPTIONS.includes(draft.cadence) && <option value={draft.cadence}>{draft.cadence}</option>}
                    {CADENCE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </Field>
                <Field label="Billing frequency">
                  <select value={draft.billing_frequency} onChange={(event) => set('billing_frequency', event.target.value)} className="h-10 w-full rounded-md border bg-background px-3 text-sm">
                    {draft.billing_frequency && !BILLING_OPTIONS.includes(draft.billing_frequency) && <option value={draft.billing_frequency}>{draft.billing_frequency}</option>}
                    {BILLING_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </Field>
                <Field label="Renewal interval">
                  <select value={draft.renewal_interval} onChange={(event) => set('renewal_interval', event.target.value)} className="h-10 w-full rounded-md border bg-background px-3 text-sm">
                    {draft.renewal_interval && !RENEWAL_OPTIONS.includes(draft.renewal_interval) && <option value={draft.renewal_interval}>{draft.renewal_interval}</option>}
                    {RENEWAL_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </Field>
                <Field label="Next service date"><Input type="date" value={draft.next_service_date} onChange={(event) => set('next_service_date', event.target.value)} /></Field>
                <Field label="Status">
                  <select value={draft.status} onChange={(event) => set('status', event.target.value)} className="h-10 w-full rounded-md border bg-background px-3 text-sm">
                    {PLAN_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </Field>
                <label className="flex min-h-10 items-center gap-3 rounded-md border px-3 py-2 text-sm">
                  <input type="checkbox" checked={draft.include_interior} onChange={(event) => setDraft((current) => ({ ...current, include_interior: event.target.checked }))} className="h-4 w-4" />
                  <span><span className="font-medium">Include interior cleaning</span><span className="block text-xs text-muted-foreground">Shown in the customer preview</span></span>
                </label>
              </div>

              <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={() => { setDraft(toDraft(plan)); setOpen(false); }} disabled={saving}>Cancel</Button>
                <Button type="button" onClick={() => void save()} disabled={saving}>
                  {saving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                  Update Plan
                </Button>
              </div>
            </div>

            <aside className="bg-muted/20 p-5 lg:sticky lg:top-0 lg:self-start">
              <div className="mb-3 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <div>
                  <p className="text-sm font-semibold">Customer preview</p>
                  <p className="text-xs text-muted-foreground">Live preview — unsaved changes included</p>
                </div>
              </div>
              <CustomerPlanPreview draft={draft} />
            </aside>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlanEditor;
