import { useEffect, useRef, useState } from 'react';
import { Navigation, LocateFixed } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LiveFieldTrackerProps {
  currentLocation: { lat: number; lng: number } | null;
  active: boolean;
}

let mapsPromise: Promise<any> | null = null;

const ensureGoogleMaps = () => {
  const google = (window as any).google;
  if (google?.maps) return Promise.resolve(google);
  if (mapsPromise) return mapsPromise;

  mapsPromise = new Promise((resolve, reject) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      reject(new Error('Google Maps API key missing'));
      return;
    }

    const finish = () => {
      const loaded = (window as any).google;
      if (loaded?.maps) resolve(loaded);
      else reject(new Error('Google Maps did not initialize'));
    };

    const existing = document.querySelector<HTMLScriptElement>('script[src*="maps.googleapis.com/maps/api/js"]');
    if (existing) {
      existing.addEventListener('load', finish, { once: true });
      existing.addEventListener('error', () => reject(new Error('Google Maps failed to load')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', finish, { once: true });
    script.addEventListener('error', () => reject(new Error('Google Maps failed to load')), { once: true });
    document.head.appendChild(script);
  }).catch((error) => {
    mapsPromise = null;
    throw error;
  });

  return mapsPromise;
};

const LiveFieldTracker = ({ currentLocation, active }: LiveFieldTrackerProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const lineRef = useRef<any>(null);
  const pathRef = useRef<Array<{ lat: number; lng: number }>>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!active || !elementRef.current || mapRef.current) return;
    let cancelled = false;

    void ensureGoogleMaps()
      .then((google) => {
        if (cancelled || !elementRef.current) return;
        const center = currentLocation || { lat: 49.0504, lng: -122.8048 };
        mapRef.current = new google.maps.Map(elementRef.current, {
          center,
          zoom: currentLocation ? 18 : 13,
          mapTypeId: 'roadmap',
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: 'greedy',
        });

        markerRef.current = new google.maps.Marker({
          position: center,
          map: mapRef.current,
          title: 'Your live location',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 9,
            fillColor: '#2563eb',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3,
          },
        });

        lineRef.current = new google.maps.Polyline({
          path: [],
          geodesic: true,
          strokeColor: '#2563eb',
          strokeOpacity: 0.9,
          strokeWeight: 5,
          map: mapRef.current,
        });
        setReady(true);
      })
      .catch((error) => console.error('Live field map failed:', error));

    return () => {
      cancelled = true;
      markerRef.current?.setMap(null);
      lineRef.current?.setMap(null);
      markerRef.current = null;
      lineRef.current = null;
      mapRef.current = null;
      pathRef.current = [];
      setReady(false);
    };
  }, [active]);

  useEffect(() => {
    if (!active || !currentLocation || !mapRef.current || !markerRef.current) return;
    const point = { lat: currentLocation.lat, lng: currentLocation.lng };
    const previous = pathRef.current[pathRef.current.length - 1];
    const different = !previous || Math.abs(previous.lat - point.lat) > 0.00001 || Math.abs(previous.lng - point.lng) > 0.00001;
    if (different) {
      pathRef.current = [...pathRef.current, point].slice(-2500);
      lineRef.current?.setPath(pathRef.current);
    }
    markerRef.current.setPosition(point);
    mapRef.current.panTo(point);
    if (mapRef.current.getZoom() < 17) mapRef.current.setZoom(18);
  }, [active, currentLocation]);

  if (!active) return null;

  return (
    <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
      <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
        <div className="flex items-center gap-2 text-sm font-semibold"><Navigation className="h-4 w-4 text-primary" />Live Route</div>
        <Badge variant={currentLocation ? 'default' : 'secondary'} className="gap-1">
          <LocateFixed className="h-3 w-3" />{currentLocation ? 'Following GPS' : ready ? 'Waiting for GPS' : 'Loading'}
        </Badge>
      </div>
      <div ref={elementRef} className="h-52 w-full sm:h-64" />
    </div>
  );
};

export default LiveFieldTracker;
