
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface ProfessionalServicesCarouselProps {
  images: ServiceImage[];
}

const ProfessionalServicesCarousel: React.FC<ProfessionalServicesCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-rotate images
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="relative py-16 bg-gray-50 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Professional Services</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          We use the most advanced equipment and techniques to deliver exceptional results for your property.
        </p>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div className="relative w-full h-[500px]">
              {images.map((image, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentIndex ? 'opacity-100 z-10' : 'opacity-0'
                  }`}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover object-center" 
                  />
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
                    <p className="text-white/90">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {images.length > 1 && (
            <>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute top-1/2 left-4 -translate-y-1/2 z-20 bg-white/80 hover:bg-white" 
                onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute top-1/2 right-4 -translate-y-1/2 z-20 bg-white/80 hover:bg-white" 
                onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
              
              <div className="flex justify-center mt-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-bc-red' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalServicesCarousel;
