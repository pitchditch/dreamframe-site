
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const CTABanner = () => {
  const {
    t,
    language
  } = useTranslation();

  // Language-specific classes for font adjustments
  const getLanguageClass = () => {
    if (language === 'pa') return 'font-pa-font';
    if (language === 'hi') return 'font-hi-font';
    return '';
  };

  return (
    <section className="bg-gradient-to-br from-bc-red to-red-700 py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${getLanguageClass()}`}>
            Ready for a Free, No-Obligation Quote?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Find out how affordable professional cleaning services can be. Get your custom quote today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-white text-bc-red px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center transition-all hover:bg-gray-100"
            >
              <Zap className="mr-2 h-5 w-5" />
              Get Your Free Quote
            </Link>
            <Link
              to="/services"
              className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center transition-all hover:bg-white/30"
            >
              Explore Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
