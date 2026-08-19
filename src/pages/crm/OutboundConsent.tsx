import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock3, Copy, MessageSquareText, PhoneCall, RefreshCw, Search, ShieldCheck, ShieldX } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const SMS_CONSENT_TEXT = 'I agree to receive occasional marketing text messages from BC Pressure Washing about local pricing, nearby service availability and referral discounts. Message frequency varies. Reply STOP to unsubscribe.';
const AI_CONSENT_TEXT = 'I agree to receive automated or AI-generated voice calls from BC Pressure Washing at this phone number, no more than once per month, about storefront cleaning, pricing and availability. I can withdraw consent at any time.';
const PUBLIC_OPT_IN_URL = 'https://bcpressurewashing.ca/storefront-updates';
const db = supabase as any;

type Lead = {
  id: string;
  business_name: string;
  contact_name: string | null;
  contact_email: string | null;
  phone: string;
  city: string | null;
  status: string | null;
  do_not_call: boolean | null;
  call_permission: boolean | null;
  sms_marketing_consent: boolean;
  sms_marketing_consent_at: string | null;
  sms_marketing_consent_source: string | null;
  sms_opted_out_at: string | null;
  ai_call_consent: boolean;
  ai_call_consent_at: string | null;
  ai_call_consent_source: string | null;
  ai_call_consent_revoked_at: string | null;
  ai_call_frequency: 'none' | 'one_time' | 'monthly';
  ai_next_call_at: string | null;
  ai_last_call_at: string | null;
  consent_phone: string | null;
  marketing_referral_code: string | null;
  last_marketing_sms_at: string | null;
  updated_at: string | null;
};

type FilterKey = 'all' | 'sms' | 'monthly' | 'due' | 'blocked';

const formatWhen = (value: string | null) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
};

