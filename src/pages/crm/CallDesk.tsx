import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock3,
  Copy,
  ExternalLink,
  Loader2,
  MapPin,
  MessageSquare,
  Phone,
  PhoneCall,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  UserPlus,
} from 'lucide-react';

type Lead = {
  id: string;
  list_id: string | null;
  business_name: string;
  contact_name: string | null;
  contact_email: string | null;
  phone: string;
  city: string | null;
  address: string | null;
  website: string | null;
  category: string | null;
  notes: string | null;
  status: string | null;
  attempts: number | null;
  last_called_at: string | null;
  next_call_at: string | null;
  do_not_call: boolean | null;
  call_permission: boolean | null;
  outcome: string | null;
  callback_at: string | null;
  follow_up_at: string | null;
  follow_up_note: string | null;
  route_order: number | null;
  created_at: string | null;
};

type CallList = {
  id: string;
  name: string;
  caller_number: string | null;
  offer: string | null;
  script: string | null;
};

type FilterKey = 'queue' | 'callbacks' | 'interested' | 'all';

type OutcomeKey =
  | 'interested'
  | 'quote_requested'
  | 'callback'
  | 'no_answer'
  | 'voicemail'
  | 'not_interested'
  | 'wrong_number'
  | 'do_not_call';

const db = supabase as any;

const terminalStatuses = new Set(['not_interested', 'wrong_number', 'do_not_call', 'booked', 'lost']);

const outcomeLabels: Record<OutcomeKey, string> = {
  interested: 'Interested',
  quote_requested: 'Quote Requested',
  callback: 'Callback',
  no_answer: 'No Answer',
  voicemail: 'Voicemail',
  not_interested: 'Not Interested',
  wrong_number: 'Wrong Number',
  do_not_call: 'Do Not Call',
};

const toLocalDateTimeInput = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const addHours = (hours: number) => new Date(Date.now() + hours * 60 * 60 * 1000);
const addDays = (days: number) => addHours(days * 24);

const normalizeWebsite = (website: string | null) => {
  if (!website) return null;
  return /^https?:\/\//i.test(website) ? website : `https://${website}`;
};

const buildFallbackPrep = (lead: Lead) => {
  const category = (lead.category || '').toLowerCase();
  let services = 'storefront window cleaning and exterior pressure washing';
  let reason = 'keeping the entrance, glass, and exterior looking consistently clean';

  if (/restaurant|cafe|coffee|food|bar/.test(category)) {
    services = 'storefront glass plus sidewalks / exterior pressure washing';
    reason = 'high foot traffic usually makes glass and entry areas dirty faster';
  } else if (/auto|dealer|car|mechanic/.test(category)) {
    services = 'storefront glass plus lot / exterior pressure washing';
    reason = 'presentation matters heavily for customer-facing automotive businesses';
  } else if (/property|strata|management|apartment|real estate/.test(category)) {
    services = 'recurring window cleaning plus building / walkway washing';
    reason = 'one vendor can handle repeat exterior upkeep across properties';
  } else if (/retail|shop|salon|dental|clinic|office/.test(category)) {
    services = 'recurring storefront glass plus entrance pressure washing';
    reason = 'clean glass and entrances directly affect the customer-facing appearance';
  }

  const contact = lead.contact_name ? ` ${lead.contact_name}` : '';
  return `OPENER\nHi${contact}, this is BC Pressure Washing. I’m reaching out because we help local businesses keep their storefront glass and exterior clean — do you currently have someone handling that?\n\nBEST PITCH\n${services}. ${reason}.\n\nASK\n• How often is the exterior currently cleaned?\n• Is there anything you wish your current cleaner handled better?\n• Who normally approves exterior cleaning work?\n\nIF THEY ALREADY HAVE SOMEONE\nTotally fair — I’m not asking you to switch today. Would it be useful if I sent over a backup quote so you have another option if you ever need it?`;
};

