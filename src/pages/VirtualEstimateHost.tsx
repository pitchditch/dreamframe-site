import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Camera,
  CameraOff,
  CheckCircle2,
  ClipboardList,
  Languages,
  Loader2,
  Mic,
  MicOff,
  PhoneOff,
  Sparkles,
  UserRound,
  Video,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useVirtualEstimateCall } from '@/hooks/useVirtualEstimateCall';
import { useVirtualEstimateAi } from '@/hooks/useVirtualEstimateAi';

interface HostSession {
  sessionId: string;
  status: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  hostPresent: boolean;
  customerPresent: boolean;
  callState: string;
  customerCallReady: boolean;
  hostCallReady: boolean;
  callStartedAt: string | null;
}

const SERVICE_LABELS: Record<string, string> = {
  window_cleaning: 'Window cleaning',
  gutter_cleaning: 'Gutter cleaning',
  roof_cleaning: 'Roof cleaning',
  house_wash: 'House wash',
  pressure_washing: 'Pressure washing',
  driveway_cleaning: 'Driveway cleaning',
  patio_cleaning: 'Patio cleaning',
  deck_cleaning: 'Deck cleaning',
  storefront_window_cleaning: 'Storefront windows',
  other: 'Other service',
};

const labelPricingKey = (key: string) => key.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

