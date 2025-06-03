
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ServiceHeader from '@/components/ServiceHeader';
import ServiceProcess from '@/components/ServiceProcess';
import ServiceBenefits from '@/components/ServiceBenefits';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import CallToAction from '@/components/CallToAction';
import RoofCleaningGallery from '@/components/services/RoofCleaningGallery';
import RoofCleaningProcessCarousel from '@/components/services/roof-cleaning/RoofCleaningProcessCarousel';
import { useTranslation } from '@/hooks/use-translation';
import RoofCleaningQuoteOverlay from '@/components/forms/RoofCleaningQuoteOverlay';

const RoofCleaning = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      title: t("Moss & Algae Removal"),
      description: t("We safely remove moss, algae, and organic growth that can damage your roof."),
      icon: "🌿"
    },
    {
      title: t("Soft Wash Technology"),
      description: t("Our gentle cleaning process protects your roof while effectively removing buildup."),
      icon: "💧"
    },
    {
      title: t("Extend Roof Life"),
      description: t("Regular cleaning can significantly extend the lifespan of your roofing materials."),
      icon: "🏠"
    },
    {
      title: t("Improve Curb Appeal"),
      description: t("A clean roof dramatically improves your home's appearance and value."),
      icon: "✨"
    }
  ];

  const processSteps = [
    {
      title: t("Roof Inspection"),
      description: t("We carefully inspect your roof to identify problem areas and choose the safest cleaning method."),
      image: "/lovable-uploads/19292b37-93b3-4443-abf4-b0f8928efab4.png"
    },
    {
      title: t("Pre-Treatment"),
      description: t("We apply eco-friendly solutions to break down moss, algae, and organic buildup."),
      image: "/lovable-uploads/2156e2bb-05d0-4809-93c4-d6e0d97b96aa.png"
    },
    {
      title: t("Gentle Cleaning"),
      description: t("Using low-pressure soft wash techniques, we safely remove all buildup without damage."),
      image: "/lovable-uploads/180b21a6-5560-4b80-907a-78280186bc05.png"
    },
    {
      title: t("Final Rinse"),
      description: t("We thoroughly rinse the roof and surrounding areas, leaving everything clean and protected."),
      image: "/lovable-uploads/1506ac4e-54db-4e14-b30f-42311bfee2be.png"
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t("Professional Roof Cleaning Services | BC Pressure Washing")}</title>
        <meta name="description" content={t("Expert roof cleaning and moss removal services. Safe, effective cleaning that extends roof life and improves home appearance.")} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <ServiceHeader
          title={t("Professional Roof Cleaning & Moss Removal")}
          subtitle={t("Protect your investment with our safe, effective roof cleaning services that remove moss, algae, and organic buildup.")}
          backgroundImage="/lovable-uploads/180b21a6-5560-4b80-907a-78280186bc05.png"
        />

        <ServiceBenefits benefits={benefits} />
        
        <RoofCleaningProcessCarousel />
        
        <ServiceProcess 
          title={t("Our Roof Cleaning Process")}
          steps={processSteps}
        />

        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                {t("Why Regular Roof Cleaning is Essential")}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("Your roof is constantly exposed to the elements. Over time, moss, algae, and debris can cause serious damage if not properly maintained.")}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <h3 className="font-semibold text-red-800 mb-2">{t("Warning Signs Your Roof Needs Cleaning:")}</h3>
                    <ul className="space-y-2 text-red-700">
                      <li>• {t("Visible moss or algae growth")}</li>
                      <li>• {t("Dark streaks or staining")}</li>
                      <li>• {t("Clogged gutters from roof debris")}</li>
                      <li>• {t("Lifting or damaged shingles")}</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <h3 className="font-semibold text-green-800 mb-2">{t("Benefits of Professional Roof Cleaning:")}</h3>
                    <ul className="space-y-2 text-green-700">
                      <li>• {t("Prevents costly roof repairs")}</li>
                      <li>• {t("Improves energy efficiency")}</li>
                      <li>• {t("Increases property value")}</li>
                      <li>• {t("Extends roof lifespan by years")}</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="/lovable-uploads/2156e2bb-05d0-4809-93c4-d6e0d97b96aa.png" 
                  alt={t("Before and after roof cleaning")}
                  className="rounded-lg shadow-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        <RoofCleaningGallery />

        <TestimonialsCarousel 
          serviceType="roof-cleaning"
          title={t("What Our Customers Say About Our Roof Cleaning")}
        />

        <CallToAction
          title={t("Ready for a Cleaner, Safer Roof?")}
          subtitle={t("Don't let moss and algae damage your roof. Schedule your professional roof cleaning today and protect your home's most important feature.")}
          backgroundImage="/lovable-uploads/180b21a6-5560-4b80-907a-78280186bc05.png"
        />

        <RoofCleaningQuoteOverlay />
      </div>
    </>
  );
};

export default RoofCleaning;
