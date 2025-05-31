
import React from 'react';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';
import ServiceCarousel from './ServiceCarousel';
import StatsSection from './StatsSection';
import { createServicesData } from './data';

const HowWeCompleteJobsSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const services = createServicesData(t);

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
      <ServiceCarousel services={services} />

      {/* Bottom stats */}
      <div className="container mx-auto px-4">
        <StatsSection />
      </div>
    </section>
  );
};

export default HowWeCompleteJobsSection;
