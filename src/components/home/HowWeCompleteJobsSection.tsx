
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Droplets, Home, Building, Sparkles, Zap, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

interface Service {
  id: number;
  image: string;
  title: string;
  description: string;
  features: string[];
  icon: any;
  overlayImage?: string;
  overlayTitle?: string;
  overlayDescription?: string;
  pricing?: {
    small: string;
    medium: string;
    large: string;
  };
}

const HowWeCompleteJobsSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [satisfactionRate, setSatisfactionRate] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Intersection Observer for satisfaction rate animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          const timer = setTimeout(() => {
            const interval = setInterval(() => {
              setSatisfactionRate(prev => {
                if (prev >= 100) {
                  clearInterval(interval);
                  return 100;
                }
                return prev + 2;
              });
            }, 30);
            return () => clearInterval(interval);
          }, 500);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.3 }
    );

    const statsElement = document.querySelector('[data-stats-section]');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, [isVisible]);
  
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
      icon: Home,
      overlayImage: "/lovable-uploads/99b31681-3d1a-4e50-bd80-48d57fa01dcb.png",
      overlayTitle: "Water-Fed Pole System",
      overlayDescription: "Professional telescopic pole system for reaching high windows safely from ground level",
      pricing: {
        small: "$150-250",
        medium: "$250-400", 
        large: "$400-650"
      }
    },
    {
      id: 2,
      image: "/lovable-uploads/4f0a7bbd-e220-49bd-80ec-c83bb961b38f.png",
      title: t("Gutter Cleaning"),
      description: t("Complete gutter system cleaning and maintenance to protect your property from water damage."),
      features: [
        t("Full debris removal"),
        t("Downspout clearing and testing"),
        t("Gutter face exterior cleaning"),
        t("Before and after documentation")
      ],
      icon: Droplets,
      pricing: {
        small: "$200-300",
        medium: "$300-500",
        large: "$500-800"
      }
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
      icon: Building,
      overlayImage: "/lovable-uploads/73365ffd-fbd1-45ab-beac-f6a2f696291a.png",
      overlayTitle: "Sodium Hypochlorite",
      overlayDescription: "Primary product used in roof cleaning to kill moss and algae growth, preventing regrowth for up to 2 years",
      pricing: {
        small: "$400-600",
        medium: "$600-1000",
        large: "$1000-1800"
      }
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
      icon: Sparkles,
      overlayImage: "/lovable-uploads/4af8c28d-371b-4fca-a70e-90e7563198c4.png",
      overlayTitle: "Surface Cleaner",
      overlayDescription: "Rotating surface cleaner attachment that provides even pressure distribution for streak-free cleaning of large flat surfaces",
      pricing: {
        small: "$300-500",
        medium: "$500-800",
        large: "$800-1500"
      }
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
      icon: Zap,
      overlayImage: "/lovable-uploads/a3f73a45-5f25-4203-bf0b-27417e2ecc35.png",
      overlayTitle: "Professional Pressure Washer",
      overlayDescription: "Industrial-grade pressure washing equipment for powerful and efficient cleaning",
      pricing: {
        small: "$250-400",
        medium: "$400-700",
        large: "$700-1200"
      }
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
      icon: Wrench,
      pricing: {
        small: "$200-350",
        medium: "$350-600",
        large: "$600-1000"
      }
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
            {t("How We Complete Our Jobs")}
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-gray-600 max-w-4xl mx-auto leading-relaxed`}>
            {isMobile 
              ? t("See our complete range of exterior cleaning services.")
              : t("From windows to roofs, we provide comprehensive exterior cleaning solutions using the latest equipment and techniques for exceptional results.")
            }
          </p>
        </div>
      </div>

      {/* Full-width Carousel */}
      <div className="relative w-full">
        <div className="overflow-hidden">
          <div className="relative h-[500px] md:h-[600px] w-full">
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
                  
                  {/* Pricing Overlay - moved to bottom left */}
                  {service.pricing && (
                    <div className="absolute bottom-20 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                      <h4 className="font-bold text-sm text-gray-900 mb-2">House Size Pricing</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Small:</span>
                          <span className="font-semibold text-bc-red">{service.pricing.small}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Medium:</span>
                          <span className="font-semibold text-bc-red">{service.pricing.medium}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Large:</span>
                          <span className="font-semibold text-bc-red">{service.pricing.large}</span>
                        </div>
                      </div>
                      <Button asChild size="sm" className="w-full mt-2 bg-bc-red hover:bg-red-700 text-xs">
                        <Link to="/compare-services">Compare All Services</Link>
                      </Button>
                    </div>
                  )}
                  
                  {/* Overlay Image in Corner */}
                  {service.overlayImage && (
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
                      <div className="flex items-start gap-3">
                        <img 
                          src={service.overlayImage} 
                          alt={service.overlayTitle}
                          className="w-16 h-16 object-contain flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-gray-900 mb-1">
                            {service.overlayTitle}
                          </h4>
                          <p className="text-xs text-gray-700 leading-tight">
                            {service.overlayDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end">
                    <div className="container mx-auto px-4 pb-8 md:pb-12">
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
      </div>

      {/* Bottom section with dots, stats, and CTA */}
      <div className="container mx-auto px-4">
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

        {/* Bottom stats */}
        <div className={`${isMobile ? 'mt-8' : 'mt-12'} grid ${isMobile ? 'grid-cols-2 gap-4' : 'grid-cols-3 gap-8'} text-center`} data-stats-section>
          <div className="flex flex-col items-center">
            <Sparkles className="w-8 h-8 text-bc-red mb-2" />
            <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 mb-1`}>6</div>
            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600`}>{t("Service Types")}</p>
          </div>
          <div className="flex flex-col items-center">
            <Home className="w-8 h-8 text-bc-red mb-2" />
            <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 mb-1`}>5+</div>
            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600`}>{t("Years Experience")}</p>
          </div>
          {!isMobile && (
            <div className="flex flex-col items-center">
              <Building className="w-8 h-8 text-bc-red mb-2" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{satisfactionRate}%</div>
              <p className="text-base text-gray-600">{t("Satisfaction Rate")}</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-bc-red to-red-700 text-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">{t("Ready to Transform Your Property?")}</h3>
            <p className="text-lg mb-6">{t("Get professional exterior cleaning services that deliver exceptional results.")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="secondary" size="lg">
                <Link to="/calculator">{t("Get Free Quote")}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-bc-red">
                <a href="tel:778-808-7620">{t("Call Now: (778) 808-7620")}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeCompleteJobsSection;
