
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
          src="/lovable-uploads/416a41e6-23fb-40d7-a9ae-5a6a160c3dbb.png" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-bold text-white mb-6 ${getLanguageClass()}`}>
            {t('Ready to Transform Your Property?')}
          </h2>
          
          <p className={`text-white/90 text-lg mb-8 ${getLanguageClass()}`}>
            {t('Get a personalized quote for your property with our easy-to-use calculator.')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/calculator" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-bold inline-flex items-center transition-all"
            >
              {t('Get Your Quote')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link 
              to="/contact" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-bold inline-flex items-center transition-all"
            >
              {t('Contact Us')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
