
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
    <section className="relative py-16" style={{ backgroundImage: "url('/lovable-uploads/1d7d3c0f-21a5-4ae2-80c7-7f156797449f.png')", backgroundPosition: "center", backgroundSize: "cover" }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 animate-on-scroll ${getLanguageClass()}`}>{t("Ready to Transform Your Property?")}</h2>
          <p className={`text-lg mb-8 animate-on-scroll ${getLanguageClass()}`}>
            {t("Get in touch today for a free, no-obligation quote and see how we can help you maintain your property's pristine appearance.")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-on-scroll">
            <Link to="/contact">
              <button className={`btn-primary ${getLanguageClass()}`}>
                {t("Get a Free Quote")} <ArrowRight className="ml-2 inline-block" size={16} />
              </button>
            </Link>
            <a href="tel:7788087620">
              <button className={`btn-secondary ${getLanguageClass()}`}>
                {t("Call Us")}: 778 808 7620
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
