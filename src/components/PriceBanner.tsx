
import { useEffect, useState, useRef } from 'react';

const services = [
  { name: 'Window Cleaning', price: '$199' },
  { name: 'Gutter Cleaning', price: '$199' },
  { name: 'Pressure Washing', price: '$250' },
  { name: 'Roof Cleaning', price: '$350' },
];

const PriceBanner = () => {
  const [visibleServices, setVisibleServices] = useState<Array<{name: string, price: string, id: string, position: number}>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

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
      position: idx === 0 ? -300 : -800 // Start off-screen to the left
    }));
    
    setVisibleServices(initialServices);
    
    let nextServiceIndex = 2 % services.length;
    
    // Service rotation interval
    const interval = setInterval(() => {
      setVisibleServices(prev => {
        // Filter out services that have moved off-screen
        const currentServices = prev.filter(s => s.position < containerWidth + 200);
        
        // Add a new service if we have fewer than 2
        if (currentServices.length < 2) {
          const newService = {
            ...services[nextServiceIndex],
            id: `${services[nextServiceIndex].name}-${Date.now()}`,
            position: -300 // Start off-screen to the left
          };
          
          nextServiceIndex = (nextServiceIndex + 1) % services.length;
          return [...currentServices, newService];
        }
        
        return currentServices;
      });
    }, 5000); // Add a new service every 5 seconds
    
    // Animation frame for smooth movement
    let animationFrameId: number;
    
    const animate = () => {
      setVisibleServices(prev => 
        prev.map(service => ({
          ...service,
          position: service.position + 1 // Move 1px per frame, slower movement
        }))
      );
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrameId);
    };
  }, [containerWidth]);

  return (
    <div 
      ref={containerRef}
      className="bg-bc-red py-3 text-white text-center text-sm font-medium overflow-hidden relative"
    >
      {visibleServices.map(service => (
        <div 
          key={service.id}
          className="absolute top-1/2 -translate-y-1/2 transition-transform hover:scale-110 cursor-pointer whitespace-nowrap duration-300"
          style={{ 
            left: `${service.position}px`,
            transition: 'transform 0.3s ease'
          }}
        >
          <p className="flex items-center">
            <span className="inline-block">{service.name} starting at </span>
            <span className="font-bold relative inline-block ml-1">
              <span className="relative z-10">{service.price}</span>
              <span className="absolute inset-0 bg-[#FEF7CD] opacity-50 rounded-sm -z-0 blur-sm transform scale-110"></span>
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default PriceBanner;
