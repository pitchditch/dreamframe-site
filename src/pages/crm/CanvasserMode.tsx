import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Play, Square, Users, TrendingUp, Navigation, Wifi, WifiOff } from 'lucide-react';
import { toast } from 'sonner';

interface QueuedLocation {
  employee_id: string;
  employee_name: string;
  session_id: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  accuracy?: number;
  heading?: number;
  speed?: number;
}

const CanvasserMode = () => {
  const navigate = useNavigate();
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queuedCount, setQueuedCount] = useState(0);
  const locationWatchId = useRef<number | null>(null);
  const locationSaveInterval = useRef<number | null>(null);
  const syncInterval = useRef<number | null>(null);
  const [sessionData, setSessionData] = useState({
    startTime: null as Date | null,
    propertiesVisited: 0,
    leadsGenerated: 0,
    distance: 0
  });

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Back online! Syncing data...');
      syncQueuedData();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast.warning('You are offline. Data will be queued and synced when back online.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Check queued items count
  useEffect(() => {
    const updateQueueCount = () => {
      const queue = getLocationQueue();
      setQueuedCount(queue.length);
    };
    
    updateQueueCount();
    const interval = setInterval(updateQueueCount, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (locationWatchId.current !== null) {
        navigator.geolocation.clearWatch(locationWatchId.current);
      }
      if (locationSaveInterval.current !== null) {
        clearInterval(locationSaveInterval.current);
      }
      if (syncInterval.current !== null) {
        clearInterval(syncInterval.current);
      }
    };
  }, []);

  // Queue management functions
  const getLocationQueue = (): QueuedLocation[] => {
    const queue = localStorage.getItem('locationQueue');
    return queue ? JSON.parse(queue) : [];
  };

  const addToLocationQueue = (location: QueuedLocation) => {
    const queue = getLocationQueue();
    queue.push(location);
    localStorage.setItem('locationQueue', JSON.stringify(queue));
    setQueuedCount(queue.length);
  };

  const clearLocationQueue = () => {
    localStorage.setItem('locationQueue', JSON.stringify([]));
    setQueuedCount(0);
  };

  // Sync queued data to database
  const syncQueuedData = async () => {
    const queue = getLocationQueue();
    if (queue.length === 0) return;

    try {
      const { error } = await supabase
        .from('employee_locations')
        .insert(queue);

      if (error) throw error;

      clearLocationQueue();
      toast.success(`Synced ${queue.length} location points`);
    } catch (error) {
      console.error('Error syncing queued data:', error);
      toast.error('Failed to sync some data. Will retry.');
    }
  };

  // Save location point (online or queue if offline)
  const saveLocationPoint = async (position: GeolocationPosition) => {
    if (!sessionId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const locationData: QueuedLocation = {
        employee_id: user.id,
        employee_name: user.email || 'Canvasser',
        session_id: sessionId,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: new Date().toISOString(),
        accuracy: position.coords.accuracy,
        heading: position.coords.heading || undefined,
        speed: position.coords.speed || undefined
      };

      if (isOnline) {
        const { error } = await supabase
          .from('employee_locations')
          .insert([locationData]);

        if (error) {
          console.error('Error saving location:', error);
          addToLocationQueue(locationData);
        }
      } else {
        addToLocationQueue(locationData);
      }
    } catch (error) {
      console.error('Error in saveLocationPoint:', error);
    }
  };

  const startLocationTracking = async () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return false;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      setCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setLocationEnabled(true);

      locationWatchId.current = navigator.geolocation.watchPosition(
        (pos) => {
          setCurrentPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        (error) => {
          console.error('Location tracking error:', error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 5000,
          timeout: 10000
        }
      );

      // Save location points every 30 seconds
      locationSaveInterval.current = window.setInterval(async () => {
        navigator.geolocation.getCurrentPosition(
          (pos) => saveLocationPoint(pos),
          (error) => console.error('Error getting position for save:', error),
          { enableHighAccuracy: true }
        );
      }, 30000);

      // Try to sync queued data every minute when online
      syncInterval.current = window.setInterval(() => {
        if (isOnline) {
          syncQueuedData();
        }
      }, 60000);

      return true;
    } catch (error) {
      toast.error('Failed to get location. Please enable location services.');
      return false;
    }
  };

  const handleStartSession = async () => {
    const locationGranted = await startLocationTracking();
    if (!locationGranted) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please log in to start a session');
        return;
      }

      const { data, error } = await supabase
        .from('employee_work_sessions')
        .insert({
          employee_id: user.id,
          employee_name: user.email || 'Canvasser',
          session_start: new Date().toISOString(),
          start_latitude: currentPosition?.lat,
          start_longitude: currentPosition?.lng,
          session_status: 'active'
        })
        .select()
        .single();

      if (error) throw error;

      setSessionId(data.id);
      setSessionActive(true);
      setSessionData({
        startTime: new Date(),
        propertiesVisited: 0,
        leadsGenerated: 0,
        distance: 0
      });
      toast.success('Session started! GPS tracking enabled.');
    } catch (error) {
      console.error('Error starting session:', error);
      toast.error('Failed to start session');
    }
  };

  const handleEndSession = async () => {
    if (!sessionId) return;

    try {
      const duration = sessionData.startTime 
        ? Math.floor((new Date().getTime() - sessionData.startTime.getTime()) / 1000 / 60)
        : 0;

      const { error } = await supabase
        .from('employee_work_sessions')
        .update({
          session_end: new Date().toISOString(),
          end_latitude: currentPosition?.lat,
          end_longitude: currentPosition?.lng,
          session_status: 'completed',
          total_visits: sessionData.propertiesVisited,
          successful_contacts: sessionData.leadsGenerated,
          total_duration_minutes: duration
        })
        .eq('id', sessionId);

      if (error) throw error;

      if (locationWatchId.current !== null) {
        navigator.geolocation.clearWatch(locationWatchId.current);
        locationWatchId.current = null;
      }

      if (locationSaveInterval.current !== null) {
        clearInterval(locationSaveInterval.current);
        locationSaveInterval.current = null;
      }

      if (syncInterval.current !== null) {
        clearInterval(syncInterval.current);
        syncInterval.current = null;
      }

      // Sync any remaining queued data before ending
      await syncQueuedData();

      toast.success(`Session ended! Duration: ${duration} minutes, Properties visited: ${sessionData.propertiesVisited}`);
      
      setSessionActive(false);
      setSessionId(null);
      setLocationEnabled(false);
      setCurrentPosition(null);
      setSessionData({
        startTime: null,
        propertiesVisited: 0,
        leadsGenerated: 0,
        distance: 0
      });
    } catch (error) {
      console.error('Error ending session:', error);
      toast.error('Failed to end session');
    }
  };

  const formatDuration = () => {
    if (!sessionData.startTime) return '0:00';
    const seconds = Math.floor((new Date().getTime() - sessionData.startTime.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/crm')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">Canvasser Mode</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {locationEnabled && (
              <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/30">
                <Navigation className="h-3 w-3 mr-1" />
                GPS Active
              </Badge>
            )}
            {isOnline ? (
              <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/30">
                <Wifi className="h-3 w-3 mr-1" />
                Online
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-orange-500/10 text-orange-700 border-orange-500/30">
                <WifiOff className="h-3 w-3 mr-1" />
                Offline
                {queuedCount > 0 && ` (${queuedCount} queued)`}
              </Badge>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Session Status</CardTitle>
                <CardDescription>
                  {sessionActive ? 'Currently canvassing' : 'No active session'}
                </CardDescription>
              </div>
              {sessionActive && (
                <Badge variant="default" className="animate-pulse">
                  Active
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!sessionActive ? (
              <Button onClick={handleStartSession} className="w-full" size="lg">
                <Play className="w-5 h-5 mr-2" />
                Start Canvassing Session
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {formatDuration()}
                  </div>
                  <p className="text-sm text-muted-foreground">Session Duration</p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{sessionData.propertiesVisited}</div>
                    <p className="text-xs text-muted-foreground">Properties</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{sessionData.leadsGenerated}</div>
                    <p className="text-xs text-muted-foreground">Leads</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{sessionData.distance.toFixed(1)}</div>
                    <p className="text-xs text-muted-foreground">km</p>
                  </div>
                </div>

                <Button onClick={handleEndSession} variant="destructive" className="w-full" size="lg">
                  <Square className="w-5 h-5 mr-2" />
                  End Session
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {sessionActive && (
          <div className="space-y-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/crm/property-capture')}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Quick Capture</CardTitle>
                    <CardDescription>Add a new property</CardDescription>
                  </div>
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Conversion Rate</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-medium">
                        {sessionData.propertiesVisited > 0 
                          ? ((sessionData.leadsGenerated / sessionData.propertiesVisited) * 100).toFixed(0)
                          : 0}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg. Time per Door</span>
                    <span className="font-medium">
                      {sessionData.propertiesVisited > 0 && sessionData.startTime
                        ? `${Math.floor((new Date().getTime() - sessionData.startTime.getTime()) / 1000 / 60 / sessionData.propertiesVisited)} min`
                        : '0 min'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {!sessionActive && (
          <Card>
            <CardHeader>
              <CardTitle>How to Use Canvasser Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <p>Start a session and allow GPS tracking to begin canvassing</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <p>Capture property details as you visit each door</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <p>Your location is tracked for route optimization</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">4</span>
                </div>
                <p>End session when complete to save your results</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default CanvasserMode;
