
import React, { useEffect, useRef, useState } from 'react';
import { HousePin, RouteSession } from './types';
import { supabase } from '@/integrations/supabase/client';

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
  const [showRoutes, setShowRoutes] = useState(true);
  const [employeeSessions, setEmployeeSessions] = useState<any[]>([]);
  const [routeLocations, setRouteLocations] = useState<any[]>([]);

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

  // Draw route lines
  useEffect(() => {
    if (!mapInstanceRef.current || !showRoutes) {
      // Remove all route lines if showRoutes is false
      routeLinesRef.current.forEach(line => {
        mapInstanceRef.current?.removeLayer(line);
      });
      routeLinesRef.current = [];
      return;
    }

    const L = (window as any).L;
    if (!L) return;

    // Clear existing route lines
    routeLinesRef.current.forEach(line => {
      mapInstanceRef.current?.removeLayer(line);
    });
    routeLinesRef.current = [];

    // Group locations by session
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
  }, [employeeSessions, routeLocations, showRoutes]);

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-[1000] bg-background border rounded-lg shadow-lg p-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showRoutes}
            onChange={(e) => setShowRoutes(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm font-medium">Show Routes</span>
        </label>
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
