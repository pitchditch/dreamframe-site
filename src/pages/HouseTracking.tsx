import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, useMap, useMapEvents } from 'react-leaflet';
import { v4 as uuidv4 } from 'uuid';
import { Search, Filter, MapPin, X, Plus, Route, Play, SquareStop, Clock, Download, Upload, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { HousePin, RouteSession } from '@/components/house-tracking/types';
import PinList from '@/components/house-tracking/PinList';
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider } from '@/components/ui/sidebar';
import PersonalHouseEstimatorSidebar from "@/components/house-tracking/PersonalHouseEstimatorSidebar";

// Define pin status colors
const statusColors = {
  'visited': '#3b82f6',
  'interested': '#10b981',
  'not-interested': '#ef4444',
  'completed': '#8b5cf6',
  'revisit-later': '#fbbf24',
  'needs-quote': '#f97316'
};

// Define route colors
const routeColors = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16', 
  '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', 
  '#d946ef', '#ec4899'
];

// Custom marker icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-pin',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

// Function to get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const now = new Date();
  return now.toLocaleDateString('en-CA'); // Canadian locale uses YYYY-MM-DD format
};

// Function to get current date and time in a readable format
const getCurrentDateTime = () => {
  const now = new Date();
  return now.toLocaleString();
};

// MapEvents component to handle map clicks
const MapEvents = ({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
};

// RecenterMap component to handle map centering
const RecenterMap = ({ lat, lng }: { lat: number, lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
};

// RouteTracker component to handle route tracking
const RouteTracker = ({ 
  isTracking, 
  onLocationUpdate 
}: { 
  isTracking: boolean, 
  onLocationUpdate: (lat: number, lng: number) => void 
}) => {
  const map = useMap();
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (isTracking) {
      if (navigator.geolocation) {
        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            onLocationUpdate(latitude, longitude);
            map.setView([latitude, longitude], map.getZoom());
          },
          (error) => {
            console.error('Error getting location:', error);
            toast.error('Error tracking location. Please check your GPS settings.');
          },
          { 
            enableHighAccuracy: true, 
            maximumAge: 0,
            timeout: 5000
          }
        );
      } else {
        toast.error('Geolocation is not supported by this browser.');
      }
    } else if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [isTracking, map, onLocationUpdate]);

  return null;
};

