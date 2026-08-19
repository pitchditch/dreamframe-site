import React, { useEffect, useRef, useState } from 'react';
import MapComponentFixed from './MapComponentFixed';
import { HousePin } from './types';
import {
  d2dPinIdentity,
  deleteD2DCloudPinsByIdentity,
  loadD2DCloudPins,
  upsertD2DCloudPins,
} from '@/utils/d2dCloud';
import { toast } from 'sonner';

const DELETED_IDENTITIES_KEY = 'd2d-cloud-deleted-identities-v1';

const readDeletedIdentities = (): string[] => {
  try {
    const parsed = JSON.parse(localStorage.getItem(DELETED_IDENTITIES_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
  } catch {
    return [];
  }
};

const saveDeletedIdentities = (identities: string[]) => {
  localStorage.setItem(DELETED_IDENTITIES_KEY, JSON.stringify(Array.from(new Set(identities))));
};

const MapComponent: React.FC<React.ComponentProps<typeof MapComponentFixed>> = (props) => {
  const [, setMapReadyTick] = useState(0);
  const [cloudReady, setCloudReady] = useState(false);
  const [onlineRevision, setOnlineRevision] = useState(0);
  const previousIdentitiesRef = useRef<Set<string>>(new Set());
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

    void loadD2DCloudPins()
      .then(async (cloudPins) => {
        if (cancelled || !mountedRef.current) return;

        const deleted = new Set(readDeletedIdentities());
        const usableCloudPins = cloudPins.filter((pin) => !deleted.has(d2dPinIdentity(pin)));
        const localIdentities = new Set(props.pins.map(d2dPinIdentity));

        usableCloudPins.forEach((cloudPin) => {
          const identity = d2dPinIdentity(cloudPin);
          if (localIdentities.has(identity)) return;
          const { id: _cloudId, ...pinWithoutId } = cloudPin;
          props.onAddPin(pinWithoutId as Omit<HousePin, 'id'>);
          localIdentities.add(identity);
        });

        previousIdentitiesRef.current = new Set([
          ...props.pins.map(d2dPinIdentity),
          ...usableCloudPins.map(d2dPinIdentity),
        ]);

        if (deleted.size > 0 && navigator.onLine) {
          try {
            await deleteD2DCloudPinsByIdentity(Array.from(deleted));
            saveDeletedIdentities([]);
          } catch (error) {
            console.error('Could not flush D2D deletion queue:', error);
          }
        }

        hydrationTimerRef.current = window.setTimeout(() => {
          if (!cancelled && mountedRef.current) setCloudReady(true);
        }, 250);
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
    // Hydrate cloud pins once for this map mount. Subsequent changes are handled by the sync effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!cloudReady) return;

    const currentIdentities = new Set(props.pins.map(d2dPinIdentity));
    const removed = Array.from(previousIdentitiesRef.current).filter((identity) => !currentIdentities.has(identity));
    if (removed.length > 0) {
      saveDeletedIdentities([...readDeletedIdentities(), ...removed]);
    }
    previousIdentitiesRef.current = currentIdentities;

    if (!navigator.onLine) return;
    if (syncTimerRef.current) window.clearTimeout(syncTimerRef.current);

    syncTimerRef.current = window.setTimeout(() => {
      void (async () => {
        try {
          const deletionQueue = readDeletedIdentities();
          if (deletionQueue.length > 0) {
            await deleteD2DCloudPinsByIdentity(deletionQueue);
            saveDeletedIdentities([]);
          }
          await upsertD2DCloudPins(props.pins);
        } catch (error) {
          console.error('D2D cloud sync failed:', error);
        }
      })();
    }, 350);
  }, [props.pins, cloudReady, onlineRevision]);

  return React.createElement(MapComponentFixed, {
    ...props,
    pins: [...props.pins],
    routes: [...props.routes],
  });
};

export default MapComponent;