const OutboundConsent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterKey>('all');
  const [sessionUser, setSessionUser] = useState<{ id: string; email: string | null } | null>(null);

  const activeLead = useMemo(() => leads.find((lead) => lead.id === activeLeadId) || null, [leads, activeLeadId]);

  const isAiDue = (lead: Lead) => {
    if (!lead.ai_call_consent || lead.ai_call_consent_revoked_at || lead.do_not_call || lead.call_permission === false) return false;
    if (lead.ai_call_frequency === 'one_time') return !lead.ai_last_call_at;
    if (lead.ai_call_frequency !== 'monthly') return false;
    return !lead.ai_next_call_at || new Date(lead.ai_next_call_at).getTime() <= Date.now();
  };

  const loadData = async (preserveId?: string | null) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      navigate('/crm');
      return;
    }
    setSessionUser({ id: session.user.id, email: session.user.email || null });

    const [{ data: roleRow }, { data: adminCheck }] = await Promise.all([
      db.from('admin_users').select('role').ilike('email', session.user.email || '').maybeSingle(),
      db.rpc('is_admin', { user_id: session.user.id }),
    ]);
    const role = roleRow?.role ? String(roleRow.role) : null;
    if (!Boolean(adminCheck) && !['admin', 'caller'].includes(role || '')) {
      toast.error('This login does not have outbound consent access.');
      navigate('/crm');
      return;
    }

    const { data, error } = await db
      .from('storefront_call_leads')
      .select('id,business_name,contact_name,contact_email,phone,city,status,do_not_call,call_permission,sms_marketing_consent,sms_marketing_consent_at,sms_marketing_consent_source,sms_opted_out_at,ai_call_consent,ai_call_consent_at,ai_call_consent_source,ai_call_consent_revoked_at,ai_call_frequency,ai_next_call_at,ai_last_call_at,consent_phone,marketing_referral_code,last_marketing_sms_at,updated_at')
      .order('updated_at', { ascending: false })
      .limit(1000);
    if (error) throw error;

    const next = (data || []) as Lead[];
    setLeads(next);
    setActiveLeadId(preserveId && next.some((lead) => lead.id === preserveId) ? preserveId : next[0]?.id || null);
  };

  useEffect(() => {
    loadData()
      .catch((error) => {
        console.error(error);
        toast.error('Could not load outbound consent records.');
      })
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => ({
    sms: leads.filter((lead) => lead.sms_marketing_consent && !lead.sms_opted_out_at).length,
    monthly: leads.filter((lead) => lead.ai_call_consent && lead.ai_call_frequency === 'monthly' && !lead.ai_call_consent_revoked_at).length,
    due: leads.filter(isAiDue).length,
    blocked: leads.filter((lead) => lead.do_not_call || lead.call_permission === false || Boolean(lead.ai_call_consent_revoked_at)).length,
  }), [leads]);

  const visibleLeads = useMemo(() => {
    const term = search.trim().toLowerCase();
    return leads.filter((lead) => {
      if (term && ![lead.business_name, lead.contact_name, lead.phone, lead.city, lead.contact_email].filter(Boolean).some((value) => String(value).toLowerCase().includes(term))) return false;
      if (filter === 'sms') return lead.sms_marketing_consent && !lead.sms_opted_out_at;
      if (filter === 'monthly') return lead.ai_call_consent && lead.ai_call_frequency === 'monthly' && !lead.ai_call_consent_revoked_at;
      if (filter === 'due') return isAiDue(lead);
      if (filter === 'blocked') return lead.do_not_call || lead.call_permission === false || Boolean(lead.ai_call_consent_revoked_at);
      return true;
    });
  }, [leads, search, filter]);

  const logConsent = async (lead: Lead, consentType: string, granted: boolean, source: string, consentText: string, metadata: Record<string, unknown> = {}) => {
    if (!sessionUser) return;
    const { error } = await db.from('storefront_contact_consents').insert({
      lead_id: lead.id,
      phone: lead.phone,
      consent_type: consentType,
      granted,
      source,
      consent_text: consentText,
      actor_user_id: sessionUser.id,
      metadata: { recorded_from: 'outbound_consent_workspace', ...metadata },
    });
    if (error) throw error;
  };

  const recordConsent = async (type: 'sms' | 'ai', granted: boolean) => {
    if (!activeLead || !sessionUser) return;
    if (type === 'ai' && granted && activeLead.do_not_call) {
      toast.error('DNC is active. Clear DNC separately only after the contact explicitly asks to receive calls again.');
      return;
    }

    setSaving(true);
    const now = new Date().toISOString();
    try {
      if (type === 'sms') {
        const { error } = await db.from('storefront_call_leads').update({
          sms_marketing_consent: granted,
          sms_marketing_consent_at: granted ? now : activeLead.sms_marketing_consent_at,
          sms_marketing_consent_source: granted ? 'd2d_verbal' : activeLead.sms_marketing_consent_source,
          sms_marketing_consent_text: granted ? SMS_CONSENT_TEXT : null,
          sms_opted_out_at: granted ? null : now,
          consent_phone: granted ? activeLead.phone : activeLead.consent_phone,
          updated_at: now,
        }).eq('id', activeLead.id);
        if (error) throw error;
        await logConsent(activeLead, 'sms_marketing', granted, granted ? 'd2d_verbal' : 'admin_revocation', granted ? SMS_CONSENT_TEXT : 'SMS marketing consent withdrawn');
      } else {
        const { error } = await db.from('storefront_call_leads').update({
          ai_call_consent: granted,
          ai_call_consent_at: granted ? now : activeLead.ai_call_consent_at,
          ai_call_consent_source: granted ? 'd2d_verbal' : activeLead.ai_call_consent_source,
          ai_call_consent_text: granted ? AI_CONSENT_TEXT : null,
          ai_call_consent_revoked_at: granted ? null : now,
          ai_call_frequency: granted ? 'monthly' : 'none',
          ai_next_call_at: granted ? now : null,
          consent_phone: granted ? activeLead.phone : activeLead.consent_phone,
          call_permission: granted ? true : activeLead.call_permission,
          updated_at: now,
        }).eq('id', activeLead.id);
        if (error) throw error;
        await logConsent(activeLead, 'ai_voice_monthly', granted, granted ? 'd2d_verbal' : 'admin_revocation', granted ? AI_CONSENT_TEXT : 'Monthly AI voice consent withdrawn', { frequency: 'monthly' });
      }

      toast.success(granted ? 'Consent recorded.' : 'Consent withdrawn.');
      await loadData(activeLead.id);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || 'Could not update consent.');
    } finally {
      setSaving(false);
    }
  };

  const clearDnc = async () => {
    if (!activeLead || !sessionUser || !activeLead.do_not_call) return;
    if (!window.confirm('Only clear DNC if this contact explicitly asked to receive calls again. Continue?')) return;
    setSaving(true);
    try {
      const now = new Date().toISOString();
      const { error } = await db.from('storefront_call_leads').update({ do_not_call: false, call_permission: true, updated_at: now }).eq('id', activeLead.id);
      if (error) throw error;
      await logConsent(activeLead, 'do_not_call', true, 'admin_explicit_reenable', 'Contact explicitly requested calls be re-enabled');
      toast.success('DNC cleared. Record the specific AI consent separately if applicable.');
      await loadData(activeLead.id);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || 'Could not clear DNC.');
    } finally {
      setSaving(false);
    }
  };

  const copyPublicLink = async () => {
    await navigator.clipboard.writeText(PUBLIC_OPT_IN_URL);
    toast.success('Public opt-in link copied.');
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-slate-50"><RefreshCw className="h-7 w-7 animate-spin text-red-600" /></div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/crm')}><ArrowLeft className="h-5 w-5" /></Button>
            <div><h1 className="font-bold text-slate-950">Outbound Consent</h1><p className="text-xs text-slate-500">SMS + AI voice permissions and monthly eligibility</p></div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyPublicLink}><Copy className="mr-2 h-4 w-4" /> Opt-in link</Button>
            <Button variant="outline" size="icon" onClick={() => loadData(activeLeadId)}><RefreshCw className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-5 px-4 py-5">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Card><CardContent className="p-4"><div className="flex items-center justify-between"><span className="text-sm text-slate-500">SMS opted in</span><MessageSquareText className="h-4 w-4 text-emerald-600" /></div><div className="mt-2 text-2xl font-bold">{stats.sms}</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center justify-between"><span className="text-sm text-slate-500">Monthly AI</span><PhoneCall className="h-4 w-4 text-blue-600" /></div><div className="mt-2 text-2xl font-bold">{stats.monthly}</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center justify-between"><span className="text-sm text-slate-500">AI due now</span><Clock3 className="h-4 w-4 text-amber-600" /></div><div className="mt-2 text-2xl font-bold">{stats.due}</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center justify-between"><span className="text-sm text-slate-500">Blocked / revoked</span><ShieldX className="h-4 w-4 text-red-600" /></div><div className="mt-2 text-2xl font-bold">{stats.blocked}</div></CardContent></Card>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)]">
          <Card className="overflow-hidden">
            <CardHeader className="space-y-3 border-b">
              <div><CardTitle>Contacts</CardTitle><CardDescription>Only documented consent enters the AI queue.</CardDescription></div>
              <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input className="pl-9" placeholder="Search business, owner, phone or city" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
              <div className="flex flex-wrap gap-2">{(['all', 'sms', 'monthly', 'due', 'blocked'] as FilterKey[]).map((key) => <Button key={key} size="sm" variant={filter === key ? 'default' : 'outline'} onClick={() => setFilter(key)} className={filter === key ? 'bg-slate-950' : ''}>{key === 'all' ? 'All' : key === 'sms' ? 'SMS' : key === 'monthly' ? 'Monthly AI' : key === 'due' ? 'Due now' : 'Blocked'}</Button>)}</div>
            </CardHeader>
            <CardContent className="max-h-[66vh] space-y-2 overflow-y-auto p-3">
              {visibleLeads.length === 0 && <div className="py-10 text-center text-sm text-slate-500">No contacts match this filter.</div>}
              {visibleLeads.map((lead) => (
                <button key={lead.id} onClick={() => setActiveLeadId(lead.id)} className={`w-full rounded-xl border p-3 text-left transition ${activeLeadId === lead.id ? 'border-red-400 bg-red-50' : 'bg-white hover:border-slate-300'}`}>
                  <div className="flex items-start justify-between gap-3"><div className="min-w-0"><div className="truncate font-semibold text-slate-950">{lead.business_name}</div><div className="truncate text-xs text-slate-500">{lead.contact_name || 'No owner name'} · {lead.phone}</div></div>{isAiDue(lead) && <Badge className="shrink-0 bg-amber-100 text-amber-800 hover:bg-amber-100">AI due</Badge>}</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {lead.sms_marketing_consent && !lead.sms_opted_out_at && <Badge variant="outline" className="border-emerald-300 text-emerald-700">SMS</Badge>}
                    {lead.ai_call_consent && !lead.ai_call_consent_revoked_at && <Badge variant="outline" className="border-blue-300 text-blue-700">{lead.ai_call_frequency === 'monthly' ? 'Monthly AI' : 'One-time AI'}</Badge>}
                    {(lead.do_not_call || lead.call_permission === false) && <Badge variant="destructive">Blocked</Badge>}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>{activeLead?.business_name || 'Select a contact'}</CardTitle><CardDescription>{activeLead ? `${activeLead.contact_name || 'No owner name'} · ${activeLead.phone}${activeLead.city ? ` · ${activeLead.city}` : ''}` : 'Choose a contact to review permission history.'}</CardDescription></CardHeader>
            <CardContent className="space-y-5">
              {!activeLead ? <div className="py-12 text-center text-sm text-slate-500">No contact selected.</div> : <>
                {activeLead.do_not_call && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"><div className="font-semibold">Do Not Call is active</div><p className="mt-1">Granting AI consent will not silently remove this block. Clear DNC only after explicit re-consent.</p><Button size="sm" variant="outline" className="mt-3 border-red-300" onClick={clearDnc} disabled={saving}>Clear DNC after explicit re-consent</Button></div>}

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border p-4"><div className="mb-2 flex items-center justify-between"><div className="font-semibold">SMS marketing</div><ShieldCheck className={`h-5 w-5 ${activeLead.sms_marketing_consent && !activeLead.sms_opted_out_at ? 'text-emerald-600' : 'text-slate-300'}`} /></div><div className="text-xs text-slate-500">Granted: {formatWhen(activeLead.sms_marketing_consent_at)} · {activeLead.sms_marketing_consent_source || 'no source'}</div><div className="mt-3 flex gap-2"><Button size="sm" onClick={() => recordConsent('sms', true)} disabled={saving}>Record SMS yes</Button><Button size="sm" variant="outline" onClick={() => recordConsent('sms', false)} disabled={saving}>Withdraw</Button></div></div>
                  <div className="rounded-xl border p-4"><div className="mb-2 flex items-center justify-between"><div className="font-semibold">AI voice</div><PhoneCall className={`h-5 w-5 ${activeLead.ai_call_consent && !activeLead.ai_call_consent_revoked_at ? 'text-blue-600' : 'text-slate-300'}`} /></div><div className="text-xs text-slate-500">Frequency: {activeLead.ai_call_frequency} · Next: {formatWhen(activeLead.ai_next_call_at)}</div><div className="mt-3 flex gap-2"><Button size="sm" onClick={() => recordConsent('ai', true)} disabled={saving || Boolean(activeLead.do_not_call)}>Record monthly AI yes</Button><Button size="sm" variant="outline" onClick={() => recordConsent('ai', false)} disabled={saving}>Withdraw</Button></div></div>
                </div>

                <div className="rounded-xl bg-slate-100 p-4 text-sm text-slate-700"><div className="font-semibold">Consent proof</div><div className="mt-2 grid gap-1 text-xs"><div>Consent phone: {activeLead.consent_phone || '—'}</div><div>Last AI call: {formatWhen(activeLead.ai_last_call_at)}</div><div>Referral code: {activeLead.marketing_referral_code || '—'}</div><div>Last marketing SMS: {formatWhen(activeLead.last_marketing_sms_at)}</div></div></div>
              </>}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OutboundConsent;
