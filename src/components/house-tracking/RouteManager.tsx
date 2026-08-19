import React, { useEffect, useMemo, useState } from 'react';
import { HousePin, RouteSession } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Route,
  Store,
  Scissors,
  UtensilsCrossed,
  ShoppingBag,
  Coffee,
  Dumbbell,
  Stethoscope,
  Car,
  Building2,
  Trash2,
  Clock,
  Navigation2,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { useGoogleMapsRouting } from '@/hooks/useGoogleMapsRouting';
import { upsertD2DCloudRoutes } from '@/utils/d2dCloud';

interface RouteManagerProps {
  pins: HousePin[];
  onUpdatePin: (pinId: string, updates: Partial<HousePin>) => void;
  onRouteSaved?: (route: RouteSession) => void;
}

const storefrontTypes = [
  { value: 'nail-salon', label: 'Nail Salon', icon: Scissors },
  { value: 'restaurant', label: 'Restaurant', icon: UtensilsCrossed },
  { value: 'retail', label: 'Retail Store', icon: ShoppingBag },
  { value: 'coffee-shop', label: 'Coffee Shop', icon: Coffee },
  { value: 'hair-salon', label: 'Hair Salon', icon: Scissors },
  { value: 'gym', label: 'Gym/Fitness', icon: Dumbbell },
  { value: 'medical', label: 'Medical/Dental', icon: Stethoscope },
  { value: 'automotive', label: 'Automotive', icon: Car },
  { value: 'office', label: 'Office', icon: Building2 },
  { value: 'other', label: 'Other', icon: Store },
] as const;

const saveRouteLocally = (route: RouteSession) => {
  try {
    const parsed = JSON.parse(localStorage.getItem('routes') || '[]');
    const routes: RouteSession[] = Array.isArray(parsed) ? parsed : [];
    const next = [route, ...routes.filter((item) => item.id !== route.id)].slice(0, 150);
    localStorage.setItem('routes', JSON.stringify(next));
  } catch (error) {
    console.error('Could not save route locally:', error);
  }
};

