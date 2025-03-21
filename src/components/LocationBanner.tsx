
import { useState, useEffect, useRef } from 'react';

const locations = [
  "Vancouver",
  "Burnaby",
  "Richmond",
  "Surrey",
  "White Rock",
  "Delta",
  "Langley",
  "Coquitlam",
  "Port Coquitlam",
  "New Westminster",
  "West Vancouver",
  "North Vancouver"
];

const LocationBanner = () => {
  const [currentLocation, setCurrentLocation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Clear any existing timeout to avoid memory leaks
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    // Set animation state to true (fading out)
    setIsAnimating(true);

    // After the fade-out animation completes, change the location
    const animationTimeout = window.setTimeout(() => {
      setCurrentLocation((prev) => (prev + 1) % locations.length);
      // Start fade-in animation
      setIsAnimating(false);
    }, 1000); // Half the rotation time for the animation

    // Set the next rotation
    const rotationTimeout = window.setTimeout(() => {
      // This will trigger the next rotation
      setIsAnimating(true);
    }, 4000); // Total time for each location display

    timeoutRef.current = rotationTimeout;

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      window.clearTimeout(animationTimeout);
    };
  }, [currentLocation]);

  return (
    <div className="bg-bc-red py-3 text-white text-center overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <span className="text-lg font-medium mr-3">We Serve</span>
          <div className="min-w-32 text-center">
            <span 
              className={`text-lg font-medium italic inline-block transition-opacity duration-1000 ${
                isAnimating ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {locations[currentLocation]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationBanner;
