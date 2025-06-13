import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { MapPin, Plus, Edit, Trash2, Save, X, Map, Search, Camera, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
  beforePhoto?: string; // base64 encoded image
  afterPhoto?: string; // base64 encoded image
  customerName?: string;
  phoneNumber?: string;
  email?: string;
}

const statusConfig = {
  'visited': { color: '#3b82f6', label: 'Visited' },
  'interested': { color: '#10b981', label: 'Interested' },
  'not-interested': { color: '#ef4444', label: 'Not Interested' },
  'completed': { color: '#8b5cf6', label: 'Completed' },
  'revisit-later': { color: '#fbbf24', label: 'Revisit Later' },
  'needs-quote': { color: '#f97316', label: 'Needs Quote' }
};

const HouseTracking = () => {
  const [pins, setPins] = useState<HousePin[]>([]);
  const [editingPin, setEditingPin] = useState<string | null>(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [addressSearchQuery, setAddressSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [statusFilters, setStatusFilters] = useState<Set<string>>(new Set(Object.keys(statusConfig)));
  const [showFilters, setShowFilters] = useState(false);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{[key: string]: any}>({});

  // Load pins from localStorage on component mount
  useEffect(() => {
    const savedPins = localStorage.getItem('houseTrackingPins');
    if (savedPins) {
      setPins(JSON.parse(savedPins));
    }
  }, []);

  // Save pins to localStorage whenever pins change
  useEffect(() => {
    localStorage.setItem('houseTrackingPins', JSON.stringify(pins));
  }, [pins]);

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
          
          // Wait for CSS to load
          await new Promise((resolve) => {
            link.onload = resolve;
            setTimeout(resolve, 1000); // fallback timeout
          });
        }

        // Import Leaflet
        const leafletModule = await import('leaflet');
        L = leafletModule.default || leafletModule;
        
        console.log('Leaflet loaded:', L);
        
        // Fix for default markers in Leaflet
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
      console.log('Map init conditions not met:', { 
        hasMapRef: !!mapRef.current, 
        hasMapInstance: !!mapInstanceRef.current, 
        mapLoaded, 
        hasL: !!L 
      });
      return;
    }

    try {
      console.log('Initializing map...');
      
      // Create map centered on White Rock/Surrey area
      const map = L.map(mapRef.current).setView([49.0504, -122.8048], 13);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Handle map clicks with reverse geocoding
      map.on('click', async (e: any) => {
        const { lat, lng } = e.latlng;
        console.log('Map clicked at:', lat, lng);
        
        // Reverse geocoding to get address
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
          );
          const data = await response.json();
          const address = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
          console.log('Found address:', address);
        } catch (error) {
          console.log('Could not fetch address, using coordinates');
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

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = {};

    // Filter pins based on status filters
    const filteredPins = pins.filter(pin => statusFilters.has(pin.status));

    // Add markers for filtered pins
    filteredPins.forEach(pin => {
      const markerColor = statusConfig[pin.status].color;
      
      // Create custom icon based on status
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

      markersRef.current[pin.id] = marker;
    });
  }, [pins, mapLoaded, statusFilters]);

  // Add selected location marker
  useEffect(() => {
    if (!mapInstanceRef.current || !L) return;

    // Remove previous selection marker
    const existingMarker = mapInstanceRef.current.getPane('markerPane')?.querySelector('.selected-location');
    if (existingMarker) {
      existingMarker.remove();
    }

    if (selectedLocation) {
      const tempIcon = L.divIcon({
        html: `<div style="background-color: #fbbf24; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); animation: pulse 1s infinite;" class="selected-location"></div>`,
        iconSize: [25, 25],
        iconAnchor: [12.5, 12.5],
        className: 'selected-location-marker'
      });

      L.marker([selectedLocation.lat, selectedLocation.lng], { icon: tempIcon })
        .addTo(mapInstanceRef.current!);
    }
  }, [selectedLocation, mapLoaded]);

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
        
        // Center map on found location
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([lat, lng], 16);
        }
        
        // Set as selected location
        setSelectedLocation({ lat, lng });
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

  const addPin = async (status: HousePin['status'], notes: string, contactInfo: string, customerName: string, phoneNumber: string, email: string) => {
    if (selectedLocation) {
      // Try to get address from coordinates (reverse geocoding)
      let address = `${selectedLocation.lat.toFixed(6)}, ${selectedLocation.lng.toFixed(6)}`;
      
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedLocation.lat}&lon=${selectedLocation.lng}&addressdetails=1`
        );
        const data = await response.json();
        if (data.display_name) {
          address = data.display_name;
        }
      } catch (error) {
        console.log('Could not fetch address, using coordinates');
      }

      const pin: HousePin = {
        id: Date.now().toString(),
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        address,
        status,
        notes,
        dateAdded: new Date().toLocaleDateString(),
        contactInfo,
        customerName,
        phoneNumber,
        email
      };
      setPins([...pins, pin]);
      setSelectedLocation(null);
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
      ['ID', 'Address', 'Status', 'Customer Name', 'Phone', 'Email', 'Notes', 'Contact Info', 'Date Added', 'Latitude', 'Longitude'],
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
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-xs sm:text-sm text-gray-600 mb-2">Click anywhere on the map to add a house pin, or search for an address above</p>
                {!mapLoaded && !mapError && <p className="text-sm text-gray-500">Loading map...</p>}
                {mapError && <p className="text-sm text-red-500">Error: {mapError}</p>}
              </div>
              
              {/* Real Leaflet Map */}
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
              </CardHeader>
              <CardContent>
                <QuickAddForm 
                  onAdd={addPin}
                  onCancel={() => {
                    setShowAddForm(false);
                    setSelectedLocation(null);
                    setAddressSearchQuery('');
                  }}
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
                          <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                            <span>Added: {pin.dateAdded}</span>
                            <span>•</span>
                            <span>Coordinates: {pin.lat.toFixed(6)}, {pin.lng.toFixed(6)}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
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

          {/* Instructions */}
          <Card className="mt-6 sm:mt-8">
            <CardHeader>
              <CardTitle className="text-lg">How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <p>• Search for specific addresses using the search bar above the map</p>
                <p>• Click anywhere on the map to add house pins with automatic address lookup</p>
                <p>• Use status filters to show/hide different types of pins on the map</p>
                <p>• Different colored dots represent different statuses - see the legend above</p>
                <p>• Add customer details, notes, and contact information for follow-ups</p>
                <p>• Export your data as CSV for further analysis or backup</p>
                <p>• All data is stored locally in your browser</p>
                <p>• The interface is optimized for mobile use while canvassing</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

// Enhanced Quick Add Form Component
const QuickAddForm = ({ onAdd, onCancel }: {
  onAdd: (status: HousePin['status'], notes: string, contactInfo: string, customerName: string, phoneNumber: string, email: string) => void;
  onCancel: () => void;
}) => {
  const [status, setStatus] = useState<HousePin['status']>('visited');
  const [notes, setNotes] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="space-y-4">
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
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          onClick={() => onAdd(status, notes, contactInfo, customerName, phoneNumber, email)} 
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

// Enhanced Edit Pin Form Component
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
    email: pin.email
  });

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
