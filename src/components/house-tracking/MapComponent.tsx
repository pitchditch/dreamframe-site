
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
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<'all' | 'residential' | 'commercial'>('all');
  const [nearbyProperties, setNearbyProperties] = useState<any[]>([]);
  const [routeMessage, setRouteMessage] = useState<string>('');
  const radiusCircleRef = useRef<any>(null);
  const walkingRouteRef = useRef<any>(null);
  const propertyMarkersRef = useRef<any[]>([]);

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

  // Handle walking route generation
  const generateWalkingRoute = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCurrentLocation(location);
        
        // Query properties from database within 5km radius
        try {
          setRouteMessage('Searching for properties...');
          
          let query = supabase
            .from('properties')
            .select('*')
            .not('lat', 'is', null)
            .not('lng', 'is', null);
          
          // Filter by property type if not "all"
          if (propertyTypeFilter !== 'all') {
            query = query.eq('type', propertyTypeFilter);
          }
          
          const { data: properties, error } = await query;
          
          if (error) {
            console.error('Error fetching properties:', error);
            setRouteMessage('Error fetching properties');
            return;
          }
          
          if (!properties || properties.length === 0) {
            setRouteMessage('No properties found in database');
            setNearbyProperties([]);
            return;
          }
          
          // Filter properties within 5km radius
          const nearby = properties.filter(prop => {
            const distance = calculateDistance(
              location.lat,
              location.lng,
              typeof prop.lat === 'string' ? parseFloat(prop.lat) : prop.lat,
              typeof prop.lng === 'string' ? parseFloat(prop.lng) : prop.lng
            );
            return distance <= 5;
          });
          
          if (nearby.length === 0) {
            setRouteMessage(`No ${propertyTypeFilter === 'all' ? '' : propertyTypeFilter} properties found within 5km radius`);
            setNearbyProperties([]);
          } else {
            setNearbyProperties(nearby);
            setRouteMessage(`Found ${nearby.length} ${propertyTypeFilter === 'all' ? '' : propertyTypeFilter} properties within 5km`);
            setWalkingRouteActive(true);
          }
        } catch (err) {
          console.error('Error generating route:', err);
          setRouteMessage('Error generating route');
        }
        
        // Center map on current location
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([location.lat, location.lng], 14);
        }
      },
      (error) => {
        alert('Unable to get your location: ' + error.message);
      }
    );
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

  // Draw walking route radius and route with property data
  useEffect(() => {
    if (!mapInstanceRef.current || !currentLocation) {
      // Clean up
      if (radiusCircleRef.current) {
        mapInstanceRef.current?.removeLayer(radiusCircleRef.current);
        radiusCircleRef.current = null;
      }
      if (walkingRouteRef.current) {
        mapInstanceRef.current?.removeLayer(walkingRouteRef.current);
        walkingRouteRef.current = null;
      }
      propertyMarkersRef.current.forEach(marker => {
        mapInstanceRef.current?.removeLayer(marker);
      });
      propertyMarkersRef.current = [];
      return;
    }

    const L = (window as any).L;
    if (!L) return;

    // Clean up previous markers
    propertyMarkersRef.current.forEach(marker => {
      mapInstanceRef.current.removeLayer(marker);
    });
    propertyMarkersRef.current = [];

    // Draw 5km radius circle
    if (radiusCircleRef.current) {
      mapInstanceRef.current.removeLayer(radiusCircleRef.current);
    }
    
    radiusCircleRef.current = L.circle([currentLocation.lat, currentLocation.lng], {
      radius: 5000, // 5km in meters
      color: '#10b981',
      fillColor: '#10b981',
      fillOpacity: 0.1,
      weight: 2
    }).addTo(mapInstanceRef.current);

    // Add current location marker
    const currentMarker = L.marker([currentLocation.lat, currentLocation.lng], {
      icon: L.divIcon({
        html: '<div style="background-color: #10b981; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px rgba(16, 185, 129, 0.6);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        className: 'current-location-marker'
      })
    }).addTo(mapInstanceRef.current).bindPopup('<strong>Your Location</strong>');
    propertyMarkersRef.current.push(currentMarker);

    if (!walkingRouteActive || nearbyProperties.length === 0) {
      if (walkingRouteRef.current) {
        mapInstanceRef.current.removeLayer(walkingRouteRef.current);
        walkingRouteRef.current = null;
      }
      return;
    }

    // Create property markers with detailed information
    nearbyProperties.forEach(property => {
      const propertyType = property.type || 'unknown';
      const markerColor = propertyType === 'residential' ? '#3b82f6' : 
                         propertyType === 'commercial' ? '#f59e0b' : '#8b5cf6';
      
      const propertyIcon = L.divIcon({
        html: `<div style="background-color: ${markerColor}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        className: 'property-marker'
      });

      const propLat = typeof property.lat === 'string' ? parseFloat(property.lat) : property.lat;
      const propLng = typeof property.lng === 'string' ? parseFloat(property.lng) : property.lng;
      
      const marker = L.marker([propLat, propLng], { 
        icon: propertyIcon 
      }).addTo(mapInstanceRef.current);

      // Build detailed popup content
      let popupContent = `
        <div class="p-3 max-w-xs">
          <strong class="text-base">${property.address_line1 || property.address || 'Unknown Address'}</strong><br>
          <div class="mt-2 space-y-1 text-sm">
            <div><strong>Type:</strong> ${(propertyType).charAt(0).toUpperCase() + (propertyType).slice(1)}</div>
      `;

      if (property.city) {
        popupContent += `<div><strong>City:</strong> ${property.city}</div>`;
      }
      if (property.living_sqft) {
        popupContent += `<div><strong>Living Area:</strong> ${property.living_sqft.toLocaleString()} sq ft</div>`;
      }
      if (property.lot_sqft) {
        popupContent += `<div><strong>Lot Size:</strong> ${property.lot_sqft.toLocaleString()} sq ft</div>`;
      }
      if (property.year_built) {
        popupContent += `<div><strong>Year Built:</strong> ${property.year_built}</div>`;
      }
      if (property.bedrooms) {
        popupContent += `<div><strong>Bedrooms:</strong> ${property.bedrooms}</div>`;
      }
      if (property.bathrooms) {
        popupContent += `<div><strong>Bathrooms:</strong> ${property.bathrooms}</div>`;
      }
      if (property.stories) {
        popupContent += `<div><strong>Stories:</strong> ${property.stories}</div>`;
      }
      if (property.status) {
        popupContent += `<div><strong>Status:</strong> ${property.status}</div>`;
      }
      if (property.lead_score) {
        popupContent += `<div><strong>Lead Score:</strong> ${property.lead_score}</div>`;
      }
      if (property.customer_name) {
        popupContent += `<div><strong>Contact:</strong> ${property.customer_name}</div>`;
      }
      if (property.phone_number) {
        popupContent += `<div><strong>Phone:</strong> ${property.phone_number}</div>`;
      }

      popupContent += `</div></div>`;
      
      marker.bindPopup(popupContent);
      propertyMarkersRef.current.push(marker);
    });

    // Generate optimized route starting from current location
    const optimized = [currentLocation];
    const remaining = [...nearbyProperties.map(p => ({
      lat: typeof p.lat === 'string' ? parseFloat(p.lat) : p.lat,
      lng: typeof p.lng === 'string' ? parseFloat(p.lng) : p.lng,
      data: p
    }))];

    let current = currentLocation;
    let totalDistance = 0;
    
    while (remaining.length > 0) {
      let nearest = remaining[0];
      let nearestDist = calculateDistance(current.lat, current.lng, nearest.lat, nearest.lng);
      let nearestIdx = 0;

      for (let i = 1; i < remaining.length; i++) {
        const dist = calculateDistance(current.lat, current.lng, remaining[i].lat, remaining[i].lng);
        if (dist < nearestDist) {
          nearest = remaining[i];
          nearestDist = dist;
          nearestIdx = i;
        }
      }

      optimized.push(nearest);
      totalDistance += nearestDist;
      remaining.splice(nearestIdx, 1);
      current = nearest;
    }

    // Draw walking route
    if (walkingRouteRef.current) {
      mapInstanceRef.current.removeLayer(walkingRouteRef.current);
    }

    const coordinates = optimized.map(point => [point.lat, point.lng]);
    
    walkingRouteRef.current = L.polyline(coordinates, {
      color: '#10b981',
      weight: 4,
      opacity: 0.8,
      smoothFactor: 1
    }).addTo(mapInstanceRef.current);

    const filterText = propertyTypeFilter === 'all' ? 'All Properties' : 
                      propertyTypeFilter.charAt(0).toUpperCase() + propertyTypeFilter.slice(1);
    
    walkingRouteRef.current.bindPopup(`
      <div class="p-3">
        <strong class="text-lg">Walking Route</strong><br>
        <div class="text-sm mt-2 space-y-1">
          <div><strong>Filter:</strong> ${filterText}</div>
          <div><strong>Properties:</strong> ${nearbyProperties.length}</div>
          <div><strong>Distance:</strong> ${totalDistance.toFixed(2)} km</div>
          <div><strong>Radius:</strong> 5 km</div>
        </div>
        <div class="text-xs text-gray-500 mt-2">Optimized walking path</div>
      </div>
    `);

  }, [walkingRouteActive, currentLocation, nearbyProperties, propertyTypeFilter]);

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
          <select
            value={propertyTypeFilter}
            onChange={(e) => setPropertyTypeFilter(e.target.value as 'all' | 'residential' | 'commercial')}
            className="w-full text-sm border rounded px-2 py-1"
          >
            <option value="all">All Properties</option>
            <option value="residential">Residential Only</option>
            <option value="commercial">Commercial Only</option>
          </select>
          <button
            onClick={generateWalkingRoute}
            className="w-full text-sm bg-primary text-primary-foreground rounded px-3 py-1.5 hover:bg-primary/90"
          >
            Generate 5km Route
          </button>
          {(walkingRouteActive || currentLocation) && (
            <button
              onClick={() => {
                setWalkingRouteActive(false);
                setCurrentLocation(null);
                setNearbyProperties([]);
                setRouteMessage('');
              }}
              className="w-full text-sm bg-destructive text-destructive-foreground rounded px-3 py-1.5 hover:bg-destructive/90"
            >
              Clear Walking Route
            </button>
          )}
          {routeMessage && (
            <div className={`text-xs p-2 rounded ${
              routeMessage.includes('Error') || routeMessage.includes('No properties') 
                ? 'bg-destructive/10 text-destructive' 
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
