import React, { useCallback, useEffect, useRef, useState } from 'react';
import MapComponentV4 from './MapComponentV4';
import { HousePin, RouteSession } from './types';
import {
  D2DCloudRouteTombstone,
  D2DCloudTombstone,
  d2dPinIdentity,
  d2dPinUpdatedAtMs,
  d2dRouteUpdatedAtMs,
  ensureD2DPinUpdatedAt,
  ensureD2DRouteUpdatedAt,
  flushQueuedD2DAutoStopMutations,
  loadD2DCloudRouteState,
  loadD2DCloudState,
  subscribeD2DCloudRouteChanges,
  tombstoneD2DCloudPins,
  upsertD2DCloudPins,
  upsertD2DCloudRoutes,
} from '@/utils/d2dCloud';
import { subscribeD2DRoutes } from '@/utils/d2dRouteBus';
import { clearD2DPending, markD2DPending, setD2DSyncError, setD2DSyncOnline } from '@/utils/d2dSyncStatus';
import { toast } from 'sonner';

const DELETION_QUEUE_KEY = 'd2d-cloud-deletion-queue-v2';
const LEGACY_DELETED_IDENTITIES_KEY = 'd2d-cloud-deleted-identities-v1';

type MapWrapperProps = React.ComponentProps<typeof MapComponentV4> & {
  onDeletePin?: (pinId: string) => void;
};

interface TrackedPin {
  clientPinId: string;
  identityKey: string;
  updatedAt: string;
}

const toTimestamp = (value: string) => {
  const parsed = new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : 0;
};

const trackedPin = (pin: HousePin): TrackedPin => {
  const normalized = ensureD2DPinUpdatedAt(pin);
  return {
    clientPinId: normalized.id,
    identityKey: d2dPinIdentity(normalized),
    updatedAt: normalized.updatedAt || normalized.dateAdded,
  };
};

const readDeletionQueue = (): D2DCloudTombstone[] => {
  const queue: D2DCloudTombstone[] = [];
  try {
    const parsed = JSON.parse(localStorage.getItem(DELETION_QUEUE_KEY) || '[]');
    if (Array.isArray(parsed)) {
      parsed.forEach((item) => {
        if (!item || typeof item !== 'object') return;
        if (typeof item.identityKey !== 'string' || typeof item.updatedAt !== 'string') return;
        queue.push({
          identityKey: item.identityKey,
          clientPinId: typeof item.clientPinId === 'string' ? item.clientPinId : '',
          updatedAt: item.updatedAt,
        });
      });
    }
  } catch {
    // Keep working with any legacy queue below.
  }

  try {
    const legacy = JSON.parse(localStorage.getItem(LEGACY_DELETED_IDENTITIES_KEY) || '[]');
    if (Array.isArray(legacy)) {
      const updatedAt = new Date().toISOString();
      legacy.filter((item) => typeof item === 'string').forEach((identityKey) => {
        queue.push({ identityKey, clientPinId: '', updatedAt });
      });
    }
  } catch {
    // Legacy data is optional.
  }

  return queue;
};

const saveDeletionQueue = (items: D2DCloudTombstone[]) => {
  const newest = new Map<string, D2DCloudTombstone>();
  items.forEach((item) => {
    const key = item.clientPinId || item.identityKey;
    if (!key) return;
    const previous = newest.get(key);
    if (!previous || toTimestamp(item.updatedAt) >= toTimestamp(previous.updatedAt)) newest.set(key, item);
  });
  localStorage.setItem(DELETION_QUEUE_KEY, JSON.stringify(Array.from(newest.values())));
  localStorage.removeItem(LEGACY_DELETED_IDENTITIES_KEY);
};

const pinVersionMap = (pins: HousePin[]) => new Map(pins.map((pin) => [pin.id, d2dPinUpdatedAtMs(pin)]));
const routeVersionMap = (routes: RouteSession[]) => new Map(routes.map((route) => [route.id, d2dRouteUpdatedAtMs(route)]));

const changedEntityKeys = (
  previousPins: Map<string, number>,
  currentPins: Map<string, number>,
  previousRoutes: Map<string, number>,
  currentRoutes: Map<string, number>,
) => {
  const keys: string[] = [];
  currentPins.forEach((version, id) => {
    if (previousPins.get(id) !== version) keys.push(`pin:${id}`);
  });
  previousPins.forEach((_version, id) => {
    if (!currentPins.has(id)) keys.push(`pin-delete:${id}`);
  });
  currentRoutes.forEach((version, id) => {
    if (previousRoutes.get(id) !== version) keys.push(`route:${id}`);
  });
  previousRoutes.forEach((_version, id) => {
    if (!currentRoutes.has(id)) keys.push(`route-delete:${id}`);
  });
  return keys;
};

