import { useState, useCallback } from 'react';
import { HousePin } from '@/components/house-tracking/types';

interface RouteStep {
  lat: number;
  lng: number;
  address: string;
  distance: number;
  duration: number;
  elevation?: number;
  elevationGain?: number;
}

interface RouteData {
  steps: RouteStep[];
  totalDistance: number;
  totalDuration: number;
  geometry: Array<{ lat: number; lng: number }>;
  elevationProfile?: Array<{ distance: number; elevation: number }>;
  hasUphill: boolean;
  hasDownhill: boolean;
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Decode Google's encoded polyline
const decodePolyline = (encoded: string): Array<{ lat: number; lng: number }> => {
  const points: Array<{ lat: number; lng: number }> = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte: number;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }

  return points;
};

export const useGoogleMapsRouting = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRoute = useCallback(async (waypoints: HousePin[]): Promise<RouteData | null> => {
    if (waypoints.length < 2) {
      setError('Need at least 2 waypoints');
      return null;
    }

    if (!GOOGLE_MAPS_API_KEY) {
      setError('Google Maps API key not configured');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const origin = `${waypoints[0].lat},${waypoints[0].lng}`;
      const destination = `${waypoints[waypoints.length - 1].lat},${waypoints[waypoints.length - 1].lng}`;
      
      // Build waypoints string for intermediate stops
      let waypointsParam = '';
      if (waypoints.length > 2) {
        const intermediateWaypoints = waypoints.slice(1, -1)
          .map(p => `${p.lat},${p.lng}`)
          .join('|');
        waypointsParam = `&waypoints=optimize:true|${intermediateWaypoints}`;
      }

      const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}${waypointsParam}&mode=walking&key=${GOOGLE_MAPS_API_KEY}`;

      // Use a CORS proxy or call through edge function for production
      // For now, we'll use a simple fetch that works in development
      const response = await fetch(
        `https://corsproxy.io/?${encodeURIComponent(directionsUrl)}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch route from Google Maps');
      }

      const data = await response.json();

      if (data.status !== 'OK' || !data.routes || data.routes.length === 0) {
        setError(data.error_message || 'No route found');
        setLoading(false);
        return null;
      }

      const route = data.routes[0];
      const legs = route.legs;

      // Decode polyline for map display
      const geometry = decodePolyline(route.overview_polyline.points);

      // Calculate total distance and duration
      let totalDistance = 0;
      let totalDuration = 0;

      // Build route steps with time estimates
      const steps: RouteStep[] = waypoints.map((waypoint, index) => {
        const leg = legs[index];
        const distance = leg?.distance?.value || 0;
        const duration = leg?.duration?.value || 0;
        totalDistance += distance;
        totalDuration += duration;

        return {
          lat: waypoint.lat,
          lng: waypoint.lng,
          address: waypoint.address,
          distance,
          duration
        };
      });

      // Fetch elevation data for the route
      const elevationData = await getElevation(geometry.filter((_, i) => i % 10 === 0)); // Sample every 10th point
      
      let hasUphill = false;
      let hasDownhill = false;
      
      if (elevationData && elevationData.length > 1) {
        for (let i = 1; i < elevationData.length; i++) {
          const diff = elevationData[i].elevation - elevationData[i - 1].elevation;
          if (diff > 5) hasUphill = true;
          if (diff < -5) hasDownhill = true;
        }
      }

      const routeData: RouteData = {
        steps,
        totalDistance,
        totalDuration,
        geometry,
        elevationProfile: elevationData,
        hasUphill,
        hasDownhill
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

  const getElevation = async (points: Array<{ lat: number; lng: number }>): Promise<Array<{ distance: number; elevation: number }> | null> => {
    if (!GOOGLE_MAPS_API_KEY || points.length === 0) return null;

    try {
      const locations = points.map(p => `${p.lat},${p.lng}`).join('|');
      const elevationUrl = `https://maps.googleapis.com/maps/api/elevation/json?locations=${locations}&key=${GOOGLE_MAPS_API_KEY}`;

      const response = await fetch(
        `https://corsproxy.io/?${encodeURIComponent(elevationUrl)}`
      );

      if (!response.ok) return null;

      const data = await response.json();

      if (data.status !== 'OK' || !data.results) return null;

      let cumulativeDistance = 0;
      return data.results.map((result: any, index: number) => {
        if (index > 0) {
          const prevPoint = points[index - 1];
          const currPoint = points[index];
          cumulativeDistance += calculateHaversineDistance(
            prevPoint.lat, prevPoint.lng,
            currPoint.lat, currPoint.lng
          );
        }
        return {
          distance: cumulativeDistance,
          elevation: result.elevation
        };
      });
    } catch (err) {
      console.error('Error fetching elevation:', err);
      return null;
    }
  };

  const calculateHaversineDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

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
    getElevation,
    loading,
    error,
    formatDuration,
    formatDistance,
    decodePolyline
  };
};
