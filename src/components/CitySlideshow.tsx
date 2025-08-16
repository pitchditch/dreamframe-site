import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface ServiceArea {
  id: string;
  city: string;
  headline: string;
  subtext: string;
  image_url: string;
  cta_url: string | null;
  sort_order: number;
}

const CitySlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceAreas = async () => {
      try {
        const { data, error } = await supabase
          .from('service_areas')
          .select('*')
          .eq('is_active', true)
          .order('sort_order');

        if (error) throw error;
        setServiceAreas(data || []);
      } catch (error) {
        console.error('Error fetching service areas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceAreas();
  }, []);

  useEffect(() => {
    if (!isAutoplay || serviceAreas.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % serviceAreas.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoplay, serviceAreas.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % serviceAreas.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + serviceAreas.length) % serviceAreas.length);
  };

  if (loading || serviceAreas.length === 0) {
    return (
      <section className="relative h-[60vh] md:h-[70vh] bg-gray-900 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </section>
    );
  }

  const currentArea = serviceAreas[currentSlide];

  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${currentArea.image_url})` }}
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Content Overlay */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl mx-auto">
              <motion.h2 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
              >
                {currentArea.headline}
              </motion.h2>
              
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto"
              >
                {currentArea.subtext}
              </motion.p>
              
              {currentArea.cta_url && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-bc-red hover:bg-bc-red/90 text-white px-8 py-6 text-lg md:text-xl font-semibold rounded-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Link to={currentArea.cta_url}>
                      Get My Quote in {currentArea.city}
                    </Link>
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="bg-black/30 hover:bg-black/50 text-white rounded-full p-3 backdrop-blur-sm"
        >
          <ChevronLeft size={24} />
        </Button>
      </div>
      
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="bg-black/30 hover:bg-black/50 text-white rounded-full p-3 backdrop-blur-sm"
        >
          <ChevronRight size={24} />
        </Button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {serviceAreas.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Autoplay Control */}
      <div className="absolute top-6 right-6 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsAutoplay(!isAutoplay)}
          className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm"
        >
          {isAutoplay ? <Pause size={20} /> : <Play size={20} />}
        </Button>
      </div>
    </section>
  );
};

export default CitySlideshow;