
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
      <div className="flex flex-col gap-6">
        {/* Current image */}
        {images[currentIndex] && (
          <div className="overflow-hidden rounded-lg shadow-md">
            <img 
              src={images[currentIndex]} 
              alt="Before and after cleaning comparison" 
              className="w-full h-auto"
            />
            <div className="bg-gray-800 text-white text-xs px-3 py-1 text-center">
              See the difference!
            </div>
          </div>
        )}
        
        {/* Show another image if available */}
        {images[(currentIndex + 1) % images.length] && (
          <div className="overflow-hidden rounded-lg shadow-md">
            <img 
              src={images[(currentIndex + 1) % images.length]} 
              alt="Before and after cleaning comparison" 
              className="w-full h-auto"
            />
            <div className="bg-gray-800 text-white text-xs px-3 py-1 text-center">
              Real results for our customers
            </div>
          </div>
        )}
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
