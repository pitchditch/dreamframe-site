import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  Languages,
  Loader2,
  LocateFixed,
  Mic,
  MicOff,
  Phone,
  ShieldCheck,
  Sparkles,
  Wifi,
} from 'lucide-react';
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

type PricingInputValue = string | number | boolean | null;

interface VirtualEstimateAiSummary {
  sourceLanguage?: string;
  services?: string[];
  pricingInputs?: Record<string, PricingInputValue>;
  keywords?: string[];
  missingQuestions?: string[];
  latestSummary?: string;
  lastOriginalText?: string;
  lastTranslatedText?: string;
  transcriptCount?: number;
  confidence?: number;
}

interface VirtualEstimateAiEvent {
  sequence_number: number;
  source_language: string | null;
  original_text: string;
  translated_text: string;
  services: string[];
  pricing_inputs: Record<string, PricingInputValue>;
  keywords: string[];
  missing_questions: string[];
  summary: string | null;
  confidence: number | null;
  created_at: string;
}

interface VirtualEstimateAiResponse {
  enabled?: boolean;
  consentAt?: string | null;
  ignored?: boolean;
  summary?: VirtualEstimateAiSummary;
  event?: VirtualEstimateAiEvent;
  events?: VirtualEstimateAiEvent[];
  error?: string;
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

const blobToBase64 = async (blob: Blob) => {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = '';
  const blockSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += blockSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + blockSize));
  }
  return btoa(binary);
};

