
import { useEffect, useState } from 'react';

const services = [
  { name: 'Window Cleaning', price: '$199' },
  { name: 'Gutter Cleaning', price: '$199' },
  { name: 'Pressure Washing', price: '$250' },
  { name: 'Roof Cleaning', price: '$350' },
];

const PriceBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get 3 services starting from currentIndex with wraparound
  const getVisibleServices = () => {
    const visibleServices = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % services.length;
      visibleServices.push(services[index]);
    }
    return visibleServices;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      // Wait for animation to complete before changing index
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
        setIsAnimating(false);
      }, 800); // Slightly faster transition
      
    }, 4000); // Longer duration between rotations

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-bc-red py-2 text-white text-center text-sm font-medium overflow-hidden">
      <div className="flex justify-center items-center gap-6 max-w-6xl mx-auto">
        {getVisibleServices().map((service, idx) => (
          <div 
            key={`${service.name}-${idx}`}
            className={`transition-all duration-800 ease-in-out transform hover:scale-110 cursor-pointer ${
              isAnimating 
                ? 'translate-x-full opacity-0' 
                : 'translate-x-0 opacity-100'
            }`}
          >
            <p>
              {service.name} starting at{' '}
              <span className="font-bold relative inline-block">
                <span className="relative z-10">{service.price}</span>
                <span className="absolute inset-0 bg-[#FEF7CD] opacity-50 rounded-sm -z-0 blur-sm transform scale-110"></span>
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceBanner;
