
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const beforeAfterImages = [
  {
    before: '/lovable-uploads/1ece3dee-f45b-49ef-8798-8c07d97a085a.jpg',
    after: '/lovable-uploads/781082de-7949-4655-bc96-5ef110675262.jpg',
    title: 'House Pressure Washing',
    description: 'Complete exterior house cleaning'
  },
  {
    before: '/lovable-uploads/78b42700-b641-45cf-a11e-fb68f4124509.jpg',
    after: '/lovable-uploads/970932d4-f8db-4a50-92b1-3fe35f2d06a7.jpg',
    title: 'Window Cleaning',
    description: 'Crystal clear window restoration'
  },
  {
    before: '/lovable-uploads/620a8898-e5ca-48f4-b13b-518ab06cc30e.jpg',
    after: '/lovable-uploads/5f628a3f-670b-4ac2-b2b8-f6e15c408c3f.jpg',
    title: 'Roof & Gutter Cleaning',
    description: 'Complete roof and gutter restoration'
  }
];

const BeforeAfterGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
