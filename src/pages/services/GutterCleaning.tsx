
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ServiceHeader from '@/components/ServiceHeader';
import ServiceProcess from '@/components/ServiceProcess';
import ServiceBenefits from '@/components/ServiceBenefits';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import CallToAction from '@/components/CallToAction';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';
import EnhancedComparisonTable from '@/components/services/gutter-cleaning/EnhancedComparisonTable';
import GutterProcessCarousel from '@/components/services/gutter-cleaning/GutterProcessCarousel';
import HeroSlider from '@/components/services/gutter-cleaning/HeroSlider';
import ServiceAreasMap from '@/components/services/gutter-cleaning/ServiceAreasMap';
import StickyQuoteButton from '@/components/services/gutter-cleaning/StickyQuoteButton';
import TrustBar from '@/components/services/gutter-cleaning/TrustBar';
import GutterCleaningQuoteOverlay from '@/components/forms/GutterCleaningQuoteOverlay';

const GutterCleaning = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const benefits = [
    {
      title: t("Professional Equipment"),
      description: t("We use professional-grade tools and equipment to ensure thorough cleaning without damage."),
      icon: "⚙️"
    },
    {
      title: t("Safety First"),
      description: t("Our trained professionals handle all ladder work and safety protocols."),
      icon: "🛡️"
    },
    {
      title: t("Complete Service"),
      description: t("We clean both inside and outside of gutters, plus downspouts and drainage systems."),
      icon: "✅"
    },
    {
      title: t("Debris Removal"),
      description: t("All debris is collected and properly disposed of, leaving your property clean."),
      icon: "🗑️"
    }
  ];

  const processSteps = [
    {
      title: t("Inspection"),
      description: t("We inspect your gutter system to identify any issues or areas needing special attention."),
      icon: "🔍"
    },
    {
      title: t("Debris Removal"),
      description: t("All leaves, debris, and buildup are carefully removed from gutters and downspouts."),
      icon: "🍂"
    },
    {
      title: t("Cleaning"),
      description: t("Gutters are thoroughly cleaned and flushed to ensure proper water flow."),
      icon: "💧"
    },
    {
      title: t("Final Check"),
      description: t("We test the system and make minor adjustments to ensure optimal performance."),
      icon: "✅"
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t("Professional Gutter Cleaning Services | BC Pressure Washing")}</title>
        <meta name="description" content={t("Expert gutter cleaning services to protect your home from water damage. Professional, safe, and thorough gutter maintenance.")} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <HeroSlider />
        <TrustBar />
        
        <ServiceHeader
          title={t("Professional Gutter Cleaning Services")}
          description={t("Protect your home from water damage with our thorough gutter cleaning and maintenance services.")}
          backgroundImage="/lovable-uploads/fc77240e-210d-48ab-95b1-279c84686768.png"
        />

        <ServiceBenefits benefits={benefits} />
        
        <GutterProcessCarousel />
        
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              {t("Our Gutter Cleaning Process")}
            </h2>
            <ServiceProcess processes={processSteps} />
          </div>
        </div>

        <EnhancedComparisonTable />

        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                {t("Why Choose Our Gutter Cleaning Service?")}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-bc-red rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{t("Prevent Water Damage")}</h3>
                      <p className="text-gray-600">{t("Clean gutters direct water away from your foundation, preventing costly water damage.")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-bc-red rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{t("Extend Gutter Life")}</h3>
                      <p className="text-gray-600">{t("Regular cleaning prevents rust, corrosion, and structural damage to your gutters.")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-bc-red rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{t("Professional Safety")}</h3>
                      <p className="text-gray-600">{t("We handle all the dangerous ladder work so you don't have to risk injury.")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-bc-red rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{t("Complete Cleanup")}</h3>
                      <p className="text-gray-600">{t("All debris is bagged and removed from your property - no mess left behind.")}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="/lovable-uploads/fc77240e-210d-48ab-95b1-279c84686768.png" 
                  alt={t("Professional gutter cleaning")}
                  className="rounded-lg shadow-xl w-full h-auto"
                />
                <div className="absolute inset-0 bg-bc-red/10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        <ServiceAreasMap />

        <TestimonialsCarousel />

        <CallToAction
          title={t("Ready to Protect Your Home?")}
          subtitle={t("Don't wait for water damage - schedule your professional gutter cleaning today and keep your home safe and dry.")}
          backgroundImage="/lovable-uploads/fc77240e-210d-48ab-95b1-279c84686768.png"
        />

        <StickyQuoteButton />
        <GutterCleaningQuoteOverlay buttonText={t("Get Free Quote")} />
      </div>
    </>
  );
};

export default GutterCleaning;