const RouteManager: React.FC<RouteManagerProps> = ({ pins, onUpdatePin, onRouteSaved }) => {
  const [routeName, setRouteName] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [estimatedDistance, setEstimatedDistance] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { getRoute, formatDuration, formatDistance } = useGoogleMapsRouting();
  const storefronts = useMemo(() => pins.filter((pin) => pin.isStorefront), [pins]);

  const getStorefrontsOfType = (type: string) => storefronts.filter((pin) => pin.storefrontType === type);

  const calculateRouteEstimate = async (routePins: HousePin[]) => {
    if (routePins.length < 2) {
      setEstimatedTime(routePins.length === 1 ? '1 stop' : 'N/A');
      setEstimatedDistance('N/A');
      return null;
    }

    setIsCalculating(true);
    try {
      const routeData = await getRoute(routePins);
      if (routeData) {
        setEstimatedTime(formatDuration(routeData.totalDuration));
        setEstimatedDistance(formatDistance(routeData.totalDistance));
      } else {
        setEstimatedTime('Route unavailable');
        setEstimatedDistance('—');
      }
      return routeData;
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    if (!selectedType) {
      setEstimatedTime('');
      setEstimatedDistance('');
      return;
    }
    void calculateRouteEstimate(getStorefrontsOfType(selectedType));
    // Recalculate when the selection or matching pins change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType, storefronts]);

  const createRoute = async () => {
    const name = routeName.trim();
    if (!name) {
      toast.error('Enter a route name');
      return;
    }
    if (!selectedType) {
      toast.error('Select a storefront type');
      return;
    }

    const routePins = getStorefrontsOfType(selectedType);
    if (routePins.length === 0) {
      toast.error('No matching storefronts found');
      return;
    }

    setIsSaving(true);
    try {
      const routeData = routePins.length >= 2 ? await getRoute(routePins) : null;
      const now = new Date().toISOString();
      const routeId = `storefront-${Date.now()}`;
      const geometry = routeData?.geometry?.length
        ? routeData.geometry
        : routePins.map((pin) => ({ lat: pin.lat, lng: pin.lng }));

      const route: RouteSession = {
        id: routeId,
        name,
        startTime: now,
        endTime: now,
        duration: routeData?.totalDuration,
        distance: routeData?.totalDistance,
        path: geometry.map((point) => ({ ...point, timestamp: now })),
        homesVisited: routePins.length,
        color: '#f97316',
        isActive: false,
        updatedAt: now,
      };

      routePins.forEach((pin, index) => {
        onUpdatePin(pin.id, {
          routeId,
          routeOrder: index + 1,
          routeTimestamp: now,
          updatedAt: now,
        });
      });

      saveRouteLocally(route);
      onRouteSaved?.(route);
      window.dispatchEvent(new CustomEvent('d2d-route-saved', { detail: route }));

      try {
        await upsertD2DCloudRoutes([route]);
      } catch (error) {
        console.error('Route cloud save failed:', error);
        toast.warning('Route saved locally; cloud sync will retry from House Tracking.');
      }

      toast.success(`Saved “${name}” with ${routePins.length} stops`);
      setRouteName('');
      setSelectedType(null);
    } finally {
      setIsSaving(false);
    }
  };

  const clearRoute = (type: string) => {
    const routePins = getStorefrontsOfType(type);
    const now = new Date().toISOString();
    routePins.forEach((pin) => {
      onUpdatePin(pin.id, {
        routeId: undefined,
        routeOrder: undefined,
        routeTimestamp: undefined,
        updatedAt: now,
      });
    });
    toast.success('Route assignment cleared from these storefronts');
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Route className="h-5 w-5" />Create Storefront Route</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="routeName">Route Name</Label>
            <Input id="routeName" value={routeName} onChange={(event) => setRouteName(event.target.value)} placeholder="e.g. White Rock salons" />
          </div>

          <div>
            <Label className="mb-2 block">Storefront Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {storefrontTypes.map((type) => {
                const Icon = type.icon;
                const count = getStorefrontsOfType(type.value).length;
                return (
                  <Button
                    key={type.value}
                    type="button"
                    variant={selectedType === type.value ? 'default' : 'outline'}
                    className="h-auto min-h-16 flex-col gap-1 py-2"
                    onClick={() => setSelectedType(type.value)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{type.label}</span>
                    <Badge variant="secondary" className="text-[10px]">{count}</Badge>
                  </Button>
                );
              })}
            </div>
          </div>

          {selectedType && (
            <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/50 p-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div><div className="text-xs text-muted-foreground">Est. time</div><div className="text-sm font-semibold">{isCalculating ? <Loader2 className="h-4 w-4 animate-spin" /> : estimatedTime}</div></div>
              </div>
              <div className="flex items-center gap-2">
                <Navigation2 className="h-4 w-4 text-muted-foreground" />
                <div><div className="text-xs text-muted-foreground">Distance</div><div className="text-sm font-semibold">{isCalculating ? <Loader2 className="h-4 w-4 animate-spin" /> : estimatedDistance}</div></div>
              </div>
            </div>
          )}

          <Button onClick={() => void createRoute()} className="w-full" disabled={!routeName.trim() || !selectedType || isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
            Save Route
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Store className="h-5 w-5" />Storefronts by Type</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {storefrontTypes.map((type) => {
            const Icon = type.icon;
            const matching = getStorefrontsOfType(type.value);
            const routed = matching.filter((pin) => pin.routeId).length;
            return (
              <div key={type.value} className="flex items-center justify-between gap-2 rounded-lg border p-3">
                <div className="flex min-w-0 items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0" />
                  <div className="min-w-0"><div className="truncate text-sm font-medium">{type.label}</div><div className="text-xs text-muted-foreground">{matching.length} locations · {routed} routed</div></div>
                </div>
                {routed > 0 && <Button size="icon" variant="ghost" onClick={() => clearRoute(type.value)} title="Clear route assignments"><Trash2 className="h-4 w-4" /></Button>}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteManager;
