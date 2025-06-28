
import React, { useState, useEffect } from 'react';

interface Slide {
  image: string;
  alt: string;
  title: string;
}

const slides: Slide[] = [
  {
    image: "/lovable-uploads/375c2b6b-c660-411b-9339-327b0df02811.png",
    alt: "Professional storefront window cleaning services",
    title: "Storefront Window Cleaning"
  },
  {
    image: "/lovable-uploads/69c7f1ae-4940-431b-a00d-d8f3dd738b6d.png",
    alt: "Commercial pressure washing for business properties",
    title: "Commercial Pressure Washing"
  },
  {
    image: "/lovable-uploads/7ba42aeb-4641-492f-aecf-1ae48bc76192.png",
    alt: "Residential window cleaning for homes",
    title: "Residential Window Cleaning"
  },
  {
    image: "/lovable-uploads/f34d4087-7711-448e-8a39-fbce26bf4cda.png",
    alt: "Apartment building window cleaning services",
    title: "Apartment Window Cleaning"
  }
];

const PropertyTypesSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            title={slide.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ))}
      
      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyTypesSlideshow;
