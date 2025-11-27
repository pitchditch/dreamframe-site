import React, { useState } from 'react';
import { HousePin } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Route, 
  MapPin, 
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
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

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
  { value: 'other', label: 'Other', icon: Store, color: 'hsl(var(--muted-foreground))' }
];

const RouteManager: React.FC<RouteManagerProps> = ({ pins, onUpdatePin }) => {
  const [routeName, setRouteName] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const storefronts = pins.filter(pin => pin.isStorefront);
  
  const getStorefrontsOfType = (type: string) => {
    return storefronts.filter(pin => pin.storefrontType === type);
  };

  const createRoute = () => {
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
      toast.error(`No ${storefrontTypes.find(t => t.value === selectedType)?.label}s found`);
      return;
    }

    // Add route information to pins
    const routeId = `route-${Date.now()}`;
    routePins.forEach((pin, index) => {
      onUpdatePin(pin.id, {
        routeId,
        routeOrder: index + 1,
        routeTimestamp: new Date().toISOString()
      });
    });

    toast.success(`Created route "${routeName}" with ${routePins.length} stops`);
    setRouteName('');
    setSelectedType(null);
  };

  const clearRoute = (type: string) => {
    const routePins = getStorefrontsOfType(type);
    routePins.forEach(pin => {
      onUpdatePin(pin.id, {
        routeId: undefined,
        routeOrder: undefined,
        routeTimestamp: undefined
      });
    });
    toast.success('Route cleared');
  };

  const typeConfig = storefrontTypes.find(t => t.value === selectedType);

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
              onChange={(e) => setRouteName(e.target.value)}
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
                    <Badge variant="secondary" className="text-xs">
                      {count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </div>

          <Button 
            onClick={createRoute} 
            className="w-full"
            disabled={!routeName.trim() || !selectedType}
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
              const hasRoute = pinsOfType.some(p => p.routeId);
              
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
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => clearRoute(type.value)}
                      >
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
              <div className="text-2xl font-bold">
                {storefronts.filter(p => p.routeId).length}
              </div>
              <div className="text-sm text-muted-foreground">In Routes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteManager;
