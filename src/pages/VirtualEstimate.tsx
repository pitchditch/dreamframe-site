import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Loader2, LocateFixed, Phone, ShieldCheck, Wifi } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

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
  currentPosition: {
    lat: number;
    lng: number;
    heading: number;
    pitch: number;
    zoom: number;
  } | null;
}

const VirtualEstimate = () => {
  const { sessionId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get('token') || searchParams.get('invite_token') || '';
  const [session, setSession] = useState<VirtualEstimateSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sharingLocation, setSharingLocation] = useState(false);
  const [locationShared, setLocationShared] = useState(false);

  const request = useCallback(async (action: string, extra: Record<string, unknown> = {}) => {
    const { data, error: invokeError } = await supabase.functions.invoke('virtual-estimate-session', {
      body: { action, sessionId, inviteToken, ...extra },
    });

    if (invokeError) throw invokeError;
    if (!data?.session) throw new Error(data?.error || 'This virtual estimate invite is unavailable.');
    return data.session as VirtualEstimateSession;
  }, [inviteToken, sessionId]);

  const loadSession = useCallback(async (showLoader = false) => {
    if (showLoader) setLoading(true);
    try {
      const next = await request('view');
      setSession(next);
      setError('');
    } catch (err) {
      if (!session) {
        const message = err instanceof Error ? err.message : 'This virtual estimate invite is unavailable.';
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

        // Mark the invited customer present without asking them to re-enter details.
        await request('presence').catch(() => undefined);
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : 'This virtual estimate invite is unavailable.';
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
    const timer = window.setInterval(() => void loadSession(false), 2500);
    return () => window.clearInterval(timer);
  }, [error, loadSession, session]);

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

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-red-500" />
          <p className="text-slate-300">Opening your secure virtual estimate…</p>
        </div>
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
          <Button asChild className="w-full bg-red-600 hover:bg-red-700">
            <a href="tel:+17788087620"><Phone className="h-4 w-4 mr-2" />Call (778) 808-7620</a>
          </Button>
          <Link to="/" className="inline-block mt-5 text-sm text-slate-400 hover:text-white">Back to BC Pressure Washing</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-8 sm:py-12">
      <section className="mx-auto max-w-xl">
        <div className="flex items-center justify-center gap-3 mb-8">
          <img src="/logo.png" alt="BC Pressure Washing" className="h-12 w-12 object-contain" />
          <div>
            <p className="font-bold leading-tight">BC Pressure Washing</p>
            <p className="text-xs text-slate-400">Secure Virtual Estimate</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-slate-400 mb-1">Virtual estimate</p>
                <h1 className="text-2xl sm:text-3xl font-bold">{firstName ? `Hi ${firstName}` : 'You’re in'}</h1>
              </div>
              <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${session?.agentJoined ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-200'}`}>
                <span className={`h-2 w-2 rounded-full ${session?.agentJoined ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                {session?.agentJoined ? 'Jayden connected' : 'Waiting for Jayden'}
              </div>
            </div>

            {session?.address && (
              <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4 mb-5">
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Property</p>
                <p className="font-medium">{session.address}</p>
              </div>
            )}

            <div className="space-y-3 mb-6">
              <div className="flex gap-3 rounded-xl border border-slate-800 p-4">
                <Wifi className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Keep this page open</p>
                  <p className="text-sm text-slate-400 mt-1">Your estimate session updates automatically while Jayden works with you.</p>
                </div>
              </div>
              <div className="flex gap-3 rounded-xl border border-slate-800 p-4">
                <ShieldCheck className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">No admin login required</p>
                  <p className="text-sm text-slate-400 mt-1">This secure invite is customer-only. You do not need a Lovable or BC Pressure Washing admin account.</p>
                </div>
              </div>
            </div>

            <Button
              type="button"
              onClick={shareLocation}
              disabled={sharingLocation || locationShared}
              className="w-full h-12 bg-red-600 hover:bg-red-700"
            >
              {sharingLocation ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : locationShared ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <LocateFixed className="h-4 w-4 mr-2" />}
              {locationShared ? 'Location shared' : sharingLocation ? 'Sharing location…' : 'Share my location'}
            </Button>

            {error && <p className="mt-4 text-sm text-amber-200 text-center">{error}</p>}
          </div>

          <div className="border-t border-slate-800 bg-slate-950/60 p-5 text-center">
            <p className="text-sm text-slate-400">Need help?</p>
            <a href="tel:+17788087620" className="inline-flex items-center gap-2 mt-1 font-semibold hover:text-red-400">
              <Phone className="h-4 w-4" /> (778) 808-7620
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VirtualEstimate;
