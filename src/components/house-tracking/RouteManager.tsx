import React, { useEffect, useState } from 'react';
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
  TrendingUp,
  TrendingDown,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { RouteData, useGoogleMapsRouting } from '@/hooks/useGoogleMapsRouting';
import { calculateRouteDistance, optimizeRouteOrder } from '@/utils/routeOptimizer';
import { publishD2DRoute, removeD2DRoute } from '@/utils/d2dRouteBus';

interface RouteManagerProps {
  pins: HousePin[];
  onUpdatePin: (pinId: string, updates: Partial<HousePin>) => void;
}

const storefrontTypes = [
  { value: 'nail-salon', label: 'Nail Salon', icon: Scissors, color: 'hsl(var(--primary))' },
  { value: 'restaurant', label: 'Restaurant', icon: UtensilsCrossed, color: 'hsl(var(--destructive))' },
  { value: 'retail', label: 'Retail Store', icon: ShoppingBag, color: 'hsl(335, 78%, 42%)' },
  { value: 'coffee-shop', label: 'Coffee Shop', icon: Coffee, color: 'hsl(30, 80%, 50%)' },
  { value: 'hair-salon', label: 'Hair Salon', icon: Scissors, color: 'hsl(280, 80%, 50%)' },
  { value: 'gym', label: 'Gym/Fitness', icon: Dumbbell, color: 'hsl(120, 80%, 50%)' },
  { value: 'medical', label: 'Medical/Dental', icon: Stethoscope, color: 'hsl(200, 80%, 50%)' },
  { value: 'automotive', label: 'Automotive', icon: Car, color: 'hsl(0, 0%, 30%)' },
  { value: 'office', label: 'Office', icon: Building2, color: 'hsl(210, 30%, 50%)' },
  { value: 'other', label: 'Other', icon: Store, color: 'hsl(var(--muted-foreground))' },
];

