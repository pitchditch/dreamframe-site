
import React, { useEffect, useRef, useState } from 'react';
import { HousePin, RouteSession } from './types';
import { supabase } from '@/integrations/supabase/client';
import { generateOptimizedRoutes, OptimizedRoute } from '@/utils/routeOptimizer';

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

  // Load Leaflet dynamically
  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        console.log('Starting to load Leaflet...');
        
        // Load CSS first
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          link.crossOrigin = '';
          document.head.appendChild(link);
          
          await new Promise((resolve) => {
            link.onload = resolve;
            setTimeout(resolve, 1000);
          });
        }

        const leafletModule = await import('leaflet');
        const L = leafletModule.default || leafletModule;
        
        console.log('Leaflet loaded:', L);
        
        if (L.Icon && L.Icon.Default) {
          delete (L.Icon.Default.prototype as any)._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          });
        }

        // Initialize map
        if (!mapRef.current || mapInstanceRef.current) return;

        console.log('Initializing map...');
        
        const map = L.map(mapRef.current).setView([49.0504, -122.8048], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        map.on('click', async (e: any) => {
          const { lat, lng } = e.latlng;
          console.log('Map clicked at:', lat, lng);
          
          // If in route select mode, generate route from this point
          if (routeSelectMode) {
            setRouteStartLocation({ lat, lng });
            generateWalkingRouteFromPoint(lat, lng);
            setRouteSelectMode(false);
            return;
          }
          
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
            );
            const data = await response.json();
            const address = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
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
        console.log('Map initialized successfully');

        return () => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
          }
        };
      } catch (error) {
        console.error('Failed to load Leaflet:', error);
      }
    };

    loadLeaflet();
  }, [onAddPin]);

  // Update markers when pins change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    Object.values(markersRef.current).forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = {};

    pins.forEach(pin => {
      const markerColor = statusConfig[pin.status].color;
      const isHighlighted = highlightedPinId === pin.id;
      
      const customIcon = L.divIcon({
        html: `<div style="background-color: ${markerColor}; width: ${isHighlighted ? '24px' : '20px'}; height: ${isHighlighted ? '24px' : '20px'}; border-radius: 50%; border: ${isHighlighted ? '3px solid #ffff00' : '2px solid white'}; box-shadow: 0 2px 4px rgba(0,0,0,0.3); ${isHighlighted ? 'animation: pulse 2s infinite;' : ''}"></div>`,
        iconSize: [isHighlighted ? 24 : 20, isHighlighted ? 24 : 20],
        iconAnchor: [isHighlighted ? 12 : 10, isHighlighted ? 12 : 10],
        className: 'custom-pin'
      });

      const marker = L.marker([pin.lat, pin.lng], { icon: customIcon })
        .addTo(mapInstanceRef.current!)
        .bindPopup(`
          <div class="p-2">
            <strong>${statusConfig[pin.status].label}</strong><br>
            <div class="text-sm">${pin.address}</div>
            ${pin.notes ? `<div class="text-sm text-gray-600 mt-1">${pin.notes}</div>` : ''}
            ${pin.customerName ? `<div class="text-sm"><strong>Customer:</strong> ${pin.customerName}</div>` : ''}
            ${pin.phoneNumber ? `<div class="text-sm"><strong>Phone:</strong> ${pin.phoneNumber}</div>` : ''}
            <div class="text-xs text-gray-400 mt-1">${pin.dateAdded}</div>
          </div>
        `);

      marker.on('click', () => {
        console.log('Pin clicked:', pin.address);
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
    if (!mapInstanceRef.current || !showEmployeeRoutes) {
      routeLinesRef.current.forEach(line => {
        mapInstanceRef.current?.removeLayer(line);
      });
      routeLinesRef.current = [];
      return;
    }

    const L = (window as any).L;
    if (!L) return;

    routeLinesRef.current.forEach(line => {
      mapInstanceRef.current?.removeLayer(line);
    });
    routeLinesRef.current = [];

    const sessionColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    
    employeeSessions.forEach((session, index) => {
      const sessionLocations = routeLocations
        .filter(loc => loc.session_id === session.id)
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      
      if (sessionLocations.length < 2) return;

      const coordinates = sessionLocations.map(loc => [loc.latitude, loc.longitude]);
      const color = sessionColors[index % sessionColors.length];

      const polyline = L.polyline(coordinates, {
        color: color,
        weight: 3,
        opacity: 0.7,
        smoothFactor: 1
      }).addTo(mapInstanceRef.current!);

      polyline.bindPopup(`
        <div class="p-2">
          <strong>${session.employee_name}</strong><br>
          <div class="text-sm">Session: ${new Date(session.session_start).toLocaleString()}</div>
          <div class="text-sm">Visits: ${session.total_visits || 0}</div>
          <div class="text-sm">Distance: ${(session.total_distance_km || 0).toFixed(2)} km</div>
        </div>
      `);

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
    if (!mapInstanceRef.current || !routeStartLocation) {
      // Clean up
      if (radiusCircleRef.current) {
        mapInstanceRef.current?.removeLayer(radiusCircleRef.current);
        radiusCircleRef.current = null;
      }
      if (walkingRouteRef.current) {
        mapInstanceRef.current?.removeLayer(walkingRouteRef.current);
        walkingRouteRef.current = null;
      }
      buildingMarkersRef.current.forEach(marker => {
        mapInstanceRef.current?.removeLayer(marker);
      });
      buildingMarkersRef.current = [];
      return;
    }

    const L = (window as any).L;
    if (!L) return;

    // Clean up previous markers
    buildingMarkersRef.current.forEach(marker => {
      mapInstanceRef.current.removeLayer(marker);
    });
    buildingMarkersRef.current = [];

    // Draw 2km radius circle
    if (radiusCircleRef.current) {
      mapInstanceRef.current.removeLayer(radiusCircleRef.current);
    }
    
    radiusCircleRef.current = L.circle([routeStartLocation.lat, routeStartLocation.lng], {
      radius: 2000, // 2km in meters
      color: '#10b981',
      fillColor: '#10b981',
      fillOpacity: 0.1,
      weight: 2
    }).addTo(mapInstanceRef.current);

    // Add start location marker
    const startMarker = L.marker([routeStartLocation.lat, routeStartLocation.lng], {
      icon: L.divIcon({
        html: '<div style="background-color: #10b981; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px rgba(16, 185, 129, 0.6);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        className: 'start-location-marker'
      })
    }).addTo(mapInstanceRef.current).bindPopup('<strong>Route Start</strong>');
    buildingMarkersRef.current.push(startMarker);

    if (!walkingRouteActive || nearbyBuildings.length === 0) {
      if (walkingRouteRef.current) {
        mapInstanceRef.current.removeLayer(walkingRouteRef.current);
        walkingRouteRef.current = null;
      }
      return;
    }

    // Create building markers
    nearbyBuildings.forEach(building => {
      const markerColor = building.type === 'residential' ? '#3b82f6' : 
                         building.type === 'commercial' ? '#f59e0b' : '#8b5cf6';
      
      const buildingIcon = L.divIcon({
        html: `<div style="background-color: ${markerColor}; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
        className: 'building-marker'
      });
      
      const marker = L.marker([building.lat, building.lng], { 
        icon: buildingIcon 
      }).addTo(mapInstanceRef.current);

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
      
      marker.bindPopup(popupContent);
      buildingMarkersRef.current.push(marker);
    });

    // Generate optimized route using nearest neighbor algorithm
    const routePoints = [routeStartLocation];
    const remaining = [...nearbyBuildings];
    let current = routeStartLocation;
    let totalDistance = 0;
    
    // Select up to 30 buildings for the route
    const maxBuildings = Math.min(30, remaining.length);
    
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

      routePoints.push(nearest);
      totalDistance += nearestDist;
      remaining.splice(nearestIdx, 1);
      current = nearest;
    }

    // Draw walking route
    if (walkingRouteRef.current) {
      mapInstanceRef.current.removeLayer(walkingRouteRef.current);
    }

    const coordinates = routePoints.map(point => [point.lat, point.lng]);
    
    walkingRouteRef.current = L.polyline(coordinates, {
      color: '#10b981',
      weight: 4,
      opacity: 0.8,
      smoothFactor: 1
    }).addTo(mapInstanceRef.current);

    const residentialCount = nearbyBuildings.filter(b => b.type === 'residential').length;
    const commercialCount = nearbyBuildings.filter(b => b.type === 'commercial').length;
    
    walkingRouteRef.current.bindPopup(`
      <div class="p-3">
        <strong class="text-lg">Walking Route</strong><br>
        <div class="text-sm mt-2 space-y-1">
          <div><strong>Total Buildings:</strong> ${nearbyBuildings.length}</div>
          <div><strong>Residential:</strong> ${residentialCount}</div>
          <div><strong>Commercial:</strong> ${commercialCount}</div>
          <div><strong>Route Stops:</strong> ${routePoints.length - 1}</div>
          <div><strong>Est. Distance:</strong> ${totalDistance.toFixed(2)} km</div>
          <div><strong>Radius:</strong> 2 km</div>
        </div>
        <div class="text-xs text-gray-500 mt-2">Data from OpenStreetMap</div>
      </div>
    `);

  }, [walkingRouteActive, routeStartLocation, nearbyBuildings]);

  // Draw optimized flyer routes
  useEffect(() => {
    if (!mapInstanceRef.current || !showFlyerRoutes) {
      flyerRouteLinesRef.current.forEach(line => {
        mapInstanceRef.current?.removeLayer(line);
      });
      flyerRouteLinesRef.current = [];
      return;
    }

    const L = (window as any).L;
    if (!L) return;

    flyerRouteLinesRef.current.forEach(line => {
      mapInstanceRef.current?.removeLayer(line);
    });
    flyerRouteLinesRef.current = [];

    optimizedRoutes.forEach(route => {
      if (route.pins.length < 2) return;

      const coordinates = route.pins.map(pin => [pin.lat, pin.lng]);

      const polyline = L.polyline(coordinates, {
        color: route.color,
        weight: 4,
        opacity: 0.8,
        smoothFactor: 1,
        dashArray: '10, 10'
      }).addTo(mapInstanceRef.current!);

      polyline.bindPopup(`
        <div class="p-3">
          <strong class="text-lg">${route.cityName} Flyer Route</strong><br>
          <div class="text-sm mt-1">Properties: ${route.pins.length}</div>
          <div class="text-sm">Total Distance: ${route.totalDistance.toFixed(2)} km</div>
          <div class="text-xs text-gray-500 mt-1">Optimized for efficiency</div>
        </div>
      `);

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
                Object.values(markersRef.current).forEach(marker => {
                  mapInstanceRef.current?.removeLayer(marker);
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
