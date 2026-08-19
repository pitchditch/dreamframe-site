import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MagicLinkLogin } from '../components/auth/MagicLinkLogin';
import Layout from '../components/Layout';
import MapComponent from '../components/house-tracking/MapComponent';
import PinList from '../components/house-tracking/PinList';
import AnalyticsDashboard from '../components/house-tracking/AnalyticsDashboard';
import PersonalCalculator from '../components/house-tracking/PersonalCalculator';
import StreetViewDialog from '../components/house-tracking/StreetViewDialog';
import EditPinForm from '../components/house-tracking/EditPinForm';
import CanvassingMode from '../components/house-tracking/CanvassingMode';
import RouteManager from '../components/house-tracking/RouteManager';
import LiveFieldTracker from '../components/house-tracking/LiveFieldTracker';
import { HousePin, NewHousePin, RouteSession } from '../components/house-tracking/types';
import { d2dPinIdentity, ensureD2DPinUpdatedAt } from '@/utils/d2dCloud';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  MapPin,
  List,
  BarChart3,
  LogOut,
  Navigation,
  Search,
  Store,
  Home,
  Users,
  ExternalLink,
  Bell,
  Route,
  ShieldAlert,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const makePinId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return `pin_${crypto.randomUUID()}`;
  return `pin_${Date.now()}_${Math.random().toString(36).slice(2)}`;
};

const statusOptions: Array<{ value: HousePin['status']; label: string }> = [
  { value: 'visited', label: 'Visited' },
  { value: 'interested', label: 'Interested' },
  { value: 'needs-quote', label: 'Needs Quote' },
  { value: 'revisit-later', label: 'Revisit Later' },
  { value: 'not-interested', label: 'Not Interested' },
  { value: 'completed', label: 'Completed' },
];

