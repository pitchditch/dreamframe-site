import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type VirtualEstimateCallRole = 'customer' | 'host';
export type VirtualEstimateCallState = 'idle' | 'starting' | 'waiting' | 'connecting' | 'connected' | 'ended' | 'failed';

type SignalKind = 'offer' | 'answer' | 'ice' | 'hangup';
interface CallSignal {
  id: number;
  sender: VirtualEstimateCallRole;
  kind: SignalKind;
  payload: Record<string, unknown>;
  created_at: string;
}

interface UseVirtualEstimateCallOptions {
  sessionId: string;
  inviteToken?: string;
  role: VirtualEstimateCallRole;
}

const buildIceServers = (): RTCIceServer[] => {
  const servers: RTCIceServer[] = [
    { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] },
  ];
  const turnUrl = String(import.meta.env.VITE_WEBRTC_TURN_URL || '').trim();
  const turnUsername = String(import.meta.env.VITE_WEBRTC_TURN_USERNAME || '').trim();
  const turnCredential = String(import.meta.env.VITE_WEBRTC_TURN_CREDENTIAL || '').trim();
  if (turnUrl) {
    servers.push({
      urls: turnUrl.split(',').map((value) => value.trim()).filter(Boolean),
      username: turnUsername || undefined,
      credential: turnCredential || undefined,
    });
  }
  return servers;
};

const mediaConstraints = (role: VirtualEstimateCallRole, facing: 'user' | 'environment'): MediaStreamConstraints => ({
  audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
  video: {
    facingMode: { ideal: role === 'customer' ? facing : 'user' },
    width: { ideal: 1280 },
    height: { ideal: 720 },
  },
});

