
import { useEffect, useState } from 'react';

const services = [
  { name: 'Window Cleaning', price: '$199' },
  { name: 'Gutter Cleaning', price: '$199' },
  { name: 'Pressure Washing', price: '$250' },
  { name: 'Roof Cleaning', price: '$350' },
];

const PriceBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-bc-red py-1 text-white text-center text-sm font-medium animate-slide-up">
      <p className="animate-fade-in">
        {services[currentIndex].name} starting at <span className="font-bold">{services[currentIndex].price}</span>
      </p>
    </div>
  );
};

export default PriceBanner;
