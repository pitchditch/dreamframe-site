/// <reference types="google.maps" />
import { useState, useCallback } from 'react';
import { HousePin } from '@/components/house-tracking/types';
import { optimizeRouteOrder } from '@/utils/routeOptimizer';

export interface RouteStep {
  lat: number;
  lng: number;
  address: string;
  distance: number;
  duration: number;
}

export interface RouteData {
  steps: RouteStep[];
  totalDistance: number;
  totalDuration: number;
  geometry: Array<{ lat: number; lng: number }>;
  orderedWaypoints: HousePin[];
  hasUphill: boolean;
  hasDownhill: boolean;
}

interface SegmentData {
  steps: RouteStep[];
  totalDistance: number;
  totalDuration: number;
  geometry: Array<{ lat: number; lng: number }>;
  orderedWaypoints: HousePin[];
}

const MAX_DIRECTIONS_STOPS = 25;

export const useGoogleMapsRouting = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRoute = useCallback(async (waypoints: HousePin[]): Promise<RouteData | null> => {
    if (waypoints.length < 2) {
      setError('Need at least 2 waypoints');
      return null;
    }

    if (!(window as any).google?.maps) {
      setError('Google Maps not loaded');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const directionsService = new google.maps.DirectionsService();

      const requestSegment = async (points: HousePin[], optimizeWaypoints: boolean): Promise<SegmentData> => {
        const intermediatePins = points.slice(1, -1);
        const request: google.maps.DirectionsRequest = {
          origin: { lat: points[0].lat, lng: points[0].lng },
          destination: { lat: points[points.length - 1].lat, lng: points[points.length - 1].lng },
          waypoints: intermediatePins.map((pin) => ({
            location: { lat: pin.lat, lng: pin.lng },
            stopover: true,
          })),
          optimizeWaypoints,
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
        const waypointOrder = route.waypoint_order || [];
        const orderedIntermediatePins = optimizeWaypoints && waypointOrder.length > 0
          ? waypointOrder.map((index) => intermediatePins[index]).filter(Boolean)
          : intermediatePins;
        const orderedWaypoints = [points[0], ...orderedIntermediatePins, points[points.length - 1]];
        const geometry = route.overview_path.map((point) => ({ lat: point.lat(), lng: point.lng() }));
        const steps: RouteStep[] = [];
        let totalDistance = 0;
        let totalDuration = 0;

        route.legs.forEach((leg, index) => {
          const distance = leg.distance?.value || 0;
          const duration = leg.duration?.value || 0;
          totalDistance += distance;
          totalDuration += duration;
          steps.push({
            lat: leg.start_location.lat(),
            lng: leg.start_location.lng(),
            address: leg.start_address || orderedWaypoints[index]?.address || 'Unknown',
            distance,
            duration,
          });
        });

        const lastLeg = route.legs[route.legs.length - 1];
        if (lastLeg) {
          steps.push({
            lat: lastLeg.end_location.lat(),
            lng: lastLeg.end_location.lng(),
            address: lastLeg.end_address || orderedWaypoints[orderedWaypoints.length - 1]?.address || 'Unknown',
            distance: 0,
            duration: 0,
          });
        }

        return { steps, totalDistance, totalDuration, geometry, orderedWaypoints };
      };

      let orderedWaypoints: HousePin[];
      let totalDistance = 0;
      let totalDuration = 0;
      let geometry: Array<{ lat: number; lng: number }> = [];
      let steps: RouteStep[] = [];

      if (waypoints.length <= MAX_DIRECTIONS_STOPS) {
        const segment = await requestSegment(waypoints, true);
        orderedWaypoints = segment.orderedWaypoints;
        totalDistance = segment.totalDistance;
        totalDuration = segment.totalDuration;
        geometry = segment.geometry;
        steps = segment.steps;
      } else {
        // Google Directions accepts at most 25 total stops. Order the complete set
        // locally first, then route consecutive 25-stop chunks with one-stop overlap
        // so no saved storefront is silently dropped from a large route.
        orderedWaypoints = optimizeRouteOrder(waypoints);

        for (let start = 0; start < orderedWaypoints.length - 1; start += MAX_DIRECTIONS_STOPS - 1) {
          const chunk = orderedWaypoints.slice(start, start + MAX_DIRECTIONS_STOPS);
          if (chunk.length < 2) break;
          const segment = await requestSegment(chunk, false);
          totalDistance += segment.totalDistance;
          totalDuration += segment.totalDuration;
          geometry = geometry.length === 0
            ? segment.geometry
            : [...geometry, ...segment.geometry.slice(1)];

          if (steps.length > 0) steps.pop();
          steps.push(...segment.steps);
        }
      }

      let hasUphill = false;
      let hasDownhill = false;

      if (google.maps.ElevationService && geometry.length > 1) {
        try {
          const elevationService = new google.maps.ElevationService();
          const stride = Math.max(1, Math.floor(geometry.length / 20));
          const samplePoints = geometry.filter((_, index) => index % stride === 0);
          const lastPoint = geometry[geometry.length - 1];
          const sampledLast = samplePoints[samplePoints.length - 1];
          if (!sampledLast || sampledLast.lat !== lastPoint.lat || sampledLast.lng !== lastPoint.lng) {
            samplePoints.push(lastPoint);
          }

          const elevationResult = await new Promise<google.maps.ElevationResult[]>((resolve, reject) => {
            elevationService.getElevationForLocations(
              { locations: samplePoints.map((point) => ({ lat: point.lat, lng: point.lng })) },
              (results, status) => {
                if (status === google.maps.ElevationStatus.OK && results) {
                  resolve(results);
                } else {
                  reject(new Error(`Elevation request failed: ${status}`));
                }
              },
            );
          });

          for (let i = 1; i < elevationResult.length; i++) {
            const difference = elevationResult[i].elevation - elevationResult[i - 1].elevation;
            if (difference > 5) hasUphill = true;
            if (difference < -5) hasDownhill = true;
          }
        } catch (elevationError) {
          console.log('Elevation data not available:', elevationError);
        }
      }

      setLoading(false);
      return {
        steps,
        totalDistance,
        totalDuration,
        geometry,
        orderedWaypoints,
        hasUphill,
        hasDownhill,
      };
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

    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }, []);

  const formatDistance = useCallback((meters: number): string => {
    if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`;
    return `${Math.round(meters)} m`;
  }, []);

  return {
    getRoute,
    loading,
    error,
    formatDuration,
    formatDistance,
  };
};
