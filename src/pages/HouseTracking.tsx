import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { MapPin, Plus, Edit, Trash2, Save, X, Map } from 'lucide-react';
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
  status: 'visited' | 'interested' | 'not-interested' | 'completed';
  notes: string;
  dateAdded: string;
  contactInfo?: string;
}

const HouseTracking = () => {
  const [pins, setPins] = useState<HousePin[]>([]);
  const [editingPin, setEditingPin] = useState<string | null>(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
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

      // Handle map clicks
      map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        console.log('Map clicked at:', lat, lng);
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

  // Update markers when pins change
  useEffect(() => {
    if (!mapInstanceRef.current || !L) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = {};

    // Add markers for all pins
    pins.forEach(pin => {
      const markerColor = getStatusColor(pin.status);
      
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
          <div>
            <strong>${pin.status.replace('-', ' ')}</strong><br>
            ${pin.notes}<br>
            <small>${pin.dateAdded}</small>
          </div>
        `);

      markersRef.current[pin.id] = marker;
    });
  }, [pins, mapLoaded]);

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

  const addPin = async (status: HousePin['status'], notes: string, contactInfo: string) => {
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
        contactInfo
      };
      setPins([...pins, pin]);
      setSelectedLocation(null);
      setShowAddForm(false);
    }
  };

  const updatePin = (id: string, updates: Partial<HousePin>) => {
    setPins(pins.map(pin => pin.id === id ? { ...pin, ...updates } : pin));
    setEditingPin(null);
  };

  const deletePin = (id: string) => {
    setPins(pins.filter(pin => pin.id !== id));
  };

  const exportData = () => {
    const csvContent = [
      ['Address', 'Status', 'Notes', 'Contact Info', 'Date Added', 'Latitude', 'Longitude'],
      ...pins.map(pin => [
        pin.address,
        pin.status,
        pin.notes,
        pin.contactInfo || '',
        pin.dateAdded,
        pin.lat.toString(),
        pin.lng.toString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `house-tracking-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'visited': return '#3b82f6';
      case 'interested': return '#10b981';
      case 'not-interested': return '#ef4444';
      case 'completed': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const filteredPins = pins.filter(pin => 
    pin.address.toLowerCase().includes(searchAddress.toLowerCase()) ||
    pin.notes.toLowerCase().includes(searchAddress.toLowerCase())
  );

  return (
    <Layout 
      title="House Tracking - BC Pressure Washing"
      description="Private tracking page for canvassing progress"
    >
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">House Tracking Dashboard</h1>
            <p className="text-gray-600">Click on houses on the map to track your canvassing progress in White Rock and Surrey</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{pins.filter(p => p.status === 'visited').length}</div>
                <div className="text-sm text-gray-600">Visited</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">{pins.filter(p => p.status === 'interested').length}</div>
                <div className="text-sm text-gray-600">Interested</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">{pins.filter(p => p.status === 'not-interested').length}</div>
                <div className="text-sm text-gray-600">Not Interested</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">{pins.filter(p => p.status === 'completed').length}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Map Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5" />
                Interactive Map - White Rock & Surrey Area
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Click anywhere on the map below to add a house pin</p>
                {!mapLoaded && !mapError && <p className="text-sm text-gray-500">Loading map...</p>}
                {mapError && <p className="text-sm text-red-500">Error: {mapError}</p>}
              </div>
              
              {/* Real Leaflet Map */}
              <div 
                ref={mapRef}
                className="w-full h-96 border-2 border-gray-300 rounded-lg overflow-hidden"
                style={{ minHeight: '400px' }}
              />
            </CardContent>
          </Card>

          {/* Quick Add Form for Map Clicks */}
          {showAddForm && selectedLocation && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add House Pin</CardTitle>
              </CardHeader>
              <CardContent>
                <QuickAddForm 
                  onAdd={addPin}
                  onCancel={() => {
                    setShowAddForm(false);
                    setSelectedLocation(null);
                  }}
                />
              </CardContent>
            </Card>
          )}

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search addresses or notes..."
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="flex-1"
            />
            <Button onClick={exportData} variant="outline">
              Export CSV
            </Button>
          </div>

          {/* House Pins List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Tracked Houses ({filteredPins.length})</h2>
            {filteredPins.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No houses tracked yet. Click on the map to start tracking!</p>
                </CardContent>
              </Card>
            ) : (
              filteredPins.map((pin) => (
                <Card key={pin.id}>
                  <CardContent className="p-4">
                    {editingPin === pin.id ? (
                      <EditPinForm 
                        pin={pin} 
                        onSave={(updates) => updatePin(pin.id, updates)}
                        onCancel={() => setEditingPin(null)}
                      />
                    ) : (
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-bc-red" />
                            <h3 className="font-semibold text-gray-900">{pin.address}</h3>
                            <Badge style={{ backgroundColor: getStatusColor(pin.status), color: 'white' }}>
                              {pin.status.replace('-', ' ')}
                            </Badge>
                          </div>
                          {pin.notes && (
                            <p className="text-gray-600 mb-2">{pin.notes}</p>
                          )}
                          {pin.contactInfo && (
                            <p className="text-sm text-gray-500">Contact: {pin.contactInfo}</p>
                          )}
                          <p className="text-xs text-gray-400">Added: {pin.dateAdded}</p>
                          <p className="text-xs text-gray-400">Coordinates: {pin.lat.toFixed(6)}, {pin.lng.toFixed(6)}</p>
                        </div>
                        <div className="flex gap-2">
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
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Click anywhere on the map to add house pins</p>
                <p>• Different colored dots represent different statuses: Blue (Visited), Green (Interested), Red (Not Interested), Purple (Completed)</p>
                <p>• Add notes about customer interactions, property details, or follow-up requirements</p>
                <p>• Export your data as CSV for further analysis or backup</p>
                <p>• All data is stored locally in your browser</p>
                <p>• Addresses are automatically fetched when available</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

// Quick Add Form Component for Map Clicks
const QuickAddForm = ({ onAdd, onCancel }: {
  onAdd: (status: HousePin['status'], notes: string, contactInfo: string) => void;
  onCancel: () => void;
}) => {
  const [status, setStatus] = useState<HousePin['status']>('visited');
  const [notes, setNotes] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={status}
            onChange={(e) => setStatus(e.target.value as HousePin['status'])}
          >
            <option value="visited">Visited</option>
            <option value="interested">Interested</option>
            <option value="not-interested">Not Interested</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <Label htmlFor="contact">Contact Info</Label>
          <Input
            id="contact"
            placeholder="Phone or email"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
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
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={() => onAdd(status, notes, contactInfo)} className="bg-bc-red hover:bg-red-700">
          <Save className="w-4 h-4 mr-2" />
          Add Pin
        </Button>
        <Button onClick={onCancel} variant="outline">
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  );
};

// Edit Pin Form Component
const EditPinForm = ({ pin, onSave, onCancel }: {
  pin: HousePin;
  onSave: (updates: Partial<HousePin>) => void;
  onCancel: () => void;
}) => {
  const [updates, setUpdates] = useState<Partial<HousePin>>({
    address: pin.address,
    status: pin.status,
    notes: pin.notes,
    contactInfo: pin.contactInfo
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="edit-address">Address</Label>
          <Input
            id="edit-address"
            value={updates.address || ''}
            onChange={(e) => setUpdates({...updates, address: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="edit-status">Status</Label>
          <select
            id="edit-status"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={updates.status || pin.status}
            onChange={(e) => setUpdates({...updates, status: e.target.value as HousePin['status']})}
          >
            <option value="visited">Visited</option>
            <option value="interested">Interested</option>
            <option value="not-interested">Not Interested</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div>
        <Label htmlFor="edit-notes">Notes</Label>
        <Input
          id="edit-notes"
          value={updates.notes || ''}
          onChange={(e) => setUpdates({...updates, notes: e.target.value})}
        />
      </div>
      <div>
        <Label htmlFor="edit-contact">Contact Info</Label>
        <Input
          id="edit-contact"
          value={updates.contactInfo || ''}
          onChange={(e) => setUpdates({...updates, contactInfo: e.target.value})}
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={() => onSave(updates)} className="bg-bc-red hover:bg-red-700">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
        <Button onClick={onCancel} variant="outline">
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default HouseTracking;
