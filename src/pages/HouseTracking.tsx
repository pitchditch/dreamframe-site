
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { MapPin, Plus, Edit, Trash2, Save, X, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
  const [mapMode, setMapMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

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

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!mapMode) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert click position to approximate coordinates (simplified for demo)
    // In a real implementation, you'd use proper map libraries like Leaflet or Mapbox
    const lat = 49.0504 - (y / rect.height) * 0.1; // White Rock area
    const lng = -122.8048 + (x / rect.width) * 0.1;
    
    setSelectedLocation({ lat, lng });
    setShowAddForm(true);
  };

  const addPin = (status: HousePin['status'], notes: string, contactInfo: string) => {
    if (selectedLocation) {
      const pin: HousePin = {
        id: Date.now().toString(),
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        address: `${selectedLocation.lat.toFixed(6)}, ${selectedLocation.lng.toFixed(6)}`, // Temporary address
        status,
        notes,
        dateAdded: new Date().toLocaleDateString(),
        contactInfo
      };
      setPins([...pins, pin]);
      setSelectedLocation(null);
      setShowAddForm(false);
      setMapMode(false);
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
      case 'visited': return 'bg-blue-500';
      case 'interested': return 'bg-green-500';
      case 'not-interested': return 'bg-red-500';
      case 'completed': return 'bg-purple-500';
      default: return 'bg-gray-500';
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
                <Button 
                  onClick={() => setMapMode(!mapMode)}
                  className={`${mapMode ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {mapMode ? 'Exit Map Mode' : 'Enable Map Mode - Click to Add Houses'}
                </Button>
                {mapMode && (
                  <p className="text-sm text-gray-600 mt-2">Click anywhere on the map below to add a house pin</p>
                )}
              </div>
              
              {/* Simplified Map Area */}
              <div 
                className={`relative w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 border-2 border-gray-300 rounded-lg overflow-hidden ${mapMode ? 'cursor-crosshair' : 'cursor-default'}`}
                onClick={handleMapClick}
              >
                {/* Map background with area labels */}
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded shadow text-sm font-semibold">
                  White Rock
                </div>
                <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded shadow text-sm font-semibold">
                  Surrey
                </div>
                
                {/* Show existing pins on the map */}
                {pins.map((pin) => {
                  const x = ((pin.lng + 122.8048) / 0.1) * 100;
                  const y = ((49.0504 - pin.lat) / 0.1) * 100;
                  return (
                    <div
                      key={pin.id}
                      className={`absolute w-4 h-4 rounded-full border-2 border-white ${getStatusColor(pin.status)} transform -translate-x-1/2 -translate-y-1/2`}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      title={`${pin.status} - ${pin.notes}`}
                    />
                  );
                })}
                
                {/* Show selected location */}
                {selectedLocation && (
                  <div
                    className="absolute w-6 h-6 bg-yellow-400 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                    style={{ 
                      left: `${((selectedLocation.lng + 122.8048) / 0.1) * 100}%`, 
                      top: `${((49.0504 - selectedLocation.lat) / 0.1) * 100}%` 
                    }}
                  />
                )}
                
                {/* Grid overlay for better visual reference */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="absolute border-gray-400" style={{
                      left: `${i * 10}%`,
                      top: 0,
                      width: '1px',
                      height: '100%',
                      borderLeft: '1px dashed'
                    }} />
                  ))}
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="absolute border-gray-400" style={{
                      top: `${i * 10}%`,
                      left: 0,
                      height: '1px',
                      width: '100%',
                      borderTop: '1px dashed'
                    }} />
                  ))}
                </div>
              </div>
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
                  <p className="text-gray-600">No houses tracked yet. Enable map mode and click on houses to start tracking!</p>
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
                            <Badge className={`${getStatusColor(pin.status)} text-white`}>
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
                <p>• Click "Enable Map Mode" and then click anywhere on the map to add house pins</p>
                <p>• Different colored dots represent different statuses: Blue (Visited), Green (Interested), Red (Not Interested), Purple (Completed)</p>
                <p>• Add notes about customer interactions, property details, or follow-up requirements</p>
                <p>• Export your data as CSV for further analysis or backup</p>
                <p>• All data is stored locally in your browser</p>
                <p>• Future update: Will integrate with Google Maps for real addresses</p>
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
