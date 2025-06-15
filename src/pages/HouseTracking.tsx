import React, { useState, useEffect, useRef, useMemo } from 'react';
import Layout from '../components/Layout';
import { MapPin, Plus, Edit, Trash2, Save, X, Map, Search, Camera, Filter, Download, Users, ChevronDown, Play, Square, History, Navigation, Calendar, Star } from 'lucide-react';
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
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import MapComponent from '../components/house-tracking/MapComponent';
import PinList from '../components/house-tracking/PinList';
import StreetViewDialog from '../components/house-tracking/StreetViewDialog';
import type { HousePin as _HousePin, RouteSession } from '../components/house-tracking/types';
import { useFetchSquareFootage } from "../hooks/useFetchSquareFootage";

type HousePin = _HousePin & { squareFootage?: number }; // patch in squareFootage

const statusConfig = {
  'visited': { color: '#3b82f6', label: 'Visited' },
  'interested': { color: '#10b981', label: 'Interested' },
  'not-interested': { color: '#ef4444', label: 'Not Interested' },
  'completed': { color: '#8b5cf6', label: 'Completed' },
  'revisit-later': { color: '#fbbf24', label: 'Revisit Later' },
  'needs-quote': { color: '#f97316', label: 'Needs Quote' }
};

const routeColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#fd79a8'];

const noteTemplates = [
  "No answer",
  "Requested quote", 
  "Asked to call back next week",
  "Wants roof + window quote",
  "Not interested at this time",
  "Already has service provider",
  "Wants spring cleaning quote"
];

const getLatLngFromAddress = async (address: string) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
  const resp = await fetch(url);
  const data = await resp.json();
  if (data && data.length) {
    return { lat: +data[0].lat, lng: +data[0].lon };
  }
  throw new Error('Address not found');
};

const haversine = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const toRad = (v: number) => v * Math.PI / 180;
  const R = 6371; // earth radius km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat/2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng/2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

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
  const [highlightedPinId, setHighlightedPinId] = useState<string | null>(null);
  const [showRouteNameDialog, setShowRouteNameDialog] = useState(false);
  const [pendingRouteName, setPendingRouteName] = useState('');
  const [filterByRoute, setFilterByRoute] = useState<string>('');
  const [filterByDate, setFilterByDate] = useState<string>('');
  
  const watchIdRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const routeStartPositionRef = useRef<{lat: number, lng: number} | null>(null);
  
  const { toast } = useToast();

  // --- Personal Price Calculator State ---
  const [personalSqftRate, setPersonalSqftRate] = useState(0.18); // $/sqft
  const [personalStart, setPersonalStart] = useState('White Rock, BC');
  const [personalKmRate, setPersonalKmRate] = useState(0.7); // $/km
  const [personalTravelKms, setPersonalTravelKms] = useState<number|null>(null);
  const [personalTravelErr, setPersonalTravelErr] = useState<string>('');
  const [showPersonalCalculator, setShowPersonalCalculator] = useState(false);

  // Add the fetch square footage hook
  const { getSquareFootage, loading: fetchingSqft, error: sqftError } = useFetchSquareFootage();

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

  useEffect(() => {
    localStorage.setItem('houseTrackingPins', JSON.stringify(pins));
  }, [pins]);

  useEffect(() => {
    localStorage.setItem('houseTrackingRoutes', JSON.stringify(routes));
  }, [routes]);

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

  useEffect(() => {
    setMapLoaded(true);
  }, []);

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

  const calculateRouteDistance = (path: Array<{lat: number, lng: number}>) => {
    if (path.length < 2) return 0;
    
    let totalDistance = 0;
    for (let i = 1; i < path.length; i++) {
      totalDistance += calculateDistance(
        path[i-1].lat, path[i-1].lng,
        path[i].lat, path[i].lng
      );
    }
    
    return totalDistance / 1000; // Convert to kilometers
  };

  const handlePinClick = (pin: HousePin) => {
    console.log('Pin clicked:', pin.address);
    setHighlightedPinId(pin.id);
    setSelectedPin(pin);
    setShowStreetView(true);
  };

  const handleMapClick = (lat: number, lng: number, address: string) => {
    setSelectedLocation({ lat, lng });
    setSelectedLocationAddress(address);
    setShowAddForm(true);
  };

  const selectPinFromList = (pin: HousePin) => {
    setHighlightedPinId(pin.id);
  };

  const openStreetView = (pin: HousePin) => {
    console.log('Opening Street View for:', pin.address);
    setSelectedPin(pin);
    setHighlightedPinId(pin.id);
    setShowStreetView(true);
  };

  const startRouteTracking = () => {
    if (!navigator.geolocation) {
      toast({
        title: "GPS Not Available",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive"
      });
      return;
    }

    // Show route naming dialog
    setShowRouteNameDialog(true);
  };

  const confirmStartRoute = () => {
    const routeId = Date.now().toString();
    const now = new Date();
    const colorIndex = routes.length % routeColors.length;
    
    const routeName = pendingRouteName.trim() || `Route ${new Date().toLocaleDateString()}`;
    
    const newRoute: RouteSession = {
      id: routeId,
      name: routeName,
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
    setShowRouteNameDialog(false);
    setPendingRouteName('');

    // Start GPS tracking
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPosition = { lat: latitude, lng: longitude };
        
        // Store initial position for distance calculation
        if (!routeStartPositionRef.current) {
          routeStartPositionRef.current = newPosition;
        }
        
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
      description: `GPS tracking is now active for "${routeName}". Walk your route!`,
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
      const distance = calculateRouteDistance(currentRoute.path);
      
      const completedRoute: RouteSession = {
        ...currentRoute,
        endTime: endTime.toISOString(),
        duration,
        distance,
        isActive: false
      };

      setRoutes(prev => [...prev, completedRoute]);
      setCurrentRoute(null);
    }

    setIsTracking(false);
    setTrackingStartTime(null);
    setTrackingDuration(0);
    setUserPosition(null);
    routeStartPositionRef.current = null;

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

  const addPin = async (
    status: HousePin['status'], 
    notes: string, 
    contactInfo: string, 
    customerName: string, 
    phoneNumber: string, 
    email: string, 
    beforePhoto?: string, 
    afterPhoto?: string, 
    followUpDate?: string, 
    followUpNote?: string, 
    leadScore?: 'low' | 'medium' | 'high',
    squareFootage?: number
  ) => {
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
        followUpDate,
        followUpNote,
        leadScore,
        squareFootage,
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
      ['ID', 'Address', 'Status', 'Customer Name', 'Phone', 'Email', 'Notes', 'Contact Info', 'Date Added', 'Follow Up Date', 'Follow Up Note', 'Lead Score', 'Square Footage', 'Route ID', 'Route Order', 'Route Timestamp', 'Latitude', 'Longitude'],
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
        pin.followUpDate || '',
        pin.followUpNote || '',
        pin.leadScore || '',
        pin.squareFootage !== undefined ? pin.squareFootage.toString() : '',
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

  const getStatusCounts = () => {
    const counts: {[key: string]: number} = {};
    Object.keys(statusConfig).forEach(status => {
      counts[status] = pins.filter(p => p.status === status).length;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  const getFilteredPins = () => {
    let filtered = pins.filter(pin => 
      statusFilters.has(pin.status) && (
        pin.address.toLowerCase().includes(searchAddress.toLowerCase()) ||
        pin.notes.toLowerCase().includes(searchAddress.toLowerCase()) ||
        (pin.customerName && pin.customerName.toLowerCase().includes(searchAddress.toLowerCase()))
      )
    );

    if (filterByRoute) {
      filtered = filtered.filter(pin => pin.routeId === filterByRoute);
    }

    if (filterByDate) {
      const filterDate = new Date(filterByDate).toLocaleDateString();
      filtered = filtered.filter(pin => pin.dateAdded === filterDate);
    }

    return filtered;
  };

  const clients = pins
    .filter(pin => pin.customerName)
    .sort((a, b) => (a.customerName || '').localeCompare(b.customerName || ''))
    .filter(pin => 
      !clientSearch || 
      (pin.customerName && pin.customerName.toLowerCase().includes(clientSearch.toLowerCase())) ||
      pin.address.toLowerCase().includes(clientSearch.toLowerCase())
    );

  const selectClient = (pin: HousePin) => {
    setHighlightedPinId(pin.id);
    setClientSearch('');
  };

  const filteredPins = getFilteredPins();

  // Helper: Auto-fetch & update pin when selectedPin changes and squareFootage is missing
  useEffect(() => {
    const fetchSqftIfNeeded = async () => {
      // Only fetch if we have a selectedPin and sqft missing or 0
      if (
        selectedPin &&
        (!selectedPin.squareFootage || selectedPin.squareFootage <= 0) &&
        selectedPin.address
      ) {
        const sqft = await getSquareFootage(selectedPin.address);
        if (sqft && sqft > 0) {
          updatePin(selectedPin.id, { squareFootage: sqft });
        }
      }
    };
    fetchSqftIfNeeded();
    // Only when pin id/address changes!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPin?.id, selectedPin?.address]);

  // Personal Calculator handlers
  const handleSelectPinPersonalCalc = (pin: HousePin) => {
    setSelectedPin(pin);
    setShowPersonalCalculator(true);
    setPersonalTravelKms(null);
    setPersonalTravelErr('');
  };

  // --- Personal Calculator Sidebar Component ---
  const CalcSidebar = () => {
    const pin = selectedPin as HousePin | null;
    const [editSqft, setEditSqft] = useState(pin?.squareFootage ?? 0);

    // Update editSqft if pin changes
    useEffect(() => {
      setEditSqft(pin?.squareFootage ?? 0);
    }, [pin]);

    const estimate = Math.round((editSqft || 0) * personalSqftRate * 100) / 100;
    const travelCost = personalTravelKms !== null ? Math.round(personalTravelKms * personalKmRate * 100) / 100 : 0;

    const handleSaveSqft = () => {
      if (pin && editSqft !== pin.squareFootage) {
        updatePin(pin.id, { squareFootage: +editSqft });
      }
    };

    const handleCalcTravel = async () => {
      setPersonalTravelErr('');
      setPersonalTravelKms(null);
      if (!personalStart.trim() || !pin) return;
      try {
        const from = await getLatLngFromAddress(personalStart.trim());
        // Use haversine() to calculate distance in km
        const dist = haversine(from.lat, from.lng, pin.lat, pin.lng);
        setPersonalTravelKms(dist);
      } catch (e) {
        setPersonalTravelErr('Could not geocode start address');
      }
    };

    if (!showPersonalCalculator || !pin) return null;
    return (
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-40 px-8 py-6 border-l-2 overflow-y-auto">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-800" onClick={()=>setShowPersonalCalculator(false)}>×</button>
        <h3 className="text-2xl font-bold mb-4">Personal Estimate Calculator</h3>
        <div className="mb-2">
          <div className="font-semibold text-lg">{pin.address}</div>
          <div className="text-xs text-gray-500">({pin.lat.toFixed(5)}, {pin.lng.toFixed(5)})</div>
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Square Footage</label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={editSqft}
              min={0}
              className="border rounded px-2 py-1 w-32"
              onChange={e => setEditSqft(+e.target.value)}
              disabled={fetchingSqft}
            />
            <button
              onClick={handleSaveSqft}
              className="bg-blue-600 text-white px-3 py-1 rounded font-bold hover:bg-blue-700"
              disabled={editSqft === (pin.squareFootage ?? 0) || fetchingSqft}
              title="Save sqft to this pin"
            >Save</button>
            {fetchingSqft &&
              <span className="ml-2 animate-pulse text-blue-500 text-xs">Getting sqft…</span>
            }
            {sqftError && (
              <span className="ml-2 text-red-500 text-xs">{sqftError}</span>
            )}
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Your Per Sqft Rate ($)</label>
          <input
            type="number"
            value={personalSqftRate}
            min={0}
            step="0.01"
            className="border rounded px-2 py-1 w-32"
            onChange={e => setPersonalSqftRate(+e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-lg">Estimate</label>
          <div className="text-2xl font-mono font-bold">${estimate?.toLocaleString()}</div>
        </div>
        <hr className="mb-6"/>
        <h4 className="font-semibold mb-2">Travel Cost Calculator</h4>
        <label className="block mb-1">From (start address or postal code)</label>
        <input
          type="text"
          value={personalStart}
          className="border rounded px-2 py-1 w-full mb-2"
          onChange={e => setPersonalStart(e.target.value)}
        />
        <label className="block mb-1">Travel Rate ($/km)</label>
        <input
          type="number"
          value={personalKmRate}
          step="0.01"
          min={0}
          className="border rounded px-2 py-1 w-32 mb-2"
          onChange={e => setPersonalKmRate(+e.target.value)}
        />
        <button 
          onClick={handleCalcTravel} 
          className="bg-green-600 text-white px-3 py-1 rounded font-semibold hover:bg-green-700 mb-2"
        >Calculate Distance</button>
        {personalTravelKms!==null && (
          <div className="mb-2">
            <div className="text-xs text-gray-500">Distance: <span className="font-bold">{personalTravelKms.toFixed(2)} km</span></div>
            <div className="text-xl font-bold">${travelCost.toLocaleString()} <span className="text-xs text-gray-500 font-normal">(travel)</span></div>
          </div>
        )}
        {personalTravelErr && <div className="text-red-600 text-xs">{personalTravelErr}</div>}
        <hr className="my-4"/>
        <div className="flex gap-2">
          <button className="bg-gray-100 px-4 py-2 rounded" onClick={()=>setShowPersonalCalculator(false)}>Close</button>
        </div>
      </div>
    );
  };

  // QuickAddForm component with squareFootage fetching for prefilled addresses
  const QuickAddForm = ({ onAdd, onCancel, prefilledAddress }: {
    onAdd: (status: HousePin['status'], notes: string, contactInfo: string, customerName: string, phoneNumber: string, email: string, beforePhoto?: string, afterPhoto?: string, followUpDate?: string, followUpNote?: string, leadScore?: 'low' | 'medium' | 'high', squareFootage?: number) => void;
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
    const [followUpDate, setFollowUpDate] = useState('');
    const [followUpNote, setFollowUpNote] = useState('');
    const [leadScore, setLeadScore] = useState<'low' | 'medium' | 'high'>('medium');
    const [squareFootage, setSquareFootage] = useState<number>(0);

    // Fetch square footage for prefilled address
    const { getSquareFootage, loading: fetchingSqft, error: sqftError } = useFetchSquareFootage();

    useEffect(() => {
      // When the form opens, if we have a prefilledAddress, fetch sqft
      if (prefilledAddress) {
        setSquareFootage(0); // reset before fetching
        (async () => {
          const sqft = await getSquareFootage(prefilledAddress);
          if (sqft && sqft > 0) setSquareFootage(sqft);
        })();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prefilledAddress]);

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

    const handleQuickNote = (template: string) => {
      setNotes(template);
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
            <Label htmlFor="leadScore" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Lead Score
            </Label>
            <select
              id="leadScore"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              value={leadScore}
              onChange={(e) => setLeadScore(e.target.value as 'low' | 'medium' | 'high')}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="squareFootage">Square Footage</Label>
          <div className="flex items-center gap-2">
            <Input
              id="squareFootage"
              type="number"
              min={0}
              placeholder="e.g. 2200"
              value={squareFootage}
              onChange={(e) => setSquareFootage(Number(e.target.value))}
              className="text-sm"
              disabled={fetchingSqft}
            />
            {fetchingSqft && <span className="text-xs text-blue-600 ml-1 animate-pulse">Fetching...</span>}
            {(!fetchingSqft && prefilledAddress && squareFootage > 0) && (
              <span className="text-xs text-green-600 ml-1">Auto-filled</span>
            )}
            {!fetchingSqft && sqftError && (
              <span className="text-xs text-red-600 ml-1">{sqftError}</span>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Input
            id="notes"
            placeholder="Customer feedback, follow-up needed, etc."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="text-sm"
          />
          <div className="mt-2 flex flex-wrap gap-1">
            {noteTemplates.map((template) => (
              <Button
                key={template}
                size="sm"
                variant="outline"
                onClick={() => handleQuickNote(template)}
                className="text-xs"
              >
                {template}
              </Button>
            ))}
          </div>
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
            <Label htmlFor="followUpDate" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Follow-up Date
            </Label>
            <Input
              id="followUpDate"
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className="text-sm"
            />
          </div>
          <div>
            <Label htmlFor="followUpNote">Follow-up Note</Label>
            <Input
              id="followUpNote"
              placeholder="Reason for follow-up"
              value={followUpNote}
              onChange={(e) => setFollowUpNote(e.target.value)}
              className="text-sm"
            />
          </div>
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
            onClick={() => onAdd(status, notes, contactInfo, customerName, phoneNumber, email, beforePhoto, afterPhoto, followUpDate, followUpNote, leadScore, squareFootage)} 
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

  // EditPinForm component with squareFootage added
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
      afterPhoto: pin.afterPhoto,
      followUpDate: pin.followUpDate,
      followUpNote: pin.followUpNote,
      leadScore: pin.leadScore || 'medium',
      squareFootage: pin.squareFootage
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

    const handleQuickNote = (template: string) => {
      setUpdates({...updates, notes: template});
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

        <div>
          <Label htmlFor="edit-squareFootage">Square Footage</Label>
          <Input
            id="edit-squareFootage"
            type="number"
            min={0}
            value={updates.squareFootage ?? ''}
            onChange={e => setUpdates({...updates, squareFootage: Number(e.target.value)})}
            className="text-sm"
          />
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
            <Label htmlFor="edit-leadScore" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Lead Score
            </Label>
            <select
              id="edit-leadScore"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              value={updates.leadScore || 'medium'}
              onChange={(e) => setUpdates({...updates, leadScore: e.target.value as 'low' | 'medium' | 'high'})}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="edit-phone">Phone Number</Label>
            <Input
              id="edit-phone"
              value={updates.phoneNumber || ''}
              onChange={(e) => setUpdates({...updates, phoneNumber: e.target.value})}
              className="text-sm"
            />
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
        </div>
        
        <div>
          <Label htmlFor="edit-notes">Notes</Label>
          <Input
            id="edit-notes"
            value={updates.notes || ''}
            onChange={(e) => setUpdates({...updates, notes: e.target.value})}
            className="text-sm"
          />
          <div className="mt-2 flex flex-wrap gap-1">
            {noteTemplates.map((template) => (
              <Button
                key={template}
                size="sm"
                variant="outline"
                onClick={() => handleQuickNote(template)}
                className="text-xs"
              >
                {template}
              </Button>
            ))}
          </div>
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
            <Label htmlFor="edit-followUpDate" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Follow-up Date
            </Label>
            <Input
              id="edit-followUpDate"
              type="date"
              value={updates.followUpDate || ''}
              onChange={(e) => setUpdates({...updates, followUpDate: e.target.value})}
              className="text-sm"
            />
          </div>
          <div>
            <Label htmlFor="edit-followUpNote">Follow-up Note</Label>
            <Input
              id="edit-followUpNote"
              value={updates.followUpNote || ''}
              onChange={(e) => setUpdates({...updates, followUpNote: e.target.value})}
              className="text-sm"
            />
          </div>
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
                
                {isTracking && currentRoute && (
                  <div className="flex flex-col sm:flex-row gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span>"{currentRoute.name}" - {formatDuration(trackingDuration)}</span>
                    </div>
                    <div>
                      <span>Homes Visited: {currentRoute.homesVisited || 0}</span>
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

          {/* Enhanced Filters */}
          <Card className="mb-4 sm:mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters & Search
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
            <CardContent className={`${showFilters ? 'block' : 'hidden'} md:block space-y-4`}>
              {/* Status Filters */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Filter by Status:</Label>
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
              </div>

              {/* Route and Date Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Filter by Route:</Label>
                  <select
                    value={filterByRoute}
                    onChange={(e) => setFilterByRoute(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="">All Routes</option>
                    {routes.map(route => (
                      <option key={route.id} value={route.id}>{route.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">Filter by Date:</Label>
                  <Input
                    type="date"
                    value={filterByDate}
                    onChange={(e) => setFilterByDate(e.target.value)}
                    className="text-sm"
                  />
                </div>
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
                    : "Click anywhere on the map to add a house pin, or search for an address above. Click on pins to view Street View."
                  }
                </p>
              </div>
              
              <MapComponent
                pins={pins}
                statusFilters={statusFilters}
                highlightedPinId={highlightedPinId}
                userPosition={userPosition}
                currentRoute={currentRoute}
                routes={routes}
                selectedLocation={selectedLocation}
                onPinClick={handlePinClick}
                onMapClick={handleMapClick}
                mapLoaded={mapLoaded}
                mapError={mapError}
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
            
            <PinList
              pins={filteredPins}
              highlightedPinId={highlightedPinId}
              editingPin={editingPin}
              statusFilters={statusFilters}
              searchAddress={searchAddress}
              onSelectPin={selectPinFromList}
              onEditPin={setEditingPin}
              onDeletePin={deletePin}
              onOpenStreetView={openStreetView}
              EditPinForm={EditPinForm}
              onSavePin={updatePin}
              onCancelEdit={() => setEditingPin(null)}
              onSelectPersonalCalc={handleSelectPinPersonalCalc}
            />
          </div>

          {/* Route Name Dialog */}
          <Dialog open={showRouteNameDialog} onOpenChange={setShowRouteNameDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Name Your Route</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="routeName">Route Name</Label>
                  <Input
                    id="routeName"
                    placeholder="e.g. White Rock - Marine Dr, June 13"
                    value={pendingRouteName}
                    onChange={(e) => setPendingRouteName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && confirmStartRoute()}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={confirmStartRoute} className="bg-green-600 hover:bg-green-700">
                    Start Tracking
                  </Button>
                  <Button variant="outline" onClick={() => setShowRouteNameDialog(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Route History Dialog */}
          <Dialog open={showRouteHistory} onOpenChange={setShowRouteHistory}>
            <DialogContent className="max-w-4xl">
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
                                <p className="font-medium text-base">{route.name}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(route.startTime).toLocaleDateString()} • {new Date(route.startTime).toLocaleTimeString()}
                                  {route.endTime && ` - ${new Date(route.endTime).toLocaleTimeString()}`}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">
                                <strong>{route.homesVisited}</strong> homes visited
                              </p>
                              <p className="text-sm text-gray-500">
                                {route.duration ? formatDuration(route.duration) : 'In Progress'}
                              </p>
                              {route.distance && (
                                <p className="text-sm text-gray-500">
                                  {route.distance.toFixed(2)} km walked
                                </p>
                              )}
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

          {/* Street View Dialog */}
          <StreetViewDialog
            isOpen={showStreetView}
            onClose={() => {
              setShowStreetView(false);
              setHighlightedPinId(null);
            }}
            selectedPin={selectedPin}
          />

          {/* Personal Estimate Calculator Sidebar */}
          <CalcSidebar />

          {/* Instructions */}
          <Card className="mt-6 sm:mt-8">
            <CardHeader>
              <CardTitle className="text-lg">How to Use - Enhanced Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <p>• <strong>Named Routes:</strong> Give each route a custom name like "White Rock - Marine Dr" for easy identification</p>
                <p>• <strong>Route Duration & Distance:</strong> Automatically tracks how long routes take and distance walked</p>
                <p>• <strong>Follow-up Reminders:</strong> Set follow-up dates to revisit interested customers</p>
                <p>• <strong>Lead Scoring:</strong> Rate prospects as Low/Medium/High priority for better follow-up planning</p>
                <p>• <strong>One-Click Contact:</strong> Tap phone numbers to call or email addresses to send emails directly</p>
                <p>• <strong>Enhanced Photos:</strong> Click photos to view full-size, attach before/after shots for each property</p>
                <p>• <strong>Advanced Filtering:</strong> Filter houses by route, date, status, or search terms</p>
                <p>• <strong>Quick Note Templates:</strong> Use pre-filled common responses when editing pins</p>
                <p>• <strong>Client Directory:</strong> Quickly find and navigate to specific customers</p>
                <p>• <strong>Personal Price Calculator:</strong> Select a house to estimate price by square footage and calculate travel costs</p>
                <p>• All data is stored locally in your browser and can be exported to CSV</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default HouseTracking;
