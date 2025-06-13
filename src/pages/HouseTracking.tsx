
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { MapPin, Plus, Edit, Trash2, Save, X } from 'lucide-react';
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
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [editingPin, setEditingPin] = useState<string | null>(null);
  const [newPin, setNewPin] = useState<Partial<HousePin>>({});
  const [searchAddress, setSearchAddress] = useState('');

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

  const addPin = () => {
    if (newPin.address && newPin.lat && newPin.lng) {
      const pin: HousePin = {
        id: Date.now().toString(),
        lat: newPin.lat,
        lng: newPin.lng,
        address: newPin.address,
        status: newPin.status || 'visited',
        notes: newPin.notes || '',
        dateAdded: new Date().toLocaleDateString(),
        contactInfo: newPin.contactInfo || ''
      };
      setPins([...pins, pin]);
      setNewPin({});
      setIsAddingPin(false);
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
            <p className="text-gray-600">Track houses you've visited during canvassing in White Rock and Surrey</p>
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

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search addresses or notes..."
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="flex-1"
            />
            <Button onClick={() => setIsAddingPin(true)} className="bg-bc-red hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Add House Pin
            </Button>
            <Button onClick={exportData} variant="outline">
              Export CSV
            </Button>
          </div>

          {/* Add Pin Form */}
          {isAddingPin && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New House Pin</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main St, White Rock, BC"
                      value={newPin.address || ''}
                      onChange={(e) => setNewPin({...newPin, address: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={newPin.status || 'visited'}
                      onChange={(e) => setNewPin({...newPin, status: e.target.value as HousePin['status']})}
                    >
                      <option value="visited">Visited</option>
                      <option value="interested">Interested</option>
                      <option value="not-interested">Not Interested</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lat">Latitude</Label>
                    <Input
                      id="lat"
                      type="number"
                      step="any"
                      placeholder="49.0504"
                      value={newPin.lat || ''}
                      onChange={(e) => setNewPin({...newPin, lat: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lng">Longitude</Label>
                    <Input
                      id="lng"
                      type="number"
                      step="any"
                      placeholder="-122.8048"
                      value={newPin.lng || ''}
                      onChange={(e) => setNewPin({...newPin, lng: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    placeholder="Customer feedback, contact details, etc."
                    value={newPin.notes || ''}
                    onChange={(e) => setNewPin({...newPin, notes: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="contact">Contact Info</Label>
                  <Input
                    id="contact"
                    placeholder="Phone number or email"
                    value={newPin.contactInfo || ''}
                    onChange={(e) => setNewPin({...newPin, contactInfo: e.target.value})}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={addPin} className="bg-bc-red hover:bg-red-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Pin
                  </Button>
                  <Button onClick={() => {setIsAddingPin(false); setNewPin({});}} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* House Pins List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Tracked Houses ({filteredPins.length})</h2>
            {filteredPins.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No houses tracked yet. Start adding pins to track your canvassing progress!</p>
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
                <p>• Click "Add House Pin" to manually add houses you've visited</p>
                <p>• Use Google Maps to find coordinates: Right-click on a location → "What's here?" → Copy coordinates</p>
                <p>• Track different statuses: Visited, Interested, Not Interested, Completed</p>
                <p>• Add notes about customer interactions, property details, or follow-up requirements</p>
                <p>• Export your data as CSV for further analysis or backup</p>
                <p>• All data is stored locally in your browser</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
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
