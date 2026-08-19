import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type PricingInputValue = string | number | boolean | null;
export type VirtualEstimateAiRole = 'customer' | 'agent';

export interface VirtualEstimateAiSummary {
  sourceLanguage?: string;
  services?: string[];
  pricingInputs?: Record<string, PricingInputValue>;
  keywords?: string[];
  missingQuestions?: string[];
  latestSummary?: string;
  lastOriginalText?: string;
  lastTranslatedText?: string;
  lastSpeaker?: VirtualEstimateAiRole;
  transcriptCount?: number;
  confidence?: number;
}

export interface VirtualEstimateAiEvent {
  sequence_number: number;
  speaker: VirtualEstimateAiRole;
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

interface AiResponse {
  enabled?: boolean;
  consentAt?: string | null;
  ignored?: boolean;
  summary?: VirtualEstimateAiSummary;
  event?: VirtualEstimateAiEvent;
  events?: VirtualEstimateAiEvent[];
  error?: string;
}

interface UseVirtualEstimateAiOptions {
  sessionId: string;
  inviteToken?: string;
  role: VirtualEstimateAiRole;
  sourceStream?: MediaStream | null;
}

const blobToBase64 = async (blob: Blob) => {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = '';
  const blockSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += blockSize) binary += String.fromCharCode(...bytes.subarray(offset, offset + blockSize));
  return btoa(binary);
};

const getRecorderMimeType = () => {
  if (typeof MediaRecorder === 'undefined') return '';
  return ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus']
    .find((mime) => MediaRecorder.isTypeSupported(mime)) || '';
};

