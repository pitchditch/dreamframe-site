import { useCallback, useEffect, useRef, useState } from 'react';
import { HousePin } from '@/components/house-tracking/types';
import { upsertD2DCloudPin } from '@/utils/d2dCloud';
import { toast } from 'sonner';

interface OfflineAction {
  id: string;
  type: 'create' | 'update';
  pin: HousePin;
  timestamp: number;
}

export interface QuickMarkResult {
  pin: HousePin;
  cloudSaved: boolean;
}

const STORAGE_KEY = 'canvassing_pending_actions';
const LOCAL_PINS_KEY = 'canvassing_pins';

const readPendingActions = (): OfflineAction[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load pending canvassing actions:', error);
    return [];
  }
};

const saveLocalPin = (pin: HousePin) => {
  try {
    const stored = localStorage.getItem(LOCAL_PINS_KEY);
    const pins: HousePin[] = stored ? JSON.parse(stored) : [];
    const existingIndex = pins.findIndex((item) => item.id === pin.id);
    if (existingIndex >= 0) pins[existingIndex] = pin;
    else pins.push(pin);
    localStorage.setItem(LOCAL_PINS_KEY, JSON.stringify(pins));
  } catch (error) {
    console.error('Failed to save canvassing pin locally:', error);
  }
};

export const useOfflineCanvassing = () => {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const [pendingActions, setPendingActions] = useState<OfflineAction[]>(() => readPendingActions());
  const [isSyncing, setIsSyncing] = useState(false);
  const pendingRef = useRef<OfflineAction[]>(pendingActions);
  const syncingRef = useRef(false);

  const persistPendingActions = useCallback((actions: OfflineAction[]) => {
    pendingRef.current = actions;
    setPendingActions(actions);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(actions));
    } catch (error) {
      console.error('Failed to persist pending canvassing actions:', error);
    }
  }, []);

  const queueAction = useCallback((pin: HousePin, type: OfflineAction['type'] = 'create') => {
    const existing = pendingRef.current.filter((action) => action.pin.id !== pin.id);
    const next: OfflineAction[] = [
      ...existing,
      {
        id: `offline_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        type,
        pin,
        timestamp: Date.now(),
      },
    ];
    persistPendingActions(next);
    saveLocalPin(pin);
  }, [persistPendingActions]);

  const syncPendingActions = useCallback(async () => {
    if (!navigator.onLine || syncingRef.current || pendingRef.current.length === 0) return;

    syncingRef.current = true;
    setIsSyncing(true);
    const actions = [...pendingRef.current];
    const failed: OfflineAction[] = [];
    let synced = 0;

    try {
      for (const action of actions) {
        try {
          await upsertD2DCloudPin(action.pin);
          synced += 1;
        } catch (error) {
          console.error('Failed to sync canvassing action:', error);
          failed.push(action);
        }
      }

      persistPendingActions(failed);
      if (synced > 0) toast.success(`Cloud synced ${synced} canvassing action${synced === 1 ? '' : 's'}`);
      if (failed.length > 0) toast.error(`${failed.length} action${failed.length === 1 ? '' : 's'} still waiting to sync`);
    } finally {
      syncingRef.current = false;
      setIsSyncing(false);
    }
  }, [persistPendingActions]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Back online — syncing saved field activity');
      void syncPendingActions();
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.warning('Offline mode — field activity will stay queued');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    if (navigator.onLine && pendingRef.current.length > 0) void syncPendingActions();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [syncPendingActions]);

  const addOfflineAction = useCallback((action: { type: OfflineAction['type']; pin: HousePin }) => {
    queueAction(action.pin, action.type);
  }, [queueAction]);

  const getLocalPins = useCallback((): HousePin[] => {
    try {
      const stored = localStorage.getItem(LOCAL_PINS_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Failed to read local canvassing pins:', error);
      return [];
    }
  }, []);

  const quickMarkProperty = useCallback(async (
    lat: number,
    lng: number,
    address: string,
    status: HousePin['status'],
    notes?: string
  ): Promise<QuickMarkResult> => {
    const pin: HousePin = {
      id: `pin_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      lat,
      lng,
      address,
      status,
      notes: notes || '',
      dateAdded: new Date().toISOString(),
      leadSource: 'door-to-door',
    };

    saveLocalPin(pin);

    if (navigator.onLine) {
      try {
        await upsertD2DCloudPin(pin);
        return { pin, cloudSaved: true };
      } catch (error) {
        console.error('Immediate D2D cloud save failed; queued for retry:', error);
      }
    }

    queueAction(pin, 'create');
    return { pin, cloudSaved: false };
  }, [queueAction]);

  return {
    isOnline,
    pendingActions: pendingActions.length,
    isSyncing,
    quickMarkProperty,
    addOfflineAction,
    getLocalPins,
    syncPendingActions,
  };
};
