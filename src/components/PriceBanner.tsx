
import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PauseCircle, Play } from 'lucide-react';

const services = [
  { name: 'Window Cleaning', price: '$199', link: '/services/window-cleaning' },
  { name: 'Gutter Cleaning', price: '$199', link: '/services/gutter-cleaning' },
  { name: 'Pressure Washing', price: '$250', link: '/services/house-washing' },
  { name: 'Roof Cleaning', price: '$350', link: '/services/roof-cleaning' },
  { name: 'Storefront Cleaning', price: '$50/mo', link: '/services/storefront-window-cleaning' },
  { name: 'Monthly Subscription', price: '$50/mo', link: '/subscription' },
  { name: 'Yearly Subscription', price: '$600/yr', link: '/subscription' },
];

const PriceBanner = () => {
  const [visibleServices, setVisibleServices] = useState<Array<{name: string, price: string, id: string, position: number, link?: string}>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const location = useLocation();
  const [isPaused, setIsPaused] = useState(false);
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Initialize and measure container width
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      
      // Set up resize listener
      const handleResize = () => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth);
        }
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Service rotation logic
  useEffect(() => {
    // Create initial services
    const initialServices = services.slice(0, 2).map((service, idx) => ({
      ...service,
      id: `${service.name}-${Date.now()}-${idx}`,
      position: idx === 0 ? 0 : containerWidth / 2 // Position services side by side
    }));
    
    setVisibleServices(initialServices);
    
    let nextServiceIndex = 2 % services.length;
    
    // Service rotation interval
    const interval = setInterval(() => {
      if (isPaused) return; // Skip if paused
      
      setVisibleServices(prev => {
        // Filter out services that have moved off-screen
        const currentServices = prev.filter(s => s.position < containerWidth);
        
        // Add a new service if we have fewer than 2
        if (currentServices.length < 2) {
          const newService = {
            ...services[nextServiceIndex],
            id: `${services[nextServiceIndex].name}-${Date.now()}`,
            position: 0 // Start at the beginning
          };
          
          nextServiceIndex = (nextServiceIndex + 1) % services.length;
          return [...currentServices, newService];
        }
        
        return currentServices;
      });
    }, 5000); // Add a new service every 5 seconds
    
    setIntervalId(interval);
    
    // Animation frame for smooth movement
    const animate = () => {
      if (!isPaused) {
        setVisibleServices(prev => 
          prev.map(service => ({
            ...service,
            position: service.position + 0.5 // Move 0.5px per frame, slower movement
          }))
        );
      }
      
      const frameId = requestAnimationFrame(animate);
      setAnimationFrameId(frameId);
    };
    
    const frameId = requestAnimationFrame(animate);
    setAnimationFrameId(frameId);
    
    return () => {
      if (intervalId) clearInterval(intervalId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [containerWidth, isPaused]);

  // Handle pausing/resuming rotation
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Don't render the banner on the subscription page or storefront window cleaning page
  if (location.pathname === '/subscription' || location.pathname === '/services/storefront-window-cleaning') {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="bg-bc-red py-3 text-white text-center text-sm font-medium overflow-hidden relative"
    >
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

      <div className="flex justify-center items-center h-full w-full relative">
        {visibleServices.map(service => {
          const ServiceContent = () => (
            <p className="flex items-center">
              <span className="inline-block">{service.name} starting at </span>
              <span className="font-bold relative inline-block ml-1">
                <span className="relative z-10">{service.price}</span>
                <span className="absolute inset-0 bg-[#FEF7CD] opacity-50 rounded-sm -z-0 blur-sm transform scale-110"></span>
              </span>
            </p>
          );

          // Calculate width based on content
          const maxWidth = Math.min(containerWidth / 2 - 40, 300); // Limit width to half container minus some padding
          
          return (
            <div 
              key={service.id}
              className="absolute top-1/2 -translate-y-1/2 transition-transform hover:scale-110 cursor-pointer whitespace-nowrap duration-300"
              style={{ 
                left: `${service.position}px`,
                transition: 'transform 0.3s ease',
                maxWidth: `${maxWidth}px`,
              }}
              onClick={togglePause}
            >
              {service.link ? (
                <Link to={service.link} className="text-white hover:text-white">
                  <ServiceContent />
                </Link>
              ) : (
                <ServiceContent />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriceBanner;
