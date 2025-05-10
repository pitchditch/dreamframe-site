
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const CTABanner = () => {
  const { t, language } = useTranslation();

  // Language-specific classes for font adjustments
  const getLanguageClass = () => {
    if (language === 'pa') return 'font-pa-font';
    if (language === 'hi') return 'font-hi-font';
    return '';
  };

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/0c2175e3-0c77-4b8a-8670-db9aa6ff6e63.png" 
          alt="Clean Home Exterior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bc-red/90 to-bc-red/80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center py-8">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-white ${getLanguageClass()}`}>
            {t("Ready to Transform Your Home's Exterior?")}
          </h2>
          <p className={`text-lg md:text-xl text-white/90 mb-8 ${getLanguageClass()}`}>
            {t("Get a free quote today and see why homeowners across Surrey and White Rock choose us for their exterior cleaning needs.")}
          </p>
          <div className="mb-4">
            <p className="text-white font-medium mb-2">Every job is personally checked by me</p>
          </div>
          <Link to="/contact" className="inline-flex items-center bg-white text-bc-red px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            {t("Get Your Free Quote")} <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