const RouteManager: React.FC<RouteManagerProps> = ({ pins, onUpdatePin }) => {
  const [routeName, setRouteName] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [estimatedDistance, setEstimatedDistance] = useState('');
  const [hasUphill, setHasUphill] = useState(false);
  const [hasDownhill, setHasDownhill] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedRoute, setCalculatedRoute] = useState<RouteData | null>(null);

  const { getRoute, formatDuration, formatDistance } = useGoogleMapsRouting();
  const storefronts = pins.filter((pin) => pin.isStorefront);

  const getStorefrontsOfType = (type: string) =>
    storefronts.filter((pin) => pin.storefrontType === type);

  const buildFallbackRoute = (routePins: HousePin[]): RouteData => {
    const orderedWaypoints = optimizeRouteOrder(routePins);
    const totalDistance = calculateRouteDistance(orderedWaypoints) * 1000;
    const walkingSeconds = (totalDistance / 1000 / 5) * 3600;
    const stopSeconds = orderedWaypoints.length * 120;
    return {
      steps: [],
      totalDistance,
      totalDuration: Math.round(walkingSeconds + stopSeconds),
      geometry: orderedWaypoints.map((pin) => ({ lat: pin.lat, lng: pin.lng })),
      orderedWaypoints,
      hasUphill: false,
      hasDownhill: false,
    };
  };

  const calculateRouteEstimate = async (routePins: HousePin[]) => {
    if (routePins.length < 2) {
      const fallback = routePins.length === 1 ? buildFallbackRoute(routePins) : null;
      setCalculatedRoute(fallback);
      setEstimatedTime('N/A');
      setEstimatedDistance('N/A');
      setHasUphill(false);
      setHasDownhill(false);
      return fallback;
    }

    setIsCalculating(true);
    try {
      const googleRoute = await getRoute(routePins);
      const routeData = googleRoute || buildFallbackRoute(routePins);
      setCalculatedRoute(routeData);
      setEstimatedTime(formatDuration(routeData.totalDuration));
      setEstimatedDistance(formatDistance(routeData.totalDistance));
      setHasUphill(routeData.hasUphill);
      setHasDownhill(routeData.hasDownhill);
      return routeData;
    } catch (error) {
      console.error('Route calculation error:', error);
      const fallback = buildFallbackRoute(routePins);
      setCalculatedRoute(fallback);
      setEstimatedTime(formatDuration(fallback.totalDuration));
      setEstimatedDistance(formatDistance(fallback.totalDistance));
      setHasUphill(false);
      setHasDownhill(false);
      return fallback;
    } finally {
      setIsCalculating(false);
    }
  };

  const createRoute = async () => {
    if (!routeName.trim()) {
      toast.error('Please enter a route name');
      return;
    }
    if (!selectedType) {
      toast.error('Please select a storefront type');
      return;
    }

    const routePins = getStorefrontsOfType(selectedType);
    if (routePins.length === 0) {
      toast.error(`No ${storefrontTypes.find((type) => type.value === selectedType)?.label}s found`);
      return;
    }

    const routeData = calculatedRoute || await calculateRouteEstimate(routePins) || buildFallbackRoute(routePins);
    const orderedPins = routeData.orderedWaypoints.length > 0
      ? routeData.orderedWaypoints
      : optimizeRouteOrder(routePins);
    const now = new Date().toISOString();
    const routeId = `route-${Date.now()}`;

    orderedPins.forEach((pin, index) => {
      onUpdatePin(pin.id, {
        routeId,
        routeOrder: index + 1,
        routeTimestamp: now,
      });
    });

    const route: RouteSession = {
      id: routeId,
      name: routeName.trim(),
      source: 'storefront',
      startTime: now,
      duration: routeData.totalDuration,
      distance: routeData.totalDistance,
      path: (routeData.geometry.length > 0
        ? routeData.geometry
        : orderedPins.map((pin) => ({ lat: pin.lat, lng: pin.lng })))
        .map((point) => ({ ...point, timestamp: now })),
      stops: orderedPins.map((pin, index) => ({
        id: pin.id,
        address: pin.address,
        lat: pin.lat,
        lng: pin.lng,
        order: index + 1,
        status: pin.status,
      })),
      homesVisited: 0,
      totalStops: orderedPins.length,
      completedStops: 0,
      completionRate: 0,
      color: '#2563eb',
      isActive: false,
      updatedAt: now,
    };

    publishD2DRoute(route);
    toast.success(`Created route "${route.name}" with ${orderedPins.length} stops`);
    setRouteName('');
    setSelectedType(null);
    setCalculatedRoute(null);
  };

  const clearRoute = (type: string) => {
    const routePins = getStorefrontsOfType(type).filter((pin) => pin.routeId);
    const routeIds = Array.from(new Set(routePins.map((pin) => pin.routeId).filter(Boolean))) as string[];

    routePins.forEach((pin) => {
      onUpdatePin(pin.id, {
        routeId: undefined,
        routeOrder: undefined,
        routeTimestamp: undefined,
      });
    });
    routeIds.forEach(removeD2DRoute);
    toast.success(routeIds.length > 1 ? 'Routes cleared' : 'Route cleared');
  };

  useEffect(() => {
    setCalculatedRoute(null);
    if (selectedType) {
      void calculateRouteEstimate(getStorefrontsOfType(selectedType));
    } else {
      setEstimatedTime('');
      setEstimatedDistance('');
      setHasUphill(false);
      setHasDownhill(false);
    }
    // Pins are intentionally omitted: changing a pin status should not constantly
    // call Directions again while the user is working through a route.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="w-5 h-5" />
            Create Storefront Route
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="routeName">Route Name</Label>
            <Input
              id="routeName"
              value={routeName}
              onChange={(event) => setRouteName(event.target.value)}
              placeholder="e.g., Downtown Nail Salons"
            />
          </div>

          <div>
            <Label className="mb-3 block">Select Storefront Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {storefrontTypes.map((type) => {
                const Icon = type.icon;
                const count = getStorefrontsOfType(type.value).length;
                return (
                  <Button
                    key={type.value}
                    variant={selectedType === type.value ? 'default' : 'outline'}
                    className="h-auto py-3 flex flex-col gap-1"
                    onClick={() => setSelectedType(type.value)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{type.label}</span>
                    <Badge variant="secondary" className="text-xs">{count}</Badge>
                  </Button>
                );
              })}
            </div>
          </div>

          {selectedType && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Est. Time</div>
                    <div className="text-sm font-semibold">
                      {isCalculating ? <Loader2 className="w-4 h-4 animate-spin" /> : estimatedTime}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation2 className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Distance</div>
                    <div className="text-sm font-semibold">
                      {isCalculating ? <Loader2 className="w-4 h-4 animate-spin" /> : estimatedDistance}
                    </div>
                  </div>
                </div>
              </div>

              {!isCalculating && (hasUphill || hasDownhill) && (
                <div className="flex gap-2">
                  {hasUphill && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-orange-500" />
                      Uphill sections
                    </Badge>
                  )}
                  {hasDownhill && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <TrendingDown className="w-3 h-3 text-blue-500" />
                      Downhill sections
                    </Badge>
                  )}
                </div>
              )}
            </div>
          )}

          <Button
            onClick={() => void createRoute()}
            className="w-full"
            disabled={!routeName.trim() || !selectedType || isCalculating}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Route
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="w-5 h-5" />
            Storefronts by Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {storefrontTypes.map((type) => {
              const Icon = type.icon;
              const pinsOfType = getStorefrontsOfType(type.value);
              const hasRoute = pinsOfType.some((pin) => pin.routeId);

              return (
                <div key={type.value} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" style={{ color: type.color }} />
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {pinsOfType.length} location{pinsOfType.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasRoute && (
                      <Badge variant="secondary">
                        <Route className="w-3 h-3 mr-1" />
                        Routed
                      </Badge>
                    )}
                    {pinsOfType.length > 0 && hasRoute && (
                      <Button size="sm" variant="ghost" onClick={() => clearRoute(type.value)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{storefronts.length}</div>
              <div className="text-sm text-muted-foreground">Total Storefronts</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{storefronts.filter((pin) => pin.routeId).length}</div>
              <div className="text-sm text-muted-foreground">In Routes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteManager;