const VirtualEstimateHost = () => {
  const { sessionId = '' } = useParams();
  const [session, setSession] = useState<HostSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const request = useCallback(async (action: string, extra: Record<string, unknown> = {}) => {
    const { data, error: invokeError } = await supabase.functions.invoke('virtual-estimate-session', {
      body: { action, sessionId, ...extra },
    });
    if (invokeError) throw invokeError;
    if (data?.error) throw new Error(data.error);
    if (!data?.session) throw new Error('Virtual estimate session not found.');
    return data.session as HostSession;
  }, [sessionId]);

  const call = useVirtualEstimateCall({ sessionId, role: 'host' });
  const ai = useVirtualEstimateAi({ sessionId, role: 'agent', sourceStream: call.localStream });

  useEffect(() => { if (localVideoRef.current) localVideoRef.current.srcObject = call.localStream; }, [call.localStream]);
  useEffect(() => { if (remoteVideoRef.current) remoteVideoRef.current.srcObject = call.remoteStream; }, [call.remoteStream]);

  const loadSession = useCallback(async () => {
    try {
      const next = await request('view');
      setSession(next);
      setError('');
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : 'Could not load the virtual estimate.';
      setError(message.includes('FunctionsHttpError') ? 'Admin access is required to host this estimate.' : message);
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    let cancelled = false;
    const enter = async () => {
      try {
        const next = await request('host_presence');
        if (!cancelled) {
          setSession(next);
          setError('');
        }
      } catch (enterError) {
        if (!cancelled) {
          const message = enterError instanceof Error ? enterError.message : 'Could not open host mode.';
          setError(message.includes('FunctionsHttpError') ? 'Admin access is required to host this estimate.' : message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void enter();
    const timer = window.setInterval(async () => {
      await request('host_presence').then(setSession).catch(() => undefined);
    }, 4500);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
      void request('host_leave').catch(() => undefined);
    };
  }, [request]);

  useEffect(() => {
    const timer = window.setInterval(() => void loadSession(), 5000);
    return () => window.clearInterval(timer);
  }, [loadSession]);

  useEffect(() => {
    if (call.callState === 'connected' && ai.enabled && !ai.recording && !ai.starting) void ai.start();
  }, [ai.enabled, ai.recording, ai.start, ai.starting, call.callState]);

  useEffect(() => {
    if (!ai.enabled && ai.recording) ai.stop(false);
  }, [ai.enabled, ai.recording, ai.stop]);

  const finishEstimate = async () => {
    await call.hangUp().catch(() => undefined);
    try {
      const next = await request('end');
      setSession(next);
    } catch {
      setError('The call ended, but the estimate session could not be marked complete.');
    }
  };

  const callActive = ['starting', 'waiting', 'connecting', 'connected'].includes(call.callState);
  const services = ai.summary.services || [];
  const pricingEntries = Object.entries(ai.summary.pricingInputs || {}).filter(([, value]) => value !== null && value !== '' && value !== undefined);
  const recentEvents = useMemo(() => [...ai.events].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 10), [ai.events]);

  if (loading) return <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center"><Loader2 className="h-9 w-9 animate-spin text-red-500" /></main>;

  if (error && !session) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-5">
        <div className="max-w-md w-full rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
          <h1 className="text-xl font-bold">Host access unavailable</h1>
          <p className="mt-2 text-sm text-slate-400">{error}</p>
          <Button asChild className="mt-5 w-full"><Link to="/crm">Open CRM sign-in</Link></Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <Button asChild variant="ghost" size="icon" className="text-slate-300"><Link to="/crm/virtual-estimates"><ArrowLeft className="h-5 w-5" /></Link></Button>
            <div className="min-w-0">
              <p className="font-bold truncate">{session?.customerName || 'Virtual Estimate'}</p>
              <p className="text-xs text-slate-400 truncate">{session?.address || session?.customerEmail || session?.customerPhone || sessionId}</p>
            </div>
          </div>
          <div className={`rounded-full px-3 py-1 text-xs font-semibold ${session?.customerPresent ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-200'}`}>
            {session?.customerPresent ? 'Customer online' : 'Waiting for customer'}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.75fr)]">
        <section className="space-y-5">
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-2xl">
            {callActive ? (
              <div className="relative aspect-video min-h-[280px] bg-black">
                {call.remoteStream ? (
                  <video ref={remoteVideoRef} autoPlay playsInline className="h-full w-full object-contain" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-500">
                    <Video className="h-10 w-10" />
                    <p className="text-sm">{call.callState === 'waiting' ? 'Waiting for customer to join…' : 'Connecting video…'}</p>
                  </div>
                )}

                {call.localStream && <video ref={localVideoRef} autoPlay playsInline muted className="absolute right-3 top-3 h-28 w-40 rounded-xl border border-white/20 object-cover shadow-xl sm:h-36 sm:w-52" />}

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/80 to-transparent p-5 pt-14">
                  <button type="button" onClick={call.toggleMute} className="rounded-full bg-white/15 p-3 backdrop-blur hover:bg-white/25">{call.muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}</button>
                  {call.hasVideo && <button type="button" onClick={call.toggleCamera} className="rounded-full bg-white/15 p-3 backdrop-blur hover:bg-white/25">{call.cameraOff ? <CameraOff className="h-5 w-5" /> : <Camera className="h-5 w-5" />}</button>}
                  <button type="button" onClick={() => void call.hangUp()} className="rounded-full bg-red-600 p-3 hover:bg-red-700"><PhoneOff className="h-5 w-5" /></button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center sm:p-12">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10"><Video className="h-7 w-7 text-red-400" /></div>
                <h1 className="mt-4 text-2xl font-bold">Start the virtual estimate call</h1>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">The customer can show the property from their phone camera while you talk live.</p>
                <Button onClick={() => void call.startCall()} className="mt-6 h-12 bg-red-600 px-8 hover:bg-red-700"><Video className="mr-2 h-4 w-4" />Start video call</Button>
              </div>
            )}
          </div>

          {call.error && <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-200">{call.error}</div>}

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4"><p className="text-xs uppercase tracking-wide text-slate-500">Customer</p><p className="mt-1 font-semibold">{session?.customerName || '—'}</p></div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4"><p className="text-xs uppercase tracking-wide text-slate-500">Phone</p><p className="mt-1 font-semibold">{session?.customerPhone || '—'}</p></div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4"><p className="text-xs uppercase tracking-wide text-slate-500">Email</p><p className="mt-1 truncate font-semibold">{session?.customerEmail || '—'}</p></div>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3"><div className="rounded-xl bg-red-500/10 p-2.5"><Sparkles className="h-5 w-5 text-red-400" /></div><div><h2 className="font-bold">AI call notes</h2><p className="text-xs text-slate-400">Customer vs Jayden separated</p></div></div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${ai.enabled ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>{ai.enabled ? 'Allowed' : 'Off'}</span>
            </div>

            {ai.enabled ? (
              <div className="mt-4"><p className="text-sm text-slate-300">Customer consent is active. Your side of the call is tagged Jayden; their side is tagged Customer.</p>{(ai.recording || ai.processing) && <p className="mt-2 text-xs font-semibold text-red-300">{ai.recording ? '● AI listening during call' : 'Processing transcript…'}</p>}</div>
            ) : (
              <p className="mt-4 text-sm text-slate-400">AI notes stay off until the customer enables AI translation from their invite page.</p>
            )}
            {ai.error && <p className="mt-3 text-sm text-amber-200">{ai.error}</p>}

            {services.length > 0 && <div className="mt-5 border-t border-slate-800 pt-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Services detected</p><div className="mt-2 flex flex-wrap gap-2">{services.map((service) => <span key={service} className="rounded-full bg-slate-800 px-2.5 py-1 text-xs">{SERVICE_LABELS[service] || service.replaceAll('_', ' ')}</span>)}</div></div>}

            {pricingEntries.length > 0 && <div className="mt-5 border-t border-slate-800 pt-4"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500"><ClipboardList className="h-3.5 w-3.5" />Pricing inputs captured</div><div className="mt-3 space-y-2">{pricingEntries.map(([key, value]) => <div key={key} className="flex items-start justify-between gap-3 text-sm"><span className="text-slate-400">{labelPricingKey(key)}</span><span className="text-right font-semibold">{String(value)}</span></div>)}</div></div>}

            {(ai.summary.missingQuestions || []).length > 0 && <div className="mt-5 border-t border-slate-800 pt-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Still ask</p><ul className="mt-2 space-y-2 text-sm text-slate-300">{ai.summary.missingQuestions?.map((question) => <li key={question}>• {question}</li>)}</ul></div>}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-2"><Languages className="h-4 w-4 text-red-400" /><h2 className="font-bold">Live transcript</h2></div>
            {recentEvents.length === 0 ? <p className="mt-4 text-sm text-slate-500">Transcript appears here after AI translation is enabled and someone speaks.</p> : (
              <div className="mt-4 max-h-[420px] space-y-3 overflow-y-auto pr-1">
                {recentEvents.map((event) => <div key={`${event.speaker}-${event.sequence_number}`} className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"><div className="mb-1 flex items-center justify-between gap-2"><span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${event.speaker === 'customer' ? 'bg-sky-500/15 text-sky-300' : 'bg-red-500/15 text-red-300'}`}><UserRound className="h-3 w-3" />{event.speaker === 'customer' ? 'Customer' : 'Jayden'}</span>{event.source_language && <span className="text-[10px] text-slate-600">{event.source_language}</span>}</div><p className="text-sm text-slate-200">{event.translated_text || event.original_text}</p></div>)}
              </div>
            )}
          </div>

          <Button onClick={() => void finishEstimate()} className="w-full h-12 bg-emerald-600 hover:bg-emerald-700"><CheckCircle2 className="mr-2 h-4 w-4" />Finish estimate</Button>
        </aside>
      </div>
    </main>
  );
};

export default VirtualEstimateHost;