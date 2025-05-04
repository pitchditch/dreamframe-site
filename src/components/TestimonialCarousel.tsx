
import React, { useState, useEffect } from 'react';
import { testimonialsWithImages } from '@/data/testimonials';

export const TestimonialCarousel = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialize testimonials with before/after images
  useEffect(() => {
    const testimonialImages = testimonialsWithImages
      .filter(testimonial => testimonial.beforeAfterImage)
      .map(testimonial => testimonial.beforeAfterImage as string);

    // Double the images to create seamless scrolling effect
    setImages([...testimonialImages, ...testimonialImages]);
  }, []);

  // Auto-rotate testimonials at a slower pace
  useEffect(() => {
    if (images.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 8000); // Slower rotation (8 seconds)
    
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="bg-white p-3 rounded-lg shadow-md">
        <h3 className="font-bold text-xl text-center mb-2 text-bc-red">Before & After</h3>
        <div className="relative h-[400px] overflow-hidden rounded-md">
          {images.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ 
                opacity: index === currentIndex ? 1 : 0,
                zIndex: index === currentIndex ? 10 : 0 
              }}
            >
              <img
                src={image}
                alt={`Before and after cleaning transformation ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-2">
        <div className="flex gap-2">
          {images.slice(0, images.length / 2).map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === currentIndex % (images.length / 2) ? 'bg-bc-red' : 'bg-gray-300'}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`View before and after image ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
