
import React, { useState, useEffect } from 'react';
import { testimonialsWithImages } from '@/data/testimonials';

export const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  
  // Initialize testimonials with before/after images
  useEffect(() => {
    const testimonialImages = testimonialsWithImages
      .filter(testimonial => testimonial.beforeAfterImage)
      .map(testimonial => testimonial.beforeAfterImage as string);
    
    setImages(testimonialImages);

    // Auto rotate images
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % testimonialImages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center mb-2">Before & After</h3>
      <div className="flex flex-col gap-6 transition-all">
        {/* Display 3 images in a vertical flow */}
        {[0, 1, 2].map((offset) => {
          const index = (currentIndex + offset) % images.length;
          return images[index] && (
            <div 
              key={index} 
              className="overflow-hidden rounded-lg shadow-md transition-all duration-700 animate-fade-in"
              style={{
                transform: `translateY(${offset * 10}px)`,
                opacity: 1 - (offset * 0.2)
              }}
            >
              <img 
                src={images[index]} 
                alt="Before and after cleaning comparison" 
                className="w-full h-auto"
                loading="lazy"
              />
              <div className="bg-gray-800 text-white text-xs px-3 py-1 text-center">
                {offset === 0 ? 'See the difference!' : 'Real results for our customers'}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Dots indicator */}
      <div className="flex justify-center gap-1 mt-3">
        {images.map((_, i) => (
          <button 
            key={i}
            className={`w-2 h-2 rounded-full ${currentIndex === i ? 'bg-bc-red' : 'bg-gray-300'}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`View image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
