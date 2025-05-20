
import React from 'react';
import { useTranslation } from '@/hooks/use-translation';

const PremiumSolutionsSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("Our Professional Services")}</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">{t("Premium Cleaning Solutions for Every Surface")}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Window Cleaning */}
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <img src="/lovable-uploads/6e463050-a822-420e-8227-6bc3306b6832.png" alt="Window Cleaning Icon" className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("Window Cleaning")}</h3>
            <p className="text-gray-700 mb-4">
              {t("Professional window cleaning using purified water for crystal clear, streak-free results on homes and commercial buildings.")}
            </p>
            <a href="/services/window-cleaning" className="text-bc-red font-medium hover:underline flex items-center">
              {t("Learn More")} 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          
          {/* Gutter Cleaning */}
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <img src="/lovable-uploads/8e7a598a-83f9-4c2b-bfaa-21091b96ffcf.png" alt="Gutter Cleaning Icon" className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("Gutter Cleaning")}</h3>
            <p className="text-gray-700 mb-4">
              {t("Thorough gutter cleaning to prevent damage and maintain proper drainage, extending the life of your gutter system.")}
            </p>
            <a href="/services/gutter-cleaning" className="text-bc-red font-medium hover:underline flex items-center">
              {t("Learn More")} 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          
          {/* Pressure Washing */}
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <img src="/lovable-uploads/abd8180c-861e-4fab-807f-f3099c1d5585.png" alt="Pressure Washing Icon" className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("Pressure Washing")}</h3>
            <p className="text-gray-700 mb-4">
              {t("Safe, effective pressure washing that removes dirt, algae, and mildew without damaging your home's exterior surfaces.")}
            </p>
            <a href="/services/pressure-washing" className="text-bc-red font-medium hover:underline flex items-center">
              {t("Learn More")} 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          
          {/* Roof Cleaning */}
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <img src="/lovable-uploads/ff0fc949-bae9-4f8b-a408-2322698b8479.png" alt="Roof Cleaning Icon" className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("Roof Cleaning")}</h3>
            <p className="text-gray-700 mb-4">
              {t("Professional roof cleaning that safely removes moss, algae, and debris, extending the life of your roof.")}
            </p>
            <a href="/services/roof-cleaning" className="text-bc-red font-medium hover:underline flex items-center">
              {t("Learn More")} 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSolutionsSection;
