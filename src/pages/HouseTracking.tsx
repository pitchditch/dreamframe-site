import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { MapPin, Plus, Edit, Trash2, Save, X, Map, Search, Camera, Filter, Download, Users, ChevronDown, Eye, Play, Square, History, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

// Dynamically import Leaflet to avoid SSR issues
let L: any = null;

interface HousePin {
  id: string;
  lat: number;
  lng: number;
  address: string;
  status: 'visited' | 'interested' | 'not-interested' | 'completed' | 'revisit-later' | 'needs-quote';
  notes: string;
  dateAdded: string;
  contactInfo?: string;
  beforePhoto?: string;
  afterPhoto?: string;
  customerName?: string;
  phoneNumber?: string;
  email?: string;
  routeId?: string;
  routeTimestamp?: string;
  routeOrder?: number;
}

interface RouteSession {
  id: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  path: Array<{lat: number, lng: number, timestamp: string}>;
  homesVisited: number;
  color: string;
  isActive: boolean;
}

const statusConfig = {
  'visited': { color: '#3b82f6', label: 'Visited' },
  'interested': { color: '#10b981', label: 'Interested' },
  'not-interested': { color: '#ef4444', label: 'Not Interested' },
  'completed': { color: '#8b5cf6', label: 'Completed' },
  'revisit-later': { color: '#fbbf24', label: 'Revisit Later' },
  'needs-quote': { color: '#f97316', label: 'Needs Quote' }
};

const routeColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#fd79a8'];

const HouseTracking = () => {
  const [pins, setPins] = useState<HousePin[]>([]);
  const [routes, setRoutes] = useState<RouteSession[]>([]);
  const [currentRoute, setCurrentRoute] = useState<RouteSession | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingStartTime, setTrackingStartTime] = useState<Date | null>(null);
  const [trackingDuration, setTrackingDuration] = useState(0);
  const [editingPin, setEditingPin] = useState<string | null>(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [addressSearchQuery, setAddressSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [selectedLocationAddress, setSelectedLocationAddress] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [statusFilters, setStatusFilters] = useState<Set<string>>(new Set(Object.keys(statusConfig)));
  const [showFilters, setShowFilters] = useState(false);
  const [clientSearch, setClientSearch] = useState('');
  const [selectedPin, setSelectedPin] = useState<HousePin | null>(null);
  const [showStreetView, setShowStreetView] = useState(false);
  const [showRouteHistory, setShowRouteHistory] = useState(false);
  const [userPosition, setUserPosition] = useState<{lat: number, lng: number} | null>(null);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{[key: string]: any}>({});
  const routeLayersRef = useRef<{[key: string]: any}>({});
  const currentRouteLayerRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const watchIdRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedPins = localStorage.getItem('houseTrackingPins');
    if (savedPins) {
      setPins(JSON.parse(savedPins));
    }
    
    const savedRoutes = localStorage.getItem('houseTrackingRoutes');
    if (savedRoutes) {
      setRoutes(JSON.parse(savedRoutes));
    }
  }, []);

  // Save data to localStorage whenever pins or routes change
  useEffect(() => {
    localStorage.setItem('houseTrackingPins', JSON.stringify(pins));
  }, [pins]);

  useEffect(() => {
    localStorage.setItem('houseTrackingRoutes', JSON.stringify(routes));
  }, [routes]);

  // Timer effect for tracking duration
  useEffect(() => {
    if (isTracking && trackingStartTime) {
      timerRef.current = setInterval(() => {
        const now = new Date();
        const duration = Math.floor((now.getTime() - trackingStartTime.getTime()) / 1000);
        setTrackingDuration(duration);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTracking, trackingStartTime]);

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
        L = leafletModule.default || leafletModule;
        
        console.log('Leaflet loaded:', L);
        
        if (L.Icon && L.Icon.Default) {
          delete (L.Icon.Default.prototype as any)._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          });
        }

        setMapLoaded(true);
        console.log('Map ready to initialize');
      } catch (error) {
        console.error('Failed to load Leaflet:', error);
        setMapError(`Failed to load map: ${error}`);
      }
    };

    loadLeaflet();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current || !mapLoaded || !L) {
      return;
    }

    try {
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
          setSelectedLocationAddress(address);
        } catch (error) {
          console.log('Could not fetch address, using coordinates');
          setSelectedLocationAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        }
        
        setSelectedLocation({ lat, lng });
        setShowAddForm(true);
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
      console.error('Error initializing map:', error);
      setMapError(`Error initializing map: ${error}`);
    }
  }, [mapLoaded]);

  // Update markers when pins or filters change
  useEffect(() => {
    if (!mapInstanceRef.current || !L) return;

    Object.values(markersRef.current).forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = {};

    const filteredPins = pins.filter(pin => statusFilters.has(pin.status));

    filteredPins.forEach(pin => {
      const markerColor = statusConfig[pin.status].color;
      
      const customIcon = L.divIcon({
        html: `<div style="background-color: ${markerColor}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
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
        setSelectedLocation({ lat: pin.lat, lng: pin.lng });
        setSelectedLocationAddress(pin.address);
        setShowAddForm(true);
      });

      markersRef.current[pin.id] = marker;
    });
  }, [pins, mapLoaded, statusFilters]);

  // Update route layers
  useEffect(() => {
    if (!mapInstanceRef.current || !L) return;

    // Clear existing route layers
    Object.values(routeLayersRef.current).forEach(layer => {
      mapInstanceRef.current?.removeLayer(layer);
    });
    routeLayersRef.current = {};

    // Add route layers for completed routes
    routes.filter(route => !route.isActive && route.path.length > 1).forEach(route => {
      const latLngs = route.path.map(point => [point.lat, point.lng]);
      const polyline = L.polyline(latLngs, { 
        color: route.color, 
        weight: 4, 
        opacity: 0.7 
      }).addTo(mapInstanceRef.current!);
      
      routeLayersRef.current[route.id] = polyline;
    });

    // Add current route layer if tracking
    if (currentRoute && currentRoute.path.length > 1) {
      const latLngs = currentRoute.path.map(point => [point.lat, point.lng]);
      if (currentRouteLayerRef.current) {
        mapInstanceRef.current?.removeLayer(currentRouteLayerRef.current);
      }
      currentRouteLayerRef.current = L.polyline(latLngs, { 
        color: currentRoute.color, 
        weight: 5, 
        opacity: 0.9,
        dashArray: '10, 5'
      }).addTo(mapInstanceRef.current!);
    }
  }, [routes, currentRoute, mapLoaded]);

  const startRouteTracking = () => {
    if (!navigator.geolocation) {
      toast({
        title: "GPS Not Available",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive"
      });
      return;
    }

    const routeId = Date.now().toString();
    const now = new Date();
    const colorIndex = routes.length % routeColors.length;
    
    const newRoute: RouteSession = {
      id: routeId,
      startTime: now.toISOString(),
      path: [],
      homesVisited: 0,
      color: routeColors[colorIndex],
      isActive: true
    };

    setCurrentRoute(newRoute);
    setIsTracking(true);
    setTrackingStartTime(now);
    setTrackingDuration(0);

    // Start GPS tracking
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPosition = { lat: latitude, lng: longitude };
        
        setUserPosition(newPosition);
        
        // Update current route path
        setCurrentRoute(prev => {
          if (!prev) return prev;
          const updatedRoute = {
            ...prev,
            path: [...prev.path, { 
              lat: latitude, 
              lng: longitude, 
              timestamp: new Date().toISOString() 
            }]
          };
          return updatedRoute;
        });

        // Update user marker on map
        if (mapInstanceRef.current && L) {
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
          
          userMarkerRef.current = L.marker([latitude, longitude], { icon: userIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(`
              <div class="p-2 text-center">
                <div class="text-sm font-medium text-blue-600">📍 Your Location</div>
                <div class="text-xs text-gray-500 mt-1">Live GPS Tracking</div>
                <div class="text-xs text-gray-400">${latitude.toFixed(6)}, ${longitude.toFixed(6)}</div>
              </div>
            `);

          // Center map on user location on first position update
          if (currentRoute && currentRoute.path.length === 1) {
            mapInstanceRef.current.setView([latitude, longitude], 16);
          }
        }

        // Check for nearby houses
        checkNearbyHouses(latitude, longitude);
      },
      (error) => {
        console.error('GPS tracking error:', error);
        toast({
          title: "GPS Error",
          description: "Failed to track your location. Please check GPS permissions.",
          variant: "destructive"
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );

    toast({
      title: "Route Tracking Started",
      description: "GPS tracking is now active. Walk your route!",
    });
  };

  const stopRouteTracking = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    if (currentRoute) {
      const endTime = new Date();
      const duration = trackingStartTime ? Math.floor((endTime.getTime() - trackingStartTime.getTime()) / 1000) : 0;
      
      const completedRoute: RouteSession = {
        ...currentRoute,
        endTime: endTime.toISOString(),
        duration,
        isActive: false
      };

      setRoutes(prev => [...prev, completedRoute]);
      setCurrentRoute(null);
    }

    setIsTracking(false);
    setTrackingStartTime(null);
    setTrackingDuration(0);
    setUserPosition(null);

    // Remove user marker
    if (userMarkerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }

    // Remove current route layer
    if (currentRouteLayerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(currentRouteLayerRef.current);
      currentRouteLayerRef.current = null;
    }

    toast({
      title: "Route Tracking Stopped",
      description: `Route saved with ${currentRoute?.homesVisited || 0} homes visited.`,
    });
  };

  const checkNearbyHouses = (userLat: number, userLng: number) => {
    pins.forEach(pin => {
      const distance = calculateDistance(userLat, userLng, pin.lat, pin.lng);
      
      // If within 10 meters and not already visited in this route
      if (distance <= 10 && (!pin.routeId || pin.routeId !== currentRoute?.id)) {
        if (pin.status === 'visited' && pin.routeId) {
          toast({
            title: "Already Visited",
            description: `You've already visited ${pin.address}`,
            variant: "default"
          });
        } else {
          // Auto-mark as visited
          const updatedPin = {
            ...pin,
            status: 'visited' as const,
            routeId: currentRoute?.id,
            routeTimestamp: new Date().toISOString(),
            routeOrder: (currentRoute?.homesVisited || 0) + 1
          };

          setPins(prev => prev.map(p => p.id === pin.id ? updatedPin : p));
          
          // Update current route homes visited count
          setCurrentRoute(prev => {
            if (!prev) return prev;
            return { ...prev, homesVisited: prev.homesVisited + 1 };
          });

          toast({
            title: "House Auto-Marked",
            description: `${pin.address} marked as visited`,
          });
        }
      }
    });
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const searchForAddress = async () => {
    if (!addressSearchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      console.log('Searching for address:', addressSearchQuery);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressSearchQuery)}&addressdetails=1&limit=1`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        
        console.log('Found location:', { lat, lng, address: result.display_name });
        
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([lat, lng], 16);
        }
        
        setSelectedLocation({ lat, lng });
        setSelectedLocationAddress(result.display_name);
        setShowAddForm(true);
      } else {
        alert('Address not found. Please try a different search.');
      }
    } catch (error) {
      console.error('Error searching for address:', error);
      alert('Error searching for address. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const addPin = async (status: HousePin['status'], notes: string, contactInfo: string, customerName: string, phoneNumber: string, email: string, beforePhoto?: string, afterPhoto?: string) => {
    if (selectedLocation) {
      const pin: HousePin = {
        id: Date.now().toString(),
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        address: selectedLocationAddress,
        status,
        notes,
        dateAdded: new Date().toLocaleDateString(),
        contactInfo,
        customerName,
        phoneNumber,
        email,
        beforePhoto,
        afterPhoto,
        routeId: currentRoute?.id,
        routeTimestamp: currentRoute ? new Date().toISOString() : undefined,
        routeOrder: currentRoute ? currentRoute.homesVisited + 1 : undefined
      };
      
      setPins([...pins, pin]);
      
      // Update current route if tracking
      if (currentRoute) {
        setCurrentRoute(prev => prev ? { ...prev, homesVisited: prev.homesVisited + 1 } : prev);
      }
      
      setSelectedLocation(null);
      setSelectedLocationAddress('');
      setShowAddForm(false);
      setAddressSearchQuery('');
    }
  };

  const updatePin = (id: string, updates: Partial<HousePin>) => {
    setPins(pins.map(pin => pin.id === id ? { ...pin, ...updates } : pin));
    setEditingPin(null);
  };

  const deletePin = (id: string) => {
    setPins(pins.filter(pin => pin.id !== id));
  };

  const toggleStatusFilter = (status: string) => {
    const newFilters = new Set(statusFilters);
    if (newFilters.has(status)) {
      newFilters.delete(status);
    } else {
      newFilters.add(status);
    }
    setStatusFilters(newFilters);
  };

  const exportData = () => {
    const csvContent = [
      ['ID', 'Address', 'Status', 'Customer Name', 'Phone', 'Email', 'Notes', 'Contact Info', 'Date Added', 'Route ID', 'Route Order', 'Route Timestamp', 'Latitude', 'Longitude'],
      ...pins.map(pin => [
        pin.id,
        pin.address,
        pin.status,
        pin.customerName || '',
        pin.phoneNumber || '',
        pin.email || '',
        pin.notes,
        pin.contactInfo || '',
        pin.dateAdded,
        pin.routeId || '',
        pin.routeOrder?.toString() || '',
        pin.routeTimestamp || '',
        pin.lat.toString(),
        pin.lng.toString()
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `house-tracking-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredPins = pins.filter(pin => 
    statusFilters.has(pin.status) && (
      pin.address.toLowerCase().includes(searchAddress.toLowerCase()) ||
      pin.notes.toLowerCase().includes(searchAddress.toLowerCase()) ||
      (pin.customerName && pin.customerName.toLowerCase().includes(searchAddress.toLowerCase()))
    )
  );

  const getStatusCounts = () => {
    const counts: {[key: string]: number} = {};
    Object.keys(statusConfig).forEach(status => {
      counts[status] = pins.filter(p => p.status === status).length;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  const clients = pins
    .filter(pin => pin.customerName)
    .sort((a, b) => (a.customerName || '').localeCompare(b.customerName || ''))
    .filter(pin => 
      !clientSearch || 
      (pin.customerName && pin.customerName.toLowerCase().includes(clientSearch.toLowerCase())) ||
      pin.address.toLowerCase().includes(clientSearch.toLowerCase())
    );

  const selectClient = (pin: HousePin) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([pin.lat, pin.lng], 16);
    }
    setClientSearch('');
  };

  const openStreetView = (pin: HousePin) => {
    setSelectedPin(pin);
    setShowStreetView(true);
  };

  return (
    <Layout 
      title="House Tracking - BC Pressure Washing"
      description="Private tracking page for canvassing progress"
    >
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">House Tracking Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600">Click on houses on the map to track your canvassing progress in White Rock and Surrey</p>
          </div>

          {/* Route Tracking Controls */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                Live Route Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex gap-2">
                  {!isTracking ? (
                    <Button onClick={startRouteTracking} className="bg-green-600 hover:bg-green-700">
                      <Play className="w-4 h-4 mr-2" />
                      Start Route
                    </Button>
                  ) : (
                    <Button onClick={stopRouteTracking} className="bg-red-600 hover:bg-red-700">
                      <Square className="w-4 h-4 mr-2" />
                      Stop Route
                    </Button>
                  )}
                  
                  <Button variant="outline" onClick={() => setShowRouteHistory(true)}>
                    <History className="w-4 h-4 mr-2" />
                    Route History
                  </Button>
                </div>
                
                {isTracking && (
                  <div className="flex flex-col sm:flex-row gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Duration: {formatDuration(trackingDuration)}</span>
                    </div>
                    <div>
                      <span>Homes Visited: {currentRoute?.homesVisited || 0}</span>
                    </div>
                    {userPosition && (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>GPS Active</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 mb-6">
            {Object.entries(statusConfig).map(([status, config]) => (
              <Card key={status} className="cursor-pointer transition-all hover:shadow-md">
                <CardContent className="p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold" style={{ color: config.color }}>
                    {statusCounts[status] || 0}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">{config.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Status Filter Bar */}
          <Card className="mb-4 sm:mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter by Status
                </CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden"
                >
                  {showFilters ? 'Hide' : 'Show'} Filters
                </Button>
              </div>
            </CardHeader>
            <CardContent className={`${showFilters ? 'block' : 'hidden'} md:block`}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {Object.entries(statusConfig).map(([status, config]) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={statusFilters.has(status) ? "default" : "outline"}
                    onClick={() => toggleStatusFilter(status)}
                    className="text-xs sm:text-sm justify-start"
                    style={statusFilters.has(status) ? { 
                      backgroundColor: config.color, 
                      borderColor: config.color 
                    } : {}}
                  >
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: config.color }}
                    />
                    {config.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Address Search Section */}
          <Card className="mb-4 sm:mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Enter address to search and add pin..."
                  value={addressSearchQuery}
                  onChange={(e) => setAddressSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchForAddress()}
                  className="flex-1 text-sm sm:text-base"
                />
                <Button 
                  onClick={searchForAddress} 
                  disabled={isSearching || !addressSearchQuery.trim()}
                  className="bg-bc-red hover:bg-red-700 w-full sm:w-auto"
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Map Section */}
          <Card className="mb-4 sm:mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Map className="w-4 h-4" />
                Interactive Map - White Rock & Surrey Area
                {isTracking && (
                  <Badge className="bg-green-500 text-white ml-2">
                    Live Tracking
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  {isTracking 
                    ? "Your live route is being tracked. Walk past houses to auto-mark them as visited!"
                    : "Click anywhere on the map to add a house pin, or search for an address above"
                  }
                </p>
                {!mapLoaded && !mapError && <p className="text-sm text-gray-500">Loading map...</p>}
                {mapError && <p className="text-sm text-red-500">Error: {mapError}</p>}
              </div>
              
              <div 
                ref={mapRef}
                className="w-full h-64 sm:h-96 border-2 border-gray-300 rounded-lg overflow-hidden"
                style={{ minHeight: '300px' }}
              />
            </CardContent>
          </Card>

          {/* Quick Add Form for Map Clicks */}
          {showAddForm && selectedLocation && (
            <Card className="mb-4 sm:mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Add House Pin</CardTitle>
                <p className="text-sm text-gray-600">Address: {selectedLocationAddress}</p>
              </CardHeader>
              <CardContent>
                <QuickAddForm 
                  onAdd={addPin}
                  onCancel={() => {
                    setShowAddForm(false);
                    setSelectedLocation(null);
                    setSelectedLocationAddress('');
                    setAddressSearchQuery('');
                  }}
                  prefilledAddress={selectedLocationAddress}
                />
              </CardContent>
            </Card>
          )}

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Input
              placeholder="Search addresses, notes, or customer names..."
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="flex-1 text-sm sm:text-base"
            />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Users className="w-4 h-4 mr-2" />
                  Client Directory
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto bg-white border shadow-lg">
                <div className="p-2 border-b">
                  <Input
                    placeholder="Search clients..."
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    className="text-sm"
                  />
                </div>
                {clients.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    {clientSearch ? 'No clients found' : 'No clients added yet'}
                  </div>
                ) : (
                  clients.map((pin) => (
                    <DropdownMenuItem
                      key={pin.id}
                      onClick={() => selectClient(pin)}
                      className="flex flex-col items-start p-3 cursor-pointer hover:bg-gray-50"
                    >
                      <div className="font-medium text-sm">{pin.customerName}</div>
                      <div className="text-xs text-gray-500 truncate w-full">{pin.address}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          style={{ 
                            backgroundColor: statusConfig[pin.status].color, 
                            color: 'white' 
                          }}
                          className="text-xs"
                        >
                          {statusConfig[pin.status].label}
                        </Badge>
                        {pin.phoneNumber && (
                          <span className="text-xs text-gray-400">{pin.phoneNumber}</span>
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={exportData} variant="outline" className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>

          {/* House Pins List */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Tracked Houses ({filteredPins.length})
            </h2>
            {filteredPins.length === 0 ? (
              <Card>
                <CardContent className="p-6 sm:p-8 text-center">
                  <MapPin className="w-8 sm:w-12 h-8 sm:h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm sm:text-base text-gray-600">
                    No houses tracked yet. Click on the map or search for an address to start tracking!
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredPins.map((pin) => (
                <Card key={pin.id}>
                  <CardContent className="p-3 sm:p-4">
                    {editingPin === pin.id ? (
                      <EditPinForm 
                        pin={pin} 
                        onSave={(updates) => updatePin(pin.id, updates)}
                        onCancel={() => setEditingPin(null)}
                      />
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-bc-red flex-shrink-0" />
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                              {pin.address}
                            </h3>
                            <Badge 
                              style={{ 
                                backgroundColor: statusConfig[pin.status].color, 
                                color: 'white' 
                              }}
                              className="text-xs"
                            >
                              {statusConfig[pin.status].label}
                            </Badge>
                            {pin.routeId && (
                              <Badge variant="outline" className="text-xs">
                                Route #{pin.routeOrder}
                              </Badge>
                            )}
                          </div>
                          {pin.customerName && (
                            <p className="text-sm text-gray-700 mb-1">
                              <strong>Customer:</strong> {pin.customerName}
                            </p>
                          )}
                          {pin.phoneNumber && (
                            <p className="text-sm text-gray-700 mb-1">
                              <strong>Phone:</strong> {pin.phoneNumber}
                            </p>
                          )}
                          {pin.email && (
                            <p className="text-sm text-gray-700 mb-1">
                              <strong>Email:</strong> {pin.email}
                            </p>
                          )}
                          {pin.notes && (
                            <p className="text-sm text-gray-600 mb-2">{pin.notes}</p>
                          )}
                          {pin.contactInfo && (
                            <p className="text-sm text-gray-500 mb-1">Contact: {pin.contactInfo}</p>
                          )}
                          
                          {(pin.beforePhoto || pin.afterPhoto) && (
                            <div className="flex gap-2 mb-2">
                              {pin.beforePhoto && (
                                <div className="flex flex-col">
                                  <span className="text-xs text-gray-500 mb-1">Before</span>
                                  <img 
                                    src={pin.beforePhoto} 
                                    alt="Before" 
                                    className="w-16 h-16 object-cover rounded border"
                                  />
                                </div>
                              )}
                              {pin.afterPhoto && (
                                <div className="flex flex-col">
                                  <span className="text-xs text-gray-500 mb-1">After</span>
                                  <img 
                                    src={pin.afterPhoto} 
                                    alt="After" 
                                    className="w-16 h-16 object-cover rounded border"
                                  />
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                            <span>Added: {pin.dateAdded}</span>
                            <span>•</span>
                            <span>Coordinates: {pin.lat.toFixed(6)}, {pin.lng.toFixed(6)}</span>
                            {pin.routeTimestamp && (
                              <>
                                <span>•</span>
                                <span>Route: {new Date(pin.routeTimestamp).toLocaleString()}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button size="sm" variant="outline" onClick={() => openStreetView(pin)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingPin(pin.id)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deletePin(pin.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Route History Dialog */}
          <Dialog open={showRouteHistory} onOpenChange={setShowRouteHistory}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Route History
                </DialogTitle>
              </DialogHeader>
              <div className="max-h-96 overflow-y-auto">
                {routes.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No routes completed yet</p>
                ) : (
                  <div className="space-y-4">
                    {routes.map((route) => (
                      <Card key={route.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-4 h-4 rounded"
                                style={{ backgroundColor: route.color }}
                              />
                              <div>
                                <p className="font-medium">
                                  Route {new Date(route.startTime).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {new Date(route.startTime).toLocaleTimeString()}
                                  {route.endTime && ` - ${new Date(route.endTime).toLocaleTimeString()}`}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">
                                <strong>{route.homesVisited}</strong> homes
                              </p>
                              <p className="text-sm text-gray-500">
                                {route.duration ? formatDuration(route.duration) : 'In Progress'}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Google Street View Dialog */}
          <Dialog open={showStreetView} onOpenChange={setShowStreetView}>
            <DialogContent className="max-w-4xl w-full h-[80vh]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Street View: {selectedPin?.address}
                </DialogTitle>
              </DialogHeader>
              <div className="flex-1 w-full h-full">
                {selectedPin && (
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/streetview?key=YOUR_API_KEY&location=${selectedPin.lat},${selectedPin.lng}&heading=0&pitch=0&fov=90`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Street View: ${selectedPin.address}`}
                  />
                )}
                {!selectedPin && (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <p>No location selected</p>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center pt-4">
                <div className="text-sm text-gray-600">
                  {selectedPin && (
                    <>
                      Coordinates: {selectedPin.lat.toFixed(6)}, {selectedPin.lng.toFixed(6)}
                      {selectedPin.customerName && (
                        <span className="ml-4">Customer: {selectedPin.customerName}</span>
                      )}
                    </>
                  )}
                </div>
                <Button onClick={() => setShowStreetView(false)}>Close</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Instructions */}
          <Card className="mt-6 sm:mt-8">
            <CardHeader>
              <CardTitle className="text-lg">How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <p>• <strong>Live Route Tracking:</strong> Start route tracking to automatically mark homes you pass within 10 meters</p>
                <p>• <strong>Manual Add:</strong> Click on the map or search addresses to manually add house pins</p>
                <p>• <strong>Auto-Detection:</strong> When route tracking is active, houses are auto-marked as "Visited" when you walk past them</p>
                <p>• <strong>Route History:</strong> View all your past routes with different colors, durations, and home counts</p>
                <p>• <strong>Status Tracking:</strong> Use filters to show/hide different pin types on the map</p>
                <p>• <strong>Customer Management:</strong> Add contact details, notes, and before/after photos</p>
                <p>• <strong>Client Directory:</strong> Quickly find and navigate to specific customers</p>
                <p>• <strong>Data Export:</strong> Export all data including route information to CSV</p>
                <p>• <strong>Street View:</strong> Click the eye icon to view properties in Google Street View</p>
                <p>• All data is stored locally in your browser</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

// Enhanced Quick Add Form Component with Photo Upload
const QuickAddForm = ({ onAdd, onCancel, prefilledAddress }: {
  onAdd: (status: HousePin['status'], notes: string, contactInfo: string, customerName: string, phoneNumber: string, email: string, beforePhoto?: string, afterPhoto?: string) => void;
  onCancel: () => void;
  prefilledAddress?: string;
}) => {
  const [status, setStatus] = useState<HousePin['status']>('visited');
  const [notes, setNotes] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [beforePhoto, setBeforePhoto] = useState<string>('');
  const [afterPhoto, setAfterPhoto] = useState<string>('');

  const handlePhotoUpload = (file: File, type: 'before' | 'after') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (type === 'before') {
        setBeforePhoto(result);
      } else {
        setAfterPhoto(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {prefilledAddress && (
        <div className="p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Address:</strong> {prefilledAddress}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value as HousePin['status'])}
          >
            {Object.entries(statusConfig).map(([value, config]) => (
              <option key={value} value={value}>{config.label}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            id="customerName"
            placeholder="John Smith"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="text-sm"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="(604) 555-0123"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="text-sm"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="customer@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-sm"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Input
          id="notes"
          placeholder="Customer feedback, follow-up needed, etc."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="text-sm"
        />
      </div>
      
      <div>
        <Label htmlFor="contact">Additional Contact Info</Label>
        <Input
          id="contact"
          placeholder="Best time to call, special instructions"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          className="text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="beforePhoto" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Before Photo
          </Label>
          <Input
            id="beforePhoto"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handlePhotoUpload(file, 'before');
            }}
            className="text-sm"
          />
          {beforePhoto && (
            <img src={beforePhoto} alt="Before preview" className="mt-2 w-16 h-16 object-cover rounded border" />
          )}
        </div>
        <div>
          <Label htmlFor="afterPhoto" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            After Photo
          </Label>
          <Input
            id="afterPhoto"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handlePhotoUpload(file, 'after');
            }}
            className="text-sm"
          />
          {afterPhoto && (
            <img src={afterPhoto} alt="After preview" className="mt-2 w-16 h-16 object-cover rounded border" />
          )}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          onClick={() => onAdd(status, notes, contactInfo, customerName, phoneNumber, email, beforePhoto, afterPhoto)} 
          className="bg-bc-red hover:bg-red-700 w-full sm:w-auto"
        >
          <Save className="w-4 h-4 mr-2" />
          Add Pin
        </Button>
        <Button onClick={onCancel} variant="outline" className="w-full sm:w-auto">
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  );
};

// Enhanced Edit Pin Form Component with Photo Upload
const EditPinForm = ({ pin, onSave, onCancel }: {
  pin: HousePin;
  onSave: (updates: Partial<HousePin>) => void;
  onCancel: () => void;
}) => {
  const [updates, setUpdates] = useState<Partial<HousePin>>({
    address: pin.address,
    status: pin.status,
    notes: pin.notes,
    contactInfo: pin.contactInfo,
    customerName: pin.customerName,
    phoneNumber: pin.phoneNumber,
    email: pin.email,
    beforePhoto: pin.beforePhoto,
    afterPhoto: pin.afterPhoto
  });

  const handlePhotoUpload = (file: File, type: 'before' | 'after') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (type === 'before') {
        setUpdates({...updates, beforePhoto: result});
      } else {
        setUpdates({...updates, afterPhoto: result});
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="edit-address">Address</Label>
          <Input
            id="edit-address"
            value={updates.address || ''}
            onChange={(e) => setUpdates({...updates, address: e.target.value})}
            className="text-sm"
          />
        </div>
        <div>
          <Label htmlFor="edit-status">Status</Label>
          <select
            id="edit-status"
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            value={updates.status || pin.status}
            onChange={(e) => setUpdates({...updates, status: e.target.value as HousePin['status']})}
          >
            {Object.entries(statusConfig).map(([value, config]) => (
              <option key={value} value={value}>{config.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="edit-customerName">Customer Name</Label>
          <Input
            id="edit-customerName"
            value={updates.customerName || ''}
            onChange={(e) => setUpdates({...updates, customerName: e.target.value})}
            className="text-sm"
          />
        </div>
        <div>
          <Label htmlFor="edit-phone">Phone Number</Label>
          <Input
            id="edit-phone"
            value={updates.phoneNumber || ''}
            onChange={(e) => setUpdates({...updates, phoneNumber: e.target.value})}
            className="text-sm"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="edit-email">Email</Label>
        <Input
          id="edit-email"
          value={updates.email || ''}
          onChange={(e) => setUpdates({...updates, email: e.target.value})}
          className="text-sm"
        />
      </div>
      
      <div>
        <Label htmlFor="edit-notes">Notes</Label>
        <Input
          id="edit-notes"
          value={updates.notes || ''}
          onChange={(e) => setUpdates({...updates, notes: e.target.value})}
          className="text-sm"
        />
      </div>
      
      <div>
        <Label htmlFor="edit-contact">Additional Contact Info</Label>
        <Input
          id="edit-contact"
          value={updates.contactInfo || ''}
          onChange={(e) => setUpdates({...updates, contactInfo: e.target.value})}
          className="text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="edit-beforePhoto" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Before Photo
          </Label>
          <Input
            id="edit-beforePhoto"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handlePhotoUpload(file, 'before');
            }}
            className="text-sm"
          />
          {updates.beforePhoto && (
            <img src={updates.beforePhoto} alt="Before preview" className="mt-2 w-16 h-16 object-cover rounded border" />
          )}
        </div>
        <div>
          <Label htmlFor="edit-afterPhoto" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            After Photo
          </Label>
          <Input
            id="edit-afterPhoto"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handlePhotoUpload(file, 'after');
            }}
            className="text-sm"
          />
          {updates.afterPhoto && (
            <img src={updates.afterPhoto} alt="After preview" className="mt-2 w-16 h-16 object-cover rounded border" />
          )}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          onClick={() => onSave(updates)} 
          className="bg-bc-red hover:bg-red-700 w-full sm:w-auto"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
        <Button onClick={onCancel} variant="outline" className="w-full sm:w-auto">
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default HouseTracking;
