import React, { useEffect, useRef, useState } from 'react';
import { HousePin, RouteSession } from './types';
import { useOfflineCanvassing } from '@/hooks/useOfflineCanvassing';
import { upsertD2DCloudRoutes } from '@/utils/d2dCloud';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Check,
  FileText,
  Wifi,
  WifiOff,
  QrCode,
  Navigation,
  Play,
  Square,
  DollarSign,
  X,
  MapPin,
} from 'lucide-react';
import { toast } from 'sonner';
import PropertyQRCode from './PropertyQRCode';

interface CanvassingModeProps {
  onQuickMark: (pin: HousePin) => void;
  onUpdatePin?: (pinId: string, updates: Partial<HousePin>) => void;
  onSessionSaved?: (route: RouteSession) => void;
  currentLocation: { lat: number; lng: number } | null;
  activePin: HousePin | null;
  mode?: 'residential' | 'storefront';
}

type PathPoint = { lat: number; lng: number; timestamp: string };

const distanceMeters = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const toRad = (degrees: number) => degrees * Math.PI / 180;
  const radius = 6371000;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const x = Math.sin(dLat / 2) ** 2
    + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return radius * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
};

const reverseGeocode = async (lat: number, lng: number) => {
  const googleMaps = (window as any).google;
  if (!googleMaps?.maps?.Geocoder) return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

  try {
    const geocoder = new googleMaps.maps.Geocoder();
    const result = await geocoder.geocode({ location: { lat, lng } });
    return result.results?.[0]?.formatted_address || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  } catch (error) {
    console.error('Canvassing reverse geocode failed:', error);
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }
};

const saveRouteLocally = (route: RouteSession) => {
  try {
    const stored = JSON.parse(localStorage.getItem('routes') || '[]');
    const existing: RouteSession[] = Array.isArray(stored) ? stored : [];
    const next = [route, ...existing.filter((item) => item.id !== route.id)].slice(0, 100);
    localStorage.setItem('routes', JSON.stringify(next));
  } catch (error) {
    console.error('Could not persist canvassing route locally:', error);
  }
};

