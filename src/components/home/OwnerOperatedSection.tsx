
import React from 'react';
import { useTranslation } from '@/hooks/use-translation';

const OwnerOperatedSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mt-8 md:mt-0 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {t("Every Job is Personally Checked by Me")} <br />
              <span className="text-bc-red">— Jayden Fisher, Owner</span>
            </h2>
            
            <p className="text-gray-700 mb-6 text-lg">
              {t("As the owner of BC Pressure Washing, I personally oversee every job we complete. This isn't just a business for me—it's my passion and my promise to you.")}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-red-100 rounded-full p-2 mr-4">
                  <svg className="w-6 h-6 text-bc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-gray-800 font-medium">{t("I inspect every project for quality")}</p>
              </div>
              
              <div className="flex items-center">
                <div className="bg-red-100 rounded-full p-2 mr-4">
                  <svg className="w-6 h-6 text-bc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-gray-800 font-medium">{t("No subcontractors—our trained team only")}</p>
              </div>
              
              <div className="flex items-center">
                <div className="bg-red-100 rounded-full p-2 mr-4">
                  <svg className="w-6 h-6 text-bc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-gray-800 font-medium">{t("Your satisfaction is my personal guarantee")}</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 animate-on-scroll">
            <div className="relative">
              <img 
                src="/lovable-uploads/9fa4bf3e-6a32-47a0-aca1-6e202ab78527.png" 
                alt="Jayden Fisher, Owner of BC Pressure Washing" 
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-bc-red text-white p-4 rounded-lg shadow-lg hidden md:block">
                <p className="font-bold text-xl">{t("Owner Operated")}</p>
                <p className="text-sm">{t("Since 2015")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerOperatedSection;