const CallDesk = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [lists, setLists] = useState<CallList[]>([]);
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterKey>('queue');
  const [callerPhone, setCallerPhone] = useState(() => localStorage.getItem('bcCallDeskCallerPhone') || '');
  const [sessionUser, setSessionUser] = useState<{ id: string; email: string | null } | null>(null);
  const [staffRole, setStaffRole] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [grantEmail, setGrantEmail] = useState('');
  const [granting, setGranting] = useState(false);
  const [todayCalls, setTodayCalls] = useState<any[]>([]);
  const [callHistory, setCallHistory] = useState<any[]>([]);
  const [callSid, setCallSid] = useState<string | null>(null);
  const [callStartedAt, setCallStartedAt] = useState<Date | null>(null);
  const [startingCall, setStartingCall] = useState(false);
  const [manualCall, setManualCall] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<OutcomeKey | null>(null);
  const [callbackAt, setCallbackAt] = useState(toLocalDateTimeInput(addDays(1)));
  const [roughNotes, setRoughNotes] = useState('');
  const [aiBrief, setAiBrief] = useState('');
  const [aiSummary, setAiSummary] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [smsDraft, setSmsDraft] = useState('');

  const activeLead = useMemo(
    () => leads.find((lead) => lead.id === activeLeadId) || null,
    [leads, activeLeadId],
  );

  const listById = useMemo(() => new Map(lists.map((item) => [item.id, item])), [lists]);

  const loadData = async (preserveLeadId?: string | null) => {
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
    setStaffRole(role);
    setIsAdmin(Boolean(adminCheck));

    if (!['admin', 'caller'].includes(role || '')) {
      toast.error('This login does not have Call Desk access.');
      navigate('/crm');
      return;
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [leadResult, listResult, callResult] = await Promise.all([
      db
        .from('storefront_call_leads')
        .select('*')
        .order('route_order', { ascending: true })
        .order('created_at', { ascending: true })
        .limit(500),
      db
        .from('storefront_call_lists')
        .select('id,name,caller_number,offer,script')
        .eq('archived', false)
        .order('created_at', { ascending: false }),
      db
        .from('outbound_calls')
        .select('id,lead_id,outcome,call_status,attempted_at,completed_at,call_duration,caller_user_id')
        .eq('caller_user_id', session.user.id)
        .gte('attempted_at', startOfDay.toISOString())
        .order('attempted_at', { ascending: false }),
    ]);

    if (leadResult.error) throw leadResult.error;
    if (listResult.error) throw listResult.error;
    if (callResult.error) throw callResult.error;

    const nextLeads = (leadResult.data || []) as Lead[];
    setLeads(nextLeads);
    setLists((listResult.data || []) as CallList[]);
    setTodayCalls(callResult.data || []);

    const preferredId = preserveLeadId && nextLeads.some((lead) => lead.id === preserveLeadId)
      ? preserveLeadId
      : activeLeadId && nextLeads.some((lead) => lead.id === activeLeadId)
        ? activeLeadId
        : nextLeads.find((lead) => !lead.do_not_call && lead.call_permission !== false && !terminalStatuses.has(lead.status || ''))?.id || null;

    setActiveLeadId(preferredId);
  };

  useEffect(() => {
    loadData()
      .catch((error) => {
        console.error(error);
        toast.error('Could not load the Call Desk.');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!activeLeadId) {
      setCallHistory([]);
      return;
    }

    db.from('outbound_calls')
      .select('id,call_status,outcome,attempted_at,completed_at,call_duration,notes,caller_email,callback_at')
      .eq('lead_id', activeLeadId)
      .order('attempted_at', { ascending: false })
      .limit(10)
      .then(({ data }: any) => setCallHistory(data || []));

    setCallSid(null);
    setCallStartedAt(null);
    setManualCall(false);
    setSelectedOutcome(null);
    setRoughNotes('');
    setAiBrief('');
    setAiSummary('');
    setSmsDraft('');
    setCallbackAt(toLocalDateTimeInput(addDays(1)));
  }, [activeLeadId]);

  const filteredLeads = useMemo(() => {
    const term = search.trim().toLowerCase();
    const now = Date.now();

    const matchesSearch = (lead: Lead) => {
      if (!term) return true;
      return [lead.business_name, lead.contact_name, lead.phone, lead.city, lead.address, lead.category]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term));
    };

    const eligible = (lead: Lead) => !lead.do_not_call && lead.call_permission !== false && !terminalStatuses.has(lead.status || '');

    return leads
      .filter(matchesSearch)
      .filter((lead) => {
        if (filter === 'all') return true;
        if (!eligible(lead)) return false;
        if (filter === 'callbacks') return Boolean(lead.callback_at || lead.next_call_at || lead.follow_up_at);
        if (filter === 'interested') return ['interested', 'quote_requested'].includes(lead.outcome || lead.status || '');
        return true;
      })
      .sort((a, b) => {
        const dueTime = (lead: Lead) => {
          const raw = lead.callback_at || lead.next_call_at || lead.follow_up_at;
          return raw ? new Date(raw).getTime() : Number.POSITIVE_INFINITY;
        };
        const aDue = dueTime(a);
        const bDue = dueTime(b);
        const aOverdue = aDue <= now;
        const bOverdue = bDue <= now;
        if (aOverdue !== bOverdue) return aOverdue ? -1 : 1;
        if (a.status === 'new' && b.status !== 'new') return -1;
        if (b.status === 'new' && a.status !== 'new') return 1;
        if (aDue !== bDue) return aDue - bDue;
        return (a.route_order || 0) - (b.route_order || 0);
      });
  }, [leads, search, filter]);

  const dueCallbacks = useMemo(() => {
    const now = Date.now();
    return leads.filter((lead) => {
      if (lead.do_not_call || lead.call_permission === false || terminalStatuses.has(lead.status || '')) return false;
      const due = lead.callback_at || lead.next_call_at || lead.follow_up_at;
      return Boolean(due && new Date(due).getTime() <= now);
    }).length;
  }, [leads]);

  const interestedToday = useMemo(
    () => todayCalls.filter((call) => ['interested', 'quote_requested'].includes(call.outcome || '')).length,
    [todayCalls],
  );

  const quoteRequestsToday = useMemo(
    () => todayCalls.filter((call) => call.outcome === 'quote_requested').length,
    [todayCalls],
  );

  const saveCallerPhone = (value: string) => {
    setCallerPhone(value);
    localStorage.setItem('bcCallDeskCallerPhone', value);
  };

  const runAiAssist = async (action: 'prep' | 'summary') => {
    if (!activeLead) return;
    const setBusy = action === 'prep' ? setAiLoading : setSummaryLoading;
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-chatbot', {
        body: {
          mode: 'call_desk_assist',
          action,
          business_name: activeLead.business_name,
          contact_name: activeLead.contact_name,
          category: activeLead.category,
          city: activeLead.city,
          address: activeLead.address,
          website: activeLead.website,
          notes: action === 'summary' ? roughNotes : activeLead.notes,
          outcome: selectedOutcome ? outcomeLabels[selectedOutcome] : null,
        },
      });
      if (error) throw error;
      if (!data?.text) throw new Error('Empty AI response');
      if (action === 'prep') setAiBrief(data.text);
      else setAiSummary(data.text);
    } catch (error) {
      console.error(error);
      if (action === 'prep') {
        setAiBrief(buildFallbackPrep(activeLead));
        toast.info('Using the built-in call brief.');
      } else {
        toast.error('Could not summarize these notes.');
      }
    } finally {
      setBusy(false);
    }
  };

  const startHumanCall = async () => {
    if (!activeLead) return;
    if (!callerPhone.trim()) {
      toast.error('Enter the phone number the caller will answer first.');
      return;
    }

    setStartingCall(true);
    try {
      const { data, error } = await supabase.functions.invoke('start-human-outbound-call', {
        body: {
          lead_id: activeLead.id,
          caller_number: callerPhone.trim(),
        },
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Call could not be started');

      setCallSid(data.callSid || null);
      setCallStartedAt(new Date());
      setManualCall(false);
      toast.success(data.message || `Connecting you to ${activeLead.business_name}`);
      await loadData(activeLead.id);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || 'Could not start the call.');
    } finally {
      setStartingCall(false);
    }
  };

  const startManualCall = () => {
    if (!activeLead) return;
    setCallSid(null);
    setCallStartedAt(new Date());
    setManualCall(true);
    window.location.href = `tel:${activeLead.phone}`;
  };

  const chooseOutcome = (outcome: OutcomeKey) => {
    setSelectedOutcome(outcome);
    if (outcome === 'callback') setCallbackAt(toLocalDateTimeInput(addDays(1)));
    if (outcome === 'quote_requested') setCallbackAt(toLocalDateTimeInput(addHours(4)));
    if (outcome === 'interested') setCallbackAt(toLocalDateTimeInput(addDays(1)));
  };

  const upsertFollowUpTask = async (lead: Lead, outcome: OutcomeKey, dueAt: string) => {
    const { data: existing } = await db
      .from('sales_follow_up_tasks')
      .select('id')
      .eq('source_type', 'storefront_call')
      .eq('source_id', lead.id)
      .eq('status', 'open')
      .limit(1);

    const task = {
      source_type: 'storefront_call',
      source_id: lead.id,
      rule_key: `human_call_${outcome}`,
      due_at: dueAt,
      status: 'open',
      priority: outcome === 'quote_requested' ? 1 : 2,
      automatic: true,
      title: outcome === 'quote_requested' ? `Prepare quote for ${lead.business_name}` : `Follow up with ${lead.business_name}`,
      reason: `Human cold-call outcome: ${outcomeLabels[outcome]}`,
      contact_name: lead.contact_name,
      contact_phone: lead.phone,
      contact_email: lead.contact_email,
      address: lead.address,
      quote_id: null,
      customer_id: null,
      metadata: {
        business_name: lead.business_name,
        category: lead.category,
        outcome,
        source: 'call_desk',
      },
      updated_at: new Date().toISOString(),
    };

    if (existing?.[0]?.id) {
      const { error } = await db.from('sales_follow_up_tasks').update(task).eq('id', existing[0].id);
      if (error) throw error;
    } else {
      const { error } = await db.from('sales_follow_up_tasks').insert(task);
      if (error) throw error;
    }
  };

  const closeOpenFollowUps = async (leadId: string) => {
    await db
      .from('sales_follow_up_tasks')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        last_action: 'closed_from_call_desk',
        updated_at: new Date().toISOString(),
      })
      .eq('source_type', 'storefront_call')
      .eq('source_id', leadId)
      .eq('status', 'open');
  };

  const buildSmsDraft = (lead: Lead, outcome: OutcomeKey) => {
    const hello = lead.contact_name ? `Hi ${lead.contact_name.split(' ')[0]}` : `Hi ${lead.business_name}`;
    if (outcome === 'quote_requested') {
      return `${hello}, this is BC Pressure Washing. Thanks for taking my call. I’ll get the exterior cleaning quote together for you and follow up shortly.`;
    }
    if (outcome === 'callback') {
      return `${hello}, this is BC Pressure Washing. Thanks for speaking with me. I’ve got your callback noted and I’ll reach out at the time we discussed.`;
    }
    return `${hello}, this is BC Pressure Washing. Thanks for taking my call. If you’d like, I can send over options for keeping the storefront glass and exterior cleaned on a regular schedule.`;
  };

  const saveOutcome = async () => {
    if (!activeLead || !selectedOutcome || !sessionUser) {
      toast.error('Choose a call outcome first.');
      return;
    }

    if (selectedOutcome === 'callback' && !callbackAt) {
      toast.error('Choose a callback time.');
      return;
    }

    setSaving(true);
    const now = new Date();
    try {
      let dueAt: string | null = null;
      if (selectedOutcome === 'callback') dueAt = new Date(callbackAt).toISOString();
      if (selectedOutcome === 'quote_requested') dueAt = new Date(callbackAt || addHours(4)).toISOString();
      if (selectedOutcome === 'interested') dueAt = new Date(callbackAt || addDays(1)).toISOString();
      if (selectedOutcome === 'no_answer') dueAt = addDays(2).toISOString();
      if (selectedOutcome === 'voicemail') dueAt = addDays(3).toISOString();

      const durationSeconds = callStartedAt ? Math.max(0, Math.round((now.getTime() - callStartedAt.getTime()) / 1000)) : null;
      const combinedNotes = [roughNotes.trim(), aiSummary.trim()].filter(Boolean).join('\n\nAI summary:\n');

      if (callSid) {
        const { error } = await db
          .from('outbound_calls')
          .update({
            call_status: 'completed',
            completed_at: now.toISOString(),
            call_duration: durationSeconds,
            outcome: selectedOutcome,
            callback_at: dueAt,
            notes: combinedNotes || null,
            voicemail_left: selectedOutcome === 'voicemail',
            updated_at: now.toISOString(),
          })
          .eq('call_sid', callSid);
        if (error) throw error;
      } else {
        const { error } = await db.from('outbound_calls').insert({
          list_id: activeLead.list_id,
          lead_id: activeLead.id,
          phone_number: activeLead.phone,
          campaign_name: listById.get(activeLead.list_id || '')?.name || 'Manual human calling',
          call_status: 'completed',
          attempted_at: callStartedAt?.toISOString() || now.toISOString(),
          completed_at: now.toISOString(),
          call_duration: durationSeconds,
          outcome: selectedOutcome,
          callback_at: dueAt,
          notes: combinedNotes || null,
          voicemail_left: selectedOutcome === 'voicemail',
          caller_user_id: sessionUser.id,
          caller_email: sessionUser.email,
        });
        if (error) throw error;
      }

      const terminal = ['not_interested', 'wrong_number', 'do_not_call'].includes(selectedOutcome);
      const existingNotes = activeLead.notes?.trim();
      const historyNote = `[${now.toLocaleString()}] Human call — ${outcomeLabels[selectedOutcome]}${combinedNotes ? `\n${combinedNotes}` : ''}`;
      const leadPatch: Record<string, any> = {
        status: selectedOutcome,
        outcome: selectedOutcome,
        last_called_at: now.toISOString(),
        callback_at: selectedOutcome === 'callback' ? dueAt : null,
        next_call_at: ['no_answer', 'voicemail', 'callback'].includes(selectedOutcome) ? dueAt : null,
        follow_up_at: ['interested', 'quote_requested'].includes(selectedOutcome) ? dueAt : null,
        follow_up_note: dueAt ? `${outcomeLabels[selectedOutcome]} follow-up` : null,
        notes: [existingNotes, historyNote].filter(Boolean).join('\n\n'),
        updated_at: now.toISOString(),
      };

      if (manualCall) leadPatch.attempts = Number(activeLead.attempts || 0) + 1;
      if (selectedOutcome === 'do_not_call') {
        leadPatch.do_not_call = true;
        leadPatch.call_permission = false;
        leadPatch.callback_at = null;
        leadPatch.next_call_at = null;
        leadPatch.follow_up_at = null;
      }

      const { error: leadError } = await db.from('storefront_call_leads').update(leadPatch).eq('id', activeLead.id);
      if (leadError) throw leadError;

      if (['callback', 'interested', 'quote_requested'].includes(selectedOutcome) && dueAt) {
        await upsertFollowUpTask(activeLead, selectedOutcome, dueAt);
      } else if (terminal) {
        await closeOpenFollowUps(activeLead.id);
      }

      if (['callback', 'interested', 'quote_requested'].includes(selectedOutcome)) {
        setSmsDraft(buildSmsDraft(activeLead, selectedOutcome));
      } else {
        setSmsDraft('');
      }

      toast.success(`${activeLead.business_name}: ${outcomeLabels[selectedOutcome]} saved`);
      await loadData(activeLead.id);
    } catch (error) {
      console.error(error);
      toast.error('Could not save this call outcome.');
    } finally {
      setSaving(false);
    }
  };

  const goToNextLead = () => {
    if (!activeLeadId || filteredLeads.length === 0) return;
    const currentIndex = filteredLeads.findIndex((lead) => lead.id === activeLeadId);
    const next = filteredLeads[(currentIndex + 1) % filteredLeads.length];
    if (next) setActiveLeadId(next.id);
  };

  const copySms = async () => {
    if (!smsDraft) return;
    await navigator.clipboard.writeText(smsDraft);
    toast.success('SMS draft copied.');
  };

  const grantCallerAccess = async () => {
    const email = grantEmail.trim().toLowerCase();
    if (!email || !isAdmin) return;
    setGranting(true);
    try {
      const { data: existing, error: findError } = await db
        .from('admin_users')
        .select('id,email,role')
        .ilike('email', email)
        .limit(1);
      if (findError) throw findError;

      if (existing?.[0]?.id) {
        const { error } = await db.from('admin_users').update({ role: 'caller', updated_at: new Date().toISOString() }).eq('id', existing[0].id);
        if (error) throw error;
      } else {
        const { error } = await db.from('admin_users').insert({ id: crypto.randomUUID(), email, role: 'caller' });
        if (error) throw error;
      }

      setGrantEmail('');
      toast.success(`${email} now has Call Desk access.`);
    } catch (error) {
      console.error(error);
      toast.error('Could not grant caller access.');
    } finally {
      setGranting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/crm')} aria-label="Back to CRM">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <PhoneCall className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-bold">Human Call Desk</h1>
              </div>
              <p className="text-xs text-muted-foreground">Human speaks · AI prepares, organizes, and follows up</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="hidden sm:inline-flex capitalize">{staffRole || 'staff'}</Badge>
            <Button variant="outline" size="sm" onClick={() => loadData(activeLeadId)}>
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] space-y-4 px-4 py-4">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Calls Today</p><p className="text-2xl font-bold">{todayCalls.length}</p></CardContent></Card>
          <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Interested</p><p className="text-2xl font-bold">{interestedToday}</p></CardContent></Card>
          <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Quote Requests</p><p className="text-2xl font-bold">{quoteRequestsToday}</p></CardContent></Card>
          <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Due Callbacks</p><p className="text-2xl font-bold">{dueCallbacks}</p></CardContent></Card>
          <Card className="col-span-2 lg:col-span-1"><CardContent className="p-4"><p className="text-xs text-muted-foreground">Actionable Leads</p><p className="text-2xl font-bold">{filteredLeads.length}</p></CardContent></Card>
        </div>

        <div className="grid gap-4 xl:grid-cols-[390px_minmax(0,1fr)]">
          <Card className="h-fit xl:sticky xl:top-20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Call Queue</CardTitle>
              <CardDescription>Due callbacks rise to the top automatically.</CardDescription>
              <div className="relative pt-2">
                <Search className="absolute left-3 top-5 h-4 w-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search business, city, phone..."
                  className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="grid grid-cols-4 gap-1 pt-2">
                {(['queue', 'callbacks', 'interested', 'all'] as FilterKey[]).map((key) => (
                  <Button key={key} size="sm" variant={filter === key ? 'default' : 'outline'} onClick={() => setFilter(key)} className="px-2 capitalize">
                    {key}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="max-h-[68vh] space-y-2 overflow-y-auto pr-2">
              {filteredLeads.length === 0 ? (
                <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">No leads match this view.</div>
              ) : filteredLeads.map((lead) => {
                const dueRaw = lead.callback_at || lead.next_call_at || lead.follow_up_at;
                const overdue = dueRaw ? new Date(dueRaw).getTime() <= Date.now() : false;
                return (
                  <button
                    type="button"
                    key={lead.id}
                    onClick={() => setActiveLeadId(lead.id)}
                    className={`w-full rounded-lg border p-3 text-left transition hover:bg-muted/60 ${activeLeadId === lead.id ? 'border-primary bg-primary/5' : 'bg-background'}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{lead.business_name}</p>
                        <p className="truncate text-xs text-muted-foreground">{lead.category || 'Business'} · {lead.city || 'Unknown city'}</p>
                      </div>
                      <Badge variant={overdue ? 'destructive' : 'outline'} className="shrink-0 text-[10px] capitalize">
                        {overdue ? 'Due' : (lead.outcome || lead.status || 'new').replaceAll('_', ' ')}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{lead.phone}</span>
                      <span>{lead.attempts || 0} attempts</span>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {!activeLead ? (
            <Card><CardContent className="p-12 text-center text-muted-foreground">Choose a lead from the queue.</CardContent></Card>
          ) : (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="text-2xl">{activeLead.business_name}</CardTitle>
                        <Badge variant="outline" className="capitalize">{(activeLead.outcome || activeLead.status || 'new').replaceAll('_', ' ')}</Badge>
                      </div>
                      <CardDescription className="mt-1">{listById.get(activeLead.list_id || '')?.name || 'Storefront prospect'} · {activeLead.attempts || 0} attempts</CardDescription>
                    </div>
                    <Button variant="outline" onClick={goToNextLead}>Next Lead</Button>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-muted-foreground" /><span>{activeLead.category || 'Business'}</span></div>
                    {activeLead.contact_name && <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-muted-foreground" /><span>{activeLead.contact_name}</span></div>}
                    <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /><span>{activeLead.phone}</span></div>
                    {activeLead.address && <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" /><span>{activeLead.address}</span></div>}
                  </div>
                  <div className="space-y-3">
                    {normalizeWebsite(activeLead.website) && (
                      <a className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline" href={normalizeWebsite(activeLead.website)!} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" /> Open business website
                      </a>
                    )}
                    {activeLead.notes && <div className="rounded-md bg-muted p-3 text-sm"><span className="font-medium">Existing notes: </span>{activeLead.notes.slice(-600)}</div>}
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg"><Sparkles className="h-5 w-5 text-primary" /> AI Call Prep</CardTitle>
                    <CardDescription>AI helps the human caller. It does not speak to the prospect.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" onClick={() => runAiAssist('prep')} disabled={aiLoading}>
                      {aiLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                      Build Call Brief
                    </Button>
                    <div className="min-h-48 whitespace-pre-wrap rounded-lg border bg-muted/30 p-4 text-sm leading-6">
                      {aiBrief || buildFallbackPrep(activeLead)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg"><PhoneCall className="h-5 w-5 text-primary" /> Start Call</CardTitle>
                    <CardDescription>Twilio calls the employee first, then bridges them to the storefront.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <label className="block text-sm font-medium">Caller’s live phone</label>
                    <input
                      value={callerPhone}
                      onChange={(event) => saveCallerPhone(event.target.value)}
                      placeholder="604-555-0123"
                      className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Button onClick={startHumanCall} disabled={startingCall || activeLead.do_not_call || activeLead.call_permission === false}>
                        {startingCall ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PhoneCall className="mr-2 h-4 w-4" />}
                        Call Through Desk
                      </Button>
                      <Button variant="outline" onClick={startManualCall} disabled={activeLead.do_not_call || activeLead.call_permission === false}>
                        <Phone className="mr-2 h-4 w-4" /> Call Direct
                      </Button>
                    </div>
                    {(callStartedAt || callSid) && (
                      <div className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-800">
                        <CheckCircle2 className="mr-2 inline h-4 w-4" /> Call started. Save the result below when finished.
                      </div>
                    )}
                    {(activeLead.do_not_call || activeLead.call_permission === false) && (
                      <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">Calling is disabled for this lead.</div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Call Result</CardTitle>
                  <CardDescription>One click sets the lead state and the right follow-up timing.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {(Object.keys(outcomeLabels) as OutcomeKey[]).map((outcome) => (
                      <Button
                        key={outcome}
                        type="button"
                        variant={selectedOutcome === outcome ? 'default' : 'outline'}
                        className={outcome === 'do_not_call' && selectedOutcome === outcome ? 'bg-destructive hover:bg-destructive/90' : ''}
                        onClick={() => chooseOutcome(outcome)}
                      >
                        {outcomeLabels[outcome]}
                      </Button>
                    ))}
                  </div>

                  {selectedOutcome && ['callback', 'interested', 'quote_requested'].includes(selectedOutcome) && (
                    <div className="max-w-sm">
                      <label className="mb-1 block text-sm font-medium">
                        {selectedOutcome === 'callback' ? 'Callback date & time' : 'Follow-up date & time'}
                      </label>
                      <input
                        type="datetime-local"
                        value={callbackAt}
                        onChange={(event) => setCallbackAt(event.target.value)}
                        className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                      />
                    </div>
                  )}

                  <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                      <label className="mb-1 block text-sm font-medium">Caller notes</label>
                      <Textarea value={roughNotes} onChange={(event) => setRoughNotes(event.target.value)} placeholder="Owner said current cleaner comes monthly; interested in a backup quote..." className="min-h-28" />
                    </div>
                    <Button variant="outline" onClick={() => runAiAssist('summary')} disabled={!roughNotes.trim() || summaryLoading}>
                      {summaryLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                      Clean Up Notes
                    </Button>
                  </div>

                  {aiSummary && (
                    <div className="rounded-lg border bg-muted/30 p-3 text-sm">
                      <p className="mb-1 font-medium">AI summary</p>
                      <p className="whitespace-pre-wrap">{aiSummary}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Button onClick={saveOutcome} disabled={!selectedOutcome || saving}>
                      {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
                      Save Result
                    </Button>
                    <Button variant="outline" onClick={goToNextLead}>Skip / Next Lead</Button>
                  </div>
                </CardContent>
              </Card>

              {smsDraft && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg"><MessageSquare className="h-5 w-5" /> Follow-up SMS Draft</CardTitle>
                    <CardDescription>Review it first. The system does not automatically text cold prospects.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-lg border bg-muted/30 p-3 text-sm">{smsDraft}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={copySms}><Copy className="mr-2 h-4 w-4" /> Copy</Button>
                      <Button variant="outline" asChild>
                        <a href={`sms:${activeLead.phone}?&body=${encodeURIComponent(smsDraft)}`}><MessageSquare className="mr-2 h-4 w-4" /> Open SMS</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4 lg:grid-cols-2">
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Clock3 className="h-5 w-5" /> Recent Calls</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    {callHistory.length === 0 ? <p className="text-sm text-muted-foreground">No calls logged yet.</p> : callHistory.map((call) => (
                      <div key={call.id} className="rounded-lg border p-3 text-sm">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium capitalize">{String(call.outcome || call.call_status || 'call').replaceAll('_', ' ')}</span>
                          <span className="text-xs text-muted-foreground">{call.attempted_at ? new Date(call.attempted_at).toLocaleString() : ''}</span>
                        </div>
                        {call.caller_email && <p className="mt-1 text-xs text-muted-foreground">Caller: {call.caller_email}</p>}
                        {call.notes && <p className="mt-2 text-muted-foreground">{call.notes}</p>}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {isAdmin && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg"><UserPlus className="h-5 w-5" /> Caller Access</CardTitle>
                      <CardDescription>Give a hired caller Call Desk access without making them an admin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <input
                        type="email"
                        value={grantEmail}
                        onChange={(event) => setGrantEmail(event.target.value)}
                        placeholder="caller@example.com"
                        className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                      />
                      <Button onClick={grantCallerAccess} disabled={!grantEmail.trim() || granting}>
                        {granting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                        Grant Call Desk Access
                      </Button>
                      <p className="text-xs text-muted-foreground">Add their email here, then they sign in through the normal CRM login with that same email.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CallDesk;
