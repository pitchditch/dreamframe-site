import React, { useState, useEffect } from 'react';
import { testimonialsWithImages } from '@/data/testimonials';
export const TestimonialCarousel = () => {
  const [images, setImages] = useState<string[]>([]);

  // Initialize testimonials with before/after images
  useEffect(() => {
    const testimonialImages = testimonialsWithImages.filter(testimonial => testimonial.beforeAfterImage).map(testimonial => testimonial.beforeAfterImage as string);

    // Double the images to create seamless scrolling effect
    setImages([...testimonialImages, ...testimonialImages]);
  }, []);
  if (images.length === 0) return null;
  return;
};