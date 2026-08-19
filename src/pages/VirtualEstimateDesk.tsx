import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, RefreshCw, UserRound, Video } from 'lucide-react';
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

const VirtualEstimateDesk = () => {
  const [sessions, setSessions] = useState<DeskSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const load = useCallback(async () => {
    setLoading(true);
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
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const ordered = useMemo(() => [...sessions].sort((a, b) => {
    if (a.customerPresent !== b.customerPresent) return a.customerPresent ? -1 : 1;
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  }), [sessions]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon" className="text-slate-300"><Link to="/crm"><ArrowLeft className="h-5 w-5" /></Link></Button>
            <div><h1 className="text-xl font-bold">Virtual Estimates</h1><p className="text-xs text-slate-400">Join customer video estimate sessions</p></div>
          </div>
          <Button onClick={() => void load()} variant="outline" disabled={loading}><RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />Refresh</Button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-6">
        {error && (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5 text-amber-100">
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
            {ordered.map((session) => (
              <article key={session.sessionId} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10"><UserRound className="h-5 w-5 text-red-400" /></div>
                    <div className="min-w-0"><h2 className="truncate font-bold">{session.customerName || 'Customer'}</h2><p className="truncate text-xs text-slate-500">{session.address || session.customerEmail || session.customerPhone || 'No address yet'}</p></div>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${session.customerPresent ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>{session.customerPresent ? 'Online' : session.status}</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-slate-950 p-2.5"><span className="text-slate-500">Call</span><p className="mt-0.5 font-semibold capitalize text-slate-200">{session.callState || 'idle'}</p></div>
                  <div className="rounded-lg bg-slate-950 p-2.5"><span className="text-slate-500">Phone</span><p className="mt-0.5 truncate font-semibold text-slate-200">{session.customerPhone || '—'}</p></div>
                </div>

                <Button onClick={() => navigate(`/crm/virtual-estimate/${session.sessionId}`)} className="mt-4 w-full bg-red-600 hover:bg-red-700"><Video className="mr-2 h-4 w-4" />Open host call</Button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default VirtualEstimateDesk;