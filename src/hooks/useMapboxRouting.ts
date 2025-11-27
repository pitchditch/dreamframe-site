import { useState, useCallback } from 'react';
import { HousePin } from '@/components/house-tracking/types';

interface RouteStep {
  lat: number;
  lng: number;
  address: string;
  distance: number; // distance to next point in meters
  duration: number; // time to next point in seconds
}

interface RouteData {
  steps: RouteStep[];
  totalDistance: number; // in meters
  totalDuration: number; // in seconds
  geometry: any;
}

export const useMapboxRouting = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRoute = useCallback(async (waypoints: HousePin[]): Promise<RouteData | null> => {
    if (waypoints.length < 2) {
      setError('Need at least 2 waypoints');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      // Get Mapbox token from environment or Supabase secrets
      const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
      
      if (!mapboxToken) {
        setError('Mapbox token not configured');
        setLoading(false);
        return null;
      }

      // Build coordinates string for Mapbox API
      const coordinates = waypoints
        .map(p => `${p.lng},${p.lat}`)
        .join(';');

      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${coordinates}?` +
        `geometries=geojson&steps=true&access_token=${mapboxToken}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch route from Mapbox');
      }

      const data = await response.json();

      if (!data.routes || data.routes.length === 0) {
        setError('No route found');
        setLoading(false);
        return null;
      }

      const route = data.routes[0];
      const legs = route.legs;

      // Build route steps with time estimates
      const steps: RouteStep[] = waypoints.map((waypoint, index) => {
        const leg = legs[index];
        return {
          lat: waypoint.lat,
          lng: waypoint.lng,
          address: waypoint.address,
          distance: leg?.distance || 0,
          duration: leg?.duration || 0
        };
      });

      const routeData: RouteData = {
        steps,
        totalDistance: route.distance,
        totalDuration: route.duration,
        geometry: route.geometry
      };

      setLoading(false);
      return routeData;
    } catch (err: any) {
      console.error('Error fetching route:', err);
      setError(err.message);
      setLoading(false);
      return null;
    }
  }, []);

  const formatDuration = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }, []);

  const formatDistance = useCallback((meters: number): string => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${Math.round(meters)} m`;
  }, []);

  return {
    getRoute,
    loading,
    error,
    formatDuration,
    formatDistance
  };
};