export const useVirtualEstimateAi = ({ sessionId, inviteToken = '', role, sourceStream }: UseVirtualEstimateAiOptions) => {
  const [enabled, setEnabled] = useState(false);
  const [recording, setRecording] = useState(false);
  const [starting, setStarting] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState<VirtualEstimateAiSummary>({});
  const [events, setEvents] = useState<VirtualEstimateAiEvent[]>([]);

  const recorderStreamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const activeRef = useRef(false);
  const chunkTimerRef = useRef<number | null>(null);
  const sequenceRef = useRef(1);
  const queueDepthRef = useRef(0);
  const processingChainRef = useRef<Promise<void>>(Promise.resolve());

  const request = useCallback(async (action: string, extra: Record<string, unknown> = {}) => {
    const { data, error: invokeError } = await supabase.functions.invoke('transcribe-voice-note', {
      body: { action, sessionId, ...(inviteToken ? { inviteToken } : {}), ...extra },
    });
    if (invokeError) throw invokeError;
    const response = (data || {}) as AiResponse;
    if (response.error) throw new Error(response.error);
    return response;
  }, [inviteToken, sessionId]);

  const refresh = useCallback(async () => {
    if (!sessionId) return;
    try {
      const state = await request(role === 'agent' ? 'state_admin' : 'state');
      setEnabled(Boolean(state.enabled));
      setSummary(state.summary || {});
      const nextEvents = state.events || [];
      setEvents(nextEvents);
      const highestForSpeaker = nextEvents.filter((event) => event.speaker === role)
        .reduce((highest, event) => Math.max(highest, event.sequence_number || 0), 0);
      sequenceRef.current = Math.max(sequenceRef.current, highestForSpeaker + 1);
      setError('');
    } catch (refreshError) {
      if (role === 'agent') {
        const message = refreshError instanceof Error ? refreshError.message : '';
        if (!message.includes('FunctionsHttpError')) setError(message);
      }
    }
  }, [request, role, sessionId]);

  useEffect(() => { void refresh(); }, [refresh]);

  useEffect(() => {
    if (role !== 'agent') return;
    const timer = window.setInterval(() => void refresh(), 4000);
    return () => window.clearInterval(timer);
  }, [refresh, role]);

  const processChunk = useCallback(async (blob: Blob) => {
    if (blob.size < 1200) return;
    const sequenceNumber = sequenceRef.current++;
    const audio = await blobToBase64(blob);
    const response = await request(role === 'agent' ? 'process_agent_audio' : 'process_audio', {
      audio,
      mimeType: blob.type || 'audio/webm',
      sequenceNumber,
    });
    if (response.ignored) return;
    if (response.summary) setSummary(response.summary);
    if (response.event) {
      setEvents((previous) => [
        response.event!,
        ...previous.filter((item) => !(item.speaker === response.event!.speaker && item.sequence_number === response.event!.sequence_number)),
      ].slice(0, 16));
    }
  }, [request, role]);

  const enqueueChunk = useCallback((blob: Blob) => {
    queueDepthRef.current += 1;
    setProcessing(true);
    processingChainRef.current = processingChainRef.current
      .then(() => processChunk(blob))
      .catch((chunkError) => {
        const message = chunkError instanceof Error ? chunkError.message : 'AI transcription failed.';
        setError(message.includes('FunctionsHttpError') ? 'AI transcription is temporarily unavailable.' : message);
      })
      .finally(() => {
        queueDepthRef.current = Math.max(0, queueDepthRef.current - 1);
        if (queueDepthRef.current === 0) setProcessing(false);
      });
  }, [processChunk]);

  const recordNextChunk = useCallback(function startChunk(stream: MediaStream) {
    if (!activeRef.current || stream.getAudioTracks().every((track) => track.readyState !== 'live')) return;
    const mimeType = getRecorderMimeType();
    const chunks: Blob[] = [];
    const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    recorderRef.current = recorder;
    recorder.ondataavailable = (event) => { if (event.data.size > 0) chunks.push(event.data); };
    recorder.onerror = () => {
      setError('The microphone recorder stopped unexpectedly.');
      activeRef.current = false;
      setRecording(false);
    };
    recorder.onstop = () => {
      if (chunkTimerRef.current !== null) {
        window.clearTimeout(chunkTimerRef.current);
        chunkTimerRef.current = null;
      }
      const blob = new Blob(chunks, { type: recorder.mimeType || mimeType || 'audio/webm' });
      if (blob.size >= 1200) enqueueChunk(blob);
      if (activeRef.current) window.setTimeout(() => startChunk(stream), 80);
    };
    recorder.start();
    chunkTimerRef.current = window.setTimeout(() => { if (recorder.state === 'recording') recorder.stop(); }, 7500);
  }, [enqueueChunk]);

  const stop = useCallback((revokeConsent = false) => {
    activeRef.current = false;
    if (chunkTimerRef.current !== null) {
      window.clearTimeout(chunkTimerRef.current);
      chunkTimerRef.current = null;
    }
    if (recorderRef.current && recorderRef.current.state !== 'inactive') recorderRef.current.stop();
    recorderStreamRef.current?.getTracks().forEach((track) => track.stop());
    recorderStreamRef.current = null;
    recorderRef.current = null;
    setRecording(false);
    if (revokeConsent && role === 'customer') {
      setEnabled(false);
      void request('disable').catch(() => undefined);
    }
  }, [request, role]);

  const start = useCallback(async () => {
    if (recording || starting) return;
    if (typeof MediaRecorder === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setError('AI transcription is not supported in this browser.');
      return;
    }
    setStarting(true);
    setError('');
    try {
      if (role === 'customer' && !enabled) {
        const response = await request('enable');
        setEnabled(Boolean(response.enabled));
        if (response.summary) setSummary(response.summary);
      } else if (role === 'agent') {
        const state = await request('state_admin');
        if (!state.enabled) throw new Error('The customer has not enabled AI translation for this session.');
        setEnabled(true);
        if (state.summary) setSummary(state.summary);
      }
      let stream: MediaStream;
      const liveSourceTracks = sourceStream?.getAudioTracks().filter((track) => track.readyState === 'live') || [];
      if (liveSourceTracks.length > 0) stream = new MediaStream(liveSourceTracks.map((track) => track.clone()));
      else stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        video: false,
      });
      recorderStreamRef.current = stream;
      activeRef.current = true;
      setRecording(true);
      recordNextChunk(stream);
    } catch (startError) {
      const message = startError instanceof Error ? startError.message : 'Microphone permission was not granted.';
      setError(message.includes('NotAllowed') || message.includes('Permission')
        ? 'Microphone permission was not granted. You can continue without AI translation.'
        : message.includes('FunctionsHttpError') ? 'AI translation is temporarily unavailable.' : message);
    } finally {
      setStarting(false);
    }
  }, [enabled, recordNextChunk, recording, request, role, sourceStream, starting]);

  useEffect(() => () => {
    activeRef.current = false;
    if (chunkTimerRef.current !== null) window.clearTimeout(chunkTimerRef.current);
    if (recorderRef.current && recorderRef.current.state !== 'inactive') recorderRef.current.stop();
    recorderStreamRef.current?.getTracks().forEach((track) => track.stop());
  }, []);

  return { enabled, recording, starting, processing, error, summary, events, start, stop, refresh };
};