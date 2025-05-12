
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
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
    <section className="bg-gradient-to-r from-bc-red to-red-800 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white text-center md:text-left">
            <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${getLanguageClass()}`}>
              {t('Ready for a Professional Clean?')}
            </h2>
            <p className={`text-white/90 text-lg max-w-2xl ${getLanguageClass()}`}>
              {t('Schedule your service today and experience the difference of professional exterior cleaning.')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/calculator"
              className="bg-white text-bc-red hover:bg-gray-100 transition-colors px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              {t('Get an Estimate')} <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="bg-black/30 hover:bg-black/40 text-white transition-colors border border-white/30 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              {t('Contact Us')} <Zap size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
