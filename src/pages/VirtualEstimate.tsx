import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  Camera,
  CameraOff,
  CheckCircle2,
  Languages,
  Loader2,
  LocateFixed,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Video,
  Wifi,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useVirtualEstimateCall } from '@/hooks/useVirtualEstimateCall';
import { useVirtualEstimateAi } from '@/hooks/useVirtualEstimateAi';

interface VirtualEstimateSession {
  sessionId: string;
  status: string;
  agentJoined: boolean;
  directJoinAllowed: boolean;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  hostAvailable: boolean;
  waitingForHost: boolean;
  locationRequested: boolean;
  hostPresent: boolean;
  customerPresent: boolean;
  callState: string;
  customerCallReady: boolean;
  hostCallReady: boolean;
  callStartedAt: string | null;
  callEndedAt: string | null;
  currentPosition: {
    lat: number;
    lng: number;
    heading: number;
    pitch: number;
    zoom: number;
  } | null;
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

const CALL_LABELS: Record<string, string> = {
  idle: 'Ready to join',
  starting: 'Starting camera…',
  waiting: 'Waiting for Jayden',
  connecting: 'Connecting…',
  connected: 'Connected',
  ended: 'Call ended',
  failed: 'Connection issue',
};

const VirtualEstimate = () => {
  const { sessionId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get('token') || searchParams.get('invite_token') || '';
  const [session, setSession] = useState<VirtualEstimateSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sharingLocation, setSharingLocation] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const request = useCallback(async (action: string, extra: Record<string, unknown> = {}) => {
    const { data, error: invokeError } = await supabase.functions.invoke('virtual-estimate-session', {
      body: { action, sessionId, inviteToken, ...extra },
    });
    if (invokeError) throw invokeError;
    if (!data?.session) throw new Error(data?.error || 'This virtual estimate invite is unavailable.');
    return data.session as VirtualEstimateSession;
  }, [inviteToken, sessionId]);

  const call = useVirtualEstimateCall({ sessionId, inviteToken, role: 'customer' });
  const ai = useVirtualEstimateAi({ sessionId, inviteToken, role: 'customer', sourceStream: call.localStream });

  useEffect(() => { if (localVideoRef.current) localVideoRef.current.srcObject = call.localStream; }, [call.localStream]);
  useEffect(() => { if (remoteVideoRef.current) remoteVideoRef.current.srcObject = call.remoteStream; }, [call.remoteStream]);

  const loadSession = useCallback(async (showLoader = false) => {
    if (showLoader) setLoading(true);
    try {
      const next = await request('view');
      setSession(next);
      setError('');
    } catch (loadError) {
      if (!session) {
        const message = loadError instanceof Error ? loadError.message : 'This virtual estimate invite is unavailable.';
        setError(message.includes('FunctionsHttpError') ? 'This virtual estimate invite is invalid or has expired.' : message);
      }
    } finally {
      if (showLoader) setLoading(false);
    }
  }, [request, session]);

  useEffect(() => {
    let cancelled = false;
    const start = async () => {
      setLoading(true);
      try {
        const initial = await request('view');
        if (cancelled) return;
        setSession(initial);
        setError('');
        await request('presence').catch(() => undefined);
      } catch (startError) {
        if (cancelled) return;
        const message = startError instanceof Error ? startError.message : 'This virtual estimate invite is unavailable.';
        setError(message.includes('FunctionsHttpError') ? 'This virtual estimate invite is invalid or has expired.' : message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void start();
    return () => { cancelled = true; };
  }, [request]);

  useEffect(() => {
    if (!session || error) return;
    const timer = window.setInterval(async () => {
      await request('presence').catch(() => undefined);
      await loadSession(false);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [error, loadSession, request, session]);

  const shareLocation = async () => {
    if (!navigator.geolocation) {
      setError('Location sharing is not supported on this device.');
      return;
    }
    setSharingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const next = await request('location', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setSession(next);
          setLocationShared(true);
          setError('');
        } catch {
          setError('We could not share your location. You can continue without it.');
        } finally {
          setSharingLocation(false);
        }
      },
      () => {
        setError('Location permission was not granted. You can continue without it.');
        setSharingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 },
    );
  };

  const firstName = useMemo(() => session?.customerName?.trim().split(/\s+/)[0] || '', [session?.customerName]);
  const latestAiEvent = ai.events[0];
  const detectedServices = ai.summary.services || [];
  const callActive = ['starting', 'waiting', 'connecting', 'connected'].includes(call.callState);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center"><Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-red-500" /><p className="text-slate-300">Opening your secure virtual estimate…</p></div>
      </main>
    );
  }

  if (error && !session) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-7 text-center shadow-xl">
          <img src="/logo.png" alt="BC Pressure Washing" className="h-16 w-16 object-contain mx-auto mb-5" />
          <h1 className="text-2xl font-bold mb-2">Invite unavailable</h1>
          <p className="text-slate-300 mb-6">{error}</p>
          <Button asChild className="w-full bg-red-600 hover:bg-red-700"><a href="tel:+17788087620"><Phone className="h-4 w-4 mr-2" />Call (778) 808-7620</a></Button>
          <Link to="/" className="inline-block mt-5 text-sm text-slate-400 hover:text-white">Back to BC Pressure Washing</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-6 sm:py-10">
      <section className="mx-auto max-w-2xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <img src="/logo.png" alt="BC Pressure Washing" className="h-12 w-12 object-contain" />
          <div><p className="font-bold leading-tight">BC Pressure Washing</p><p className="text-xs text-slate-400">Secure Virtual Estimate</p></div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
          <div className="p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div><p className="text-sm text-slate-400 mb-1">Virtual estimate</p><h1 className="text-2xl sm:text-3xl font-bold">{firstName ? `Hi ${firstName}` : 'You’re in'}</h1></div>
              <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${session?.agentJoined ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-200'}`}>
                <span className={`h-2 w-2 rounded-full ${session?.agentJoined ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                {session?.agentJoined ? 'Jayden online' : 'Waiting for Jayden'}
              </div>
            </div>

            {session?.address && <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4 mb-5"><p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Property</p><p className="font-medium">{session.address}</p></div>}

            <div className="rounded-2xl border border-slate-700 bg-black overflow-hidden mb-5">
              {callActive ? (
                <div className="relative aspect-video bg-black">
                  {call.remoteStream ? <video ref={remoteVideoRef} autoPlay playsInline className="h-full w-full object-cover" /> : call.localStream ? <video ref={localVideoRef} autoPlay playsInline muted className="h-full w-full object-cover" /> : <div className="h-full flex items-center justify-center text-slate-500"><Video className="h-9 w-9" /></div>}
                  {call.remoteStream && call.localStream && <video ref={localVideoRef} autoPlay playsInline muted className="absolute right-3 top-3 h-24 w-32 sm:h-28 sm:w-40 rounded-xl border border-white/20 object-cover shadow-xl" />}
                  <div className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold backdrop-blur">{CALL_LABELS[call.callState] || call.callState}</div>
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10">
                    <button type="button" onClick={call.toggleMute} className="rounded-full bg-white/15 p-3 backdrop-blur hover:bg-white/25" aria-label={call.muted ? 'Unmute' : 'Mute'}>{call.muted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}</button>
                    {call.hasVideo && <button type="button" onClick={call.toggleCamera} className="rounded-full bg-white/15 p-3 backdrop-blur hover:bg-white/25" aria-label={call.cameraOff ? 'Turn camera on' : 'Turn camera off'}>{call.cameraOff ? <CameraOff className="h-5 w-5" /> : <Camera className="h-5 w-5" />}</button>}
                    {call.hasVideo && <button type="button" onClick={() => void call.flipCamera()} className="rounded-full bg-white/15 p-3 backdrop-blur hover:bg-white/25" aria-label="Flip camera"><RefreshCw className="h-5 w-5" /></button>}
                    <button type="button" onClick={() => void call.hangUp()} className="rounded-full bg-red-600 p-3 hover:bg-red-700" aria-label="End call"><PhoneOff className="h-5 w-5" /></button>
                  </div>
                </div>
              ) : (
                <div className="p-5 sm:p-6 bg-slate-950">
                  <div className="flex items-start gap-3"><div className="rounded-xl bg-red-500/10 p-2.5"><Video className="h-5 w-5 text-red-400" /></div><div className="flex-1"><p className="font-semibold text-lg">Live video estimate</p><p className="mt-1 text-sm text-slate-400">Use your phone camera to show Jayden the windows, gutters, roof, driveway, or other areas you want priced.</p></div></div>
                  <Button type="button" onClick={() => void call.startCall()} className="mt-4 w-full h-12 bg-red-600 hover:bg-red-700"><Video className="h-4 w-4 mr-2" />{call.incomingCall ? 'Jayden is ready — Join call' : call.callState === 'ended' ? 'Rejoin video call' : 'Join video estimate'}</Button>
                </div>
              )}
            </div>

            {call.error && <p className="mb-5 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-200">{call.error}</p>}

            <div className="rounded-2xl border border-slate-700 bg-slate-950/65 p-4 sm:p-5 mb-5">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-red-500/10 p-2.5"><Sparkles className="h-5 w-5 text-red-400" /></div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2"><div><p className="font-semibold">AI translation + estimate notes</p><p className="text-xs text-slate-400 mt-0.5">Optional and customer-controlled</p></div>{(ai.recording || ai.processing) && <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${ai.recording ? 'bg-red-500/15 text-red-300' : 'bg-sky-500/15 text-sky-300'}`}>{ai.recording ? 'Listening' : 'Processing'}</span>}</div>
                  <p className="mt-3 text-sm text-slate-300">When enabled, spoken audio in this estimate can be transcribed and translated to help capture service details. Raw audio is not saved. You can turn it off at any time.</p>
                  <Button type="button" onClick={() => ai.recording ? ai.stop(false) : void ai.start()} disabled={ai.starting} className={`mt-4 w-full h-11 ${ai.recording ? 'bg-slate-800 hover:bg-slate-700' : 'bg-red-600 hover:bg-red-700'}`}>
                    {ai.starting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Starting AI translation…</> : ai.recording ? <><MicOff className="h-4 w-4 mr-2" />Stop AI listening</> : <><Mic className="h-4 w-4 mr-2" />{ai.enabled ? 'Resume AI translation' : 'Enable AI translation'}</>}
                  </Button>
                  {ai.enabled && !ai.recording && <button type="button" onClick={() => ai.stop(true)} className="mt-2 w-full text-xs text-slate-500 hover:text-slate-300">Revoke AI transcription consent for this session</button>}
                  {ai.error && <p className="mt-3 text-sm text-amber-200">{ai.error}</p>}
                  {(latestAiEvent || ai.summary.lastTranslatedText) && <div className="mt-4 space-y-3 border-t border-slate-800 pt-4"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500"><Languages className="h-3.5 w-3.5" />{ai.summary.sourceLanguage || latestAiEvent?.source_language || 'Language detected'} → English</div>{latestAiEvent?.original_text && latestAiEvent.original_text !== latestAiEvent.translated_text && <div><p className="text-xs text-slate-500 mb-1">Heard</p><p className="text-sm text-slate-300">{latestAiEvent.original_text}</p></div>}<div><p className="text-xs text-slate-500 mb-1">English</p><p className="text-sm text-white">{latestAiEvent?.translated_text || ai.summary.lastTranslatedText}</p></div></div>}
                  {detectedServices.length > 0 && <div className="mt-4 border-t border-slate-800 pt-4"><p className="text-xs text-slate-500 mb-2">Services captured for the estimate</p><div className="flex flex-wrap gap-2">{detectedServices.map((service) => <span key={service} className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-200">{SERVICE_LABELS[service] || service.replaceAll('_', ' ')}</span>)}</div></div>}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex gap-3 rounded-xl border border-slate-800 p-4"><Wifi className="h-5 w-5 text-red-400 shrink-0 mt-0.5" /><div><p className="font-semibold">Keep this page open</p><p className="text-sm text-slate-400 mt-1">The call and estimate session update automatically while you work with Jayden.</p></div></div>
              <div className="flex gap-3 rounded-xl border border-slate-800 p-4"><ShieldCheck className="h-5 w-5 text-red-400 shrink-0 mt-0.5" /><div><p className="font-semibold">Secure customer link</p><p className="text-sm text-slate-400 mt-1">No admin account is required. Camera and microphone access only start after you choose to join.</p></div></div>
            </div>

            <Button type="button" onClick={shareLocation} disabled={sharingLocation || locationShared} className="w-full h-12 bg-slate-800 hover:bg-slate-700">
              {sharingLocation ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : locationShared ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <LocateFixed className="h-4 w-4 mr-2" />}
              {locationShared ? 'Location shared' : sharingLocation ? 'Sharing location…' : 'Share my location'}
            </Button>
            {error && <p className="mt-4 text-sm text-amber-200 text-center">{error}</p>}
          </div>

          <div className="border-t border-slate-800 bg-slate-950/60 p-5 text-center"><p className="text-sm text-slate-400">Need help?</p><a href="tel:+17788087620" className="inline-flex items-center gap-2 mt-1 font-semibold hover:text-red-400"><Phone className="h-4 w-4" /> (778) 808-7620</a></div>
        </div>
      </section>
    </main>
  );
};

export default VirtualEstimate;