const getRecorderMimeType = () => {
  if (typeof MediaRecorder === 'undefined') return '';
  return [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/ogg;codecs=opus',
  ].find((mime) => MediaRecorder.isTypeSupported(mime)) || '';
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

  const [aiEnabled, setAiEnabled] = useState(false);
  const [aiRecording, setAiRecording] = useState(false);
  const [aiStarting, setAiStarting] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiSummary, setAiSummary] = useState<VirtualEstimateAiSummary>({});
  const [aiEvents, setAiEvents] = useState<VirtualEstimateAiEvent[]>([]);

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingActiveRef = useRef(false);
  const chunkTimerRef = useRef<number | null>(null);
  const sequenceRef = useRef(1);
  const queueDepthRef = useRef(0);
  const processingChainRef = useRef<Promise<void>>(Promise.resolve());

  const request = useCallback(async (action: string, extra: Record<string, unknown> = {}) => {
    const { data, error: invokeError } = await supabase.functions.invoke('virtual-estimate-session', {
      body: { action, sessionId, inviteToken, ...extra },
    });

    if (invokeError) throw invokeError;
    if (!data?.session) throw new Error(data?.error || 'This virtual estimate invite is unavailable.');
    return data.session as VirtualEstimateSession;
  }, [inviteToken, sessionId]);

  const aiRequest = useCallback(async (action: string, extra: Record<string, unknown> = {}) => {
    const { data, error: invokeError } = await supabase.functions.invoke('virtual-estimate-ai', {
      body: { action, sessionId, inviteToken, ...extra },
    });

    if (invokeError) throw invokeError;
    const response = (data || {}) as VirtualEstimateAiResponse;
    if (response.error) throw new Error(response.error);
    return response;
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

  useEffect(() => {
    if (!session?.sessionId) return;
    let cancelled = false;

    void aiRequest('state')
      .then((state) => {
        if (cancelled) return;
        setAiEnabled(Boolean(state.enabled));
        setAiSummary(state.summary || {});
        const events = state.events || [];
        setAiEvents(events);
        const highestSequence = events.reduce((highest, event) => Math.max(highest, event.sequence_number || 0), 0);
        sequenceRef.current = Math.max(1, highestSequence + 1, Number(state.summary?.transcriptCount || 0) + 1);
      })
      .catch(() => {
        // The estimate itself must remain usable if the optional AI assistant is unavailable.
      });

    return () => { cancelled = true; };
  }, [aiRequest, session?.sessionId]);

  const processAudioChunk = useCallback(async (blob: Blob) => {
    if (blob.size < 1200) return;
    const sequenceNumber = sequenceRef.current++;
    const audio = await blobToBase64(blob);
    const response = await aiRequest('process_audio', {
      audio,
      mimeType: blob.type || 'audio/webm',
      sequenceNumber,
    });

    if (response.ignored) return;
    if (response.summary) setAiSummary(response.summary);
    if (response.event) {
      setAiEvents((previous) => [response.event!, ...previous.filter((item) => item.sequence_number !== response.event!.sequence_number)].slice(0, 8));
    }
  }, [aiRequest]);

  const enqueueAudioChunk = useCallback((blob: Blob) => {
    queueDepthRef.current += 1;
    setAiProcessing(true);
    processingChainRef.current = processingChainRef.current
      .then(() => processAudioChunk(blob))
      .catch((err) => {
        const message = err instanceof Error ? err.message : 'AI transcription failed.';
        setAiError(message.includes('FunctionsHttpError') ? 'AI transcription is temporarily unavailable.' : message);
      })
      .finally(() => {
        queueDepthRef.current = Math.max(0, queueDepthRef.current - 1);
        if (queueDepthRef.current === 0) setAiProcessing(false);
      });
  }, [processAudioChunk]);

  const recordNextChunk = useCallback(function startChunk(stream: MediaStream) {
    if (!recordingActiveRef.current || stream.getAudioTracks().every((track) => track.readyState !== 'live')) return;

    const mimeType = getRecorderMimeType();
    const chunks: Blob[] = [];
    const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    recorder.onerror = () => {
      setAiError('The microphone recorder stopped unexpectedly.');
      recordingActiveRef.current = false;
      setAiRecording(false);
    };

    recorder.onstop = () => {
      if (chunkTimerRef.current !== null) {
        window.clearTimeout(chunkTimerRef.current);
        chunkTimerRef.current = null;
      }
      const blob = new Blob(chunks, { type: recorder.mimeType || mimeType || 'audio/webm' });
      if (blob.size >= 1200) enqueueAudioChunk(blob);

      if (recordingActiveRef.current) {
        window.setTimeout(() => startChunk(stream), 80);
      }
    };

    recorder.start();
    chunkTimerRef.current = window.setTimeout(() => {
      if (recorder.state === 'recording') recorder.stop();
    }, 7500);
  }, [enqueueAudioChunk]);

  const stopAiRecording = useCallback((revokeConsent = false) => {
    recordingActiveRef.current = false;
    if (chunkTimerRef.current !== null) {
      window.clearTimeout(chunkTimerRef.current);
      chunkTimerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
    mediaRecorderRef.current = null;
    setAiRecording(false);

    if (revokeConsent) {
      setAiEnabled(false);
      void aiRequest('disable').catch(() => undefined);
    }
  }, [aiRequest]);

  const startAiRecording = async () => {
    if (aiRecording || aiStarting) return;
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setAiError('AI transcription is not supported in this browser.');
      return;
    }

    setAiStarting(true);
    setAiError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      try {
        const enabled = await aiRequest('enable');
        setAiEnabled(Boolean(enabled.enabled));
        if (enabled.summary) setAiSummary(enabled.summary);
      } catch (err) {
        stream.getTracks().forEach((track) => track.stop());
        throw err;
      }

      mediaStreamRef.current = stream;
      recordingActiveRef.current = true;
      setAiRecording(true);
      recordNextChunk(stream);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Microphone permission was not granted.';
      setAiError(message.includes('Permission') || message.includes('NotAllowed')
        ? 'Microphone permission was not granted. You can continue without AI translation.'
        : message.includes('FunctionsHttpError')
          ? 'AI translation is temporarily unavailable. You can continue without it.'
          : message);
    } finally {
      setAiStarting(false);
    }
  };

  useEffect(() => () => {
    recordingActiveRef.current = false;
    if (chunkTimerRef.current !== null) window.clearTimeout(chunkTimerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') mediaRecorderRef.current.stop();
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
  }, []);

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
  const latestAiEvent = aiEvents[0];
  const detectedServices = aiSummary.services || [];

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
                  <p className="text-sm text-slate-400 mt-1">This secure invite is customer-only. You do not need a BC Pressure Washing admin account.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-950/65 p-4 sm:p-5 mb-5">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-red-500/10 p-2.5">
                  <Sparkles className="h-5 w-5 text-red-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold">AI estimate assistant</p>
                      <p className="text-xs text-slate-400 mt-0.5">Live translation + estimate notes</p>
                    </div>
                    {(aiRecording || aiProcessing) && (
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${aiRecording ? 'bg-red-500/15 text-red-300' : 'bg-sky-500/15 text-sky-300'}`}>
                        {aiRecording ? 'Listening' : 'Processing'}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-sm text-slate-300">
                    Optional. When enabled, your microphone is transcribed to help translate the conversation and capture service details for your estimate. Raw audio is not saved.
                  </p>

                  <Button
                    type="button"
                    onClick={() => aiRecording ? stopAiRecording(false) : void startAiRecording()}
                    disabled={aiStarting}
                    className={`mt-4 w-full h-11 ${aiRecording ? 'bg-slate-800 hover:bg-slate-700' : 'bg-red-600 hover:bg-red-700'}`}
                  >
                    {aiStarting ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Starting AI translation…</>
                    ) : aiRecording ? (
                      <><MicOff className="h-4 w-4 mr-2" />Stop listening</>
                    ) : (
                      <><Mic className="h-4 w-4 mr-2" />{aiEnabled ? 'Resume AI translation' : 'Enable AI translation'}</>
                    )}
                  </Button>

                  {aiEnabled && !aiRecording && (
                    <button
                      type="button"
                      onClick={() => stopAiRecording(true)}
                      className="mt-2 w-full text-xs text-slate-500 hover:text-slate-300"
                    >
                      Revoke AI transcription consent for this session
                    </button>
                  )}

                  {aiError && <p className="mt-3 text-sm text-amber-200">{aiError}</p>}

                  {(latestAiEvent || aiSummary.lastTranslatedText) && (
                    <div className="mt-4 space-y-3 border-t border-slate-800 pt-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        <Languages className="h-3.5 w-3.5" />
                        {aiSummary.sourceLanguage || latestAiEvent?.source_language || 'Language detected'} → English
                      </div>
                      {latestAiEvent?.original_text && latestAiEvent.original_text !== latestAiEvent.translated_text && (
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Heard</p>
                          <p className="text-sm text-slate-300">{latestAiEvent.original_text}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-slate-500 mb-1">English</p>
                        <p className="text-sm text-white">{latestAiEvent?.translated_text || aiSummary.lastTranslatedText}</p>
                      </div>
                    </div>
                  )}

                  {detectedServices.length > 0 && (
                    <div className="mt-4 border-t border-slate-800 pt-4">
                      <p className="text-xs text-slate-500 mb-2">Services captured for the estimate</p>
                      <div className="flex flex-wrap gap-2">
                        {detectedServices.map((service) => (
                          <span key={service} className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-200">
                            {SERVICE_LABELS[service] || service.replaceAll('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
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
