
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const customers = [
  {
    name: "David",
    location: "White Rock",
    service: "Window Cleaning",
    date: "May 2025",
    quote: "They nailed it. Windows look crystal clear.",
    image: "/lovable-uploads/88568a41-b608-4e38-a985-4a4a03c6ab89.png"
  },
  {
    name: "James",
    location: "Surrey", 
    service: "Pressure Washing",
    date: "April 2025",
    quote: "Professional service from start to finish.",
    image: "/lovable-uploads/89515ed3-256d-4840-a9ed-2049bb5d0d1f.png"
  },
  {
    name: "Michael",
    location: "South Surrey",
    service: "Roof Cleaning", 
    date: "March 2025",
    quote: "Best decision I made. Roof looks brand new.",
    image: "/lovable-uploads/89f521bb-edb4-4193-a254-c88e4968fa9f.png"
  },
  {
    name: "Jennifer & Frank",
    location: "White Rock",
    service: "Window Cleaning",
    date: "May 2025", 
    quote: "Couldn't be happier with the results!",
    image: "/lovable-uploads/8a55a001-6d53-4d15-a3ce-cf0763d47e29.png"
  },
  {
    name: "Robert",
    location: "Langley",
    service: "Window Cleaning",
    date: "April 2025",
    quote: "Great experience. Will use them again.",
    image: "/lovable-uploads/8a7d4e73-fa89-44ab-8814-ecaed5b1d23c.png"
  }
];

const TrustedCustomersSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % customers.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % customers.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + customers.length) % customers.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Real Homeowners – Verified Customers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
            Every one of these customers is someone we've proudly served – and they're wearing the shirt to prove it.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-700">
            <span className="bg-blue-100 px-3 py-1 rounded-full">🏠 Real Customers</span>
            <span className="bg-green-100 px-3 py-1 rounded-full">✓ Verified Reviews</span>
            <span className="bg-purple-100 px-3 py-1 rounded-full">📸 Branded Photos</span>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Slideshow */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {customers.map((customer, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
                    {/* Full-size Image */}
                    <div className="relative">
                      <img
                        src={customer.image}
                        alt={`${customer.name} from ${customer.location} - Verified BC Pressure Washing Customer`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        ✓ Verified Customer
                      </div>
                    </div>
                    
                    {/* Customer Info */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        {customer.name}
                      </h3>
                      <p className="text-bc-red font-semibold mb-4 text-lg">
                        ✓ Verified Customer – {customer.location}
                      </p>
                      
                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <p className="text-gray-700 font-medium">{customer.service} • {customer.date}</p>
                      </div>
                      
                      <blockquote className="text-xl lg:text-2xl text-gray-800 font-medium italic leading-relaxed">
                        "{customer.quote}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 gap-2">
            {customers.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-bc-red' : 'bg-gray-300'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 text-lg">
            <strong>100% Real Customers</strong> • All photos taken with permission • Look for our red car around White Rock!
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustedCustomersSection;
