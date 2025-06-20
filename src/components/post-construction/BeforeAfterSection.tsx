
import React, { useState, useEffect } from 'react';

const BeforeAfterSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    {
      src: "/lovable-uploads/1eaed8db-5d8f-4291-b8a6-cf155569badc.png",
      alt: "Before: Tape and debris stuck to every pane",
      caption: "Before: Tape and debris"
    },
    {
      src: "/lovable-uploads/8bfa7c48-74fb-490c-89e1-e15d87fdcc6d.png",
      alt: "During: Careful removal using specialized techniques",
      caption: "During: Careful removal"
    },
    {
      src: "/lovable-uploads/a237ac38-d3a7-42b4-853b-65512e02a031.png",
      alt: "Cleaning Windows: Professional window cleaning in progress",
      caption: "Cleaning Windows"
    },
    {
      src: "/lovable-uploads/3af05628-d275-4679-9546-12fcc6178d94.png",
      alt: "After: Sparkling, streak-free windows",
      caption: "After: Sparkling clean"
    }
  ];

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">See The Difference</h2>
        
        {/* Automatic Carousel */}
        <div className="relative max-w-4xl mx-auto mb-8">
          <div className="relative h-96 overflow-hidden rounded-lg shadow-lg">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
                  <p className="text-white font-medium text-lg">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-bc-red' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to make your windows shine?</h3>
          <a 
            href="#booking-section" 
            className="inline-block bg-bc-red text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-red-700 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('booking-section')?.scrollIntoView({behavior: 'smooth'});
            }}
          >
            Get Your Free Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
