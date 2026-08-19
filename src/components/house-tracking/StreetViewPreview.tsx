import { useEffect, useRef, useState } from 'react';
import { Eye, ImageOff, Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HousePin } from './types';

type PreviewState = 'idle' | 'loading' | 'ready' | 'unavailable' | 'error';

interface StreetViewPreviewProps {
  pin: HousePin;
  onOpen: () => void;
}

let googleMapsPromise: Promise<any> | null = null;

const ensureGoogleMaps = () => {
  const existingGoogle = (window as any).google;
  if (existingGoogle?.maps) return Promise.resolve(existingGoogle);
  if (googleMapsPromise) return googleMapsPromise;

  googleMapsPromise = new Promise((resolve, reject) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      reject(new Error('Google Maps API key is missing'));
      return;
    }

    const finish = () => {
      const google = (window as any).google;
      if (google?.maps) resolve(google);
      else reject(new Error('Google Maps SDK did not initialize'));
    };

    const existingScript = document.querySelector<HTMLScriptElement>('script[src*="maps.googleapis.com/maps/api/js"]');
    if (existingScript) {
      if ((window as any).google?.maps) {
        finish();
        return;
      }
      existingScript.addEventListener('load', finish, { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Google Maps failed to load')), { once: true });
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
    googleMapsPromise = null;
    throw error;
  });

  return googleMapsPromise;
};

const StreetViewPreview = ({ pin, onOpen }: StreetViewPreviewProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const panoramaRef = useRef<HTMLDivElement | null>(null);
  const panoramaInstanceRef = useRef<any>(null);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<PreviewState>('idle');

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !panoramaRef.current) return;

    let cancelled = false;
    setState('loading');

    void ensureGoogleMaps()
      .then((google) => {
        if (cancelled || !panoramaRef.current) return;

        const service = new google.maps.StreetViewService();
        service.getPanorama(
          {
            location: { lat: pin.lat, lng: pin.lng },
            radius: 100,
            source: google.maps.StreetViewSource.OUTDOOR,
          },
          (data: any, status: any) => {
            if (cancelled || !panoramaRef.current) return;
            if (status !== google.maps.StreetViewStatus.OK || !data?.location?.latLng) {
              setState('unavailable');
              return;
            }

            const target = new google.maps.LatLng(pin.lat, pin.lng);
            const heading = google.maps.geometry?.spherical
              ? google.maps.geometry.spherical.computeHeading(data.location.latLng, target)
              : 0;

            panoramaInstanceRef.current = new google.maps.StreetViewPanorama(panoramaRef.current, {
              position: data.location.latLng,
              pov: { heading, pitch: 0 },
              zoom: 1,
              addressControl: false,
              clickToGo: false,
              disableDefaultUI: true,
              enableCloseButton: false,
              fullscreenControl: false,
              linksControl: false,
              motionTracking: false,
              motionTrackingControl: false,
              panControl: false,
              scrollwheel: false,
              showRoadLabels: false,
              zoomControl: false,
            });
            setState('ready');
          },
        );
      })
      .catch(() => {
        if (!cancelled) setState('error');
      });

    return () => {
      cancelled = true;
      if (panoramaInstanceRef.current) {
        panoramaInstanceRef.current.setVisible(false);
        panoramaInstanceRef.current = null;
      }
    };
  }, [pin.id, pin.lat, pin.lng, visible]);

  return (
    <div
      ref={wrapperRef}
      className="relative h-44 overflow-hidden rounded-lg border bg-muted sm:h-48 md:h-full md:min-h-[180px]"
    >
      <div ref={panoramaRef} className={`h-full w-full ${state === 'ready' ? 'pointer-events-none' : ''}`} />

      {(state === 'idle' || state === 'loading') && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-xs font-medium">Loading Street View…</span>
        </div>
      )}

      {(state === 'unavailable' || state === 'error') && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted px-4 text-center text-muted-foreground">
          {state === 'unavailable' ? <ImageOff className="h-5 w-5" /> : <MapPin className="h-5 w-5" />}
          <span className="text-xs font-medium">
            {state === 'unavailable' ? 'No Google Street View found nearby' : 'Street View could not load'}
          </span>
        </div>
      )}

      <div className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 text-[11px] font-semibold text-white shadow-sm">
        Google Street View
      </div>

      <Button
        type="button"
        size="sm"
        variant="secondary"
        className="absolute bottom-2 right-2 h-8 bg-background/95 px-2 text-xs shadow"
        onClick={(event) => {
          event.stopPropagation();
          onOpen();
        }}
      >
        <Eye className="mr-1 h-3.5 w-3.5" />
        Open
      </Button>
    </div>
  );
};

export default StreetViewPreview;
