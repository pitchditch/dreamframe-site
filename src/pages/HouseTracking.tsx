import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MagicLinkLogin } from '../components/auth/MagicLinkLogin';
import Layout from '../components/Layout';
import MapComponent from '../components/house-tracking/MapComponent';
import PinList from '../components/house-tracking/PinList';
import FacebookLeadsPanel from '../components/house-tracking/FacebookLeadsPanel';
import AnalyticsDashboard from '../components/house-tracking/AnalyticsDashboard';
import PersonalCalculator from '../components/house-tracking/PersonalCalculator';
import StreetViewDialog from '../components/house-tracking/StreetViewDialog';
import EditPinForm from '../components/house-tracking/EditPinForm';
import CanvassingMode from '../components/house-tracking/CanvassingMode';
import { HousePin, RouteSession } from '../components/house-tracking/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MapPin, List, Facebook, BarChart3, Calculator, Settings, Search, Filter, LogOut, Users, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const SESSION_DURATION_MS = 30 * 60 * 1000; // 30 minutes

const HouseTracking: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionTimer, setSessionTimer] = useState<NodeJS.Timeout | null>(null);
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
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedPin, setSelectedPin] = useState<HousePin | null>(null);
  const [canvassingMode, setCanvassingMode] = useState(false);

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setIsAuthenticated(true);
        
        // Set up 30-minute auto logout
        const timer = setTimeout(() => {
          handleLogout();
          toast.error('Session expired. Please login again.');
        }, SESSION_DURATION_MS);
        
        setSessionTimer(timer);
      } else {
        setIsAuthenticated(false);
      }
      
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        toast.success('Successfully logged in! Session expires in 30 minutes.');
        
        // Clear any existing timer
        if (sessionTimer) clearTimeout(sessionTimer);
        
        // Set new 30-minute timer
        const timer = setTimeout(() => {
          handleLogout();
          toast.error('Session expired. Please login again.');
        }, SESSION_DURATION_MS);
        
        setSessionTimer(timer);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
      }
    });

    return () => {
      subscription.unsubscribe();
      if (sessionTimer) clearTimeout(sessionTimer);
    };
  }, []);

  const handleLogout = async () => {
    if (sessionTimer) clearTimeout(sessionTimer);
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

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

  // Track current location
  useEffect(() => {
    if (!canvassingMode) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error('Error getting location:', error);
        toast.error('Unable to get location');
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [canvassingMode]);

  const handleQuickMarkProperty = (pin: HousePin) => {
    handleAddPin(pin);
    setSelectedPin(pin);
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <MagicLinkLogin />;
  }

  return (
    <Layout title="House Tracking System | BC Pressure Washing">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">House Tracking System</h1>
              <p className="text-gray-600">Track visited houses, manage leads, and analyze your business performance.</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
          
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
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            <TabsTrigger value="map" className="flex items-center gap-1 text-xs sm:text-sm">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Map View</span>
              <span className="sm:hidden">Map</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-1 text-xs sm:text-sm">
              <List className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">List View</span>
              <span className="sm:hidden">List</span>
            </TabsTrigger>
            <TabsTrigger value="crm" className="flex items-center gap-1 text-xs sm:text-sm">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">CRM Dashboard</span>
              <span className="sm:hidden">CRM</span>
            </TabsTrigger>
            <TabsTrigger value="facebook" className="flex items-center gap-1 text-xs sm:text-sm">
              <Facebook className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Facebook Leads</span>
              <span className="sm:hidden">FB</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1 text-xs sm:text-sm">
              <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Analytics</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center gap-1 text-xs sm:text-sm">
              <Calculator className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Calculator</span>
              <span className="sm:hidden">Calc</span>
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

          <TabsContent value="crm">
            <div className="space-y-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">CRM Dashboard</h2>
                <p className="text-muted-foreground">Manage properties, canvassing sessions, and team analytics</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Canvasser Mode Card */}
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/crm/canvasser')}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Canvasser Mode</CardTitle>
                    <CardDescription>Track door-to-door visits with GPS</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Start Canvassing
                    </Button>
                  </CardContent>
                </Card>

                {/* Property Capture Card */}
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/crm/property-capture')}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Property Capture</CardTitle>
                    <CardDescription>Add properties with address lookup</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Add Property
                    </Button>
                  </CardContent>
                </Card>

                {/* View All Properties Card */}
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/crm/properties')}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <List className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>View Properties</CardTitle>
                    <CardDescription>Browse all captured properties</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      View All
                    </Button>
                  </CardContent>
                </Card>

                {/* Map View Card */}
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/crm/map')}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Interactive Map</CardTitle>
                    <CardDescription>Visualize properties on map</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Open Map
                    </Button>
                  </CardContent>
                </Card>

                {/* Analytics Card */}
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/crm/analytics')}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <BarChart3 className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>CRM Analytics</CardTitle>
                    <CardDescription>Performance metrics & insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      View Dashboard
                    </Button>
                  </CardContent>
                </Card>

                {/* Route History Card */}
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/crm/routes')}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Navigation className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Route History</CardTitle>
                    <CardDescription>Review canvassing sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      View Routes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
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

        {/* Canvassing Mode Toggle */}
        {activeTab === 'map' && (
          <div className="fixed top-20 right-4 z-40">
            <Button
              onClick={() => setCanvassingMode(!canvassingMode)}
              variant={canvassingMode ? 'default' : 'outline'}
              className="gap-2 shadow-lg"
            >
              <Navigation className="w-4 h-4" />
              {canvassingMode ? 'Exit Canvassing' : 'Start Canvassing'}
            </Button>
          </div>
        )}

        {/* Canvassing Mode UI */}
        {canvassingMode && (
          <CanvassingMode
            onQuickMark={handleQuickMarkProperty}
            currentLocation={currentLocation}
            activePin={selectedPin}
          />
        )}
      </div>
    </Layout>
  );
};

export default HouseTracking;
