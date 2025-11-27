import React, { useState, useEffect } from 'react';
import { HousePin } from './types';
import { useOfflineCanvassing } from '@/hooks/useOfflineCanvassing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Check, 
  X, 
  Clock, 
  FileText, 
  Home,
  Wifi,
  WifiOff,
  QrCode,
  Navigation,
  Play,
  Square,
  Store,
  Building2,
  Target,
  Settings2
} from 'lucide-react';
import { toast } from 'sonner';
import PropertyQRCode from './PropertyQRCode';

interface CanvassingModeProps {
  onQuickMark: (pin: HousePin) => void;
  currentLocation: { lat: number; lng: number } | null;
  activePin: HousePin | null;
  mode?: 'residential' | 'storefront';
}

const CanvassingMode: React.FC<CanvassingModeProps> = ({
  onQuickMark,
  currentLocation,
  activePin,
  mode = 'residential'
}) => {
  const {
    isOnline,
    pendingActions,
    isSyncing,
    quickMarkProperty,
    syncPendingActions
  } = useOfflineCanvassing();

  const [isActive, setIsActive] = useState(false);
  const [sessionStart, setSessionStart] = useState<Date | null>(null);
  const [visitCount, setVisitCount] = useState(0);
  const [qrPin, setQrPin] = useState<HousePin | null>(null);
  const [storefrontType, setStorefrontType] = useState<'nail-salon' | 'restaurant' | 'retail' | 'other'>('retail');
  const [autoLogEnabled, setAutoLogEnabled] = useState(false);
  const [autoLogRadius, setAutoLogRadius] = useState(15); // meters

  useEffect(() => {
    if (isActive && !sessionStart) {
      setSessionStart(new Date());
    }
  }, [isActive, sessionStart]);

  const handleQuickAction = async (status: HousePin['status'], notes?: string, isStorefrontAction?: boolean) => {
    if (!currentLocation) {
      toast.error('Location not available');
      return;
    }

    const address = `${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}`;
    
    const pin = quickMarkProperty(
      currentLocation.lat,
      currentLocation.lng,
      address,
      status,
      notes
    );

    // Add storefront info if in storefront mode
    if (mode === 'storefront' || isStorefrontAction) {
      pin.isStorefront = true;
      pin.storefrontType = storefrontType;
    }

    onQuickMark(pin);
    setVisitCount(prev => prev + 1);
    
    toast.success(mode === 'storefront' ? `Marked storefront as ${status}` : `Marked as ${status}`, {
      description: isOnline ? 'Saved to cloud' : 'Saved offline'
    });

    // Vibrate if supported
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const toggleSession = () => {
    if (isActive) {
      setIsActive(false);
      toast.success(`Session ended. ${visitCount} properties visited`);
    } else {
      setIsActive(true);
      setSessionStart(new Date());
      setVisitCount(0);
      toast.success('Canvassing session started');
    }
  };

  const getSessionDuration = () => {
    if (!sessionStart) return '0:00';
    const diff = Date.now() - sessionStart.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <Card className="border-2 shadow-lg bg-background/95 backdrop-blur">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Navigation className="w-5 h-5" />
              Canvassing Mode
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={isOnline ? 'default' : 'secondary'}>
                {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              </Badge>
              {pendingActions > 0 && (
                <Badge variant="outline">
                  {pendingActions} pending
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {/* Session Status */}
          <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'}`} />
              <span className="text-sm font-medium">
                {isActive ? getSessionDuration() : 'Not Active'}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {visitCount} visits
            </div>
          </div>

          {/* Quick Actions */}
          {isActive && mode === 'residential' && (
            <div className="grid grid-cols-3 gap-2">
              <Button
                size="lg"
                variant="default"
                className="flex-col h-20 gap-1"
                onClick={() => handleQuickAction('interested', 'Flyer dropped')}
              >
                <FileText className="w-5 h-5" />
                <span className="text-xs">Flyer</span>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="flex-col h-20 gap-1 border-green-500 text-green-600 dark:border-green-400 dark:text-green-400"
                onClick={() => handleQuickAction('visited', 'Contact made')}
              >
                <Check className="w-5 h-5" />
                <span className="text-xs">Visited</span>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="flex-col h-20 gap-1 border-red-500 text-red-600 dark:border-red-400 dark:text-red-400"
                onClick={() => handleQuickAction('not-interested')}
              >
                <X className="w-5 h-5" />
                <span className="text-xs">Skip</span>
              </Button>
            </div>
          )}

          {/* Storefront Quick Actions */}
          {isActive && mode === 'storefront' && (
            <>
              <div className="grid grid-cols-4 gap-2 mb-2">
                <Button
                  size="sm"
                  variant={storefrontType === 'nail-salon' ? 'default' : 'outline'}
                  onClick={() => setStorefrontType('nail-salon')}
                  className="text-xs"
                >
                  Nail
                </Button>
                <Button
                  size="sm"
                  variant={storefrontType === 'restaurant' ? 'default' : 'outline'}
                  onClick={() => setStorefrontType('restaurant')}
                  className="text-xs"
                >
                  Food
                </Button>
                <Button
                  size="sm"
                  variant={storefrontType === 'retail' ? 'default' : 'outline'}
                  onClick={() => setStorefrontType('retail')}
                  className="text-xs"
                >
                  Retail
                </Button>
                <Button
                  size="sm"
                  variant={storefrontType === 'other' ? 'default' : 'outline'}
                  onClick={() => setStorefrontType('other')}
                  className="text-xs"
                >
                  Other
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="lg"
                  variant="default"
                  className="flex-col h-20 gap-1"
                  onClick={() => handleQuickAction('interested', `${storefrontType} - interested`, true)}
                >
                  <Store className="w-5 h-5" />
                  <span className="text-xs">Mark Store</span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-col h-20 gap-1"
                  onClick={() => handleQuickAction('not-interested', `${storefrontType} - not interested`, true)}
                >
                  <X className="w-5 h-5" />
                  <span className="text-xs">Skip</span>
                </Button>
              </div>
            </>
          )}

          {/* Auto-Log Settings */}
          {isActive && (
            <div className="p-3 bg-muted/50 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span className="text-sm font-medium">Auto-Log</span>
                </div>
                <Button
                  size="sm"
                  variant={autoLogEnabled ? 'default' : 'outline'}
                  onClick={() => setAutoLogEnabled(!autoLogEnabled)}
                >
                  {autoLogEnabled ? 'On' : 'Off'}
                </Button>
              </div>
              
              {autoLogEnabled && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Radius: {autoLogRadius}m</span>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2"
                        onClick={() => setAutoLogRadius(Math.max(10, autoLogRadius - 5))}
                      >
                        -
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2"
                        onClick={() => setAutoLogRadius(Math.min(30, autoLogRadius + 5))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Properties within {autoLogRadius}m will be auto-marked
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Additional Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={isActive ? 'destructive' : 'default'}
              onClick={toggleSession}
              className="gap-2"
            >
              {isActive ? (
                <>
                  <Square className="w-4 h-4" />
                  End Session
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Session
                </>
              )}
            </Button>

            {activePin && (
              <Button
                variant="outline"
                onClick={() => setQrPin(activePin)}
                className="gap-2"
              >
                <QrCode className="w-4 h-4" />
                QR Code
              </Button>
            )}
          </div>

          {/* Sync Button */}
          {!isOnline && pendingActions > 0 && (
            <Button
              variant="outline"
              className="w-full"
              onClick={syncPendingActions}
              disabled={isSyncing}
            >
              {isSyncing ? 'Syncing...' : `Sync ${pendingActions} actions`}
            </Button>
          )}
        </CardContent>
      </Card>

      {qrPin && (
        <PropertyQRCode
          pin={qrPin}
          isOpen={true}
          onClose={() => setQrPin(null)}
        />
      )}
    </div>
  );
};

export default CanvassingMode;
