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
  Square
} from 'lucide-react';
import { toast } from 'sonner';
import PropertyQRCode from './PropertyQRCode';

interface CanvassingModeProps {
  onQuickMark: (pin: HousePin) => void;
  currentLocation: { lat: number; lng: number } | null;
  activePin: HousePin | null;
}

const CanvassingMode: React.FC<CanvassingModeProps> = ({
  onQuickMark,
  currentLocation,
  activePin
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

  useEffect(() => {
    if (isActive && !sessionStart) {
      setSessionStart(new Date());
    }
  }, [isActive, sessionStart]);

  const handleQuickAction = async (status: HousePin['status'], notes?: string) => {
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

    onQuickMark(pin);
    setVisitCount(prev => prev + 1);
    
    toast.success(`Marked as ${status}`, {
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
          {isActive && (
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
                className="flex-col h-20 gap-1 border-green-500 text-green-600"
                onClick={() => handleQuickAction('visited', 'Contact made')}
              >
                <Check className="w-5 h-5" />
                <span className="text-xs">Visited</span>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="flex-col h-20 gap-1 border-red-500 text-red-600"
                onClick={() => handleQuickAction('not-interested')}
              >
                <X className="w-5 h-5" />
                <span className="text-xs">Skip</span>
              </Button>
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
