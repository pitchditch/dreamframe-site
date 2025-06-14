import React, { useEffect, useRef } from 'react';
import { HousePin } from './types';

interface MapComponentProps {
  pins: HousePin[];
  statusFilters: Set<string>;
  highlightedPinId: string | null;
  userPosition: {lat: number, lng: number} | null;
  currentRoute: any;
  routes: any[];
  selectedLocation: {lat: number, lng: number} | null;
  onPinClick: (pin: HousePin) => void;
  onMapClick: (lat: number, lng: number, address: string) => void;
  mapLoaded: boolean;
  mapError: string | null;
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
  statusFilters,
  highlightedPinId,
  userPosition,
  currentRoute,
  routes,
  selectedLocation,
  onPinClick,
  onMapClick,
  mapLoaded,
  mapError
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{[key: string]: any}>({});
  const routeLayersRef = useRef<{[key: string]: any}>({});
  const currentRouteLayerRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const selectedLocationMarkerRef = useRef<any>(null);

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
            onMapClick(lat, lng, address);
          } catch (error) {
            console.log('Could not fetch address, using coordinates');
            onMapClick(lat, lng, `${lat.toFixed(6)}, ${lng.toFixed(6)}`);
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
  }, [onMapClick]);

  // Update selected location marker
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    // Remove existing selected location marker
    if (selectedLocationMarkerRef.current) {
      mapInstanceRef.current.removeLayer(selectedLocationMarkerRef.current);
      selectedLocationMarkerRef.current = null;
    }

    // Add new selected location marker if there's a selected location
    if (selectedLocation) {
      const selectedIcon = L.divIcon({
        html: `<div style="background: linear-gradient(45deg, #ff6b6b, #ff8e8e); width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 20px rgba(255, 107, 107, 0.8); position: relative; animation: pulse 2s infinite;">
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
        </div>
        <style>
          @keyframes pulse {
            0% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.8); }
            50% { box-shadow: 0 0 30px rgba(255, 107, 107, 1); }
            100% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.8); }
          }
        </style>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        className: 'selected-location-marker'
      });
      
      selectedLocationMarkerRef.current = L.marker([selectedLocation.lat, selectedLocation.lng], { icon: selectedIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup(`
          <div class="p-2 text-center">
            <div class="text-sm font-medium text-red-600">📍 Selected Location</div>
            <div class="text-xs text-gray-500 mt-1">Adding new house pin...</div>
          </div>
        `);
    }
  }, [selectedLocation]);

  // Update markers when pins or filters change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    Object.values(markersRef.current).forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = {};

    const filteredPins = pins.filter(pin => statusFilters.has(pin.status));

    filteredPins.forEach(pin => {
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
        onPinClick(pin);
      });

      markersRef.current[pin.id] = marker;
    });
  }, [pins, statusFilters, highlightedPinId, onPinClick]);

  // Update user position marker
  useEffect(() => {
    if (!mapInstanceRef.current || !userPosition) return;

    const L = (window as any).L;
    if (!L) return;

    if (userMarkerRef.current) {
      mapInstanceRef.current.removeLayer(userMarkerRef.current);
    }
    
    const userIcon = L.divIcon({
      html: `<div style="background: linear-gradient(45deg, #3b82f6, #1d4ed8); width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px rgba(59, 130, 246, 0.6); position: relative;">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 6px; height: 6px; background: white; border-radius: 50%;"></div>
      </div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
      className: 'user-location-marker'
    });
    
    userMarkerRef.current = L.marker([userPosition.lat, userPosition.lng], { icon: userIcon })
      .addTo(mapInstanceRef.current)
      .bindPopup(`
        <div class="p-2 text-center">
          <div class="text-sm font-medium text-blue-600">📍 Your Location</div>
          <div class="text-xs text-gray-500 mt-1">Live GPS Tracking</div>
          <div class="text-xs text-gray-400">${userPosition.lat.toFixed(6)}, ${userPosition.lng.toFixed(6)}</div>
        </div>
      `);
  }, [userPosition]);

  if (mapError) {
    return <div className="text-sm text-red-500">Error: {mapError}</div>;
  }

  if (!mapLoaded) {
    return <div className="text-sm text-gray-500">Loading map...</div>;
  }

  return (
    <div 
      ref={mapRef}
      className="w-full h-64 sm:h-96 border-2 border-gray-300 rounded-lg overflow-hidden"
      style={{ minHeight: '300px' }}
    />
  );
};

export default MapComponent;
