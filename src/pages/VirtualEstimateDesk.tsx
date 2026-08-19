import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Link2, Loader2, Plus, RefreshCw, Send, UserRound, Video } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface DeskSession {
  sessionId: string;
  status: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  customerPresent: boolean;
  hostPresent: boolean;
  callState: string;
  createdAt: string | null;
}

interface InviteResponse {
  inviteUrl?: string;
  sent?: boolean;
  delivery?: { error?: string | null } | null;
  error?: string;
}

const emptyInvite = { customerName: '', customerPhone: '', customerEmail: '', address: '' };
const LIVE_INVITE_ORIGIN = window.location.origin;

const toLiveInviteUrl = (value?: string) => {
  if (!value) return '';
  try {
    const url = new URL(value);
    return `${LIVE_INVITE_ORIGIN}${url.pathname}${url.search}${url.hash}`;
  } catch {
    return value;
  }
};

const VirtualEstimateDesk = () => {
  const [sessions, setSessions] = useState<DeskSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [invite, setInvite] = useState(emptyInvite);
  const [inviteBusy, setInviteBusy] = useState(false);
  const [sessionBusy, setSessionBusy] = useState('');
  const [inviteNotice, setInviteNotice] = useState('');
  const [latestInviteUrl, setLatestInviteUrl] = useState('');
  const navigate = useNavigate();

  const load = useCallback(async (showSpinner = true) => {
    if (showSpinner) setLoading(true);
    try {
      const { data, error: invokeError } = await supabase.functions.invoke('virtual-estimate-session', {
        body: { action: 'admin_list' },
      });
      if (invokeError) throw invokeError;
      if (data?.error) throw new Error(data.error);
      setSessions(Array.isArray(data?.sessions) ? data.sessions : []);
      setError('');
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : 'Could not load virtual estimates.';
      setError(message.includes('FunctionsHttpError') ? 'Sign in with an admin account to manage virtual estimates.' : message);
    } finally {
      if (showSpinner) setLoading(false);
    }
  }, []);

  const runInviteAction = useCallback(async (body: Record<string, unknown>): Promise<InviteResponse> => {
    const { data, error: invokeError } = await supabase.functions.invoke('virtual-estimate-session', { body });
    if (invokeError) throw invokeError;
    if (data?.error) throw new Error(data.error);
    return data as InviteResponse;
  }, []);

  useEffect(() => {
    void load(true);
    const timer = window.setInterval(() => void load(false), 3000);
    return () => window.clearInterval(timer);
  }, [load]);

  const ordered = useMemo(() => [...sessions].sort((a, b) => {
    if (a.customerPresent !== b.customerPresent) return a.customerPresent ? -1 : 1;
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  }), [sessions]);

  const createInvite = async (event: FormEvent) => {
    event.preventDefault();
    setInviteBusy(true);
    setInviteNotice('');
    setLatestInviteUrl('');
    try {
      const result = await runInviteAction({ action: 'admin_create', ...invite, send: true });
      const liveUrl = toLiveInviteUrl(result.inviteUrl);
      setLatestInviteUrl(liveUrl);
      setInviteNotice(result.sent
        ? 'Invite created and sent with the secure Virtual Estimate link.'
        : `Invite created. ${result.delivery?.error || 'Delivery was not confirmed — copy the secure link below.'}`);
      setInvite(emptyInvite);
      await load(false);
    } catch (inviteError) {
      setInviteNotice(inviteError instanceof Error ? inviteError.message : 'Could not create the invite.');
    } finally {
      setInviteBusy(false);
    }
  };

  const copyCustomerLink = async (sessionId: string) => {
    setSessionBusy(sessionId);
    setInviteNotice('');
    try {
      const result = await runInviteAction({ action: 'admin_get_link', sessionId });
      const liveUrl = toLiveInviteUrl(result.inviteUrl);
      if (!liveUrl) throw new Error('Customer link was not returned.');
      await navigator.clipboard.writeText(liveUrl);
      setLatestInviteUrl(liveUrl);
      setInviteNotice('Secure customer link copied. It includes the invite token and opens this app.');
    } catch (linkError) {
      setInviteNotice(linkError instanceof Error ? linkError.message : 'Could not copy the customer link.');
    } finally {
      setSessionBusy('');
    }
  };

  const resendInvite = async (sessionId: string) => {
    setSessionBusy(sessionId);
    setInviteNotice('');
    try {
      const result = await runInviteAction({ action: 'admin_resend', sessionId });
      setLatestInviteUrl(toLiveInviteUrl(result.inviteUrl));
      setInviteNotice(result.sent
        ? 'Invite resent with the secure Virtual Estimate link.'
        : `Secure link generated, but delivery was not confirmed. ${result.delivery?.error || ''}`.trim());
    } catch (resendError) {
      setInviteNotice(resendError instanceof Error ? resendError.message : 'Could not resend the invite.');
    } finally {
      setSessionBusy('');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon" className="text-slate-300"><Link to="/crm"><ArrowLeft className="h-5 w-5" /></Link></Button>
            <div><h1 className="text-xl font-bold">Virtual Estimates</h1><p className="text-xs text-slate-400">Create secure invites and host live customer calls</p></div>
          </div>
          <Button onClick={() => void load(true)} variant="outline" disabled={loading}><RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />Refresh</Button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <form onSubmit={createInvite} className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10"><Plus className="h-5 w-5 text-red-400" /></div>
            <div><h2 className="font-bold">Invite a customer</h2><p className="text-xs text-slate-400">Links are generated server-side and kept on the current app.</p></div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <input value={invite.customerName} onChange={(e) => setInvite((v) => ({ ...v, customerName: e.target.value }))} placeholder="Customer name" className="h-11 rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm outline-none focus:border-red-500" />
            <input value={invite.customerPhone} onChange={(e) => setInvite((v) => ({ ...v, customerPhone: e.target.value }))} placeholder="Phone" inputMode="tel" className="h-11 rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm outline-none focus:border-red-500" />
            <input value={invite.customerEmail} onChange={(e) => setInvite((v) => ({ ...v, customerEmail: e.target.value }))} placeholder="Email" type="email" className="h-11 rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm outline-none focus:border-red-500" />
            <input value={invite.address} onChange={(e) => setInvite((v) => ({ ...v, address: e.target.value }))} placeholder="Property address" className="h-11 rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm outline-none focus:border-red-500" />
          </div>
          <Button type="submit" disabled={inviteBusy || (!invite.customerPhone.trim() && !invite.customerEmail.trim())} className="mt-4 h-11 w-full bg-red-600 hover:bg-red-700 md:w-auto">
            {inviteBusy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}Create & send secure invite
          </Button>
        </form>

        {inviteNotice && (
          <div className="mb-6 rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm text-slate-200">
            <p>{inviteNotice}</p>
            {latestInviteUrl && <div className="mt-2 flex items-center gap-2 rounded-lg bg-slate-950 p-2"><Link2 className="h-4 w-4 shrink-0 text-red-400" /><span className="min-w-0 flex-1 truncate text-xs text-slate-400">{latestInviteUrl}</span><button type="button" onClick={() => void navigator.clipboard.writeText(latestInviteUrl)} className="rounded-md p-1.5 hover:bg-slate-800" aria-label="Copy link"><Copy className="h-4 w-4" /></button></div>}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5 text-amber-100">
            <p>{error}</p>
            <Button asChild className="mt-4"><Link to="/crm">Open CRM sign-in</Link></Button>
          </div>
        )}

        {loading && sessions.length === 0 ? (
          <div className="flex min-h-[40vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-red-500" /></div>
        ) : !error && ordered.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">No virtual estimate sessions yet.</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ordered.map((session) => {
              const busy = sessionBusy === session.sessionId;
              return (
                <article key={session.sessionId} className={`rounded-2xl border bg-slate-900 p-5 shadow-lg ${session.customerPresent ? 'border-emerald-500/50' : 'border-slate-800'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10"><UserRound className="h-5 w-5 text-red-400" /></div>
                      <div className="min-w-0"><h2 className="truncate font-bold">{session.customerName || 'Customer'}</h2><p className="truncate text-xs text-slate-500">{session.address || session.customerEmail || session.customerPhone || 'No address yet'}</p></div>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${session.customerPresent ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>{session.customerPresent ? 'Live now' : session.status}</span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-slate-950 p-2.5"><span className="text-slate-500">Call</span><p className="mt-0.5 font-semibold capitalize text-slate-200">{session.callState || 'idle'}</p></div>
                    <div className="rounded-lg bg-slate-950 p-2.5"><span className="text-slate-500">Phone</span><p className="mt-0.5 truncate font-semibold text-slate-200">{session.customerPhone || '—'}</p></div>
                  </div>

                  <Button onClick={() => navigate(`/crm/virtual-estimate/${session.sessionId}`)} className="mt-4 w-full bg-red-600 hover:bg-red-700"><Video className="mr-2 h-4 w-4" />{session.customerPresent ? 'Join live customer' : 'Open host call'}</Button>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <Button type="button" variant="outline" disabled={busy} onClick={() => void copyCustomerLink(session.sessionId)}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Copy className="mr-2 h-4 w-4" />}Copy link</Button>
                    <Button type="button" variant="outline" disabled={busy} onClick={() => void resendInvite(session.sessionId)}><Send className="mr-2 h-4 w-4" />Resend</Button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default VirtualEstimateDesk;