const HouseTracking: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState<HousePin[]>([]);
  const [routes, setRoutes] = useState<RouteSession[]>([]);
  const [highlightedPinId, setHighlightedPinId] = useState<string | null>(null);
  const [editingPin, setEditingPin] = useState<string | null>(null);
  const [streetViewPin, setStreetViewPin] = useState<HousePin | null>(null);
  const [personalCalcPin, setPersonalCalcPin] = useState<HousePin | null>(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [statusFilters, setStatusFilters] = useState<Set<string>>(
    new Set(statusOptions.map((status) => status.value)),
  );
  const [activeTab, setActiveTab] = useState('map');
  const [showPreviousClientsOnly, setShowPreviousClientsOnly] = useState(false);
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<'all' | 'residential' | 'storefront'>('all');
  const [canvassingMode, setCanvassingMode] = useState(false);
  const [canvassingModeType, setCanvassingModeType] = useState<'residential' | 'storefront'>('residential');
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (cancelled) return;
      if (error || !user) {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
      const { data: adminResult, error: adminError } = await supabase.rpc('is_admin', { user_id: user.id });
      if (cancelled) return;
      if (adminError) console.error('House Tracking admin check failed:', adminError);
      setIsAdmin(Boolean(adminResult));
      setLoading(false);
    };

    void checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setIsAdmin(false);
        return;
      }
      if (session?.user) void checkAuth();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const savedPins = localStorage.getItem('housePins');
    const savedRoutes = localStorage.getItem('routes');

    if (savedPins) {
      try {
        const parsed = JSON.parse(savedPins);
        if (Array.isArray(parsed)) setPins(parsed.map((pin) => ensureD2DPinUpdatedAt(pin as HousePin)));
      } catch (error) {
        console.error('Could not load saved house pins:', error);
      }
    }

    if (savedRoutes) {
      try {
        const parsed = JSON.parse(savedRoutes);
        if (Array.isArray(parsed)) setRoutes(parsed);
      } catch (error) {
        console.error('Could not load saved routes:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('housePins', JSON.stringify(pins));
  }, [pins]);

  useEffect(() => {
    localStorage.setItem('routes', JSON.stringify(routes));
  }, [routes]);

  useEffect(() => {
    const handleRouteSaved = (event: Event) => {
      const route = (event as CustomEvent<RouteSession>).detail;
      if (!route?.id) return;
      setRoutes((previous) => [route, ...previous.filter((item) => item.id !== route.id)]);
    };
    window.addEventListener('d2d-route-saved', handleRouteSaved);
    return () => window.removeEventListener('d2d-route-saved', handleRouteSaved);
  }, []);

  useEffect(() => {
    if (!canvassingMode) {
      setLocationError(null);
      return;
    }
    if (!navigator.geolocation) {
      setLocationError('This device does not support GPS location.');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocationError(null);
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('House Tracking GPS error:', error);
        setLocationError(error.message || 'Unable to get live location');
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1500,
        timeout: 10000,
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [canvassingMode]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const handleAddPin = (newPin: NewHousePin) => {
    const now = new Date().toISOString();
    const pin = ensureD2DPinUpdatedAt({
      ...newPin,
      id: newPin.id || makePinId(),
      updatedAt: newPin.updatedAt || now,
    } as HousePin);
    const identity = d2dPinIdentity(pin);

    setPins((previous) => {
      const existingIndex = previous.findIndex((item) => item.id === pin.id || d2dPinIdentity(item) === identity);
      if (existingIndex < 0) return [...previous, pin];

      const existing = previous[existingIndex];
      const existingTime = new Date(existing.updatedAt || existing.dateAdded || 0).getTime();
      const incomingTime = new Date(pin.updatedAt || pin.dateAdded || 0).getTime();
      if (Number.isFinite(existingTime) && Number.isFinite(incomingTime) && existingTime > incomingTime) return previous;

      const next = [...previous];
      next[existingIndex] = { ...existing, ...pin };
      return next;
    });
  };

  const handleUpdatePin = (pinId: string, updates: Partial<HousePin>) => {
    setPins((previous) => previous.map((pin) => (
      pin.id === pinId
        ? { ...pin, ...updates, updatedAt: updates.updatedAt || new Date().toISOString() }
        : pin
    )));
  };

  const handleDeletePin = (pinId: string) => {
    if (!window.confirm('Delete this property from House Tracking?')) return;
    setPins((previous) => previous.filter((pin) => pin.id !== pinId));
    setHighlightedPinId((current) => current === pinId ? null : current);
  };

  const handleClearAllPins = () => {
    setPins([]);
    setHighlightedPinId(null);
    localStorage.removeItem('housePins');
  };

  const selectedPin = useMemo(
    () => pins.find((pin) => pin.id === highlightedPinId) || null,
    [pins, highlightedPinId],
  );

  const serviceReminders = useMemo(() => pins.filter((pin) => {
    if (!pin.serviceReminder || !pin.lastServiceDate) return false;
    const last = new Date(pin.lastServiceDate).getTime();
    return Number.isFinite(last) && Date.now() - last >= 365 * 24 * 60 * 60 * 1000;
  }), [pins]);

  const typeFilteredPins = useMemo(() => pins.filter((pin) => {
    if (showPreviousClientsOnly && !pin.isPreviousClient) return false;
    if (propertyTypeFilter === 'residential' && pin.isStorefront) return false;
    if (propertyTypeFilter === 'storefront' && !pin.isStorefront) return false;
    return true;
  }), [pins, propertyTypeFilter, showPreviousClientsOnly]);

  const visibleListCount = useMemo(() => {
    const query = searchAddress.trim().toLowerCase();
    return typeFilteredPins.filter((pin) => {
      if (!statusFilters.has(pin.status)) return false;
      if (!query) return true;
      return [pin.address, pin.notes, pin.customerName, pin.businessName, pin.phoneNumber, pin.email]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(query);
    }).length;
  }, [typeFilteredPins, searchAddress, statusFilters]);

  const toggleStatus = (status: HousePin['status']) => {
    setStatusFilters((current) => {
      const next = new Set(current);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  };

  const handleSessionSaved = (route: RouteSession) => {
    setRoutes((previous) => [route, ...previous.filter((item) => item.id !== route.id)]);
  };

  const followUpsDue = pins.filter((pin) => pin.followUpDate && new Date(pin.followUpDate).getTime() <= Date.now()).length;
  const interestedCount = pins.filter((pin) => ['interested', 'needs-quote'].includes(pin.status)).length;
  const quoteCount = pins.filter((pin) => pin.status === 'needs-quote').length;

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center"><div className="h-12 w-12 animate-spin rounded-full border-2 border-muted border-b-primary" /></div>;
  }

  if (!isAuthenticated) return <MagicLinkLogin />;

  if (!isAdmin) {
    return (
      <Layout title="House Tracking | BC Pressure Washing">
        <div className="container mx-auto max-w-2xl px-4 py-16">
          <Card>
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <ShieldAlert className="h-10 w-10 text-destructive" />
              <div><h1 className="text-xl font-bold">Admin access required</h1><p className="mt-1 text-sm text-muted-foreground">House Tracking contains private field and customer records.</p></div>
              <Button variant="outline" onClick={() => void handleLogout()}><LogOut className="mr-2 h-4 w-4" />Sign out</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="House Tracking | BC Pressure Washing">
      <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">House Tracking</h1>
            <p className="mt-1 text-sm text-muted-foreground">Map, Street View, D2D sessions, storefront crawling and saved routes in one field workspace.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/crm/properties')}><Users className="mr-2 h-4 w-4" />CRM Properties</Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/crm/analytics')}><BarChart3 className="mr-2 h-4 w-4" />Main Analytics</Button>
            <Button variant="outline" size="sm" onClick={() => void handleLogout()}><LogOut className="mr-2 h-4 w-4" />Logout</Button>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Card><CardContent className="p-3"><div className="text-xs text-muted-foreground">Properties</div><div className="text-xl font-bold">{pins.length}</div></CardContent></Card>
          <Card><CardContent className="p-3"><div className="text-xs text-muted-foreground">Interested</div><div className="text-xl font-bold">{interestedCount}</div></CardContent></Card>
          <Card><CardContent className="p-3"><div className="text-xs text-muted-foreground">Needs Quote</div><div className="text-xl font-bold">{quoteCount}</div></CardContent></Card>
          <Card><CardContent className="p-3"><div className="text-xs text-muted-foreground">Follow-ups Due</div><div className="text-xl font-bold">{followUpsDue}</div></CardContent></Card>
        </div>

        {serviceReminders.length > 0 && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-orange-300 bg-orange-50 p-3 text-sm text-orange-900">
            <Bell className="mt-0.5 h-4 w-4 shrink-0" />
            <div><strong>{serviceReminders.length} service reminder{serviceReminders.length === 1 ? '' : 's'} due.</strong> {serviceReminders.slice(0, 3).map((pin) => pin.customerName || pin.address).join(', ')}{serviceReminders.length > 3 ? ` +${serviceReminders.length - 3} more` : ''}</div>
          </div>
        )}

        <Card className="mb-4">
          <CardContent className="space-y-3 p-3 sm:p-4">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={searchAddress} onChange={(event) => setSearchAddress(event.target.value)} placeholder="Search address, customer, business, phone, notes…" className="pl-9" />
              </div>
              <div className="grid grid-cols-3 gap-2 lg:w-auto">
                <Button size="sm" variant={propertyTypeFilter === 'all' ? 'default' : 'outline'} onClick={() => setPropertyTypeFilter('all')}>All</Button>
                <Button size="sm" variant={propertyTypeFilter === 'residential' ? 'default' : 'outline'} onClick={() => setPropertyTypeFilter('residential')}><Home className="mr-1 h-3.5 w-3.5" />Homes</Button>
                <Button size="sm" variant={propertyTypeFilter === 'storefront' ? 'default' : 'outline'} onClick={() => setPropertyTypeFilter('storefront')}><Store className="mr-1 h-3.5 w-3.5" />Stores</Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {statusOptions.map((status) => (
                <Button key={status.value} type="button" size="sm" variant={statusFilters.has(status.value) ? 'secondary' : 'outline'} onClick={() => toggleStatus(status.value)} className="h-8 text-xs">
                  {status.label}
                </Button>
              ))}
              <label className="ml-auto flex items-center gap-2 text-xs font-medium sm:text-sm">
                <Checkbox checked={showPreviousClientsOnly} onCheckedChange={(checked) => setShowPreviousClientsOnly(Boolean(checked))} />
                Previous clients only
              </label>
              <Badge variant="outline">{visibleListCount} shown</Badge>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="map" className="gap-1"><MapPin className="h-4 w-4" /><span className="hidden sm:inline">Map</span></TabsTrigger>
            <TabsTrigger value="list" className="gap-1"><List className="h-4 w-4" /><span className="hidden sm:inline">List</span></TabsTrigger>
            <TabsTrigger value="routes" className="gap-1"><Route className="h-4 w-4" /><span className="hidden sm:inline">Routes</span></TabsTrigger>
            <TabsTrigger value="analytics" className="gap-1"><BarChart3 className="h-4 w-4" /><span className="hidden sm:inline">Analytics</span></TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Button variant={canvassingMode ? 'destructive' : 'default'} onClick={() => setCanvassingMode((value) => !value)}>
                <Navigation className="mr-2 h-4 w-4" />{canvassingMode ? 'Exit Field Mode' : 'Start Field Mode'}
              </Button>
              <Button variant={canvassingModeType === 'residential' ? 'default' : 'outline'} onClick={() => setCanvassingModeType('residential')} disabled={!canvassingMode}>Residential</Button>
              <Button variant={canvassingModeType === 'storefront' ? 'default' : 'outline'} onClick={() => setCanvassingModeType('storefront')} disabled={!canvassingMode}>Storefront</Button>
              {currentLocation && <Badge variant="secondary">GPS {currentLocation.lat.toFixed(5)}, {currentLocation.lng.toFixed(5)}</Badge>}
            </div>

            {locationError && canvassingMode && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">GPS: {locationError}</div>
            )}

            <LiveFieldTracker currentLocation={currentLocation} active={canvassingMode} />

            <Card><CardContent className="p-0"><MapComponent pins={pins} routes={routes} onAddPin={handleAddPin} onUpdatePin={handleUpdatePin} onDeletePin={handleDeletePin} onUpdateRoutes={setRoutes} onClearAllPins={handleClearAllPins} highlightedPinId={highlightedPinId} onPinHover={setHighlightedPinId} /></CardContent></Card>
          </TabsContent>

          <TabsContent value="list">
            <PinList
              pins={typeFilteredPins}
              highlightedPinId={highlightedPinId}
              editingPin={editingPin}
              statusFilters={statusFilters}
              searchAddress={searchAddress}
              onSelectPin={(pin) => { setHighlightedPinId(pin.id); setActiveTab('map'); }}
              onEditPin={setEditingPin}
              onDeletePin={handleDeletePin}
              onOpenStreetView={setStreetViewPin}
              EditPinForm={EditPinForm}
              onSavePin={(pinId, updates) => { handleUpdatePin(pinId, updates); setEditingPin(null); }}
              onCancelEdit={() => setEditingPin(null)}
              onSelectPersonalCalc={setPersonalCalcPin}
            />
          </TabsContent>

          <TabsContent value="routes" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
              <Card><CardContent className="p-0"><MapComponent pins={pins} routes={routes} onAddPin={handleAddPin} onUpdatePin={handleUpdatePin} onDeletePin={handleDeletePin} onUpdateRoutes={setRoutes} onClearAllPins={handleClearAllPins} highlightedPinId={highlightedPinId} onPinHover={setHighlightedPinId} /></CardContent></Card>
              <RouteManager pins={pins} onUpdatePin={handleUpdatePin} onRouteSaved={handleSessionSaved} />
            </div>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Route className="h-5 w-5" />Saved Routes ({routes.length})</CardTitle></CardHeader>
              <CardContent className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                {[...routes].sort((a, b) => new Date(b.updatedAt || b.endTime || b.startTime).getTime() - new Date(a.updatedAt || a.endTime || a.startTime).getTime()).slice(0, 30).map((route) => (
                  <div key={route.id} className="rounded-lg border p-3">
                    <div className="flex items-start justify-between gap-2"><div className="font-medium">{route.name}</div>{route.id.startsWith('auto-street:') && <Badge variant="secondary">Auto 5+</Badge>}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{route.homesVisited} stops{route.distance ? ` · ${(route.distance / 1000).toFixed(1)} km` : ''}{route.duration ? ` · ${Math.round(route.duration / 60)} min` : ''}</div>
                  </div>
                ))}
                {routes.length === 0 && <p className="text-sm text-muted-foreground">No saved routes yet. Street routes appear automatically after 5 eligible pins on the same street.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics"><AnalyticsDashboard pins={pins} /></TabsContent>
        </Tabs>

        {personalCalcPin && (
          <div className="mt-4">
            <PersonalCalculator pins={pins} selectedPin={personalCalcPin} onUpdatePin={handleUpdatePin} onClose={() => setPersonalCalcPin(null)} />
          </div>
        )}

        {streetViewPin && <StreetViewDialog pin={streetViewPin} onClose={() => setStreetViewPin(null)} />}

        {canvassingMode && (
          <CanvassingMode
            onQuickMark={(pin) => { handleAddPin(pin); setHighlightedPinId(pin.id); }}
            onUpdatePin={handleUpdatePin}
            onSessionSaved={handleSessionSaved}
            currentLocation={currentLocation}
            activePin={selectedPin}
            mode={canvassingModeType}
          />
        )}
      </div>
    </Layout>
  );
};

export default HouseTracking;