export default function HouseTracking() {
  // State for pins
  const [pins, setPins] = useLocalStorage<HousePin[]>('house-tracking-pins', []);
  const [selectedPin, setSelectedPin] = useState<HousePin | null>(null);
  const [highlightedPinId, setHighlightedPinId] = useState<string | null>(null);
  const [editingPin, setEditingPin] = useState<string | null>(null);
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [newPinPosition, setNewPinPosition] = useState<{lat: number, lng: number} | null>(null);
  const [newPinAddress, setNewPinAddress] = useState('');
  const [newPinStatus, setNewPinStatus] = useState<HousePin['status']>('visited');
  const [newPinNotes, setNewPinNotes] = useState('');
  const [newPinContactInfo, setNewPinContactInfo] = useState('');
  const [newPinCustomerName, setNewPinCustomerName] = useState('');
  const [newPinPhoneNumber, setNewPinPhoneNumber] = useState('');
  const [newPinEmail, setNewPinEmail] = useState('');
  const [newPinBeforePhoto, setNewPinBeforePhoto] = useState('');
  const [newPinAfterPhoto, setNewPinAfterPhoto] = useState('');
  const [newPinFollowUpDate, setNewPinFollowUpDate] = useState('');
  const [newPinFollowUpNote, setNewPinFollowUpNote] = useState('');
  const [newPinLeadScore, setNewPinLeadScore] = useState<'low' | 'medium' | 'high' | ''>('');
  const [newPinSquareFootage, setNewPinSquareFootage] = useState<number | undefined>(undefined);

  // State for map
  const [mapCenter, setMapCenter] = useState<[number, number]>([49.0504, -122.3045]); // Default to Langley, BC
  const [mapZoom, setMapZoom] = useState(13);
  const [searchAddress, setSearchAddress] = useState('');
  const [statusFilters, setStatusFilters] = useState<Set<string>>(new Set([
    'visited', 'interested', 'not-interested', 'completed', 'revisit-later', 'needs-quote'
  ]));

  // State for route tracking
  const [routes, setRoutes] = useLocalStorage<RouteSession[]>('house-tracking-routes', []);
  const [isTracking, setIsTracking] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<RouteSession | null>(null);
  const [showRouteDialog, setShowRouteDialog] = useState(false);
  const [newRouteName, setNewRouteName] = useState('');
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [showRoutesOnMap, setShowRoutesOnMap] = useState(true);

  // State for personal estimator
  const [personalEstimatorPin, setPersonalEstimatorPin] = useState<HousePin | null>(null);

  // Refs
  const mapRef = useRef<L.Map | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle map click
  const handleMapClick = (lat: number, lng: number) => {
    if (!isAddingPin) return;
    
    setNewPinPosition({ lat, lng });
    
    // Try to get address from coordinates using reverse geocoding
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.display_name) {
          setNewPinAddress(data.display_name);
        }
      })
      .catch(error => {
        console.error('Error fetching address:', error);
      });
  };

  // Handle search address
  const handleSearchAddress = () => {
    if (!searchAddress.trim()) return;
    
    // Use Nominatim for geocoding
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setMapCenter([parseFloat(lat), parseFloat(lon)]);
          setMapZoom(18); // Zoom in closer
          
          // Pre-fill new pin data
          setNewPinPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
          setNewPinAddress(data[0].display_name || searchAddress);
          setIsAddingPin(true);
        } else {
          toast.error('Address not found. Please try a different search term.');
        }
      })
      .catch(error => {
        console.error('Error searching address:', error);
        toast.error('Error searching for address. Please try again.');
      });
  };

  // Handle add pin
  const handleAddPin = () => {
    if (!newPinPosition || !newPinAddress.trim()) {
      toast.error('Please provide a valid location and address.');
      return;
    }

    const newPin: HousePin = {
      id: uuidv4(),
      lat: newPinPosition.lat,
      lng: newPinPosition.lng,
      address: newPinAddress,
      status: newPinStatus,
      notes: newPinNotes,
      dateAdded: getCurrentDateTime(),
      contactInfo: newPinContactInfo,
      customerName: newPinCustomerName || undefined,
      phoneNumber: newPinPhoneNumber || undefined,
      email: newPinEmail || undefined,
      beforePhoto: newPinBeforePhoto || undefined,
      afterPhoto: newPinAfterPhoto || undefined,
      followUpDate: newPinFollowUpDate || undefined,
      followUpNote: newPinFollowUpNote || undefined,
      leadScore: newPinLeadScore || undefined,
      squareFootage: newPinSquareFootage
    };

    // If we're currently tracking a route, add this pin to the route
    if (isTracking && currentRoute) {
      newPin.routeId = currentRoute.id;
      newPin.routeTimestamp = new Date().toISOString();
      newPin.routeOrder = currentRoute.homesVisited + 1;
      
      // Update the current route
      const updatedRoute = {
        ...currentRoute,
        homesVisited: currentRoute.homesVisited + 1
      };
      setCurrentRoute(updatedRoute);
      setRoutes(routes.map(route => 
        route.id === currentRoute.id ? updatedRoute : route
      ));
    }

    setPins([...pins, newPin]);
    resetNewPinForm();
    setIsAddingPin(false);
    toast.success('House pin added successfully!');
  };

  // Reset new pin form
  const resetNewPinForm = () => {
    setNewPinPosition(null);
    setNewPinAddress('');
    setNewPinStatus('visited');
    setNewPinNotes('');
    setNewPinContactInfo('');
    setNewPinCustomerName('');
    setNewPinPhoneNumber('');
    setNewPinEmail('');
    setNewPinBeforePhoto('');
    setNewPinAfterPhoto('');
    setNewPinFollowUpDate('');
    setNewPinFollowUpNote('');
    setNewPinLeadScore('');
    setNewPinSquareFootage(undefined);
  };

  // Handle cancel add pin
  const handleCancelAddPin = () => {
    resetNewPinForm();
    setIsAddingPin(false);
  };

  // Handle select pin
  const handleSelectPin = (pin: HousePin) => {
    setSelectedPin(pin);
    setMapCenter([pin.lat, pin.lng]);
    setHighlightedPinId(pin.id);
    
    // Highlight for 3 seconds then remove
    setTimeout(() => {
      setHighlightedPinId(null);
    }, 3000);
  };

  // Handle edit pin
  const handleEditPin = (pinId: string) => {
    setEditingPin(pinId);
  };

  // Handle save pin
  const handleSavePin = (pinId: string, updates: Partial<HousePin>) => {
    const updatedPins = pins.map(pin => 
      pin.id === pinId ? { ...pin, ...updates } : pin
    );
    setPins(updatedPins);
    setEditingPin(null);
    
    // If this is the selected pin, update it
    if (selectedPin && selectedPin.id === pinId) {
      setSelectedPin({ ...selectedPin, ...updates });
    }
    
    toast.success('Pin updated successfully!');
  };

  // Handle save sqft
  const handleSaveSqft = (pinId: string, newSqft: number) => {
    handleSavePin(pinId, { squareFootage: newSqft });
    if (personalEstimatorPin && personalEstimatorPin.id === pinId)
      setPersonalEstimatorPin({ ...personalEstimatorPin, squareFootage: newSqft });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingPin(null);
  };

  // Handle delete pin
  const handleDeletePin = (pinId: string) => {
    if (confirm('Are you sure you want to delete this pin?')) {
      const updatedPins = pins.filter(pin => pin.id !== pinId);
      setPins(updatedPins);
      
      if (selectedPin && selectedPin.id === pinId) {
        setSelectedPin(null);
      }
      
      toast.success('Pin deleted successfully!');
    }
  };

  // Handle open street view
  const handleOpenStreetView = (pin: HousePin) => {
    const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${pin.lat},${pin.lng}`;
    window.open(url, '_blank');
  };

  // Handle toggle status filter
  const handleToggleStatusFilter = (status: string) => {
    const newFilters = new Set(statusFilters);
    if (newFilters.has(status)) {
      newFilters.delete(status);
    } else {
      newFilters.add(status);
    }
    setStatusFilters(newFilters);
  };

  // Handle start route tracking
  const handleStartRouteTracking = () => {
    setShowRouteDialog(true);
  };

  // Handle create new route
  const handleCreateNewRoute = () => {
    if (!newRouteName.trim()) {
      toast.error('Please enter a route name.');
      return;
    }

    // Create a new route
    const newRoute: RouteSession = {
      id: uuidv4(),
      name: newRouteName,
      startTime: new Date().toISOString(),
      path: [],
      homesVisited: 0,
      color: routeColors[routes.length % routeColors.length],
      isActive: true
    };

    setRoutes([...routes, newRoute]);
    setCurrentRoute(newRoute);
    setIsTracking(true);
    setShowRouteDialog(false);
    setNewRouteName('');
    
    toast.success('Route tracking started!');
  };

  // Handle stop route tracking
  const handleStopRouteTracking = () => {
    if (!currentRoute) return;

    // Update the route with end time and other stats
    const endTime = new Date().toISOString();
    const updatedRoute = {
      ...currentRoute,
      endTime,
      isActive: false,
      duration: (new Date(endTime).getTime() - new Date(currentRoute.startTime).getTime()) / 1000 / 60, // in minutes
    };

    // Calculate distance if there are at least 2 points
    if (currentRoute.path.length >= 2) {
      let totalDistance = 0;
      for (let i = 1; i < currentRoute.path.length; i++) {
        const p1 = currentRoute.path[i-1];
        const p2 = currentRoute.path[i];
        
        // Haversine formula to calculate distance between two points
        const R = 6371; // Earth's radius in km
        const dLat = (p2.lat - p1.lat) * Math.PI / 180;
        const dLon = (p2.lng - p1.lng) * Math.PI / 180;
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;
        
        totalDistance += distance;
      }
      
      updatedRoute.distance = totalDistance;
    }

    setRoutes(routes.map(route => 
      route.id === currentRoute.id ? updatedRoute : route
    ));
    
    setCurrentRoute(null);
    setIsTracking(false);
    toast.success('Route tracking stopped!');
  };

  // Handle location update for route tracking
  const handleLocationUpdate = useCallback((lat: number, lng: number) => {
    if (!currentRoute) return;

    const timestamp = new Date().toISOString();
    const newPoint = { lat, lng, timestamp };
    
    setCurrentRoute(prev => {
      if (!prev) return null;
      
      const updatedPath = [...prev.path, newPoint];
      return {
        ...prev,
        path: updatedPath
      };
    });
    
    // Update the routes array
    setRoutes(prevRoutes => 
      prevRoutes.map(route => 
        route.id === currentRoute.id 
          ? { ...route, path: [...route.path, newPoint] } 
          : route
      )
    );
  }, [currentRoute, setRoutes]);

  // Handle select route
  const handleSelectRoute = (routeId: string) => {
    setSelectedRouteId(routeId === selectedRouteId ? null : routeId);
  };

  // Handle export data
  const handleExportData = () => {
    const data = {
      pins,
      routes
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `house-tracking-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Data exported successfully!');
  };

  // Handle import data
  const handleImportData = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        
        if (data.pins && Array.isArray(data.pins)) {
          setPins(data.pins);
        }
        
        if (data.routes && Array.isArray(data.routes)) {
          setRoutes(data.routes);
        }
        
        toast.success('Data imported successfully!');
      } catch (error) {
        console.error('Error parsing imported data:', error);
        toast.error('Error importing data. Please check the file format.');
      }
    };
    
    reader.readAsText(file);
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Edit Pin Form component
  const EditPinForm = ({ pin, onSave, onCancel }: { pin: HousePin, onSave: (updates: Partial<HousePin>) => void, onCancel: () => void }) => {
    const [address, setAddress] = useState(pin.address);
    const [status, setStatus] = useState<HousePin['status']>(pin.status);
    const [notes, setNotes] = useState(pin.notes);
    const [contactInfo, setContactInfo] = useState(pin.contactInfo || '');
    const [customerName, setCustomerName] = useState(pin.customerName || '');
    const [phoneNumber, setPhoneNumber] = useState(pin.phoneNumber || '');
    const [email, setEmail] = useState(pin.email || '');
    const [beforePhoto, setBeforePhoto] = useState(pin.beforePhoto || '');
    const [afterPhoto, setAfterPhoto] = useState(pin.afterPhoto || '');
    const [followUpDate, setFollowUpDate] = useState(pin.followUpDate || '');
    const [followUpNote, setFollowUpNote] = useState(pin.followUpNote || '');
    const [leadScore, setLeadScore] = useState<'low' | 'medium' | 'high' | ''>(pin.leadScore || '');
    const [squareFootage, setSquareFootage] = useState<number | undefined>(pin.squareFootage);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const updates: Partial<HousePin> = {
        address,
        status,
        notes,
        contactInfo: contactInfo || undefined,
        customerName: customerName || undefined,
        phoneNumber: phoneNumber || undefined,
        email: email || undefined,
        beforePhoto: beforePhoto || undefined,
        afterPhoto: afterPhoto || undefined,
        followUpDate: followUpDate || undefined,
        followUpNote: followUpNote || undefined,
        leadScore: leadScore || undefined,
        squareFootage
      };
      
      onSave(updates);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Label htmlFor="address">Address</Label>
          <Input 
            id="address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            required 
          />
        </div>
        
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={(value) => setStatus(value as HousePin['status'])}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="visited">Visited</SelectItem>
              <SelectItem value="interested">Interested</SelectItem>
              <SelectItem value="not-interested">Not Interested</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="revisit-later">Revisit Later</SelectItem>
              <SelectItem value="needs-quote">Needs Quote</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="customerName">Customer Name</Label>
          <Input 
            id="customerName" 
            value={customerName} 
            onChange={(e) => setCustomerName(e.target.value)} 
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input 
              id="phoneNumber" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea 
            id="notes" 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            rows={3}
          />
        </div>
        
        <div>
          <Label htmlFor="contactInfo">Additional Contact Info</Label>
          <Input 
            id="contactInfo" 
            value={contactInfo} 
            onChange={(e) => setContactInfo(e.target.value)} 
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="beforePhoto">Before Photo URL</Label>
            <Input 
              id="beforePhoto" 
              value={beforePhoto} 
              onChange={(e) => setBeforePhoto(e.target.value)} 
            />
          </div>
          
          <div>
            <Label htmlFor="afterPhoto">After Photo URL</Label>
            <Input 
              id="afterPhoto" 
              value={afterPhoto} 
              onChange={(e) => setAfterPhoto(e.target.value)} 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="followUpDate">Follow-up Date</Label>
            <Input 
              id="followUpDate" 
              type="date" 
              value={followUpDate} 
              onChange={(e) => setFollowUpDate(e.target.value)} 
            />
          </div>
          
          <div>
            <Label htmlFor="leadScore">Lead Score</Label>
            <Select 
              value={leadScore} 
              onValueChange={(value) => setLeadScore(value as 'low' | 'medium' | 'high' | '')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select lead score" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="followUpNote">Follow-up Note</Label>
          <Input 
            id="followUpNote" 
            value={followUpNote} 
            onChange={(e) => setFollowUpNote(e.target.value)} 
          />
        </div>
        
        <div>
          <Label htmlFor="squareFootage">Square Footage</Label>
          <Input 
            id="squareFootage" 
            type="number" 
            value={squareFootage || ''} 
            onChange={(e) => setSquareFootage(e.target.value ? Number(e.target.value) : undefined)} 
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    );
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader>
            <h2 className="text-lg font-semibold">House Tracking</h2>
            <div className="flex gap-2">
              <Input
                placeholder="Search address or notes..."
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" size="icon" onClick={() => setSearchAddress('')}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <div className="px-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Status Filters</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 px-2 text-xs"
                  onClick={() => setStatusFilters(new Set(['visited', 'interested', 'not-interested', 'completed', 'revisit-later', 'needs-quote']))}
                >
                  Reset
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(statusColors).map(([status, color]) => (
                  <div key={status} className="flex items-center gap-1.5">
                    <Checkbox 
                      id={`filter-${status}`}
                      checked={statusFilters.has(status)}
                      onCheckedChange={() => handleToggleStatusFilter(status)}
                      className="rounded-sm"
                    />
                    <Label 
                      htmlFor={`filter-${status}`}
                      className="text-xs cursor-pointer flex items-center gap-1"
                    >
                      <span 
                        className="inline-block w-3 h-3 rounded-full" 
                        style={{ backgroundColor: color }}
                      ></span>
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Tabs defaultValue="pins">
              <TabsList className="grid grid-cols-2 mx-2">
                <TabsTrigger value="pins">Houses</TabsTrigger>
                <TabsTrigger value="routes">Routes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pins" className="px-2 pt-2">
                <PinList 
                  pins={pins}
                  highlightedPinId={highlightedPinId}
                  editingPin={editingPin}
                  statusFilters={statusFilters}
                  searchAddress={searchAddress}
                  onSelectPin={handleSelectPin}
                  onEditPin={handleEditPin}
                  onDeletePin={handleDeletePin}
                  onOpenStreetView={handleOpenStreetView}
                  EditPinForm={EditPinForm}
                  onSavePin={handleSavePin}
                  onCancelEdit={handleCancelEdit}
                  onSelectPersonalCalc={(pin: HousePin) => setPersonalEstimatorPin(pin)}
                />
              </TabsContent>
              
              <TabsContent value="routes" className="px-2 pt-2">
                <div className="space-y-3">
                  {routes.length === 0 ? (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Route className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600">
                          No routes tracked yet. Start tracking a route to see it here!
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    routes.map(route => (
                      <Card 
                        key={route.id} 
                        className={`transition-all ${selectedRouteId === route.id ? 'ring-2 ring-blue-400' : ''}`}
                        onClick={() => handleSelectRoute(route.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: route.color }}
                              ></div>
                              <h3 className="font-medium">{route.name}</h3>
                              {route.isActive && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                                  Active
                                </span>
                              )}
                            </div>
                            <Checkbox 
                              checked={showRoutesOnMap}
                              onCheckedChange={(checked) => setShowRoutesOnMap(!!checked)}
                              className="rounded-sm"
                            />
                          </div>
                          
                          <div className="mt-2 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>
                                {new Date(route.startTime).toLocaleString()}
                                {route.endTime && ` - ${new Date(route.endTime).toLocaleTimeString()}`}
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                              <span>Houses: {route.homesVisited}</span>
                              {route.duration && <span>Duration: {Math.round(route.duration)} min</span>}
                              {route.distance && <span>Distance: {route.distance.toFixed(2)} km</span>}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1 flex flex-col h-full">
          <div className="p-2 flex items-center justify-between bg-gray-50 border-b">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsAddingPin(!isAddingPin)}
                className={isAddingPin ? 'bg-blue-100' : ''}
              >
                <Plus className="w-4 h-4 mr-1" />
                {isAddingPin ? 'Cancel' : 'Add House'}
              </Button>
              
              {isTracking ? (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleStopRouteTracking}
                >
                  <SquareStop className="w-4 h-4 mr-1" />
                  Stop Tracking
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleStartRouteTracking}
                >
                  <Play className="w-4 h-4 mr-1" />
                  Start Route
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExportData}
              >
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleImportData}
              >
                <Upload className="w-4 h-4 mr-1" />
                Import
              </Button>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept=".json" 
                onChange={handleFileUpload} 
              />
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        const { latitude, longitude } = position.coords;
                        setMapCenter([latitude, longitude]);
                        setMapZoom(16);
                      },
                      (error) => {
                        console.error('Error getting location:', error);
                        toast.error('Error getting your location. Please check your GPS settings.');
                      }
                    );
                  } else {
                    toast.error('Geolocation is not supported by this browser.');
                  }
                }}
              >
                <RotateCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <MapContainer 
              center={mapCenter} 
              zoom={mapZoom} 
              style={{ height: '100%', width: '100%' }}
              whenCreated={(map) => { mapRef.current = map; }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {pins.filter(pin => statusFilters.has(pin.status)).map((pin) => (
                <Marker 
                  key={pin.id} 
                  position={[pin.lat, pin.lng]} 
                  icon={createCustomIcon(statusColors[pin.status])}
                  eventHandlers={{
                    click: () => {
                      handleSelectPin(pin);
                    }
                  }}
                >
                  <Popup>
                    <div className="text-sm">
                      <div className="font-semibold mb-1">{pin.address}</div>
                      <div className="text-xs text-gray-600 mb-1">
                        Status: {pin.status.charAt(0).toUpperCase() + pin.status.slice(1).replace('-', ' ')}
                      </div>
                      {pin.notes && <div className="text-xs mb-1">{pin.notes}</div>}
                      <div className="text-xs text-gray-500">Added: {pin.dateAdded}</div>
                      <div className="mt-2 flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 text-xs"
                          onClick={() => handleEditPin(pin.id)}
                        >
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 text-xs"
                          onClick={() => handleOpenStreetView(pin)}
                        >
                          Street View
                        </Button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
              
              {/* Display route paths if enabled */}
              {showRoutesOnMap && routes.map(route => {
                if (route.path.length < 2) return null;
                
                const positions = route.path.map(point => [point.lat, point.lng] as [number, number]);
                
                return (
                  <React.Fragment key={route.id}>
                    {/* Route line */}
                    <Polyline 
                      positions={positions}
                      pathOptions={{
                        color: route.color,
                        weight: 4,
                        opacity: 0.7,
                      }}
                    />
                    
                    {/* Start marker */}
                    <CircleMarker 
                      center={positions[0]}
                      radius={5}
                      pathOptions={{
                        color: "white",
                        fillColor: "green",
                        fillOpacity: 1,
                        weight: 2,
                      }}
                    >
                      <Popup>
                        <div className="text-sm">
                          <div className="font-semibold">Route Start: {route.name}</div>
                          <div className="text-xs text-gray-600">
                            {new Date(route.startTime).toLocaleString()}
                          </div>
                        </div>
                      </Popup>
                    </CircleMarker>
                    
                    {/* End marker (if route is completed) */}
                    {route.endTime && (
                      <CircleMarker 
                        center={positions[positions.length - 1]}
                        radius={5}
                        pathOptions={{
                          color: "white",
                          fillColor: "red",
                          fillOpacity: 1,
                          weight: 2,
                        }}
                      >
                        <Popup>
                          <div className="text-sm">
                            <div className="font-semibold">Route End: {route.name}</div>
                            <div className="text-xs text-gray-600">
                              {new Date(route.endTime).toLocaleString()}
                            </div>
                            {route.duration && (
                              <div className="text-xs text-gray-600">
                                Duration: {Math.round(route.duration)} minutes
                              </div>
                            )}
                            {route.distance && (
                              <div className="text-xs text-gray-600">
                                Distance: {route.distance.toFixed(2)} km
                              </div>
                            )}
                          </div>
                        </Popup>
                      </CircleMarker>
                    )}
                  </React.Fragment>
                );
              })}
              
              {/* New pin marker */}
              {isAddingPin && newPinPosition && (
                <Marker 
                  position={[newPinPosition.lat, newPinPosition.lng]} 
                  icon={createCustomIcon('#000000')}
                >
                  <Popup>
                    <div className="text-sm">
                      <div className="font-semibold mb-1">New Pin</div>
                      <div className="text-xs text-gray-600 mb-1">
                        {newPinAddress || 'Address not found'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {newPinPosition.lat.toFixed(6)}, {newPinPosition.lng.toFixed(6)}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              )}
              
              {/* Map event handlers */}
              <MapEvents onMapClick={handleMapClick} />
              
              {/* Recenter map when center changes */}
              <RecenterMap lat={mapCenter[0]} lng={mapCenter[1]} />
              
              {/* Route tracker */}
              {isTracking && (
                <RouteTracker 
                  isTracking={isTracking} 
                  onLocationUpdate={handleLocationUpdate} 
                />
              )}
            </MapContainer>
            
            {/* Search overlay */}
            <div className="absolute top-2 left-0 right-0 mx-auto w-full max-w-md px-2 z-[1000]">
              <div className="flex gap-2">
                <Input
                  placeholder="Search for an address..."
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchAddress();
                    }
                  }}
                  className="bg-white shadow-md"
                />
                <Button onClick={handleSearchAddress} className="shadow-md">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add Pin Dialog */}
        <Dialog open={isAddingPin && !!newPinPosition} onOpenChange={(open) => {
          if (!open) handleCancelAddPin();
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New House</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-3 py-2">
              <div>
                <Label htmlFor="newAddress">Address</Label>
                <Input 
                  id="newAddress" 
                  value={newPinAddress} 
                  onChange={(e) => setNewPinAddress(e.target.value)} 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="newStatus">Status</Label>
                <Select value={newPinStatus} onValueChange={(value) => setNewPinStatus(value as HousePin['status'])}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visited">Visited</SelectItem>
                    <SelectItem value="interested">Interested</SelectItem>
                    <SelectItem value="not-interested">Not Interested</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="revisit-later">Revisit Later</SelectItem>
                    <SelectItem value="needs-quote">Needs Quote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="newCustomerName">Customer Name</Label>
                <Input 
                  id="newCustomerName" 
                  value={newPinCustomerName} 
                  onChange={(e) => setNewPinCustomerName(e.target.value)} 
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="newPhoneNumber">Phone Number</Label>
                  <Input 
                    id="newPhoneNumber" 
                    value={newPinPhoneNumber} 
                    onChange={(e) => setNewPinPhoneNumber(e.target.value)} 
                  />
                </div>
                
                <div>
                  <Label htmlFor="newEmail">Email</Label>
                  <Input 
                    id="newEmail" 
                    type="email" 
                    value={newPinEmail} 
                    onChange={(e) => setNewPinEmail(e.target.value)} 
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="newNotes">Notes</Label>
                <Textarea 
                  id="newNotes" 
                  value={newPinNotes} 
                  onChange={(e) => setNewPinNotes(e.target.value)} 
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="newContactInfo">Additional Contact Info</Label>
                <Input 
                  id="newContactInfo" 
                  value={newPinContactInfo} 
                  onChange={(e) => setNewPinContactInfo(e.target.value)} 
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="newBeforePhoto">Before Photo URL</Label>
                  <Input 
                    id="newBeforePhoto" 
                    value={newPinBeforePhoto} 
                    onChange={(e) => setNewPinBeforePhoto(e.target.value)} 
                  />
                </div>
                
                <div>
                  <Label htmlFor="newAfterPhoto">After Photo URL</Label>
                  <Input 
                    id="newAfterPhoto" 
                    value={newPinAfterPhoto} 
                    onChange={(e) => setNewPinAfterPhoto(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="newFollowUpDate">Follow-up Date</Label>
                  <Input 
                    id="newFollowUpDate" 
                    type="date" 
                    value={newPinFollowUpDate} 
                    onChange={(e) => setNewPinFollowUpDate(e.target.value)} 
                  />
                </div>
                
                <div>
                  <Label htmlFor="newLeadScore">Lead Score</Label>
                  <Select 
                    value={newPinLeadScore} 
                    onValueChange={(value) => setNewPinLeadScore(value as 'low' | 'medium' | 'high' | '')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select lead score" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="newFollowUpNote">Follow-up Note</Label>
                <Input 
                  id="newFollowUpNote" 
                  value={newPinFollowUpNote} 
                  onChange={(e) => setNewPinFollowUpNote(e.target.value)} 
                />
              </div>
              
              <div>
                <Label htmlFor="newSquareFootage">Square Footage</Label>
                <Input 
                  id="newSquareFootage" 
                  type="number" 
                  value={newPinSquareFootage || ''} 
                  onChange={(e) => setNewPinSquareFootage(e.target.value ? Number(e.target.value) : undefined)} 
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={handleCancelAddPin}>Cancel</Button>
              <Button onClick={handleAddPin}>Add House</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Route Dialog */}
        <Dialog open={showRouteDialog} onOpenChange={setShowRouteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Start New Route</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-3 py-2">
              <div>
                <Label htmlFor="routeName">Route Name</Label>
                <Input 
                  id="routeName" 
                  value={newRouteName} 
                  onChange={(e) => setNewRouteName(e.target.value)} 
                  placeholder="e.g., Morning Route - Downtown"
                  required 
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRouteDialog(false)}>Cancel</Button>
              <Button onClick={handleCreateNewRoute}>Start Tracking</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Personal Estimator Sidebar */}
        <PersonalHouseEstimatorSidebar
          pin={personalEstimatorPin!}
          isOpen={!!personalEstimatorPin}
          onSaveSqft={handleSaveSqft}
          onClose={() => setPersonalEstimatorPin(null)}
        />
      </div>
    </SidebarProvider>
  );
}
