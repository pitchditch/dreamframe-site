import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar, Clock, MapPin, Navigation, Route as RouteIcon } from 'lucide-react';
import { loadD2DCloudRouteState } from '@/utils/d2dCloud';
import { routeProgressBreakdown } from '@/utils/d2dRouteRuntime';
import { RouteSession } from '@/components/house-tracking/types';
import 'leaflet/dist/leaflet.css';

interface LegacySession {
  id: string;
  employee_name: string;
  session_start: string;
  session_end: string | null;
  total_visits: number;
  successful_contacts: number;
  total_duration_minutes: number | null;
  session_status: string;
}

interface LegacyLocation {
  session_id: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface UnifiedHistoryRoute {
  id: string;
  name: string;
  source: string;
  startTime: string;
  endTime?: string;
  durationSeconds?: number;
  distanceMeters?: number;
  totalStops: number;
  workedStops: number;
  unvisitedStops: number;
  interestedStops: number;
  quoteStops: number;
  notInterestedStops: number;
  completedJobs: number;
  workedRate: number;
  successfulContacts?: number;
  status: 'planned' | 'active' | 'completed';
  path: Array<{ lat: number; lng: number }>;
}

const normalizeDurationSeconds = (value?: number) => {
  if (!value || value <= 0) return undefined;
  // Older GPS sessions stored elapsed milliseconds; newer planned routes use seconds.
  return value > 86400 ? Math.round(value / 1000) : Math.round(value);
};

const sourceLabel = (source: string) => {
  switch (source) {
    case 'auto-street': return 'Auto street';
    case 'storefront': return 'Storefront';
    case 'gps-session': return 'Field session';
    case 'legacy-canvassing': return 'Legacy session';
    default: return 'Manual';
  }
};

const normalizeFieldRoute = (route: RouteSession): UnifiedHistoryRoute => {
  const stopMetrics = route.stops?.length ? routeProgressBreakdown(route.stops) : null;
  const totalStops = stopMetrics?.total ?? route.totalStops ?? route.homesVisited ?? 0;
  const workedStops = stopMetrics?.worked ?? route.workedStops ?? route.completedStops ?? route.homesVisited ?? 0;
  const unvisitedStops = stopMetrics?.unvisited ?? Math.max(0, totalStops - workedStops);
  const workedRate = stopMetrics?.workedRate ?? route.completionRate ?? (
    totalStops > 0 ? Math.min(100, workedStops / totalStops * 100) : 0
  );

  return {
    id: route.id,
    name: route.name,
    source: route.source || 'manual',
    startTime: route.startTime,
    endTime: route.endTime,
    durationSeconds: normalizeDurationSeconds(route.duration),
    distanceMeters: route.distance,
    totalStops,
    workedStops,
    unvisitedStops,
    interestedStops: stopMetrics?.interested ?? route.interestedStops ?? 0,
    quoteStops: stopMetrics?.quotes ?? route.quoteStops ?? 0,
    notInterestedStops: stopMetrics?.notInterested ?? route.notInterestedStops ?? 0,
    completedJobs: stopMetrics?.completedJobs ?? route.completedJobs ?? 0,
    workedRate,
    status: route.isActive ? 'active' : route.endTime ? 'completed' : 'planned',
    path: (route.path || []).map((point) => ({ lat: point.lat, lng: point.lng })),
  };
};

const formatDuration = (seconds?: number) => {
  if (!seconds) return 'N/A';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

const formatDistance = (meters?: number) => {
  if (!meters || meters <= 0) return 'N/A';
  return meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${Math.round(meters)} m`;
};

export default function RouteHistory() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [routes, setRoutes] = useState<UnifiedHistoryRoute[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<UnifiedHistoryRoute | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const routeLayerRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    const initializeMap = async () => {
      if (!mapRef.current || mapInstanceRef.current) return;
      const leafletModule = await import('leaflet');
      const L = leafletModule.default || leafletModule;

      if (L.Icon && L.Icon.Default) {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
      }

      mapInstanceRef.current = L.map(mapRef.current).setView([49.0504, -122.8048], 11);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapInstanceRef.current);
    };

    const loadRoutes = async () => {
      try {
        const [fieldState, legacySessionsResult, legacyLocationsResult] = await Promise.all([
          loadD2DCloudRouteState(),
          supabase
            .from('employee_work_sessions')
            .select('id,employee_name,session_start,session_end,total_visits,successful_contacts,total_duration_minutes,session_status')
            .order('session_start', { ascending: false })
            .limit(50),
          supabase
            .from('employee_locations')
            .select('session_id,latitude,longitude,timestamp')
            .order('timestamp', { ascending: true }),
        ]);

        if (legacySessionsResult.error) throw legacySessionsResult.error;
        if (legacyLocationsResult.error) throw legacyLocationsResult.error;
        if (cancelled) return;

        const unified = fieldState.routes.map(normalizeFieldRoute);
        const locationsBySession = new Map<string, LegacyLocation[]>();
        ((legacyLocationsResult.data || []) as LegacyLocation[]).forEach((location) => {
          const existing = locationsBySession.get(location.session_id) || [];
          existing.push(location);
          locationsBySession.set(location.session_id, existing);
        });

        ((legacySessionsResult.data || []) as LegacySession[]).forEach((session) => {
          if (unified.some((route) => route.id === session.id)) return;
          const sessionLocations = locationsBySession.get(session.id) || [];
          const completed = session.session_status === 'completed';
          const totalVisits = session.total_visits || 0;
          unified.push({
            id: session.id,
            name: session.employee_name ? `${session.employee_name} canvassing` : 'Canvassing session',
            source: 'legacy-canvassing',
            startTime: session.session_start,
            endTime: session.session_end || undefined,
            durationSeconds: session.total_duration_minutes ? session.total_duration_minutes * 60 : undefined,
            totalStops: totalVisits,
            workedStops: totalVisits,
            unvisitedStops: 0,
            interestedStops: 0,
            quoteStops: 0,
            notInterestedStops: 0,
            completedJobs: 0,
            successfulContacts: session.successful_contacts || 0,
            workedRate: completed && totalVisits > 0 ? 100 : totalVisits > 0 ? 100 : 0,
            status: session.session_status === 'active' ? 'active' : completed ? 'completed' : 'planned',
            path: sessionLocations.map((location) => ({
              lat: Number(location.latitude),
              lng: Number(location.longitude),
            })),
          });
        });

        unified.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
        setRoutes(unified);
        if (unified.length > 0) setSelectedRoute((current) => current || unified[0]);
      } catch (error) {
        console.error('Error loading unified route history:', error);
        toast({
          title: 'Error',
          description: 'Failed to load route history',
          variant: 'destructive',
        });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void initializeMap();
    void loadRoutes();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [toast]);

  useEffect(() => {
    if (!mapInstanceRef.current || !selectedRoute) return;

    const drawRoute = async () => {
      const leafletModule = await import('leaflet');
      const L = leafletModule.default || leafletModule;
      if (!mapInstanceRef.current) return;

      if (routeLayerRef.current) {
        mapInstanceRef.current.removeLayer(routeLayerRef.current);
        routeLayerRef.current = null;
      }

      const coords = selectedRoute.path
        .filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lng))
        .map((point) => [point.lat, point.lng] as [number, number]);

      if (coords.length >= 2) {
        routeLayerRef.current = L.polyline(coords, { color: '#2563eb', weight: 4 }).addTo(mapInstanceRef.current);
        mapInstanceRef.current.fitBounds(coords, { padding: [24, 24] });
      } else if (coords.length === 1) {
        mapInstanceRef.current.setView(coords[0], 16);
      }
    };

    void drawRoute();
  }, [selectedRoute]);

  const statusClass = (status: UnifiedHistoryRoute['status']) => {
    if (status === 'active') return 'bg-green-500';
    if (status === 'completed') return 'bg-blue-500';
    return 'bg-slate-500';
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="text-lg">Loading route history...</div></div>;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate('/house-tracking')}><ArrowLeft className="h-4 w-4 mr-2" />Back to D2D</Button>
          <div className="flex items-center gap-2">
            <Navigation className="h-6 w-6 text-primary" />
            <div><h1 className="text-3xl font-bold">Route History</h1><p className="text-sm text-muted-foreground">Auto streets, storefront routes and field sessions in one timeline.</p></div>
          </div>
        </div>

        <Card className="mb-6"><CardContent className="p-0"><div ref={mapRef} style={{ height: '400px', width: '100%' }} /></CardContent></Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {routes.length === 0 ? (
              <Card className="p-8 text-center"><RouteIcon className="h-10 w-10 mx-auto mb-3 text-muted-foreground" /><p className="text-muted-foreground">No routes have been created yet.</p><Button className="mt-4" onClick={() => navigate('/house-tracking')}>Open D2D Map</Button></Card>
            ) : routes.map((route) => (
              <Card key={route.id} className={`cursor-pointer transition-all ${selectedRoute?.id === route.id ? 'ring-2 ring-primary' : 'hover:shadow-lg'}`} onClick={() => setSelectedRoute(route)}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2"><CardTitle className="text-lg truncate">{route.name}</CardTitle><Badge variant="outline">{sourceLabel(route.source)}</Badge><Badge className={statusClass(route.status)}>{route.status}</Badge></div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"><div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(route.startTime).toLocaleDateString()}</div><div className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(route.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div><div className="text-2xl font-bold">{route.totalStops}</div><div className="text-xs text-muted-foreground">Stops</div></div>
                    <div><div className="text-2xl font-bold">{route.workedStops}</div><div className="text-xs text-muted-foreground">Worked</div></div>
                    <div><div className="text-2xl font-bold">{route.completedJobs}</div><div className="text-xs text-muted-foreground">Jobs Complete</div></div>
                    <div><div className="text-2xl font-bold">{formatDuration(route.durationSeconds)}</div><div className="text-xs text-muted-foreground">Duration</div></div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <Badge variant="outline">{route.unvisitedStops} unvisited</Badge>
                    <Badge variant="outline">{route.interestedStops} interested</Badge>
                    <Badge variant="outline">{route.quoteStops} quotes</Badge>
                    <Badge variant="outline">{route.notInterestedStops} not interested</Badge>
                    <Badge variant="secondary">{Math.round(route.workedRate)}% worked</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            {selectedRoute ? (
              <Card className="sticky top-6">
                <CardHeader><CardTitle>Route Details</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div><p className="text-sm font-medium mb-1">Route</p><p className="text-sm text-muted-foreground">{selectedRoute.name}</p></div>
                  <div className="flex gap-2 flex-wrap"><Badge variant="outline">{sourceLabel(selectedRoute.source)}</Badge><Badge className={statusClass(selectedRoute.status)}>{selectedRoute.status}</Badge></div>
                  <div><p className="text-sm font-medium mb-1">Start</p><p className="text-sm text-muted-foreground">{new Date(selectedRoute.startTime).toLocaleString()}</p></div>
                  {selectedRoute.endTime && <div><p className="text-sm font-medium mb-1">End</p><p className="text-sm text-muted-foreground">{new Date(selectedRoute.endTime).toLocaleString()}</p></div>}
                  <div className="pt-4 border-t space-y-3">
                    <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Stops</span><span className="font-medium">{selectedRoute.totalStops}</span></div>
                    <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Worked</span><span className="font-medium">{selectedRoute.workedStops}</span></div>
                    <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Unvisited</span><span className="font-medium">{selectedRoute.unvisitedStops}</span></div>
                    <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Interested</span><span className="font-medium">{selectedRoute.interestedStops}</span></div>
                    <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Quotes</span><span className="font-medium">{selectedRoute.quoteStops}</span></div>
                    <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Not interested</span><span className="font-medium">{selectedRoute.notInterestedStops}</span></div>
                    <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Jobs complete</span><span className="font-medium">{selectedRoute.completedJobs}</span></div>
                    {typeof selectedRoute.successfulContacts === 'number' && <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Legacy contacts</span><span className="font-medium">{selectedRoute.successfulContacts}</span></div>}
                    <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Worked rate</span><span className="font-medium">{Math.round(selectedRoute.workedRate)}%</span></div>
                    <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Duration</span><span className="font-medium">{formatDuration(selectedRoute.durationSeconds)}</span></div>
                    <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Distance</span><span className="font-medium">{formatDistance(selectedRoute.distanceMeters)}</span></div>
                    <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Map points</span><span className="font-medium flex items-center gap-1"><MapPin className="h-3 w-3" />{selectedRoute.path.length}</span></div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="sticky top-6"><CardContent className="py-12 text-center"><MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" /><p className="text-muted-foreground">Select a route to view details.</p></CardContent></Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
