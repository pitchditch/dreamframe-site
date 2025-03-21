
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

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      // Wait for animation to complete before changing index
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
        setIsAnimating(false);
      }, 500); // Half of the transition time
      
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-bc-red py-1 text-white text-center text-sm font-medium overflow-hidden">
      <div 
        className={`transition-all duration-1000 ease-in-out ${
          isAnimating 
            ? 'opacity-0 transform -translate-x-full' 
            : 'opacity-100 transform translate-x-0'
        }`}
      >
        <p>
          {services[currentIndex].name} starting at{' '}
          <span className="font-bold relative inline-block">
            <span className="relative z-10">{services[currentIndex].price}</span>
            <span className="absolute inset-0 bg-[#FEF7CD] opacity-50 rounded-sm -z-0 blur-sm transform scale-110"></span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default PriceBanner;
