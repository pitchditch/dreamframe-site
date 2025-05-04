
import React, { useState, useEffect, useRef } from 'react';

// Random postal codes from the lower mainland
const postalCodes = [
  "V4A 1B2", "V3S 5T6", "V3W 1N5", "V4E 3K1", 
  "V3S 9A5", "V3X 2L3", "V3R 8T9", "V4P 1A3"
];

const ghostMessages = [
  "Enter your postal code...",
  "e.g. V3S 5T6",
  "Try V4A 1B2",
  "Enter V4E 3K1"
];

const CitiesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentGhostIndex, setCurrentGhostIndex] = useState(0);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);
  const [inactive, setInactive] = useState(false);
  
  // Function to reset inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    
    if (inactive) {
      setInactive(false);
      document.querySelectorAll('.site-logo').forEach(logo => {
        logo.classList.remove('logo-inactive-spin');
      });
    }
    
    // Set new timer for 30 seconds of inactivity
    const newTimer = setTimeout(() => {
      setInactive(true);
      document.querySelectorAll('.site-logo').forEach(logo => {
        logo.classList.add('logo-inactive-spin');
      });
    }, 30000);
    
    setInactivityTimer(newTimer);
  };
  
  useEffect(() => {
    // Set up user activity listeners
    const events = ["mousemove", "mousedown", "keypress", "touchstart", "scroll"];
    
    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, resetInactivityTimer);
    });
    
    // Initialize timer
    resetInactivityTimer();
    
    // City carousel effect
    const cityInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % postalCodes.length);
    }, 2000);
    
    // Ghost message effect
    const ghostInterval = setInterval(() => {
      setCurrentGhostIndex((prevIndex) => (prevIndex + 1) % ghostMessages.length);
    }, 4000);
    
    return () => {
      // Clean up all event listeners and intervals
      events.forEach(event => {
        window.removeEventListener(event, resetInactivityTimer);
      });
      if (inactivityTimer) clearTimeout(inactivityTimer);
      clearInterval(cityInterval);
      clearInterval(ghostInterval);
    };
  }, [inactivityTimer, inactive]);
  
  return (
    <div className="py-4 bg-gradient-to-r from-blue-600 to-bc-red text-white text-center">
      <div className="container mx-auto overflow-hidden">
        <div className="flex justify-center items-center">
          <p className="text-lg font-semibold mr-2">Serving:</p>
          <div className="relative h-8 overflow-hidden">
            {postalCodes.map((code, index) => (
              <span
                key={index}
                className={`absolute transition-transform duration-500 w-full ${
                  index === currentIndex ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                {code}
              </span>
            ))}
          </div>
          <p className="text-lg font-semibold ml-2">and surrounding areas</p>
        </div>
        
        {/* Add hidden div with ghost messages for access by other components */}
        <div id="postal-ghost-text" className="hidden">
          {ghostMessages[currentGhostIndex]}
        </div>
      </div>
    </div>
  );
};

export default CitiesCarousel;
