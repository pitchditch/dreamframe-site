
import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PauseCircle, Play } from 'lucide-react';

// Service data with cities
const services = [
  { name: 'Window Cleaning', price: '$199', link: '/services/window-cleaning', city: 'Surrey' },
  { name: 'Gutter Cleaning', price: '$199', link: '/services/gutter-cleaning', city: 'Langley' },
  { name: 'Pressure Washing', price: '$250', link: '/services/house-washing', city: 'White Rock' },
  { name: 'Roof Cleaning', price: '$350', link: '/services/roof-cleaning', city: 'Richmond' },
  { name: 'Storefront Cleaning', price: '$50/mo', link: '/services/storefront-window-cleaning', city: 'Burnaby' },
  { name: 'Monthly Subscription', price: '$50/mo', link: '/subscription', city: 'Coquitlam' },
  { name: 'Yearly Subscription', price: '$600/yr', link: '/subscription', city: 'North Vancouver' },
];

const PriceBanner = () => {
  const [currentService, setCurrentService] = useState(services[0]);
  const location = useLocation();
  const [isPaused, setIsPaused] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Handle service rotation
  useEffect(() => {
    if (isPaused) return;

    const rotateService = () => {
      setCurrentService(prev => {
        const currentIndex = services.findIndex(s => s.name === prev.name);
        const nextIndex = (currentIndex + 1) % services.length;
        return services[nextIndex];
      });
    };

    const interval = setInterval(rotateService, 5000);
    setIntervalId(interval);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPaused]);

  // Handle pausing/resuming rotation
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Don't render the banner on certain pages
  if (location.pathname === '/subscription' || location.pathname === '/services/storefront-window-cleaning') {
    return null;
  }

  return (
    <div className="bg-bc-red py-3 text-white text-center text-sm font-medium overflow-hidden relative">
      <button 
        onClick={togglePause} 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-200 focus:outline-none"
        aria-label={isPaused ? "Resume service rotation" : "Pause service rotation"}
      >
        {isPaused ? (
          <Play size={20} />
        ) : (
          <PauseCircle size={20} />
        )}
      </button>

      <div 
        className="flex justify-center items-center h-full w-full cursor-pointer"
        onClick={togglePause}
      >
        <Link to={currentService.link} className="text-white hover:text-white">
          <p className="flex flex-wrap justify-center items-center px-4">
            <span className="inline-block mr-2">{currentService.name} starting at </span>
            <span className="font-bold relative inline-block">
              <span className="relative z-10">{currentService.price}</span>
              <span className="absolute inset-0 bg-[#FEF7CD] opacity-50 rounded-sm -z-0 blur-sm transform scale-110"></span>
            </span>
            <span className="italic ml-2 opacity-80 text-xs sm:text-sm"> - {currentService.city}</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PriceBanner;
