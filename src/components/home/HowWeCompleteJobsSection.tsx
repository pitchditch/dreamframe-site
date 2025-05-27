
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Droplets, Home, Building, Sparkles, Zap, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

interface Service {
  id: number;
  image: string;
  title: string;
  description: string;
  features: string[];
  icon: any;
}

const HowWeCompleteJobsSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const services: Service[] = [
    {
      id: 1,
      image: "/lovable-uploads/104fb195-8227-4f8c-af68-5406acc5388a.png",
      title: t("Window Cleaning"),
      description: t("Professional window cleaning using advanced water-fed pole systems for crystal clear results."),
      features: [
        t("Pure water cleaning system"),
        t("Streak-free results guaranteed"),
        t("Eco-friendly cleaning solutions"),
        t("Interior and exterior cleaning")
      ],
      icon: Home
    },
    {
      id: 2,
      image: "/lovable-uploads/389a6f18-1725-449e-9461-22e9e46dab29.png",
      title: t("Gutter Cleaning"),
      description: t("Complete gutter system cleaning and maintenance to protect your property from water damage."),
      features: [
        t("Full debris removal"),
        t("Downspout clearing and testing"),
        t("Gutter face exterior cleaning"),
        t("Before and after documentation")
      ],
      icon: Droplets
    },
    {
      id: 3,
      image: "/lovable-uploads/0c0d106e-85ea-4490-9176-1d36821732c1.png",
      title: t("Roof Cleaning"),
      description: t("Safe soft washing techniques to remove moss, algae, and restore your roof's appearance."),
      features: [
        t("Soft washing techniques"),
        t("Moss and algae removal"),
        t("Eco-friendly cleaning solutions"),
        t("Roof protection and preservation")
      ],
      icon: Building
    },
    {
      id: 4,
      image: "/lovable-uploads/80972bf0-3700-43b0-8983-d5861531bf57.png",
      title: t("Pressure Washing with Surface Cleaner"),
      description: t("High-efficiency surface cleaning for driveways, patios, and large commercial areas."),
      features: [
        t("Even pressure distribution"),
        t("Fast and efficient cleaning"),
        t("No streaking or zebra marks"),
        t("Perfect for large surface areas")
      ],
      icon: Sparkles
    },
    {
      id: 5,
      image: "/lovable-uploads/0d0aad7b-e90f-4f4a-93f1-1b788e88263b.png",
      title: t("Extendable Pole Pressure Washing"),
      description: t("Reach high areas safely with our extendable pole pressure washing systems."),
      features: [
        t("Reach up to 3 stories high"),
        t("Safe ground-based operation"),
        t("Precise pressure control"),
        t("Ideal for high exterior walls")
      ],
      icon: Zap
    },
    {
      id: 6,
      image: "/lovable-uploads/b5f7b3b1-4a41-4e10-963f-72eef95a03c4.png",
      title: t("Water Fed Pole System"),
      description: t("Advanced pure water cleaning system for windows and building facades up to 5 stories."),
      features: [
        t("Pure water technology"),
        t("No chemicals needed"),
        t("Spot-free drying"),
        t("Reaches extreme heights safely")
      ],
      icon: Wrench
    }
  ];
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [services.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-bc-red" />
            <span className="text-bc-red font-semibold text-sm uppercase tracking-wide">Our Services</span>
            <Sparkles className="w-5 h-5 text-bc-red" />
          </div>
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-bold mb-4 md:mb-6 text-gray-900`}>
            {t("Professional Cleaning Services")}
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-gray-600 max-w-4xl mx-auto leading-relaxed`}>
            {isMobile 
              ? t("See our complete range of exterior cleaning services.")
              : t("From windows to roofs, we provide comprehensive exterior cleaning solutions using the latest equipment and techniques for exceptional results.")
            }
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div className="relative h-[500px] md:h-[600px]">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div 
                    key={service.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentIndex ? 'opacity-100 z-10' : 'opacity-0'
                    }`}
                  >
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover" 
                    />
                    
                    {/* Content overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
                      <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-bc-red rounded-full flex items-center justify-center text-white">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold text-white`}>
                            {service.title}
                          </h3>
                        </div>
                        
                        <p className={`${isMobile ? 'text-base mb-4' : 'text-lg md:text-xl mb-6'} text-white/90 leading-relaxed`}>
                          {service.description}
                        </p>
                        
                        <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2 gap-3'}`}>
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-bc-red rounded-full mt-2 flex-shrink-0"></div>
                              <span className={`${isMobile ? 'text-sm' : 'text-base'} text-white/90`}>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Navigation arrows */}
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-1/2 left-4 -translate-y-1/2 z-20 bg-white/90 hover:bg-white border-0 shadow-lg" 
            onClick={prevSlide}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-1/2 right-4 -translate-y-1/2 z-20 bg-white/90 hover:bg-white border-0 shadow-lg" 
            onClick={nextSlide}
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
          
          {/* Dots navigation */}
          <div className="flex justify-center mt-6 gap-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-bc-red w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className={`${isMobile ? 'mt-8' : 'mt-12'} grid ${isMobile ? 'grid-cols-2 gap-4' : 'grid-cols-3 gap-8'} text-center`}>
          <div className="flex flex-col items-center">
            <Sparkles className="w-8 h-8 text-bc-red mb-2" />
            <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 mb-1`}>6</div>
            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600`}>{t("Service Types")}</p>
          </div>
          <div className="flex flex-col items-center">
            <Home className="w-8 h-8 text-bc-red mb-2" />
            <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 mb-1`}>1000+</div>
            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600`}>{t("Properties Serviced")}</p>
          </div>
          {!isMobile && (
            <div className="flex flex-col items-center">
              <Building className="w-8 h-8 text-bc-red mb-2" />
              <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
              <p className="text-base text-gray-600">{t("Satisfaction Rate")}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HowWeCompleteJobsSection;
