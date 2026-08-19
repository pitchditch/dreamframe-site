import React, { useEffect, useRef, useState } from 'react';
import MapComponentV4 from './MapComponentV4';
import { HousePin } from './types';
import {
  D2DCloudTombstone,
  d2dPinIdentity,
  d2dPinUpdatedAtMs,
  d2dRouteUpdatedAtMs,
  ensureD2DPinUpdatedAt,
  ensureD2DRouteUpdatedAt,
  loadD2DCloudRoutes,
  loadD2DCloudState,
  tombstoneD2DCloudPins,
  upsertD2DCloudPins,
  upsertD2DCloudRoutes,
} from '@/utils/d2dCloud';
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

const MapComponent: React.FC<MapWrapperProps> = (props) => {
  const [, setMapReadyTick] = useState(0);
  const [cloudReady, setCloudReady] = useState(false);
  const [onlineRevision, setOnlineRevision] = useState(0);
  const previousPinsRef = useRef<Map<string, TrackedPin>>(new Map());
  const syncTimerRef = useRef<number | null>(null);
  const hydrationTimerRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

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
    const handleOnline = () => setOnlineRevision((value) => value + 1);
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

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

        previousPinsRef.current = new Map(
          Array.from(localById.values()).map((pin) => [pin.id, trackedPin(pin)]),
        );

        try {
          const cloudRoutes = await loadD2DCloudRoutes();
          if (!cancelled && mountedRef.current && cloudRoutes.length > 0) {
            props.onUpdateRoutes((previous) => {
              const next = [...previous];
              cloudRoutes.forEach((cloudRoute) => {
                const index = next.findIndex((route) => route.id === cloudRoute.id);
                if (index < 0) {
                  next.push(cloudRoute);
                  return;
                }
                if (d2dRouteUpdatedAtMs(cloudRoute) > d2dRouteUpdatedAtMs(next[index])) next[index] = cloudRoute;
              });
              return next;
            });
          }
        } catch (error) {
          console.error('Could not hydrate D2D cloud routes:', error);
        }

        if (navigator.onLine) {
          const queued = readDeletionQueue();
          if (queued.length > 0) {
            try {
              await tombstoneD2DCloudPins(queued);
              saveDeletionQueue([]);
            } catch (error) {
              console.error('Could not flush D2D deletion queue:', error);
            }
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
    // Hydrate cloud state once for this map mount. Later changes use conflict-safe sync below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!cloudReady) return;

    const current = new Map(props.pins.map((pin) => [pin.id, trackedPin(pin)]));
    const currentIdentities = new Set(Array.from(current.values()).map((item) => item.identityKey));
    const removed: D2DCloudTombstone[] = [];

    previousPinsRef.current.forEach((previous, pinId) => {
      if (current.has(pinId) || currentIdentities.has(previous.identityKey)) return;
      removed.push({
        identityKey: previous.identityKey,
        clientPinId: previous.clientPinId,
        updatedAt: new Date().toISOString(),
      });
    });

    if (removed.length > 0) saveDeletionQueue([...readDeletionQueue(), ...removed]);
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
          await upsertD2DCloudPins(props.pins.map(ensureD2DPinUpdatedAt));
          await upsertD2DCloudRoutes(props.routes.map(ensureD2DRouteUpdatedAt));
        } catch (error) {
          console.error('D2D cloud sync failed:', error);
        }
      })();
    }, 350);
  }, [props.pins, props.routes, cloudReady, onlineRevision]);

  const { onDeletePin: _onDeletePin, ...mapProps } = props;
  return React.createElement(MapComponentV4, {
    ...mapProps,
    pins: [...props.pins],
    routes: [...props.routes],
  });
};

export default MapComponent;
