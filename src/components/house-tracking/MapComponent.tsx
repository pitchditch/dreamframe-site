
import React, { useEffect, useRef, useState } from 'react';
import { HousePin, RouteSession } from './types';
import { supabase } from '@/integrations/supabase/client';
import { generateOptimizedRoutes, OptimizedRoute } from '@/utils/routeOptimizer';
import { useGoogleMapsRouting } from '@/hooks/useGoogleMapsRouting';

interface MapComponentProps {
  pins: HousePin[];
  routes: RouteSession[];
  onAddPin: (newPin: Omit<HousePin, 'id'>) => void;
  onUpdatePin: (pinId: string, updates: Partial<HousePin>) => void;
  onUpdateRoutes: React.Dispatch<React.SetStateAction<RouteSession[]>>;
  highlightedPinId: string | null;
  onPinHover: React.Dispatch<React.SetStateAction<string | null>>;
}

const statusConfig = {
  'visited': { color: '#3b82f6', label: 'Visited' },
  'interested': { color: '#10b981', label: 'Interested' },
  'not-interested': { color: '#ef4444', label: 'Not Interested' },
  'completed': { color: '#8b5cf6', label: 'Completed' },
  'revisit-later': { color: '#fbbf24', label: 'Revisit Later' },
  'needs-quote': { color: '#f97316', label: 'Needs Quote' }
};