const MapComponent: React.FC<MapWrapperProps> = (props) => {
  const [, setMapReadyTick] = useState(0);
  const [cloudReady, setCloudReady] = useState(false);
  const [onlineRevision, setOnlineRevision] = useState(0);
  const previousPinsRef = useRef<Map<string, TrackedPin>>(new Map());
  const renderedPinVersionsRef = useRef<Map<string, number>>(pinVersionMap(props.pins));
  const renderedRouteVersionsRef = useRef<Map<string, number>>(routeVersionMap(props.routes));
  const syncTimerRef = useRef<number | null>(null);
  const hydrationTimerRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  const mergeCloudRoutes = useCallback((
    cloudRoutes: RouteSession[],
    routeTombstones: D2DCloudRouteTombstone[],
  ) => {
    props.onUpdateRoutes((previous) => {
      const tombstoneById = new Map(
        routeTombstones.map((tombstone) => [tombstone.clientRouteId, toTimestamp(tombstone.updatedAt)]),
      );
      let next = previous.filter((route) => {
        const deletedAt = tombstoneById.get(route.id);
        return deletedAt === undefined || d2dRouteUpdatedAtMs(route) > deletedAt;
      });
      let changed = next.length !== previous.length;

      cloudRoutes.forEach((cloudRoute) => {
        const index = next.findIndex((route) => route.id === cloudRoute.id);
        if (index < 0) {
          if (!changed) next = [...next];
          next.push(cloudRoute);
          changed = true;
          return;
        }
        if (d2dRouteUpdatedAtMs(cloudRoute) > d2dRouteUpdatedAtMs(next[index])) {
          if (!changed) next = [...next];
          next[index] = cloudRoute;
          changed = true;
        }
      });

      return changed ? next : previous;
    });
  }, [props.onUpdateRoutes]);

  const refreshRoutes = useCallback(async () => {
    if (!navigator.onLine) return;
    const routeState = await loadD2DCloudRouteState();
    if (mountedRef.current) mergeCloudRoutes(routeState.routes, routeState.tombstones);
  }, [mergeCloudRoutes]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (syncTimerRef.current) window.clearTimeout(syncTimerRef.current);
      if (hydrationTimerRef.current) window.clearTimeout(hydrationTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if ((window as any).google?.maps) {
      setMapReadyTick((value) => value + 1);
      return;
    }
    const interval = window.setInterval(() => {
      if ((window as any).google?.maps) {
        window.clearInterval(interval);
        setMapReadyTick((value) => value + 1);
      }
    }, 100);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    setD2DSyncOnline(navigator.onLine);
    const handleOnline = () => {
      setD2DSyncOnline(true);
      setOnlineRevision((value) => value + 1);
    };
    const handleOffline = () => setD2DSyncOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => subscribeD2DRoutes(
    (incomingRoute) => {
      props.onUpdateRoutes((previous) => {
        const index = previous.findIndex((route) => route.id === incomingRoute.id);
        if (index < 0) return [...previous, incomingRoute];
        if (d2dRouteUpdatedAtMs(previous[index]) >= d2dRouteUpdatedAtMs(incomingRoute)) return previous;
        const next = [...previous];
        next[index] = incomingRoute;
        return next;
      });
    },
    (routeId) => props.onUpdateRoutes((previous) => previous.filter((route) => route.id !== routeId)),
  ), [props.onUpdateRoutes]);

  useEffect(() => {
    let cancelled = false;

    void loadD2DCloudState()
      .then(async ({ pins: cloudPins, tombstones }) => {
        if (cancelled || !mountedRef.current) return;
        const localById = new Map(props.pins.map((pin) => [pin.id, pin]));
        const localByIdentity = new Map(props.pins.map((pin) => [d2dPinIdentity(pin), pin]));

        for (const tombstone of tombstones) {
          const local = localById.get(tombstone.clientPinId) || localByIdentity.get(tombstone.identityKey);
          if (!local) continue;
          if (d2dPinUpdatedAtMs(local) <= toTimestamp(tombstone.updatedAt)) {
            props.onDeletePin?.(local.id);
            localById.delete(local.id);
            localByIdentity.delete(d2dPinIdentity(local));
          }
        }

        for (const cloudPin of cloudPins) {
          const identity = d2dPinIdentity(cloudPin);
          const local = localById.get(cloudPin.id) || localByIdentity.get(identity);
          if (!local) {
            props.onAddPin(cloudPin as any);
            localById.set(cloudPin.id, cloudPin);
            localByIdentity.set(identity, cloudPin);
            continue;
          }
          if (d2dPinUpdatedAtMs(cloudPin) > d2dPinUpdatedAtMs(local)) {
            props.onUpdatePin(local.id, cloudPin);
            localById.delete(local.id);
            localById.set(cloudPin.id, cloudPin);
            localByIdentity.set(identity, cloudPin);
          }
        }

        previousPinsRef.current = new Map(Array.from(localById.values()).map((pin) => [pin.id, trackedPin(pin)]));

        try {
          await refreshRoutes();
        } catch (error) {
          console.error('Could not hydrate D2D cloud routes:', error);
        }

        if (navigator.onLine) {
          try {
            const queued = readDeletionQueue();
            if (queued.length > 0) {
              await tombstoneD2DCloudPins(queued);
              saveDeletionQueue([]);
            }
            await flushQueuedD2DAutoStopMutations();
          } catch (error) {
            console.error('Could not flush D2D offline queues:', error);
            setD2DSyncError(error);
          }
        }

        hydrationTimerRef.current = window.setTimeout(() => {
          if (!cancelled && mountedRef.current) setCloudReady(true);
        }, 350);
      })
      .catch((error) => {
        console.error('D2D cloud hydration failed:', error);
        if (!cancelled && mountedRef.current) {
          setCloudReady(true);
          toast.error('D2D cloud sync unavailable — local pins are still safe');
        }
      });

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!cloudReady) return;
    const currentPinVersions = pinVersionMap(props.pins);
    const currentRouteVersions = routeVersionMap(props.routes);
    const changedKeys = changedEntityKeys(
      renderedPinVersionsRef.current,
      currentPinVersions,
      renderedRouteVersionsRef.current,
      currentRouteVersions,
    );
    renderedPinVersionsRef.current = currentPinVersions;
    renderedRouteVersionsRef.current = currentRouteVersions;
    if (!navigator.onLine && changedKeys.length > 0) markD2DPending(changedKeys);
  }, [props.pins, props.routes, cloudReady]);

  useEffect(() => {
    if (!cloudReady) return;

    const current = new Map(props.pins.map((pin) => [pin.id, trackedPin(pin)]));
    const currentIdentities = new Set(Array.from(current.values()).map((item) => item.identityKey));
    const removed: D2DCloudTombstone[] = [];

    previousPinsRef.current.forEach((previous, pinId) => {
      if (current.has(pinId) || currentIdentities.has(previous.identityKey)) return;
      removed.push({ identityKey: previous.identityKey, clientPinId: previous.clientPinId, updatedAt: new Date().toISOString() });
    });

    if (removed.length > 0) {
      saveDeletionQueue([...readDeletionQueue(), ...removed]);
      if (!navigator.onLine) markD2DPending(removed.map((item) => `pin-delete:${item.clientPinId || item.identityKey}`));
    }
    previousPinsRef.current = current;

    if (!navigator.onLine) return;
    if (syncTimerRef.current) window.clearTimeout(syncTimerRef.current);

    syncTimerRef.current = window.setTimeout(() => {
      void (async () => {
        try {
          const deletionQueue = readDeletionQueue();
          if (deletionQueue.length > 0) {
            await tombstoneD2DCloudPins(deletionQueue);
            saveDeletionQueue([]);
          }
          await flushQueuedD2DAutoStopMutations();
          await upsertD2DCloudPins(props.pins.map(ensureD2DPinUpdatedAt));
          await upsertD2DCloudRoutes(props.routes.map(ensureD2DRouteUpdatedAt));
          await refreshRoutes();
          clearD2DPending();
        } catch (error) {
          console.error('D2D cloud sync failed:', error);
          setD2DSyncError(error);
          const keys = [
            ...props.pins.map((pin) => `pin:${pin.id}`),
            ...props.routes.filter((route) => route.source !== 'auto-street' && !route.autoGenerated).map((route) => `route:${route.id}`),
          ];
          if (keys.length > 0) markD2DPending(keys);
        }
      })();
    }, 350);
  }, [props.pins, props.routes, cloudReady, onlineRevision, refreshRoutes]);

  useEffect(() => {
    if (!cloudReady) return;
    let cancelled = false;
    let unsubscribe = () => undefined;

    void subscribeD2DCloudRouteChanges(() => {
      if (!cancelled) void refreshRoutes().catch((error) => console.error('Could not refresh realtime D2D routes:', error));
    })
      .then((cleanup) => {
        if (cancelled) cleanup();
        else unsubscribe = cleanup;
      })
      .catch((error) => console.error('Could not subscribe to D2D realtime routes:', error));

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [cloudReady, refreshRoutes]);

  const { onDeletePin: _onDeletePin, ...mapProps } = props;
  return React.createElement(MapComponentV4, {
    ...mapProps,
    pins: [...props.pins],
    routes: [...props.routes],
  });
};

export default MapComponent;
