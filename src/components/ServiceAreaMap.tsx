
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const ServiceAreaMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmNwcmVzc3VyZXdhc2hpbmciLCJhIjoiY2x0ejhqeHMwMGM4ODJrcnp0ZHR1eW5sbiJ9.6g5QBVEE6wTPexRMPMzZmg';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-122.8434, 49.1329], // Surrey coordinates
      zoom: 10,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add service area polygon
    map.current.on('load', () => {
      map.current?.addSource('service-area', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-123.0234, 49.3289], // Vancouver area
              [-122.5634, 49.3289],
              [-122.5634, 48.9989],
              [-123.0234, 48.9989],
              [-123.0234, 49.3289]
            ]]
          }
        }
      });

      map.current?.addLayer({
        id: 'service-area-fill',
        type: 'fill',
        source: 'service-area',
        paint: {
          'fill-color': '#dc2626',
          'fill-opacity': 0.2
        }
      });

      map.current?.addLayer({
        id: 'service-area-border',
        type: 'line',
        source: 'service-area',
        paint: {
          'line-color': '#dc2626',
          'line-width': 2
        }
      });
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="h-[300px] w-full rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default ServiceAreaMap;
