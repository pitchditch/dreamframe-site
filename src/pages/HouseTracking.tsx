
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import MapComponent from '../components/house-tracking/MapComponent';
import PinList from '../components/house-tracking/PinList';
import FacebookLeadsPanel from '../components/house-tracking/FacebookLeadsPanel';
import AnalyticsDashboard from '../components/house-tracking/AnalyticsDashboard';
import PersonalCalculator from '../components/house-tracking/PersonalCalculator';
import StreetViewDialog from '../components/house-tracking/StreetViewDialog';
import EditPinForm from '../components/house-tracking/EditPinForm';
import { HousePin, RouteSession } from '../components/house-tracking/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MapPin, List, Facebook, BarChart3, Calculator, Settings, Search, Filter } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const HouseTracking: React.FC = () => {
  const [pins, setPins] = useState<HousePin[]>([]);
  const [routes, setRoutes] = useState<RouteSession[]>([]);
  const [highlightedPinId, setHighlightedPinId] = useState<string | null>(null);
  const [editingPin, setEditingPin] = useState<string | null>(null);
  const [streetViewPin, setStreetViewPin] = useState<HousePin | null>(null);
  const [personalCalcPin, setPersonalCalcPin] = useState<HousePin | null>(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [statusFilters, setStatusFilters] = useState<Set<string>>(new Set(['visited', 'interested', 'not-interested', 'completed', 'revisit-later', 'needs-quote']));
  const [activeTab, setActiveTab] = useState('map');
  const [showPreviousClientsOnly, setShowPreviousClientsOnly] = useState(false);
  const [serviceReminders, setServiceReminders] = useState<HousePin[]>([]);

  useEffect(() => {
    const savedPins = localStorage.getItem('housePins');
    const savedRoutes = localStorage.getItem('routes');
    
    if (savedPins) {
      setPins(JSON.parse(savedPins));
    }
    
    if (savedRoutes) {
      setRoutes(JSON.parse(savedRoutes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('housePins', JSON.stringify(pins));
  }, [pins]);

  useEffect(() => {
    localStorage.setItem('routes', JSON.stringify(routes));
  }, [routes]);

  const handleAddPin = (newPin: Omit<HousePin, 'id'>) => {
    const pin: HousePin = {
      ...newPin,
      id: `pin-${Date.now()}`,
    };
    setPins(prev => [...prev, pin]);
  };

  const handleUpdatePin = (pinId: string, updates: Partial<HousePin>) => {
    setPins(prev => prev.map(pin => 
      pin.id === pinId ? { ...pin, ...updates } : pin
    ));
  };

  const handleDeletePin = (pinId: string) => {
    setPins(prev => prev.filter(pin => pin.id !== pinId));
  };

  const handleSelectPin = (pin: HousePin) => {
    setHighlightedPinId(pin.id);
    setActiveTab('map');
  };

  const handleEditPin = (pinId: string) => {
    setEditingPin(pinId);
  };

  const handleSavePin = (pinId: string, updates: Partial<HousePin>) => {
    handleUpdatePin(pinId, updates);
    setEditingPin(null);
  };

  const handleCancelEdit = () => {
    setEditingPin(null);
  };

  const handleOpenStreetView = (pin: HousePin) => {
    setStreetViewPin(pin);
  };

  const handleOpenPersonalCalc = (pin: HousePin) => {
    setPersonalCalcPin(pin);
  };

  const handleStatusFilterChange = (status: string, checked: boolean) => {
    setStatusFilters(prev => {
      const newFilters = new Set(prev);
      if (checked) {
        newFilters.add(status);
      } else {
        newFilters.delete(status);
      }
      return newFilters;
    });
  };

  const statusOptions = [
    { value: 'visited', label: 'Visited', color: '#3b82f6' },
    { value: 'interested', label: 'Interested', color: '#10b981' },
    { value: 'not-interested', label: 'Not Interested', color: '#ef4444' },
    { value: 'completed', label: 'Completed', color: '#8b5cf6' },
    { value: 'revisit-later', label: 'Revisit Later', color: '#fbbf24' },
    { value: 'needs-quote', label: 'Needs Quote', color: '#f97316' }
  ];

  // Check for service reminders (yearly alerts)
  useEffect(() => {
    const checkServiceReminders = () => {
      const today = new Date();
      const reminders = pins.filter(pin => {
        if (!pin.serviceReminder || !pin.lastServiceDate) return false;
        
        const lastService = new Date(pin.lastServiceDate);
        const yearsSinceService = (today.getTime() - lastService.getTime()) / (1000 * 60 * 60 * 24 * 365);
        
        return yearsSinceService >= 1;
      });
      
      setServiceReminders(reminders);
    };

    checkServiceReminders();
  }, [pins]);

  // Enhanced filtering to include previous clients
  const filteredPins = pins.filter(pin => {
    const matchesStatus = statusFilters.has(pin.status);
    const matchesSearch = pin.address.toLowerCase().includes(searchAddress.toLowerCase()) ||
                         pin.notes.toLowerCase().includes(searchAddress.toLowerCase()) ||
                         (pin.customerName && pin.customerName.toLowerCase().includes(searchAddress.toLowerCase()));
    const matchesPreviousClient = showPreviousClientsOnly ? pin.isPreviousClient : true;
    
    return matchesStatus && matchesSearch && matchesPreviousClient;
  });

  return (
    <Layout title="House Tracking System | BC Pressure Washing">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">House Tracking System</h1>
          <p className="text-gray-600">Track visited houses, manage leads, and analyze your business performance.</p>
          
          {/* Service Reminders Alert */}
          {serviceReminders.length > 0 && (
            <div className="mt-4 p-4 bg-orange-100 border border-orange-400 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2">🔔 Service Reminders</h3>
              <p className="text-orange-700 mb-2">
                {serviceReminders.length} client(s) are due for yearly service:
              </p>
              <div className="space-y-1">
                {serviceReminders.slice(0, 3).map(pin => (
                  <div key={pin.id} className="text-sm text-orange-600">
                    • {pin.customerName || pin.address} - Last service: {pin.lastServiceDate ? new Date(pin.lastServiceDate).toLocaleDateString() : 'Unknown'}
                  </div>
                ))}
                {serviceReminders.length > 3 && (
                  <div className="text-sm text-orange-600">
                    ... and {serviceReminders.length - 3} more
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Map View
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              List View
            </TabsTrigger>
            <TabsTrigger value="facebook" className="flex items-center gap-2">
              <Facebook className="w-4 h-4" />
              Facebook Leads
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Calculator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <Card>
                  <CardContent className="p-0">
                    <MapComponent
                      pins={pins}
                      routes={routes}
                      onAddPin={handleAddPin}
                      onUpdatePin={handleUpdatePin}
                      onUpdateRoutes={setRoutes}
                      highlightedPinId={highlightedPinId}
                      onPinHover={setHighlightedPinId}
                    />
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Controls
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="search">Search Address</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="search"
                          value={searchAddress}
                          onChange={(e) => setSearchAddress(e.target.value)}
                          placeholder="Search addresses..."
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label className="flex items-center gap-2 mb-3">
                        <Filter className="w-4 h-4" />
                        Filter by Status
                      </Label>
                      <div className="space-y-2">
                        {statusOptions.map((status) => (
                          <div key={status.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={status.value}
                              checked={statusFilters.has(status.value)}
                              onCheckedChange={(checked) => 
                                handleStatusFilterChange(status.value, checked as boolean)
                              }
                            />
                            <label
                              htmlFor={status.value}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                            >
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: status.color }}
                              ></div>
                              {status.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Previous Client Filter */}
                    <div className="pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="previousClients"
                          checked={showPreviousClientsOnly}
                          onCheckedChange={(checked) => setShowPreviousClientsOnly(checked as boolean)}
                        />
                        <label
                          htmlFor="previousClients"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Show Previous Clients Only
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="text-sm text-gray-600">
                        <p><strong>Total Pins:</strong> {pins.length}</p>
                        <p><strong>Filtered:</strong> {filteredPins.length}</p>
                        <p><strong>Previous Clients:</strong> {pins.filter(p => p.isPreviousClient).length}</p>
                        <p><strong>Service Reminders:</strong> {serviceReminders.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list">
            <PinList
              pins={filteredPins}
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
              onSelectPersonalCalc={handleOpenPersonalCalc}
            />
          </TabsContent>

          <TabsContent value="facebook">
            <FacebookLeadsPanel
              pins={pins}
              onUpdatePin={handleUpdatePin}
              onCreatePin={handleAddPin}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard pins={pins} />
          </TabsContent>

          <TabsContent value="calculator">
            <PersonalCalculator
              pins={pins}
              selectedPin={personalCalcPin}
              onUpdatePin={handleUpdatePin}
              onClose={() => setPersonalCalcPin(null)}
            />
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        {streetViewPin && (
          <StreetViewDialog
            pin={streetViewPin}
            onClose={() => setStreetViewPin(null)}
          />
        )}
      </div>
    </Layout>
  );
};

export default HouseTracking;
