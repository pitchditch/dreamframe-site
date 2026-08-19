import React, { useEffect, useState } from 'react';
import MapComponentFixed from './MapComponentFixed';

const MapComponent: React.FC<React.ComponentProps<typeof MapComponentFixed>> = (props) => {
  const [, setMapReadyTick] = useState(0);

  useEffect(() => {
    if ((window as any).google?.maps) {
      setMapReadyTick((value) => value + 1);
      return;
    }

    const interval = window.setInterval(() => {
      if ((window as any).google?.maps) {
        window.clearInterval(interval);
        setMapReadyTick((value) => value + 1);
      }
    }, 100);

    return () => window.clearInterval(interval);
  }, []);

  return React.createElement(MapComponentFixed, {
    ...props,
    pins: [...props.pins],
    routes: [...props.routes],
  });
};

export default MapComponent;
