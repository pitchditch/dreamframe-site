
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const beforeAfterImages = [
  {
    before: '/lovable-uploads/71774b2f-cb36-4a10-b158-2f0020a06f53.png',
    after: '/lovable-uploads/fbe20623-3e28-4bfe-a9d4-7c89c9d07b54.png',
    title: 'Window Cleaning',
    description: 'Crystal clear window restoration'
  },
  {
    before: '/lovable-uploads/a97882ea-1822-4b97-bef4-2a7f2849c3ef.png',
    after: '/lovable-uploads/d70857b1-984a-4dce-87fa-690c954e90f6.png',
    title: 'Roof Cleaning',
    description: 'Complete roof moss and algae removal'
  },
  {
    before: '/lovable-uploads/0504c9c4-ec85-41e2-a922-fa02e9b21d45.png',
    after: '/lovable-uploads/0ac145eb-946d-47cc-8d1f-cf0f63a4716c.png',
    title: 'Driveway Cleaning',
    description: 'Professional pressure washing for driveways'
  },
  {
    before: '/lovable-uploads/b0a17518-4844-4334-b0ac-0dd62b5baff1.png',
    after: '/lovable-uploads/63a1c6a7-8585-4825-9b95-aaf922a4fb3b.png',
    title: 'House Washing',
    description: 'Complete exterior house cleaning'
  },
  {
    before: '/lovable-uploads/5c37b82a-d3f9-4c54-9c51-1c8c5383f7d2.png',
    after: '/lovable-uploads/30ed280f-ee6f-48b6-ba03-45fe47441dbf.png',
    title: 'Gutter Cleaning',
    description: 'Complete gutter system cleaning and maintenance'
  }
];

const BeforeAfterGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % beforeAfterImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % beforeAfterImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + beforeAfterImages.length) % beforeAfterImages.length);
  };

  const currentImage = beforeAfterImages[currentIndex];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">See The Difference</h2>
          <p className="text-xl text-gray-600">
            Real results from our professional cleaning services
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Before Image */}
              <div className="relative">
                <img 
                  src={currentImage.before} 
                  alt="Before cleaning"
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  BEFORE
                </div>
              </div>

              {/* After Image */}
              <div className="relative">
                <img 
                  src={currentImage.after} 
                  alt="After cleaning"
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  AFTER
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <Button
                onClick={prevSlide}
                variant="outline"
                size="sm"
                className="ml-4 bg-white/90 hover:bg-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button
                onClick={nextSlide}
                variant="outline"
                size="sm"
                className="mr-4 bg-white/90 hover:bg-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {currentImage.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {currentImage.description}
              </p>
              
              {/* Indicators */}
              <div className="flex justify-center space-x-2">
                {beforeAfterImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-bc-red' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
