import React, { useEffect, useRef, useState } from 'react';
import { Eye, ExternalLink, ImageOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { HousePin } from './types';

interface StreetViewDialogProps {
  pin: HousePin | null;
  onClose: () => void;
}

type ViewState = 'idle' | 'loading' | 'ready' | 'unavailable' | 'error';

let mapsPromise: Promise<any> | null = null;

const ensureGoogleMaps = () => {
  const google = (window as any).google;
  if (google?.maps) return Promise.resolve(google);
  if (mapsPromise) return mapsPromise;

  mapsPromise = new Promise((resolve, reject) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      reject(new Error('Google Maps API key is missing'));
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

const StreetViewDialog: React.FC<StreetViewDialogProps> = ({ pin, onClose }) => {
  const panoramaElementRef = useRef<HTMLDivElement | null>(null);
  const panoramaRef = useRef<any>(null);
  const [state, setState] = useState<ViewState>('idle');

  useEffect(() => {
    if (!pin || !panoramaElementRef.current) {
      setState('idle');
      return;
    }

    let cancelled = false;
    setState('loading');

    void ensureGoogleMaps()
      .then((google) => {
        if (cancelled || !panoramaElementRef.current) return;

        const service = new google.maps.StreetViewService();
        service.getPanorama(
          {
            location: { lat: pin.lat, lng: pin.lng },
            radius: 120,
            source: google.maps.StreetViewSource.OUTDOOR,
          },
          (data: any, status: any) => {
            if (cancelled || !panoramaElementRef.current) return;
            if (status !== google.maps.StreetViewStatus.OK || !data?.location?.latLng) {
              setState('unavailable');
              return;
            }

            const target = new google.maps.LatLng(pin.lat, pin.lng);
            const heading = google.maps.geometry?.spherical
              ? google.maps.geometry.spherical.computeHeading(data.location.latLng, target)
              : 0;

            panoramaRef.current = new google.maps.StreetViewPanorama(panoramaElementRef.current, {
              position: data.location.latLng,
              pov: { heading, pitch: 0 },
              zoom: 1,
              addressControl: true,
              clickToGo: true,
              fullscreenControl: true,
              linksControl: true,
              motionTracking: false,
              panControl: true,
              scrollwheel: true,
              showRoadLabels: true,
              zoomControl: true,
            });
            setState('ready');
          },
        );
      })
      .catch((error) => {
        console.error('Street View failed:', error);
        if (!cancelled) setState('error');
      });

    return () => {
      cancelled = true;
      if (panoramaRef.current) {
        panoramaRef.current.setVisible(false);
        panoramaRef.current = null;
      }
    };
  }, [pin?.id, pin?.lat, pin?.lng]);

  const mapsUrl = pin
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${pin.lat},${pin.lng}`)}`
    : '#';

  return (
    <Dialog open={Boolean(pin)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex h-[86vh] w-[96vw] max-w-5xl flex-col p-4 sm:p-6">
        <DialogHeader className="shrink-0">
          <DialogTitle className="flex items-center gap-2 pr-8">
            <Eye className="h-5 w-5" />
            <span className="truncate">Street View: {pin?.address}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg border bg-muted">
          <div ref={panoramaElementRef} className="h-full w-full" />

          {(state === 'idle' || state === 'loading') && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-sm font-medium">Loading Google Street View…</span>
            </div>
          )}

          {(state === 'unavailable' || state === 'error') && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted px-6 text-center text-muted-foreground">
              <ImageOff className="h-8 w-8" />
              <div>
                <p className="font-medium text-foreground">
                  {state === 'unavailable' ? 'No Street View imagery found nearby' : 'Street View could not load'}
                </p>
                <p className="mt-1 text-sm">The saved property location is still available in Google Maps.</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-col gap-2 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 text-xs text-muted-foreground sm:text-sm">
            {pin && (
              <>
                <span>{pin.lat.toFixed(6)}, {pin.lng.toFixed(6)}</span>
                {pin.customerName && <span className="ml-3">Customer: {pin.customerName}</span>}
              </>
            )}
          </div>
          <div className="flex gap-2">
            {pin && (
              <Button asChild variant="outline">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Google Maps
                </a>
              </Button>
            )}
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StreetViewDialog;
