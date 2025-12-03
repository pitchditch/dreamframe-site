/// <reference types="google.maps" />
import { useState, useCallback } from 'react';
import { HousePin } from '@/components/house-tracking/types';

interface RouteStep {
  lat: number;
  lng: number;
  address: string;
  distance: number;
  duration: number;
}

interface RouteData {
  steps: RouteStep[];
  totalDistance: number;
  totalDuration: number;
  geometry: Array<{ lat: number; lng: number }>;
  hasUphill: boolean;
  hasDownhill: boolean;
}

export const useGoogleMapsRouting = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRoute = useCallback(async (waypoints: HousePin[]): Promise<RouteData | null> => {
    if (waypoints.length < 2) {
      setError('Need at least 2 waypoints');
      return null;
    }

    // Wait for Google Maps to be loaded
    if (!(window as any).google?.maps) {
      setError('Google Maps not loaded');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const directionsService = new google.maps.DirectionsService();
      
      const origin = { lat: waypoints[0].lat, lng: waypoints[0].lng };
      const destination = { lat: waypoints[waypoints.length - 1].lat, lng: waypoints[waypoints.length - 1].lng };
      
      // Build waypoints for intermediate stops (max 25 waypoints for free tier)
      const intermediateWaypoints = waypoints.slice(1, -1).map(p => ({
        location: { lat: p.lat, lng: p.lng },
        stopover: true
      }));

      const request: google.maps.DirectionsRequest = {
        origin,
        destination,
        waypoints: intermediateWaypoints.slice(0, 23), // Google limits to 25 total waypoints
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.WALKING,
      };

      const result = await new Promise<google.maps.DirectionsResult>((resolve, reject) => {
        directionsService.route(request, (response, status) => {
          if (status === google.maps.DirectionsStatus.OK && response) {
            resolve(response);
          } else {
            reject(new Error(`Directions request failed: ${status}`));
          }
        });
      });

      const route = result.routes[0];
      const legs = route.legs;

      // Extract geometry from the route
      const geometry: Array<{ lat: number; lng: number }> = [];
      route.overview_path.forEach(point => {
        geometry.push({ lat: point.lat(), lng: point.lng() });
      });

      // Calculate totals and build steps
      let totalDistance = 0;
      let totalDuration = 0;
      const steps: RouteStep[] = [];

      legs.forEach((leg, index) => {
        const distance = leg.distance?.value || 0;
        const duration = leg.duration?.value || 0;
        totalDistance += distance;
        totalDuration += duration;

        steps.push({
          lat: leg.start_location.lat(),
          lng: leg.start_location.lng(),
          address: leg.start_address || waypoints[index]?.address || 'Unknown',
          distance,
          duration
        });
      });

      // Add final destination
      const lastLeg = legs[legs.length - 1];
      if (lastLeg) {
        steps.push({
          lat: lastLeg.end_location.lat(),
          lng: lastLeg.end_location.lng(),
          address: lastLeg.end_address || waypoints[waypoints.length - 1]?.address || 'Unknown',
          distance: 0,
          duration: 0
        });
      }

      // Check for elevation changes (simplified - using lat changes as proxy)
      let hasUphill = false;
      let hasDownhill = false;
      
      // Use elevation service if available
      if (google.maps.ElevationService && geometry.length > 1) {
        try {
          const elevationService = new google.maps.ElevationService();
          const samplePoints = geometry.filter((_, i) => i % Math.max(1, Math.floor(geometry.length / 20)) === 0);
          
          const elevationResult = await new Promise<google.maps.ElevationResult[]>((resolve, reject) => {
            elevationService.getElevationForLocations(
              { locations: samplePoints.map(p => ({ lat: p.lat, lng: p.lng })) },
              (results, status) => {
                if (status === google.maps.ElevationStatus.OK && results) {
                  resolve(results);
                } else {
                  reject(new Error(`Elevation request failed: ${status}`));
                }
              }
            );
          });

          for (let i = 1; i < elevationResult.length; i++) {
            const diff = elevationResult[i].elevation - elevationResult[i - 1].elevation;
            if (diff > 5) hasUphill = true;
            if (diff < -5) hasDownhill = true;
          }
        } catch (elevError) {
          console.log('Elevation data not available:', elevError);
        }
      }

      const routeData: RouteData = {
        steps,
        totalDistance,
        totalDuration,
        geometry,
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
