
import React, { useState, useEffect } from 'react';
import { testimonialsWithImages } from '@/data/testimonials';

export const TestimonialCarousel = () => {
  const [images, setImages] = useState<string[]>([]);
  
  // Initialize testimonials with before/after images
  useEffect(() => {
    const testimonialImages = testimonialsWithImages
      .filter(testimonial => testimonial.beforeAfterImage)
      .map(testimonial => testimonial.beforeAfterImage as string);
    
    // Double the images to create seamless scrolling effect
    setImages([...testimonialImages, ...testimonialImages]);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="space-y-4 overflow-hidden">
      <h3 className="text-lg font-semibold text-center mb-2">Before & After</h3>
      {/* Container with fixed height for vertical scrolling */}
      <div className="h-[500px] overflow-hidden relative">
        <div 
          className="flex flex-col gap-4 animate-scroll-vertical"
          style={{ 
            willChange: 'transform',
            animation: 'scrollVertical 20s linear infinite',
          }}
        >
          {/* Display all images in a vertical flow */}
          {images.map((image, index) => (
            <div 
              key={index} 
              className="overflow-hidden rounded-lg shadow-md transition-all duration-700"
            >
              <img 
                src={image} 
                alt="Before and after cleaning comparison" 
                className="w-full h-auto"
                loading="lazy"
              />
              <div className="bg-gray-800 text-white text-xs px-3 py-1 text-center">
                Real results for our customers
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
