
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Camera, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

interface JobStep {
  id: number;
  image: string;
  title: string;
  description: string;
  features: string[];
}

const HowWeCompleteJobsSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const jobSteps: JobStep[] = [
    {
      id: 1,
      image: "/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png",
      title: t("Initial Assessment & Planning"),
      description: t("Every job starts with Jayden personally inspecting your property to create a customized cleaning plan."),
      features: [
        t("Free on-site consultation"),
        t("Detailed scope assessment"),
        t("Custom treatment plan"),
        t("Transparent pricing")
      ]
    },
    {
      id: 2,
      image: "/lovable-uploads/deea00c1-1c27-44fd-b409-09d0f3ff0afa.png",
      title: t("Professional Equipment Setup"),
      description: t("We arrive with commercial-grade equipment and eco-friendly cleaning solutions for optimal results."),
      features: [
        t("State-of-the-art pressure washing equipment"),
        t("Biodegradable cleaning solutions"),
        t("Protective coverings for landscaping"),
        t("Safety protocols in place")
      ]
    },
    {
      id: 3,
      image: "/lovable-uploads/1c34be5d-1b8e-4e6b-b9c9-aab9c1c6b86a.png",
      title: t("Meticulous Cleaning Process"),
      description: t("Our systematic approach ensures every surface is thoroughly cleaned without damage to your property."),
      features: [
        t("Low-pressure soft washing techniques"),
        t("Multi-step cleaning process"),
        t("Attention to detail in every corner"),
        t("Real-time progress monitoring")
      ]
    },
    {
      id: 4,
      image: "/lovable-uploads/8a7d4e73-fa89-44ab-8814-ecaed5b1d23c.png",
      title: t("Quality Inspection & Completion"),
      description: t("Jayden personally inspects every completed job to ensure it meets our high standards before we leave."),
      features: [
        t("Final quality inspection"),
        t("Before & after photo documentation"),
        t("Customer walkthrough"),
        t("100% satisfaction guarantee")
      ]
    }
  ];
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % jobSteps.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [jobSteps.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % jobSteps.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + jobSteps.length) % jobSteps.length);
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
            <Shield className="w-5 h-5 text-bc-red" />
            <span className="text-bc-red font-semibold text-sm uppercase tracking-wide">Professional Process</span>
            <Shield className="w-5 h-5 text-bc-red" />
          </div>
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl lg:text-5xl'} font-bold mb-4 md:mb-6 text-gray-900`}>
            {t("How We Complete Each Job")}
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-gray-600 max-w-4xl mx-auto leading-relaxed`}>
            {isMobile 
              ? t("Our proven 4-step process ensures quality results every time.")
              : t("From initial assessment to final inspection, our proven 4-step process ensures exceptional results and complete customer satisfaction on every project.")
            }
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div className="relative h-[500px] md:h-[600px]">
              {jobSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentIndex ? 'opacity-100 z-10' : 'opacity-0'
                  }`}
                >
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-cover" 
                  />
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
                    <div className="max-w-4xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-bc-red rounded-full flex items-center justify-center text-white font-bold">
                          {step.id}
                        </div>
                        <h3 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold text-white`}>
                          {step.title}
                        </h3>
                      </div>
                      
                      <p className={`${isMobile ? 'text-base mb-4' : 'text-lg md:text-xl mb-6'} text-white/90 leading-relaxed`}>
                        {step.description}
                      </p>
                      
                      <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2 gap-3'}`}>
                        {step.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                            <span className={`${isMobile ? 'text-sm' : 'text-base'} text-white/90`}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
            {jobSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-bc-red w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className={`${isMobile ? 'mt-8' : 'mt-12'} grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-8'} text-center`}>
          <div className="flex flex-col items-center">
            <Camera className="w-8 h-8 text-bc-red mb-2" />
            <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 mb-1`}>1000+</div>
            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600`}>{t("Projects Completed")}</p>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="w-8 h-8 text-bc-red mb-2" />
            <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 mb-1`}>100%</div>
            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600`}>{t("Satisfaction Rate")}</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="w-8 h-8 text-bc-red mb-2" />
            <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 mb-1`}>5+</div>
            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600`}>{t("Years Experience")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeCompleteJobsSection;
