import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface ServiceArea {
  id: string;
  city: string;
  headline: string;
  subtext: string;
  image_url: string;
  cta_url: string;
  sort_order: number;
}

const CitySlideshow = () => {
  console.log('🏙️ CitySlideshow rendering...');
  
  const [slides, setSlides] = useState<ServiceArea[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔍 Fetching slides...');
    
    const fetchSlides = async () => {
      try {
        const { data, error } = await supabase
          .from('service_areas')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        console.log('📊 Slides data:', data);
        
        if (error) {
          console.error('❌ Supabase error:', error);
          throw error;
        }
        
        if (data && data.length > 0) {
          console.log(`✅ Loaded ${data.length} slides`);
          setSlides(data);
        } else {
          console.log('⚠️ No slides data found');
        }
      } catch (error) {
        console.error('Error fetching slides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (!isAutoplay || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoplay, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <section className="h-96 bg-gradient-to-r from-bc-red/20 to-bc-red/10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bc-red"></div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="h-96 bg-gradient-to-r from-bc-red/20 to-bc-red/10 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Service Areas Loading...</h2>
          <p className="text-gray-600">We serve Metro Vancouver and surrounding areas</p>
        </div>
      </section>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden bg-black">
      {/* Background Image with Transition */}
      <div 
        key={currentSlide}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundImage: `url(${currentSlideData.image_url})`,
          backgroundPosition: 'center center'
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {currentSlideData.headline}
          </h2>
          
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 drop-shadow-md font-medium">
            {currentSlideData.subtext}
          </p>
          
          <Button
            asChild
            size="lg"
            className="bg-bc-red hover:bg-bc-red/90 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <a href={currentSlideData.cta_url || '/contact'}>
              Get My Quote in {currentSlideData.city}
            </a>
          </Button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full w-12 h-12 backdrop-blur-sm"
      >
        <ChevronLeft size={24} />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full w-12 h-12 backdrop-blur-sm"
      >
        <ChevronRight size={24} />
      </Button>

      {/* Autoplay Control */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsAutoplay(!isAutoplay)}
        className="absolute top-4 right-4 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full w-10 h-10 backdrop-blur-sm"
      >
        {isAutoplay ? <Pause size={18} /> : <Play size={18} />}
      </Button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default CitySlideshow;