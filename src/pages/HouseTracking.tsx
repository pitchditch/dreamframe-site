import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { MapPin, Plus, Edit, Trash2, Save, X, Map, Search, Camera, Filter, Download, Users, ChevronDown, Play, Square, History, Navigation } from 'lucide-react';
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
import { HousePin, RouteSession } from '../components/house-tracking/types';

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
  const [highlightedPinId, setHighlightedPinId] = useState<string | null>(null);
  
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

  useEffect(() => {
    setMapLoaded(true);
  }, []);

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
    setHighlightedPinId(pin.id);
    setClientSearch('');
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
              Tracked Houses ({pins.filter(pin => 
                statusFilters.has(pin.status) && (
                  pin.address.toLowerCase().includes(searchAddress.toLowerCase()) ||
                  pin.notes.toLowerCase().includes(searchAddress.toLowerCase()) ||
                  (pin.customerName && pin.customerName.toLowerCase().includes(searchAddress.toLowerCase()))
                )
              ).length})
            </h2>
            
            <PinList
              pins={pins}
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
            />
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

          {/* Street View Dialog */}
          <StreetViewDialog
            isOpen={showStreetView}
            onClose={() => {
              setShowStreetView(false);
              setHighlightedPinId(null);
            }}
            selectedPin={selectedPin}
          />

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
                <p>• <strong>Street View:</strong> Click the eye icon or click on pins to view properties in Google Street View</p>
                <p>• <strong>House Highlighting:</strong> Selected houses are highlighted with a yellow ring on the map and in the list</p>
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
