import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { HousePin } from '@/components/house-tracking/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, MapPin, Layers } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiamF5ZGVuZjM4MDAiLCJhIjoiY200Mmx1bm0yMGp3ZzJxb2kxeWlqNmI3ZSJ9.gPT0xT0t5dYGPTRe_xcvHA';

export default function MapView() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [properties, setProperties] = useState<HousePin[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [routeLocations, setRouteLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<HousePin | null>(null);
  const [showRoutes, setShowRoutes] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    fetchProperties();
    fetchSessions();
    fetchRouteLocations();
  }, []);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-123.1207, 49.2827], // Vancouver default
      zoom: 12
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current || properties.length === 0) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add markers for each property
    properties.forEach(property => {
      const color = getStatusColor(property.status);
      
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.backgroundColor = color;
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.cursor = 'pointer';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

      const marker = new mapboxgl.Marker(el)
        .setLngLat([property.lng, property.lat])
        .addTo(map.current!);

      el.addEventListener('click', () => {
        setSelectedProperty(property);
      });

      markers.current.push(marker);
    });

    // Fit bounds to show all markers
    if (properties.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      properties.forEach(property => {
        bounds.extend([property.lng, property.lat]);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, [properties]);

  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded() || routeLocations.length === 0 || sessions.length === 0) return;

    // Group locations by session
    const sessionRoutes = sessions.map(session => {
      const locations = routeLocations.filter(loc => loc.session_id === session.id);
      return {
        session,
        locations: locations.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      };
    }).filter(route => route.locations.length > 0);

    // Remove existing route layers and sources
    sessionRoutes.forEach((_, index) => {
      const layerId = `route-${index}`;
      if (map.current?.getLayer(layerId)) {
        map.current.removeLayer(layerId);
      }
      if (map.current?.getSource(layerId)) {
        map.current.removeSource(layerId);
      }
    });

    if (!showRoutes) return;

    // Add route lines for each session
    sessionRoutes.forEach((route, index) => {
      const coordinates = route.locations.map(loc => [loc.longitude, loc.latitude]);
      
      if (coordinates.length < 2) return;

      const layerId = `route-${index}`;
      const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
      const color = colors[index % colors.length];

      map.current?.addSource(layerId, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { sessionId: route.session.id },
          geometry: {
            type: 'LineString',
            coordinates
          }
        }
      });

      map.current?.addLayer({
        id: layerId,
        type: 'line',
        source: layerId,
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': color,
          'line-width': 3,
          'line-opacity': 0.8
        }
      });

      // Add click handler for route
      map.current?.on('click', layerId, () => {
        setSelectedRoute(route.session);
      });

      map.current?.on('mouseenter', layerId, () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current?.on('mouseleave', layerId, () => {
        if (map.current) map.current.getCanvas().style.cursor = '';
      });
    });
  }, [routeLocations, sessions, showRoutes]);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProperties(data.map(prop => ({
        id: prop.id,
        lat: prop.lat,
        lng: prop.lng,
        address: prop.address_line1 || '',
        status: prop.status as any || 'interested',
        notes: prop.notes || '',
        dateAdded: prop.created_at,
        customerName: prop.customer_name,
        phoneNumber: prop.phone_number,
        email: prop.email,
        followUpDate: prop.follow_up_date,
        leadScore: prop.lead_score as any,
        squareFootage: prop.living_sqft,
        leadSource: prop.lead_source as any
      })));
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        title: 'Error',
        description: 'Failed to load properties',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('employee_work_sessions')
        .select('*')
        .order('session_start', { ascending: false })
        .limit(20);

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchRouteLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('employee_locations')
        .select('*')
        .order('timestamp', { ascending: true });

      if (error) throw error;
      setRouteLocations(data || []);
    } catch (error) {
      console.error('Error fetching route locations:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'visited': '#3b82f6',
      'interested': '#22c55e',
      'not-interested': '#6b7280',
      'completed': '#a855f7',
      'revisit-later': '#eab308',
      'needs-quote': '#f97316'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'visited': 'Visited',
      'interested': 'Interested',
      'not-interested': 'Not Interested',
      'completed': 'Completed',
      'revisit-later': 'Revisit Later',
      'needs-quote': 'Needs Quote'
    };
    return labels[status] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/house-tracking?tab=crm')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to CRM
          </Button>
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">Map View</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {properties.length} properties
          </div>
          <Button
            variant={showRoutes ? "default" : "outline"}
            size="sm"
            onClick={() => setShowRoutes(!showRoutes)}
          >
            {showRoutes ? 'Hide Routes' : 'Show Routes'}
          </Button>
        </div>
      </div>

      <div className="flex-1 relative">
        <div ref={mapContainer} className="absolute inset-0" />
        
        {selectedProperty && (
          <Card className="absolute top-4 right-4 w-80 shadow-lg z-10">
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{selectedProperty.address}</h3>
                  <Badge style={{ backgroundColor: getStatusColor(selectedProperty.status) }}>
                    {getStatusLabel(selectedProperty.status)}
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedProperty(null)}
                >
                  ×
                </Button>
              </div>
              
              {selectedProperty.customerName && (
                <div className="text-sm">
                  <span className="font-medium">Customer: </span>
                  {selectedProperty.customerName}
                </div>
              )}
              
              {selectedProperty.phoneNumber && (
                <div className="text-sm">
                  <span className="font-medium">Phone: </span>
                  {selectedProperty.phoneNumber}
                </div>
              )}
              
              {selectedProperty.squareFootage && (
                <div className="text-sm">
                  <span className="font-medium">Size: </span>
                  {selectedProperty.squareFootage} sq ft
                </div>
              )}
              
              {selectedProperty.leadScore && (
                <div className="text-sm">
                  <span className="font-medium">Priority: </span>
                  {selectedProperty.leadScore}
                </div>
              )}
              
              <Button 
                className="w-full mt-2"
                onClick={() => navigate('/house-tracking?tab=list')}
              >
                View in List
              </Button>
            </div>
          </Card>
        )}

        {selectedRoute && (
          <Card className="absolute top-4 left-1/2 -translate-x-1/2 w-96 shadow-lg z-10">
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{selectedRoute.employee_name}</h3>
                  <Badge>{selectedRoute.session_status}</Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedRoute(null)}
                >
                  ×
                </Button>
              </div>
              
              <div className="text-sm space-y-2">
                <div>
                  <span className="font-medium">Start: </span>
                  {new Date(selectedRoute.session_start).toLocaleString()}
                </div>
                {selectedRoute.session_end && (
                  <div>
                    <span className="font-medium">End: </span>
                    {new Date(selectedRoute.session_end).toLocaleString()}
                  </div>
                )}
                <div>
                  <span className="font-medium">Visits: </span>
                  {selectedRoute.total_visits || 0}
                </div>
                <div>
                  <span className="font-medium">Contacts: </span>
                  {selectedRoute.successful_contacts || 0}
                </div>
              </div>
              
              <Button 
                className="w-full mt-2"
                onClick={() => navigate('/crm/routes')}
              >
                View Full History
              </Button>
            </div>
          </Card>
        )}

        <Card className="absolute bottom-4 left-4 p-3 space-y-2">
          <div className="text-sm font-semibold mb-2">Legend</div>
          {[
            { status: 'interested', label: 'Interested' },
            { status: 'visited', label: 'Visited' },
            { status: 'needs-quote', label: 'Needs Quote' },
            { status: 'completed', label: 'Completed' },
            { status: 'revisit-later', label: 'Revisit Later' },
            { status: 'not-interested', label: 'Not Interested' }
          ].map(({ status, label }) => (
            <div key={status} className="flex items-center gap-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full border border-white"
                style={{ backgroundColor: getStatusColor(status) }}
              />
              <span>{label}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
