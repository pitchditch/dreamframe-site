import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Database,
  MapPin,
  RefreshCw,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type CheckState = 'idle' | 'checking' | 'ready' | 'warning' | 'failed';

type ReadinessResult = {
  mapState: CheckState;
  mapMessage: string;
  mapLoadMs: number | null;
  storageState: CheckState;
  storageMessage: string;
  queuedPoints: number;
  appOfflineState: CheckState;
  appOfflineMessage: string;
  checkedAt: string | null;
};

const INITIAL_RESULT: ReadinessResult = {
  mapState: 'idle',
  mapMessage: 'Not checked yet',
  mapLoadMs: null,
  storageState: 'idle',
  storageMessage: 'Not checked yet',
  queuedPoints: 0,
  appOfflineState: 'idle',
  appOfflineMessage: 'Not checked yet',
  checkedAt: null,
};

const stateBadge = (state: CheckState) => {
  if (state === 'ready') return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400';
  if (state === 'warning') return 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400';
  if (state === 'failed') return 'border-destructive/30 bg-destructive/10 text-destructive';
  return '';
};

const stateLabel = (state: CheckState) => {
  if (state === 'checking') return 'Checking';
  if (state === 'ready') return 'Ready';
  if (state === 'warning') return 'Limited';
  if (state === 'failed') return 'Failed';
  return 'Not checked';
};

