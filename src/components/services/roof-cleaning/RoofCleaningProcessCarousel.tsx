import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RoofCleaningProcessCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayTimeoutRef = useRef<number | null>(null);

  const slides = [
    {
      type: 'removal',
      title: 'Moss Removal',
      image: '/lovable-uploads/915344bc-d3d8-4352-8b18-c51057dbdd10.png',
      description: 'Moss can be particularly damaging to your roof as it retains moisture against roofing materials. This constant moisture can deteriorate shingles, create openings for leaks, and even lift shingles causing exposure. Our specialized treatment effectively kills and removes moss, preventing regrowth and extending the life of your roof.',
      warning: 'Moss can reduce your roof\'s lifespan by up to 10 years if left untreated'
    },
    {
      type: 'removal',
      title: 'Black Streak & Stain Removal',
      image: '/lovable-uploads/bc8662ae-2020-4268-ada3-deb86d5804df.png',
      description: 'Those black streaks on your roof aren\'t just cosmetic issues—they\'re actually colonies of algae (Gloeocapsa magnifera) that feed on the limestone filler in asphalt shingles. Beyond being unsightly, these organisms gradually break down your roofing materials. Our cleaning solution thoroughly eliminates these stains without damaging your roof\'s surface.',
      warning: 'Black streaks can reduce your home\'s value by up to 5% according to real estate professionals'
    },
    {
      type: 'process',
      title: '1. Roof Assessment',
      image: '/lovable-uploads/5f628a3f-670b-4ac2-b2b8-f6e15c408c3f.jpg',
      description: 'We start with a thorough inspection of your roof to identify the type of growth, assess the condition of your roofing materials, and determine the best cleaning approach.'
    },
    {
      type: 'process',
      title: '2. Preparation and Protection',
      image: '/lovable-uploads/465146344425-f00d5f5c8f07.png',
      description: 'We protect your landscaping, plants, and surrounding areas by covering them with tarps and taking precautions to prevent any damage during the cleaning process.'
    },
    {
      type: 'process',
      title: '3. Soft Washing Application',
      image: '/lovable-uploads/06bbf1e1-0ee0-4176-9417-4af9bf7a4460.jpg',
      description: 'We apply our eco-friendly cleaning solution using a low-pressure soft washing system. This ensures the solution gently penetrates and kills the moss, algae, and lichen without damaging your roofing materials.'
    },
    {
      type: 'process',
      title: '4. Rinsing and Cleanup',
      image: '/lovable-uploads/781082de-7949-4655-bc96-5ef110675262.jpg',
      description: 'After allowing the cleaning solution to dwell for the appropriate time, we gently rinse your roof to remove the dead moss and algae. We then clean up any remaining debris, leaving your property clean and tidy.'
    }
  ];

  const startAutoplay = () => {
    if (autoplayTimeoutRef.current) {
      window.clearTimeout(autoplayTimeoutRef.current);
    }
    
    autoplayTimeoutRef.current = window.setTimeout(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayTimeoutRef.current) {
        window.clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [currentSlide, isPaused]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 heading-text">
            What We Remove & Our Process
          </h2>
          
          <div 
            className="relative bg-white rounded-lg shadow-lg overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="grid lg:grid-cols-2 gap-8 p-8">
              <div className="relative">
                <div className="h-80 overflow-hidden rounded-md">
                  <img 
                    src={currentSlideData.image}
                    alt={currentSlideData.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                </div>
                {currentSlideData.type === 'removal' && (
                  <div className="absolute top-2 right-2 bg-bc-red text-white text-xs py-1 px-2 rounded">
                    What We Remove
                  </div>
                )}
                {currentSlideData.type === 'process' && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs py-1 px-2 rounded">
                    Our Process
                  </div>
                )}
              </div>
              
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {currentSlideData.title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  {currentSlideData.description}
                </p>
                
                {currentSlideData.warning && (
                  <div className="mt-4 text-base text-bc-red font-medium p-3 bg-red-50 rounded-md">
                    * {currentSlideData.warning}
                  </div>
                )}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          {/* Dots Navigation */}
          <div className="flex justify-center mt-6 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-bc-red' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button className="bg-bc-red hover:bg-red-700 text-white px-8 py-6" size="lg" asChild>
              <Link to="/calculator">Schedule Your Roof Cleaning</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoofCleaningProcessCarousel;
