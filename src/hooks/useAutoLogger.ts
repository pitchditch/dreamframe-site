import { useState, useEffect, useCallback, useRef } from 'react';
import { HousePin } from '@/components/house-tracking/types';
import { toast } from 'sonner';

interface AutoLoggerConfig {
  enabled: boolean;
  radius: number; // in meters
  defaultStatus: HousePin['status'];
  vibrationEnabled: boolean;
}

export const useAutoLogger = (
  pins: HousePin[],
  onAutoLog: (pin: HousePin) => void,
  config: AutoLoggerConfig
) => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [autoLoggedIds, setAutoLoggedIds] = useState<Set<string>>(new Set());
  const lastLocationRef = useRef<{ lat: number; lng: number } | null>(null);

  // Calculate distance between two coordinates in meters
  const calculateDistance = useCallback((lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371000; // Earth's radius in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }, []);

  // Check proximity to pins and auto-log
  useEffect(() => {
    if (!config.enabled || !currentLocation) return;

    pins.forEach(pin => {
      // Skip if already auto-logged or already visited
      if (autoLoggedIds.has(pin.id) || pin.status === 'visited') return;

      const distance = calculateDistance(
        currentLocation.lat,
        currentLocation.lng,
        pin.lat,
        pin.lng
      );

      if (distance <= config.radius) {
        // Auto-log the pin
        const updatedPin: HousePin = {
          ...pin,
          status: config.defaultStatus,
          notes: (pin.notes ? pin.notes + '\n' : '') + `Auto-logged at ${new Date().toLocaleTimeString()}`
        };

        onAutoLog(updatedPin);
        setAutoLoggedIds(prev => new Set(prev).add(pin.id));

        // Haptic feedback
        if (config.vibrationEnabled && 'vibrate' in navigator) {
          navigator.vibrate([100, 50, 100]);
        }

        toast.success(`Auto-logged: ${pin.address}`, {
          description: `Within ${config.radius}m radius`,
          duration: 3000
        });
      }
    });
  }, [currentLocation, pins, config, autoLoggedIds, onAutoLog, calculateDistance]);

  // Track location
  useEffect(() => {
    if (!config.enabled) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        // Only update if location has changed significantly (>5 meters)
        if (lastLocationRef.current) {
          const distance = calculateDistance(
            lastLocationRef.current.lat,
            lastLocationRef.current.lng,
            newLocation.lat,
            newLocation.lng
          );
          
          if (distance < 5) return; // Don't update for small changes
        }

        setCurrentLocation(newLocation);
        lastLocationRef.current = newLocation;
      },
      (error) => {
        console.error('Error watching location:', error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 5000
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [config.enabled, calculateDistance]);

  const resetAutoLogged = useCallback(() => {
    setAutoLoggedIds(new Set());
  }, []);

  return {
    currentLocation,
    autoLoggedCount: autoLoggedIds.size,
    resetAutoLogged
  };
};