const ensureGoogleMaps = async () => {
  if ((window as any).google?.maps) return;

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) throw new Error('Google Maps API key is missing');

  await new Promise<void>((resolve, reject) => {
    if ((window as any).google?.maps) {
      resolve();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>('script[src*="maps.googleapis.com/maps/api/js"]');
    const timeout = window.setTimeout(() => reject(new Error('Google Maps timed out')), 12000);

    const finish = () => {
      window.clearTimeout(timeout);
      if ((window as any).google?.maps) resolve();
      else reject(new Error('Google Maps SDK did not initialize'));
    };

    if (existingScript) {
      existingScript.addEventListener('load', finish, { once: true });
      existingScript.addEventListener('error', () => {
        window.clearTimeout(timeout);
        reject(new Error('Google Maps failed to load'));
      }, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', finish, { once: true });
    script.addEventListener('error', () => {
      window.clearTimeout(timeout);
      reject(new Error('Google Maps failed to load'));
    }, { once: true });
    document.head.appendChild(script);
  });
};

const countQueuedLocations = () => {
  try {
    const queue = JSON.parse(localStorage.getItem('locationQueue') || '[]');
    return Array.isArray(queue) ? queue.length : 0;
  } catch {
    return 0;
  }
};

export default function D2DReadinessCheck() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<ReadinessResult>(INITIAL_RESULT);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const runCheck = async () => {
    if (running) return;
    setRunning(true);
    setResult((current) => ({
      ...current,
      mapState: 'checking',
      storageState: 'checking',
      appOfflineState: 'checking',
      checkedAt: null,
    }));

    let storageState: CheckState = 'ready';
    let storageMessage = 'Offline GPS/location queue can save locally';
    let queuedPoints = 0;

    try {
      const probeKey = 'bc-d2d-offline-storage-probe';
      const probeValue = `${Date.now()}`;
      localStorage.setItem(probeKey, probeValue);
      if (localStorage.getItem(probeKey) !== probeValue) throw new Error('Storage read-back failed');
      localStorage.removeItem(probeKey);

      const rawQueue = localStorage.getItem('locationQueue') || '[]';
      const queue = JSON.parse(rawQueue);
      if (!Array.isArray(queue)) throw new Error('Offline queue is invalid');
      queuedPoints = queue.length;
    } catch (error) {
      storageState = 'failed';
      storageMessage = error instanceof Error ? error.message : 'Offline storage check failed';
    }

    let appOfflineState: CheckState = 'warning';
    let appOfflineMessage = 'Offline data queue works, but the app is not cached for a guaranteed offline launch';

    try {
      const registration = 'serviceWorker' in navigator
        ? await navigator.serviceWorker.getRegistration()
        : undefined;
      const cacheKeys = 'caches' in window ? await caches.keys() : [];
      if (registration?.active && cacheKeys.length > 0) {
        appOfflineState = 'ready';
        appOfflineMessage = `App offline cache detected (${cacheKeys.length} cache${cacheKeys.length === 1 ? '' : 's'})`;
      } else if (!('serviceWorker' in navigator)) {
        appOfflineMessage = 'This browser does not support service-worker offline app loading';
      }
    } catch {
      appOfflineMessage = 'Could not verify offline app cache';
    }

    let mapState: CheckState = 'failed';
    let mapMessage = isOnline ? 'Google Maps check failed' : 'Internet is required to load Google Maps';
    let mapLoadMs: number | null = null;

    if (isOnline) {
      const startedAt = performance.now();
      try {
        await ensureGoogleMaps();
        mapLoadMs = Math.round(performance.now() - startedAt);
        mapState = 'ready';
        mapMessage = 'Google Maps SDK loaded successfully';
      } catch (error) {
        mapMessage = error instanceof Error ? error.message : 'Google Maps check failed';
      }
    }

    setResult({
      mapState,
      mapMessage,
      mapLoadMs,
      storageState,
      storageMessage,
      queuedPoints,
      appOfflineState,
      appOfflineMessage,
      checkedAt: new Date().toISOString(),
    });
    setRunning(false);
  };

  const queuedNow = result.checkedAt ? result.queuedPoints : countQueuedLocations();

  return (
    <Card>
      <CardHeader className="gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" /> D2D Field Readiness
          </CardTitle>
          <CardDescription className="mt-1">
            Confirm the map, offline data queue, and offline app loading before canvassing.
          </CardDescription>
        </div>
        <Button onClick={runCheck} disabled={running} className="shrink-0">
          <RefreshCw className={`mr-2 h-4 w-4 ${running ? 'animate-spin' : ''}`} />
          {running ? 'Checking…' : 'Run D2D check'}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border bg-background p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-medium">
                {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
                Connection
              </div>
              <Badge variant="outline" className={isOnline ? stateBadge('ready') : stateBadge('warning')}>
                {isOnline ? 'Online' : 'Offline'}
              </Badge>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {isOnline ? 'Live sync and Google Maps are available.' : 'New GPS points should queue locally until connection returns.'}
            </p>
          </div>

          <div className="rounded-xl border bg-background p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-medium"><MapPin className="h-4 w-4" />Map</div>
              <Badge variant="outline" className={stateBadge(result.mapState)}>{stateLabel(result.mapState)}</Badge>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{result.mapMessage}</p>
            {result.mapLoadMs !== null && <p className="mt-1 text-xs font-medium">SDK load: {result.mapLoadMs} ms</p>}
          </div>

          <div className="rounded-xl border bg-background p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-medium"><Database className="h-4 w-4" />Offline queue</div>
              <Badge variant="outline" className={stateBadge(result.storageState)}>{stateLabel(result.storageState)}</Badge>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{result.storageMessage}</p>
            <p className="mt-1 text-xs font-medium">Queued GPS points: {queuedNow}</p>
          </div>

          <div className="rounded-xl border bg-background p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-medium">
                {result.appOfflineState === 'ready' ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                Offline launch
              </div>
              <Badge variant="outline" className={stateBadge(result.appOfflineState)}>{stateLabel(result.appOfflineState)}</Badge>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{result.appOfflineMessage}</p>
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-3 text-xs text-muted-foreground">
          <strong className="text-foreground">Map offline note:</strong> the D2D location queue can keep saving data without internet, but Google Maps tiles and address lookups still require a connection. The check keeps these two statuses separate so “offline ready” is never misleading.
        </div>

        {result.checkedAt && (
          <p className="text-right text-[11px] text-muted-foreground">Last checked {new Date(result.checkedAt).toLocaleString()}</p>
        )}
      </CardContent>
    </Card>
  );
}