export const useVirtualEstimateCall = ({ sessionId, inviteToken = '', role }: UseVirtualEstimateCallOptions) => {
  const [callState, setCallState] = useState<VirtualEstimateCallState>('idle');
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState('');
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>(role === 'customer' ? 'environment' : 'user');
  const [incomingCall, setIncomingCall] = useState(false);

  const peerRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const lastSignalIdRef = useRef(0);
  const pendingOfferRef = useRef<RTCSessionDescriptionInit | null>(null);
  const pendingIceRef = useRef<RTCIceCandidateInit[]>([]);
  const disposedRef = useRef(false);
  const processingSignalRef = useRef(false);

  const request = useCallback(async (action: string, extra: Record<string, unknown> = {}) => {
    const { data, error: invokeError } = await supabase.functions.invoke('virtual-estimate-session', {
      body: { action, sessionId, ...(inviteToken ? { inviteToken } : {}), ...extra },
    });
    if (invokeError) throw invokeError;
    if (data?.error) throw new Error(data.error);
    return data || {};
  }, [inviteToken, sessionId]);

  const signal = useCallback(async (kind: SignalKind, payload: Record<string, unknown> = {}) => {
    await request('signal', { kind, payload });
  }, [request]);

  const stopLocalMedia = useCallback(() => {
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;
    setLocalStream(null);
    setMuted(false);
    setCameraOff(false);
  }, []);

  const stopRemoteMedia = useCallback(() => {
    remoteStreamRef.current?.getTracks().forEach((track) => track.stop());
    remoteStreamRef.current = null;
    setRemoteStream(null);
  }, []);

  const updateRemoteStream = useCallback((track: MediaStreamTrack) => {
    if (!remoteStreamRef.current) remoteStreamRef.current = new MediaStream();
    if (!remoteStreamRef.current.getTracks().some((existing) => existing.id === track.id)) remoteStreamRef.current.addTrack(track);
    setRemoteStream(new MediaStream(remoteStreamRef.current.getTracks()));
  }, []);

  const flushPendingIce = useCallback(async (peer: RTCPeerConnection) => {
    if (!peer.remoteDescription) return;
    const pending = pendingIceRef.current.splice(0);
    for (const candidate of pending) {
      try { await peer.addIceCandidate(candidate); }
      catch (candidateError) { console.warn('[virtual-estimate-call] ICE candidate failed', candidateError); }
    }
  }, []);

  const ensurePeer = useCallback(() => {
    if (peerRef.current && peerRef.current.signalingState !== 'closed') return peerRef.current;
    const peer = new RTCPeerConnection({ iceServers: buildIceServers() });
    peerRef.current = peer;
    const stream = localStreamRef.current;
    stream?.getTracks().forEach((track) => peer.addTrack(track, stream));

    peer.onicecandidate = (event) => {
      if (!event.candidate) return;
      void signal('ice', event.candidate.toJSON() as unknown as Record<string, unknown>).catch(() => undefined);
    };
    peer.ontrack = (event) => {
      if (event.streams[0]) event.streams[0].getTracks().forEach(updateRemoteStream);
      else updateRemoteStream(event.track);
    };
    peer.onconnectionstatechange = () => {
      if (disposedRef.current) return;
      if (peer.connectionState === 'connected') {
        setCallState('connected');
        setError('');
        void request('call_state', { state: 'connected' }).catch(() => undefined);
      } else if (peer.connectionState === 'connecting') {
        setCallState('connecting');
      } else if (peer.connectionState === 'failed') {
        setCallState('failed');
        setError('The video connection failed. Try ending the call and starting again.');
        void request('call_state', { state: 'failed' }).catch(() => undefined);
      } else if (peer.connectionState === 'disconnected') {
        setCallState((current) => current === 'connected' ? 'connecting' : current);
      }
    };
    return peer;
  }, [request, signal, updateRemoteStream]);

  const answerOffer = useCallback(async (offer: RTCSessionDescriptionInit) => {
    const peer = ensurePeer();
    await peer.setRemoteDescription(offer);
    await flushPendingIce(peer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    await signal('answer', { type: answer.type, sdp: answer.sdp || '' });
    setIncomingCall(false);
    setCallState('connecting');
    await request('call_state', { state: 'connecting' }).catch(() => undefined);
  }, [ensurePeer, flushPendingIce, request, signal]);

  const handleSignal = useCallback(async (incoming: CallSignal) => {
    if (incoming.kind === 'hangup') {
      peerRef.current?.close();
      peerRef.current = null;
      pendingOfferRef.current = null;
      pendingIceRef.current = [];
      stopLocalMedia();
      stopRemoteMedia();
      setIncomingCall(false);
      setCallState('ended');
      return;
    }
    if (incoming.kind === 'ice') {
      const candidate = incoming.payload as RTCIceCandidateInit;
      const peer = peerRef.current;
      if (peer?.remoteDescription) {
        try { await peer.addIceCandidate(candidate); }
        catch (candidateError) { console.warn('[virtual-estimate-call] remote ICE failed', candidateError); }
      } else pendingIceRef.current.push(candidate);
      return;
    }
    if (incoming.kind === 'offer' && role === 'customer') {
      const offer = incoming.payload as RTCSessionDescriptionInit;
      pendingOfferRef.current = offer;
      setIncomingCall(true);
      if (localStreamRef.current) {
        await answerOffer(offer);
        pendingOfferRef.current = null;
      }
      return;
    }
    if (incoming.kind === 'answer' && role === 'host') {
      const peer = peerRef.current;
      if (!peer || peer.signalingState === 'closed') return;
      await peer.setRemoteDescription(incoming.payload as RTCSessionDescriptionInit);
      await flushPendingIce(peer);
      setCallState('connecting');
    }
  }, [answerOffer, flushPendingIce, role, stopLocalMedia, stopRemoteMedia]);

  const pollSignals = useCallback(async () => {
    if (!sessionId || processingSignalRef.current) return;
    processingSignalRef.current = true;
    try {
      const data = await request('signals', { afterId: lastSignalIdRef.current });
      const signals = Array.isArray(data?.signals) ? data.signals as CallSignal[] : [];
      for (const incoming of signals) {
        lastSignalIdRef.current = Math.max(lastSignalIdRef.current, Number(incoming.id) || 0);
        await handleSignal(incoming);
      }
    } catch (pollError) {
      if (!disposedRef.current && callState !== 'idle') console.warn('[virtual-estimate-call] signaling poll failed', pollError);
    } finally {
      processingSignalRef.current = false;
    }
  }, [callState, handleSignal, request, sessionId]);

  useEffect(() => {
    disposedRef.current = false;
    void pollSignals();
    const timer = window.setInterval(() => void pollSignals(), 650);
    return () => {
      disposedRef.current = true;
      window.clearInterval(timer);
    };
  }, [pollSignals]);

  const acquireLocalMedia = useCallback(async () => {
    if (localStreamRef.current?.getAudioTracks().some((track) => track.readyState === 'live')) return localStreamRef.current;
    if (!navigator.mediaDevices?.getUserMedia || typeof RTCPeerConnection === 'undefined') throw new Error('Video calls are not supported in this browser.');
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia(mediaConstraints(role, facingMode));
    } catch (videoError) {
      console.warn('[virtual-estimate-call] video unavailable; falling back to audio', videoError);
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        video: false,
      });
    }
    localStreamRef.current = stream;
    setLocalStream(stream);
    setMuted(false);
    setCameraOff(stream.getVideoTracks().length === 0);
    return stream;
  }, [facingMode, role]);

  const startCall = useCallback(async () => {
    if (['starting', 'connecting', 'connected'].includes(callState)) return;
    setCallState('starting');
    setError('');
    try {
      const stream = await acquireLocalMedia();
      if (role === 'host') {
        await request('call_reset');
        lastSignalIdRef.current = 0;
        const peer = ensurePeer();
        if (peer.getSenders().length === 0) stream.getTracks().forEach((track) => peer.addTrack(track, stream));
        const offer = await peer.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
        await peer.setLocalDescription(offer);
        await signal('offer', { type: offer.type, sdp: offer.sdp || '' });
        await request('call_state', { state: 'connecting' }).catch(() => undefined);
        setCallState('waiting');
      } else {
        await request('call_state', { state: 'ready' });
        const pendingOffer = pendingOfferRef.current;
        if (pendingOffer) {
          await answerOffer(pendingOffer);
          pendingOfferRef.current = null;
        } else setCallState('waiting');
      }
    } catch (startError) {
      const message = startError instanceof Error ? startError.message : 'Could not start the video call.';
      setError(message.includes('NotAllowed') || message.includes('Permission')
        ? 'Camera or microphone permission was not granted.'
        : message.includes('FunctionsHttpError') ? 'The call service is temporarily unavailable.' : message);
      setCallState('failed');
    }
  }, [acquireLocalMedia, answerOffer, callState, ensurePeer, request, role, signal]);

  const hangUp = useCallback(async () => {
    try { await signal('hangup', {}); } catch { /* best effort */ }
    try { await request('call_state', { state: 'ended' }); } catch { /* best effort */ }
    peerRef.current?.close();
    peerRef.current = null;
    pendingOfferRef.current = null;
    pendingIceRef.current = [];
    stopLocalMedia();
    stopRemoteMedia();
    setIncomingCall(false);
    setCallState('ended');
  }, [request, signal, stopLocalMedia, stopRemoteMedia]);

  const toggleMute = useCallback(() => {
    const audioTracks = localStreamRef.current?.getAudioTracks() || [];
    const nextMuted = !muted;
    audioTracks.forEach((track) => { track.enabled = !nextMuted; });
    setMuted(nextMuted);
  }, [muted]);

  const toggleCamera = useCallback(() => {
    const videoTracks = localStreamRef.current?.getVideoTracks() || [];
    if (videoTracks.length === 0) return;
    const nextOff = !cameraOff;
    videoTracks.forEach((track) => { track.enabled = !nextOff; });
    setCameraOff(nextOff);
  }, [cameraOff]);

  const flipCamera = useCallback(async () => {
    if (role !== 'customer' || !navigator.mediaDevices?.getUserMedia) return;
    const current = localStreamRef.current;
    if (!current) return;
    const nextFacing = facingMode === 'environment' ? 'user' : 'environment';
    try {
      const replacement = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: nextFacing }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      const newTrack = replacement.getVideoTracks()[0];
      if (!newTrack) return;
      const oldTrack = current.getVideoTracks()[0];
      const sender = peerRef.current?.getSenders().find((item) => item.track?.kind === 'video');
      if (sender) await sender.replaceTrack(newTrack);
      if (oldTrack) {
        current.removeTrack(oldTrack);
        oldTrack.stop();
      }
      current.addTrack(newTrack);
      localStreamRef.current = current;
      setLocalStream(new MediaStream(current.getTracks()));
      setFacingMode(nextFacing);
      setCameraOff(false);
    } catch (flipError) {
      console.warn('[virtual-estimate-call] could not flip camera', flipError);
    }
  }, [facingMode, role]);

  useEffect(() => () => {
    peerRef.current?.close();
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    remoteStreamRef.current?.getTracks().forEach((track) => track.stop());
  }, []);

  return {
    callState,
    localStream,
    remoteStream,
    error,
    muted,
    cameraOff,
    incomingCall,
    hasVideo: Boolean(localStream?.getVideoTracks().length),
    startCall,
    hangUp,
    toggleMute,
    toggleCamera,
    flipCamera,
  };
};