
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import PriceCalculatorOverlay from '@/components/PriceCalculatorOverlay';

const HeroSection = () => {
  const { t, language } = useTranslation();
  
  // Additional language-specific class for font adjustments
  const getLanguageClass = () => {
    if (language === 'pa') return 'font-pa-font';
    if (language === 'hi') return 'font-hi-font';
    return '';
  };
  
  return (
    <section 
      className="hero-section relative h-[90vh] flex items-center w-full" 
      style={{ 
        backgroundImage: "url('/lovable-uploads/deea00c1-1c27-44fd-b409-09d0f3ff0afa.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        maxWidth: "100%"
      }}
    >
      <div className="hero-overlay absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl text-left">
          <div className="badge-pill animate-on-scroll mb-4 bg-red-50/80 backdrop-blur-sm">
            {t("Professional Pressure Washing Services")}
          </div>
          <h1 className={`text-4xl md:text-6xl font-bold mb-4 animate-on-scroll text-shadow text-white ${getLanguageClass()}`}>
            {t("Expert Window Cleaning & Pressure Washing Services")}
          </h1>
          <p className={`text-lg md:text-xl mb-8 animate-on-scroll text-white text-shadow-sm max-w-2xl ${getLanguageClass()}`}>
            {t("Delivering exceptional results for both residential and commercial properties with our state-of-the-art equipment and professional techniques.")}
          </p>
          <div className="animate-on-scroll">
            <PriceCalculatorOverlay 
              buttonText={t("Check Price & Availability")} 
              className="bg-bc-red hover:bg-red-700 text-white py-4 px-10 text-xl font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
