import { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowRight, Clock3, Leaf, MapPin, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  extendedServiceArea,
  extendedServiceCities,
  primaryServiceArea,
  primaryServiceCities,
  whiteRockBase,
} from '@/data/serviceAreas';
import './ServiceAreaMap.css';

const ServiceAreaMap = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const map = L.map(container, {
      attributionControl: true,
      scrollWheelZoom: false,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    const extendedPolygon = L.polygon(extendedServiceArea, {
      color: '#f87171',
      dashArray: '8 7',
      fillColor: '#fecaca',
      fillOpacity: 0.28,
      weight: 2,
    }).addTo(map);

    extendedPolygon.bindTooltip('Extended Service Area', {
      className: 'bc-map-tooltip',
      direction: 'center',
      sticky: true,
    });

    const primaryPolygon = L.polygon(primaryServiceArea, {
      color: '#dc2626',
      fillColor: '#ef4444',
      fillOpacity: 0.32,
      weight: 3,
    }).addTo(map);

    primaryPolygon.bindTooltip('Primary Service Area', {
      className: 'bc-map-tooltip',
      direction: 'center',
      sticky: true,
    });

    L.circleMarker(whiteRockBase, {
      color: '#ffffff',
      fillColor: '#dc2626',
      fillOpacity: 1,
      radius: 9,
      weight: 4,
    })
      .addTo(map)
      .bindTooltip('Based in White Rock', {
        className: 'bc-map-tooltip',
        direction: 'top',
        offset: [0, -10],
        permanent: true,
      });

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    map.fitBounds(L.latLngBounds(extendedServiceArea), {
      padding: [24, 24],
    });

    window.setTimeout(() => map.invalidateSize(), 0);

    return () => {
      map.remove();
      delete (container as HTMLDivElement & { _leaflet_id?: number })._leaflet_id;
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
      <div className="grid lg:grid-cols-[0.82fr_1.5fr]">
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300">
              <MapPin className="h-4 w-4" />
              Based in White Rock, BC
            </div>

            <h2 className="max-w-md text-3xl font-black tracking-tight text-white sm:text-4xl">
              Serving the Lower Mainland and Fraser Valley
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
              Fast local service in our core area, with reliable scheduling throughout the wider region.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-red-500 ring-4 ring-red-500/20" />
                  <h3 className="font-bold text-white">Primary Service Area</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {primaryServiceCities.join(' · ')}
                </p>
              </div>

              <div className="rounded-2xl border border-rose-200/15 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-rose-200 ring-4 ring-rose-200/10" />
                  <h3 className="font-bold text-white">Extended Service Area</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {extendedServiceCities.join(' · ')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/calculator"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-500 sm:w-auto"
            >
              Check My Address
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-xs leading-5 text-slate-400">
              Coverage shown is approximate. Final availability is confirmed after we review the property address.
            </p>
          </div>
        </div>

        <div className="relative min-h-[390px] border-t border-white/10 bg-slate-200 lg:min-h-[540px] lg:border-l lg:border-t-0">
          <div
            ref={mapContainerRef}
            className="service-area-map absolute inset-0 z-0"
            aria-label="Interactive map showing BC Pressure Washing service areas"
          />

          <div className="pointer-events-none absolute left-4 top-4 z-[500] flex flex-wrap gap-2 sm:left-6 sm:top-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-xs font-bold text-slate-900 shadow-lg backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
              Primary
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-xs font-bold text-slate-900 shadow-lg backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-200 ring-1 ring-rose-300" />
              Extended
            </span>
          </div>
        </div>
      </div>

      <div className="grid border-t border-white/10 sm:grid-cols-3">
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5 sm:border-b-0 sm:border-r">
          <ShieldCheck className="h-6 w-6 shrink-0 text-red-400" />
          <div>
            <p className="font-bold text-white">Fully Insured</p>
            <p className="text-sm text-slate-400">WCB covered</p>
          </div>
        </div>
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5 sm:border-b-0 sm:border-r">
          <Clock3 className="h-6 w-6 shrink-0 text-red-400" />
          <div>
            <p className="font-bold text-white">Fast Scheduling</p>
            <p className="text-sm text-slate-400">Priority local availability</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-5">
          <Leaf className="h-6 w-6 shrink-0 text-red-400" />
          <div>
            <p className="font-bold text-white">Property-Safe Cleaning</p>
            <p className="text-sm text-slate-400">Service matched to the surface</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceAreaMap;