const CanvassingMode: React.FC<CanvassingModeProps> = ({
  onQuickMark,
  onUpdatePin,
  onSessionSaved,
  currentLocation,
  activePin,
  mode = 'residential',
}) => {
  const {
    isOnline,
    pendingActions,
    isSyncing,
    quickMarkProperty,
    syncPendingActions,
  } = useOfflineCanvassing();

  const [isActive, setIsActive] = useState(false);
  const [sessionStart, setSessionStart] = useState<Date | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [visitCount, setVisitCount] = useState(0);
  const [qrPin, setQrPin] = useState<HousePin | null>(null);
  const [pathCount, setPathCount] = useState(0);
  const pathRef = useRef<PathPoint[]>([]);

  useEffect(() => {
    if (!isActive || !sessionStart) return;
    const tick = () => setElapsedSeconds(Math.max(0, Math.floor((Date.now() - sessionStart.getTime()) / 1000)));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [isActive, sessionStart]);

  useEffect(() => {
    if (!isActive || !currentLocation) return;

    const now = new Date().toISOString();
    const previous = pathRef.current[pathRef.current.length - 1];
    if (previous) {
      const moved = distanceMeters(previous, currentLocation);
      const ageMs = Date.now() - new Date(previous.timestamp).getTime();
      if (moved < 3 && ageMs < 5000) return;
    }

    pathRef.current = [...pathRef.current, { ...currentLocation, timestamp: now }].slice(-2500);
    setPathCount(pathRef.current.length);
  }, [isActive, currentLocation]);

  const selectedTarget = activePin && currentLocation
    ? distanceMeters(activePin, currentLocation) <= 90 ? activePin : null
    : activePin;

  const handleQuickAction = async (status: HousePin['status'], notes?: string) => {
    if (mode === 'storefront') {
      toast.info('Use the storefront crawler marker so the business identity stays attached.');
      return;
    }

    if (selectedTarget && onUpdatePin) {
      onUpdatePin(selectedTarget.id, {
        status,
        notes: notes
          ? [selectedTarget.notes, notes].filter(Boolean).join(' · ')
          : selectedTarget.notes,
        updatedAt: new Date().toISOString(),
      });
      setVisitCount((previous) => previous + 1);
      toast.success(`${selectedTarget.address}: ${status.replace('-', ' ')}`);
      if ('vibrate' in navigator) navigator.vibrate(50);
      return;
    }

    if (!currentLocation) {
      toast.error('Location not available');
      return;
    }

    const address = await reverseGeocode(currentLocation.lat, currentLocation.lng);
    const { pin, cloudSaved } = await quickMarkProperty(
      currentLocation.lat,
      currentLocation.lng,
      address,
      status,
      notes,
    );

    onQuickMark(pin);
    setVisitCount((previous) => previous + 1);

    toast.success(`Marked ${address} as ${status.replace('-', ' ')}`, {
      description: cloudSaved ? 'Saved to Supabase' : 'Saved locally · cloud retry queued',
    });

    if ('vibrate' in navigator) navigator.vibrate(50);
  };

  const endAndSaveSession = async () => {
    const endedAt = new Date();
    const startedAt = sessionStart || endedAt;
    const path = pathRef.current.length > 0
      ? pathRef.current
      : currentLocation
        ? [{ ...currentLocation, timestamp: endedAt.toISOString() }]
        : [];

    const route: RouteSession = {
      id: `field-${mode}-${startedAt.getTime()}`,
      name: `${mode === 'storefront' ? 'Storefront' : 'Residential'} field session · ${startedAt.toLocaleDateString()}`,
      startTime: startedAt.toISOString(),
      endTime: endedAt.toISOString(),
      duration: Math.max(0, Math.round((endedAt.getTime() - startedAt.getTime()) / 1000)),
      path,
      homesVisited: visitCount,
      color: mode === 'storefront' ? '#f97316' : '#2563eb',
      isActive: false,
      updatedAt: endedAt.toISOString(),
    };

    saveRouteLocally(route);
    onSessionSaved?.(route);
    window.dispatchEvent(new CustomEvent('d2d-route-saved', { detail: route }));

    if (isOnline) {
      try {
        await upsertD2DCloudRoutes([route]);
      } catch (error) {
        console.error('Could not save canvassing route to cloud:', error);
        toast.warning('Session saved locally; cloud route sync will retry from the map.');
      }
    }

    setIsActive(false);
    setSessionStart(null);
    setElapsedSeconds(0);
    pathRef.current = [];
    setPathCount(0);
    toast.success(`Session saved · ${visitCount} properties · ${route.duration ? Math.round(route.duration / 60) : 0} min`);
  };

  const toggleSession = () => {
    if (isActive) {
      void endAndSaveSession();
      return;
    }

    const started = new Date();
    setIsActive(true);
    setSessionStart(started);
    setElapsedSeconds(0);
    setVisitCount(0);
    pathRef.current = currentLocation ? [{ ...currentLocation, timestamp: started.toISOString() }] : [];
    setPathCount(pathRef.current.length);
    toast.success('Canvassing session started');
  };

  const getSessionDuration = () => {
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-lg sm:inset-x-auto sm:left-1/2 sm:w-[calc(100%-2rem)] sm:-translate-x-1/2">
      <Card className="border-2 bg-background/95 shadow-xl backdrop-blur">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Navigation className="h-5 w-5" />
              {mode === 'storefront' ? 'Storefront' : 'Residential'} Canvassing
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={isOnline ? 'default' : 'secondary'} className="gap-1">
                {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                {isOnline ? 'Online' : 'Offline'}
              </Badge>
              {pendingActions > 0 && <Badge variant="outline">{pendingActions} pending</Badge>}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted p-2 text-sm">
            <div>
              <div className="text-xs text-muted-foreground">Session</div>
              <div className="font-semibold">{isActive ? getSessionDuration() : 'Stopped'}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Doors</div>
              <div className="font-semibold">{visitCount}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">GPS points</div>
              <div className="font-semibold">{pathCount}</div>
            </div>
          </div>

          {selectedTarget && mode === 'residential' && (
            <div className="flex items-start gap-2 rounded-lg border bg-primary/5 p-2 text-xs">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0">
                <div className="font-semibold">Selected property</div>
                <div className="truncate text-muted-foreground">{selectedTarget.address}</div>
              </div>
            </div>
          )}

          {isActive && mode === 'residential' && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Button size="lg" className="h-16 flex-col gap-1" onClick={() => void handleQuickAction('visited', 'Door hit / flyer dropped')}>
                <Check className="h-5 w-5" />
                <span className="text-xs">Hit</span>
              </Button>
              <Button size="lg" variant="outline" className="h-16 flex-col gap-1 border-green-500 text-green-700" onClick={() => void handleQuickAction('interested', 'Interested at door')}>
                <FileText className="h-5 w-5" />
                <span className="text-xs">Interested</span>
              </Button>
              <Button size="lg" variant="outline" className="h-16 flex-col gap-1 border-orange-500 text-orange-700" onClick={() => void handleQuickAction('needs-quote', 'Quote requested')}>
                <DollarSign className="h-5 w-5" />
                <span className="text-xs">Quote</span>
              </Button>
              <Button size="lg" variant="outline" className="h-16 flex-col gap-1 border-red-500 text-red-700" onClick={() => void handleQuickAction('not-interested')}>
                <X className="h-5 w-5" />
                <span className="text-xs">Skip</span>
              </Button>
            </div>
          )}

          {isActive && mode === 'storefront' && (
            <div className="rounded-md border bg-muted/40 p-3 text-xs text-muted-foreground">
              Use the storefront crawler markers on the map for Hit, Interested, Skip or Quote. That keeps the OSM/business identity attached and prevents duplicate storefront records.
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Button variant={isActive ? 'destructive' : 'default'} onClick={toggleSession} className="gap-2">
              {isActive ? <><Square className="h-4 w-4" />End & Save</> : <><Play className="h-4 w-4" />Start Session</>}
            </Button>
            <Button variant="outline" onClick={() => activePin && setQrPin(activePin)} disabled={!activePin} className="gap-2">
              <QrCode className="h-4 w-4" />QR Code
            </Button>
          </div>

          {pendingActions > 0 && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => void syncPendingActions()}
              disabled={isSyncing || !isOnline}
            >
              {isSyncing
                ? 'Syncing to Supabase…'
                : isOnline
                  ? `Sync ${pendingActions} queued action${pendingActions === 1 ? '' : 's'}`
                  : `${pendingActions} action${pendingActions === 1 ? '' : 's'} waiting for internet`}
            </Button>
          )}
        </CardContent>
      </Card>

      {qrPin && <PropertyQRCode pin={qrPin} isOpen={true} onClose={() => setQrPin(null)} />}
    </div>
  );
};

export default CanvassingMode;
