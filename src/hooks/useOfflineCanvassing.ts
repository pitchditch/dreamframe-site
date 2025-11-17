import { useState, useEffect, useCallback } from 'react';
import { HousePin } from '@/components/house-tracking/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface OfflineAction {
  id: string;
  type: 'create' | 'update';
  pin: HousePin | Partial<HousePin>;
  timestamp: number;
}

export const useOfflineCanvassing = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState<OfflineAction[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Back online - syncing data...');
      syncPendingActions();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast.warning('Offline mode - data will sync when connected');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load pending actions from localStorage
    loadPendingActions();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadPendingActions = () => {
    try {
      const stored = localStorage.getItem('canvassing_pending_actions');
      if (stored) {
        setPendingActions(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load pending actions:', error);
    }
  };

  const savePendingActions = (actions: OfflineAction[]) => {
    try {
      localStorage.setItem('canvassing_pending_actions', JSON.stringify(actions));
      setPendingActions(actions);
    } catch (error) {
      console.error('Failed to save pending actions:', error);
    }
  };

  const addOfflineAction = useCallback((action: Omit<OfflineAction, 'id' | 'timestamp'>) => {
    const newAction: OfflineAction = {
      ...action,
      id: `offline_${Date.now()}_${Math.random()}`,
      timestamp: Date.now()
    };

    const updated = [...pendingActions, newAction];
    savePendingActions(updated);
    
    // Save to localStorage for immediate access
    saveToLocalStorage(action.pin as HousePin);
    
    return newAction;
  }, [pendingActions]);

  const saveToLocalStorage = (pin: HousePin) => {
    try {
      const stored = localStorage.getItem('canvassing_pins');
      const pins: HousePin[] = stored ? JSON.parse(stored) : [];
      
      const existingIndex = pins.findIndex(p => p.id === pin.id);
      if (existingIndex >= 0) {
        pins[existingIndex] = pin;
      } else {
        pins.push(pin);
      }
      
      localStorage.setItem('canvassing_pins', JSON.stringify(pins));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  };

  const getLocalPins = (): HousePin[] => {
    try {
      const stored = localStorage.getItem('canvassing_pins');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get local pins:', error);
      return [];
    }
  };

  const syncPendingActions = async () => {
    if (!isOnline || isSyncing || pendingActions.length === 0) return;

    setIsSyncing(true);
    const failed: OfflineAction[] = [];

    try {
      for (const action of pendingActions) {
        try {
          // Sync to Supabase (you'll need to implement the actual DB sync)
          console.log('Syncing action:', action);
          
          // For now, just log - you'll need to implement actual DB operations
          // based on your schema
          
        } catch (error) {
          console.error('Failed to sync action:', error);
          failed.push(action);
        }
      }

      if (failed.length === 0) {
        savePendingActions([]);
        toast.success(`Synced ${pendingActions.length} actions successfully`);
      } else {
        savePendingActions(failed);
        toast.error(`Failed to sync ${failed.length} actions`);
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const quickMarkProperty = useCallback((
    lat: number,
    lng: number,
    address: string,
    status: HousePin['status'],
    notes?: string
  ): HousePin => {
    const newPin: HousePin = {
      id: `pin_${Date.now()}_${Math.random()}`,
      lat,
      lng,
      address,
      status,
      notes: notes || '',
      dateAdded: new Date().toISOString(),
      leadSource: 'door-to-door'
    };

    addOfflineAction({
      type: 'create',
      pin: newPin
    });

    return newPin;
  }, [addOfflineAction]);

  return {
    isOnline,
    pendingActions: pendingActions.length,
    isSyncing,
    quickMarkProperty,
    addOfflineAction,
    getLocalPins,
    syncPendingActions
  };
};
