
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ServiceHeader from '@/components/ServiceHeader';
import ServiceProcess from '@/components/ServiceProcess';
import ServiceBenefits from '@/components/ServiceBenefits';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import CallToAction from '@/components/CallToAction';
import { useTranslation } from '@/hooks/use-translation';

const FenceWashing = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      title: t("Restore Like New"),
      description: t("Remove years of dirt, mildew, and weathering to restore your fence's original appearance."),
      icon: "✨"
    },
    {
      title: t("Prevent Decay"),
      description: t("Regular cleaning removes harmful buildup that can cause wood rot and material degradation."),
      icon: "🛡️"
    },
    {
      title: t("Increase Property Value"),
      description: t("A clean, well-maintained fence significantly improves your property's curb appeal and value."),
      icon: "💰"
    },
    {
      title: t("Extend Fence Life"),
      description: t("Professional cleaning can add years to your fence's lifespan by preventing damage."),
      icon: "⏰"
    }
  ];

  const processSteps = [
    {
      title: t("Fence Assessment"),
      description: t("We inspect your fence material and condition to choose the optimal cleaning method."),
      icon: "🔍"
    },
    {
      title: t("Pre-Treatment"),
      description: t("We apply specialized cleaners to break down stubborn stains, mildew, and buildup."),
      icon: "🧴"
    },
    {
      title: t("Pressure Washing"),
      description: t("Using appropriate pressure settings, we thoroughly clean each section of your fence."),
      icon: "💧"
    },
    {
      title: t("Final Rinse"),
      description: t("We complete the process with a thorough rinse, leaving your fence clean and refreshed."),
      icon: "✅"
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t("Professional Fence Washing Services | BC Pressure Washing")}</title>
        <meta name="description" content={t("Expert fence washing and cleaning services. Restore your fence's appearance and extend its lifespan with our professional cleaning.")} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <ServiceHeader
          title={t("Professional Fence Washing & Cleaning")}
          description={t("Restore your fence to like-new condition with our specialized cleaning services that remove dirt, mildew, and weathering damage.")}
          backgroundImage="/lovable-uploads/28c30244-2e20-4f95-8702-35310699deb3.png"
        />

        <ServiceBenefits benefits={benefits} />
        
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              {t("Our Fence Washing Process")}
            </h2>
            <ServiceProcess processes={processSteps} />
          </div>
        </div>

        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                {t("Why Choose Professional Fence Washing?")}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("Your fence faces constant exposure to weather, dirt, and organic growth. Professional cleaning restores its beauty and protects your investment.")}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-bc-red rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{t("All Fence Materials")}</h3>
                      <p className="text-gray-600">{t("We safely clean wood, vinyl, composite, metal, and chain link fences with appropriate techniques.")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-bc-red rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{t("Stain Removal")}</h3>
                      <p className="text-gray-600">{t("We remove tough stains from mildew, algae, rust, and weathering that regular washing can't handle.")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-bc-red rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{t("Damage Prevention")}</h3>
                      <p className="text-gray-600">{t("We use appropriate pressure and techniques to clean effectively without damaging your fence material.")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-bc-red rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{t("Eco-Friendly Solutions")}</h3>
                      <p className="text-gray-600">{t("Our biodegradable cleaning solutions are safe for your landscape and the environment.")}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="/lovable-uploads/28c30244-2e20-4f95-8702-35310699deb3.png" 
                  alt={t("Before and after fence washing")}
                  className="rounded-lg shadow-xl w-full h-auto"
                />
                <div className="absolute inset-0 bg-bc-red/10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                {t("Fence Types We Clean")}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="font-semibold text-gray-900 mb-4">{t("Wood Fences")}</h3>
                <p className="text-gray-600">{t("Cedar, pine, redwood, and treated lumber fences cleaned with appropriate pressure to prevent damage.")}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="font-semibold text-gray-900 mb-4">{t("Vinyl Fences")}</h3>
                <p className="text-gray-600">{t("PVC and vinyl fences restored to their original bright white or color appearance.")}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="font-semibold text-gray-900 mb-4">{t("Metal Fences")}</h3>
                <p className="text-gray-600">{t("Aluminum, steel, and wrought iron fences cleaned and rust stains removed.")}</p>
              </div>
            </div>
          </div>
        </div>

        <TestimonialsCarousel />

        <CallToAction
          title={t("Ready to Restore Your Fence?")}
          subtitle={t("Don't let dirt and weathering diminish your property's appeal. Schedule your professional fence washing today and see the dramatic difference.")}
          backgroundImage="/lovable-uploads/28c30244-2e20-4f95-8702-35310699deb3.png"
        />
      </div>
    </>
  );
};

export default FenceWashing;
