
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
  const animationRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      
      // Check if element is in viewport
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
          }
        }
      }, { threshold: 0.1 });
      
      observer.observe(containerRef.current);
      
      window.addEventListener('resize', handleResize, { passive: true });
      return () => {
        window.removeEventListener('resize', handleResize);
        if (containerRef.current) observer.unobserve(containerRef.current);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
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
    
    if (!isVisible) return;
    
    let nextServiceIndex = 2 % services.length;
    let lastRender = 0;
    let lastServiceAdd = 0;
    
    // Service rotation interval (throttled)
    const animate = (timestamp: number) => {
      if (!isVisible) return;
      
      // Add a new service every 5 seconds
      if (timestamp - lastServiceAdd > 5000) {
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
            lastServiceAdd = timestamp;
            return [...currentServices, newService];
          }
          
          return currentServices;
        });
      }
      
      // Throttle animation to 30fps for better performance
      if (timestamp - lastRender > 33) {
        setVisibleServices(prev => 
          prev.map(service => ({
            ...service,
            position: service.position + 0.75 // Move 0.75px per frame, slower movement
          }))
        );
        lastRender = timestamp;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [containerWidth, isVisible]);

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
            transition: 'transform 0.3s ease',
            willChange: 'transform',
            transform: 'translate3d(0, -50%, 0)'
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