const MapComponent: React.FC<MapComponentProps> = ({
  pins,
  routes,
  onAddPin,
  onUpdatePin,
  onUpdateRoutes,
  highlightedPinId,
  onPinHover
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{[key: string]: any}>({});
  const routeLinesRef = useRef<any[]>([]);
  const flyerRouteLinesRef = useRef<any[]>([]);
  const [showEmployeeRoutes, setShowEmployeeRoutes] = useState(false);
  const [showFlyerRoutes, setShowFlyerRoutes] = useState(true);
  const [employeeSessions, setEmployeeSessions] = useState<any[]>([]);
  const [routeLocations, setRouteLocations] = useState<any[]>([]);
  const [optimizedRoutes, setOptimizedRoutes] = useState<OptimizedRoute[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [walkingRouteActive, setWalkingRouteActive] = useState(false);
  const [routeStartLocation, setRouteStartLocation] = useState<{lat: number, lng: number} | null>(null);
  const [nearbyBuildings, setNearbyBuildings] = useState<any[]>([]);
  const [routeMessage, setRouteMessage] = useState<string>('Click on map to start route');
  const radiusCircleRef = useRef<any>(null);
  const walkingRouteRef = useRef<any>(null);
  const buildingMarkersRef = useRef<any[]>([]);
  const [routeSelectMode, setRouteSelectMode] = useState(false);
  const [googleRouteGeometry, setGoogleRouteGeometry] = useState<Array<{lat: number, lng: number}>>([]);
  const [googleRouteInfo, setGoogleRouteInfo] = useState<{time: string, distance: string, hasUphill: boolean, hasDownhill: boolean} | null>(null);
  
  const { getRoute, formatDuration, formatDistance, loading: routeLoading } = useGoogleMapsRouting();

  // Fetch employee sessions and locations
  useEffect(() => {
    const fetchRoutesData = async () => {
      const { data: sessions } = await supabase
        .from('employee_work_sessions')
        .select('*')
        .order('session_start', { ascending: false });
      
      const { data: locations } = await supabase
        .from('employee_locations')
        .select('*')
        .order('timestamp', { ascending: true });
      
      if (sessions) setEmployeeSessions(sessions);
      if (locations) setRouteLocations(locations);
    };
    
    fetchRoutesData();
  }, []);

  // Load Google Maps dynamically
  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        console.log('Starting to load Google Maps...');
        
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
          console.error('Google Maps API key not found');
          return;
        }

        // Load Google Maps script if not already loaded
        if (!(window as any).google?.maps) {
          await new Promise<void>((resolve, reject) => {
            if ((window as any).google?.maps) {
              resolve();
              return;
            }
            
            const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
            if (existingScript) {
              existingScript.addEventListener('load', () => resolve());
              return;
            }

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
            script.async = true;
            script.defer = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Google Maps'));
            document.head.appendChild(script);
          });
        }

        const google = (window as any).google;
        if (!google?.maps) {
          console.error('Google Maps not loaded');
          return;
        }

        // Initialize map
        if (!mapRef.current || mapInstanceRef.current) return;

        console.log('Initializing Google Maps...');
        
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 49.0504, lng: -122.8048 },
          zoom: 13,
          mapTypeId: 'roadmap',
          styles: [
            { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }
          ],
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        });

        map.addListener('click', async (e: any) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          console.log('Map clicked at:', lat, lng);
          
          // If in route select mode, generate route from this point
          if (routeSelectMode) {
            setRouteStartLocation({ lat, lng });
            generateWalkingRouteFromPoint(lat, lng);
            setRouteSelectMode(false);
            return;
          }
          
          try {
            const geocoder = new google.maps.Geocoder();
            const result = await geocoder.geocode({ location: { lat, lng } });
            const address = result.results[0]?.formatted_address || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
            console.log('Found address:', address);
            
            // Create new pin
            const newPin: Omit<HousePin, 'id'> = {
              lat,
              lng,
              address,
              status: 'visited',
              notes: '',
              dateAdded: new Date().toISOString().split('T')[0],
              leadSource: 'door-to-door'
            };
            
            onAddPin(newPin);
          } catch (error) {
            console.log('Could not fetch address, using coordinates');
            const newPin: Omit<HousePin, 'id'> = {
              lat,
              lng,
              address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
              status: 'visited',
              notes: '',
              dateAdded: new Date().toISOString().split('T')[0],
              leadSource: 'door-to-door'
            };
            
            onAddPin(newPin);
          }
        });

        mapInstanceRef.current = map;
        console.log('Google Maps initialized successfully');

        return () => {
          mapInstanceRef.current = null;
        };
      } catch (error) {
        console.error('Failed to load Google Maps:', error);
      }
    };

    loadGoogleMaps();
  }, [onAddPin]);

  // Update markers when pins change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const google = (window as any).google;
    if (!google?.maps) return;

    // Remove existing markers
    Object.values(markersRef.current).forEach((marker: any) => {
      marker.setMap(null);
    });
    markersRef.current = {};

    pins.forEach(pin => {
      const markerColor = statusConfig[pin.status].color;
      const isHighlighted = highlightedPinId === pin.id;
      
      const marker = new google.maps.Marker({
        position: { lat: pin.lat, lng: pin.lng },
        map: mapInstanceRef.current,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: isHighlighted ? 12 : 10,
          fillColor: markerColor,
          fillOpacity: 1,
          strokeColor: isHighlighted ? '#ffff00' : '#ffffff',
          strokeWeight: isHighlighted ? 3 : 2,
        },
        title: pin.address,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <strong>${statusConfig[pin.status].label}</strong><br>
            <div class="text-sm">${pin.address}</div>
            ${pin.notes ? `<div class="text-sm text-gray-600 mt-1">${pin.notes}</div>` : ''}
            ${pin.customerName ? `<div class="text-sm"><strong>Customer:</strong> ${pin.customerName}</div>` : ''}
            ${pin.phoneNumber ? `<div class="text-sm"><strong>Phone:</strong> ${pin.phoneNumber}</div>` : ''}
            <div class="text-xs text-gray-400 mt-1">${pin.dateAdded}</div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, marker);
        onPinHover(pin.id);
      });

      markersRef.current[pin.id] = marker;
    });
  }, [pins, highlightedPinId, onPinHover]);

  // Generate optimized flyer routes when pins change
  useEffect(() => {
    const routes = generateOptimizedRoutes(pins);
    setOptimizedRoutes(routes);
  }, [pins]);

  // Draw employee route lines
  useEffect(() => {
    const google = (window as any).google;
    
    if (!mapInstanceRef.current || !showEmployeeRoutes) {
      routeLinesRef.current.forEach((line: any) => line.setMap(null));
      routeLinesRef.current = [];
      return;
    }

    if (!google?.maps) return;

    routeLinesRef.current.forEach((line: any) => line.setMap(null));
    routeLinesRef.current = [];

    const sessionColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    
    employeeSessions.forEach((session, index) => {
      const sessionLocations = routeLocations
        .filter(loc => loc.session_id === session.id)
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      
      if (sessionLocations.length < 2) return;

      const path = sessionLocations.map(loc => ({ lat: loc.latitude, lng: loc.longitude }));
      const color = sessionColors[index % sessionColors.length];

      const polyline = new google.maps.Polyline({
        path,
        strokeColor: color,
        strokeWeight: 3,
        strokeOpacity: 0.7,
        map: mapInstanceRef.current,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <strong>${session.employee_name}</strong><br>
            <div class="text-sm">Session: ${new Date(session.session_start).toLocaleString()}</div>
            <div class="text-sm">Visits: ${session.total_visits || 0}</div>
            <div class="text-sm">Distance: ${(session.total_distance_km || 0).toFixed(2)} km</div>
          </div>
        `
      });

      polyline.addListener('click', (e: any) => {
        infoWindow.setPosition(e.latLng);
        infoWindow.open(mapInstanceRef.current);
      });

      routeLinesRef.current.push(polyline);
    });
  }, [employeeSessions, routeLocations, showEmployeeRoutes]);

  // Generate walking route from a clicked point
  const generateWalkingRouteFromPoint = async (lat: number, lng: number) => {
    setRouteMessage('Fetching buildings from OpenStreetMap...');
    setWalkingRouteActive(true);
    
    // Fetch buildings from OpenStreetMap using Overpass API
    const radius = 2000; // 2km radius
    const overpassQuery = `
      [out:json][timeout:10];
      (
        way["building"](around:${radius},${lat},${lng});
        node["building"](around:${radius},${lat},${lng});
      );
      out center;
    `;
    
    try {
      // Add timeout to the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12 second timeout
      
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error('Failed to fetch building data');
      }
      
      const data = await response.json();
      
      if (!data.elements || data.elements.length === 0) {
        setRouteMessage('No buildings found in this area. Try another location.');
        setNearbyBuildings([]);
        setWalkingRouteActive(false);
        return;
      }
      
      // Process buildings
      const buildings = data.elements.map((element: any) => {
        const center = element.center || { lat: element.lat, lon: element.lon };
        const buildingType = element.tags?.building || 'yes';
        const isResidential = ['house', 'residential', 'apartments', 'detached', 'terrace', 'semidetached_house', 'bungalow'].includes(buildingType);
        const isCommercial = ['commercial', 'retail', 'office', 'warehouse', 'industrial'].includes(buildingType);
        const yearBuilt = element.tags?.['start_date'] || element.tags?.['building:year'] || null;
        
        return {
          lat: center.lat,
          lng: center.lon,
          type: isResidential ? 'residential' : isCommercial ? 'commercial' : 'other',
          buildingType,
          yearBuilt,
          address: element.tags?.['addr:street'] ? 
            `${element.tags['addr:housenumber'] || ''} ${element.tags['addr:street']}`.trim() : 
            'Unknown Address',
          tags: element.tags
        };
      });
      
      setNearbyBuildings(buildings);
      setRouteMessage(`Found ${buildings.length} buildings. Route generated!`);
      
      // Center map on selected location
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setView([lat, lng], 15);
      }
    } catch (error: any) {
      console.error('Error fetching buildings:', error);
      setRouteMessage('Error connecting to OpenStreetMap');
    }
  };

  // Handle walking route selection
  const startRouteSelection = () => {
    setRouteSelectMode(true);
    setRouteMessage('Click on the map to select starting location');
  };

  // Calculate distance between two coordinates in km
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Draw walking route with buildings from OSM
  useEffect(() => {
    const google = (window as any).google;
    
    if (!mapInstanceRef.current || !routeStartLocation) {
      // Clean up
      if (radiusCircleRef.current) {
        radiusCircleRef.current.setMap(null);
        radiusCircleRef.current = null;
      }
      if (walkingRouteRef.current) {
        walkingRouteRef.current.setMap(null);
        walkingRouteRef.current = null;
      }
      buildingMarkersRef.current.forEach((marker: any) => marker.setMap(null));
      buildingMarkersRef.current = [];
      return;
    }

    if (!google?.maps) return;

    // Clean up previous markers
    buildingMarkersRef.current.forEach((marker: any) => marker.setMap(null));
    buildingMarkersRef.current = [];

    // Draw 2km radius circle
    if (radiusCircleRef.current) {
      radiusCircleRef.current.setMap(null);
    }
    
    radiusCircleRef.current = new google.maps.Circle({
      center: { lat: routeStartLocation.lat, lng: routeStartLocation.lng },
      radius: 2000,
      strokeColor: '#10b981',
      strokeWeight: 2,
      fillColor: '#10b981',
      fillOpacity: 0.1,
      map: mapInstanceRef.current,
    });

    // Add start location marker
    const startMarker = new google.maps.Marker({
      position: { lat: routeStartLocation.lat, lng: routeStartLocation.lng },
      map: mapInstanceRef.current,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#10b981',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3,
      },
      title: 'Route Start',
    });
    
    const startInfoWindow = new google.maps.InfoWindow({ content: '<strong>Route Start</strong>' });
    startMarker.addListener('click', () => startInfoWindow.open(mapInstanceRef.current, startMarker));
    buildingMarkersRef.current.push(startMarker);

    if (!walkingRouteActive || nearbyBuildings.length === 0) {
      if (walkingRouteRef.current) {
        walkingRouteRef.current.setMap(null);
        walkingRouteRef.current = null;
      }
      return;
    }

    // Create building markers
    nearbyBuildings.forEach(building => {
      const markerColor = building.type === 'residential' ? '#3b82f6' : 
                         building.type === 'commercial' ? '#f59e0b' : '#8b5cf6';
      
      const marker = new google.maps.Marker({
        position: { lat: building.lat, lng: building.lng },
        map: mapInstanceRef.current,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 5,
          fillColor: markerColor,
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      let popupContent = `
        <div class="p-2 max-w-xs">
          <strong class="text-sm">${building.address}</strong><br>
          <div class="mt-1 space-y-1 text-xs">
            <div><strong>Type:</strong> ${building.type.charAt(0).toUpperCase() + building.type.slice(1)}</div>
            <div><strong>Building:</strong> ${building.buildingType}</div>
      `;

      if (building.yearBuilt) {
        popupContent += `<div><strong>Year Built:</strong> ${building.yearBuilt}</div>`;
      }

      popupContent += `</div></div>`;
      
      const infoWindow = new google.maps.InfoWindow({ content: popupContent });
      marker.addListener('click', () => infoWindow.open(mapInstanceRef.current, marker));
      buildingMarkersRef.current.push(marker);
    });

    // Generate optimized route using nearest neighbor algorithm
    const routePoints: Array<{lat: number, lng: number, address?: string}> = [{...routeStartLocation, address: 'Start'}];
    const remaining = [...nearbyBuildings];
    let current = routeStartLocation;
    
    // Select up to 20 buildings for the route (Google Directions API has waypoint limits)
    const maxBuildings = Math.min(20, remaining.length);
    
    for (let i = 0; i < maxBuildings && remaining.length > 0; i++) {
      let nearest = remaining[0];
      let nearestDist = calculateDistance(current.lat, current.lng, nearest.lat, nearest.lng);
      let nearestIdx = 0;

      for (let j = 1; j < remaining.length; j++) {
        const dist = calculateDistance(current.lat, current.lng, remaining[j].lat, remaining[j].lng);
        if (dist < nearestDist) {
          nearest = remaining[j];
          nearestDist = dist;
          nearestIdx = j;
        }
      }

      routePoints.push({lat: nearest.lat, lng: nearest.lng, address: nearest.address});
      remaining.splice(nearestIdx, 1);
      current = nearest;
    }

    // Fetch Google Maps walking route
    const fetchGoogleRoute = async () => {
      setRouteMessage('Calculating walking route with Google Maps...');
      
      // Convert to HousePin format for the hook
      const waypoints = routePoints.map((p, i) => ({
        id: `waypoint-${i}`,
        lat: p.lat,
        lng: p.lng,
        address: p.address || 'Unknown',
        status: 'visited' as const,
        notes: '',
        dateAdded: new Date().toISOString().split('T')[0]
      }));

      try {
        const routeData = await getRoute(waypoints);
        
        if (routeData && routeData.geometry.length > 0) {
          setGoogleRouteGeometry(routeData.geometry);
          setGoogleRouteInfo({
            time: formatDuration(routeData.totalDuration),
            distance: formatDistance(routeData.totalDistance),
            hasUphill: routeData.hasUphill,
            hasDownhill: routeData.hasDownhill
          });
          setRouteMessage(`Route ready! ${formatDuration(routeData.totalDuration)} walking time`);
          
          // Draw actual walking route from Google
          if (walkingRouteRef.current) {
            walkingRouteRef.current.setMap(null);
          }
          
          const googlePath = routeData.geometry.map(point => ({ lat: point.lat, lng: point.lng }));
          
          walkingRouteRef.current = new google.maps.Polyline({
            path: googlePath,
            strokeColor: '#10b981',
            strokeWeight: 5,
            strokeOpacity: 0.9,
            map: mapInstanceRef.current,
          });

          const residentialCount = nearbyBuildings.filter(b => b.type === 'residential').length;
          const commercialCount = nearbyBuildings.filter(b => b.type === 'commercial').length;
          
          const routeInfoWindow = new google.maps.InfoWindow({
            content: `
              <div class="p-3">
                <strong class="text-lg">🚶 Walking Route</strong><br>
                <div class="text-sm mt-2 space-y-1">
                  <div><strong>Walking Time:</strong> ${formatDuration(routeData.totalDuration)}</div>
                  <div><strong>Distance:</strong> ${formatDistance(routeData.totalDistance)}</div>
                  <div><strong>Buildings:</strong> ${nearbyBuildings.length}</div>
                  <div><strong>Residential:</strong> ${residentialCount}</div>
                  <div><strong>Commercial:</strong> ${commercialCount}</div>
                  <div><strong>Route Stops:</strong> ${routePoints.length - 1}</div>
                  ${routeData.hasUphill ? '<div>🔺 Has uphill sections</div>' : ''}
                  ${routeData.hasDownhill ? '<div>🔻 Has downhill sections</div>' : ''}
                </div>
                <div class="text-xs text-gray-500 mt-2">Route by Google Maps</div>
              </div>
            `
          });
          
          walkingRouteRef.current.addListener('click', (e: any) => {
            routeInfoWindow.setPosition(e.latLng);
            routeInfoWindow.open(mapInstanceRef.current);
          });
        } else {
          // Fallback to straight-line route
          drawFallbackRoute();
        }
      } catch (error) {
        console.error('Google routing error:', error);
        drawFallbackRoute();
      }
    };

    // Fallback function for when Google API fails
    const drawFallbackRoute = () => {
      if (walkingRouteRef.current) {
        walkingRouteRef.current.setMap(null);
      }

      const path = routePoints.map(point => ({ lat: point.lat, lng: point.lng }));
      let totalDistance = 0;
      for (let i = 0; i < routePoints.length - 1; i++) {
        totalDistance += calculateDistance(routePoints[i].lat, routePoints[i].lng, routePoints[i+1].lat, routePoints[i+1].lng);
      }
      
      walkingRouteRef.current = new google.maps.Polyline({
        path,
        strokeColor: '#10b981',
        strokeWeight: 4,
        strokeOpacity: 0.8,
        map: mapInstanceRef.current,
        icons: [{
          icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 2 },
          offset: '0',
          repeat: '10px'
        }]
      });

      const residentialCount = nearbyBuildings.filter(b => b.type === 'residential').length;
      const commercialCount = nearbyBuildings.filter(b => b.type === 'commercial').length;
      
      const fallbackInfoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-3">
            <strong class="text-lg">Walking Route (Estimate)</strong><br>
            <div class="text-sm mt-2 space-y-1">
              <div><strong>Total Buildings:</strong> ${nearbyBuildings.length}</div>
              <div><strong>Residential:</strong> ${residentialCount}</div>
              <div><strong>Commercial:</strong> ${commercialCount}</div>
              <div><strong>Route Stops:</strong> ${routePoints.length - 1}</div>
              <div><strong>Est. Distance:</strong> ${totalDistance.toFixed(2)} km</div>
            </div>
            <div class="text-xs text-gray-500 mt-2">Straight-line estimate</div>
          </div>
        `
      });
      
      walkingRouteRef.current.addListener('click', (e: any) => {
        fallbackInfoWindow.setPosition(e.latLng);
        fallbackInfoWindow.open(mapInstanceRef.current);
      });
      
      setRouteMessage(`Found ${nearbyBuildings.length} buildings (fallback route)`);
    };

    fetchGoogleRoute();
  }, [walkingRouteActive, routeStartLocation, nearbyBuildings, getRoute, formatDuration, formatDistance]);

  // Draw optimized flyer routes
  useEffect(() => {
    const google = (window as any).google;
    
    if (!mapInstanceRef.current || !showFlyerRoutes) {
      flyerRouteLinesRef.current.forEach((line: any) => line.setMap(null));
      flyerRouteLinesRef.current = [];
      return;
    }

    if (!google?.maps) return;

    flyerRouteLinesRef.current.forEach((line: any) => line.setMap(null));
    flyerRouteLinesRef.current = [];

    optimizedRoutes.forEach(route => {
      if (route.pins.length < 2) return;

      const path = route.pins.map(pin => ({ lat: pin.lat, lng: pin.lng }));

      const polyline = new google.maps.Polyline({
        path,
        strokeColor: route.color,
        strokeWeight: 4,
        strokeOpacity: 0.8,
        map: mapInstanceRef.current,
        icons: [{
          icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 2 },
          offset: '0',
          repeat: '10px'
        }]
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-3">
            <strong class="text-lg">${route.cityName} Flyer Route</strong><br>
            <div class="text-sm mt-1">Properties: ${route.pins.length}</div>
            <div class="text-sm">Total Distance: ${route.totalDistance.toFixed(2)} km</div>
            <div class="text-xs text-gray-500 mt-1">Optimized for efficiency</div>
          </div>
        `
      });

      polyline.addListener('click', (e: any) => {
        infoWindow.setPosition(e.latLng);
        infoWindow.open(mapInstanceRef.current);
      });

      flyerRouteLinesRef.current.push(polyline);
    });
  }, [optimizedRoutes, showFlyerRoutes]);

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-[1000] bg-background border rounded-lg shadow-lg p-3 space-y-2 max-w-xs">
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showFlyerRoutes}
              onChange={(e) => setShowFlyerRoutes(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium">Flyer Routes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showEmployeeRoutes}
              onChange={(e) => setShowEmployeeRoutes(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium">Employee Routes</span>
          </label>
        </div>

        <div className="pt-2 border-t space-y-2">
          <div className="font-semibold text-sm">Walking Route Generator</div>
          <button
            onClick={startRouteSelection}
            disabled={routeSelectMode}
            className={`w-full text-sm rounded px-3 py-1.5 ${
              routeSelectMode 
                ? 'bg-yellow-500 text-white cursor-wait' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            {routeSelectMode ? 'Click on Map...' : 'Generate 2km Route'}
          </button>
          {(walkingRouteActive || routeStartLocation) && (
            <button
              onClick={() => {
                setWalkingRouteActive(false);
                setRouteStartLocation(null);
                setNearbyBuildings([]);
                setRouteMessage('Click on map to start route');
                setRouteSelectMode(false);
              }}
              className="w-full text-sm bg-destructive text-destructive-foreground rounded px-3 py-1.5 hover:bg-destructive/90"
            >
              Clear Route
            </button>
          )}
          <button
            onClick={() => {
              if (confirm('Clear all pins from the map?')) {
                Object.values(markersRef.current).forEach((marker: any) => {
                  marker.setMap(null);
                });
                markersRef.current = {};
                window.location.reload();
              }
            }}
            className="w-full text-sm bg-orange-500 text-white rounded px-3 py-1.5 hover:bg-orange-600"
          >
            Clear All Pins
          </button>
          {routeMessage && (
            <div className={`text-xs p-2 rounded ${
              routeMessage.includes('Error') || routeMessage.includes('No') 
                ? 'bg-destructive/10 text-destructive' 
                : routeSelectMode
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-primary/10 text-primary'
            }`}>
              {routeMessage}
            </div>
          )}
        </div>

        {optimizedRoutes.length > 0 && showFlyerRoutes && (
          <div className="pt-2 border-t text-xs space-y-1">
            <div className="font-semibold text-foreground">Routes by City:</div>
            {optimizedRoutes.map(route => (
              <div key={route.cityName} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: route.color }}
                />
                <span className="text-muted-foreground">{route.cityName} ({route.pins.length})</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div 
        ref={mapRef}
        className="w-full h-96 border-2 border-gray-300 rounded-lg overflow-hidden"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
};

export default MapComponent;
