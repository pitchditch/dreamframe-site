
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import HoverImageSlideshow from '../HoverImageSlideshow';
import ServiceVideoOverlay from '../ServiceVideoOverlay';
import { testimonials } from '@/data/testimonials';
import { Button } from '@/components/ui/button';

const PremiumSolutionsSection = () => {
  const { t } = useTranslation();
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [autoplayIndex, setAutoplayIndex] = useState(0);
  
  // Filter testimonial images by service type
  const windowCleaningImages = testimonials
    .filter(t => t.service === 'window-cleaning' && t.beforeAfterImage)
    .map(t => t.beforeAfterImage as string);
  
  const houseWashingImages = testimonials
    .filter(t => t.service === 'pressure-washing' && t.beforeAfterImage)
    .map(t => t.beforeAfterImage as string);
  
  const gutterCleaningImages = testimonials
    .filter(t => t.service === 'gutter-cleaning' && t.beforeAfterImage)
    .map(t => t.beforeAfterImage as string);
  
  const roofCleaningImages = testimonials
    .filter(t => t.service === 'roof-cleaning' && t.beforeAfterImage)
    .map(t => t.beforeAfterImage as string);
  
  const services = [
    {
      title: t('Window Cleaning'),
      description: t('Crystal-clear windows inside and out using eco-friendly solutions.'),
      link: '/services/window-cleaning',
      image: '/lovable-uploads/481b70c0-733d-4cc9-9629-3628731d87e4.png',
      slideImages: windowCleaningImages,
      videoId: 'bbHnt4UNPcU',
      included: [
        t('Exterior & interior window cleaning'),
        t('Screen & sill wipe-down'),
        t('Streak-free finish'),
        t('Track & debris cleaning')
      ]
    },
    {
      title: t('House Washing'),
      description: t('Gentle soft-washing to remove dirt, mold, and algae without damage.'),
      link: '/services/pressure-washing',
      image: '/lovable-uploads/ff861e81-c504-47c8-aae7-5319b9ad2ab4.png',
      slideImages: houseWashingImages,
      videoId: 'lYnXijewxCM',
      included: [
        t('Soft wash siding treatment'),
        t('Algae & mildew removal'),
        t('Safe for stucco, vinyl, wood'),
        t('Enhanced curb appeal')
      ]
    },
    {
      title: t('Gutter Cleaning'),
      description: t('Prevent clogs and overflow damage with professional gutter care.'),
      link: '/services/gutter-cleaning',
      image: '/lovable-uploads/29932697-b24f-4d93-9212-f1913cd47193.png',
      slideImages: gutterCleaningImages,
      videoId: 'EdMlx1sYJDc',
      included: [
        t('Interior debris removal'),
        t('Downspout flushing'),
        t('Exterior gutter brightening'),
        t('Safe ladder access')
      ]
    },
    {
      title: t('Roof Cleaning'),
      description: t('Eliminate moss, algae, and stains — extend roof life safely.'),
      link: '/services/roof-cleaning',
      image: '/lovable-uploads/c988cf42-0a35-4032-bcc3-6b9770fbc771.png',
      slideImages: roofCleaningImages,
      videoId: 'eQSgdx9ujcc',
      included: [
        t('Soft wash or brushing method'),
        t('Moss & algae treatment'),
        t('Roof inspection'),
        t('Gentle on shingles (no pressure)')
      ]
    }
  ];

  // Autoplay functionality - cycle through videos every 8 seconds when not hovering
  useEffect(() => {
    if (hoveredService === null) {
      const interval = setInterval(() => {
        setAutoplayIndex((prevIndex) => (prevIndex + 1) % services.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [hoveredService, services.length]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100" data-section="premium-solutions">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            {t("Premium Cleaning Solutions")}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t("Enhance your home's curb appeal and protect its value with professional, fully insured exterior cleaning services — personally checked by Jayden Fisher.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const shouldShowVideo = hoveredService === index || (hoveredService === null && autoplayIndex === index);
            
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col group relative"
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className="h-56 relative overflow-hidden">
                  <HoverImageSlideshow 
                    images={service.slideImages} 
                    interval={2500}
                    altText={`${service.title} showcase`}
                  >
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </HoverImageSlideshow>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <ServiceVideoOverlay
                    videoId={service.videoId}
                    isHovering={shouldShowVideo}
                    onClose={() => setHoveredService(null)}
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-bc-red transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow text-base">
                    {service.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                      {t("Included")}:
                    </h4>
                    <ul className="space-y-3">
                      {service.included.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                          <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-auto">
                    <Link 
                      to={service.link} 
                      className="inline-flex items-center text-bc-red hover:text-red-700 font-semibold transition-all duration-200 group/link"
                    >
                      {t("Learn More")} 
                      <ArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-16">
          <Button asChild variant="bc-red" size="lg" className="rounded-full px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            <Link to="/services">
              {t("See All Services")} <ArrowRight className="ml-3" size={20} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PremiumSolutionsSection;
